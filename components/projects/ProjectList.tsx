"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  technologies: string[] | null;
  github_link: string | null;
  demo_link: string | null;
  is_case_study?: boolean | null;
  badge?: string | null;
  category?: string | null;
  metrics?: string[] | null;
  display_order?: number | null;
}

interface ProjectListProps {
  initialProjects: Project[];
  hideSearch?: boolean;
}

const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Case Studies", value: "case-studies" },
  { label: "Projects", value: "projects" },
  { label: "AI", value: "AI" },
  { label: "Automation", value: "Automation" },
  { label: "Full Stack", value: "Full Stack" },
];

export default function ProjectList({ initialProjects, hideSearch = false }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // 1. Search Query Filter
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const titleMatch = project.title.toLowerCase().includes(query);
        const excerptMatch = project.excerpt?.toLowerCase().includes(query) || false;
        const techMatch = project.technologies?.some((tech) => tech.toLowerCase().includes(query)) || false;
        const metricMatch = project.metrics?.some((m) => m.toLowerCase().includes(query)) || false;
        const categoryMatch = project.category?.toLowerCase().includes(query) || false;
        const badgeMatch = project.badge?.toLowerCase().includes(query) || false;

        if (!titleMatch && !excerptMatch && !techMatch && !metricMatch && !categoryMatch && !badgeMatch) {
          return false;
        }
      }

      // 2. Tab Filter
      if (activeFilter === "all") return true;
      if (activeFilter === "case-studies") return Boolean(project.is_case_study);
      if (activeFilter === "projects") return !project.is_case_study;
      if (activeFilter === "AI") return project.category === "AI" || project.technologies?.some(t => t.toLowerCase().includes("ai") || t.toLowerCase().includes("llm"));
      if (activeFilter === "Automation") return project.category === "Automation" || project.technologies?.some(t => t.toLowerCase().includes("automation") || t.toLowerCase().includes("bullmq") || t.toLowerCase().includes("queue"));
      if (activeFilter === "Full Stack") return project.category === "Full Stack" || project.category === "Backend";

      return true;
    });
  }, [initialProjects, searchQuery, activeFilter]);

  // Split into Featured Case Studies and More Projects
  const caseStudies = useMemo(() => {
    return filteredProjects.filter((p) => p.is_case_study);
  }, [filteredProjects]);

  const regularProjects = useMemo(() => {
    return filteredProjects.filter((p) => !p.is_case_study);
  }, [filteredProjects]);

  const showTwoTierView = activeFilter === "all" && !searchQuery;

  return (
    <div className="space-y-10">
      {/* Search & Filter Bar */}
      <div className="space-y-5">
        {!hideSearch && (
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-text-muted group-focus-within:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3.5 text-sm sm:text-base text-foreground bg-hover-bg border border-border-primary rounded-2xl focus:bg-background focus:ring-4 focus:ring-border-primary focus:border-text-muted focus:outline-none transition-all placeholder-text-muted"
              placeholder="Search by system, tech stack (Redis, BullMQ, pgvector), or outcome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap border ${
                  isActive
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-background text-text-secondary border-border-primary hover:border-text-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-footer-bg rounded-2xl border border-border-primary">
          <p className="text-text-muted text-base sm:text-lg">No matching projects found.</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
            className="mt-4 text-sm font-medium text-foreground underline hover:text-text-secondary"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* TWO-TIER VIEW: DEFAULT "ALL" EXPERIENCE */}
      {showTwoTierView && filteredProjects.length > 0 && (
        <div className="space-y-16">
          {/* SECTION 1: FEATURED CASE STUDIES */}
          {caseStudies.length > 0 && (
            <section aria-labelledby="featured-case-studies-heading" className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-border-primary pb-3">
                <div>
                  <h2 id="featured-case-studies-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Featured Case Studies
                  </h2>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    Flagship engineering breakdowns, architectural trade-offs, and production metrics.
                  </p>
                </div>
                <span className="text-xs font-mono text-text-muted hidden sm:inline-block">
                  {caseStudies.length} {caseStudies.length === 1 ? "Study" : "Studies"}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {caseStudies.map((project, index) => (
                  <article
                    key={project.id}
                    className="group relative flex flex-col bg-background border border-border-primary hover:border-text-muted rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                  >
                    {/* Media / Cover */}
                    <Link href={`/projects/${project.slug}`} className="block relative aspect-[16/9] w-full bg-hover-bg overflow-hidden border-b border-border-primary">
                      {project.cover_image_url ? (
                        <Image
                          src={project.cover_image_url}
                          alt={`${project.title} case study architecture`}
                          fill
                          priority={index === 0}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-border-primary">
                          <span className="text-5xl font-medium" style={{ fontFamily: "var(--font-playfair)" }}>
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {/* Top Badges Overlay */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-background/90 backdrop-blur-md border border-green-500/40 text-green-700 dark:text-green-400 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          {project.badge || "Case Study"}
                        </span>
                        {project.category && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-background/90 backdrop-blur-md border border-border-primary text-text-secondary shadow-sm">
                            {project.category}
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <Link href={`/projects/${project.slug}`} className="block group-hover:text-text-secondary transition-colors">
                        <h3 className="text-2xl font-bold text-foreground mb-2.5 leading-snug">
                          {project.title}
                        </h3>
                      </Link>

                      {project.excerpt && (
                        <p className="text-sm text-text-muted leading-relaxed mb-5 line-clamp-3">
                          {project.excerpt}
                        </p>
                      )}

                      {/* Outcome Metrics Strip */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="mb-5 p-3 rounded-xl bg-footer-bg border border-border-primary space-y-1.5">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block">
                            Key Outcomes & Benchmarks:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {project.metrics.map((metric, mIdx) => (
                              <span
                                key={mIdx}
                                className="inline-flex items-center text-xs font-medium text-foreground bg-background px-2.5 py-1 rounded-lg border border-border-primary/80"
                              >
                                ✓ {metric}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                        {project.technologies?.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono tracking-tight text-text-secondary bg-hover-bg px-2.5 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="pt-4 border-t border-border-primary flex items-center justify-between">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-text-secondary transition-colors"
                        >
                          Read Case Study
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>

                        <div className="flex items-center gap-3">
                          {project.demo_link && (
                            <a
                              href={project.demo_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-text-muted hover:text-foreground transition-colors"
                            >
                              Live Demo ↗
                            </a>
                          )}
                          {project.github_link && (
                            <a
                              href={project.github_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-text-muted hover:text-foreground transition-colors"
                            >
                              GitHub ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 2: MORE PROJECTS & BUILDS */}
          {regularProjects.length > 0 && (
            <section aria-labelledby="more-projects-heading" className="space-y-6 pt-4">
              <div className="flex items-baseline justify-between border-b border-border-primary pb-3">
                <div>
                  <h2 id="more-projects-heading" className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    More Projects & Builds
                  </h2>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    Independent full-stack applications, experiments, and proofs-of-concept.
                  </p>
                </div>
                <span className="text-xs font-mono text-text-muted hidden sm:inline-block">
                  {regularProjects.length} {regularProjects.length === 1 ? "Build" : "Builds"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularProjects.map((project) => (
                  <article
                    key={project.id}
                    className="group flex flex-col bg-background border border-border-primary hover:border-text-muted rounded-2xl overflow-hidden shadow-sm transition-colors"
                  >
                    <Link href={`/projects/${project.slug}`} className="block relative aspect-[16/10] bg-hover-bg overflow-hidden border-b border-border-primary">
                      {project.cover_image_url ? (
                        <Image
                          src={project.cover_image_url}
                          alt={`${project.title} screenshot`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-border-primary">
                          <span className="text-4xl font-medium" style={{ fontFamily: "var(--font-playfair)" }}>
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-background/90 backdrop-blur-md border border-border-primary text-text-secondary">
                          {project.badge || "Personal Project"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {project.technologies?.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono uppercase text-text-secondary bg-hover-bg px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link href={`/projects/${project.slug}`} className="block group-hover:text-text-secondary transition-colors">
                        <h3 className="text-lg font-semibold text-foreground mb-1.5 leading-snug">
                          {project.title}
                        </h3>
                      </Link>

                      {project.excerpt && (
                        <p className="text-xs text-text-muted line-clamp-2 mb-4 flex-1">
                          {project.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-border-primary mt-auto text-xs font-medium">
                        <div className="flex items-center gap-3">
                          {project.demo_link && (
                            <a
                              href={project.demo_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text-secondary hover:text-foreground transition-colors"
                            >
                              Live Demo ↗
                            </a>
                          )}
                          {project.github_link && (
                            <a
                              href={project.github_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text-secondary hover:text-foreground transition-colors"
                            >
                              GitHub ↗
                            </a>
                          )}
                        </div>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-text-muted hover:text-foreground transition-colors"
                        >
                          Overview →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* FILTERED VIEW: UNIFIED GRID WHEN A SPECIFIC FILTER IS SELECTED OR USER SEARCHES */}
      {!showTwoTierView && filteredProjects.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-text-muted border-b border-border-primary pb-2">
            <span>
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? "result" : "results"}
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="text-foreground hover:underline"
            >
              Reset to All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col bg-background border border-border-primary hover:border-text-muted rounded-2xl overflow-hidden shadow-sm transition-colors"
              >
                <Link href={`/projects/${project.slug}`} className="block relative aspect-[16/10] bg-hover-bg overflow-hidden border-b border-border-primary">
                  {project.cover_image_url ? (
                    <Image
                      src={project.cover_image_url}
                      alt={`${project.title} cover`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-border-primary">
                      <span className="text-4xl font-medium" style={{ fontFamily: "var(--font-playfair)" }}>
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-background/90 backdrop-blur-md border border-border-primary text-text-secondary">
                      {project.badge || (project.is_case_study ? "Case Study" : "Personal Project")}
                    </span>
                  </div>
                </Link>

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono uppercase text-text-secondary bg-hover-bg px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link href={`/projects/${project.slug}`} className="block group-hover:text-text-secondary transition-colors">
                    <h3 className="text-lg font-semibold text-foreground mb-1.5 leading-snug">
                      {project.title}
                    </h3>
                  </Link>

                  {project.excerpt && (
                    <p className="text-xs text-text-muted line-clamp-2 mb-4 flex-1">
                      {project.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-border-primary mt-auto text-xs font-medium">
                    <div className="flex items-center gap-3">
                      {project.demo_link && (
                        <a
                          href={project.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-foreground transition-colors"
                        >
                          Demo ↗
                        </a>
                      )}
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-foreground transition-colors"
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-foreground hover:text-text-secondary transition-colors"
                    >
                      {project.is_case_study ? "Case Study →" : "Details →"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
