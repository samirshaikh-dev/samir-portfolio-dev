import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { blogs as blogsSchema } from "@/lib/schema";
import { eq, and, ne, desc } from "drizzle-orm";
import ContentWithToc from "@/components/ContentWithToc";
import BlogInteractions from "@/components/blogs/BlogInteractions";
import BlogStarInteraction from "@/components/blogs/BlogStarInteraction";
import BlogShareButtons from "@/components/blogs/BlogShareButtons";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { APP_URL } from "@/lib/site-config";
import { SAME_AS } from "@/lib/seo/structured-data";

export const revalidate = 3600;

interface Comment {
  name: string;
  comment: string;
  createdAt: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[] | null;
  published_at: string;
  updated_at: string | null;
  stars: number;
  comments: Comment[];
}

interface RelatedBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const result = await db
      .select({
        id: blogsSchema.id,
        title: blogsSchema.title,
        slug: blogsSchema.slug,
        excerpt: blogsSchema.excerpt,
        content: blogsSchema.content,
        cover_image_url: blogsSchema.coverImageUrl,
        tags: blogsSchema.tags,
        published_at: blogsSchema.publishedAt,
        updated_at: blogsSchema.updatedAt,
        stars: blogsSchema.stars,
        comments: blogsSchema.comments,
      })
      .from(blogsSchema)
      .where(and(eq(blogsSchema.slug, slug), eq(blogsSchema.isPublished, true)));
    if (result.length === 0) return null;
    return result[0] as unknown as Blog;
  } catch {
    return null;
  }
}

async function getRelatedBlogs(currentSlug: string): Promise<RelatedBlog[]> {
  try {
    const result = await db
      .select({
        id: blogsSchema.id,
        title: blogsSchema.title,
        slug: blogsSchema.slug,
        excerpt: blogsSchema.excerpt,
        cover_image_url: blogsSchema.coverImageUrl,
        published_at: blogsSchema.publishedAt,
      })
      .from(blogsSchema)
      .where(and(eq(blogsSchema.isPublished, true), ne(blogsSchema.slug, currentSlug)))
      .orderBy(desc(blogsSchema.publishedAt))
      .limit(3);
    return result as unknown as RelatedBlog[];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const allBlogs = await db
      .select({ slug: blogsSchema.slug })
      .from(blogsSchema)
      .where(eq(blogsSchema.isPublished, true));
    return allBlogs.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Not Found" };
  return {
    title: `${blog.title} | Samir Shaikh`,
    description: blog.excerpt ?? undefined,
    keywords: [
      blog.title,
      "Samir Shaikh",
      "Samir Shaikh blog",
      "backend engineering",
      "Node.js",
      "agentic AI",
      "AI development",
      "technical article",
      "software engineering",
      ...(blog.tags ?? []),
    ],
    alternates: {
      canonical: `${APP_URL}/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || undefined,
      url: `${APP_URL}/blogs/${blog.slug}`,
      images: blog.cover_image_url
        ? [{ url: blog.cover_image_url, width: 1200, height: 630, alt: blog.title }]
        : [{ url: `${APP_URL}/Filled_Logo.png`, width: 1200, height: 630, alt: blog.title }],
      type: "article",
      publishedTime: blog.published_at,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || undefined,
      images: blog.cover_image_url ? [blog.cover_image_url] : [`${APP_URL}/Filled_Logo.png`],
    },
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadingTime(content: string): string {
  if (!content) return "4 min read";
  const clean = content.replace(/<[^>]*>/g, " ");
  const words = clean.trim().split(/\s+/).length;
  const minutes = Math.max(2, Math.round(words / 200));
  return `${minutes} min read`;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [blog, relatedBlogs] = await Promise.all([getBlog(slug), getRelatedBlogs(slug)]);

  if (!blog) notFound();

  return (
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20 pt-4 overflow-hidden">
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

      <div className="max-w-3xl mx-auto w-full">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blogs" },
            { name: blog.title, href: `/blogs/${blog.slug}` },
          ]}
        />

        {/* Back Link Pill */}
        <div className="mt-4 mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-muted hover:text-foreground px-4 py-2 rounded-full border border-border-primary bg-background dark:bg-card-bg shadow-2xs hover:bg-hover-bg transition-all group"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M13 8H3M7 12L3 8l4-4" />
            </svg>
            All Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 sm:mb-12">
          {/* Topic Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            {blog.tags && blog.tags[0] ? blog.tags[0] : "TECHNICAL ESSAY"}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.12] tracking-tight">
            {blog.title}
          </h1>

          {/* Excerpt / Lede */}
          {blog.excerpt && (
            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed border-l-2 border-accent-lime pl-4 py-1 italic">
              {blog.excerpt}
            </p>
          )}

          {/* Author & Telemetry Byline */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 mt-8 border-y border-border-primary gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-hover-bg border border-border-primary flex items-center justify-center font-bold text-foreground text-sm font-mono shadow-2xs">
                SS
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Samir Shaikh</div>
                <div className="text-xs text-text-muted font-mono flex items-center gap-2">
                  <time dateTime={blog.published_at}>{formatDate(blog.published_at)}</time>
                  <span>•</span>
                  <span>{estimateReadingTime(blog.content)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BlogShareButtons title={blog.title} slug={blog.slug} compact />
              <BlogStarInteraction slug={blog.slug} initialStars={blog.stars ?? 0} />
            </div>
          </div>

          <p className="sr-only">
            This technical article by Samir Shaikh covers {blog.title?.toLowerCase()}. Read to learn about semantic search, RAG systems, and backend engineering best practices.
          </p>
        </header>

        {/* Cover Image */}
        {blog.cover_image_url && (
          <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] rounded-3xl overflow-hidden mb-12 bg-hover-bg border border-border-primary shadow-sm">
            <Image
              src={optimizeCloudinaryUrl(blog.cover_image_url, { width: 1400 })}
              alt={`Cover image for ${blog.title} — blog post by Samir Shaikh`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Blog Content with Table of Contents */}
        <ContentWithToc
          html={blog.content}
          className="prose prose-gray dark:prose-invert max-w-none text-text-muted prose-headings:text-foreground prose-strong:text-foreground prose-a:text-foreground hover:prose-a:text-accent-lime"
        />

        {/* Tags Row */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-12 pt-6 border-t border-border-primary">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider mr-1">Tags:</span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-hover-bg border border-border-primary text-text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Section (Full Mode) */}
        <div className="mt-8">
          <BlogShareButtons title={blog.title} slug={blog.slug} />
        </div>

        {/* Author Bio Card */}
        <section
          aria-label="Author biography"
          className="my-12 p-6 sm:p-8 rounded-3xl bg-background dark:bg-card-bg border border-border-primary shadow-2xs flex flex-col sm:flex-row items-center sm:items-start gap-5"
        >
          <div className="w-16 h-16 rounded-2xl bg-hover-bg border border-border-primary flex items-center justify-center font-black text-xl text-foreground font-mono flex-shrink-0">
            SS
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border-primary bg-hover-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              ABOUT THE AUTHOR
            </div>
            <h2 className="text-lg font-bold text-foreground">Samir Shaikh</h2>
            <p className="text-xs text-text-muted font-mono mb-2">AI Backend Engineer • Agentic Systems &amp; RAG Architecture</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Building autonomous AI systems, high-throughput microservices, and production vector search architectures. Exploring Forward Deployed Engineer (FDE) roles worldwide.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-text-secondary underline underline-offset-4 decoration-border-primary transition-colors"
              >
                Read Full Bio →
              </Link>
              <span className="text-border-primary">•</span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-text-secondary underline underline-offset-4 decoration-border-primary transition-colors"
              >
                Get in Touch →
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Interactions (Comments Form & Comments List) */}
        <BlogInteractions
          slug={blog.slug}
          initialComments={blog.comments ?? []}
        />

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border-primary">
            <div className="flex items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                FURTHER READING
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-8 tracking-tight">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  href={`/blogs/${related.slug}`}
                  className="group flex flex-col bg-background dark:bg-card-bg border border-border-primary rounded-2xl overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all duration-300"
                >
                  {related.cover_image_url ? (
                    <div className="relative w-full aspect-[16/9] bg-hover-bg overflow-hidden border-b border-border-primary">
                      <Image
                        src={optimizeCloudinaryUrl(related.cover_image_url, { width: 600 })}
                        alt={`Cover image for ${related.title}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[16/9] bg-hover-bg overflow-hidden border-b border-border-primary flex items-center justify-center text-border-primary">
                      <span className="text-3xl font-bold opacity-30" style={{ fontFamily: "var(--font-playfair)" }}>
                        {related.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-[10px] font-mono font-medium uppercase text-text-muted mb-2">
                      {formatDate(related.published_at)}
                    </p>
                    <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-text-secondary transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="text-xs text-text-muted line-clamp-2 mt-auto leading-relaxed">
                        {related.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              description: blog.excerpt || undefined,
              image: blog.cover_image_url
                ? [optimizeCloudinaryUrl(blog.cover_image_url, { width: 1200 })]
                : [`${APP_URL}/Filled_Logo.png`],
              url: `${APP_URL}/blogs/${blog.slug}`,
              mainEntityOfPage: `${APP_URL}/blogs/${blog.slug}`,
              datePublished: blog.published_at,
              dateModified: blog.updated_at || blog.published_at,
              publisher: {
                "@type": "Organization",
                name: "Samir Shaikh Portfolio",
                logo: {
                  "@type": "ImageObject",
                  url: `${APP_URL}/Filled_Logo.png`,
                },
              },
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1", ".prose p"],
              },
              author: [
                {
                  "@type": "Person",
                  name: "Samir Shaikh",
                  url: APP_URL,
                  sameAs: SAME_AS,
                },
              ],
            }),
          }}
        />
      </div>
    </main>
  );
}
