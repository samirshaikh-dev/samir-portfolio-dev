import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { about } from "@/lib/schema";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import HtmlParser from "@/components/HtmlParser";
import FAQ from "@/components/about/FAQ";
import { APP_URL } from "@/lib/site-config";
import { getSpeakableJsonLd } from "@/lib/seo/structured-data";

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
    <div className={`relative pl-10 ${!isLast ? "pb-12" : ""}`}>
      {/* Node */}
      <span
        className={`absolute left-0 top-[3px] flex h-[19px] w-[19px] items-center justify-center rounded-full border ${
          isPresent
            ? "border-green-500 shadow-[0_0_0_3px_rgba(74,222,128,0.15)] dark:shadow-[0_0_0_3px_rgba(74,222,128,0.18)]"
            : "border-border-primary"
        } bg-background`}
      >
        <span
          className={`inline-block h-[7px] w-[7px] rounded-full ${
            isPresent ? "bg-green-500" : "bg-text-muted"
          }`}
        />
      </span>

      {/* Ref row */}
      <div className="mb-1.5 flex flex-wrap items-baseline gap-2">
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded border ${
            isPresent
              ? "text-green-600 dark:text-green-400 border-green-500/40 bg-green-500/10 font-semibold"
              : isFuture
              ? "text-text-muted border-dashed border-border-primary"
              : "text-text-muted border-border-primary"
          }`}
        >
          {badge}
        </span>
        {secondaryBadge && (
          <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-border-primary text-text-muted">
            {secondaryBadge}
          </span>
        )}
      </div>

      {/* Heading */}
      <h2 className="font-serif font-semibold italic text-xl mb-2.5 text-foreground">
        {heading}
      </h2>

      {/* Content */}
      <div className="prose prose-sm prose-gray dark:prose-invert max-w-none text-text-muted prose-headings:text-foreground prose-strong:text-foreground prose-a:text-foreground hover:prose-a:text-text-secondary prose-p:my-0">
        <HtmlParser html={content} />
      </div>
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
    <main className="flex flex-col flex-1 px-6 pb-20 md:px-10">
      <div className="max-w-3xl mx-auto w-full pt-6 md:pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ]}
        />
      </div>
      <PageHeader title="About" subtitle="AI Developer (Backend-First) from Gujarat, India — available for freelance projects & contracts." />
      <div className="max-w-3xl mx-auto w-full">
        {hasAnySection ? (
          <>
            {/* Subtitle */}
            <p className="text-text-muted text-sm mb-8 font-mono">
              past → present → future, before the full work history below.
            </p>

            {/* Voice-search optimized intro (hidden but crawlable for AEO) */}
            <p className="sr-only">
              Samir Shaikh is an AI developer (backend-first) based in Gujarat, India. He builds production Node.js/TypeScript applications, RAG pipelines, and LLM-powered features using an agent-assisted workflow with Cursor, GitHub Copilot, and Claude Code — owning critical logic, security, and testing by hand. Available for freelance projects, contract sprints, and remote engineering roles.
            </p>

            {/* Git-log timeline */}
            <div className="relative">
              {/* Vertical line */}
              <span
                className="absolute left-[9px] top-3 bottom-3 w-px bg-border-primary"
                aria-hidden="true"
              />

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
          </>
        ) : (
          <p className="text-text-muted text-sm text-center">Nothing here yet.</p>
        )}

        <ExperienceTimeline />

        {/* Verified Credentials Callout */}
        <div className="mt-14 p-6 rounded-2xl border border-border-primary bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">Verified Certificates & Credentials</h3>
            <p className="text-sm text-text-muted mt-1">
              Accreditations in backend engineering, cloud platforms, and distributed systems.
            </p>
          </div>
          <Link
            href="/certificates"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm font-medium text-foreground hover:bg-hover-bg transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            View Certificates →
          </Link>
        </div>

        <FAQ />

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
