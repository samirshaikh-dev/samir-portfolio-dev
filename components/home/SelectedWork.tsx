import Link from "next/link";
import { Project } from "@/components/projects/ProjectList";
import ProjectCoverImage from "./ProjectCoverImage";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";

interface SelectedWorkProps {
  projects: Project[];
}

/**
 * Verified case study details mapped to provide problem-first framing,
 * technical decisions, and measurable outcomes.
 */
interface CaseStudyDetails {
  challenge: string;
  decisions: string[];
  outcome: string;
}

const CASE_STUDY_METADATA: Record<string, CaseStudyDetails> = {
  "ai-ticket-triage": {
    challenge: "Process and categorize high-volume support tickets asynchronously without blocking user-facing API threads.",
    decisions: [
      "BullMQ + Redis background worker isolation",
      "LLM classification with structured prompt schemas",
      "Prometheus & Grafana latency/error metrics",
    ],
    outcome: "74% automated triage routing with sub-1.8s background execution.",
  },
  "whatsapp-campaign-platform": {
    challenge: "Deliver high-concurrency broadcast campaigns reliably while adhering strictly to third-party rate limits.",
    decisions: [
      "Token-bucket rate limiter with Redis distributed state",
      "Idempotent webhook ingestion pipeline",
      "Automated delivery retries with exponential backoff",
    ],
    outcome: "Zero data-loss at peak concurrency with 99.8% webhook delivery confirmation.",
  },
  "smart-rag-assistant": {
    challenge: "Minimize hallucination in contextual enterprise Q&A while maintaining interactive streaming latency.",
    decisions: [
      "3072-dimensional Gemini vector embeddings",
      "Strict pgvector cosine similarity distance cutoff <= 0.5",
      "Streaming markdown chunking with dynamic GitHub context",
    ],
    outcome: "Sub-300ms vector retrieval with strict grounding and zero out-of-domain answers.",
  },
  "event-management-platform": {
    challenge: "Prevent overselling and concurrency collisions during high-traffic ticket checkouts.",
    decisions: [
      "ACID transactional seat locking in PostgreSQL",
      "Role-Based Access Control (RBAC) across organizers & attendees",
      "Normalized relational schema with indexed lookup paths",
    ],
    outcome: "Zero ticket double-booking incidents across multi-tenant events.",
  },
};

function getCaseStudyMeta(project: Project): CaseStudyDetails {
  const slug = (project.slug || "").toLowerCase();
  for (const [key, meta] of Object.entries(CASE_STUDY_METADATA)) {
    if (slug.includes(key)) {
      return meta;
    }
  }

  // Fallback defaults derived from project fields
  return {
    challenge: project.excerpt || "Architecting robust backend services and resilient client workflows.",
    decisions: project.technologies?.slice(0, 3) || ["Modern Stack Architecture", "Relational Data Modeling", "API Contracts"],
    outcome: project.metrics?.[0] || "Production-tested reliability and verified technical outcomes.",
  };
}

export default function SelectedWork({ projects }: SelectedWorkProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="selected-work"
      className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-border-primary/80"
      aria-label="Selected engineering case studies"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-border-primary/80">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              <span>02 / SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Engineering Case Studies
            </h2>
            <p className="text-text-muted text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
              Real systems, technical trade-offs, and verifiable outcomes &mdash; judged by architectural decisions rather than superficial counters.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:text-text-secondary transition-colors group flex-shrink-0"
          >
            <span>View all work (archive)</span>
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&rarr;</span>
          </Link>
        </div>

        {/* ── EDITORIAL CASE STUDIES LIST ───────────────────────────────────── */}
        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => {
            const meta = getCaseStudyMeta(project);
            const indexStr = String(index + 1).padStart(2, "0");

            return (
              <article
                key={project.id}
                className="group relative rounded-2xl md:rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-6 sm:p-8 md:p-10 hover:border-foreground/30 transition-all duration-300 shadow-2xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Case Narrative (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      {/* Meta header: Index + Category */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-mono font-bold text-foreground bg-hover-bg/70 px-2.5 py-1 rounded-md border border-border-primary/60">
                          CASE STUDY {indexStr}
                        </span>
                        {project.category && (
                          <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                            {project.category}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:underline underline-offset-4 decoration-border-primary group-hover:text-foreground transition-colors"
                        >
                          {project.title}
                        </Link>
                      </h3>

                      {/* Problem Statement */}
                      <div className="mb-5">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 font-semibold">
                          The Engineering Challenge
                        </div>
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                          {meta.challenge}
                        </p>
                      </div>

                      {/* Technical Decisions */}
                      <div className="mb-5">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-2 font-semibold">
                          Technical Decisions &amp; Architecture
                        </div>
                        <ul className="space-y-1.5" aria-label={`Technical decisions for ${project.title}`}>
                          {meta.decisions.map((decision, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                              <span
                                aria-hidden="true"
                                className="w-1.5 h-1.5 rounded-full bg-accent-lime mt-1.5 flex-shrink-0"
                              />
                              <span>{decision}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Verifiable Outcome */}
                      <div className="p-3.5 sm:p-4 rounded-xl border border-border-primary/80 bg-hover-bg/30 mb-6">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1 font-semibold">
                          Verifiable Outcome
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-foreground">
                          {meta.outcome}
                        </p>
                      </div>
                    </div>

                    {/* Tech Badges & Links */}
                    <div className="pt-4 border-t border-border-primary/70 flex flex-wrap items-center justify-between gap-4">
                      {/* Tech stack tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.technologies?.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-text-secondary bg-hover-bg/50 border border-border-primary/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Links */}
                      <div className="flex items-center gap-3">
                        {project.github_link && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-text-muted hover:text-foreground transition-colors"
                            aria-label={`View ${project.title} source code on GitHub`}
                          >
                            <FiGithub className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                        {project.demo_link && (
                          <a
                            href={project.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-text-muted hover:text-foreground transition-colors"
                            aria-label={`Open live demonstration for ${project.title}`}
                          >
                            <FiExternalLink className="w-3.5 h-3.5" />
                            <span>Live</span>
                          </a>
                        )}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-foreground hover:text-accent-lime transition-colors ml-1"
                        >
                          <span>Case Study</span>
                          <FiArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Case Image / Visual (5 cols) */}
                  <div className="lg:col-span-5 w-full">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none group/img rounded-xl md:rounded-2xl"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <ProjectCoverImage
                        coverImageUrl={project.cover_image_url}
                        title={project.title}
                        category={project.category}
                        indexStr={indexStr}
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Archive CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-8 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none"
          >
            <span>Explore All Projects &amp; Case Studies</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
