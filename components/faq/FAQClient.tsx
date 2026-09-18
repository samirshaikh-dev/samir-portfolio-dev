"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { LuSearch, LuX, LuSparkles, LuCircleHelp, LuArrowRight, LuMail } from "react-icons/lu";
import type { FAQItem, FAQCategory } from "@/lib/data/faqs";
import FAQAccordionItem from "./FAQAccordionItem";

interface FAQClientProps {
  faqs: FAQItem[];
}

export default function FAQClient({ faqs }: FAQClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([faqs[0]?.id].filter(Boolean)));

  // Derive unique categories and calculate counts
  const categories = useMemo(() => {
    const unique = Array.from(new Set(faqs.map((item) => item.category))) as FAQCategory[];
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
      const inTags = faq.tags?.some((t) => t.toLowerCase().includes(query)) ?? false;

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

  return (
    <section className="w-full max-w-4xl mx-auto pb-16">
      {/* Search Input Bar */}
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
            id="faq-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, keywords, or topics (e.g. Freelance, RAG, Pricing, Next.js)..."
            className="w-full pl-12 pr-10 py-3.5 bg-background border border-border-primary rounded-xl text-foreground placeholder:text-text-muted text-sm md:text-base focus:outline-hidden focus:ring-2 focus:ring-foreground/20 focus:border-border-primary transition-all"
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
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "bg-foreground text-background shadow-xs"
                  : "bg-background border border-border-primary text-text-secondary hover:text-foreground hover:bg-hover-bg"
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
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
            <span> in <span className="text-foreground">{activeCategory}</span></span>
          )}
          {searchQuery && (
            <span> matching &ldquo;<span className="text-foreground">{searchQuery}</span>&rdquo;</span>
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
            <FAQAccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openIds.has(faq.id)}
              onToggle={() => toggleAccordion(faq.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="border border-border-primary rounded-xl p-10 text-center bg-background/50 flex flex-col items-center justify-center my-6">
          <div className="w-12 h-12 rounded-full bg-hover-bg flex items-center justify-center text-text-muted mb-4">
            <LuCircleHelp className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">
            No matching questions found
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto mb-6">
            We couldn&apos;t find any FAQs matching your search criteria. Try a different keyword or view all categories.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
          >
            <LuSparkles className="w-4 h-4" />
            Reset all filters
          </button>
        </div>
      )}

      {/* Client Conversion CTA Section */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-border-primary bg-background/80 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-hover-bg text-xs font-medium text-text-muted mb-3">
              <LuSparkles className="w-3.5 h-3.5 text-foreground" />
              <span>Available for Freelance & Sprints</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
              Have a project in mind or need custom AI engineering?
            </h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              Whether you need a production-grade AI chatbot, scalable backend microservices, or a Next.js web application, let&apos;s turn your requirements into high-performance software.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity shadow-xs text-center"
            >
              <LuMail className="w-4 h-4" />
              <span>Get in Touch</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border-primary bg-background hover:bg-hover-bg text-foreground font-medium text-sm transition-colors text-center"
            >
              <span>View Services</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
