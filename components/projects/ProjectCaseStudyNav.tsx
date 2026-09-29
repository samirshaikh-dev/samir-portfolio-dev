"use client";

import { useEffect, useState } from "react";

export interface CaseStudyNavItem {
  id: string;
  label: string;
}

interface ProjectCaseStudyNavProps {
  sections: CaseStudyNavItem[];
}

/**
 * Section navigation for the project case study.
 *
 * One list, two presentations: a sticky vertical rail from `xl` up (the page
 * grid places this component in the left column) and a full-bleed sticky chip
 * bar under the fixed navbar below that. The active section is tracked with an
 * IntersectionObserver, so no scroll listener is needed.
 *
 * The `<nav>` itself is the sticky element — a sticky child of a
 * content-height parent has no room to travel.
 */
export default function ProjectCaseStudyNav({ sections }: ProjectCaseStudyNavProps) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    if (sections.length === 0) return;

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length < 2) return null;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <nav
      aria-label="Case study sections"
      className={[
        "sticky top-[var(--navbar-h)] z-30 mb-10 self-start",
        "-mx-5 border-b border-border-primary bg-background/90 px-5 py-3 backdrop-blur-md",
        "sm:-mx-8 sm:px-8 md:-mx-10 md:px-10",
        "xl:mb-0 xl:mx-0 xl:border-0 xl:bg-transparent xl:px-0 xl:py-0 xl:backdrop-blur-none",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] xl:flex-col xl:items-stretch xl:gap-0.5 xl:overflow-visible [&::-webkit-scrollbar]:[display:none]">
        <p className="hidden text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted xl:mb-3 xl:block">
          In this case study
        </p>
        <ul className="flex items-center gap-2 xl:flex-col xl:items-stretch xl:gap-0.5">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id} className="shrink-0 xl:shrink">
                <a
                  href={`#${section.id}`}
                  onClick={(event) => handleClick(event, section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all xl:w-full xl:rounded-r-xl xl:rounded-l-none xl:border-0 xl:border-l-2 xl:px-3 xl:py-1.5 xl:text-[13px]",
                    "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "motion-reduce:transition-none",
                    isActive
                      ? [
                          "border-foreground bg-foreground font-bold text-background shadow-xs",
                          "dark:border-accent-lime dark:bg-accent-lime dark:text-[#0A0A0A]",
                          "xl:border-l-accent-lime xl:bg-hover-bg xl:text-foreground xl:shadow-none",
                          "xl:dark:bg-hover-bg xl:dark:text-foreground",
                        ].join(" ")
                      : [
                          "border-border-primary bg-background text-text-secondary hover:border-foreground/30 hover:text-foreground",
                          "dark:bg-card-bg",
                          "xl:border-l-transparent xl:bg-transparent xl:hover:bg-hover-bg xl:dark:bg-transparent",
                        ].join(" "),
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                      isActive
                        ? "bg-background dark:bg-[#0A0A0A] xl:bg-accent-lime xl:dark:bg-accent-lime"
                        : "bg-border-primary",
                    ].join(" ")}
                  />
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
