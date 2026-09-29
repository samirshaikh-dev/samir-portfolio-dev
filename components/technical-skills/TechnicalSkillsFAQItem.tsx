"use client";

import { useState } from "react";
import { LuChevronDown, LuLink, LuCheck } from "react-icons/lu";
import type { TechnicalSkillFAQItem } from "@/lib/data/technical-skills";

interface TechnicalSkillsFAQItemProps {
  faq: TechnicalSkillFAQItem;
  isOpen: boolean;
  onToggle: () => void;
  onTagClick?: (tag: string) => void;
}

export default function TechnicalSkillsFAQItem({
  faq,
  isOpen,
  onToggle,
  onTagClick,
}: TechnicalSkillsFAQItemProps) {
  const [copied, setCopied] = useState(false);
  const contentId = `faq-content-${faq.id}`;
  const headerId = `faq-header-${faq.id}`;

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/technical-skills#${faq.id}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id={faq.id}
      className={`scroll-mt-28 border rounded-2xl transition-all duration-300 overflow-hidden relative group ${
        isOpen
          ? "border-border-primary bg-background dark:bg-card-bg shadow-md ring-0 hover:shadow-md border-foreground/30 dark:border-border-secondary"
          : "border-border-primary bg-background dark:bg-card-bg hover:shadow-md hover:border-foreground/30 dark:hover:border-border-secondary shadow-2xs"
      }`}
    >
      {isOpen && (
        <span
          aria-hidden="true"
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_6px_rgba(184,255,0,0.7)]"
        />
      )}
      <div className="w-full flex items-center justify-between text-left p-6 md:p-8 gap-4 cursor-pointer">
        <button
          id={headerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex-1 flex flex-col gap-2 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 rounded-xl -m-2 p-2"
        >
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider font-mono text-text-muted">
            {faq.category}
          </span>
          <span className="text-base sm:text-lg md:text-xl font-bold text-foreground leading-snug group-hover:text-foreground/90 transition-colors">
            {faq.question}
          </span>
        </button>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Quick Copy Link button */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={`Copy link to question: ${faq.question}`}
            title={copied ? "Copied to clipboard!" : "Copy link to this question"}
            className={`p-2.5 rounded-full transition-all cursor-pointer text-text-muted hover:text-foreground hover:bg-hover-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-1 ${
              copied ? "text-accent-lime hover:text-accent-lime" : ""
            }`}
          >
            {copied ? (
              <LuCheck className="w-4 h-4" />
            ) : (
              <LuLink className="w-4 h-4" />
            )}
          </button>

          {/* Toggle Chevron button */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isOpen ? "Collapse question" : "Expand question"}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-1 ${
              isOpen
                ? "bg-primary text-primary-foreground shadow-sm dark:bg-accent-lime dark:text-[#0A0A0A] dark:shadow-[0_0_10px_rgba(184,255,0,0.35)]"
                : "bg-hover-bg text-text-muted hover:text-foreground hover:bg-hover-bg"
            }`}
          >
            <LuChevronDown
              className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-6 md:pb-8 px-6 md:px-8 pt-0"
            : "grid-rows-[0fr] opacity-0 px-6 md:px-8 py-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 border-t border-border-primary/60 text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
            <p>{faq.answer}</p>
            {faq.tags && faq.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-border-primary/40">
                <span className="text-[10px] sm:text-[11px] text-text-muted mr-1 font-mono font-semibold uppercase tracking-wider">Tags:</span>
                {faq.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagClick?.(tag)}
                    className="inline-flex items-center px-3.5 py-1.5 text-[11px] sm:text-xs rounded-full bg-background dark:bg-card-bg border border-border-primary text-text-muted hover:text-foreground hover:bg-hover-bg hover:border-foreground/30 dark:hover:border-border-secondary font-mono font-semibold transition-all duration-200 cursor-pointer shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-1"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
