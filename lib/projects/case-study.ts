/**
 * Presentation-layer parsing for the project case study page.
 *
 * Project bodies are stored as sanitized HTML written in the TipTap editor and
 * follow a "Problem — solution/outcome" convention per list item. This module
 * turns that stored HTML into the structure the case study layout renders,
 * without mutating or rewriting the stored content.
 *
 * Zero dependencies: a small tag-level parser is enough for the shapes the CMS
 * produces (flat `h1`-`h3` sections and `ol`/`ul` items).
 */

export interface ChallengeItem {
  /** The problem/pain point, when the item splits on an em dash. */
  challenge: string;
  /** What was built and the resulting outcome. */
  response: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  /** Present when the section body is a list of challenge items. */
  items: ChallengeItem[];
  /** Present when the section body is prose rather than a list. */
  text?: string;
}

export interface ContentImage {
  src: string;
  alt: string;
}

export const DEFAULT_SECTION_TITLE = "Problems I Solved";

/** Slugifies heading text into a stable, URL-safe anchor id. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Strips markup and decodes the entity set the editor can emit, then collapses
 * whitespace so the result is safe to render as plain text.
 */
function toPlainText(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Pulls every `li` out of a section body as plain text, ignoring nesting level. */
function extractListItems(body: string): string[] {
  const items: string[] = [];
  const listItemPattern = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let match: RegExpExecArray | null;
  while ((match = listItemPattern.exec(body)) !== null) {
    const text = toPlainText(match[1]);
    if (text) items.push(text);
  }
  return items;
}

/**
 * Splits an item at its first em dash into the challenge it describes and the
 * response that was built. Items without an em dash stay intact so no content
 * is ever dropped or reordered.
 */
function toChallengeItem(text: string): ChallengeItem {
  const dashIndex = text.indexOf("—");
  if (dashIndex === -1) return { challenge: "", response: text };

  const challenge = text.slice(0, dashIndex).trim();
  const response = text.slice(dashIndex + 1).trim();
  if (!challenge || !response) return { challenge: "", response: text };

  return { challenge, response };
}

/**
 * Parses stored project HTML into renderable sections.
 *
 * When the body has no headings, a single section is produced under
 * `defaultTitle`. When it does, each heading starts a section and any content
 * before the first heading is kept as an untitled-lead section.
 */
export function parseCaseStudy(
  html: string,
  defaultTitle: string = DEFAULT_SECTION_TITLE
): CaseStudySection[] {
  const source = (html ?? "").replace(/<p>\s*<\/p>/gi, "").trim();
  if (!source) return [];

  const sections: CaseStudySection[] = [];

  const addSection = (body: string, title: string) => {
    const heading = title.trim() || defaultTitle;
    const items = extractListItems(body).map(toChallengeItem);
    const text = items.length === 0 ? toPlainText(body) : "";

    if (items.length === 0 && !text) return;

    sections.push({
      id: slugify(heading) || defaultTitle.toLowerCase().replace(/\s+/g, "-"),
      title: heading,
      items,
      ...(text ? { text } : {}),
    });
  };

  const headingPattern = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings = [...source.matchAll(headingPattern)];

  if (headings.length === 0) {
    addSection(source, defaultTitle);
    return sections;
  }

  const firstIndex = headings[0].index ?? 0;
  if (firstIndex > 0) addSection(source.slice(0, firstIndex), defaultTitle);

  headings.forEach((heading, position) => {
    const start = (heading.index ?? 0) + heading[0].length;
    const end =
      position + 1 < headings.length ? headings[position + 1].index ?? source.length : source.length;
    addSection(source.slice(start, end), toPlainText(heading[2]));
  });

  return sections;
}

/** Collects images embedded in the stored body so they can be shown as a gallery. */
export function extractContentImages(html: string): ContentImage[] {
  const images: ContentImage[] = [];
  if (!html) return images;

  const imagePattern = /<img\b[^>]*>/gi;
  for (const match of html.matchAll(imagePattern)) {
    const tag = match[0];
    const src = /\bsrc\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
    if (!src) continue;
    const alt = /\balt\s*=\s*["']([^"']*)["']/i.exec(tag)?.[1] ?? "";
    images.push({ src, alt });
  }

  return images;
}

/**
 * Splits a stored metric string into its headline value and its caption.
 * Matches values such as "82% Resolution", "<1.2s Latency" or "5,000+ Inquiries".
 */
export function parseMetric(metric: string): { value: string; label: string } {
  const match = metric.match(/^([<>]?\s*[\d,.]+[+%kKmMxX\w/]*)\s+(.+)$/);
  if (match) return { value: match[1], label: match[2] };
  return { value: metric, label: "Outcome Benchmark" };
}
