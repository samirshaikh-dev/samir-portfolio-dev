import type { Metadata } from "next";
import { db } from "@/lib/db";
import { resume } from "@/lib/schema";
import ResumeViewer from "@/components/resume/ResumeViewer";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Resume | Samir Shaikh — AI-Enabled Full Stack Developer",
  description:
    "View and download Samir Shaikh's resume. AI-enabled full stack developer (backend-first) with production experience in Node.js, TypeScript, Next.js, PostgreSQL, RAG systems, and LLM integration. Open to remote roles.",
  keywords: [
    "Samir Shaikh resume",
    "Samir Shaikh CV",
    "download resume",
    "AI-Enabled Full Stack Developer resume",
    "full stack developer resume",
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
    title: "Resume | Samir Shaikh — AI-Enabled Full Stack Developer",
    description:
      "View and download Samir Shaikh's resume. AI-enabled full stack developer (backend-first) experienced in Node.js, TypeScript, Next.js, PostgreSQL, RAG systems, and LLM integration.",
    url: `${APP_URL}/resume`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Samir Shaikh — AI-Enabled Full Stack Developer",
    description:
      "Download Samir Shaikh's resume. AI-enabled full stack developer (backend-first) with Node.js, TypeScript, PostgreSQL, RAG, and LLM integration experience.",
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
      </PageHeader>
      <div className="max-w-4xl mx-auto w-full">
        <ResumeViewer url={url} />
      </div>
    </main>
  );
}
