import type { Metadata, Viewport } from "next";
import {
  APP_URL,
  AUTHOR_NAME,
  TWITTER_HANDLE,
} from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Samir Shaikh — Freelance AI Developer (Backend-First)",
    template: "%s | Samir Shaikh",
  },
  description:
    "Helping startups, founders, and engineering teams build reliable AI agents, custom RAG systems, and robust backend architectures. Freelance AI developer (backend-first) available for projects, contract sprints, and remote roles.",
  keywords: [
    "Samir Shaikh",
    "freelance AI developer",
    "hire freelance AI developer",
    "freelance AI engineer",
    "freelance backend developer",
    "freelance full stack developer",
    "hire website developer for business",
    "custom website development services",
    "AI chatbot for website",
    "AI chatbot for SaaS",
    "custom knowledge base AI",
    "RAG chatbot development",
    "production-grade AI chatbot",
    "production-grade RAG pipeline",
    "AI workflow automation for startups",
    "AI agent development services",
    "Forward Deployed Engineer",
    "hire Forward Deployed AI Engineer",
    "Node.js developer for hire remote",
    "TypeScript backend developer for hire",
    "Next.js full stack developer for hire",
    "AI-Enabled Full Stack Developer",
    "Backend Developer",
    "Node.js",
    "TypeScript",
    "Next.js",
    "React",
    "PostgreSQL",
    "RAG",
    "LLM Integration",
    "AI Agents",
    "pgvector",
    "Semantic Search",
    "Microservices",
    "SEO optimization services",
    "freelance SEO specialist",
    "website speed optimization services",
    "Core Web Vitals optimization",
    "Contract Software Engineer",
    "production-grade AI systems",
    "Node.js AI developer",
    "TypeScript backend developer for hire",
    "AI chatbot development",
    "custom knowledge base",
    "AI workflow automation",
    "Forward Deployed Engineer",
  ],
  authors: [{ name: AUTHOR_NAME, url: APP_URL }],
  creator: AUTHOR_NAME,
  openGraph: {
    title: "Samir Shaikh — Freelance AI Developer & Full Stack Engineer",
    description:
      "Helping startups, founders, and product teams build reliable AI agents, RAG knowledge bases, and scalable full-stack web applications. Available for freelance sprints, contracts, and remote roles.",
    url: APP_URL,
    siteName: "Samir Shaikh Portfolio",
    images: [
      {
        url: "/Filled_Logo.png",
        width: 1200,
        height: 630,
        alt: "Samir Shaikh — Freelance AI Developer & Full Stack Engineer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Shaikh — Freelance AI Developer & Full Stack Engineer",
    description:
      "Helping startups, founders, and product teams build reliable AI agents, RAG knowledge bases, and scalable full-stack web applications. Available for freelance sprints, contracts, and remote roles.",
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
