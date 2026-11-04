import Link from "next/link";
import Image from "next/image";
import HtmlParser from "@/components/HtmlParser";
import { FiArrowUpRight, FiBriefcase } from "react-icons/fi";

interface ExperienceItem {
  id: string;
  companyName: string;
  logoUrl?: string | null;
  position: string;
  employmentType?: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean | null;
  description?: string | null;
  contributions?: string[];
  outcome?: string;
}

interface HomeExperienceProps {
  experiences?: Array<{
    id: string;
    companyName: string;
    logoUrl?: string | null;
    position: string;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean | null;
    description?: string | null;
  }>;
}

const VERIFIED_EXPERIENCES: ExperienceItem[] = [
  {
    id: "logicwind",
    companyName: "LOGICWIND",
    position: "Back End Developer Intern",
    employmentType: "Internship &bull; Surat, India",
    startDate: "Dec 2024",
    endDate: "Jun 2025",
    isCurrent: false,
    description: "Built backend microservices, GraphQL APIs, and database caching layers in real production codebases.",
    contributions: [
      "Implemented GraphQL DataLoader pattern to eliminate N+1 database queries, improving endpoint latency by ~30%.",
      "Engineered Node.js and TypeScript microservices with modular service boundaries and structured error handling.",
      "Integrated Redis caching mechanisms for frequently requested datasets and resolved staging bugs during agile sprints.",
    ],
    outcome: "Measurable query latency reduction and reliable microservice integration.",
  },
  {
    id: "xira",
    companyName: "Xira Infotech",
    position: "Full Stack Engineer Intern",
    employmentType: "Internship &bull; Surat, India",
    startDate: "Jun 2024",
    endDate: "Nov 2024",
    isCurrent: false,
    description: "Architected end-to-end full-stack capabilities, turning a static portal concept into a dynamic platform.",
    contributions: [
      "Engineered PostgreSQL database models with relational integrity, foreign key cascading, and normalized indexes.",
      "Developed Express.js REST APIs with robust Role-Based Access Control (RBAC) across recruiters and applicants.",
      "Built dynamic job listing search, payment gateway checkout workflows, and application status tracking.",
    ],
    outcome: "Delivered a multi-tenant recruitment portal from scratch with full RBAC authentication.",
  },
  {
    id: "utu",
    companyName: "Uka Tarsadia University (UTU)",
    position: "B.Tech in Information Technology",
    employmentType: "Academic Degree &bull; Gujarat, India",
    startDate: "2021",
    endDate: "2025",
    isCurrent: false,
    description: "Deep theoretical and applied study of computer systems, data structures, and software engineering.",
    contributions: [
      "Core coursework: Data Structures & Algorithms, Database Management Systems (RDBMS), Operating Systems, Distributed Systems.",
      "Built independent engineering projects and research prototypes focusing on AI workflows and backend systems.",
    ],
    outcome: "Strong foundational knowledge in systems architecture and algorithmic problem solving.",
  },
];

export default function HomeExperience({ experiences }: HomeExperienceProps) {
  // Use passed database records if available, otherwise use verified portfolio timeline
  const items: ExperienceItem[] =
    experiences && experiences.length > 0
      ? experiences.map((exp) => {
          const matchingVerified = VERIFIED_EXPERIENCES.find(
            (v) =>
              v.companyName.toLowerCase().includes(exp.companyName.toLowerCase()) ||
              exp.companyName.toLowerCase().includes(v.companyName.toLowerCase())
          );
          return {
            id: exp.id,
            companyName: exp.companyName,
            logoUrl: exp.logoUrl || null,
            position: exp.position,
            employmentType: matchingVerified?.employmentType || "Production Engineering",
            startDate: exp.startDate,
            endDate: exp.endDate,
            isCurrent: exp.isCurrent,
            description: exp.description || matchingVerified?.description || null,
            contributions: exp.description ? [] : (matchingVerified?.contributions || []),
            outcome: matchingVerified?.outcome || undefined,
          };
        })
      : VERIFIED_EXPERIENCES;

  return (
    <section
      className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-border-primary/80"
      aria-label="Professional work experience and career history"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-border-primary/80">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              <span>05 / CAREER HISTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Professional Experience
            </h2>
            <p className="text-text-muted text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
              Real contributions inside production teams &mdash; presented honestly, with concrete technical responsibilities and measurable results.
            </p>
          </div>

          <Link
            href="/resume"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:text-text-secondary transition-colors group flex-shrink-0"
          >
            <span>View Full Résumé (PDF)</span>
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ── EDITORIAL TIMELINE ─────────────────────────────────────────────── */}
        <div className="relative border-l-2 border-border-primary/80 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10 md:space-y-12">
          {items.map((exp, index) => {
            const dateStr = exp.endDate ? `${exp.startDate} – ${exp.endDate}` : `${exp.startDate} – Present`;

            return (
              <div key={exp.id || index} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[33px] sm:-left-[41px] top-6 flex items-center justify-center w-8 h-8 rounded-full border border-border-primary bg-background dark:bg-card-bg shadow-2xs group-hover:border-foreground transition-colors overflow-hidden">
                  {exp.logoUrl ? (
                    <Image
                      src={exp.logoUrl}
                      alt={`${exp.companyName} logo`}
                      width={22}
                      height={22}
                      unoptimized
                      className="w-5 h-5 rounded-md object-contain"
                    />
                  ) : (
                    <FiBriefcase className="w-3.5 h-3.5 text-text-muted group-hover:text-foreground transition-colors" />
                  )}
                </div>

                {/* Experience Card */}
                <article className="rounded-2xl border border-border-primary/80 bg-background dark:bg-card-bg p-6 sm:p-8 hover:border-foreground/30 transition-all duration-200 shadow-2xs">
                  {/* Top Header: Role, Company & Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                        {exp.position}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-foreground">
                          {exp.companyName}
                        </span>
                        {exp.employmentType && (
                          <>
                            <span className="text-text-muted text-xs">&bull;</span>
                            <span
                              className="text-xs font-mono text-text-muted"
                              dangerouslySetInnerHTML={{ __html: exp.employmentType }}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-mono font-medium text-text-muted bg-hover-bg/70 px-3 py-1 rounded-full border border-border-primary/60 self-start sm:self-auto">
                      {dateStr}
                    </span>
                  </div>

                  {/* Summary */}
                  {exp.description && (
                    <div className="mb-4">
                      <HtmlParser
                        html={exp.description}
                        className="prose prose-sm prose-gray dark:prose-invert max-w-none text-sm text-text-secondary dark:text-text-secondary leading-relaxed [&_p]:my-1.5 [&_ul]:my-2 [&_li]:my-1 [&_strong]:text-foreground [&_p:empty]:hidden"
                      />
                    </div>
                  )}

                  {/* Key Contributions */}
                  {exp.contributions && exp.contributions.length > 0 && (
                    <div className="pt-3 border-t border-border-primary/60">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-semibold mb-2">
                        Key Responsibilities &amp; Contributions
                      </div>
                      <ul className="space-y-1.5" aria-label={`Contributions at ${exp.companyName}`}>
                        {exp.contributions.map((c, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary leading-snug">
                            <span
                              aria-hidden="true"
                              className="w-1.5 h-1.5 rounded-full bg-accent-lime mt-1.5 flex-shrink-0"
                            />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Outcome Tag if present */}
                  {exp.outcome && (
                    <div className="mt-4 pt-3 border-t border-border-primary/50 flex items-center gap-2 text-xs font-mono text-text-muted">
                      <span className="font-semibold text-foreground">Outcome:</span>
                      <span>{exp.outcome}</span>
                    </div>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
