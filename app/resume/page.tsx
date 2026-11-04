import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { resume } from "@/lib/schema";
import ResumeViewer from "@/components/resume/ResumeViewer";
import RecruiterCheatSheet from "@/components/resume/RecruiterCheatSheet";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL, AUTHOR_EMAIL } from "@/lib/site-config";
import {
  LuAward,
  LuDownload,
  LuArrowRight,
  LuMail,
  LuCheck,
  LuCpu,
  LuDatabase,
  LuGraduationCap,
  LuBriefcase,
} from "react-icons/lu";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Resume & Qualifications | Samir Shaikh — AI Backend Engineer",
  description:
    "View and download Samir Shaikh's resume. AI Backend Engineer and Systems Architect experienced in autonomous AI agents, PostgreSQL pgvector RAG systems, Node.js, TypeScript, and microservices. Available for remote roles, contract sprints, and freelance projects.",
  keywords: [
    "Samir Shaikh resume",
    "Samir Shaikh CV",
    "download resume",
    "AI developer resume",
    "AI backend developer resume",
    "freelance AI developer",
    "backend developer resume",
    "Node.js developer CV",
    "AI engineer resume",
    "hire backend developer",
    "backend developer open to work",
    "remote backend developer",
    "Node.js TypeScript developer",
    "PostgreSQL developer",
    "RAG LLM engineer",
  ],
  alternates: {
    canonical: `${APP_URL}/resume`,
  },
  openGraph: {
    title: "Resume & Qualifications | Samir Shaikh — AI Backend Engineer",
    description:
      "View and download Samir Shaikh's resume. AI Backend Engineer experienced in autonomous AI agents, PostgreSQL pgvector RAG systems, Node.js, TypeScript, and microservices.",
    url: `${APP_URL}/resume`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume & Qualifications | Samir Shaikh — AI Backend Engineer",
    description:
      "Download Samir Shaikh's resume. AI Backend Engineer experienced in autonomous AI agents, PostgreSQL pgvector RAG systems, Node.js, and TypeScript.",
  },
};

async function getResumeUrl(): Promise<string> {
  try {
    const result = await db.select({ resume: resume.resume }).from(resume).limit(1);
    return result[0]?.resume ?? "";
  } catch {
    return "";
  }
}

export default async function ResumePage() {
  const url = await getResumeUrl();

  const downloadUrl = (() => {
    if (!url) return "";
    const m = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (m) return `https://drive.google.com/uc?export=download&id=${m[1]}`;
    const openM = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
    if (openM) return `https://drive.google.com/uc?export=download&id=${openM[1]}`;
    return url;
  })();

  return (
    <main className="flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-24 pt-6 sm:pt-10">
      <div className="max-w-5xl mx-auto w-full space-y-14">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Resume & Qualifications", href: "/resume" },
          ]}
        />

        {/* ── EDITORIAL HEADER SECTION ────────────────────────────────────────── */}
        <header className="border-b border-border-primary pb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted mb-3">
            <span className="uppercase tracking-wider">
              04 / VERIFIED CURRICULUM VITAE &amp; CREDENTIALS
            </span>
            <span className="font-semibold text-text-secondary">
              Available for Full-Time Roles &bull; Sprints &bull; Remote Worldwide
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
            Resume &amp; Technical Qualifications
          </h1>

          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-3xl leading-relaxed">
            Official curriculum vitae of Samir Shaikh &mdash; AI Backend Engineer &amp; Systems Architect. Specializing in autonomous agent workflows, PostgreSQL pgvector RAG pipelines, and distributed Node.js/TypeScript microservices.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Samir Shaikh resume PDF file"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                <LuDownload className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            )}
            <Link
              href="/contact?intent=full-time"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-medium text-foreground border border-border-primary hover:bg-hover-bg transition-colors"
            >
              <LuMail className="w-4 h-4" />
              <span>Schedule Intro Screen</span>
            </Link>
            <Link
              href="/certificates"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-medium text-foreground border border-border-primary hover:bg-hover-bg transition-colors"
            >
              <LuAward className="w-4 h-4 text-text-muted" />
              <span>View 8+ Certificates</span>
            </Link>
          </div>
        </header>

        {/* ── SNAPSHOT SPEC STRIP (REPLACING ISOLATED CHUNKY CARDS) ───────────── */}
        <section aria-label="Candidate quick telemetry">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-border-primary divide-y sm:divide-y-0 sm:divide-x divide-border-primary py-4 sm:py-6">
            <div className="p-4 sm:p-5 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <LuBriefcase className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
                <span>Core Specialization</span>
              </div>
              <div className="text-sm font-bold text-foreground">
                AI Backend Engineer
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Autonomous Agents &bull; Systems Architecture &bull; FDE
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <LuDatabase className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
                <span>Primary Stack</span>
              </div>
              <div className="text-sm font-bold text-foreground">
                Node.js &bull; TypeScript
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                PostgreSQL &bull; pgvector &bull; Redis &bull; Docker
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <LuCpu className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
                <span>Availability</span>
              </div>
              <div className="text-sm font-bold text-foreground">
                Immediate (0 Days Notice)
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Remote Worldwide &bull; Deel / W-8BEN Ready
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <LuGraduationCap className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
                <span>Education</span>
              </div>
              <div className="text-sm font-bold text-foreground">
                B.Tech in IT (8.44 CGPA)
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Uka Tarsadia University (2022–2026)
              </p>
            </div>
          </div>
        </section>

        {/* ── RECRUITER FAST-TRACK CHEAT SHEET ─────────────────────────────────── */}
        <section aria-label="Recruiter fast-track cheat sheet">
          <RecruiterCheatSheet />
        </section>

        {/* ── INTERACTIVE RESUME VIEWER (CANVAS + ACCESSIBLE TEXT) ─────────────── */}
        <section aria-label="Interactive resume viewer">
          <ResumeViewer url={url} />
        </section>

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
                  VERIFIED ACCREDITATIONS &bull; 8+ CREDENTIALS
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Verified Technical Certificates &amp; Credentials
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-md leading-relaxed">
                  Explore verified professional certifications in backend engineering, cloud systems, and database performance.
                </p>
              </div>
            </div>

            <Link
              href="/certificates"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-mono font-bold px-5 py-2.5 hover:bg-hover-bg transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>View All 8+ Certificates</span>
              <LuArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ── BOTTOM CONVERSION SECTION ────────────────────────────────────────── */}
        <section className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span>START A CONVERSATION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground max-w-2xl mx-auto mb-3">
            Interested in Hiring or Sponsoring an Engineering Sprint?
          </h2>

          <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Whether you need a dedicated AI Backend Engineer for full-time roles, or a Forward Deployed Engineer for targeted production sprints &mdash; let&apos;s build systems that scale reliably.
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
            <a
              href={`mailto:${AUTHOR_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-text-secondary text-xs sm:text-sm font-mono px-5 py-3.5 hover:text-foreground hover:bg-hover-bg transition-colors"
            >
              <span>Email Directly</span>
            </a>
          </div>

          <div className="pt-6 border-t border-border-primary flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-accent-lime text-sm" aria-hidden="true" />
              Immediate Availability (0 Days Notice)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-accent-lime text-sm" aria-hidden="true" />
              100% Repository &amp; IP Transfer
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-accent-lime text-sm" aria-hidden="true" />
              Deel / Remote.com &bull; W-8BEN Compliant
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
