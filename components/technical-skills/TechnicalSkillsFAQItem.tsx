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
      className={`scroll-mt-28 border rounded-xl transition-colors overflow-hidden ${
        isOpen
          ? "border-border-primary bg-background dark:bg-card-bg"
          : "border-border-primary bg-background dark:bg-card-bg hover:border-foreground/30"
      }`}
    >
      <div className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4">
        <button
          id={headerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex-1 flex flex-col gap-1.5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 rounded-lg"
        >
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider font-mono text-text-muted">
            {faq.category}
          </span>
          <span className="text-base sm:text-lg font-bold text-foreground leading-snug hover:text-foreground/90 transition-colors">
            {faq.question}
          </span>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Copy Link button */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={`Copy link to question: ${faq.question}`}
            title={copied ? "Copied to clipboard!" : "Copy link to this question"}
            className={`p-2 rounded-lg transition-colors cursor-pointer text-text-muted hover:text-foreground hover:bg-hover-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime ${
              copied ? "text-accent-lime" : ""
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
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime ${
              isOpen
                ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A]"
                : "bg-hover-bg text-text-muted hover:text-foreground"
            }`}
          >
            <LuChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
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
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-5 sm:pb-6 px-5 sm:px-6 pt-0"
            : "grid-rows-[0fr] opacity-0 px-5 sm:px-6 py-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 border-t border-border-primary/60 text-xs sm:text-sm text-text-secondary leading-relaxed">
            <p>{faq.answer}</p>
            {faq.tags && faq.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-5 pt-3.5 border-t border-border-primary/40">
                <span className="text-[10px] sm:text-[11px] text-text-muted mr-1 font-mono uppercase tracking-wider">
                  Tags:
                </span>
                {faq.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagClick?.(tag)}
                    className="inline-flex items-center px-2.5 py-1 text-[11px] rounded-md bg-hover-bg/60 border border-border-primary text-text-muted hover:text-foreground hover:border-foreground/30 font-mono transition-colors cursor-pointer"
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
