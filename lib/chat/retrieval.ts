import { embed } from 'ai';
import { google } from '@ai-sdk/google';
import { db } from '@/lib/db';
import { contentChunks, blogs, projects, certificates } from '@/lib/schema';
import { cosineDistance, inArray, eq, asc, lte } from 'drizzle-orm';
import { getRecentGithubEvents } from '@/lib/github';
import { GITHUB_USERNAME, GITHUB_URL } from '@/lib/site-config';
import { FAQS } from '@/lib/data/faqs';
import {
  SERVICE_CATEGORIES,
  ENGAGEMENT_MODELS,
  SERVICES_FAQS,
} from '@/lib/data/services';
import {
  TECHNICAL_SKILLS_FAQS,
  SYSTEM_DESIGN_CONCEPTS,
} from '@/lib/data/technical-skills';

/**
 * Strict threshold for cosine similarity retrieval: distance <= 0.5 corresponds
 * to >= 0.5 similarity in 3072-dimensional vector space.
 */
export const MAX_COSINE_DISTANCE = 0.5;
export const VECTOR_TOP_K = 4;
export const MAX_CONTEXT_LENGTH = 8000; // ~2,000 tokens budget guard

export interface GroundingSource {
  title: string;
  type: 'project' | 'blog' | 'service' | 'experience' | 'github' | 'faq' | 'about' | 'skill' | 'certificate';
  url?: string;
}

export interface ContextResult {
  contextText: string;
  sources: GroundingSource[];
}

// --- LRU In-Memory Embedding Cache (reduces TTFT by ~300ms for common queries) ---
interface CachedEmbedding {
  vector: number[];
  expiresAt: number;
}
const EMBEDDING_CACHE = new Map<string, CachedEmbedding>();
const MAX_CACHE_ENTRIES = 150;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

async function getCachedEmbedding(text: string): Promise<number[]> {
  const normalizedKey = text.trim().toLowerCase().slice(0, 300);
  const now = Date.now();
  const cached = EMBEDDING_CACHE.get(normalizedKey);
  if (cached && cached.expiresAt > now) {
    return cached.vector;
  }

  const { embedding } = await embed({
    model: google.embedding('gemini-embedding-2'),
    value: text,
  });

  if (EMBEDDING_CACHE.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = EMBEDDING_CACHE.keys().next().value;
    if (oldestKey) EMBEDDING_CACHE.delete(oldestKey);
  }

  EMBEDDING_CACHE.set(normalizedKey, {
    vector: embedding,
    expiresAt: now + CACHE_TTL_MS,
  });

  return embedding;
}

const ALL_SERVICES = SERVICE_CATEGORIES.flatMap((c) =>
  c.services.map((s) => ({ ...s, category: c.title }))
);

function getMatchingServices(queryText: string): { text: string; sources: GroundingSource[] } {
  const query = queryText.toLowerCase().trim();
  if (!query) return { text: '', sources: [] };
  const words = query.split(/\s+/).filter((w) => w.length > 2);
  if (words.length === 0) return { text: '', sources: [] };

  const sources: GroundingSource[] = [];

  // 1. Match individual service offerings
  const matchedServices = ALL_SERVICES.map((service) => {
    let score = 0;
    const titleLower = service.title.toLowerCase();
    const taglineLower = service.tagline.toLowerCase();
    const descLower = service.description.toLowerCase();
    const techLower = service.techStack.map((t) => t.toLowerCase());
    const delivLower = service.deliverables.map((d) => d.toLowerCase());
    const tagsLower = service.tags?.map((t) => t.toLowerCase()) || [];

    if (titleLower.includes(query)) score += 10;
    if (taglineLower.includes(query)) score += 6;

    for (const word of words) {
      if (titleLower.includes(word)) score += 4;
      if (taglineLower.includes(word)) score += 3;
      if (tagsLower.some((t) => t.includes(word))) score += 3;
      if (techLower.some((t) => t.includes(word))) score += 2;
      if (delivLower.some((d) => d.includes(word))) score += 2;
      if (descLower.includes(word)) score += 1;
    }
    return { service, score };
  })
    .filter((item) => item.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  // 2. Match engagement models (e.g., retainer, sprint, FDE, contract)
  const matchedEngagements = ENGAGEMENT_MODELS.map((model) => {
    let score = 0;
    const titleLower = model.title.toLowerCase();
    const subLower = model.subtitle.toLowerCase();
    const highlightsLower = model.highlights.map((h) => h.toLowerCase());

    if (titleLower.includes(query)) score += 8;

    for (const word of words) {
      if (titleLower.includes(word)) score += 3;
      if (subLower.includes(word)) score += 2;
      if (highlightsLower.some((h) => h.includes(word))) score += 2;
    }
    return { model, score };
  })
    .filter((item) => item.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 1);

  // 3. Match services FAQs
  const matchedServicesFaqs = SERVICES_FAQS.map((faq) => {
    let score = 0;
    const qLower = faq.question.toLowerCase();
    const aLower = faq.answer.toLowerCase();
    const tagsLower = faq.tags?.map((t) => t.toLowerCase()) || [];

    if (qLower.includes(query)) score += 10;
    for (const word of words) {
      if (qLower.includes(word)) score += 3;
      if (tagsLower.some((t) => t.includes(word))) score += 2;
      if (aLower.includes(word)) score += 1;
    }
    return { faq, score };
  })
    .filter((item) => item.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 1);

  const parts: string[] = [];

  matchedServices.forEach((m) => {
    const serviceUrl = `/services/${m.service.id}`;
    sources.push({
      title: m.service.title,
      type: 'service',
      url: serviceUrl,
    });

    let serviceBlock =
      `<context_chunk id="service-${m.service.id}" type="service" url="${serviceUrl}">\n` +
      `Exact Title: Service - ${m.service.title}\n` +
      `URL: ${serviceUrl}\n` +
      `Starting Price: ${m.service.startingPrice || 'Custom Quote'}\n` +
      `Typical Duration: ${m.service.typicalDuration || '1–2 weeks'}\n` +
      `Summary: ${m.service.tagline}\n` +
      `Description: ${m.service.description}\n`;

    if (m.service.problemStatement) {
      serviceBlock += `Failure Mode Avoided: ${m.service.problemStatement}\n`;
    }
    if (m.service.solutionApproach) {
      serviceBlock += `Engineering Approach: ${m.service.solutionApproach}\n`;
    }
    if (m.service.architectureDiagram?.benchmarks?.length) {
      serviceBlock += `Telemetry Benchmarks: ${m.service.architectureDiagram.benchmarks.join(' • ')}\n`;
    }
    if (m.service.scopeBoundaries?.included?.length) {
      serviceBlock += `Standard Sprint Deliverables: ${m.service.scopeBoundaries.included.join('; ')}\n`;
    }
    if (m.service.customScopeTitle) {
      serviceBlock += `Custom Scope Option: ${m.service.customScopeTitle} (${m.service.customScopeSubtitle || 'Extended retainer'})\n`;
    }
    serviceBlock += `Tech Stack: ${m.service.techStack.join(', ')}\n</context_chunk>`;
    parts.push(serviceBlock);
  });

  matchedEngagements.forEach((m) => {
    sources.push({
      title: `Engagement Model: ${m.model.title}`,
      type: 'service',
      url: '/services',
    });
    parts.push(
      `<context_chunk id="engagement-${m.model.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" type="service" url="/services">\n` +
      `Exact Title: Engagement Model - ${m.model.title}\n` +
      `URL: /services\n` +
      `Starting Rate: ${m.model.startingPrice}\n` +
      `Overview: ${m.model.subtitle}\n` +
      `Highlights:\n${m.model.highlights.map((h) => `- ${h}`).join('\n')}\n</context_chunk>`
    );
  });

  matchedServicesFaqs.forEach((m, idx) => {
    parts.push(
      `<context_chunk id="service-faq-${idx + 1}" type="faq" url="/services">\n` +
      `Exact Title: Service FAQ - ${m.faq.question}\n` +
      `URL: /services\n` +
      `Question: ${m.faq.question}\n` +
      `Answer: ${m.faq.answer}\n</context_chunk>`
    );
  });

  return { text: parts.join('\n\n'), sources };
}

function getMatchingFaqs(queryText: string): { text: string; sources: GroundingSource[] } {
  const query = queryText.toLowerCase().trim();
  if (!query) return { text: '', sources: [] };
  const words = query.split(/\s+/).filter((w) => w.length > 2);
  if (words.length === 0) return { text: '', sources: [] };

  const matched = FAQS.map((faq) => {
    let score = 0;
    const qLower = faq.question.toLowerCase();
    const aLower = faq.answer.toLowerCase();
    const tagsLower = faq.tags?.map((t) => t.toLowerCase()) || [];

    if (qLower.includes(query)) score += 10;

    for (const word of words) {
      if (qLower.includes(word)) score += 3;
      if (tagsLower.some((t) => t.includes(word))) score += 2;
      if (aLower.includes(word)) score += 1;
    }
    return { faq, score };
  })
    .filter((item) => item.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (matched.length === 0) return { text: '', sources: [] };

  const sources: GroundingSource[] = matched.map((m) => ({
    title: m.faq.question,
    type: 'faq',
    url: `/faq#${m.faq.id}`,
  }));

  const text = matched
    .map(
      (m) =>
        `<context_chunk id="faq-${m.faq.id}" type="faq" url="/faq#${m.faq.id}">\n` +
        `Exact Title: FAQ - ${m.faq.question}\n` +
        `URL: /faq#${m.faq.id}\n` +
        `Question: ${m.faq.question}\n` +
        `Answer: ${m.faq.answer}\n</context_chunk>`
    )
    .join('\n\n');

  return { text, sources };
}

function getMatchingTechnicalSkills(queryText: string): { text: string; sources: GroundingSource[] } {
  const query = queryText.toLowerCase().trim();
  if (!query) return { text: '', sources: [] };

  const words = query
    .replace(/[^a-z0-9+#.-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 || ['ai', 'db', 'go', 'js', 'ts', 'ci', 'cd', 'ui'].includes(w));

  if (words.length === 0) return { text: '', sources: [] };

  const sources: GroundingSource[] = [];
  const parts: string[] = [];

  // 1. Match System Design Concepts
  const matchedSystemDesign = SYSTEM_DESIGN_CONCEPTS.map((concept) => {
    let score = 0;
    const nameLower = concept.name.toLowerCase();
    const subLower = concept.sub.toLowerCase();
    const descLower = concept.description.toLowerCase();
    const highlightsLower = concept.highlights.map((h) => h.toLowerCase());

    if (query.includes(nameLower)) score += 12;
    if (nameLower.includes(query)) score += 10;
    if (subLower.includes(query)) score += 6;

    for (const word of words) {
      if (['samir', 'shaikh', 'does', 'what', 'with', 'about', 'how'].includes(word)) continue;
      if (nameLower.includes(word)) score += 5;
      if (subLower.includes(word)) score += 3;
      if (highlightsLower.some((h) => h.includes(word))) score += 3;
      if (descLower.includes(word)) score += 1;
    }
    return { concept, score };
  })
    .filter((item) => item.score >= 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  // 2. Match Technical Skills FAQs
  const matchedFaqs = TECHNICAL_SKILLS_FAQS.map((faq) => {
    let score = 0;
    const qLower = faq.question.toLowerCase();
    const aLower = faq.answer.toLowerCase();
    const catLower = faq.category.toLowerCase();
    const tagsLower = faq.tags?.map((t) => t.toLowerCase()) || [];

    if (qLower.includes(query)) score += 12;
    if (catLower.includes(query)) score += 8;

    for (const word of words) {
      if (['samir', 'shaikh', 'does', 'what', 'with', 'about', 'how'].includes(word)) continue;
      if (qLower.includes(word)) score += 4;
      if (tagsLower.some((t) => t.includes(word) || word.includes(t))) score += 4;
      if (aLower.includes(word)) score += 1;
    }
    return { faq, score };
  })
    .filter((item) => item.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  matchedSystemDesign.forEach((m, i) => {
    sources.push({
      title: `Architecture: ${m.concept.name}`,
      type: 'skill',
      url: '/technical-skills',
    });
    parts.push(
      `<context_chunk id="architecture-${i + 1}" type="skill" url="/technical-skills">\n` +
      `Exact Title: Architecture - ${m.concept.name}\n` +
      `URL: /technical-skills\n` +
      `Subtitle: ${m.concept.sub}\n` +
      `Description: ${m.concept.description}\n` +
      `Key Highlights:\n${m.concept.highlights.map((h) => `- ${h}`).join('\n')}\n</context_chunk>`
    );
  });

  matchedFaqs.forEach((m, i) => {
    parts.push(
      `<context_chunk id="skill-faq-${i + 1}" type="skill" url="/technical-skills">\n` +
      `Exact Title: Technical FAQ - ${m.faq.question}\n` +
      `URL: /technical-skills\n` +
      `Question: ${m.faq.question}\n` +
      `Answer: ${m.faq.answer}\n</context_chunk>`
    );
  });

  return { text: parts.join('\n\n'), sources };
}

const GITHUB_INTENT_RE =
  /\b(github|commit[s]?|repo(?:s|sitory|sitories)?|pull\s*request|pr\b|issue[s]?|push(?:ed)?|open\s*source|contribut(?:e|ion|ed|ing)|star(?:red)?|fork(?:ed)?|activity|recent|latest|working\s*on|coding|develop(?:ing|ed)?)\b/i;

function isGithubRelevant(text: string): boolean {
  return GITHUB_INTENT_RE.test(text);
}

let githubEventsCache: { ok: true; data: string } | null = null;
let githubEventsCacheExpiry = 0;
const GITHUB_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

async function getGithubEventsCached(): Promise<string | null> {
  const now = Date.now();
  if (githubEventsCache && now < githubEventsCacheExpiry) {
    return githubEventsCache.data;
  }
  const result = await getRecentGithubEvents(
    process.env.GITHUB_TOKEN || '',
    GITHUB_USERNAME
  );
  if (result.ok) {
    githubEventsCache = result;
    githubEventsCacheExpiry = now + GITHUB_CACHE_TTL_MS;
    return result.data;
  }
  return null;
}

async function getMatchingCertificates(queryText: string): Promise<{ text: string; sources: GroundingSource[] }> {
  const query = queryText.toLowerCase().trim();
  const certKeywords = ['certif', 'credential', 'license', 'accredit', 'qualification', 'course', 'meta', 'aws', 'diploma'];
  const hasKeyword = certKeywords.some((k) => query.includes(k));
  if (!hasKeyword) return { text: '', sources: [] };

  try {
    const certList = await db
      .select()
      .from(certificates)
      .where(eq(certificates.isPublished, true))
      .orderBy(asc(certificates.displayOrder));

    if (certList.length === 0) return { text: '', sources: [] };

    const sources: GroundingSource[] = [
      {
        title: 'Certificates & Credentials',
        type: 'certificate',
        url: '/certificates',
      },
    ];

    const lines = certList.map((c) => {
      let desc = `- ${c.title} by ${c.issuer} (Issued: ${c.issueDate})`;
      if (c.credentialId) desc += ` [ID: ${c.credentialId}]`;
      if (c.skills && c.skills.length > 0) desc += ` (Skills: ${c.skills.join(', ')})`;
      if (c.credentialUrl) desc += ` [Verification: ${c.credentialUrl}]`;
      return desc;
    });

    const text = `<context_chunk id="certificates" type="certificate" url="/certificates">\n` +
      `Exact Title: Verified Certificates & Credentials\n` +
      `URL: /certificates\n` +
      `Verified Professional Certificates & Credentials of Samir Shaikh:\n${lines.join('\n')}\n</context_chunk>`;

    return { text, sources };
  } catch (err) {
    console.error('[RAG] getMatchingCertificates error:', err);
    return { text: '', sources: [] };
  }
}

export async function getRelevantContextWithSources(messages: string[]): Promise<ContextResult> {
  const sources: GroundingSource[] = [];
  try {
    const latestMessage = messages[messages.length - 1] || '';

    // Multi-turn Contextual Query Synthesis:
    // If the latest turn is short (e.g. follow-up "how much does it cost?", "what's the timeline?"),
    // combine with previous user message for keyword & vector matching to prevent context amnesia
    const queryContext =
      messages.length >= 2 && latestMessage.split(/\s+/).length <= 7
        ? `${messages[messages.length - 2]} ${latestMessage}`
        : latestMessage;

    const { text: matchedFaqs, sources: faqSources } = getMatchingFaqs(queryContext);
    const { text: matchedServices, sources: serviceSources } = getMatchingServices(queryContext);
    const { text: matchedTechSkills, sources: techSkillSources } = getMatchingTechnicalSkills(queryContext);
    const { text: matchedCerts, sources: certSources } = await getMatchingCertificates(queryContext);

    sources.push(...serviceSources, ...faqSources, ...techSkillSources, ...certSources);

    // Embed last 2-3 messages joined for contextual vector search
    const embedWindow = messages.slice(-3).filter(Boolean).join(' ');

    const embedding = await getCachedEmbedding(embedWindow || latestMessage);

    const relevantChunks = await db
      .select({
        sourceId: contentChunks.sourceId,
        text: contentChunks.chunkText,
        sourceType: contentChunks.sourceType,
        distance: cosineDistance(contentChunks.embedding, embedding),
      })
      .from(contentChunks)
      .where(lte(cosineDistance(contentChunks.embedding, embedding), MAX_COSINE_DISTANCE))
      .orderBy(cosineDistance(contentChunks.embedding, embedding))
      .limit(VECTOR_TOP_K);

    const filteredChunks = relevantChunks.filter((c) => (c.distance as number) <= MAX_COSINE_DISTANCE);

    if (process.env.NODE_ENV !== 'production' || process.env.CHAT_DEBUG === 'true') {
      console.log(
        `[RAG] Retrieved ${filteredChunks.length} chunk(s) (threshold <= ${MAX_COSINE_DISTANCE}):`,
        filteredChunks.map((c) => ({
          type: c.sourceType,
          dist: typeof c.distance === 'number' ? Number(c.distance.toFixed(3)) : c.distance,
        }))
      );
    }

    // Fetch metadata for blogs and projects
    const blogIds = filteredChunks
      .filter((c) => c.sourceType === 'blog')
      .map((c) => c.sourceId);
    const projectIds = filteredChunks
      .filter((c) => c.sourceType === 'project')
      .map((c) => c.sourceId);

    const [blogsData, projectsData] = await Promise.all([
      blogIds.length
        ? db
            .select({ id: blogs.id, slug: blogs.slug, title: blogs.title })
            .from(blogs)
            .where(inArray(blogs.id, blogIds))
        : Promise.resolve([]),
      projectIds.length
        ? db
            .select({ id: projects.id, slug: projects.slug, title: projects.title })
            .from(projects)
            .where(inArray(projects.id, projectIds))
        : Promise.resolve([]),
    ]);

    const urlMap = new Map<string, string>();
    const titleMap = new Map<string, string>();

    blogsData.forEach((b) => {
      urlMap.set(b.id, `/blogs/${b.slug}`);
      titleMap.set(b.id, b.title);
    });

    projectsData.forEach((p) => {
      urlMap.set(p.id, `/projects/${p.slug}`);
      titleMap.set(p.id, p.title);
    });

    // Build context with XML isolation boundaries for all database chunks
    let contextText = filteredChunks
      .map((chunk, i) => {
        const exactUrl = urlMap.get(chunk.sourceId);
        const exactTitle = titleMap.get(chunk.sourceId);

        let urlAttr = exactUrl ? ` url="${exactUrl}"` : '';
        let titleAttr = exactTitle ? ` title="${exactTitle}"` : '';
        let header = `<context_chunk id="db-chunk-${i + 1}" type="${chunk.sourceType}"${titleAttr}${urlAttr}>`;

        if (exactTitle) {
          header += `\nExact Title: ${exactTitle}`;
          sources.push({
            title: exactTitle,
            type: chunk.sourceType as GroundingSource['type'],
            url: exactUrl,
          });
        } else if (exactUrl) {
          header += `\nURL: ${exactUrl}`;
        }

        if (chunk.sourceType === 'about' && !exactTitle) {
          header += `\nExact Title: About Samir\nURL: /about`;
          sources.push({ title: 'About Samir', type: 'about', url: '/about' });
        }
        if (chunk.sourceType === 'experience' && !exactTitle) {
          header += `\nExact Title: Work Experience\nURL: /about#experience`;
          sources.push({ title: 'Work Experience', type: 'experience', url: '/about#experience' });
        }

        return `${header}\n${chunk.text}\n</context_chunk>`;
      })
      .join('\n\n');

    // Only fetch GitHub activity if the message is plausibly about it
    if (isGithubRelevant(latestMessage)) {
      const githubEvents = await getGithubEventsCached();
      if (githubEvents) {
        contextText += `\n\n<context_chunk id="github-activity" type="github" url="${GITHUB_URL}">\nExact Title: Recent GitHub Activity\nURL: ${GITHUB_URL}\n${githubEvents}\n</context_chunk>`;
        sources.push({
          title: 'Recent GitHub Activity',
          type: 'github',
          url: GITHUB_URL,
        });
      }
    }

    // Append in-memory matched FAQs if relevant
    if (matchedFaqs) {
      contextText = contextText ? `${contextText}\n\n${matchedFaqs}` : matchedFaqs;
    }

    // Append in-memory matched Services if relevant
    if (matchedServices) {
      contextText = contextText ? `${contextText}\n\n${matchedServices}` : matchedServices;
    }

    // Append in-memory matched Technical Skills & System Design if relevant
    if (matchedTechSkills) {
      contextText = contextText ? `${contextText}\n\n${matchedTechSkills}` : matchedTechSkills;
    }

    // Append in-memory matched Certificates if relevant
    if (matchedCerts) {
      contextText = contextText ? `${contextText}\n\n${matchedCerts}` : matchedCerts;
    }

    // Context budget guard: Bound total context text to protect latency & prevent prompt overflow
    if (contextText.length > MAX_CONTEXT_LENGTH) {
      contextText = contextText.slice(0, MAX_CONTEXT_LENGTH) + '\n... [Context truncated to stay within token budget]';
    }

    // Deduplicate sources
    const seen = new Set<string>();
    const uniqueSources = sources.filter((s) => {
      const key = `${s.type}:${s.title}:${s.url || ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return { contextText, sources: uniqueSources };
  } catch (error) {
    console.error('[RAG] Failed to retrieve context:', error);
    return { contextText: '', sources: [] };
  }
}

export async function getRelevantContext(messages: string[]): Promise<string> {
  const result = await getRelevantContextWithSources(messages);
  return result.contextText;
}