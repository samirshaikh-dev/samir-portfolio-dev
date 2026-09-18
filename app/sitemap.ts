import { MetadataRoute } from 'next';
import { db } from "@/lib/db";
import { projects as projectsSchema, blogs as blogsSchema } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

import { APP_URL } from "@/lib/site-config";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all published projects
  const projects = await db.select({ slug: projectsSchema.slug, updatedAt: projectsSchema.updatedAt })
    .from(projectsSchema)
    .where(eq(projectsSchema.isPublished, true))
    .orderBy(desc(projectsSchema.updatedAt));

  // Fetch all published blogs
  const blogs = await db.select({ slug: blogsSchema.slug, updatedAt: blogsSchema.updatedAt })
    .from(blogsSchema)
    .where(eq(blogsSchema.isPublished, true))
    .orderBy(desc(blogsSchema.updatedAt));

  const projectUrls = projects.map((project) => ({
    url: `${APP_URL}/projects/${project.slug}`,
    lastModified: project.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${APP_URL}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticRoutes = ['', '/about', '/projects', '/blogs', '/services', '/contact', '/resume', '/sitemap', '/faq'].map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1 : route === '/sitemap' ? 0.7 : route === '/faq' ? 0.8 : 0.9,
  }));

  const legalRoutes = ['/privacy-policy', '/terms-of-service'].map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...legalRoutes, ...projectUrls, ...blogUrls];
}
