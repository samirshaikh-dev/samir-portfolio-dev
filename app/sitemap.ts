import { MetadataRoute } from 'next';
import { db } from "@/lib/db";
import { projects as projectsSchema, blogs as blogsSchema } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

import { APP_URL } from "@/lib/site-config";
import { getAllServices } from "@/lib/data/services";

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

  const serviceUrls = getAllServices().map((service) => ({
    url: `${APP_URL}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const ROUTE_PRIORITIES: Record<string, number> = {
    '': 1.0,
    '/about': 0.9,
    '/services': 0.9,
    '/projects': 0.9,
    '/blogs': 0.9,
    '/contact': 0.9,
    '/hire': 0.9,
    '/technical-skills': 0.8,
    '/certificates': 0.8,
    '/faq': 0.8,
    '/sitemap': 0.7,
  };

  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/blogs',
    '/services',
    '/hire',
    '/contact',
    '/resume',
    '/certificates',
    '/sitemap',
    '/faq',
    '/technical-skills',
  ].map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: ROUTE_PRIORITIES[route] ?? 0.8,
  }));

  const legalRoutes = ['/privacy-policy', '/terms-of-service'].map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...serviceUrls, ...legalRoutes, ...projectUrls, ...blogUrls];
}
