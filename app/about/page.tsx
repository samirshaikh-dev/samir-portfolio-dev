import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { about } from "@/lib/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import HtmlParser from "@/components/HtmlParser";
import FAQ from "@/components/about/FAQ";
import { APP_URL, AUTHOR_EMAIL } from "@/lib/site-config";
import { getSpeakableJsonLd } from "@/lib/seo/structured-data";
import {
  LuAward,
  LuArrowRight,
  LuMail,
  LuCheck,
  LuFileText,
  LuCpu,
  LuShieldCheck,
  LuDatabase,
  LuCode,
} from "react-icons/lu";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | Samir Shaikh — AI Backend Engineer & Systems Architect",
  description:
    "Learn about Samir Shaikh — an AI Backend Engineer and Systems Architect from Gujarat, India. Specializing in autonomous AI agents, PostgreSQL pgvector RAG systems, and distributed Node.js/TypeScript microservices. Available for remote engineering roles and direct sprint engagements.",
  keywords: [
    "About Samir Shaikh",
    "Samir Shaikh biography",
    "AI Backend Engineer",
    "AI Developer Gujarat India",
    "Node.js Backend Developer",
    "RAG pipeline developer",
    "AI agent engineer",
    "LLM integration engineer",
    "Forward Deployed Engineer India",
    "microservices developer",
    "Full Stack Developer India",
    "PostgreSQL pgvector engineer",
    "event-driven systems",
    "B.Tech Information Technology",
    "Uka Tarsadia University",
    "Logicwind intern",
    "Xira Infotech engineer",
  ],
  alternates: {
    canonical: `${APP_URL}/about`,
  },
  openGraph: {
    title: "About | Samir Shaikh — AI Backend Engineer & Systems Architect",
    description:
      "Learn about Samir Shaikh — an AI Backend Engineer and Systems Architect from Gujarat, India. Specializing in autonomous AI agents, PostgreSQL pgvector RAG systems, and distributed Node.js/TypeScript microservices.",
    url: `${APP_URL}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Samir Shaikh — AI Backend Engineer & Systems Architect",
    description:
      "AI Backend Engineer from Gujarat, India. Experienced in autonomous agents, RAG systems, PostgreSQL pgvector, and distributed microservices. Available for remote roles and direct client sprints.",
  },
};

async function getAbout() {
  try {
    const result = await db
      .select({ description: about.description, present: about.present, future: about.future })
      .from(about)
      .limit(1);
    return {
      description: result[0]?.description ?? "",
      present: result[0]?.present ?? "",
      future: result[0]?.future ?? "",
    };
  } catch {
    return { description: "", present: "", future: "" };
  }
}

interface TimelineEntryProps {
  variant: "past" | "present" | "future";
  badge: string;
  secondaryBadge?: string;
  heading: string;
  content: string;
  isLast?: boolean;
}

function TimelineEntry({
  variant,
  badge,
  secondaryBadge,
  heading,
  content,
  isLast,
}: TimelineEntryProps) {
  const isPresent = variant === "present";

  return (
    <div className={`relative ${!isLast ? "pb-8" : ""}`}>
      {/* Node on vertical track */}
      <div
        className={`absolute -left-[31px] sm:-left-[39px] top-6 flex items-center justify-center w-7 h-7 rounded-full border bg-background dark:bg-card-bg transition-colors ${
          isPresent
            ? "border-foreground dark:border-accent-lime"
            : "border-border-primary"
        }`}
      >
        {isPresent ? (
          <span className="w-2 h-2 rounded-full bg-accent-lime" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-border-primary" />
        )}
      </div>

      {/* Milestone Container — Open Editorial Layout */}
      <article
        className={`rounded-2xl border p-5 sm:p-6 transition-colors ${
          isPresent
            ? "border-border-primary bg-background dark:bg-card-bg"
            : "border-border-primary/80 bg-background dark:bg-card-bg/60"
        }`}
      >
        {/* Milestone Metadata Badges */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {isPresent ? (
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A]">
              {badge}
            </span>
          ) : (
            <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-primary/80 text-text-muted bg-hover-bg/40 font-medium">
              {badge}
            </span>
          )}

          {secondaryBadge && (
            <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-primary/60 text-text-muted bg-hover-bg/30">
              {secondaryBadge}
            </span>
          )}
        </div>

        {/* Milestone Heading */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-2">
          {heading}
        </h3>

        {/* Milestone Content */}
        <div className="pt-2 border-t border-border-primary/60 text-xs sm:text-sm text-text-secondary">
          <HtmlParser
            html={content}
            className="prose prose-sm max-w-none text-text-secondary dark:text-text-secondary leading-relaxed [&_p]:my-1.5 [&_strong]:text-foreground [&_a]:text-foreground [&_a]:underline hover:[&_a]:text-accent-lime transition-colors"
          />
        </div>
      </article>
    </div>
  );
}

export default async function AboutPage() {
  const { description, present, future } = await getAbout();

  const hasPast = Boolean(description);
  const hasPresent = Boolean(present);
  const hasFuture = Boolean(future);
  const hasAnySection = hasPast || hasPresent || hasFuture;

  return (
    <main className="flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-24 pt-6 sm:pt-10">
      <div className="max-w-5xl mx-auto w-full space-y-16">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ]}
        />

        {/* ── EDITORIAL HEADER SECTION ────────────────────────────────────────── */}
        <header className="border-b border-border-primary pb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span>01 / BIOGRAPHY &amp; ENGINEERING PERSPECTIVE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
            About Samir Shaikh
          </h1>

          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-3xl leading-relaxed">
            AI Backend Engineer and Systems Architect from Gujarat, India. Specializing in autonomous agent workflows, high-precision RAG pipelines, and resilient distributed microservices built with TypeScript, Node.js, and PostgreSQL pgvector.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] hover:opacity-90 transition-opacity"
            >
              <LuMail className="w-4 h-4" />
              <span>Discuss an Engagement</span>
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-medium text-foreground border border-border-primary hover:bg-hover-bg transition-colors"
            >
              <LuFileText className="w-4 h-4" />
              <span>View Resume</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-medium text-foreground border border-border-primary hover:bg-hover-bg transition-colors"
            >
              <span>Explore Services</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* ── TRUST & BACKGROUND METRIC STRIP (THE CONFIDENCE LAYER) ─────────── */}
        <section aria-label="Professional background summary">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-border-primary divide-y sm:divide-y-0 sm:divide-x divide-border-primary py-4 sm:py-6">
            <div className="p-4 sm:p-5 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block">
                LOCATION &amp; TIMEZONE
              </span>
              <div className="text-sm font-bold text-foreground">
                Gujarat, India (IST)
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Async-first workflow with reliable daily overlap across US East/West, UK, and EU timezones.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block">
                EDUCATION &amp; DEGREE
              </span>
              <div className="text-sm font-bold text-foreground">
                B.Tech in IT (2022–2026)
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Uka Tarsadia University. Deep coursework in distributed systems, DBMS, and algorithms.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block">
                PRODUCTION ROLES
              </span>
              <div className="text-sm font-bold text-foreground">
                Xira Infotech &bull; LOGICWIND
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Hands-on backend and full-stack engineering delivering production RAG systems and microservices.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block">
                CREDENTIALS &amp; AUDITS
              </span>
              <div className="text-sm font-bold text-foreground">
                8+ Verified Accreditations
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Cloud platforms, backend architectures, and database performance optimizations.
              </p>
            </div>
          </div>
        </section>

        {/* ── ENGINEERING PHILOSOPHY & TECHNICAL JUDGEMENT (PSYCHOLOGY.MD) ───── */}
        <section aria-labelledby="philosophy-heading">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>JUDGEMENT OVER HYPE</span>
            </div>
            <h2
              id="philosophy-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Engineering Philosophy &amp; Technical Convictions
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl leading-relaxed">
              Anyone can call an LLM API. Delivering production systems requires knowing what failure modes to anticipate, what trade-offs to make, and when simpler architectures win.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border-primary bg-background dark:bg-card-bg space-y-2">
              <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                <LuDatabase className="w-4 h-4 text-accent-lime" aria-hidden="true" />
                <span>Pragmatic Architecture over Resume-Driven Complexity</span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                We default to clean modular monoliths and PostgreSQL with pgvector before adopting expensive external vector database subscriptions or distributed microservice sprawl. Simple architectures scale further with fewer moving parts.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border-primary bg-background dark:bg-card-bg space-y-2">
              <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                <LuCpu className="w-4 h-4 text-accent-lime" aria-hidden="true" />
                <span>Deterministic Tooling over Prompt-Only 'Agents'</span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Reliable AI systems require structured JSON schemas, strict cosine distance bounds ($\le 0.5$), and deterministic state machine guards. Prompt engineering alone is never a substitute for rigorous backend validation.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border-primary bg-background dark:bg-card-bg space-y-2">
              <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                <LuCode className="w-4 h-4 text-accent-lime" aria-hidden="true" />
                <span>Human-Governed, Test-Driven AI Coding</span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                AI coding tools (Cursor, Copilot, Claude Code) accelerate boilerplate generation, but human engineering judgement strictly owns system boundaries, database migrations, security boundaries, and automated test suites.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border-primary bg-background dark:bg-card-bg space-y-2">
              <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                <LuShieldCheck className="w-4 h-4 text-accent-lime" aria-hidden="true" />
                <span>Zero Lock-In &amp; 100% Repository Ownership</span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Clean, readable TypeScript committed directly to your private GitHub or GitLab repository with atomic PRs and passing CI/CD pipelines. No proprietary wrapper runtimes, no hostage codebases.
              </p>
            </div>
          </div>
        </section>

        {/* ── CAREER EVOLUTION TRAJECTORY TIMELINE ─────────────────────────────── */}
        {hasAnySection ? (
          <section aria-label="Career Evolution Timeline">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-border-primary">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                  <span>EVOLUTION &amp; TRAJECTORY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  The Engineering Journey
                </h2>
                <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                  Documented milestone-by-milestone from fundamental foundations to current production focus.
                </p>
              </div>

              <span className="font-mono text-xs text-text-muted px-2.5 py-1 rounded-lg border border-border-primary bg-hover-bg/30 self-start sm:self-auto">
                git log --graph --oneline
              </span>
            </div>

            {/* Voice-search optimized crawlable intro (AEO) */}
            <p className="sr-only">
              Samir Shaikh is an AI backend engineer based in Gujarat, India. He builds production Node.js/TypeScript applications, RAG pipelines, and LLM-powered features using an agent-assisted workflow with Cursor, GitHub Copilot, and Claude Code — owning critical logic, security, and testing by hand. Available for freelance projects, contract sprints, and remote engineering roles.
            </p>

            {/* Timeline Track — Open Editorial Layout */}
            <div className="relative border-l border-border-primary ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
              {hasPast && (
                <TimelineEntry
                  variant="past"
                  badge="v1.0 — FOUNDATION"
                  secondaryBadge="2022 – 2026"
                  heading="Foundation & Academic Grounding"
                  content={description}
                  isLast={!hasPresent && !hasFuture}
                />
              )}

              {hasPresent && (
                <TimelineEntry
                  variant="present"
                  badge="HEAD → MAIN"
                  secondaryBadge="CURRENT FOCUS"
                  heading="Production AI & Distributed Backends"
                  content={present}
                  isLast={!hasFuture}
                />
              )}

              {hasFuture && (
                <TimelineEntry
                  variant="future"
                  badge="ROADMAP / NEXT"
                  secondaryBadge="LOOKING FORWARD"
                  heading="Forward Deployed & Autonomous Architectures"
                  content={future}
                  isLast
                />
              )}
            </div>
          </section>
        ) : null}

        {/* ── WORK EXPERIENCE ─────────────────────────────────────────────────── */}
        <ExperienceTimeline />

        {/* ── VERIFIED CREDENTIALS CALLOUT STRIP ──────────────────────────────── */}
        <section aria-label="Verified certificates and credentials">
          <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl border border-border-primary bg-hover-bg/50 flex items-center justify-center text-foreground dark:text-accent-lime shrink-0">
                <LuAward className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                  ACCREDITATIONS &bull; 8+ CERTIFICATES
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Verified Technical Certificates &amp; Credentials
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-md leading-relaxed">
                  Accreditations across backend systems, cloud deployment, and database performance.
                </p>
              </div>
            </div>

            <Link
              href="/certificates"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-mono font-bold px-5 py-2.5 hover:bg-hover-bg transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>View Verified Certificates</span>
              <LuArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS ──────────────────────────────────────── */}
        <FAQ />

        {/* ── BOTTOM CONVERSION SECTION ────────────────────────────────────────── */}
        <section className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span>LET&apos;S BUILD TOGETHER</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground max-w-2xl mx-auto mb-3">
            Have an AI, Backend, or Forward Deployed Challenge?
          </h2>

          <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Whether you need to architect autonomous agent pipelines, scale a custom RAG knowledge base, modernize a legacy backend, or bring on an embedded engineer &mdash; let&apos;s build systems that scale reliably.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs sm:text-sm font-bold px-6 py-3.5 hover:opacity-90 transition-opacity"
            >
              <LuMail className="w-4 h-4" />
              <span>Start a Conversation</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-mono font-bold px-6 py-3.5 hover:bg-hover-bg transition-colors"
            >
              <span>Explore Services</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-border-primary flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-accent-lime text-sm" aria-hidden="true" />
              Direct Engineer Access
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-accent-lime text-sm" aria-hidden="true" />
              Fixed-Milestone Proposals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-accent-lime text-sm" aria-hidden="true" />
              100% Repository &amp; IP Transfer
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-accent-lime text-sm" aria-hidden="true" />
              14-Day Bug Warranty
            </span>
          </div>
        </section>

        {/* Speakable Structured Data for SEO / AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSpeakableJsonLd(["h1", "h2"])),
          }}
        />
      </div>
    </main>
  );
}
