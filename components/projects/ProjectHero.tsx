import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";

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
  const badgeLabel = badge ?? (isCaseStudy ? "Case Study" : "Project");
  const onlyGithub = Boolean(githubLink) && !demoLink;

  return (
    <header className="relative">
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 h-[320px] w-[320px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] blur-3xl sm:h-[520px] sm:w-[520px] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.09)_0%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.07]"
      />

      <div className="relative overflow-hidden rounded-3xl border border-border-primary bg-background p-5 shadow-sm sm:p-8 sm:shadow-xs md:p-10 dark:bg-card-bg">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-background/90 px-3.5 py-1.5 text-[11px] font-semibold backdrop-blur-xs sm:text-xs dark:bg-card-bg/90">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]"
            />
            {badgeLabel}
          </span>
          {category ? (
            <span className="rounded-full border border-border-primary bg-hover-bg px-3.5 py-1.5 text-[11px] font-medium text-text-secondary sm:text-xs">
              {category}
            </span>
          ) : null}
          <time className="font-mono text-[11px] uppercase tracking-wider text-text-muted sm:text-xs">
            {publishedDate}
          </time>
        </div>

        <h1 className="mt-5 text-3xl font-black leading-[1.12] tracking-tight text-foreground break-words sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {excerpt ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {excerpt}
          </p>
        ) : null}

        {(demoLink || githubLink) && (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {demoLink ? (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime px-6 py-3 text-sm font-extrabold text-[#0A0A0A] shadow-xs transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none ${FOCUS_RING}`}
              >
                Live Demo
                <FiExternalLink aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
            {githubLink ? (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-extrabold shadow-xs transition-all duration-200 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none ${FOCUS_RING} ${
                  onlyGithub
                    ? "border-accent-lime bg-accent-lime text-[#0A0A0A] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(184,255,0,0.5)]"
                    : "border-border-primary bg-background text-foreground hover:border-foreground/30 hover:bg-hover-bg dark:bg-card-bg"
                }`}
              >
                <FiGithub aria-hidden="true" className="h-4 w-4" />
                Source Code
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        )}

        {coverImageUrl ? (
          <figure className="mt-8 sm:mt-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border-primary bg-footer-bg sm:aspect-[2/1]">
              <Image
                src={optimizeCloudinaryUrl(coverImageUrl, { width: 1200 })}
                alt={`Interface of ${title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1104px"
                priority
              />
            </div>
            <figcaption className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-text-muted sm:text-[11px]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
              Interface preview
            </figcaption>
          </figure>
        ) : null}
      </div>
    </header>
  );
}
