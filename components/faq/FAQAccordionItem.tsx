"use client";

import { useState } from "react";
import { LuChevronDown, LuLink, LuCheck } from "react-icons/lu";
import type { FAQItem } from "@/lib/data/faqs";

interface FAQAccordionItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  onTagClick?: (tag: string) => void;
  index?: number;
}

export default function FAQAccordionItem({
  faq,
  isOpen,
  onToggle,
  onTagClick,
  index,
}: FAQAccordionItemProps) {
  const [copied, setCopied] = useState(false);
  const contentId = `faq-content-${faq.id}`;
  const headerId = `faq-header-${faq.id}`;

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/faq#${faq.id}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedIndex = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <article
      id={faq.id}
      className={`group relative scroll-mt-28 rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-border-secondary bg-background dark:bg-card-bg shadow-sm ring-1 ring-border-primary/60 dark:shadow-[0_0_24px_rgba(184,255,0,0.06)]"
          : "border-border-primary bg-background/80 dark:bg-card-bg/60 hover:bg-hover-bg/30 hover:border-border-secondary hover:shadow-2xs"
      }`}
    >
      {/* Top Electric Lime accent indicator for open state */}
      {isOpen && (
        <span
          aria-hidden="true"
          className="absolute top-0 left-6 sm:left-8 w-12 sm:w-16 h-[2px] bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]"
        />
      )}

      {/* Accordion Header Row */}
      <div className="w-full flex items-start justify-between text-left p-5 sm:p-6 md:p-7 gap-4">
        <h3 className="m-0 flex-1">
          <button
            id={headerId}
            type="button"
            aria-expanded={isOpen}
            aria-controls={contentId}
            onClick={onToggle}
            className="w-full flex flex-col gap-2 text-left cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2"
          >
            {/* Meta indicator row */}
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              {formattedIndex && (
                <span className="font-semibold text-text-muted/80">
                  {formattedIndex}
                </span>
              )}
              {formattedIndex && <span className="text-border-primary">•</span>}
              <span className="uppercase tracking-wider font-semibold text-[11px] text-text-muted">
                {faq.category}
              </span>
            </div>

            {/* Question Text */}
            <span
              className={`text-base sm:text-lg md:text-xl font-bold tracking-tight leading-snug transition-colors ${
                isOpen
                  ? "text-foreground"
                  : "text-foreground group-hover:text-foreground/90"
              }`}
            >
              {faq.question}
            </span>
          </button>
        </h3>

        {/* Action Controls: Copy Link + Toggle Chevron */}
        <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5">
          {/* Quick Copy Link button */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={`Copy direct link to question: "${faq.question}"`}
            title={copied ? "Direct link copied!" : "Copy link to this question"}
            className={`p-2 rounded-xl transition-all duration-200 cursor-pointer border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime ${
              copied
                ? "bg-accent-lime/10 text-foreground dark:text-accent-lime border-accent-lime/30 shadow-2xs"
                : "text-text-muted hover:text-foreground hover:bg-hover-bg hover:border-border-primary/60"
            }`}
          >
            {copied ? (
              <LuCheck className="w-4 h-4 text-foreground dark:text-accent-lime stroke-[2.5]" />
            ) : (
              <LuLink className="w-4 h-4" />
            )}
            <span className="sr-only">
              {copied ? "Link copied to clipboard" : "Copy link"}
            </span>
          </button>

          {/* Toggle Chevron button */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isOpen ? "Collapse question" : "Expand question"}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime ${
              isOpen
                ? "bg-foreground text-background border-foreground shadow-2xs dark:bg-accent-lime dark:text-[#0A0A0A] dark:border-accent-lime dark:shadow-[0_0_12px_rgba(184,255,0,0.45)]"
                : "bg-background dark:bg-card-bg border-border-primary text-text-muted group-hover:text-foreground group-hover:border-foreground/30 hover:bg-hover-bg"
            }`}
          >
            <LuChevronDown
              className={`w-4 h-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none stroke-[2.5] ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Accordion Content Panel */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-6 px-5 sm:px-6 md:px-7 pt-0"
            : "grid-rows-[0fr] opacity-0 px-5 sm:px-6 md:px-7 py-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 border-t border-border-primary/50 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            <p className="whitespace-pre-line">{faq.answer}</p>

            {/* Tag Pills */}
            {faq.tags && faq.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-5 pt-3.5 border-t border-border-primary/40">
                <span className="text-[11px] uppercase tracking-wider text-text-muted mr-1 font-mono font-semibold">
                  Topics:
                </span>
                {faq.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagClick?.(tag)}
                    aria-label={`Filter questions by topic: ${tag}`}
                    className="inline-flex items-center px-2.5 py-1 text-xs rounded-full border border-border-primary/80 bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:border-foreground/40 hover:bg-hover-bg font-mono transition-all duration-150 cursor-pointer shadow-2xs active:scale-[0.97]"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
