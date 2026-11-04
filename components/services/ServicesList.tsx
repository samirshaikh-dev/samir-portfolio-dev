"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiSearch, FiX, FiCheck, FiTerminal, FiClock } from "react-icons/fi";
import { ServiceCategory, ServiceOffering } from "@/lib/data/services";

interface ServicesListProps {
  categories: ServiceCategory[];
}

export default function ServicesList({ categories }: ServicesListProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const allServices = useMemo(() => {
    const list: Array<ServiceOffering & { categoryTitle: string; categoryId: string }> = [];
    categories.forEach((cat) => {
      cat.services.forEach((s) => {
        list.push({ ...s, categoryTitle: cat.title, categoryId: cat.id });
      });
    });
    return list;
  }, [categories]);

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const titleMatch = service.title.toLowerCase().includes(query);
        const taglineMatch = service.tagline.toLowerCase().includes(query);
        const descMatch = service.description.toLowerCase().includes(query);
        const techMatch = service.techStack.some((t) => t.toLowerCase().includes(query));
        const delMatch = service.deliverables.some((d) => d.toLowerCase().includes(query));

        if (!titleMatch && !taglineMatch && !descMatch && !techMatch && !delMatch) {
          return false;
        }
      }

      if (activeCategory === "all") return true;
      return service.categoryId === activeCategory;
    });
  }, [allServices, searchQuery, activeCategory]);

  return (
    <div className="space-y-8">
      {/* ── FILTER TABS & SEARCH BAR ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl border border-border-primary bg-background dark:bg-card-bg">
        {/* Category Filter Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none"
          role="tablist"
          aria-label="Filter capabilities by engineering category"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            aria-controls="services-results-panel"
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap border ${
              activeCategory === "all"
                ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] border-foreground dark:border-accent-lime font-bold"
                : "bg-transparent text-text-secondary border-transparent hover:bg-hover-bg hover:text-foreground"
            }`}
          >
            All ({allServices.length})
          </button>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.services.length;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="services-results-panel"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap border ${
                  isActive
                    ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] border-foreground dark:border-accent-lime font-bold"
                    : "bg-transparent text-text-secondary border-transparent hover:bg-hover-bg hover:text-foreground"
                }`}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input with accessible label */}
        <div className="relative w-full md:w-72">
          <label htmlFor="services-search-input" className="sr-only">
            Search engineering capabilities, technologies, and deliverables
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <FiSearch className="h-4 w-4" aria-hidden="true" />
          </div>
          <input
            ref={searchInputRef}
            id="services-search-input"
            type="search"
            className="block w-full pl-9 pr-9 py-2 text-xs sm:text-sm text-foreground bg-hover-bg/50 border border-border-primary rounded-xl focus:bg-background focus:ring-1 focus:ring-accent-lime focus:border-foreground/40 focus:outline-none transition-colors placeholder:text-text-muted/70 font-mono"
            placeholder="Search stack, problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search query"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-foreground transition-colors"
            >
              <FiX className="h-4 w-4" />
            </button>
          ) : (
            <span
              aria-hidden="true"
              className="hidden sm:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none"
            >
              <kbd className="text-[10px] font-mono text-text-muted bg-background border border-border-primary px-1.5 py-0.5 rounded">
                /
              </kbd>
            </span>
          )}
        </div>
      </div>

      {/* ── STATUS BAR & LIVE COUNT ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-xs font-mono text-text-muted px-1" aria-live="polite">
        <span>
          Showing {filteredServices.length} of {allServices.length} capabilities
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="text-text-secondary hover:text-foreground underline underline-offset-4"
          >
            Reset search
          </button>
        )}
      </div>

      {/* ── EMPTY STATE ──────────────────────────────────────────────────────── */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 px-6 rounded-2xl border border-border-primary bg-background dark:bg-card-bg">
          <p className="text-base font-bold text-foreground">
            No matching capabilities found
          </p>
          <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different category tab.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] hover:opacity-90 transition-opacity"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ── SERVICES GRID (OPEN EDITORIAL LAYOUT — ZERO NESTED CARDS) ──────── */}
      {filteredServices.length > 0 && (
        <div
          id="services-results-panel"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredServices.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-7 hover:border-foreground/30 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border-primary/70">
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-text-muted uppercase">
                    {service.badge}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    {service.typicalDuration && (
                      <span className="inline-flex items-center gap-1 text-text-secondary">
                        <FiClock className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
                        <span>{service.typicalDuration}</span>
                      </span>
                    )}
                    {service.startingPrice && (
                      <span className="font-bold text-foreground">
                        {service.startingPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-snug">
                    <Link
                      href={`/services/${service.id}`}
                      className="hover:underline hover:decoration-accent-lime hover:decoration-2 transition-all"
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-text-muted italic">
                    {service.tagline}
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Key Deliverables (Open list directly on surface, NO nested card) */}
                <div className="pt-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-bold mb-2">
                    Sprint Deliverables:
                  </h4>
                  <ul className="space-y-1.5" aria-label={`Deliverables for ${service.title}`}>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed"
                      >
                        <FiCheck
                          className="w-3.5 h-3.5 text-foreground dark:text-accent-lime shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-text-muted mb-2">
                    <FiTerminal className="w-3 h-3 text-text-muted" aria-hidden="true" />
                    <span>Stack:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-hover-bg/60 border border-border-primary/60 text-text-secondary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-border-primary/70 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/services/${service.id}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-foreground hover:text-text-secondary transition-colors"
                >
                  <span>View Full Architecture Blueprint</span>
                  <FiArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.id)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs font-bold hover:opacity-90 transition-opacity ml-auto"
                >
                  <span>Inquire About Sprint</span>
                  <FiArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
