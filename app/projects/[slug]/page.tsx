import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { projects as projectsSchema } from "@/lib/schema";
import { eq, and, ne, desc } from "drizzle-orm";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectCaseStudyNav, {
  type CaseStudyNavItem,
} from "@/components/projects/ProjectCaseStudyNav";
import {
  ProjectChallengeList,
  ProjectLinks,
  ProjectOverview,
  ProjectResults,
  ProjectStack,
  type ProjectFact,
} from "@/components/projects/ProjectCaseStudySections";
import RelatedProjects, {
  type RelatedProject,
} from "@/components/projects/RelatedProjects";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";
import { parseCaseStudy } from "@/lib/projects/case-study";
import { groupTechnologies } from "@/lib/projects/stack-taxonomy";
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

interface PageProps {
  params: Promise<{ slug: string }>;
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
      github_link: projectsSchema.githubLink,
      demo_link: projectsSchema.demoLink,
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
  const challengeSections = parseCaseStudy(project.content);
  const stackLayers = groupTechnologies(project.technologies);
  const metrics = project.metrics ?? [];

  const access: string[] = [];
  if (project.demo_link) access.push("Live demo");
  if (project.github_link) access.push("Source code");

  const facts: ProjectFact[] = [
    {
      label: "Engagement",
      value: project.badge ?? (isCaseStudy ? "Case Study" : "Project"),
    },
    { label: "Domain", value: project.category ?? "—" },
    {
      label: "Published",
      value: publishedDate,
    },
    { label: "Access", value: access.length > 0 ? access.join(" · ") : "—" },
  ];

  const navSections: CaseStudyNavItem[] = [
    { id: "overview", label: "Overview" },
    ...(challengeSections.length > 0
      ? [{ id: "work", label: challengeSections[0].title }]
      : []),
    ...(stackLayers.length > 0 ? [{ id: "stack", label: "Stack" }] : []),
    ...(metrics.length > 0 ? [{ id: "results", label: "Results" }] : []),
    { id: "links", label: "Explore & Connect" },
  ];

  return (
    <main className="flex-1 px-5 pb-20 pt-6 sm:px-8 md:px-10 md:pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 sm:mb-8">
          <Breadcrumbs
            className="min-w-0"
            items={[
              { name: "Home", href: "/" },
              { name: "Work", href: "/projects" },
              { name: project.title, href: `/projects/${project.slug}` },
            ]}
          />
          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border-primary bg-background px-4 py-2 text-xs font-bold text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-hover-bg focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:text-sm dark:bg-card-bg"
          >
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Selected Work
          </Link>
        </div>

        <ProjectHero
          title={project.title}
          excerpt={project.excerpt}
          badge={project.badge}
          category={project.category}
          publishedDate={publishedDate}
          coverImageUrl={project.cover_image_url}
          githubLink={project.github_link}
          demoLink={project.demo_link}
          isCaseStudy={isCaseStudy}
        />

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:mt-14 xl:grid-cols-[14rem_minmax(0,1fr)]">
          <ProjectCaseStudyNav sections={navSections} />

          <div className="min-w-0 space-y-14 sm:space-y-16">
            <ProjectOverview facts={facts} />
            {challengeSections.length > 0 ? (
              <ProjectChallengeList
                sections={challengeSections}
                headingId="work-heading"
              />
            ) : null}
            <ProjectStack layers={stackLayers} />
            <ProjectResults metrics={metrics} />
            <ProjectLinks githubLink={project.github_link} demoLink={project.demo_link} />
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <RelatedProjects projects={similarProjects} />
        </div>
      </div>

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
              cssSelector: ["h1", ".case-study-challenge p"],
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
    </main>
  );
}
