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
      className={`scroll-mt-28 border rounded-xl transition-all duration-200 overflow-hidden ${
        isOpen
          ? "border-border-primary bg-background shadow-xs ring-1 ring-border-primary/50"
          : "border-border-primary/80 bg-background/50 hover:bg-hover-bg/30 hover:border-border-primary"
      }`}
    >
      <div className="w-full flex items-center justify-between text-left p-5 md:p-6 gap-3 cursor-pointer group">
        <button
          id={headerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex-1 flex flex-col gap-1.5 text-left cursor-pointer focus:outline-hidden"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
            {faq.category}
          </span>
          <span className="text-base md:text-lg font-medium text-foreground leading-snug group-hover:text-foreground/90 transition-colors">
            {faq.question}
          </span>
        </button>

        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Quick Copy Link button */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={`Copy link to question: ${faq.question}`}
            title={copied ? "Copied to clipboard!" : "Copy link to this question"}
            className={`p-2 rounded-lg transition-colors cursor-pointer text-text-muted hover:text-foreground hover:bg-hover-bg ${
              copied ? "text-green-500 hover:text-green-500" : ""
            }`}
          >
            {copied ? (
              <LuCheck className="w-4 h-4 text-green-500" />
            ) : (
              <LuLink className="w-4 h-4" />
            )}
          </button>

          {/* Toggle Chevron button */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isOpen ? "Collapse question" : "Expand question"}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
              isOpen ? "bg-hover-bg text-foreground" : "text-text-muted hover:text-foreground"
            }`}
          >
            <LuChevronDown
              className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-180 text-foreground" : ""
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
            ? "grid-rows-[1fr] opacity-100 pb-5 md:pb-6 px-5 md:px-6 pt-0"
            : "grid-rows-[0fr] opacity-0 px-5 md:px-6 py-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 border-t border-border-primary/50 text-sm md:text-base text-text-secondary leading-relaxed">
            <p>{faq.answer}</p>
            {faq.tags && faq.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-border-primary/30">
                <span className="text-[11px] text-text-muted mr-1 font-mono">Tags:</span>
                {faq.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagClick?.(tag)}
                    className="inline-block px-2 py-0.5 text-xs rounded-md bg-hover-bg text-text-muted hover:text-foreground hover:bg-hover-bg/80 font-mono transition-colors cursor-pointer"
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
