"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiShare2, FiStar, FiList } from "react-icons/fi";
import BlogShareButtons from "./BlogShareButtons";
import BlogStarInteraction from "./BlogStarInteraction";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface BlogSidebarProps {
  contentRef: React.RefObject<HTMLElement | null>;
  title: string;
  slug: string;
  initialStars: number;
}

export default function BlogSidebar({
  contentRef,
  title,
  slug,
  initialStars,
}: BlogSidebarProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const mobileTocRef = useRef<HTMLDivElement>(null);

  // Extract headings from content DOM
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const nodes = el.querySelectorAll("h1, h2, h3");
    const items: TocItem[] = [];
    const usedIds = new Set<string>();

    nodes.forEach((node) => {
      const text = (node as HTMLElement).innerText.trim();
      if (!text) return;

      let id = slugify(text);
      if (usedIds.has(id)) {
        let i = 2;
        while (usedIds.has(`${id}-${i}`)) i++;
        id = `${id}-${i}`;
      }
      usedIds.add(id);

      node.setAttribute("id", id);
      items.push({
        id,
        text,
        level: node.tagName === "H1" ? 1 : node.tagName === "H2" ? 2 : 3,
      });
    });

    const commentsEl = document.getElementById("comments");
    if (commentsEl) {
      items.push({
        id: "comments",
        text: "Discussion & Feedback",
        level: 1,
      });
    }

    setHeadings(items);
  }, [contentRef]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Track article reading progress
  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollPos = -rect.top;

      if (scrollPos <= 0) {
        setReadProgress(0);
      } else if (scrollPos >= totalHeight - windowHeight) {
        setReadProgress(100);
      } else {
        const progress = Math.min(
          100,
          Math.max(0, Math.round((scrollPos / (totalHeight - windowHeight)) * 100))
        );
        setReadProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [contentRef]);

  // Smooth scroll handler
  const handleScrollTo = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
    setMobileTocOpen(false);
  }, []);

  return (
    <>
      {/* ── TOP READING PROGRESS BAR (HAIRLINE ACCENT) ──────────────────────── */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-border-primary/40 z-50 pointer-events-none"
      >
        <div
          className="h-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* ── DESKTOP STICKY SIDEBAR ─────────────────────────────────────────── */}
      <aside
        className="hidden lg:block lg:col-span-4"
        aria-label="Article navigation and tools"
      >
        <div className="sticky top-28 space-y-6">
          {/* Table of Contents Card */}
          {headings.length > 0 && (
            <div className="rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-6 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-primary/60">
                <div className="inline-flex items-center gap-2 text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                  <span>ON THIS PAGE</span>
                </div>
                <span className="text-[11px] font-mono text-text-muted">
                  {readProgress}% read
                </span>
              </div>

              <nav aria-label="Table of contents" className="max-h-[calc(100vh-22rem)] overflow-y-auto scrollbar-none pr-1">
                <ul className="space-y-1.5 text-xs font-mono">
                  {headings.map((h) => {
                    const isActive = activeId === h.id;
                    return (
                      <li
                        key={h.id}
                        className={h.level === 3 ? "pl-4" : h.level === 2 ? "pl-2" : ""}
                      >
                        <a
                          href={`#${h.id}`}
                          onClick={(e) => handleScrollTo(e, h.id)}
                          className={`block py-1 px-2 rounded-md transition-colors leading-relaxed line-clamp-1 ${
                            isActive
                              ? "bg-hover-bg/80 text-foreground font-bold border-l-2 border-accent-lime"
                              : "text-text-muted hover:text-foreground hover:bg-hover-bg/40"
                          }`}
                        >
                          {h.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          )}

          {/* Quick Actions Card */}
          <div className="rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5 font-medium">
                <FiShare2 className="w-3.5 h-3.5" />
                <span>Share Article</span>
              </span>
              <BlogShareButtons title={title} slug={slug} compact />
            </div>

            <div className="pt-3 border-t border-border-primary/60 flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5 font-medium">
                <FiStar className="w-3.5 h-3.5 text-accent-lime" />
                <span>Appreciate</span>
              </span>
              <BlogStarInteraction slug={slug} initialStars={initialStars} />
            </div>
          </div>

          {/* Technical Consultation Mini-Callout */}
          <div className="rounded-3xl border border-border-primary/80 bg-hover-bg/30 p-5 shadow-2xs space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>SYSTEM ARCHITECTURE</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-medium">
              Building a production AI system, RAG pipeline, or high-throughput backend?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-text-secondary transition-colors pt-1"
            >
              <span>Discuss Architecture</span>
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ── MOBILE FLOATING TOC BUTTON ──────────────────────────────────────── */}
      {headings.length > 0 && (
        <div className="lg:hidden fixed bottom-6 right-6 z-40" ref={mobileTocRef}>
          <button
            onClick={() => setMobileTocOpen((v) => !v)}
            aria-expanded={mobileTocOpen}
            aria-label="Table of Contents"
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] font-bold text-xs shadow-lg hover:opacity-95 transition-all"
          >
            <FiList className="w-4 h-4" />
            <span>Contents ({readProgress}%)</span>
          </button>

          {mobileTocOpen && (
            <div className="absolute bottom-14 right-0 w-72 max-h-80 overflow-y-auto p-4 rounded-2xl border border-border-primary/80 bg-background dark:bg-card-bg shadow-xl space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-border-primary/60 text-[11px] font-mono text-text-muted uppercase">
                <span>Table of Contents</span>
                <span>{readProgress}%</span>
              </div>
              <ul className="space-y-1 text-xs font-mono">
                {headings.map((h) => (
                  <li key={h.id} className={h.level === 3 ? "pl-3" : h.level === 2 ? "pl-1.5" : ""}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => handleScrollTo(e, h.id)}
                      className="block py-1 px-1.5 rounded text-text-secondary hover:text-foreground hover:bg-hover-bg line-clamp-1"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
