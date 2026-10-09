import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import RecruiterCheatSheet from "@/components/resume/RecruiterCheatSheet";
import { APP_URL, AUTHOR_NAME, AUTHOR_EMAIL, LINKEDIN_URL, GITHUB_URL } from "@/lib/site-config";
import {
  LuBriefcase,
  LuCheck,
  LuArrowRight,
  LuDownload,
  LuMail,
  LuShield,
  LuSparkles,
  LuZap,
  LuDatabase,
  LuCalendar,
  LuTerminal,
} from "react-icons/lu";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hire Samir Shaikh | AI Backend Engineer & Full Stack Developer",
  description:
    "Hire Samir Shaikh. AI Backend Engineer, AI SDE, and Full Stack Developer specialized in autonomous AI agents, 3072d RAG pipelines, and high-throughput Node.js/PostgreSQL backends. Actively interviewing for full-time remote roles & open to select freelance sprints.",
  keywords: [
    "hire Samir Shaikh",
    "hire AI backend engineer",
    "hire AI SDE",
    "hire full stack developer",
    "hire Forward Deployed Engineer",
    "remote AI developer",
    "hire Node.js developer",
    "hire TypeScript engineer",
    "RAG engineer for hire",
    "pgvector developer",
    "contract AI backend engineer",
    "hire freelance AI developer",
  ],
  alternates: {
    canonical: `${APP_URL}/hire`,
  },
  openGraph: {
    title: "Hire Samir Shaikh | AI Backend Engineer & Full Stack Developer",
    description:
      "AI Backend Engineer & Full Stack Developer specializing in production AI agents, 3072d RAG architectures, and high-scale backends. Available for full-time remote roles.",
    url: `${APP_URL}/hire`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Samir Shaikh | AI Backend Engineer & Full Stack Developer",
    description:
      "Available for full-time remote roles (AI Backend / Full Stack) and select high-velocity freelance sprints.",
  },
};

export default function HirePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: AUTHOR_NAME,
      jobTitle: "AI Backend Engineer & Full Stack Developer",
      url: `${APP_URL}/hire`,
      email: AUTHOR_EMAIL,
      sameAs: [LINKEDIN_URL, GITHUB_URL],
      knowsAbout: [
        "AI Backend Engineering",
        "Agentic AI & Tool Calling",
        "RAG & Vector Retrieval",
        "PostgreSQL & pgvector",
        "Node.js & TypeScript",
        "Next.js App Router",
        "Distributed Systems & Webhooks",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Time AI Backend / Full Stack Engineering",
            description: "Dedicated remote engineering role building production AI and high-scale backends.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fixed-Scope AI Sprint & MVP Rescue",
            description: "High-velocity 1-2 week production implementation sprints with guaranteed deliverables.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "3-5 Day Codebase Audit & Architecture Roadmap",
            description: "Comprehensive code, schema, and AI readiness audit with fixed $450 pricing.",
          },
        },
      ],
    },
  };

  return (
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient decorative lighting */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.06] pointer-events-none -z-10"
      />

      <div className="max-w-5xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Hire Samir", href: "/hire" },
            ]}
          />
        </div>

        {/* ── TOP LIVE AVAILABILITY BANNER ─────────────────────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 sm:px-5 rounded-2xl border border-border-primary bg-background/80 dark:bg-card-bg/80 backdrop-blur-xs shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-accent-lime shadow-[0_0_10px_rgba(184,255,0,0.9)] animate-pulse"
            />
            <span className="text-xs sm:text-sm font-mono font-bold text-foreground">
              CURRENT STATUS: Actively Interviewing for Full-Time Remote Roles
            </span>
          </div>
          <div className="text-xs font-mono text-text-muted">
            Immediate Onboarding &bull; Q2/Q3 2026
          </div>
        </div>

        {/* ── HERO PITCH SECTION ───────────────────────────────────────────── */}
        <div className="pb-10 pt-2 border-b border-border-primary/80 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              TALENT PROFILE &bull; RECRUITING HUB
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
              Hire Samir{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Shaikh
              </span>
            </h1>
            <p className="mt-4 text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
              AI Backend Engineer &amp; Full Stack Developer. I design and build{" "}
              <span className="text-foreground font-semibold">autonomous AI agent pipelines</span>,{" "}
              <span className="text-foreground font-semibold">high-precision RAG systems</span>, and{" "}
              <span className="text-foreground font-semibold">resilient backend architectures</span> that solve real business problems without hype or hallucinations.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 flex-shrink-0">
            <Link
              href="/contact?intent=full-time"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-xs sm:text-sm font-extrabold px-6 py-3.5 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
            >
              <LuMail className="w-4 h-4 stroke-[2.5]" />
              <span>Send Role Details / Offer</span>
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-bold px-6 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all whitespace-nowrap cursor-pointer"
            >
              <LuDownload className="w-4 h-4 text-text-muted" />
              <span>Full Resume &bull; PDF</span>
            </Link>
          </div>
        </div>

        {/* ── EMBEDDED RECRUITER FAST-TRACK CHEAT SHEET ─────────────────────── */}
        <div className="mb-14">
          <RecruiterCheatSheet />
        </div>

        {/* ── WHY HIRE SAMIR: 3 CORE DIFFERENTIATORS ───────────────────────── */}
        <section aria-labelledby="why-samir-heading" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              PROVEN ENGINEERING RIGOR
            </div>
            <h2
              id="why-samir-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground"
            >
              Why Samir Over Other Engineers?
            </h2>
            <p className="text-text-muted text-sm sm:text-base mt-2">
              Most candidates copy tutorial wrappers. Here is how my engineering philosophy protects your product and timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-hover-bg border border-border-primary flex items-center justify-center text-foreground dark:text-accent-lime mb-5 shadow-2xs">
                  <LuSparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Zero-Hallucination Production AI
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  I don&apos;t build flimsy OpenAI API wrappers. I engineer production RAG systems with Gemini 3072d embeddings, pgvector cosine distance indexing, strict similarity cutoffs, and deterministic fallback chains that never fabricate responses.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-primary/60 text-[11px] font-mono text-text-secondary">
                Benchmark: &lt; 280ms vector retrieval &bull; 99.2% grounded accuracy
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-hover-bg border border-border-primary flex items-center justify-center text-foreground dark:text-accent-lime mb-5 shadow-2xs">
                  <LuDatabase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Backend-First Systems &amp; Scaling
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  Strong relational database fundamentals. PostgreSQL schemas designed with proper foreign keys, partial indexes, and connection pooling. Experience handling Webhooks, BullMQ queues, rate limiting, and 1,200 req/s throughput.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-primary/60 text-[11px] font-mono text-text-secondary">
                Benchmark: Sub-100ms API response &bull; Zero memory leaks
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-hover-bg border border-border-primary flex items-center justify-center text-foreground dark:text-accent-lime mb-5 shadow-2xs">
                  <LuZap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Founder Velocity &bull; Full-Stack Autonomous
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  Give me an ambiguous problem and a target outcome. I investigate the repo, design the schema, write the backend routes, build the polished Next.js UI, configure CI/CD, and ship the PR without requiring micromanagement.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-primary/60 text-[11px] font-mono text-text-secondary">
                Benchmark: Fast PR turnaround &bull; 100% TypeScript typed
              </div>
            </div>
          </div>
        </section>

        {/* ── 3 FLEXIBLE ENGAGEMENT TIERS ──────────────────────────────────── */}
        <section aria-labelledby="engagement-tiers-heading" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              COLLABORATION MODELS
            </div>
            <h2
              id="engagement-tiers-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground"
            >
              How We Can Work Together
            </h2>
            <p className="text-text-muted text-sm sm:text-base mt-2">
              Whether you are an engineering director filling a core headcount or a startup founder needing an immediate rescue sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Model 1: Full-Time Remote Role */}
            <div className="p-6 sm:p-7 rounded-3xl border-2 border-accent-lime/60 bg-background dark:bg-card-bg shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-accent-lime text-[#0A0A0A] text-[10px] font-mono font-extrabold uppercase">
                PRIMARY FOCUS
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                  Tier 01 &bull; Direct Employment
                </span>
                <h3 className="text-xl font-black text-foreground mb-1">
                  Full-Time Remote Engineer
                </h3>
                <div className="text-xs font-mono text-accent-lime font-bold mb-4">
                  AI Backend &bull; Full Stack &bull; FDE
                </div>
                <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
                  Join your core engineering team as a dedicated engineer. Ideal for US, European, or global teams building AI-native products or scaling backend microservices.
                </p>

                <ul className="space-y-2.5 text-xs text-text-secondary mb-8">
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>Dedicated 40 hrs/week focus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>4–6 hrs daily US/EU timezone overlap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>Deel / Remote.com or direct contract</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>Notice period: <strong>Immediate (0 days)</strong></span>
                  </li>
                </ul>
              </div>

              <Link
                href="/contact?intent=full-time"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-xs font-extrabold py-3 shadow-xs hover:shadow-[0_0_16px_rgba(184,255,0,0.5)] transition-all cursor-pointer"
              >
                <span>Discuss Full-Time Role</span>
                <LuArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Model 2: Codebase Audit & Technical Roadmap */}
            <div className="p-6 sm:p-7 rounded-3xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                  Tier 02 &bull; Tripwire Sprint
                </span>
                <h3 className="text-xl font-black text-foreground mb-1">
                  Codebase Audit &amp; Roadmap
                </h3>
                <div className="text-xs font-mono text-text-muted font-bold mb-4">
                  $450 Fixed &bull; 3–5 Days Delivery
                </div>
                <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
                  Deep architectural, performance, and security inspection of your existing application before scaling, fundraising, or adding AI capabilities.
                </p>

                <ul className="space-y-2.5 text-xs text-text-secondary mb-8">
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>PostgreSQL schema &amp; indexing review</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>AI readiness &amp; vector search feasibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>12–18 page actionable report &amp; Loom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>100% money-back guarantee</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/services/codebase-audit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-hover-bg text-foreground text-xs font-bold py-3 hover:border-foreground/30 transition-all cursor-pointer"
              >
                <span>View Audit Details</span>
                <LuArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Model 3: Fixed-Scope Sprint & Rescue */}
            <div className="p-6 sm:p-7 rounded-3xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                  Tier 03 &bull; Milestone Contract
                </span>
                <h3 className="text-xl font-black text-foreground mb-1">
                  Feature Sprint or Rescue
                </h3>
                <div className="text-xs font-mono text-text-muted font-bold mb-4">
                  $800 – $2,500 &bull; 1–2 Weeks
                </div>
                <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
                  Ship a dedicated AI feature, fix production memory leaks, integrate WhatsApp/payment webhooks, or complete an abandoned MVP.
                </p>

                <ul className="space-y-2.5 text-xs text-text-secondary mb-8">
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>Clear scope &amp; fixed milestone price</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>Complete PRs with automated tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>100% IP &amp; repository transfer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>14 days post-launch bug warranty</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/services"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-hover-bg text-foreground text-xs font-bold py-3 hover:border-foreground/30 transition-all cursor-pointer"
              >
                <span>Browse Services</span>
                <LuArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CLOSING CONVERSION BENTO CARD ─────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center shadow-sm">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(184,255,0,0.14)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
          />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
            LET&apos;S TALK NEXT STEPS
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground max-w-xl mx-auto mb-3">
            Ready to Accelerate Your Engineering Roadmap?
          </h2>

          <p className="text-text-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
            Reach out directly. I respond to role inquiries, recruiter reachouts, and project briefs within 12–24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/contact?intent=full-time"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-8 py-3.5 shadow-xs hover:shadow-[0_0_24px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <LuMail className="w-4 h-4 stroke-[2.5]" />
              <span>Contact Samir Shaikh</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-8 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-border-primary/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuShield className="text-accent-lime text-sm" />
              Direct Engineer Communication
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuBriefcase className="text-accent-lime text-sm" />
              Immediate Full-Time / Contract Availability
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuTerminal className="text-accent-lime text-sm" />
              TypeScript &bull; PostgreSQL &bull; Node.js
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
