"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiSearch, FiX, FiGithub, FiExternalLink, FiCheck } from "react-icons/fi";
import ProjectCoverImage from "./ProjectCoverImage";

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
  { label: "All Work", value: "all" },
  { label: "Case Studies", value: "case-studies" },
  { label: "AI & Vector Systems", value: "ai" },
  { label: "Backend & Queues", value: "backend" },
  { label: "Full Stack Platforms", value: "fullstack" },
];

const VERIFIED_PROJECT_METRICS: Record<string, string[]> = {
  "ai-customer-ticket-triage": ["74% automated routing", "< 1.8s LLM triage", "92% intent accuracy"],
  "whatsapp-campaigner": ["1,200 req/s throughput", "99.8% webhook delivery", "Zero message loss"],
  "eventify": ["10k+ concurrent users", "Sub-100ms API response", "Role-based multi-tenancy"],
  "ai-ticket-triage": ["74% automated routing", "< 1.8s LLM triage", "92% intent accuracy"],
  "whatsapp-campaign-platform": ["1,200 req/s throughput", "99.8% webhook delivery", "Zero message loss"],
  "smart-rag-assistant": ["< 280ms vector retrieval", "3072d Gemini embeddings", "Zero hallucination cutoff"],
};

export function getProjectMetrics(project: Project): string[] {
  if (project.metrics && project.metrics.length > 0) {
    return project.metrics;
  }
  const slugLower = (project.slug || "").toLowerCase();
  const titleLower = (project.title || "").toLowerCase();

  for (const [key, metrics] of Object.entries(VERIFIED_PROJECT_METRICS)) {
    if (slugLower.includes(key) || titleLower.includes(key.replace(/-/g, " "))) {
      return metrics;
    }
  }

  if (project.category?.toLowerCase().includes("ai") || project.title.toLowerCase().includes("ai")) {
    return ["Sub-300ms vector retrieval", "pgvector 3072d embeddings", "Production verified"];
  }
  if (project.category?.toLowerCase().includes("full stack") || project.category?.toLowerCase().includes("backend")) {
    return ["100% TypeScript typed", "Sub-100ms API latency", "Clean relational schema"];
  }
  return [];
}

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
      if (activeFilter === "ai") {
        return (
          project.category?.toLowerCase().includes("ai") ||
          project.title.toLowerCase().includes("ai") ||
          project.technologies?.some((t) => t.toLowerCase().includes("ai") || t.toLowerCase().includes("llm") || t.toLowerCase().includes("vector"))
        );
      }
      if (activeFilter === "backend") {
        return (
          project.category?.toLowerCase().includes("backend") ||
          project.category?.toLowerCase().includes("automation") ||
          project.technologies?.some((t) =>
            t.toLowerCase().includes("redis") ||
            t.toLowerCase().includes("bullmq") ||
            t.toLowerCase().includes("queue") ||
            t.toLowerCase().includes("graphql") ||
            t.toLowerCase().includes("microservice")
          )
        );
      }
      if (activeFilter === "fullstack") {
        return (
          project.category?.toLowerCase().includes("full stack") ||
          project.technologies?.some((t) => t.toLowerCase().includes("next") || t.toLowerCase().includes("react"))
        );
      }

      return true;
    });
  }, [initialProjects, searchQuery, activeFilter]);

  // Split into Tier 1 (Featured Case Studies) and Tier 2 (Other Builds)
  const isCaseStudyProject = (p: Project) =>
    Boolean(p.is_case_study) ||
    p.badge === "Case Study" ||
    ["ai-customer-ticket-triage", "whatsapp-campaigner", "eventify"].includes(p.slug);

  const caseStudies = useMemo(() => {
    const list = filteredProjects.filter(isCaseStudyProject);
    return list.length > 0 ? list : filteredProjects;
  }, [filteredProjects]);

  const regularProjects = useMemo(() => {
    return filteredProjects.filter((p) => !isCaseStudyProject(p));
  }, [filteredProjects]);

  const showTwoTierView = activeFilter === "all" && !searchQuery;

  return (
    <div className="space-y-12">
      {/* ── SEARCH & FILTER CONTROLS ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-border-primary/80 bg-background dark:bg-card-bg shadow-2xs">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none" role="tablist">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                role="tab"
                aria-selected={isActive}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap border ${
                  isActive
                    ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] border-foreground dark:border-accent-lime shadow-2xs"
                    : "bg-hover-bg/50 text-text-secondary border-border-primary/60 hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar with Keyboard Focus Shortcut */}
        {!hideSearch && (
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted group-focus-within:text-foreground transition-colors">
              <FiSearch className="h-4 w-4" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-9 py-2 text-xs sm:text-sm text-foreground bg-hover-bg/60 border border-border-primary/80 rounded-xl focus:bg-background focus:ring-2 focus:ring-accent-lime focus:border-foreground/40 focus:outline-none transition-all placeholder:text-text-muted/70 font-mono"
              placeholder="Filter by stack, outcome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-foreground"
              >
                <FiX className="h-4 w-4" />
              </button>
            ) : (
              <span className="hidden sm:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
                <kbd className="text-[10px] font-mono text-text-muted bg-background/80 border border-border-primary/70 px-1.5 py-0.5 rounded">
                  /
                </kbd>
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── EMPTY STATE ──────────────────────────────────────────────────────── */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 px-6 rounded-2xl border border-border-primary/80 bg-hover-bg/30">
          <p className="text-base sm:text-lg font-bold text-foreground">
            No matching projects found
          </p>
          <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or clearing the active filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ── TWO-TIER VIEW: DEFAULT "ALL" EXPERIENCE ──────────────────────────── */}
      {showTwoTierView && filteredProjects.length > 0 && (
        <div className="space-y-16">
          {/* TIER 1: FLAGSHIP CASE STUDIES */}
          {caseStudies.length > 0 && (
            <section aria-labelledby="flagship-case-studies-heading" className="space-y-8">
              <div className="flex items-baseline justify-between border-b border-border-primary/80 pb-3">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                    <span>TIER 01 / DEEP-DIVE BREAKDOWNS</span>
                  </div>
                  <h2
                    id="flagship-case-studies-heading"
                    className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                  >
                    Flagship Engineering Case Studies
                  </h2>
                </div>
                <span className="text-xs font-mono text-text-muted">
                  {caseStudies.length} {caseStudies.length === 1 ? "System" : "Systems"} Shipped
                </span>
              </div>

              <div className="space-y-8">
                {caseStudies.map((project, index) => {
                  const displayMetrics = getProjectMetrics(project);
                  const indexStr = String(index + 1).padStart(2, "0");

                  return (
                    <article
                      key={project.id}
                      className="group rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-6 sm:p-8 md:p-10 hover:border-foreground/30 transition-all duration-200 shadow-2xs"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Cover Image & Quick Action Links */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="block overflow-hidden rounded-2xl group/img focus:outline-none"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <ProjectCoverImage
                              coverImageUrl={project.cover_image_url}
                              title={project.title}
                              category={project.category}
                              badge={project.badge}
                              indexStr={indexStr}
                              priority={index === 0}
                            />
                          </Link>

                          {/* Action Links */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] hover:opacity-90 transition-opacity"
                            >
                              <span>Read Case Study</span>
                              <FiArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                            {project.demo_link && (
                              <a
                                href={project.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium text-text-secondary hover:text-foreground border border-border-primary/70 hover:border-foreground/30 bg-hover-bg/30 transition-colors"
                              >
                                <span>Live Demo</span>
                                <FiExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {project.github_link && (
                              <a
                                href={project.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium text-text-secondary hover:text-foreground border border-border-primary/70 hover:border-foreground/30 bg-hover-bg/30 transition-colors"
                              >
                                <FiGithub className="w-3 h-3" />
                                <span>Source</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Engineering Content Column */}
                        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-5">
                          <div>
                            {/* Meta Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="font-mono text-xs font-bold text-text-muted">
                                #{indexStr}
                              </span>
                              <span className="text-text-muted text-xs">&bull;</span>
                              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                                {project.category || "Backend & AI Architecture"}
                              </span>
                              {project.badge && (
                                <span className="text-[11px] font-mono font-medium text-foreground bg-hover-bg/80 px-2 py-0.5 rounded-full border border-border-primary/60">
                                  {project.badge}
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <Link href={`/projects/${project.slug}`}>
                              <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight hover:text-text-secondary transition-colors">
                                {project.title}
                              </h3>
                            </Link>

                            {/* Problem Statement */}
                            {project.excerpt && (
                              <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                                {project.excerpt}
                              </p>
                            )}
                          </div>

                          {/* Verifiable Outcomes Ribbon */}
                          {displayMetrics.length > 0 && (
                            <div className="p-4 rounded-2xl border border-border-primary/70 bg-hover-bg/30 space-y-2">
                              <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                                <span>Verifiable Production Outcomes:</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {displayMetrics.map((metric, mIdx) => (
                                  <span
                                    key={mIdx}
                                    className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground bg-background dark:bg-card-bg px-3 py-1 rounded-lg border border-border-primary/80 shadow-2xs"
                                  >
                                    <FiCheck className="w-3 h-3 text-accent-lime flex-shrink-0" />
                                    <span>{metric}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Stack Chips */}
                          <div className="pt-2">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-semibold mb-2">
                              System Stack &amp; Technologies:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies?.map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-xs font-mono text-text-secondary bg-hover-bg/70 px-2.5 py-1 rounded-md border border-border-primary/50"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* TIER 2: ADDITIONAL PRODUCTION BUILDS & SYSTEMS */}
          {regularProjects.length > 0 && (
            <section aria-labelledby="other-builds-heading" className="space-y-6 pt-6">
              <div className="border-b border-border-primary/80 pb-3">
                <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-border-primary" />
                  <span>TIER 02 / PRODUCTION WORK &amp; EXPERIMENTS</span>
                </div>
                <h2
                  id="other-builds-heading"
                  className="text-xl sm:text-2xl font-black tracking-tight text-foreground"
                >
                  Additional Systems &amp; Engineering Builds
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  Production tools, integration microservices, and targeted architectural prototypes.
                </p>
              </div>

              {/* Minimalist Editorial Row List (No Card Clutter per AVOID.md) */}
              <div className="divide-y divide-border-primary/80 border-y border-border-primary/80">
                {regularProjects.map((project) => {
                  const displayMetrics = getProjectMetrics(project);

                  return (
                    <article
                      key={project.id}
                      className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-hover-bg/20 transition-colors px-2 rounded-xl"
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                        {/* Cover Thumbnail */}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="w-full sm:w-44 flex-shrink-0 overflow-hidden rounded-xl block focus:outline-none"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <ProjectCoverImage
                            coverImageUrl={project.cover_image_url}
                            title={project.title}
                            category={project.category}
                            badge={project.badge}
                            aspectRatio="card"
                          />
                        </Link>

                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-mono text-text-muted uppercase">
                              {project.category || "Full Stack"}
                            </span>
                            {project.badge && (
                              <span className="text-[10px] font-mono bg-hover-bg px-2 py-0.5 rounded border border-border-primary/60 text-text-secondary">
                                {project.badge}
                              </span>
                            )}
                            {displayMetrics.length > 0 && (
                              <span className="text-[10px] font-mono text-foreground bg-hover-bg/70 px-2 py-0.5 rounded border border-border-primary/50">
                                ✓ {displayMetrics[0]}
                              </span>
                            )}
                          </div>

                          <Link href={`/projects/${project.slug}`}>
                            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-text-secondary transition-colors">
                              {project.title}
                            </h3>
                          </Link>

                          {project.excerpt && (
                            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2">
                              {project.excerpt}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.technologies?.map((tech, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-mono text-text-muted bg-hover-bg/60 px-2 py-0.5 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-start md:self-center flex-shrink-0">
                        {project.demo_link && (
                          <a
                            href={project.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-text-muted hover:text-foreground transition-colors"
                          >
                            <span>Demo</span>
                            <FiExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.github_link && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-text-muted hover:text-foreground transition-colors"
                          >
                            <FiGithub className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-text-secondary transition-colors ml-2"
                        >
                          <span>Deep Dive</span>
                          <FiArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ── FILTERED VIEW: SINGLE EDITORIAL GRID FOR SEARCH / ACTIVE FILTER ── */}
      {!showTwoTierView && filteredProjects.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-text-muted border-b border-border-primary/80 pb-3">
            <span>
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? "system" : "systems"}
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="text-foreground hover:underline font-bold"
            >
              Reset to All Work
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => {
              const displayMetrics = getProjectMetrics(project);

              return (
                <article
                  key={project.id}
                  className="group rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-6 sm:p-7 hover:border-foreground/30 transition-all duration-200 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block overflow-hidden rounded-2xl mb-5 focus:outline-none"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <ProjectCoverImage
                        coverImageUrl={project.cover_image_url}
                        title={project.title}
                        category={project.category}
                        badge={project.badge}
                        indexStr={String(index + 1).padStart(2, "0")}
                      />
                    </Link>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono uppercase text-text-muted">
                        {project.category || "Architecture"}
                      </span>
                      {project.badge && (
                        <span className="text-[10px] font-mono text-foreground bg-hover-bg px-2 py-0.5 rounded-full border border-border-primary/60">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight group-hover:text-text-secondary transition-colors">
                        {project.title}
                      </h3>
                    </Link>

                    {project.excerpt && (
                      <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {project.excerpt}
                      </p>
                    )}

                    {displayMetrics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {displayMetrics.slice(0, 2).map((m, mIdx) => (
                          <span
                            key={mIdx}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-foreground bg-hover-bg/70 px-2 py-0.5 rounded border border-border-primary/60"
                          >
                            <FiCheck className="w-2.5 h-2.5 text-accent-lime" />
                            <span>{m}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-primary/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {project.demo_link && (
                        <a
                          href={project.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-text-muted hover:text-foreground transition-colors"
                        >
                          Demo ↗
                        </a>
                      )}
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-text-muted hover:text-foreground transition-colors"
                        >
                          Code ↗
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-text-secondary transition-colors"
                    >
                      <span>Deep Dive</span>
                      <FiArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* ── CLOSING ARCHITECTURAL DISCUSSION BOX ──────────────────────────────── */}
      <section className="rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-8 sm:p-10 md:p-12 shadow-2xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            <span>SYSTEM DESIGN &amp; TECHNICAL ARCHITECTURE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
            Have a system that needs designing, benchmarking, or scaling?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            I work directly with technical teams and founders to architect high-throughput backend services, autonomous AI routing pipelines, and clean relational database models.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] hover:opacity-90 transition-opacity"
            >
              <span>Discuss Your Architecture</span>
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs sm:text-sm font-mono font-medium text-foreground border border-border-primary/80 hover:border-foreground/30 bg-hover-bg/30 transition-colors"
            >
              <span>Career &amp; Engineering Philosophy</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
