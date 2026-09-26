import Hero from "@/components/home/Hero";
import HowIWork from "@/components/HowIWork";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getSpeakableJsonLd } from "@/lib/seo/structured-data";
import { db } from "@/lib/db";
import { projects as projectsSchema, blogs as blogsSchema } from "@/lib/schema";
import { eq, desc, asc } from "drizzle-orm";
import Link from "next/link";
import ProjectList, { Project } from "@/components/projects/ProjectList";
import BlogList from "@/components/blogs/BlogList";

export const revalidate = 3600;

async function getLatestProjects(): Promise<Project[]> {
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
      .orderBy(asc(projectsSchema.displayOrder), desc(projectsSchema.publishedAt))
      .limit(3);
    return result as unknown as Project[];
  } catch {
    return [];
  }
}

async function getLatestBlogs() {
  try {
    const result = await db.select({
      id: blogsSchema.id,
      title: blogsSchema.title,
      slug: blogsSchema.slug,
      excerpt: blogsSchema.excerpt,
      cover_image_url: blogsSchema.coverImageUrl,
      published_at: blogsSchema.publishedAt,
      stars: blogsSchema.stars,
    }).from(blogsSchema).where(eq(blogsSchema.isPublished, true)).orderBy(desc(blogsSchema.publishedAt)).limit(3);
    return result.map((b) => ({
      ...b,
      published_at: b.published_at ? b.published_at.toISOString() : "",
      stars: b.stars ?? 0,
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const [projects, blogs] = await Promise.all([
    getLatestProjects(),
    getLatestBlogs()
  ]);

  return (
    <main className="flex flex-col flex-1">
      <Hero />

      <HowIWork variant="compact" />

      <TestimonialsSection variant="homepage" />

      {/* Selected Work & Case Studies Preview */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Selected Work & Case Studies</h2>
              <p className="text-text-muted">Production-grade AI systems, high-throughput backends, and full-stack applications.</p>
            </div>
            <Link 
              href="/projects" 
              className="hidden md:flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors group"
            >
              View all work
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {projects.length > 0 ? (
            <ProjectList initialProjects={projects} hideSearch />
          ) : (
            <p className="text-text-muted">No projects to show.</p>
          )}
          
          <div className="mt-8 flex justify-center md:hidden">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors px-5 py-2.5 border border-border-primary rounded-full bg-background shadow-sm"
            >
              View all work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Writings */}
      <section className="px-6 md:px-10 py-16 border-t border-border-primary">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Recent Writings</h2>
              <p className="text-text-muted">Thoughts on engineering, AI, and software development.</p>
            </div>
            <Link 
              href="/blogs" 
              className="hidden md:flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors group"
            >
              View all posts
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {blogs.length > 0 ? (
            <BlogList initialBlogs={blogs} hideSearch />
          ) : (
            <p className="text-text-muted">No posts to show.</p>
          )}
          
          <div className="mt-8 flex justify-center md:hidden">
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors px-4 py-2 border border-border-primary rounded-full bg-background shadow-sm"
            >
              View all posts
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSpeakableJsonLd(["h1", "h2", ".hero-intro"])),
        }}
      />
    </main>
  );
}
