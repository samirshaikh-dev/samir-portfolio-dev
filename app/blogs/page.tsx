import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogs as blogsSchema } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BlogList from "@/components/blogs/BlogList";
import { APP_URL } from "@/lib/site-config";
import { getCollectionPageJsonLd } from "@/lib/seo/structured-data";
import { FiRss } from "react-icons/fi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Technical Writing & Engineering Logs | Samir Shaikh",
  description:
    "In-depth technical articles on agentic AI workflows, vector embeddings, Node.js backend engineering, microservices, PostgreSQL indexing, Redis caching, and production system design by Samir Shaikh.",
  keywords: [
    "Samir Shaikh blog",
    "backend engineering blog",
    "Node.js tutorials",
    "agentic AI articles",
    "RAG tutorials",
    "LLM integration guides",
    "microservices articles",
    "system design blog",
    "GraphQL tutorials",
    "PostgreSQL tips",
    "DevOps articles",
    "software engineering best practices",
  ],
  alternates: {
    canonical: `${APP_URL}/blogs`,
    types: {
      "application/rss+xml": `${APP_URL}/api/feed`,
    },
  },
  openGraph: {
    title: "Technical Writing & Engineering Logs | Samir Shaikh",
    description:
      "In-depth technical articles on agentic AI workflows, vector embeddings, Node.js backend engineering, microservices, and system design by Samir Shaikh.",
    url: `${APP_URL}/blogs`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Writing & Engineering Logs | Samir Shaikh",
    description:
      "In-depth technical articles on agentic AI workflows, vector embeddings, Node.js backend engineering, microservices, and system design by Samir Shaikh.",
  },
};

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
  published_at: string;
  stars: number;
}

async function getBlogs(): Promise<Blog[]> {
  try {
    const result = await db
      .select({
        id: blogsSchema.id,
        title: blogsSchema.title,
        slug: blogsSchema.slug,
        excerpt: blogsSchema.excerpt,
        cover_image_url: blogsSchema.coverImageUrl,
        tags: blogsSchema.tags,
        published_at: blogsSchema.publishedAt,
        stars: blogsSchema.stars,
      })
      .from(blogsSchema)
      .where(eq(blogsSchema.isPublished, true))
      .orderBy(desc(blogsSchema.publishedAt));
    return result as unknown as Blog[];
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  const collectionJsonLd = getCollectionPageJsonLd({
    name: "Technical Writing & Engineering Logs | Samir Shaikh",
    description:
      "Technical articles by Samir Shaikh on AI backend engineering, agentic systems, Node.js microservices, PostgreSQL indexing, Redis caching, and system design.",
    path: "/blogs",
    items: blogs.map((b) => ({ name: b.title, path: `/blogs/${b.slug}` })),
  });

  return (
    <main className="flex-1 px-5 sm:px-8 md:px-10 pb-20 pt-6 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumbs Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Technical Writing", href: "/blogs" },
            ]}
          />
          <Link
            href="/api/feed"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-text-muted hover:text-foreground border border-border-primary/80 hover:border-foreground/30 bg-hover-bg/30 transition-colors"
            title="Subscribe via RSS Feed"
          >
            <FiRss className="w-3.5 h-3.5 text-accent-lime" />
            <span>RSS Feed</span>
          </Link>
        </div>

        {/* ── EDITORIAL HEADER ──────────────────────────────────────────────── */}
        <header className="border-b border-border-primary/80 pb-10">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            <span>02 / TECHNICAL WRITING &amp; ARCHITECTURAL LOGS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
            Engineering Notes:{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Deep-Dives in AI &amp; Distributed Systems
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
            Honest, unpretentious breakdowns of production RAG pipelines, agentic workflows, database indexing, and backend architectures &mdash; written from real implementation experience.
          </p>

          {/* Focus Topic Strip */}
          <div className="mt-6 pt-5 border-t border-border-primary/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground dark:bg-accent-lime" />
              <span>AI Agents &amp; RAG</span>
            </span>
            <span className="text-border-primary hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-border-primary" />
              <span>Distributed Queues</span>
            </span>
            <span className="text-border-primary hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-border-primary" />
              <span>PostgreSQL &amp; pgvector</span>
            </span>
            <span className="text-border-primary hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-border-primary" />
              <span>Production Microservices</span>
            </span>
          </div>
        </header>

        {/* ── ARTICLES DIRECTORY & ARCHIVE ──────────────────────────────────── */}
        {blogs.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-2xl border border-border-primary/80 bg-hover-bg/30">
            <p className="text-base sm:text-lg font-bold text-foreground">
              No articles published yet
            </p>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Check back soon for upcoming architectural logs and system breakdowns.
            </p>
          </div>
        ) : (
          <BlogList initialBlogs={blogs} />
        )}
      </div>
    </main>
  );
}
