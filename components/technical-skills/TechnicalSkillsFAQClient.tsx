"use client";

import { useState, useMemo, useEffect } from "react";
import { LuSearch, LuX, LuCircleHelp } from "react-icons/lu";
import type { TechnicalSkillFAQItem } from "@/lib/data/technical-skills";
import TechnicalSkillsFAQItem from "./TechnicalSkillsFAQItem";

interface TechnicalSkillsFAQClientProps {
  faqs: TechnicalSkillFAQItem[];
}

export default function TechnicalSkillsFAQClient({
  faqs,
}: TechnicalSkillsFAQClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set([faqs[0]?.id].filter(Boolean))
  );

  // Listen for hash deep-linking on initial load
  useEffect(() => {
    if (typeof window === "undefined") return;
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
  }, [faqs]);

  // Derive unique categories and calculate counts
  const categories = useMemo(() => {
    const unique = Array.from(new Set(faqs.map((item) => item.category)));
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
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  const handleTagClick = (tag: string) => {
    setActiveCategory("All");
    setSearchQuery(tag);
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-6">
        <label htmlFor="technical-faq-search" className="sr-only">
          Search technical skills frequently asked questions
        </label>
        <div className="relative flex items-center">
          <LuSearch
            className="absolute left-4 w-4 h-4 text-text-muted pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="technical-faq-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or technologies (e.g. React, PostgreSQL, GraphQL, Docker, AI)..."
            className="w-full pl-11 pr-10 py-3.5 bg-background dark:bg-card-bg border border-border-primary rounded-xl text-foreground placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-lime focus:ring-offset-0 focus:border-border-primary transition-all shadow-2xs hover:border-foreground/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search input"
              className="absolute right-3.5 p-1.5 rounded-full text-text-muted hover:text-foreground hover:bg-hover-bg transition-all cursor-pointer"
            >
              <LuX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 border border-border-primary shadow-2xs focus:outline-none focus:ring-2 focus:ring-accent-lime focus:ring-offset-1 ${
                isActive
                  ? "bg-foreground text-background border-foreground font-semibold shadow-xs dark:bg-accent-lime dark:text-[#0A0A0A] dark:border-accent-lime dark:font-bold dark:shadow-[0_0_12px_rgba(184,255,0,0.4)]"
                  : "bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:bg-hover-bg hover:border-foreground/30"
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive
                    ? "bg-background/20 text-background dark:bg-[#0A0A0A]/15 dark:text-[#0A0A0A]"
                    : "bg-hover-bg text-text-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Metrics & Expand/Collapse Controls */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-text-muted mb-5 px-1">
        <div className="font-mono">
          SHOWING <span className="font-bold text-foreground normal-case tracking-normal text-sm">{filteredFaqs.length}</span>{" "}
          <span className="normal-case tracking-normal">{filteredFaqs.length === 1 ? "question" : "questions"}</span>
          {activeCategory !== "All" && (
            <span>
              {" "}
              IN <span className="font-bold text-foreground normal-case tracking-normal text-sm">{activeCategory}</span>
            </span>
          )}
          {searchQuery && (
            <span>
              {" "}
              MATCHING <span className="font-bold text-foreground normal-case tracking-normal text-sm">&ldquo;{searchQuery}&rdquo;</span>
            </span>
          )}
        </div>

        {filteredFaqs.length > 0 && (
          <div className="flex items-center gap-3 normal-case tracking-normal">
            <button
              type="button"
              onClick={expandAll}
              className="hover:text-foreground transition-all cursor-pointer hover:underline underline-offset-2 decoration-accent-lime decoration-2"
            >
              Expand all
            </button>
            <span className="text-border-primary">•</span>
            <button
              type="button"
              onClick={collapseAll}
              className="hover:text-foreground transition-all cursor-pointer hover:underline underline-offset-2 decoration-accent-lime decoration-2"
            >
              Collapse all
            </button>
          </div>
        )}
      </div>

      {/* FAQ Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredFaqs.map((faq) => (
            <TechnicalSkillsFAQItem
              key={faq.id}
              faq={faq}
              isOpen={openIds.has(faq.id)}
              onToggle={() => toggleAccordion(faq.id)}
              onTagClick={handleTagClick}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="border border-border-primary rounded-2xl p-8 md:p-10 text-center bg-background dark:bg-card-bg flex flex-col items-center justify-center my-6 shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 relative overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_6px_rgba(184,255,0,0.7)]"
          />
          <div className="w-12 h-12 rounded-full bg-hover-bg flex items-center justify-center text-text-muted mb-4 shadow-inner">
            <LuCircleHelp className="w-6 h-6" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
            No matching questions found
          </h3>
          <p className="text-sm text-text-muted max-w-sm mx-auto mb-6 leading-relaxed">
            We couldn&apos;t find an FAQ matching &ldquo;<span className="text-foreground font-semibold">{searchQuery}</span>&rdquo;. Try clearing your search or resetting category filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-6 py-3 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-lime focus:ring-offset-1"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
