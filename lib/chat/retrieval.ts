import { embed } from 'ai';
import { google } from '@ai-sdk/google';
import { db } from '@/lib/db';
import { contentChunks, blogs, projects } from '@/lib/schema';
import { cosineDistance, inArray } from 'drizzle-orm';
import { getRecentGithubEvents } from '@/lib/github';
import { FAQS } from '@/lib/data/faqs';
import {
  SERVICE_CATEGORIES,
  ENGAGEMENT_MODELS,
  SERVICES_FAQS,
} from '@/lib/data/services';

const MAX_DISTANCE = 0.5;

export interface GroundingSource {
  title: string;
  type: 'project' | 'blog' | 'service' | 'experience' | 'github' | 'faq' | 'about';
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

export async function getRelevantContextWithSources(messages: string[]): Promise<ContextResult> {
  const sources: GroundingSource[] = [];
  try {
    const latestMessage = messages[messages.length - 1] || '';
    const { text: matchedFaqs, sources: faqSources } = getMatchingFaqs(latestMessage);
    const { text: matchedServices, sources: serviceSources } = getMatchingServices(latestMessage);

    sources.push(...serviceSources, ...faqSources);

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