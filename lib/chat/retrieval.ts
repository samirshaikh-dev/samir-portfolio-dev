import { embed } from 'ai';
import { google } from '@ai-sdk/google';
import { db } from '@/lib/db';
import { contentChunks, blogs, projects, certificates } from '@/lib/schema';
import { cosineDistance, inArray, eq, asc } from 'drizzle-orm';
import { getRecentGithubEvents } from '@/lib/github';
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

const MAX_DISTANCE = 0.5;

export interface GroundingSource {
  title: string;
  type: 'project' | 'blog' | 'service' | 'experience' | 'github' | 'faq' | 'about' | 'skill' | 'certificate';
  url?: string;
}

export interface ContextResult {
  contextText: string;
  sources: GroundingSource[];
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

  matchedServices.forEach((m, i) => {
    sources.push({
      title: m.service.title,
      type: 'service',
      url: `/services#${m.service.id}`,
    });
    parts.push(
      `--- Context Service ${i + 1} (Services & Offerings) ---\n` +
      `Exact Title: Service - ${m.service.title}\n` +
      `URL: /services#${m.service.id}\n` +
      `Starting Price: ${m.service.startingPrice || 'Custom Quote'}\n` +
      `Summary: ${m.service.tagline}\n` +
      `Description: ${m.service.description}\n` +
      `Key Deliverables:\n${m.service.deliverables.map((d) => `- ${d}`).join('\n')}\n` +
      `Tech Stack: ${m.service.techStack.join(', ')}`
    );
  });

  matchedEngagements.forEach((m) => {
    sources.push({
      title: `Engagement Model: ${m.model.title}`,
      type: 'service',
      url: '/services',
    });
    parts.push(
      `--- Context Engagement Model (Services & Engagement) ---\n` +
      `Exact Title: Engagement Model - ${m.model.title}\n` +
      `URL: /services\n` +
      `Starting Rate: ${m.model.startingPrice}\n` +
      `Overview: ${m.model.subtitle}\n` +
      `Highlights:\n${m.model.highlights.map((h) => `- ${h}`).join('\n')}`
    );
  });

  matchedServicesFaqs.forEach((m) => {
    parts.push(
      `--- Context Service FAQ (Services Knowledge Base) ---\n` +
      `Exact Title: Service FAQ - ${m.faq.question}\n` +
      `URL: /services\n` +
      `Question: ${m.faq.question}\n` +
      `Answer: ${m.faq.answer}`
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
      (m, i) =>
        `--- Context FAQ ${i + 1} (FAQ Knowledge Base) ---\nExact Title: FAQ - ${m.faq.question}\nURL: /faq#${m.faq.id}\nQuestion: ${m.faq.question}\nAnswer: ${m.faq.answer}`
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

  // 1. Match System Design Concepts (Microservices, Monolith, Modular Monolith, Event-Driven, etc.)
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
      if (catLower.includes(word)) score += 3;
      if (aLower.includes(word)) score += 1;
    }
    return { faq, score };
  })
    .filter((item) => item.score >= 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  // 3. Detect broad technical stack query intent
  const isBroadTechQuery =
    /\b(tech\s*stack|technolog(?:y|ies)|skills|languages|developer\s*expertise|what\s+can\s+samir\s+code|what\s+does\s+samir\s+know|frameworks|tools)\b/i.test(
      query
    );

  matchedSystemDesign.forEach((m) => {
    sources.push({
      title: `System Design: ${m.concept.name}`,
      type: 'skill',
      url: '/technical-skills#system-design',
    });
    parts.push(
      `--- Context System Design Concept (Architecture & System Design) ---\n` +
      `Exact Title: System Design - ${m.concept.name}\n` +
      `URL: /technical-skills#system-design\n` +
      `Architecture Pattern: ${m.concept.name} (${m.concept.sub})\n` +
      `Description: ${m.concept.description}\n` +
      `Key Highlights: ${m.concept.highlights.join(', ')}`
    );
  });

  matchedFaqs.forEach((m, i) => {
    sources.push({
      title: m.faq.question,
      type: 'skill',
      url: `/technical-skills#${m.faq.id}`,
    });
    parts.push(
      `--- Context Technical Skill FAQ ${i + 1} (Technical Skills & Developer Expertise) ---\n` +
      `Exact Title: Technical Skill - ${m.faq.question}\n` +
      `URL: /technical-skills#${m.faq.id}\n` +
      `Category: ${m.faq.category}\n` +
      `Question: ${m.faq.question}\n` +
      `Answer: ${m.faq.answer}`
    );
  });

  if (
    isBroadTechQuery ||
    (matchedSystemDesign.length === 0 &&
      matchedFaqs.length === 0 &&
      /\b(programming|code|coder|stack|dev|engineer|backend|frontend|fullstack)\b/i.test(query))
  ) {
    sources.push({
      title: 'Technical Skills & Developer Expertise',
      type: 'skill',
      url: '/technical-skills',
    });
    parts.push(
      `--- Context Technical Skills Overview (Core Stack & Expertise) ---\n` +
      `Exact Title: Technical Skills & Developer Expertise\n` +
      `URL: /technical-skills\n` +
      `Summary: Samir Shaikh is an AI Backend Engineer and Full-Stack Developer (backend-first) with production expertise across TypeScript, Node.js, Next.js, Distributed Systems, Event-Driven Architecture, PostgreSQL, MongoDB, Redis, Apache Kafka, BullMQ, and Docker.\n` +
      `Key Domains:\n` +
      `- Languages: TypeScript (Strict mode, Generics), JavaScript (ES6+/ESM, Async/Await), Python, Go, SQL\n` +
      `- Backend & APIs: Node.js, Express.js, GraphQL (Apollo Server, Apollo Client, DataLoader), REST APIs, WebSockets (Socket.io), RBAC authorization, JWT authentication\n` +
      `- System Design & Architecture: Microservices, Modular Monolith, Monolithic Architecture, Event-Driven Architecture (EDA), API Gateway Pattern, Distributed Caching (Redis), Circuit Breakers, CQRS\n` +
      `- Databases & Caching: PostgreSQL, Neon Serverless, MongoDB, MySQL, Redis (sub-millisecond cache-aside), Firebase\n` +
      `- Queues & Streaming: Apache Kafka (partitioned topics, event streaming), BullMQ (Redis-backed queues)\n` +
      `- Cloud & DevOps: Docker, Docker Compose, GitHub Actions CI/CD, Vercel, Prometheus & Grafana observability\n` +
      `- AI & LLMs: Gemini embeddings (pgvector), Groq, OpenAI, Claude, Vercel AI SDK, Agentic AI, Cursor, Copilot\n` +
      `- Testing & Quality: Jest (Unit & Integration Testing), ESLint, Defensive Architecture`
    );
  }

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
    'samirshaikh-dev'
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

    const text = `--- Context (certificates) ---\nVerified Professional Certificates & Credentials of Samir Shaikh:\n${lines.join('\n')}\nURL: /certificates`;

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
    const { text: matchedFaqs, sources: faqSources } = getMatchingFaqs(latestMessage);
    const { text: matchedServices, sources: serviceSources } = getMatchingServices(latestMessage);
    const { text: matchedTechSkills, sources: techSkillSources } = getMatchingTechnicalSkills(latestMessage);
    const { text: matchedCerts, sources: certSources } = await getMatchingCertificates(latestMessage);

    sources.push(...serviceSources, ...faqSources, ...techSkillSources, ...certSources);

    // Embed last 2-3 messages joined for better follow-up understanding
    const embedWindow = messages.slice(-3).join(' ');

    const { embedding } = await embed({
      model: google.embedding('gemini-embedding-2'),
      value: embedWindow,
    });

    const relevantChunks = await db
      .select({
        sourceId: contentChunks.sourceId,
        text: contentChunks.chunkText,
        sourceType: contentChunks.sourceType,
        distance: cosineDistance(contentChunks.embedding, embedding),
      })
      .from(contentChunks)
      .orderBy(cosineDistance(contentChunks.embedding, embedding))
      .limit(4);

    const filteredChunks = relevantChunks.filter((c) => (c.distance as number) <= MAX_DISTANCE);

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

    // Build context with proper titles for all source types
    let contextText = filteredChunks
      .map((chunk, i) => {
        const exactUrl = urlMap.get(chunk.sourceId);
        const exactTitle = titleMap.get(chunk.sourceId);

        let header = `--- Context ${i + 1} (${chunk.sourceType}) ---`;
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

        if (chunk.sourceType === 'about') {
          if (!exactTitle) header += `\nExact Title: About Samir`;
          sources.push({ title: 'About Samir', type: 'about', url: '/about' });
        }
        if (chunk.sourceType === 'experience') {
          if (!exactTitle) header += `\nExact Title: Work Experience`;
          sources.push({ title: 'Work Experience', type: 'experience', url: '/about#experience' });
        }

        return `${header}\n${chunk.text}`;
      })
      .join('\n\n');

    // Only fetch GitHub activity if the message is plausibly about it
    if (isGithubRelevant(latestMessage)) {
      const githubEvents = await getGithubEventsCached();
      if (githubEvents) {
        contextText += `\n\n--- Context ${filteredChunks.length + 1} (github_activity) ---\n${githubEvents}`;
        sources.push({
          title: 'Recent GitHub Activity',
          type: 'github',
          url: 'https://github.com/samirshaikh-dev',
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