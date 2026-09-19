import { MIN_WORD_COUNT } from "./config.mjs";

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
 * Checks whether a keyword phrase appears in the given text (case- and
 * punctuation-insensitive, phrase-boundary aware).
 * @param {string} text - raw text to search
 * @param {string} keyword - phrase to look for
 * @returns {boolean}
 */
function hasKeyword(text, keyword) {
  const needle = normalizeText(keyword);
  if (!needle) return false;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^| )${escaped}( |$)`).test(normalizeText(text));
}

const THROAT_CLEARING_PATTERNS =
  /\bin today(?:'|’)?s (?:fast|ever)|^welcome|^hi there|^hello(?:,| there)|in the realm of|are you tired of|have you ever wondered|let(?:'|’)s dive in|in the world of|in recent years|in the modern/i;

/**
 * Validates a generated blog post against quality criteria.
 * Checks for: word count, code blocks, H2 sections, no clichés,
 * excerpt length, presence of specific numbers/metrics, main-keyword
 * presence in the title, and a direct-answer opening (AEO/GEO).
 * @param {Object} post - The generated post object
 * @param {string} post.markdown - The markdown content
 * @param {string} post.excerpt - The post excerpt
 * @param {string} post.keyword - Best-matching pillar main keyword
 * @returns {Object} { passes: boolean, score: number, checks: Object, wordCount: number }
 */
export function validatePost(post) {
  const wordCount = post.markdown.trim().split(/\s+/).length;
  const openingLine = post.markdown
    .trim()
    .split("\n")
    .find((line) => line.trim() && !/^\s*#{1,6}\s/.test(line));

  const checks = {
    wordCount: wordCount >= MIN_WORD_COUNT,
    hasCodeBlock: /```[\s\S]+?```/.test(post.markdown),
    hasH2Sections: /^## .+$/m.test(post.markdown),
    noClichés: !/game.?changer|leverage|synergy|seamless|cutting.?edge|robust/i.test(post.markdown),
    excerptLength: post.excerpt && post.excerpt.length <= 200,
    hasNumbers: /\d+/.test(post.markdown),
    hasVariety: !/^(#{1,2}\s+.+\n?){1,2}$/.test(post.markdown.trim()),
    keywordInTitle: Boolean(post.keyword) && hasKeyword(`${post.title} ${post.metaTitle || ""}`, post.keyword),
    directAnswerOpening: Boolean(openingLine) && !THROAT_CLEARING_PATTERNS.test(openingLine.slice(0, 80)),
  };

  const score = Object.values(checks).filter(Boolean).length;
  const passes = score >= 6;

  return { passes, score, checks, wordCount };
}
