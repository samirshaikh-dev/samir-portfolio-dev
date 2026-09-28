"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags?: string[] | null;
  published_at: string;
  stars?: number;
}

interface BlogListProps {
  initialBlogs: Blog[];
  hideSearch?: boolean;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function estimateReadingTime(text: string | null): string {
  if (!text) return "3 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(2, Math.round(words / 40));
  return `${minutes} min read`;
}

export default function BlogList({ initialBlogs, hideSearch = false }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  // Dynamic list of unique tags from blogs
  const filterTabs = useMemo(() => {
    const tagsSet = new Set<string>();
    initialBlogs.forEach((blog) => {
      blog.tags?.forEach((tag) => {
        if (tag && tag.trim()) tagsSet.add(tag.trim());
      });
    });
    return ["all", ...Array.from(tagsSet)];
  }, [initialBlogs]);

  // Filtering by search text and selected tag
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const query = searchQuery.toLowerCase().trim();
      const titleMatch = blog.title.toLowerCase().includes(query);
      const excerptMatch = blog.excerpt?.toLowerCase().includes(query) || false;
      const tagMatch = blog.tags?.some((t) => t.toLowerCase().includes(query)) || false;

      const matchesSearch = !query || titleMatch || excerptMatch || tagMatch;

      if (!matchesSearch) return false;

      if (activeTag === "all") return true;
      return blog.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase()) || false;
    });
  }, [initialBlogs, searchQuery, activeTag]);

  // Two-tier showcase when on "all" with no search query
  const isDefaultView = activeTag === "all" && !searchQuery.trim();
  const featuredBlog = isDefaultView && filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const gridBlogs = isDefaultView && filteredBlogs.length > 0 ? filteredBlogs.slice(1) : filteredBlogs;

  return (
    <div className="space-y-10">
      {/* Search & Topic Filters */}
      {!hideSearch && (
        <div className="space-y-5">
          {/* Accessible Search Input */}
          <div className="relative w-full group">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-text-muted group-focus-within:text-foreground transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              id="blog-search"
              type="search"
              className="block w-full pl-12 pr-4 py-3.5 sm:py-4 text-sm sm:text-base text-foreground bg-hover-bg border border-border-primary rounded-2xl focus:bg-background focus:ring-4 focus:ring-border-primary focus:border-text-muted focus:outline-none transition-all placeholder-text-muted"
              placeholder="Search articles by topic, architecture, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Pills (Section 6.1 in new-theme.md) */}
          {filterTabs.length > 1 && (
            <div
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
              role="tablist"
              aria-label="Filter articles by topic"
            >
              {filterTabs.map((tab) => {
                const isActive = activeTag === tab;
                const label = tab === "all" ? "All Topics" : tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTag(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
                      isActive
                        ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] border-foreground dark:border-accent-lime shadow-xs font-bold"
                        : "bg-background dark:bg-card-bg text-text-secondary border-border-primary hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {/* ARIA live region announcing filtered count */}
          <div aria-live="polite" className="sr-only">
            {filteredBlogs.length} articles found
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-footer-bg rounded-2xl border border-border-primary">
          <p className="text-text-muted text-base sm:text-lg">
            No articles found matching &ldquo;{searchQuery || activeTag}&rdquo;
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTag("all");
            }}
            className="mt-4 text-sm font-semibold text-foreground underline hover:text-text-secondary transition-colors"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* FEATURED POST SHOWCASE (Bento Editorial Style) */}
          {featuredBlog && (
            <article
              className="group relative flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 bg-background dark:bg-card-bg border border-border-primary rounded-3xl p-6 sm:p-8 hover:border-foreground/30 hover:shadow-xl transition-all duration-300"
              aria-label={`Featured post: ${featuredBlog.title}`}
            >
              <Link
                href={`/blogs/${featuredBlog.slug}`}
                className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-hover-bg border border-border-primary/80 block"
              >
                {featuredBlog.cover_image_url ? (
                  <Image
                    src={optimizeCloudinaryUrl(featuredBlog.cover_image_url, { width: 1000 })}
                    alt={`Cover image for ${featuredBlog.title}`}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-radial-gradient text-border-primary">
                    <span
                      className="text-7xl font-bold opacity-30"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {featuredBlog.title.charAt(0)}
                    </span>
                  </div>
                )}
              </Link>

              <div className="lg:col-span-5 flex flex-col justify-between py-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                      FEATURED ARTICLE
                    </span>
                    <span className="text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider">
                      {formatDate(featuredBlog.published_at)}
                    </span>
                  </div>

                  <Link href={`/blogs/${featuredBlog.slug}`} className="block group/title">
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground group-hover/title:text-text-secondary transition-colors leading-tight mb-3">
                      {featuredBlog.title}
                    </h2>
                  </Link>

                  {featuredBlog.excerpt && (
                    <p className="text-sm sm:text-base text-text-muted line-clamp-3 sm:line-clamp-4 leading-relaxed mb-4">
                      {featuredBlog.excerpt}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-border-primary flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
                    <span>{estimateReadingTime(featuredBlog.excerpt)}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      {featuredBlog.stars ?? 0}
                    </span>
                  </div>

                  <Link
                    href={`/blogs/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-xs sm:text-sm font-extrabold px-5 py-2.5 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* GRID OF ARTICLES */}
          {gridBlogs.length > 0 && (
            <div className="space-y-6">
              {featuredBlog && (
                <div className="border-b border-border-primary/80 pb-3">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    All Publications
                  </h3>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {gridBlogs.map((blog, index) => (
                  <article
                    key={blog.id}
                    className="group flex flex-col bg-background dark:bg-card-bg border border-border-primary rounded-2xl overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all duration-300"
                  >
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="block relative aspect-[16/10] bg-hover-bg overflow-hidden border-b border-border-primary"
                    >
                      {blog.cover_image_url ? (
                        <Image
                          src={optimizeCloudinaryUrl(blog.cover_image_url, { width: 700 })}
                          alt={`Cover image for ${blog.title}`}
                          fill
                          priority={index === 0 && !featuredBlog}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-border-primary">
                          <span
                            className="text-5xl font-bold opacity-30"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {blog.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-col flex-1 p-6">
                      {/* Meta badges row */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-[10px] font-mono font-medium tracking-wide uppercase text-text-muted bg-hover-bg/80 border border-border-primary/60 px-2 py-0.5 rounded-md">
                          {formatDate(blog.published_at)}
                        </span>
                        {blog.tags && blog.tags[0] && (
                          <span className="text-[10px] font-mono font-medium tracking-wide uppercase text-text-secondary bg-hover-bg/80 border border-border-primary/60 px-2 py-0.5 rounded-md">
                            {blog.tags[0]}
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-medium flex items-center gap-1 text-text-muted bg-hover-bg/80 border border-border-primary/60 px-2 py-0.5 rounded-md ml-auto">
                          <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          {blog.stars ?? 0}
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/blogs/${blog.slug}`} className="block group-hover:text-text-secondary transition-colors">
                        <h3 className="text-xl font-bold text-foreground mb-2.5 leading-snug line-clamp-2">
                          {blog.title}
                        </h3>
                      </Link>

                      {/* Excerpt */}
                      {blog.excerpt && (
                        <p className="text-xs sm:text-sm text-text-muted line-clamp-2 mb-4 flex-1 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      )}

                      {/* Card Footer */}
                      <div className="flex items-center justify-between pt-4 mt-auto border-t border-border-primary">
                        <span className="text-[11px] font-mono text-text-muted">
                          {estimateReadingTime(blog.excerpt)}
                        </span>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="text-xs font-bold text-foreground hover:text-text-secondary transition-colors flex items-center gap-1.5 group/link"
                        >
                          Read Article
                          <svg
                            className="w-3 h-3 transition-transform group-hover/link:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
