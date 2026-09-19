import { readFile } from "node:fs/promises";
import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { GOOGLE_API_KEY, GROQ_API_KEY, AI_PROVIDER, AI_MODEL } from "./config.mjs";
import { TOPIC_PILLARS } from "./topics.mjs";
import { slugify } from "./utils.mjs";
import { SEO_DIRECTIVES, getSeoGuidance } from "./skills.mjs";

// Sections of public/llms.txt that are irrelevant to writing technical blog
// posts (client process / pricing / legal boilerplate). Dropping them keeps
// the prompt small enough for low-token-budget providers/tiers.
const GROUNDING_SKIP_SECTIONS = new Set([
  "## Quick Links",
  "## Engineering & Freelance Services Offered",
  "## How I Work (Client Engagement Process)",
  "## Legal",
]);

const DEFAULT_PROMPT_BUDGET = 6000;

/**
 * Estimates token count from character length (rough, conservative).
 * @param {string} text
 * @returns {number}
 */
function estimateTokens(text) {
  return text ? Math.ceil(text.length / 4) : 0;
}

/**
 * Loads the technical grounding context from public/llms.txt.
 * This file contains verified facts about Samir's skills, projects, and experience.
 * The AI model uses this to generate accurate, non-hallucinated content.
 * Non-technical sections (Quick Links, services/pricing, engagement process, legal)
 * are stripped to conserve prompt budget.
 * Runs in GitHub Actions where the repo is already cloned.
 * @returns {Promise<string>} The grounding context text, empty string if file not found
 */
export async function loadGroundingContext() {
  try {
    const raw = await readFile(new URL("../../public/llms.txt", import.meta.url), "utf-8");
    const lines = raw.split("\n");
    const kept = [];
    let inSkippedSection = false;
    for (const line of lines) {
      if (/^## /.test(line)) {
        inSkippedSection = GROUNDING_SKIP_SECTIONS.has(line.trim());
      }
      if (!inSkippedSection) kept.push(line);
    }
    return kept.join("\n").trim();
  } catch {
    console.warn("public/llms.txt not found, generating without grounding context.");
    return "";
  }
}

/**
 * Retry wrapper for generatePost — LLMs occasionally malform structured output.
 * @param {Object} params - Same as generatePost params
 * @param {number} [maxRetries=2] - Max retry attempts
 * @returns {Promise<Object>} Parsed post
 */
export async function generatePostWithRetry(params, maxRetries = 2) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await generatePost(params);
    } catch (err) {
      if (i === maxRetries) throw err;
      console.warn(`[generatePost] Attempt ${i + 1} failed, retrying:`, err.message);
    }
  }
}

/**
 * Generates a blog post using the provider/model configured via AI_CHAT_PROVIDER
 * and AI_CHAT_MODEL (defaults to Groq's llama-3.3-70b-versatile).
 * Uses grounded context from llms.txt to prevent hallucinations.
 * Includes anti-patterns list to avoid generic/corporate writing.
 * @param {Object} params - Generation parameters
 * @param {string} params.groundingContext - Verified facts about Samir from llms.txt
 * @param {string[]} params.existingTitles - Titles to avoid duplicating
 * @param {string[]} [params.existingSlugs] - Existing slugs for collision detection
 * @returns {Promise<Object>} Parsed post with title, slug, excerpt, markdown
 */
export async function generatePost({ groundingContext, existingTitles, existingSlugs = [] }) {
  const model = AI_PROVIDER === "google"
    ? createGoogleGenerativeAI({ apiKey: GOOGLE_API_KEY })(AI_MODEL)
    : createGroq({ apiKey: GROQ_API_KEY })(AI_MODEL);

  const { text: seoSkillGuidance, mode: guidanceMode } = await getSeoGuidance();

  const titlesDump = existingTitles.length ? existingTitles.map((t) => `- ${t}`).join("\n") : "(none yet)";
  const pillarDump = TOPIC_PILLARS.map((p, i) =>
    `[${i}] ${p.title} — main keyword: ${p.seo.mainKeyword} — outline: ${p.outline.join(" → ")}`
  ).join("\n\n");

  const buildPrompt = (skillText) => `You are ghostwriting a technical blog post for Samir Shaikh's personal engineering blog.

GROUNDING FACTS (only true, verifiable information about Samir — do not invent experience, employers, metrics, or claims beyond what's here or reasonably explained as general technical knowledge):
<CONTEXT>
${groundingContext}
</CONTEXT>

ALREADY-PUBLISHED TITLES (write about something meaningfully different from all of these):
${titlesDump}

CANDIDATE TOPIC PILLARS — pick the one least covered by the titles above, narrow it to one concrete angle, and follow its SEO brief:
${pillarDump}

SEO / AEO / PERSONAL-AUTHORITY SKILL REFERENCES — these are the site's own SEO engineering skills. Apply them to this post as mandatory requirements:
<SEO_SKILL_REFERENCES>
${skillText}
</SEO_SKILL_REFERENCES>

SEO WRITING RULES:
1. Use the main keyword naturally in the first paragraph, the H1 title, and at least one H2 heading.
2. Sprinkle 2–3 long-tail keywords across H2/H3 headings and body prose — never stuff them.
3. Structure: H1 title → intro (keyword in first sentence, direct answer to the post's main question) → H2 sections matching the outline → conclusion with internal links.
4. Each H2 should be a clear, scannable heading (problem, architecture, implementation, pitfalls, conclusion pattern).
5. Include at least one code block per major H2 section — tested, runnable code ranks higher than prose alone.
6. End with a conclusion that links to 1–2 related pillar articles (use the relatedTo indices above).

WRITING RULES:
1. First person, as Samir. Technical, specific, and grounded in the real projects/stack in the context above.
2. Lead with a direct, concrete opening claim (no throat-clearing like "In today's world..."). Answer-first structure.
3. Include at least one concrete number, metric, or specific technical detail per major section where honestly possible (avoid vague claims).
4. Use Markdown: a single H1 title, H2 section headings, code blocks with language tags where relevant, and a short concluding section.
5. Do not fabricate company names, coworkers, client quotes, or metrics that are not implied by the grounding context. If unsure, write about the general technical pattern instead of a specific unverifiable claim.
6. Length: 700-1100 words.

VOICE EXAMPLES (match this tone):
- "I spent three days debugging a race condition in our BullMQ worker..."
- "Here's what actually happens when pgvector scans a 1M row index..."
- "The trick with NextAuth v5 is understanding how session callbacks compose..."

ANTI-PATTERNS (never do these):
- Starting with "In today's fast-paced world..." or "In the realm of..."
- Using filler words: "leverage", "synergy", "game-changer", "seamless", "cutting-edge", "robust", "scalable"
- Making up specific company names, client numbers, or team sizes
- Writing generic conclusions like "In conclusion..." or "To sum up..."
- Using bullet points for the entire post (use prose with code blocks)
- Repeating the same sentence structure multiple times

OUTPUT FORMAT: Respond with ONLY the following structure (no markdown fences, no preamble). The <markdown> block MUST be the very last thing in your response — nothing after the closing </markdown> tag.
<title>SEO-optimized post title (main keyword near start, under 65 chars)</title>
<slug>url-safe-slug</slug>
<excerpt>one or two sentence summary, under 200 characters, includes main keyword</excerpt>
<metaTitle>SEO meta title for Google (under 60 chars, includes main keyword)</metaTitle>
<metaDescription>SEO meta description for Google (under 160 chars, includes main keyword and a call to action)</metaDescription>
<tags>comma-separated relevant tags, lowercase</tags>
<markdown>
# Post Title
Full markdown body here...
</markdown>`;

  let prompt = buildPrompt(seoSkillGuidance);
  const budget = Number(process.env.BLOG_PROMPT_BUDGET ?? DEFAULT_PROMPT_BUDGET) || DEFAULT_PROMPT_BUDGET;

  if (estimateTokens(prompt) > budget && guidanceMode === "full-skill-refs") {
    console.warn(
      `[generate.mjs] Prompt ~${estimateTokens(prompt)} tokens exceeds BLOG_PROMPT_BUDGET (${budget}); falling back to distilled skill directives.`
    );
    prompt = buildPrompt(SEO_DIRECTIVES);
  }

  if (estimateTokens(prompt) > budget) {
    throw new Error(
      `Prompt is ~${estimateTokens(prompt)} tokens which exceeds BLOG_PROMPT_BUDGET (${budget}). ` +
      `Reduce prompt size (e.g. shorten grounding context) or raise BLOG_PROMPT_BUDGET for this provider/tier.`
    );
  }

  console.log(`[generate.mjs] Prompt ready: ~${estimateTokens(prompt)} tokens (${guidanceMode} skill guidance, budget ${budget}).`);

  let text;
  let finishReason;
  try {
    const result = await generateText({
      model,
      prompt,
      temperature: 0.5,
      maxTokens: 3000,
    });
    text = result.text;
    finishReason = result.finishReason;
  } catch (err) {
    throw new Error(`AI generation request failed (${AI_PROVIDER}/${AI_MODEL}): ${err.message}`);
  }

  if (finishReason === "length") {
    throw new Error("Generation truncated due to token limit — increase maxTokens.");
  }

  /**
   * Extracts content between XML-style tags from model output.
   * For <markdown>, anchors to end-of-string to avoid early termination
   * on code blocks that contain angle-bracket text.
   * @param {string} tag - The tag name to extract
   * @returns {string|null} The trimmed content inside the tag, or null if not found
   */
  const getTag = (tag) => {
    const pattern = tag === "markdown"
      ? new RegExp(`<markdown>([\\s\\S]*)<\\/markdown>\\s*$`, "i")
      : new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i");
    const match = text.match(pattern);
    return match ? match[1].trim() : null;
  };

  const parsed = {
    title: getTag("title"),
    slug: getTag("slug"),
    excerpt: getTag("excerpt"),
    metaTitle: getTag("metaTitle"),
    metaDescription: getTag("metaDescription"),
    tags: getTag("tags"),
    markdown: getTag("markdown"),
  };

  if (!parsed.title || !parsed.markdown) {
    throw new Error(`Model output missing required fields (title or markdown). Raw output:\n${text}`);
  }

  // Normalize tags: split, trim, lowercase, dedupe
  parsed.tags = [...new Set(
    (parsed.tags || "")
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(Boolean)
  )].join(", ");

  // Validate and fix excerpt length
  if (!parsed.excerpt || parsed.excerpt.length > 200) {
    const firstParagraph = parsed.markdown.split("\n\n")[1] || "";
    if (!firstParagraph.trim()) {
      console.warn("[generatePost] Could not derive excerpt fallback; markdown structure unexpected.");
    }
    parsed.excerpt = firstParagraph.slice(0, 197).trim() + "...";
  }

  // SEO fallbacks: metaTitle from title, metaDescription from excerpt
  if (!parsed.metaTitle) {
    parsed.metaTitle = parsed.title?.slice(0, 60) || "";
  }
  if (!parsed.metaDescription) {
    parsed.metaDescription = parsed.excerpt?.slice(0, 160) || "";
  }

  parsed.slug = slugify(parsed.slug || parsed.title);

  // Check for slug collision against existing slugs
  if (existingSlugs.includes(parsed.slug)) {
    let suffix = 2;
    while (existingSlugs.includes(`${parsed.slug}-${suffix}`)) suffix++;
    parsed.slug = `${parsed.slug}-${suffix}`;
    console.warn(`[generatePost] Slug collision resolved: appended -${suffix}`);
  }

  // Attach the best-matching pillar keyword so the validator can enforce
  // keyword presence in title/body (anti-cannibalization, per the SEO skills).
  parsed.keyword = findMatchedKeyword({
    title: parsed.title,
    excerpt: parsed.excerpt,
    markdown: parsed.markdown,
    metaTitle: parsed.metaTitle,
  });

  return parsed;
}

/**
 * Scores every pillar's main + long-tail keywords by occurrence across the
 * generated post and returns the single best-matching main keyword.
 * Case-, space-, and punctuation-insensitive matching.
 * @param {Object} post - { title, excerpt, markdown, metaTitle }
 * @returns {string} The matched main keyword (or "" if none found)
 */
export function findMatchedKeyword(post) {
  const haystack = normalizeText(
    [post.title, post.metaTitle, post.excerpt, post.markdown].filter(Boolean).join(" ")
  );
  let best = null;
  let bestScore = 0;

  for (const pillar of TOPIC_PILLARS) {
    const score = scoreKeyword(haystack, pillar.seo.mainKeyword) +
      pillar.seo.longTailKeywords.reduce((acc, k) => acc + scoreKeyword(haystack, k), 0);
    if (score > bestScore) {
      bestScore = score;
      best = pillar.seo.mainKeyword;
    }
  }

  return bestScore > 0 ? best : "";
}

/**
 * Normalizes text for keyword matching: lowercase, collapse whitespace,
 * strip punctuation.
 * @param {string} text
 * @returns {string}
 */
function normalizeText(text) {
  return text.toLowerCase().replace(/[\u2018\u2019'"]/g, "'").replace(/[.,/#!$%^&*;:{}=\-_`~()\[\]]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Counts non-overlapping occurrences of a keyword phrase in normalized text.
 * @param {string} haystack - normalized text
 * @param {string} keyword - raw keyword phrase
 * @returns {number} occurrence count
 */
function scoreKeyword(haystack, keyword) {
  const needle = normalizeText(keyword);
  if (!needle) return 0;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = haystack.match(new RegExp(escaped, "g"));
  return matches ? matches.length : 0;
}
