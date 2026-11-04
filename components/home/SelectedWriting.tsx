import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url?: string | null;
  tags?: string[] | null;
  published_at?: string | null;
  stars?: number | null;
}

interface SelectedWritingProps {
  blogs: BlogItem[];
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "";
  }
}

export default function SelectedWriting({ blogs }: SelectedWritingProps) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section
      className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-border-primary/80"
      aria-label="Selected technical writings and engineering articles"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-border-primary/80">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              <span>06 / TECHNICAL WRITING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Selected Writings
            </h2>
            <p className="text-text-muted text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
              In-depth engineering notes on backend architecture, vector databases, API design, and practical lessons learned building real software.
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:text-text-secondary transition-colors group flex-shrink-0"
          >
            <span>View All Articles</span>
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ── 3-COLUMN EDITORIAL ARTICLE GRID ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => {
            const formattedDate = formatDate(blog.published_at);

            return (
              <article
                key={blog.id}
                className="group flex flex-col justify-between rounded-2xl border border-border-primary/80 bg-background dark:bg-card-bg p-6 sm:p-7 hover:border-foreground/30 transition-all duration-200 shadow-2xs"
              >
                <div>
                  {/* Date & Tags */}
                  <div className="flex items-center justify-between gap-2 mb-4 text-[11px] font-mono text-text-muted">
                    {formattedDate && <span>{formattedDate}</span>}
                    {blog.tags && blog.tags.length > 0 && (
                      <span className="px-2 py-0.5 rounded bg-hover-bg/70 text-text-muted font-mono">
                        {blog.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight mb-3 line-clamp-2 group-hover:text-foreground">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="hover:underline underline-offset-4 decoration-border-primary transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  {blog.excerpt && (
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3 mb-6">
                      {blog.excerpt}
                    </p>
                  )}
                </div>

                {/* Footer read link */}
                <div className="pt-4 border-t border-border-primary/60 flex items-center justify-between">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-accent-lime transition-colors"
                  >
                    <span>Read Article</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>

                  {blog.tags && blog.tags.length > 1 && (
                    <span className="text-[10px] font-mono text-text-muted">
                      +{blog.tags.length - 1} more tag
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
