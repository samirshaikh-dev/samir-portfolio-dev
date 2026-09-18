"use client";

import { LuChevronDown } from "react-icons/lu";
import type { FAQItem } from "@/lib/data/faqs";

interface FAQAccordionItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQAccordionItem({
  faq,
  isOpen,
  onToggle,
}: FAQAccordionItemProps) {
  const contentId = `faq-content-${faq.id}`;
  const headerId = `faq-header-${faq.id}`;

  return (
    <div
      className={`border rounded-xl transition-all duration-200 overflow-hidden ${
        isOpen
          ? "border-border-primary bg-background shadow-xs"
          : "border-border-primary/80 bg-background/50 hover:bg-hover-bg/30 hover:border-border-primary"
      }`}
    >
      <button
        id={headerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left p-5 md:p-6 gap-4 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground/20 rounded-xl"
      >
        <div className="flex flex-col gap-1.5 pr-2">
          <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
            {faq.category}
          </span>
          <span className="text-base md:text-lg font-medium text-foreground leading-snug">
            {faq.question}
          </span>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
            isOpen ? "bg-hover-bg text-foreground" : "text-text-muted"
          }`}
        >
          <LuChevronDown
            className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180 text-foreground" : ""
            }`}
            aria-hidden="true"
          />
        </div>
      </button>

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
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border-primary/30">
                {faq.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-0.5 text-xs rounded-md bg-hover-bg text-text-muted font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
