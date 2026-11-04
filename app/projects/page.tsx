import type { Metadata } from "next";
import { db } from "@/lib/db";
import { projects as projectsSchema } from "@/lib/schema";
import { eq, desc, asc } from "drizzle-orm";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProjectList, { Project } from "@/components/projects/ProjectList";
import { APP_URL } from "@/lib/site-config";
import { getCollectionPageJsonLd } from "@/lib/seo/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Selected Work & Case Studies | Samir Shaikh",
  description:
    "Explore production-grade AI systems, high-throughput backends, and full-stack applications engineered by Samir Shaikh — including autonomous AI ticket triage, WhatsApp campaign platform, and custom RAG pipelines.",
  keywords: [
    "Samir Shaikh projects",
    "Selected Work Samir Shaikh",
    "AI engineering case studies",
    "backend engineering projects",
    "AI projects portfolio",
    "RAG chatbot project",
    "pgvector semantic search",
    "microservices project",
    "AI ticket triage system",
    "WhatsApp campaign platform",
    "event management platform",
    "Node.js NestJS GraphQL project",
    "Kafka BullMQ Redis project",
    "full-stack developer portfolio",
  ],
  alternates: {
    canonical: `${APP_URL}/projects`,
  },
  openGraph: {
    title: "Selected Work & Case Studies | Samir Shaikh",
    description:
      "Production-grade AI systems, high-throughput backends, and full-stack applications engineered for reliability by Samir Shaikh.",
    url: `${APP_URL}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work & Case Studies | Samir Shaikh",
    description:
      "Production-grade AI systems, high-throughput backends, and full-stack applications engineered for reliability by Samir Shaikh.",
  },
};

async function getProjects(): Promise<Project[]> {
  try {
    const result = await db
      .select({
        id: projectsSchema.id,
        title: projectsSchema.title,
        slug: projectsSchema.slug,
        excerpt: projectsSchema.excerpt,
        cover_image_url: projectsSchema.coverImageUrl,
        technologies: projectsSchema.technologies,
        github_link: projectsSchema.githubLink,
        demo_link: projectsSchema.demoLink,
        is_case_study: projectsSchema.isCaseStudy,
        badge: projectsSchema.badge,
        category: projectsSchema.category,
        metrics: projectsSchema.metrics,
        display_order: projectsSchema.displayOrder,
      })
      .from(projectsSchema)
      .where(eq(projectsSchema.isPublished, true))
      .orderBy(asc(projectsSchema.displayOrder), desc(projectsSchema.publishedAt));
    return result as unknown as Project[];
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  const collectionJsonLd = getCollectionPageJsonLd({
    name: "Selected Work & Case Studies | Samir Shaikh",
    description:
      "Production-grade AI systems, high-throughput backends, and full-stack applications engineered for reliability by Samir Shaikh.",
    path: "/projects",
    items: projects.map((p) => ({ name: p.title, path: `/projects/${p.slug}` })),
  });

  return (
    <main className="flex-1 px-5 sm:px-8 md:px-10 pb-20 pt-6 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Selected Work", href: "/projects" },
          ]}
        />

        {/* ── EDITORIAL HEADER ──────────────────────────────────────────────── */}
        <div className="border-b border-border-primary/80 pb-10">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            <span>01 / SELECTED WORK &amp; CASE STUDIES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
            Proof Over Years:{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Case Studies &amp; Flagship Systems
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
            Judge my engineering ability by what I can build, how I think, and the problems I solve &mdash; not simply by the number of years I&apos;ve worked.
          </p>

          {/* Quick Fact Ribbon (Verified Only) */}
          <div className="mt-6 pt-5 border-t border-border-primary/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground dark:bg-accent-lime" />
              <span>3 Flagship Case Studies</span>
            </span>
            <span className="text-border-primary hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-border-primary" />
              <span>14 Verified Technologies</span>
            </span>
            <span className="text-border-primary hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-border-primary" />
              <span>100% Production TypeScript &amp; Go/Node</span>
            </span>
            <span className="text-border-primary hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-border-primary" />
              <span>Open Source &amp; Verifiable</span>
            </span>
          </div>
        </div>

        {/* ── PROJECT DIRECTORY LIST ────────────────────────────────────────── */}
        <ProjectList initialProjects={projects} />
      </div>
    </main>
  );
}
