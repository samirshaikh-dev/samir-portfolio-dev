"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  LuSearch,
  LuX,
  LuSparkles,
  LuCircleHelp,
  LuArrowRight,
  LuMail,
  LuMessageSquare,
  LuChevronsUpDown,
  LuChevronUp,
  LuCheck,
  LuRotateCcw,
} from "react-icons/lu";
import type { FAQItem, FAQCategory } from "@/lib/data/faqs";
import FAQAccordionItem from "./FAQAccordionItem";

interface FAQClientProps {
  faqs: FAQItem[];
}

export default function FAQClient({ faqs }: FAQClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set([faqs[0]?.id].filter(Boolean))
  );

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Quick keyboard shortcut (⌘K / Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for hash deep-linking on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const targetFaq = faqs.find((f) => f.id === hash);
      if (targetFaq) {
        const timer = setTimeout(() => {
          setActiveCategory("All");
          setOpenIds(new Set([hash]));
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [faqs]);

  // Derive unique categories and calculate counts
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(faqs.map((item) => item.category))
    ) as FAQCategory[];
    return ["All", ...unique];
  }, [faqs]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: faqs.length };
    for (const faq of faqs) {
      counts[faq.category] = (counts[faq.category] || 0) + 1;
    }
    return counts;
  }, [faqs]);

  // Filter FAQs by category and search query
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      if (!matchesCategory) return false;

      if (!query) return true;

      const inQuestion = faq.question.toLowerCase().includes(query);
      const inAnswer = faq.answer.toLowerCase().includes(query);
      const inTags =
        faq.tags?.some((t) => t.toLowerCase().includes(query)) ?? false;

      return inQuestion || inAnswer || inTags;
    });
  }, [faqs, activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", `#${id}`);
        }
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(filteredFaqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  const askAiAssistant = (queryToAsk?: string) => {
    const text = queryToAsk !== undefined ? queryToAsk : searchQuery;
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-ai-chat", { detail: { query: text } })
      );
    }
  };

  const handleTagClick = (tag: string) => {
    setActiveCategory("All");
    setSearchQuery(tag);
    searchInputRef.current?.focus();
  };

  const hasActiveFilters = activeCategory !== "All" || searchQuery.trim().length > 0;

  return (
    <section className="relative w-full max-w-4xl mx-auto pb-16">
      {/* Ambient background lighting matching new-theme.md */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.06] pointer-events-none -z-10"
      />

      {/* ── TOP UTILITY ROW: VERIFIED ARCHITECTURE FAQs + AI BRIDGE ─────────────── */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:px-4 rounded-2xl border border-border-primary bg-background/80 dark:bg-card-bg/80 backdrop-blur-xs shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] animate-pulse"
          />
          <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-text-muted">
            Production Knowledge Base &amp; Commercial FAQs
          </span>
        </div>

        <button
          type="button"
          onClick={() => askAiAssistant()}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-border-primary bg-background dark:bg-card-bg hover:bg-hover-bg text-foreground text-xs font-bold shadow-2xs hover:border-foreground/30 transition-all cursor-pointer group"
        >
          <LuSparkles className="w-3.5 h-3.5 text-accent-lime group-hover:scale-110 transition-transform" />
          <span>Need specific answers? Ask AI</span>
          <kbd className="hidden sm:inline-block text-[10px] font-mono text-text-muted bg-hover-bg px-1.5 py-0.5 rounded-md border border-border-primary/60">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* ── SEARCH INPUT ────────────────────────────────────────────────────────── */}
      <div className="relative mb-6">
        <label htmlFor="faq-search" className="sr-only">
          Search frequently asked questions
        </label>
        <div className="relative flex items-center">
          <LuSearch
            className="absolute left-4 w-5 h-5 text-text-muted pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={searchInputRef}
            id="faq-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, technologies, pricing, or architecture..."
            className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-background dark:bg-card-bg border border-border-primary rounded-2xl text-foreground placeholder:text-text-muted text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:border-transparent transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search input"
              className="absolute right-3.5 p-1.5 rounded-full text-text-muted hover:text-foreground hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <LuX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Screen Reader Live Region for Search Results */}
        <div id="faq-search-count" aria-live="polite" className="sr-only">
          {filteredFaqs.length} {filteredFaqs.length === 1 ? "question" : "questions"} available
        </div>
      </div>

      {/* ── CATEGORY PILLS FILTER ──────────────────────────────────────────────── */}
      <div
        role="region"
        aria-label="Filter questions by category"
        className="flex flex-wrap items-center gap-2 mb-8"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? "bg-foreground text-background border-foreground shadow-xs font-semibold dark:bg-accent-lime dark:text-[#0A0A0A] dark:border-accent-lime dark:font-extrabold dark:shadow-[0_0_14px_rgba(184,255,0,0.45)]"
                  : "bg-background dark:bg-card-bg border-border-primary text-text-secondary hover:border-foreground/30 hover:text-foreground hover:bg-hover-bg font-medium"
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-mono transition-colors ${
                  isActive
                    ? "bg-background/20 text-background dark:bg-[#0A0A0A]/20 dark:text-[#0A0A0A]"
                    : "bg-hover-bg text-text-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── METRICS & ACCORDION ACTION CONTROLS ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-text-muted mb-4 px-1">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            Showing <strong className="text-foreground">{filteredFaqs.length}</strong>{" "}
            {filteredFaqs.length === 1 ? "question" : "questions"}
          </span>

          {activeCategory !== "All" && (
            <span className="inline-flex items-center gap-1">
              in <strong className="text-foreground">{activeCategory}</strong>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1">
              matching &ldquo;<strong className="text-foreground">{searchQuery}</strong>&rdquo;
            </span>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:bg-hover-bg transition-all cursor-pointer font-medium ml-1"
            >
              <LuRotateCcw className="w-3 h-3 text-accent-lime" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {filteredFaqs.length > 0 && (
          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
            <button
              type="button"
              onClick={expandAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border-primary/80 bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:border-foreground/30 hover:bg-hover-bg transition-all cursor-pointer"
            >
              <LuChevronsUpDown className="w-3.5 h-3.5" />
              <span>Expand all</span>
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border-primary/80 bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:border-foreground/30 hover:bg-hover-bg transition-all cursor-pointer"
            >
              <LuChevronUp className="w-3.5 h-3.5" />
              <span>Collapse all</span>
            </button>
          </div>
        )}
      </div>

      {/* ── FAQ ACCORDION LIST ──────────────────────────────────────────────────── */}
      {filteredFaqs.length > 0 ? (
        <div className="flex flex-col gap-3.5">
          {filteredFaqs.map((faq, idx) => (
            <FAQAccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openIds.has(faq.id)}
              onToggle={() => toggleAccordion(faq.id)}
              onTagClick={handleTagClick}
              index={idx}
            />
          ))}
        </div>
      ) : (
        /* ── EMPTY STATE WITH AI BRIDGE ────────────────────────────────────────── */
        <div className="relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center my-6 shadow-sm">
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(184,255,0,0.12)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.06)_0%,transparent_65%)] blur-2xl pointer-events-none -z-10"
          />

          <div className="w-12 h-12 rounded-full border border-border-primary bg-hover-bg flex items-center justify-center text-text-muted mx-auto mb-4">
            <LuCircleHelp className="w-6 h-6 text-foreground" />
          </div>

          <h3 className="text-xl font-bold text-foreground tracking-tight mb-2">
            No matching questions found
          </h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto mb-6 leading-relaxed">
            We couldn&apos;t find an FAQ matching &ldquo;
            <span className="text-foreground font-medium">{searchQuery}</span>
            &rdquo;. You can ask Samir&apos;s AI Assistant directly for an immediate answer or reset your filters.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => askAiAssistant(searchQuery)}
              className="inline-flex items-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-6 py-3 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <LuMessageSquare className="w-4 h-4 stroke-[2.5]" />
              <span>Ask AI Assistant about this</span>
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-6 py-3 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all cursor-pointer"
            >
              <LuRotateCcw className="w-4 h-4" />
              <span>Reset all filters</span>
            </button>
          </div>
        </div>
      )}

      {/* ── CLIENT CONVERSION BENTO CARD ────────────────────────────────────────── */}
      <div className="mt-16 relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 md:p-14 text-center shadow-sm">
        {/* Subtle Ambient Electric Lime Center Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(184,255,0,0.14)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
        />

        {/* Live Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-primary bg-background/90 dark:bg-card-bg/90 text-xs font-semibold text-foreground shadow-2xs mb-5">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-accent-lime animate-pulse shadow-[0_0_8px_rgba(184,255,0,0.8)]"
          />
          <span>Available for freelance &amp; full-time roles</span>
        </div>

        {/* Bento Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight max-w-2xl mx-auto mb-4">
          Have an AI or Backend Project in Mind?
        </h2>

        {/* Subtitle with Highlighter Pill */}
        <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
          Whether you need to architect autonomous agents, scale a custom RAG pipeline, or engineer resilient backend microservices &mdash; let&apos;s build systems that{" "}
          <span className="relative inline-block px-3 py-0.5 rounded-xl bg-accent-lime text-[#0A0A0A] font-black -rotate-1 shadow-xs border border-black/10 transition-transform hover:rotate-0">
            scale reliably
          </span>
          .
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-8 py-3.5 shadow-xs hover:shadow-[0_0_24px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <LuMail className="w-4 h-4 stroke-[2.5]" />
            <span>Start a Conversation</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-8 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all"
          >
            <span>Explore Services</span>
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Reassurance Checkmarks */}
        <div className="pt-6 border-t border-border-primary/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
          <span className="inline-flex items-center gap-1.5">
            <LuCheck className="text-foreground dark:text-accent-lime text-sm stroke-[2.5]" />
            Direct Engineer Access
          </span>
          <span className="inline-flex items-center gap-1.5">
            <LuCheck className="text-foreground dark:text-accent-lime text-sm stroke-[2.5]" />
            Fixed-Milestone Proposals
          </span>
          <span className="inline-flex items-center gap-1.5">
            <LuCheck className="text-foreground dark:text-accent-lime text-sm stroke-[2.5]" />
            100% Repository &amp; IP Transfer
          </span>
        </div>
      </div>
    </section>
  );
}
