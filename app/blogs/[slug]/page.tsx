import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogs as blogsSchema } from "@/lib/schema";
import { eq, and, ne, desc } from "drizzle-orm";
import ContentWithToc from "@/components/ContentWithToc";
import BlogInteractions from "@/components/blogs/BlogInteractions";
import BlogStarInteraction from "@/components/blogs/BlogStarInteraction";
import BlogShareButtons from "@/components/blogs/BlogShareButtons";
import BlogCoverImage from "@/components/blogs/BlogCoverImage";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { APP_URL } from "@/lib/site-config";
import { SAME_AS } from "@/lib/seo/structured-data";
import { FiArrowLeft, FiClock, FiCalendar, FiArrowUpRight } from "react-icons/fi";

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

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return { title: "Blog Post Not Found" };

  const title = `${blog.title} | Samir Shaikh`;
  const description =
    blog.excerpt || `Read ${blog.title} by Samir Shaikh — AI Developer & Backend Engineer.`;

  return {
    title,
    description,
    keywords: [
      blog.title,
      "Samir Shaikh",
      "Samir Shaikh blog",
      "AI Developer",
      "Backend Engineer",
      ...(blog.tags ?? []),
    ],
    alternates: {
      canonical: `${APP_URL}/blogs/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${APP_URL}/blogs/${blog.slug}`,
      type: "article",
      publishedTime: blog.published_at,
      ...(blog.updated_at ? { modifiedTime: blog.updated_at } : {}),
      authors: ["Samir Shaikh"],
      tags: blog.tags ?? undefined,
      images: blog.cover_image_url
        ? [
            {
              url: optimizeCloudinaryUrl(blog.cover_image_url, { width: 1200 }),
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [{ url: `${APP_URL}/Filled_Logo.png`, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.cover_image_url
        ? [optimizeCloudinaryUrl(blog.cover_image_url, { width: 1200 })]
        : [`${APP_URL}/Filled_Logo.png`],
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
    <main className="flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20 pt-6 sm:pt-10">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Navigation Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Technical Writing", href: "/blogs" },
              { name: blog.title, href: `/blogs/${blog.slug}` },
            ]}
          />
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-foreground px-3.5 py-1.5 rounded-full border border-border-primary/80 bg-background dark:bg-card-bg hover:border-foreground/30 transition-colors"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
        </div>

        {/* ── ARTICLE HEADER ────────────────────────────────────────────────── */}
        <header className="border-b border-border-primary/80 pb-8 sm:pb-10">
          {/* Topic Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-primary/80 bg-hover-bg/70 text-[10px] font-mono font-medium tracking-wider text-foreground uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              {blog.tags?.[0] || "TECHNICAL LOG"}
            </span>
            <div className="flex items-center gap-3 text-xs font-mono text-text-muted ml-auto">
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5" />
                <time dateTime={blog.published_at}>{formatDate(blog.published_at)}</time>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3.5 h-3.5" />
                <span>{estimateReadingTime(blog.content)}</span>
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.12] tracking-tight">
            {blog.title}
          </h1>

          {/* Lede / Summary Excerpt */}
          {blog.excerpt && (
            <p className="mt-5 text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed border-l-2 border-accent-lime pl-4 py-1 italic">
              {blog.excerpt}
            </p>
          )}

          {/* Author & Telemetry Byline */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 mt-8 border-t border-border-primary/60 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-hover-bg border border-border-primary flex items-center justify-center font-bold text-foreground text-sm font-mono shadow-2xs">
                SS
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Samir Shaikh</div>
                <div className="text-xs text-text-muted font-mono">
                  AI Backend Engineer &bull; Agentic AI &amp; Distributed Systems
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BlogShareButtons title={blog.title} slug={blog.slug} compact />
              <BlogStarInteraction slug={blog.slug} initialStars={blog.stars ?? 0} />
            </div>
          </div>
        </header>

        {/* ── COVER IMAGE WITH FALLBACK CARD ────────────────────────────────── */}
        {blog.cover_image_url && (
          <figure className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border-primary/80">
            <BlogCoverImage
              coverImageUrl={blog.cover_image_url}
              title={blog.title}
              tag={blog.tags?.[0]}
              aspectRatio="hero"
              priority={true}
            />
          </figure>
        )}

        {/* ── RICH CONTENT WITH TABLE OF CONTENTS ───────────────────────────── */}
        <div className="pt-2">
          <ContentWithToc
            html={blog.content}
            className="prose prose-base sm:prose-lg prose-gray dark:prose-invert max-w-none text-text-secondary leading-relaxed prose-headings:text-foreground prose-headings:font-black prose-headings:tracking-tight prose-strong:text-foreground prose-a:text-foreground hover:prose-a:text-accent-lime prose-code:font-mono prose-code:text-foreground prose-code:bg-hover-bg prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:border prose-pre:border-border-primary prose-pre:bg-card-bg"
          />
        </div>

        {/* ── ARTICLE TAGS ──────────────────────────────────────────────────── */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-8 border-t border-border-primary/80">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider mr-1">
              Topics:
            </span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-hover-bg/70 border border-border-primary/60 text-text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Section (Full Mode) */}
        <div className="pt-4">
          <BlogShareButtons title={blog.title} slug={blog.slug} />
        </div>

        {/* ── AUTHOR BIO CARD (PSYCHOLOGY & PROOF FRAMING) ──────────────────── */}
        <section
          aria-label="Author biography"
          className="my-10 p-6 sm:p-8 rounded-3xl bg-background dark:bg-card-bg border border-border-primary/80 shadow-2xs flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-hover-bg border border-border-primary/80 flex items-center justify-center font-black text-xl text-foreground font-mono flex-shrink-0 shadow-2xs">
            SS
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border-primary/80 bg-hover-bg/60 text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              AUTHOR &amp; SYSTEMS ENGINEER
            </div>
            <h2 className="text-xl font-black text-foreground tracking-tight">Samir Shaikh</h2>
            <p className="text-xs text-text-muted font-mono">
              AI Backend Engineer &bull; Agentic AI &bull; Production RAG Systems
            </p>
            <p className="text-sm text-text-secondary leading-relaxed pt-1">
              Building autonomous AI workflows, high-throughput microservices, and production vector search architectures. Focused on engineering reliability and customer-embedded problem solving.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-text-secondary transition-colors"
              >
                <span>Career &amp; Engineering Philosophy</span>
                <FiArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-border-primary">&bull;</span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-text-secondary transition-colors"
              >
                <span>Discuss System Architecture</span>
                <FiArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── BLOG INTERACTIONS (COMMENTS & FEEDBACK) ───────────────────────── */}
        <BlogInteractions
          slug={blog.slug}
          initialComments={blog.comments ?? []}
        />

        {/* ── RELATED POSTS (FURTHER READING) ───────────────────────────────── */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border-primary/80 space-y-8">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                  <span>FURTHER READING</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  Related Architectural Notes
                </h3>
              </div>
              <Link
                href="/blogs"
                className="text-xs font-mono font-bold text-foreground hover:text-text-secondary transition-colors"
              >
                View All Articles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((related) => (
                <article key={related.id} className="h-full">
                  <Link
                    href={`/blogs/${related.slug}`}
                    className="group flex flex-col h-full bg-background dark:bg-card-bg border border-border-primary/80 rounded-2xl overflow-hidden hover:border-foreground/30 hover:shadow-2xs transition-all duration-200 p-4"
                  >
                    <div className="overflow-hidden rounded-xl mb-3">
                      <BlogCoverImage
                        coverImageUrl={related.cover_image_url}
                        title={related.title}
                        aspectRatio="compact"
                      />
                    </div>
                    <div className="flex flex-col flex-1 justify-between space-y-2">
                      <div>
                        <p className="text-[10px] font-mono font-medium uppercase text-text-muted">
                          {formatDate(related.published_at)}
                        </p>
                        <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-text-secondary transition-colors line-clamp-2 mt-1 leading-snug">
                          {related.title}
                        </h4>
                        {related.excerpt && (
                          <p className="text-xs text-text-secondary line-clamp-2 mt-1 leading-relaxed">
                            {related.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="pt-2 text-[11px] font-mono font-bold text-foreground flex items-center gap-1 group-hover:text-text-secondary transition-colors">
                        <span>Read Note</span>
                        <FiArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── SCHEMA.ORG STRUCTURED DATA ────────────────────────────────────── */}
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
