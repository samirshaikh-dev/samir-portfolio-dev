import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { resume } from "@/lib/schema";
import ResumeViewer from "@/components/resume/ResumeViewer";
import RecruiterCheatSheet from "@/components/resume/RecruiterCheatSheet";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL } from "@/lib/site-config";
import {
  LuAward,
  LuDownload,
  LuArrowRight,
  LuMail,
  LuCheck,
  LuCpu,
  LuDatabase,
  LuGraduationCap,
} from "react-icons/lu";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Resume & Qualifications | Samir Shaikh — AI Developer (Backend-First)",
  description:
    "View and download Samir Shaikh's resume. AI developer (backend-first) experienced in AI agents, RAG systems, Node.js, TypeScript, Next.js, and PostgreSQL. Available for freelance projects, contract sprints, and remote roles.",
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
    title: "Resume & Qualifications | Samir Shaikh — AI Developer (Backend-First)",
    description:
      "View and download Samir Shaikh's resume. AI developer (backend-first) experienced in AI agents, RAG systems, Node.js, TypeScript, Next.js, and PostgreSQL.",
    url: `${APP_URL}/resume`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume & Qualifications | Samir Shaikh — AI Developer (Backend-First)",
    description:
      "Download Samir Shaikh's resume. AI developer (backend-first) experienced in AI agents, RAG systems, Node.js, TypeScript, and PostgreSQL.",
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

      <div className="max-w-5xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resume", href: "/resume" },
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
              Verified Curriculum Vitae &bull; Updated 2026
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <span>Available for freelance &amp; full-time roles</span>
          </div>
        </div>

        {/* ── EDITORIAL HEADER SECTION ────────────────────────────────────────── */}
        <div className="pb-10 pt-2 border-b border-border-primary/80 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              CURRICULUM VITAE &amp; CREDENTIALS
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
              Resume &amp;{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Qualifications
              </span>
            </h1>
            <p className="mt-3.5 text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
              Official curriculum vitae of Samir Shaikh &mdash; AI Developer (Backend-First). Architecting autonomous agents, scalable RAG pipelines, and distributed backends that{" "}
              <span className="relative inline-block px-3 py-0.5 rounded-xl bg-accent-lime text-[#0A0A0A] font-black -rotate-1 shadow-xs border border-black/10 transition-transform hover:rotate-0">
                scale reliably
              </span>
              .
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 flex-shrink-0">
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Samir Shaikh resume PDF file"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-xs sm:text-sm font-extrabold px-6 py-3 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
              >
                <LuDownload className="w-4 h-4 stroke-[2.5]" />
                <span>Download PDF</span>
              </a>
            )}
            <Link
              href="/certificates"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-bold px-6 py-3 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all whitespace-nowrap cursor-pointer"
            >
              <LuAward className="w-4 h-4 text-text-muted" />
              <span>Certificates</span>
            </Link>
          </div>
        </div>

        {/* ── HIGHLIGHTS TELEMETRY BENTO BAR ──────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-4 sm:p-5 shadow-2xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1.5">
              <LuCpu className="w-3.5 h-3.5 text-accent-lime" />
              Core Role
            </div>
            <div className="text-sm sm:text-base font-bold text-foreground">
              AI Developer
            </div>
            <div className="text-[11px] text-text-muted mt-0.5">Backend-First Focus</div>
          </div>

          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-4 sm:p-5 shadow-2xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1.5">
              <LuDatabase className="w-3.5 h-3.5 text-accent-lime" />
              Primary Stack
            </div>
            <div className="text-sm sm:text-base font-bold text-foreground">
              Node &bull; TypeScript
            </div>
            <div className="text-[11px] text-text-muted mt-0.5">PostgreSQL &bull; pgvector</div>
          </div>

          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-4 sm:p-5 shadow-2xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1.5">
              <LuAward className="w-3.5 h-3.5 text-accent-lime" />
              Specialization
            </div>
            <div className="text-sm sm:text-base font-bold text-foreground">
              RAG &amp; Agents
            </div>
            <div className="text-[11px] text-text-muted mt-0.5">Gemini 3072d Vectors</div>
          </div>

          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-4 sm:p-5 shadow-2xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1.5">
              <LuGraduationCap className="w-3.5 h-3.5 text-accent-lime" />
              Education
            </div>
            <div className="text-sm sm:text-base font-bold text-foreground">
              B.Tech in IT
            </div>
            <div className="text-[11px] text-text-muted mt-0.5">2022 – 2026 &bull; 8.44 CGPA</div>
          </div>
        </div>

        {/* ── RECRUITER FAST-TRACK CHEAT SHEET ─────────────────────────────────── */}
        <div className="mb-10">
          <RecruiterCheatSheet />
        </div>

        {/* ── INTERACTIVE RESUME VIEWER ────────────────────────────────────────── */}
        <ResumeViewer url={url} />

        {/* ── VERIFIED CREDENTIALS CALLOUT BENTO CARD ──────────────────────────── */}
        <div className="mt-14 relative overflow-hidden rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8 shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
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
                VERIFIED CREDENTIALS &bull; ACCREDITATIONS
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Verified Credentials &amp; Certifications
              </h3>
              <p className="text-sm text-text-secondary mt-1 max-w-md leading-relaxed">
                Explore verified professional certificates, degrees, and technical credentials earned across backend systems, cloud platforms, and databases.
              </p>
            </div>
          </div>

          <Link
            href="/certificates"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-6 py-3 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <span>View All Certificates</span>
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── CLIENT CONVERSION BENTO CARD ────────────────────────────────────── */}
        <div className="mt-16 relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center shadow-sm">
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
            Interested in Collaborating with Samir?
          </h2>

          {/* Value Prop */}
          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Whether you need an AI Backend Engineer for full-time roles, or a Forward Deployed Engineer for targeted production sprints &mdash; let&apos;s build systems that{" "}
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
      </div>
    </main>
  );
}
