"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  LuDownload,
  LuExternalLink,
  LuFileText,
  LuLayers,
  LuSparkles,
  LuBriefcase,
  LuGraduationCap,
  LuCheck,
  LuArrowRight,
} from "react-icons/lu";

const DynamicPDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border-primary bg-background/50 dark:bg-card-bg/50 py-32">
      <span
        className="w-6 h-6 rounded-full border-2 border-border-primary border-t-foreground animate-spin mb-3"
        aria-hidden="true"
      />
      <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-text-muted">
        Loading Document Viewer...
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
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-12 text-center my-8 shadow-sm">
        <div className="w-12 h-12 rounded-xl border border-border-primary bg-hover-bg flex items-center justify-center text-text-muted mb-4">
          <LuFileText className="w-6 h-6 text-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Resume Document Coming Soon</h3>
        <p className="text-sm text-text-secondary max-w-md leading-relaxed mb-6">
          The verified PDF document is currently undergoing revision. You can explore Samir&apos;s
          production projects or view full work history in the meantime.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-xs sm:text-sm font-extrabold px-6 py-3 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] transition-all"
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
      {/* ── TOP VIEWER TOOLBAR ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 sm:px-5 rounded-2xl border border-border-primary bg-background/90 dark:bg-card-bg/90 backdrop-blur-xs shadow-2xs">
        {/* Left Status & Telemetry */}
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] animate-pulse"
          />
          <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-text-muted">
            Official Curriculum Vitae &bull; PDF 1.7
          </span>
        </div>

        {/* Right Controls: Mode Toggle & Direct Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div
            role="tablist"
            aria-label="Resume display mode"
            className="inline-flex items-center p-1 rounded-full border border-border-primary bg-hover-bg/50"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "canvas"}
              onClick={() => setViewMode("canvas")}
              className={`px-3 py-1 rounded-full text-xs transition-all font-semibold cursor-pointer ${
                viewMode === "canvas"
                  ? "bg-foreground text-background shadow-2xs dark:bg-accent-lime dark:text-[#0A0A0A]"
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
              className={`px-3 py-1 rounded-full text-xs transition-all font-semibold cursor-pointer ${
                viewMode === "text"
                  ? "bg-foreground text-background shadow-2xs dark:bg-accent-lime dark:text-[#0A0A0A]"
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs font-bold hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all cursor-pointer"
          >
            <LuDownload className="w-3.5 h-3.5 text-accent-lime stroke-[2.5]" />
            <span>Download PDF</span>
          </a>

          {/* Direct Drive Link */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume document directly in Google Drive"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-primary bg-background dark:bg-card-bg text-text-secondary text-xs font-medium hover:text-foreground hover:bg-hover-bg shadow-2xs transition-all cursor-pointer"
          >
            <span>Drive</span>
            <LuExternalLink className="w-3 h-3 text-text-muted" />
          </a>
        </div>
      </div>

      {/* ── VIEWER CONTAINER ─────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-4 sm:p-7 md:p-8 shadow-sm overflow-hidden">
        {/* Subtle Ambient Radial Center Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(184,255,0,0.12)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.06)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
        />

        {viewMode === "canvas" ? (
          /* Canvas Render Mode */
          <div className="w-full">
            <DynamicPDFViewer downloadUrl={downloadUrl} />
          </div>
        ) : (
          /* Text-Accessible Alternative Mode (WCAG 2.2 AA / Screen Reader Friendly) */
          <div className="w-full max-w-3xl mx-auto py-4 space-y-10">
            {/* Header Identity */}
            <div className="pb-6 border-b border-border-primary/80">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg/60 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                ACCESSIBLE RESUME SUMMARY
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">Samir Shaikh</h2>
              <p className="text-sm font-semibold text-text-secondary mt-1">
                AI Developer (Backend-First) &bull; Forward Deployed Engineer &bull; Gujarat, India
              </p>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                shaikh.samir.work@gmail.com &bull; linkedin.com/in/samirshaikh-dev &bull; github.com/samirshaikh-dev
              </p>
            </div>

            {/* Professional Summary */}
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                <LuSparkles className="w-4 h-4 text-accent-lime" />
                Professional Summary
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                AI Developer with a strong backend-first foundation specializing in autonomous agents,
                production RAG pipelines with PostgreSQL (pgvector) and Gemini 3072-dimensional embeddings,
                event-driven microservices (Kafka, BullMQ, Redis), and high-throughput Node.js/TypeScript
                systems. Operates with an agentic workflow using Cursor and Claude Code under strict CI and
                manual security review.
              </p>
            </div>

            {/* Core Technical Stack */}
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                <LuLayers className="w-4 h-4 text-accent-lime" />
                Core Technical Competencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-border-primary bg-hover-bg/30">
                  <span className="font-bold text-foreground block mb-1">AI &amp; RAG Systems</span>
                  <span className="text-text-secondary">
                    Gemini Embeddings (3072d), pgvector, Vercel AI SDK, Groq, Prompt Engineering, Agentic Tool Execution.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-border-primary bg-hover-bg/30">
                  <span className="font-bold text-foreground block mb-1">Backend &amp; Distributed</span>
                  <span className="text-text-secondary">
                    Node.js, TypeScript, Express, NestJS, Apache Kafka, BullMQ, Redis, WebSockets, OpenTelemetry.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-border-primary bg-hover-bg/30">
                  <span className="font-bold text-foreground block mb-1">Databases &amp; ORMs</span>
                  <span className="text-text-secondary">
                    PostgreSQL, Neon Serverless, Drizzle ORM, Prisma, MongoDB, Vector Indexing.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-border-primary bg-hover-bg/30">
                  <span className="font-bold text-foreground block mb-1">Frontend &amp; DevOps</span>
                  <span className="text-text-secondary">
                    Next.js (App Router), React 19, Tailwind CSS v4, Docker, Docker Compose, GitHub Actions CI/CD.
                  </span>
                </div>
              </div>
            </div>

            {/* Work History */}
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                <LuBriefcase className="w-4 h-4 text-accent-lime" />
                Work Experience
              </h3>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="font-bold text-foreground text-sm">Full Stack Engineer &bull; Xira Infotech</span>
                    <span className="font-mono text-xs text-text-muted">Jan 2026 – Present</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Architected enterprise job portal with Next.js, PostgreSQL, and strict RBAC. Built production RAG
                    assistants with pgvector indexing, reducing support search latency by 45%.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="font-bold text-foreground text-sm">Backend Developer Intern &bull; LOGICWIND</span>
                    <span className="font-mono text-xs text-text-muted">Jun 2025 – Dec 2025</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Designed high-throughput GraphQL microservices and transactional database schemas. Containerized
                    services with Docker and built automated CI test pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                <LuGraduationCap className="w-4 h-4 text-accent-lime" />
                Education &amp; Credentials
              </h3>
              <div className="p-4 rounded-xl border border-border-primary bg-hover-bg/30">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-foreground text-sm">
                    B.Tech in Information Technology
                  </span>
                  <span className="font-mono text-xs text-text-muted">2022 – 2026</span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Uka Tarsadia University &bull; CGPA: 8.44/10
                </p>
              </div>
            </div>

            {/* Verification Link */}
            <div className="pt-4 border-t border-border-primary/80 flex items-center justify-between">
              <span className="text-xs text-text-muted flex items-center gap-1.5">
                <LuCheck className="text-accent-lime w-4 h-4 stroke-[2.5]" />
                Full verified accreditations viewable online
              </span>
              <Link
                href="/certificates"
                className="text-xs font-bold text-foreground hover:text-accent-lime transition-colors underline-offset-4 hover:underline"
              >
                View 8+ Verified Certificates &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
