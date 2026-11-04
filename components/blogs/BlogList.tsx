"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiSearch, FiX, FiClock, FiStar } from "react-icons/fi";
import BlogCoverImage from "./BlogCoverImage";

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
  const minutes = Math.max(3, Math.round(words / 40));
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
    <div className="space-y-12">
      {/* ── SEARCH & TOPIC FILTERS ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-border-primary/80 bg-background dark:bg-card-bg shadow-2xs">
        {/* Topic Filter Pills */}
        {filterTabs.length > 1 && (
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none"
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap border ${
                    isActive
                      ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] border-foreground dark:border-accent-lime shadow-2xs"
                      : "bg-hover-bg/50 text-text-secondary border-border-primary/60 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Monospace Search Bar with Keyboard Focus Shortcut */}
        {!hideSearch && (
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted group-focus-within:text-foreground transition-colors">
              <FiSearch className="h-4 w-4" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-9 py-2 text-xs sm:text-sm text-foreground bg-hover-bg/60 border border-border-primary/80 rounded-xl focus:bg-background focus:ring-2 focus:ring-accent-lime focus:border-foreground/40 focus:outline-none transition-all placeholder:text-text-muted/70 font-mono"
              placeholder="Search by topic, architecture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-foreground"
              >
                <FiX className="h-4 w-4" />
              </button>
            ) : (
              <span className="hidden sm:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
                <kbd className="text-[10px] font-mono text-text-muted bg-background/80 border border-border-primary/70 px-1.5 py-0.5 rounded">
                  /
                </kbd>
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── EMPTY STATE ──────────────────────────────────────────────────────── */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-20 px-6 rounded-2xl border border-border-primary/80 bg-hover-bg/30">
          <p className="text-base sm:text-lg font-bold text-foreground">
            No articles found matching &ldquo;{searchQuery || activeTag}&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or clearing the active topic filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTag("all");
            }}
            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ── ARTICLES ARCHIVE CONTENT ────────────────────────────────────────── */}
      {filteredBlogs.length > 0 && (
        <div className="space-y-16">
          {/* FEATURED PUBLICATION SHOWCASE (Bento Editorial Style) */}
          {featuredBlog && (
            <article
              className="group rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-6 sm:p-8 md:p-10 hover:border-foreground/30 transition-all duration-200 shadow-2xs"
              aria-label={`Featured article: ${featuredBlog.title}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Cover Image */}
                <div className="lg:col-span-6 overflow-hidden rounded-2xl">
                  <Link
                    href={`/blogs/${featuredBlog.slug}`}
                    className="block group/img focus:outline-none"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <BlogCoverImage
                      coverImageUrl={featuredBlog.cover_image_url}
                      title={featuredBlog.title}
                      tag={featuredBlog.tags?.[0]}
                      aspectRatio="card"
                      priority={true}
                    />
                  </Link>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-5">
                  <div>
                    {/* Meta Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary/80 bg-hover-bg/70 text-[10px] font-mono font-medium tracking-wider text-foreground uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                        FEATURED ESSAY
                      </span>
                      {featuredBlog.tags?.[0] && (
                        <span className="text-xs font-mono text-text-muted bg-hover-bg/40 border border-border-primary/50 px-2.5 py-0.5 rounded-full">
                          {featuredBlog.tags[0]}
                        </span>
                      )}
                      <span className="text-xs font-mono text-text-muted ml-auto">
                        {formatDate(featuredBlog.published_at)}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/blogs/${featuredBlog.slug}`}>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight hover:text-text-secondary transition-colors leading-[1.15]">
                        {featuredBlog.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    {featuredBlog.excerpt && (
                      <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                        {featuredBlog.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Actions & Telemetry Footer */}
                  <div className="pt-4 border-t border-border-primary/60 flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3.5 h-3.5" />
                        <span>{estimateReadingTime(featuredBlog.excerpt)}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <FiStar className="w-3.5 h-3.5 text-accent-lime fill-accent-lime/20" />
                        <span>{featuredBlog.stars ?? 0}</span>
                      </span>
                    </div>

                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] hover:opacity-90 transition-opacity"
                    >
                      <span>Read Breakdown</span>
                      <FiArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* ALL ARTICLES GRID */}
          {gridBlogs.length > 0 && (
            <section aria-labelledby="all-articles-heading" className="space-y-6">
              {featuredBlog && (
                <div className="flex items-baseline justify-between border-b border-border-primary/80 pb-3">
                  <h3
                    id="all-articles-heading"
                    className="text-xl sm:text-2xl font-black tracking-tight text-foreground"
                  >
                    All Publications &amp; Technical Logs
                  </h3>
                  <span className="text-xs font-mono text-text-muted">
                    {gridBlogs.length} {gridBlogs.length === 1 ? "Article" : "Articles"}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridBlogs.map((blog, index) => (
                  <article
                    key={blog.id}
                    className="group rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-5 sm:p-6 hover:border-foreground/30 transition-all duration-200 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Cover Thumbnail */}
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="block overflow-hidden rounded-2xl mb-4 focus:outline-none"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <BlogCoverImage
                          coverImageUrl={blog.cover_image_url}
                          title={blog.title}
                          tag={blog.tags?.[0]}
                          aspectRatio="card"
                          priority={index < 2 && !featuredBlog}
                        />
                      </Link>

                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className="text-[11px] font-mono text-text-muted">
                          {formatDate(blog.published_at)}
                        </span>
                        {blog.tags?.[0] && (
                          <>
                            <span className="text-border-primary">&bull;</span>
                            <span className="text-[10px] font-mono text-foreground bg-hover-bg/70 border border-border-primary/60 px-2 py-0.5 rounded-full">
                              {blog.tags[0]}
                            </span>
                          </>
                        )}
                        <span className="text-[11px] font-mono text-text-muted ml-auto flex items-center gap-1">
                          <FiStar className="w-3 h-3 text-accent-lime" />
                          <span>{blog.stars ?? 0}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/blogs/${blog.slug}`}>
                        <h4 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-text-secondary transition-colors leading-snug line-clamp-2">
                          {blog.title}
                        </h4>
                      </Link>

                      {/* Excerpt */}
                      {blog.excerpt && (
                        <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                          {blog.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="mt-5 pt-3.5 border-t border-border-primary/60 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-text-muted">
                        {estimateReadingTime(blog.excerpt)}
                      </span>
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-text-secondary transition-colors"
                      >
                        <span>Read Article</span>
                        <FiArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ── CLOSING EDITORIAL SUBSCRIPTION & DISCUSSION BOX ─────────────────── */}
      <section className="rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-8 sm:p-10 md:p-12 shadow-2xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            <span>KNOWLEDGE SHARING &amp; TECHNICAL EXCHANGES</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
            Have a question on these architectures or want to collaborate?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            I regularly publish practical engineering breakdowns on backend infrastructure, vector search, and agentic workflows. Reach out to discuss system challenges or suggest topics.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] hover:opacity-90 transition-opacity"
            >
              <span>Get in Touch</span>
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs sm:text-sm font-mono font-medium text-foreground border border-border-primary/80 hover:border-foreground/30 bg-hover-bg/30 transition-colors"
            >
              <span>Explore Case Studies</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
