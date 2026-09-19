import { readFile } from "node:fs/promises";

const SKILL_FILES = [
  {
    label: "seo-engineer",
    // filesystem path relative to scripts/blog/
    path: "../../agents/skills/seo-engineer/SKILL.md",
    requiredSections: [
      "Engineering Principles",
      "AEO/GEO specifics",
      "Implementation Guidelines",
    ],
  },
  {
    label: "seo-keyword-research-implementation",
    path: "../../agents/skills/seo-keyword-research-implementation/SKILL.md",
    requiredSections: [
      "Non-Negotiable Rules",
      "Keyword Research Guidance",
      "Content Optimization Guidelines",
      "On-Page Implementation Checklist",
    ],
  },
  {
    label: "personal-seo-profile-optimizer",
    path: "../../agents/skills/personal-seo-profile-optimizer/SKILL.md",
    requiredSections: [
      "The hard rules",
      "Step 2 — Research",
      "Step 4 — Gap analysis",
    ],
  },
];

/**
 * Strips YAML frontmatter (--- ... ---) from the start of a skill file.
 * @param {string} content - Raw file content
 * @returns {string} Content without the frontmatter block
 */
function stripFrontmatter(content) {
  return content
    .replace(/^---[\s\S]*?---[\r\n]*/, "")
    .trim();
}

/**
 * Compact distilled directives synthesized from the site's SEO/AEO skills.
 * Used by default so the prompt fits low-token-budget providers/tiers;
 * the full skill files are available via BLOG_FULL_SKILL_REFS=true.
 * @type {string}
 */
export const SEO_DIRECTIVES = `SEO / AEO / PERSONAL-AUTHORITY RULES (distilled from the site's seo-engineer, seo-keyword-research-implementation, and personal-seo-profile-optimizer skills):

AEO/GEO structure (seo-engineer):
- Lead every major section with a clear, direct, quotable answer to the implied question before elaborating — this is what answer engines extract and cite.
- One H1 title; logical H2/H3 nesting, no skipped heading levels.
- Answer-first intro: the first sentence directly answers the post's main question.
- One canonical article per topic — this post must be meaningfully distinct from every title above.

Keyword strategy (seo-keyword-research-implementation):
- One primary keyword and its cluster per post: use it in the H1 title, meta title/description, first paragraph, and at least one H2 heading.
- Work in 2-3 secondary/long-tail terms naturally across H2/H3s and prose. Never stuff, never chase density targets, never cannibalize another article's keywords.
- Internal links use descriptive (not generic) anchor text to related pillar articles from the outlines above.
- FAQ sections only: real questions readers ask, each with a direct, extractable answer (include only if genuinely relevant).

Personal-authority hard rules (personal-seo-profile-optimizer):
- Never claim a skill, employer, client, project, or metric that <CONTEXT> does not demonstrate. If a specific claim is unsupported, write about the general technical pattern instead.
- No fabricated numbers, benchmarks, or statistics. Only real figures from <CONTEXT> or generic, clearly-stated engineering facts.
- Accuracy before keyword quantity; natural human-expert voice, written first-person as Samir.`;

/**
 * Loads the SEO/AEO skill files at runtime and returns them as a combined,
 * labeled reference block for the generation prompt.
 * Fail-open: a missing/unreadable skill file is skipped with a warning rather
 * than breaking the pipeline.
 * @returns {Promise<string>} Combined skill reference text ("" if none loaded)
 */
export async function loadSeoSkillGuidance() {
  const blocks = [];

  for (const skill of SKILL_FILES) {
    try {
      const raw = await readFile(new URL(skill.path, import.meta.url), "utf-8");
      blocks.push(`<skill:${skill.label}>\n${stripFrontmatter(raw)}\n</skill:${skill.label}>`);
    } catch {
      console.warn(`[skills.mjs] Could not load skill file ${skill.path}; skipping.`);
    }
  }

  return blocks.join("\n\n");
}

/**
 * Returns the skill guidance for the generation prompt.
 * Defaults to the compact distilled SEO_DIRECTIVES block; when
 * BLOG_FULL_SKILL_REFS=true, the full skill files are loaded at runtime instead
 * (only suitable for models/tiers with generous token budgets).
 * @returns {Promise<{ text: string, mode: string }>}
 */
export async function getSeoGuidance() {
  const useFullRefs = (process.env.BLOG_FULL_SKILL_REFS ?? "false").toLowerCase() === "true";
  if (useFullRefs) {
    const full = await loadSeoSkillGuidance();
    if (full) return { text: full, mode: "full-skill-refs" };
    console.warn("[skills.mjs] Full skill refs requested but no skill files loaded; falling back to distilled directives.");
  }
  return { text: SEO_DIRECTIVES, mode: "distilled" };
}