"use client";

import { useRef } from "react";
import HtmlParser from "@/components/HtmlParser";
import BlogSidebar from "./BlogSidebar";

interface BlogContentContainerProps {
  content: string;
  title: string;
  slug: string;
  initialStars: number;
}

export default function BlogContentContainer({
  content,
  title,
  slug,
  initialStars,
}: BlogContentContainerProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start pt-2">
      {/* ── MAIN READING PROSE COLUMN (8 COLS) ───────────────────────── */}
      <article className="lg:col-span-8 min-w-0" ref={contentRef}>
        <HtmlParser
          html={content}
          className="prose prose-base sm:prose-lg prose-gray dark:prose-invert max-w-none text-text-secondary leading-relaxed prose-headings:text-foreground prose-headings:font-black prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-strong:text-foreground prose-a:text-foreground prose-a:font-semibold hover:prose-a:text-accent-lime prose-code:font-mono prose-code:text-foreground prose-code:bg-hover-bg/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border-primary/80 prose-pre:bg-card-bg prose-pre:rounded-2xl prose-pre:p-5 prose-img:rounded-2xl prose-img:border prose-img:border-border-primary/80 [&_p:empty]:hidden"
        />
      </article>

      {/* ── STICKY SIDEBAR (4 COLS) ─────────────────────────────────── */}
      <BlogSidebar
        contentRef={contentRef}
        title={title}
        slug={slug}
        initialStars={initialStars}
      />
    </div>
  );
}
