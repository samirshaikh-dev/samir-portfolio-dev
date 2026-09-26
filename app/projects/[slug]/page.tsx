import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { projects as projectsSchema } from "@/lib/schema";
import { eq, and, ne, desc } from "drizzle-orm";
import type { Metadata } from "next";
import ContentWithToc from "@/components/ContentWithToc";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";
import { APP_URL } from "@/lib/site-config";
import { SAME_AS } from "@/lib/seo/structured-data";

export const revalidate = 3600;

interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  technologies: string[] | null;
  github_link: string | null;
  demo_link: string | null;
  is_case_study: boolean;
  badge: string | null;
  category: string | null;
  metrics: string[] | null;
  display_order: number;
  published_at: string;
}

interface RelatedProject {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  technologies: string[] | null;
  is_case_study: boolean;
  badge: string | null;
  category: string | null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseMetric(metric: string): { value: string; label: string } {
  // Matches patterns like "82% Resolution", "<1.2s Latency", "5,000+ Inquiries", "10x Speedup"
  const match = metric.match(/^([<>]?\s*[\d,.]+[+%kKmMxX\w/]*)\s+(.+)$/);
  if (match) {
    return { value: match[1], label: match[2] };
  }
  return { value: metric, label: "Outcome Benchmark" };
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const result = await db.select({
      id: projectsSchema.id,
      title: projectsSchema.title,
      slug: projectsSchema.slug,
      excerpt: projectsSchema.excerpt,
      content: projectsSchema.content,
      cover_image_url: projectsSchema.coverImageUrl,
      technologies: projectsSchema.technologies,
      github_link: projectsSchema.githubLink,
      demo_link: projectsSchema.demoLink,
      is_case_study: projectsSchema.isCaseStudy,
      badge: projectsSchema.badge,
      category: projectsSchema.category,
      metrics: projectsSchema.metrics,
      display_order: projectsSchema.displayOrder,
      published_at: projectsSchema.publishedAt,
    }).from(projectsSchema).where(and(eq(projectsSchema.slug, slug), eq(projectsSchema.isPublished, true)));

    if (result.length === 0) return null;
    return result[0] as unknown as Project;
  } catch (err) {
    console.error("Failed to load project:", err);
    return null;
  }
}

async function getSimilarProjects(currentSlug: string): Promise<RelatedProject[]> {
  try {
    const result = await db.select({
      id: projectsSchema.id,
      title: projectsSchema.title,
      slug: projectsSchema.slug,
      excerpt: projectsSchema.excerpt,
      cover_image_url: projectsSchema.coverImageUrl,
      technologies: projectsSchema.technologies,
      is_case_study: projectsSchema.isCaseStudy,
      badge: projectsSchema.badge,
      category: projectsSchema.category,
    })
      .from(projectsSchema)
      .where(and(eq(projectsSchema.isPublished, true), ne(projectsSchema.slug, currentSlug)))
      .orderBy(desc(projectsSchema.publishedAt))
      .limit(3);
    return result as unknown as RelatedProject[];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const allProjects = await db
      .select({ slug: projectsSchema.slug })
      .from(projectsSchema)
      .where(eq(projectsSchema.isPublished, true));
    return allProjects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Project Not Found" };

  const isCaseStudy = project.is_case_study;
  const prefix = isCaseStudy ? "Case Study: " : "";
  const title = `${prefix}${project.title} | Samir Shaikh`;
  const description = project.excerpt || `Deep dive into ${project.title} by Samir Shaikh — AI Developer & Backend Engineer.`;

  return {
    title,
    description,
    keywords: [
      project.title,
      "Samir Shaikh",
      "Samir Shaikh project",
      "AI Developer",
      "Backend Engineer",
      "Freelance AI Engineer",
      ...(project.technologies ?? []),
      ...(project.category ? [project.category] : []),
    ],
    alternates: {
      canonical: `${APP_URL}/projects/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${APP_URL}/projects/${project.slug}`,
      images: project.cover_image_url
        ? [{ url: optimizeCloudinaryUrl(project.cover_image_url, { width: 1200 }), width: 1200, height: 630, alt: project.title }]
        : [{ url: `${APP_URL}/Filled_Logo.png`, width: 1200, height: 630, alt: project.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.cover_image_url
        ? [optimizeCloudinaryUrl(project.cover_image_url, { width: 1200 })]
        : [`${APP_URL}/Filled_Logo.png`],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, similarProjects] = await Promise.all([getProject(slug), getSimilarProjects(slug)]);

  if (!project) {
    notFound();
  }

  const publishedDate = new Date(project.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const isCaseStudy = project.is_case_study || project.badge === "Case Study";

  return (
    <main className="flex-1">
      <article className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Work", href: "/projects" },
            { name: project.title, href: `/projects/${project.slug}` },
          ]}
        />

        <div className="flex items-center justify-between gap-4 mb-8 md:mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-foreground transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Selected Work
          </Link>

          {isCaseStudy && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Case Study
            </span>
          )}
        </div>

        <header className="mb-10 md:mb-14">
          {/* Metadata pill badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            {project.badge && (
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                  isCaseStudy
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                    : "bg-foreground/5 text-foreground border-border-primary"
                }`}
              >
                {project.badge}
              </span>
            )}
            {project.category && (
              <span className="text-xs font-medium text-text-secondary bg-hover-bg border border-border-primary px-3 py-1 rounded-full">
                {project.category}
              </span>
            )}
            <time className="text-xs font-medium text-text-muted bg-hover-bg/70 px-3 py-1 rounded-full">
              {publishedDate}
            </time>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight tracking-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {project.title}
          </h1>

          {project.excerpt && (
            <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-3xl mb-8">
              {project.excerpt}
            </p>
          )}

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-hover-bg/40 border border-border-primary text-xs mb-8">
            <div>
              <span className="block text-text-muted font-medium mb-1 uppercase tracking-wider text-[10px]">Role</span>
              <span className="font-semibold text-foreground">Lead AI & Backend</span>
            </div>
            <div>
              <span className="block text-text-muted font-medium mb-1 uppercase tracking-wider text-[10px]">Type</span>
              <span className="font-semibold text-foreground">
                {isCaseStudy ? "Client / Flagship Deep Dive" : (project.badge || "System Build")}
              </span>
            </div>
            <div>
              <span className="block text-text-muted font-medium mb-1 uppercase tracking-wider text-[10px]">Domain</span>
              <span className="font-semibold text-foreground">{project.category || "AI & Automation"}</span>
            </div>
            <div>
              <span className="block text-text-muted font-medium mb-1 uppercase tracking-wider text-[10px]">Status</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Production Deployed
              </span>
            </div>
          </div>

          {/* Key Outcomes / Metrics Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="my-8 p-6 rounded-2xl bg-hover-bg/70 border border-border-primary shadow-xs">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-text-secondary">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Key Outcomes & Performance Benchmarks
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {project.metrics.map((metric, idx) => {
                  const { value, label } = parseMetric(metric);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-background border border-border-primary/80 shadow-xs flex flex-col justify-between"
                    >
                      <div className="text-xl md:text-2xl font-bold text-foreground font-mono tracking-tight">
                        {value}
                      </div>
                      <div className="text-xs text-text-muted mt-1.5 font-medium line-clamp-2">
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tech stack and Action links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-border-primary">
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold tracking-wide uppercase text-text-secondary bg-hover-bg px-3 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground bg-background border border-border-primary hover:bg-hover-bg px-4 py-2 rounded-lg transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  Source Code
                </a>
              )}
              {project.demo_link && (
                <a
                  href={project.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-background bg-foreground hover:opacity-90 px-4 py-2 rounded-lg transition-opacity shadow-xs"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live System
                </a>
              )}
            </div>
          </div>
        </header>

        {project.cover_image_url && (
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-footer-bg mb-12 md:mb-16 shadow-sm border border-border-primary">
            <Image
              src={optimizeCloudinaryUrl(project.cover_image_url, { width: 1200 })}
              alt={`Architecture and interface of ${project.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        )}

        <ContentWithToc
          html={project.content}
          className="prose prose-gray dark:prose-invert prose-lg max-w-none text-text-muted
            prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground prose-strong:text-foreground
            prose-h1:font-playfair prose-h2:font-playfair prose-h3:font-playfair
            prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:text-text-secondary
            prose-img:rounded-2xl prose-img:border prose-img:border-border-primary prose-img:shadow-sm"
        />

        {/* Client Conversion Call to Action */}
        <section className="my-16 p-8 md:p-10 rounded-2xl border border-border-primary bg-gradient-to-br from-hover-bg/70 via-background to-hover-bg/30 text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Freelance & Advisory
            </div>
            <h2
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Need a similar AI or backend system?
            </h2>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              I architect, benchmark, and deploy production AI triage pipelines, RAG systems, and custom backend infrastructure built for high reliability.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity shadow-xs"
              >
                <span>Discuss Your Project</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-foreground bg-background border border-border-primary hover:bg-hover-bg transition-colors"
              >
                <span>Browse All Work</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": project.github_link ? "SoftwareSourceCode" : "CreativeWork",
              name: project.title,
              headline: project.title,
              description: project.excerpt || undefined,
              image: project.cover_image_url
                ? [optimizeCloudinaryUrl(project.cover_image_url, { width: 1200 })]
                : [`${APP_URL}/Filled_Logo.png`],
              url: `${APP_URL}/projects/${project.slug}`,
              datePublished: project.published_at,
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1", ".prose p"],
              },
              ...(project.category ? { genre: project.category } : {}),
              ...(project.github_link ? { codeRepository: project.github_link } : {}),
              ...(project.technologies && project.technologies.length > 0
                ? {
                    keywords: project.technologies.join(", "),
                    programmingLanguage: project.technologies.join(", "),
                  }
                : {}),
              author: {
                "@type": "Person",
                name: "Samir Shaikh",
                jobTitle: "AI Developer & Backend Engineer",
                url: APP_URL,
                sameAs: SAME_AS,
              },
            })
          }}
        />

        {/* Similar Projects */}
        {similarProjects.length > 0 && (
          <section className="mt-12 pt-12 border-t border-border-primary">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground tracking-tight">More Projects & Case Studies</h2>
              <Link href="/projects" className="text-xs font-medium text-text-muted hover:text-foreground transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProjects.map((related) => (
                <Link
                  key={related.id}
                  href={`/projects/${related.slug}`}
                  className="group flex flex-col bg-background border border-border-primary rounded-xl overflow-hidden hover:border-text-muted transition-colors"
                >
                  {related.cover_image_url && (
                    <div className="relative w-full aspect-[16/9] bg-hover-bg overflow-hidden">
                      <Image
                        src={optimizeCloudinaryUrl(related.cover_image_url, { width: 600 })}
                        alt={`Screenshot of ${related.title} project`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        {related.badge && (
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                            related.is_case_study
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-hover-bg text-text-secondary"
                          }`}>
                            {related.badge}
                          </span>
                        )}
                        {related.category && (
                          <span className="text-[10px] text-text-muted">
                            · {related.category}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-foreground leading-snug group-hover:text-text-secondary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      {related.excerpt && (
                        <p className="text-xs text-text-muted mt-1.5 line-clamp-2 leading-relaxed">{related.excerpt}</p>
                      )}
                    </div>
                    {related.technologies && related.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border-primary/50">
                        {related.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[10px] font-medium text-text-muted">
                            #{tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
