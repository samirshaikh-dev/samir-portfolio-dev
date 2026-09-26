import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { resume } from "@/lib/schema";
import ResumeViewer from "@/components/resume/ResumeViewer";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Resume | Samir Shaikh — AI Developer (Backend-First)",
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
    title: "Resume | Samir Shaikh — AI Developer (Backend-First)",
    description:
      "View and download Samir Shaikh's resume. AI developer (backend-first) experienced in AI agents, RAG systems, Node.js, TypeScript, Next.js, and PostgreSQL.",
    url: `${APP_URL}/resume`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Samir Shaikh — AI Developer (Backend-First)",
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

  return (
    <main className="flex flex-col flex-1 px-6 pb-20 md:px-10">
      <div className="max-w-4xl mx-auto w-full pt-6 md:pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Resume", href: "/resume" },
          ]}
        />
      </div>
      <PageHeader title="Resume">
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/certificates"
            className="inline-flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm font-medium text-foreground hover:bg-hover-bg transition-colors flex-shrink-0"
          >
            <svg
              className="w-4 h-4 text-text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            Certificates
          </Link>
          {url && (
            <a
              href={(() => {
                const m = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
                return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : url;
              })()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm font-medium text-foreground hover:bg-hover-bg transition-colors flex-shrink-0"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v8M5 7l3 3 3-3M2 12h12" />
              </svg>
              Download
            </a>
          )}
        </div>
      </PageHeader>
      <div className="max-w-4xl mx-auto w-full">
        <ResumeViewer url={url} />

        {/* Verified Credentials Callout */}
        <div className="mt-8 p-6 rounded-2xl border border-border-primary bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">Verified Credentials & Accreditations</h3>
            <p className="text-sm text-text-muted mt-1">
              Explore verified professional certificates, degrees, and technical credentials earned across backend systems and cloud platforms.
            </p>
          </div>
          <Link
            href="/certificates"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm font-medium text-foreground hover:bg-hover-bg transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            View All Certificates →
          </Link>
        </div>
      </div>
    </main>
  );
}
