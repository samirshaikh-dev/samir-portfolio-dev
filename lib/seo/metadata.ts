import type { Metadata, Viewport } from "next";
import {
  APP_URL,
  AUTHOR_NAME,
  TWITTER_HANDLE,
} from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Samir Shaikh — AI-Enabled Full Stack Developer",
    template: "%s | Samir Shaikh",
  },
  description:
    "Samir Shaikh is an AI-enabled full stack developer (backend-first) building production Node.js/TypeScript applications with RAG pipelines, LLM integration, and an agent-assisted workflow.",
  keywords: [
    "Samir Shaikh",
    "AI-Enabled Full Stack Developer",
    "Full Stack Developer",
    "Backend-First",
    "Backend Developer",
    "Full Stack Developer India",
    "Node.js Developer",
    "Node.js",
    "TypeScript",
    "Next.js",
    "React",
    "PostgreSQL",
    "RAG",
    "LLM Integration",
    "AI Agents",
    "Agentic AI",
    "pgvector",
    "Semantic Search",
    "Microservices",
    "Express.js",
    "NestJS",
    "Redis",
    "Docker",
    "CI/CD",
    "AI Engineer",
    "Full Stack Engineer",
  ],
  authors: [{ name: AUTHOR_NAME, url: APP_URL }],
  creator: AUTHOR_NAME,
  openGraph: {
    title: "Samir Shaikh — AI-Enabled Full Stack Developer",
    description:
      "Samir Shaikh is an AI-enabled full stack developer (backend-first) building production Node.js/TypeScript applications with RAG pipelines, LLM integration, and an agent-assisted workflow.",
    url: APP_URL,
    siteName: "Samir Shaikh Portfolio",
    images: [
      {
        url: "/Filled_Logo.png",
        width: 1200,
        height: 630,
        alt: "Samir Shaikh — AI-Enabled Full Stack Developer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Shaikh — AI-Enabled Full Stack Developer",
    description:
      "Samir Shaikh is an AI-enabled full stack developer (backend-first) building production Node.js/TypeScript applications with RAG pipelines, LLM integration, and an agent-assisted workflow.",
    images: ["/Filled_Logo.png"],
    creator: TWITTER_HANDLE,
  },
  verification: {
    google: "H6Pq0eI_0M2sSwSWyHpuCbS7ufcyBMaw_r2k7VCv9Ok",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};
