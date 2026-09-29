import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { about } from "@/lib/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import HtmlParser from "@/components/HtmlParser";
import FAQ from "@/components/about/FAQ";
import { APP_URL } from "@/lib/site-config";
import { getSpeakableJsonLd } from "@/lib/seo/structured-data";
import { LuAward, LuArrowRight, LuMail, LuCheck, LuFileText } from "react-icons/lu";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | Samir Shaikh — AI Developer (Backend-First)",
  description: "Learn more about Samir Shaikh — an AI developer (backend-first) from Gujarat, India. Specializing in AI agents, RAG knowledge bases, and production Node.js/TypeScript backend systems. Available for freelance projects, contract sprints, and remote roles.",
  keywords: [
    "About Samir Shaikh",
    "Samir Shaikh biography",
    "freelance AI developer",
    "AI developer backend-first",
    "Node.js Backend Developer",
    "RAG pipeline developer",
    "AI agent engineer",
    "LLM integration engineer",
    "microservices developer",
    "Full Stack Developer India",
    "event-driven systems",
    "B.Tech Information Technology",
    "Uka Tarsadia University",
    "Logicwind intern",
    "backend developer Gujarat India",
  ],
  alternates: {
    canonical: `${APP_URL}/about`,
  },
  openGraph: {
    title: "About | Samir Shaikh — AI Developer (Backend-First)",
    description: "Learn more about Samir Shaikh — an AI developer (backend-first) from Gujarat, India. Specializing in AI agents, RAG knowledge bases, and production Node.js/TypeScript backend systems. Available for freelance projects and contract sprints.",
    url: `${APP_URL}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Samir Shaikh — AI Developer (Backend-First)",
    description: "AI developer (backend-first) from Gujarat, India. Experienced in AI agents, RAG pipelines, Node.js, TypeScript, PostgreSQL, and scalable microservices. Available for freelance projects.",
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
  const isFuture = variant === "future";

  return (
    <div className={`relative ${!isLast ? "pb-8" : ""}`}>
      {/* Node on vertical track */}
      <div
        className={`absolute -left-[35px] sm:-left-[43px] top-6 flex items-center justify-center w-8 h-8 rounded-full border bg-background dark:bg-card-bg shadow-2xs transition-all duration-300 ${
          isPresent
            ? "border-foreground dark:border-accent-lime ring-4 ring-background dark:ring-card-bg"
            : "border-border-primary"
        }`}
      >
        {isPresent ? (
          <span className="w-2.5 h-2.5 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] animate-pulse" />
        ) : (
          <span className="w-2 h-2 rounded-full bg-border-primary" />
        )}
      </div>

      {/* Elevated Milestone Card */}
      <article
        className={`relative rounded-2xl border bg-background dark:bg-card-bg p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 overflow-hidden ${
          isPresent
            ? "border-border-secondary ring-1 ring-border-primary/60 dark:shadow-[0_0_24px_rgba(184,255,0,0.06)]"
            : "border-border-primary"
        }`}
      >
        {/* Electric Lime Accent for Active HEAD Milestone */}
        {isPresent && (
          <span
            aria-hidden="true"
            className="absolute top-0 left-6 sm:left-8 w-12 sm:w-16 h-[2px] bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]"
          />
        )}

        {/* Milestone Metadata Badges */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {isPresent ? (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-extrabold px-3 py-1 rounded-full border border-foreground/20 bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] dark:border-accent-lime shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime dark:bg-[#0A0A0A] animate-pulse" />
              {badge}
            </span>
          ) : (
            <span
              className={`font-mono text-[11px] px-2.5 py-1 rounded-full border ${
                isFuture
                  ? "text-text-muted border-dashed border-border-primary bg-hover-bg/30"
                  : "text-text-muted border-border-primary/80 bg-hover-bg/60 font-medium"
              }`}
            >
              {badge}
            </span>
          )}

          {secondaryBadge && (
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-border-primary/60 text-text-muted bg-hover-bg/40">
              {secondaryBadge}
            </span>
          )}
        </div>

        {/* Milestone Heading */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3">
          {heading}
        </h3>

        {/* Rich Milestone Content */}
        <div className="pt-2 border-t border-border-primary/50 text-text-secondary">
          <HtmlParser
            html={content}
            className="prose prose-sm sm:prose-base max-w-none text-text-secondary dark:text-text-secondary leading-relaxed [&_p]:my-2 [&_strong]:text-foreground [&_a]:text-foreground [&_a]:underline hover:[&_a]:text-accent-lime transition-colors"
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
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20 overflow-hidden">
      {/* Ambient background lighting matching new-theme.md */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.06] pointer-events-none -z-10"
      />

      <div className="max-w-4xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ]}
          />
        </div>

        {/* ── TOP UTILITY ROW: STATUS & TRUST ─────────────────────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:px-4 rounded-2xl border border-border-primary bg-background/80 dark:bg-card-bg/80 backdrop-blur-xs shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] animate-pulse"
            />
            <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-text-muted">
              Engineering Mindset &bull; AI Systems &bull; Gujarat, India
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <span>Available for freelance &amp; full-time roles</span>
          </div>
        </div>

        {/* ── EDITORIAL HEADER SECTION ────────────────────────────────────────── */}
        <div className="pb-10 pt-2 border-b border-border-primary/80 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              BIOGRAPHY &amp; CAPABILITIES
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
              About{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Samir Shaikh
              </span>
            </h1>
            <p className="mt-3.5 text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
              AI Developer (Backend-First) from Gujarat, India &mdash; architecting autonomous agents, high-precision RAG systems, and distributed backends that{" "}
              <span className="relative inline-block px-3 py-0.5 rounded-xl bg-accent-lime text-[#0A0A0A] font-black -rotate-1 shadow-xs border border-black/10 transition-transform hover:rotate-0">
                scale reliably
              </span>
              .
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-xs sm:text-sm font-extrabold px-6 py-3 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
            >
              <LuMail className="w-4 h-4 stroke-[2.5]" />
              <span>Get in Touch</span>
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-bold px-6 py-3 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all whitespace-nowrap cursor-pointer"
            >
              <LuFileText className="w-4 h-4" />
              <span>View Resume</span>
            </Link>
          </div>
        </div>

        {/* ── GIT-LOG TRAJECTORY TIMELINE ─────────────────────────────────────── */}
        {hasAnySection ? (
          <section aria-label="Career Evolution Timeline" className="mb-20">
            {/* Timeline Section Subheader */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-border-primary/80">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                  EVOLUTION &amp; TRAJECTORY
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
                  The Engineering Journey
                </h2>
                <p className="text-text-muted text-sm sm:text-base mt-1.5 max-w-xl leading-relaxed">
                  past &rarr; present &rarr; future, documented milestone-by-milestone.
                </p>
              </div>

              <span className="font-mono text-xs text-text-muted px-2.5 py-1 rounded-full border border-border-primary bg-hover-bg/40 self-start sm:self-auto">
                git log --graph --oneline
              </span>
            </div>

            {/* Voice-search optimized crawlable intro (AEO) */}
            <p className="sr-only">
              Samir Shaikh is an AI developer (backend-first) based in Gujarat, India. He builds production Node.js/TypeScript applications, RAG pipelines, and LLM-powered features using an agent-assisted workflow with Cursor, GitHub Copilot, and Claude Code — owning critical logic, security, and testing by hand. Available for freelance projects, contract sprints, and remote engineering roles.
            </p>

            {/* Timeline Container */}
            <div className="relative border-l-2 border-border-primary ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
              {hasPast && (
                <TimelineEntry
                  variant="past"
                  badge="v1.0 — foundation"
                  secondaryBadge="2022 – 2026"
                  heading="Past"
                  content={description}
                  isLast={!hasPresent && !hasFuture}
                />
              )}

              {hasPresent && (
                <TimelineEntry
                  variant="present"
                  badge="HEAD → main"
                  secondaryBadge="now"
                  heading="Present"
                  content={present}
                  isLast={!hasFuture}
                />
              )}

              {hasFuture && (
                <TimelineEntry
                  variant="future"
                  badge="roadmap / next"
                  heading="Future"
                  content={future}
                  isLast
                />
              )}
            </div>
          </section>
        ) : (
          <div className="p-8 text-center rounded-2xl border border-border-primary bg-background dark:bg-card-bg text-text-muted text-sm">
            Nothing here yet.
          </div>
        )}

        {/* ── WORK EXPERIENCE ─────────────────────────────────────────────────── */}
        <ExperienceTimeline />

        {/* ── VERIFIED CREDENTIALS CALLOUT BENTO CARD ──────────────────────────── */}
        <div className="mt-20 relative overflow-hidden rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8 shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Subtle Ambient Lime Corner Glow */}
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 w-48 h-48 bg-[radial-gradient(circle,rgba(184,255,0,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_70%)] blur-2xl pointer-events-none -z-10"
          />

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl border border-border-primary bg-hover-bg flex items-center justify-center text-foreground dark:text-accent-lime flex-shrink-0 shadow-2xs">
              <LuAward className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                ACCREDITATIONS &bull; 8+ CERTIFICATES
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Verified Certificates &amp; Credentials
              </h3>
              <p className="text-sm text-text-secondary mt-1 max-w-md leading-relaxed">
                Accreditations in backend engineering, cloud platforms, and distributed systems.
              </p>
            </div>
          </div>

          <Link
            href="/certificates"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-6 py-3 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <span>View Certificates</span>
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── FREQUENTLY ASKED QUESTIONS ──────────────────────────────────────── */}
        <FAQ />

        {/* ── BOTTOM CLIENT CONVERSION BENTO CARD ──────────────────────────────── */}
        <div className="mt-20 relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center shadow-sm">
          {/* Subtle Ambient Electric Lime Center Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(184,255,0,0.14)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background/90 dark:bg-card-bg/90 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            LET&apos;S BUILD TOGETHER
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground max-w-2xl mx-auto mb-4 leading-tight">
            Have an AI or Backend Project in Mind?
          </h2>

          {/* Value Prop */}
          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Whether you need to architect autonomous agents, scale a custom RAG pipeline, or engineer resilient backend microservices &mdash; let&apos;s build systems that{" "}
            <span className="relative inline-block px-3 py-0.5 rounded-xl bg-accent-lime text-[#0A0A0A] font-black -rotate-1 shadow-xs border border-black/10 transition-transform hover:rotate-0">
              scale reliably
            </span>
            .
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-8 py-3.5 shadow-xs hover:shadow-[0_0_24px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <LuMail className="w-4 h-4 stroke-[2.5]" />
              <span>Start a Conversation</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-8 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all cursor-pointer"
            >
              <span>Explore Services</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Reassurance Features */}
          <div className="pt-6 border-t border-border-primary/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-foreground dark:text-accent-lime text-sm stroke-[2.5]" />
              Direct Engineer Access
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-foreground dark:text-accent-lime text-sm stroke-[2.5]" />
              Fixed-Milestone Proposals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-foreground dark:text-accent-lime text-sm stroke-[2.5]" />
              100% Repository &amp; IP Transfer
            </span>
          </div>
        </div>

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
