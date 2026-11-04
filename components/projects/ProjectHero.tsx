import { FiExternalLink, FiGithub, FiArrowDown } from "react-icons/fi";
import ProjectCoverImage from "./ProjectCoverImage";

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background";

interface ProjectHeroProps {
  title: string;
  excerpt: string | null;
  badge: string | null;
  category: string | null;
  publishedDate: string;
  coverImageUrl: string | null;
  githubLink: string | null;
  demoLink: string | null;
  isCaseStudy: boolean;
}

export default function ProjectHero({
  title,
  excerpt,
  badge,
  category,
  publishedDate,
  coverImageUrl,
  githubLink,
  demoLink,
  isCaseStudy,
}: ProjectHeroProps) {
  const badgeLabel = badge ?? (isCaseStudy ? "Case Study" : "Production System");

  return (
    <header className="relative">
      {/* Editorial Container */}
      <div className="relative rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-6 sm:p-10 md:p-12 shadow-2xs">
        {/* Kicker & Meta Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-primary/80 bg-hover-bg/70 px-3.5 py-1.5 text-[11px] font-mono font-medium text-foreground tracking-wider uppercase">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]"
            />
            {badgeLabel}
          </span>
          {category && (
            <span className="rounded-full border border-border-primary/60 bg-hover-bg/40 px-3 py-1 text-xs font-mono text-text-muted">
              {category}
            </span>
          )}
          <time className="font-mono text-xs text-text-muted ml-auto hidden sm:inline-block">
            Published {publishedDate}
          </time>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-foreground break-words max-w-4xl">
          {title}
        </h1>

        {/* Problem & Context Excerpt */}
        {excerpt && (
          <p className="mt-5 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-text-secondary">
            {excerpt}
          </p>
        )}

        {/* Primary Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-border-primary/60">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime px-6 py-2.5 text-xs sm:text-sm font-extrabold text-[#0A0A0A] shadow-2xs hover:brightness-105 active:scale-[0.98] transition-all motion-reduce:transform-none ${FOCUS_RING}`}
            >
              <span>Live System</span>
              <FiExternalLink aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg px-6 py-2.5 text-xs sm:text-sm font-bold text-foreground hover:border-foreground/40 hover:bg-hover-bg/70 active:scale-[0.98] transition-all motion-reduce:transform-none ${FOCUS_RING}`}
            >
              <FiGithub aria-hidden="true" className="h-4 w-4" />
              <span>Inspect Source Code</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <a
            href="#work"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text-muted hover:text-foreground transition-colors px-3 py-2"
          >
            <FiArrowDown className="w-3.5 h-3.5" />
            <span>Architecture Breakdown</span>
          </a>
        </div>

        {/* Cover Image with Fallback Card */}
        {coverImageUrl && (
          <figure className="mt-8 sm:mt-10">
            <ProjectCoverImage
              coverImageUrl={coverImageUrl}
              title={title}
              category={category}
              badge={badge}
              aspectRatio="hero"
              priority={true}
            />
            <figcaption className="mt-3 flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
              Production Architecture &amp; System Flow
            </figcaption>
          </figure>
        )}
      </div>
    </header>
  );
}
