import type { Metadata } from "next";
import { db } from "@/lib/db";
import { blogs as blogsSchema } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BlogList from "@/components/blogs/BlogList";
import { APP_URL } from "@/lib/site-config";
import { getCollectionPageJsonLd } from "@/lib/seo/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Samir Shaikh",
  description: "Technical articles by Samir Shaikh on AI SDE topics, agentic AI, Node.js backend engineering, microservices, GraphQL, PostgreSQL, Redis, system design, DevOps, and software development best practices.",
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
  },
  openGraph: {
    title: "Blog | Samir Shaikh",
    description: "Technical articles on agentic AI, AI SDE topics, Node.js backend engineering, microservices, GraphQL, PostgreSQL, Redis, system design, and DevOps by Samir Shaikh.",
    url: `${APP_URL}/blogs`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Samir Shaikh",
    description: "Technical articles on agentic AI, AI SDE, Node.js, microservices, GraphQL, PostgreSQL, Redis, and system design by Samir Shaikh.",
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
    const result = await db.select({
      id: blogsSchema.id,
      title: blogsSchema.title,
      slug: blogsSchema.slug,
      excerpt: blogsSchema.excerpt,
      cover_image_url: blogsSchema.coverImageUrl,
      tags: blogsSchema.tags,
      published_at: blogsSchema.publishedAt,
      stars: blogsSchema.stars,
    }).from(blogsSchema).where(eq(blogsSchema.isPublished, true)).orderBy(desc(blogsSchema.publishedAt));
    return result as unknown as Blog[];
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  const collectionJsonLd = getCollectionPageJsonLd({
    name: "Blog | Samir Shaikh",
    description:
      "Technical articles by Samir Shaikh on AI SDE topics, agentic AI, Node.js backend engineering, microservices, GraphQL, PostgreSQL, Redis, system design, and DevOps.",
    path: "/blogs",
    items: blogs.map((b) => ({ name: b.title, path: `/blogs/${b.slug}` })),
  });

  return (
    <main className="relative flex-1 px-5 sm:px-8 md:px-10 pb-20 overflow-hidden">
      {/* 5.1 Ambient Radiant Glow (Top-Right) */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
      />

      {/* 5.2 Geometric Dot Matrix Texture (Canvas Overlay) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.07] pointer-events-none -z-10"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blogs" },
            ]}
          />
        </div>

        {/* Editorial Section Hero Header */}
        <header className="mb-10 sm:mb-12 pb-8 border-b border-border-primary/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            ENGINEERING JOURNAL &amp; RESEARCH
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] text-foreground">
            Engineering Insights
            <span
              className="block sm:inline font-normal italic text-text-secondary sm:ml-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              — Technical Logs
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Deep-dives into AI backend systems, agentic architectures, RAG pipelines, and high-throughput production engineering.
          </p>
        </header>

        {blogs.length === 0 ? (
          <div className="text-center py-16 bg-footer-bg rounded-2xl border border-border-primary">
            <p className="text-text-muted text-base sm:text-lg">No posts published yet.</p>
          </div>
        ) : (
          <BlogList initialBlogs={blogs} />
        )}
      </div>
    </main>
  );
}
