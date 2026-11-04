"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  LuDownload,
  LuExternalLink,
  LuFileText,
  LuSparkles,
  LuBriefcase,
  LuGraduationCap,
  LuCheck,
  LuArrowRight,
} from "react-icons/lu";

const DynamicPDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border-primary bg-background dark:bg-card-bg py-28">
      <span
        className="w-6 h-6 rounded-full border-2 border-border-primary border-t-foreground animate-spin mb-3"
        aria-hidden="true"
      />
      <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-text-muted">
        Loading Document Canvas...
      </span>
    </div>
  ),
});

/**
 * Converts any Google Drive share/view/open URL to the direct download format.
 */
function toDownloadUrl(url: string): string {
  try {
    const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) {
      return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`;
    }
    const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
    if (openMatch) {
      return `https://drive.google.com/uc?export=download&id=${openMatch[1]}`;
    }
  } catch {
    // fall through
  }
  return url;
}

export default function ResumeViewer({ url }: { url: string }) {
  const [viewMode, setViewMode] = useState<"canvas" | "text">("canvas");

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-12 text-center my-8">
        <div className="w-12 h-12 rounded-xl border border-border-primary bg-hover-bg flex items-center justify-center text-text-muted mb-4">
          <LuFileText className="w-6 h-6 text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">Resume Document Coming Soon</h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed mb-6">
          The verified PDF document is currently undergoing update. In the meantime, explore Samir&apos;s
          production projects or view his work history.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs sm:text-sm font-bold px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          <span>Explore Work History</span>
          <LuArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const downloadUrl = toDownloadUrl(url);

  return (
    <div className="flex flex-col gap-6">
      {/* ── VIEWER TOOLBAR ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 sm:px-5 rounded-2xl border border-border-primary bg-background dark:bg-card-bg">
        {/* Left Status & Telemetry */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-lime" aria-hidden="true" />
          <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-text-muted">
            Official Curriculum Vitae &bull; PDF 1.7
          </span>
        </div>

        {/* Right Controls: Mode Toggle & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div
            role="tablist"
            aria-label="Resume display mode"
            className="inline-flex items-center p-1 rounded-xl border border-border-primary bg-hover-bg/40"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "canvas"}
              onClick={() => setViewMode("canvas")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors font-medium cursor-pointer ${
                viewMode === "canvas"
                  ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] font-bold"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              PDF Document
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "text"}
              onClick={() => setViewMode("text")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors font-medium cursor-pointer ${
                viewMode === "text"
                  ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] font-bold"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              Text Summary
            </button>
          </div>

          {/* Download Action */}
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Samir Shaikh resume PDF file"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            <LuDownload className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>

          {/* Direct Drive Link */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume document directly in Google Drive"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-text-secondary text-xs font-mono hover:text-foreground hover:bg-hover-bg transition-colors cursor-pointer"
          >
            <span>Drive</span>
            <LuExternalLink className="w-3 h-3 text-text-muted" />
          </a>
        </div>
      </div>

      {/* ── VIEWER CONTAINER ─────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-4 sm:p-6 md:p-8 overflow-hidden">
        {viewMode === "canvas" ? (
          /* Canvas Render Mode */
          <div className="w-full">
            <DynamicPDFViewer downloadUrl={downloadUrl} />
          </div>
        ) : (
          /* Text-Accessible Alternative Mode (WCAG 2.2 AA / Screen Reader Friendly) */
          <div className="w-full max-w-3xl mx-auto py-2 space-y-8">
            {/* Header Identity */}
            <div className="pb-6 border-b border-border-primary">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-border-primary bg-hover-bg/50 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                ACCESSIBLE RESUME SUMMARY
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">Samir Shaikh</h2>
              <p className="text-xs sm:text-sm font-semibold text-text-secondary mt-1">
                AI Backend Engineer &bull; Systems Architect &bull; Gujarat, India
              </p>
              <p className="text-xs text-text-muted mt-2 font-mono">
                shaikh.samir.work@gmail.com &bull; linkedin.com/in/samirshaikh-dev &bull; github.com/samirshaikh-dev
              </p>
            </div>

            {/* Professional Summary */}
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                <LuSparkles className="w-4 h-4 text-accent-lime" />
                Professional Summary
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                AI Backend Engineer specializing in autonomous agent workflows, production RAG pipelines with PostgreSQL (pgvector) and Gemini 3072d embeddings, event-driven microservices (Kafka, BullMQ, Redis), and high-throughput Node.js/TypeScript architectures. Operates an agent-assisted workflow with Cursor and Claude Code governed by strict test coverage and manual security review.
              </p>
            </div>

            {/* Core Competencies */}
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                <LuCheck className="w-4 h-4 text-accent-lime" />
                Technical Competencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-secondary">
                <div className="space-y-1">
                  <div className="font-bold text-foreground font-mono text-[11px] uppercase">
                    Languages &amp; Runtimes:
                  </div>
                  <div>TypeScript, JavaScript (ESNext), Node.js, Python, SQL</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-foreground font-mono text-[11px] uppercase">
                    Frameworks &amp; Backend:
                  </div>
                  <div>Next.js (App Router), Express.js, NestJS, React 19, REST, GraphQL</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-foreground font-mono text-[11px] uppercase">
                    Databases &amp; Queues:
                  </div>
                  <div>PostgreSQL (pgvector), Neon, Redis, MongoDB, Apache Kafka, BullMQ</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-foreground font-mono text-[11px] uppercase">
                    AI &amp; Cloud:
                  </div>
                  <div>Vercel AI SDK, Gemini 2.0, Groq, Docker, GitHub Actions, AWS</div>
                </div>
              </div>
            </div>

            {/* Experience Summary */}
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                <LuBriefcase className="w-4 h-4 text-accent-lime" />
                Work Experience
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-sm">
                      Full Stack Engineer Intern &bull; Xira Infotech
                    </span>
                    <span className="font-mono text-xs text-text-muted">Jan 2026 – Present</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Engineered dynamic web applications, role-based access control, and automated API workflows using Next.js, Node.js, and PostgreSQL.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-sm">
                      Back End Developer Intern &bull; LOGICWIND
                    </span>
                    <span className="font-mono text-xs text-text-muted">May 2025 – Jun 2025</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Developed scalable backend microservices, optimized SQL queries, and integrated third-party messaging APIs.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="pt-2 border-t border-border-primary">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                <LuGraduationCap className="w-4 h-4 text-accent-lime" />
                Education
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-foreground text-sm">
                    B.Tech in Information Technology &bull; 8.44 CGPA
                  </div>
                  <div className="text-xs text-text-secondary">Uka Tarsadia University</div>
                </div>
                <div className="font-mono text-xs text-text-muted">2022 – 2026</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
