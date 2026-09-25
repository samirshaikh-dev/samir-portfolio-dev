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
            className="w-full pl-11 pr-10 py-3 bg-background border border-border-primary rounded-xl text-foreground placeholder:text-text-muted text-sm focus:outline-hidden focus:ring-2 focus:ring-foreground/20 focus:border-border-primary transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search input"
              className="absolute right-3.5 p-1 rounded-md text-text-muted hover:text-foreground hover:bg-hover-bg transition-colors cursor-pointer"
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "bg-foreground text-background shadow-xs"
                  : "bg-background border border-border-primary text-text-secondary hover:text-foreground hover:bg-hover-bg"
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-background/20 text-background"
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
      <div className="flex items-center justify-between text-xs text-text-muted mb-4 px-1">
        <div>
          Showing <span className="font-medium text-foreground">{filteredFaqs.length}</span>{" "}
          {filteredFaqs.length === 1 ? "question" : "questions"}
          {activeCategory !== "All" && (
            <span>
              {" "}
              in <span className="text-foreground">{activeCategory}</span>
            </span>
          )}
          {searchQuery && (
            <span>
              {" "}
              matching &ldquo;<span className="text-foreground">{searchQuery}</span>&rdquo;
            </span>
          )}
        </div>

        {filteredFaqs.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={expandAll}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Expand all
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={collapseAll}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Collapse all
            </button>
          </div>
        )}
      </div>

      {/* FAQ Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="flex flex-col gap-3">
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
        <div className="border border-border-primary rounded-xl p-8 text-center bg-background/50 flex flex-col items-center justify-center my-6">
          <div className="w-10 h-10 rounded-full bg-hover-bg flex items-center justify-center text-text-muted mb-3">
            <LuCircleHelp className="w-5 h-5" />
          </div>
          <h3 className="text-base font-medium text-foreground mb-1">
            No matching questions found
          </h3>
          <p className="text-xs text-text-muted max-w-sm mx-auto mb-5">
            We couldn&apos;t find an FAQ matching &ldquo;{searchQuery}&rdquo;. Try clearing your search or resetting category filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg border border-border-primary bg-background text-foreground text-xs font-medium hover:bg-hover-bg transition-colors cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
