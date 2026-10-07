import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { projects as projectsSchema, blogs as blogsSchema, socials as socialsSchema, testimonials as testimonialsSchema } from "@/lib/schema";
import { eq, desc, asc } from "drizzle-orm";

interface SlimItem {
  title: string;
  slug: string;
}

/**
 * Cached fetch of published projects for footer/nav (max 6).
 * Revalidated hourly via unstable_cache; on-demand tag revalidation
 * can be added later via revalidateTag("projects") on publish.
 */
export const getCachedProjects = unstable_cache(
  async (): Promise<SlimItem[]> => {
    const rows = await db
      .select({ title: projectsSchema.title, slug: projectsSchema.slug })
      .from(projectsSchema)
      .where(eq(projectsSchema.isPublished, true))
      .orderBy(desc(projectsSchema.publishedAt))
      .limit(6);
    return rows;
  },
  ["footer-projects"],
  { revalidate: 3600, tags: ["projects"] }
);

/**
 * Cached fetch of published blogs for footer/nav (max 6).
 * Revalidated hourly via unstable_cache.
 */
export const getCachedBlogs = unstable_cache(
  async (): Promise<SlimItem[]> => {
    const rows = await db
      .select({ title: blogsSchema.title, slug: blogsSchema.slug })
      .from(blogsSchema)
      .where(eq(blogsSchema.isPublished, true))
      .orderBy(desc(blogsSchema.publishedAt))
      .limit(6);
    return rows;
  },
  ["footer-blogs"],
  { revalidate: 3600, tags: ["blogs"] }
);

/**
 * Cached fetch of socials for footer (max 10).
 * Revalidated hourly via unstable_cache.
 */
export const getCachedSocials = unstable_cache(
  async (): Promise<{ name: string; url: string }[]> => {
    const rows = await db
      .select({ name: socialsSchema.name, url: socialsSchema.url })
      .from(socialsSchema)
      .orderBy(socialsSchema.displayOrder)
      .limit(10);
    return rows.filter((r): r is { name: string; url: string } => r.name !== null && r.url !== null);
  },
  ["footer-socials"],
  { revalidate: 3600, tags: ["socials"] }
);

/**
 * Cached fetch of the top 3 featured projects for the homepage.
 * Revalidated hourly via unstable_cache, with tag-based on-demand invalidation.
 */
export const getCachedHomepageProjects = unstable_cache(
  async () => {
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
      return result;
    } catch {
      return [];
    }
  },
  ["homepage-projects"],
  { revalidate: 3600, tags: ["projects"] }
);

/**
 * Cached fetch of the 3 latest blogs for the homepage.
 * Revalidated hourly via unstable_cache.
 */
export const getCachedHomepageBlogs = unstable_cache(
  async () => {
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
        .orderBy(desc(blogsSchema.publishedAt))
        .limit(3);
      return result.map((b) => ({
        ...b,
        published_at: b.published_at ? b.published_at.toISOString() : "",
        stars: b.stars ?? 0,
      }));
    } catch {
      return [];
    }
  },
  ["homepage-blogs"],
  { revalidate: 3600, tags: ["blogs"] }
);

/**
 * Cached fetch of published testimonials.
 * Revalidated hourly via unstable_cache.
 */
export const getCachedTestimonials = unstable_cache(
  async () => {
    try {
      return await db
        .select()
        .from(testimonialsSchema)
        .where(eq(testimonialsSchema.isPublished, true))
        .orderBy(asc(testimonialsSchema.displayOrder));
    } catch {
      return [];
    }
  },
  ["homepage-testimonials"],
  { revalidate: 3600, tags: ["testimonials"] }
);
