import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { projects as projectsSchema, blogs as blogsSchema } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL } from "@/lib/site-config";
import {
  LuCompass,
  LuFolderGit2,
  LuBookOpen,
  LuLayers,
  LuFileCode,
  LuRss,
  LuBot,
  LuArrowUpRight,
  LuArrowRight,
  LuMail,
  LuCheck,
} from "react-icons/lu";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sitemap & Architecture Directory | Samir Shaikh",
  description:
    "A comprehensive, human- and machine-readable index of all pages, case studies, engineering articles, and system architectures across Samir Shaikh's portfolio.",
  keywords: [
    "Samir Shaikh sitemap",
    "portfolio site map",
    "backend developer portfolio pages",
    "Node.js developer blog posts",
    "AI engineer project directory",
    "full stack architecture directory",
  ],
  alternates: {
    canonical: `${APP_URL}/sitemap`,
  },
  openGraph: {
    title: "Sitemap & Architecture Directory | Samir Shaikh",
    description:
      "A comprehensive directory of all pages, case studies, technical writings, and platform endpoints on Samir Shaikh's portfolio.",
    url: `${APP_URL}/sitemap`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitemap & Architecture Directory | Samir Shaikh",
    description:
      "Complete directory of all pages, case studies, and engineering publications by Samir Shaikh.",
  },
};

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default async function SitemapPage() {
  let projects: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    category: string | null;
    badge: string | null;
    publishedAt: Date | null;
  }> = [];

  let blogs: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    publishedAt: Date | null;
  }> = [];

  try {
    projects = await db
      .select({
        title: projectsSchema.title,
        slug: projectsSchema.slug,
        excerpt: projectsSchema.excerpt,
        category: projectsSchema.category,
        badge: projectsSchema.badge,
        publishedAt: projectsSchema.publishedAt,
      })
      .from(projectsSchema)
      .where(eq(projectsSchema.isPublished, true))
      .orderBy(desc(projectsSchema.publishedAt));
  } catch {
    projects = [];
  }

  try {
    blogs = await db
      .select({
        title: blogsSchema.title,
        slug: blogsSchema.slug,
        excerpt: blogsSchema.excerpt,
        publishedAt: blogsSchema.publishedAt,
      })
      .from(blogsSchema)
      .where(eq(blogsSchema.isPublished, true))
      .orderBy(desc(blogsSchema.publishedAt));
  } catch {
    blogs = [];
  }

  const corePages = [
    {
      href: "/",
      label: "Home",
      route: "/",
      description: "Engineering telemetry, live GitHub commit graph, and flagship case studies.",
      tag: "Core",
    },
    {
      href: "/about",
      label: "About Samir",
      route: "/about",
      description: "Engineering trajectory, past/present/future milestones, and work history.",
      tag: "Biography",
    },
    {
      href: "/projects",
      label: "Selected Work",
      route: "/projects",
      description: "Production AI systems, autonomous agents, and distributed backend architectures.",
      tag: "Case Studies",
    },
    {
      href: "/blogs",
      label: "Technical Writings",
      route: "/blogs",
      description: "Deep-dives on RAG pipelines, pgvector retrieval, microservices, and AI engineering.",
      tag: "Articles",
    },
    {
      href: "/services",
      label: "Engineering Services",
      route: "/services",
      description: "Fixed-milestone engineering sprints, custom RAG architectures, and retainer services.",
      tag: "Commercial",
    },
    {
      href: "/technical-skills",
      label: "Technical Skills",
      route: "/technical-skills",
      description: "Full architectural breakdown of languages, frameworks, databases, and DevOps.",
      tag: "Expertise",
    },
    {
      href: "/certificates",
      label: "Verified Credentials",
      route: "/certificates",
      description: "Accreditations in backend engineering, cloud platforms, and distributed systems.",
      tag: "Accreditations",
    },
    {
      href: "/faq",
      label: "Commercial FAQs",
      route: "/faq",
      description: "Verified answers on freelance pricing, milestones, guarantees, and deliverables.",
      tag: "Knowledge Base",
    },
    {
      href: "/contact",
      label: "Contact & Discovery",
      route: "/contact",
      description: "Direct engineering contact form, WhatsApp link, and discovery call booking.",
      tag: "Direct Access",
    },
    {
      href: "/resume",
      label: "Resume & Credentials",
      route: "/resume",
      description: "Interactive PDF resume viewer, download links, and career chronology.",
      tag: "Curriculum Vitae",
    },
  ];

  const machineFeeds = [
    {
      href: "/sitemap.xml",
      label: "XML Sitemap",
      route: "/sitemap.xml",
      description: "Standardized search engine index with update frequencies and priorities.",
      isExternal: true,
      tag: "Search Crawlers",
      icon: LuFileCode,
    },
    {
      href: "/api/feed",
      label: "RSS 2.0 Feed",
      route: "/api/feed",
      description: "Syndicated XML feed of recent technical publications and case studies.",
      isExternal: true,
      tag: "Syndication",
      icon: LuRss,
    },
    {
      href: "/llms.txt",
      label: "llms.txt Knowledge Graph",
      route: "/llms.txt",
      description: "Clean Markdown graph optimized for LLM answer engines & agent ingestion.",
      isExternal: true,
      tag: "AI / AEO / GEO",
      icon: LuBot,
    },
    {
      href: "/privacy-policy",
      label: "Privacy Policy",
      route: "/privacy-policy",
      description:
        "Data handling, transparent analytics disclosures, and privacy assurances — no advertising or cross-site tracking.",
      isExternal: false,
      tag: "Compliance",
      icon: LuLayers,
    },
    {
      href: "/terms-of-service",
      label: "Terms of Service",
      route: "/terms-of-service",
      description: "Terms governing commercial proposals, code delivery, and IP transfer.",
      isExternal: false,
      tag: "Legal",
      icon: LuLayers,
    },
    {
      href: "/.well-known/security.txt",
      label: "security.txt Policy",
      route: "/.well-known/security.txt",
      description: "Responsible security disclosure policy, PGP keys, and contacts.",
      isExternal: true,
      tag: "Security",
      icon: LuFileCode,
    },
  ];

  const totalIndexedUrls =
    corePages.length + projects.length + blogs.length + machineFeeds.length;

  return (
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20 overflow-hidden">
      {/* Ambient background lighting matching new-theme.md */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.06] pointer-events-none -z-10"
      />

      <div className="max-w-6xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Sitemap", href: "/sitemap" },
            ]}
          />
        </div>

        {/* ── TOP UTILITY ROW: STATUS & TELEMETRY ─────────────────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:px-4 rounded-2xl border border-border-primary bg-background/80 dark:bg-card-bg/80 backdrop-blur-xs shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] animate-pulse"
            />
            <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-text-muted">
              Live Index &bull; {totalIndexedUrls} Total Endpoints
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-text-secondary">
            <Link
              href="/sitemap.xml"
              className="hover:text-foreground hover:underline transition-colors flex items-center gap-1"
            >
              <span>sitemap.xml</span>
              <LuArrowUpRight className="w-3 h-3 text-accent-lime" />
            </Link>
            <span className="text-border-primary">&bull;</span>
            <Link
              href="/api/feed"
              className="hover:text-foreground hover:underline transition-colors flex items-center gap-1"
            >
              <span>RSS 2.0</span>
              <LuArrowUpRight className="w-3 h-3 text-accent-lime" />
            </Link>
            <span className="text-border-primary">&bull;</span>
            <Link
              href="/llms.txt"
              className="hover:text-foreground hover:underline transition-colors flex items-center gap-1"
            >
              <span>llms.txt</span>
              <LuArrowUpRight className="w-3 h-3 text-accent-lime" />
            </Link>
          </div>
        </div>

        {/* ── EDITORIAL HEADER SECTION ────────────────────────────────────────── */}
        <div className="pb-10 pt-2 border-b border-border-primary/80 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              SITE ARCHITECTURE &amp; INDEX
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
              Sitemap &amp;{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Directory
              </span>
            </h1>
            <p className="mt-3.5 text-text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
              A complete, structured index of all production case studies, engineering articles, and platform pages &mdash; verified for both humans and search engines with{" "}
              <span className="relative inline-block px-3 py-0.5 rounded-xl bg-accent-lime text-[#0A0A0A] font-black -rotate-1 shadow-xs border border-black/10 transition-transform hover:rotate-0">
                100% crawlability
              </span>
              .
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 flex-shrink-0">
            <Link
              href="/sitemap.xml"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-xs sm:text-sm font-extrabold px-6 py-3 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
            >
              <LuFileCode className="w-4 h-4 stroke-[2.5]" />
              <span>XML Sitemap</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-bold px-6 py-3 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Explore Services</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── TELEMETRY STATS COUNTER BENTO ───────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 sm:p-6 shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1.5">
              <LuCompass className="w-3.5 h-3.5 text-accent-lime" />
              Core Pages
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              {corePages.length}
            </div>
            <div className="text-xs text-text-muted mt-1">Platform destinations</div>
          </div>

          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 sm:p-6 shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1.5">
              <LuFolderGit2 className="w-3.5 h-3.5 text-accent-lime" />
              Case Studies
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              {projects.length}
            </div>
            <div className="text-xs text-text-muted mt-1">Production systems</div>
          </div>

          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 sm:p-6 shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1.5">
              <LuBookOpen className="w-3.5 h-3.5 text-accent-lime" />
              Publications
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              {blogs.length}
            </div>
            <div className="text-xs text-text-muted mt-1">Technical deep-dives</div>
          </div>

          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 sm:p-6 shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1.5">
              <LuLayers className="w-3.5 h-3.5 text-accent-lime" />
              Feeds &amp; Protocols
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              {machineFeeds.length}
            </div>
            <div className="text-xs text-text-muted mt-1">XML &bull; RSS &bull; LLMs.txt</div>
          </div>
        </div>

        {/* ── SECTION 1: CORE PLATFORM PAGES ──────────────────────────────────── */}
        <section className="mb-20" aria-label="Core Platform Pages">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-border-primary/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                PRIMARY ROUTES &bull; {corePages.length}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Core Platform Pages
              </h2>
              <p className="text-text-muted text-sm sm:text-base mt-1.5 max-w-xl leading-relaxed">
                Foundational pages covering engineering background, technical skills, services, credentials, and contact channels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {corePages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group relative rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Electric Lime Accent on Hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-6 sm:left-8 w-12 sm:w-16 h-[2px] bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-text-muted group-hover:text-accent-lime transition-colors">
                      {page.route}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border-primary bg-hover-bg/60 text-text-muted uppercase tracking-wider font-semibold">
                      {page.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-foreground/90 transition-colors mb-2">
                    {page.label}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {page.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border-primary/50 flex items-center justify-between text-xs font-bold text-foreground">
                  <span>Visit Page</span>
                  <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: PRODUCTION CASE STUDIES ──────────────────────────────── */}
        <section className="mb-20" aria-label="Selected Projects and Case Studies">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-border-primary/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                FLAGSHIP SYSTEMS &bull; {projects.length}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Projects &amp; Case Studies
              </h2>
              <p className="text-text-muted text-sm sm:text-base mt-1.5 max-w-xl leading-relaxed">
                Autonomous agents, RAG knowledge pipelines, and high-performance microservices engineered for production.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:text-accent-lime transition-colors underline-offset-4 hover:underline self-start sm:self-auto whitespace-nowrap"
            >
              <span>View all projects gallery</span>
              <LuArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-border-primary bg-background dark:bg-card-bg text-text-muted text-sm">
              No projects published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group relative rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Electric Lime Accent on Hover */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-6 sm:left-8 w-12 sm:w-16 h-[2px] bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs text-text-muted group-hover:text-accent-lime transition-colors truncate max-w-[180px]">
                        /projects/{project.slug}
                      </span>
                      {project.badge || project.category ? (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border-primary bg-hover-bg/60 text-text-muted uppercase tracking-wider font-semibold">
                          {project.badge || project.category}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-lg font-bold text-foreground group-hover:text-foreground/90 transition-colors mb-2 line-clamp-2">
                      {project.title}
                    </h3>

                    {project.excerpt && (
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {project.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-primary/50 flex items-center justify-between text-xs font-bold text-foreground">
                    <span className="font-mono text-text-muted font-normal text-[11px]">
                      {formatDate(project.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 group-hover:text-accent-lime transition-colors">
                      View Case Study
                      <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── SECTION 3: TECHNICAL PUBLICATIONS ───────────────────────────────── */}
        <section className="mb-20" aria-label="Technical Writings and Publications">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-border-primary/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                ENGINEERING ARTICLES &bull; {blogs.length}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Technical Writings
              </h2>
              <p className="text-text-muted text-sm sm:text-base mt-1.5 max-w-xl leading-relaxed">
                Architecture teardowns, RAG benchmark analyses, distributed system patterns, and AI workflows.
              </p>
            </div>

            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:text-accent-lime transition-colors underline-offset-4 hover:underline self-start sm:self-auto whitespace-nowrap"
            >
              <span>View all articles</span>
              <LuArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {blogs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-border-primary bg-background dark:bg-card-bg text-text-muted text-sm">
              No technical writings published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className="group relative rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Electric Lime Accent on Hover */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-6 sm:left-8 w-12 sm:w-16 h-[2px] bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs text-text-muted group-hover:text-accent-lime transition-colors truncate max-w-[180px]">
                        /blogs/{blog.slug}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border-primary bg-hover-bg/60 text-text-muted uppercase tracking-wider font-semibold">
                        Article
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground group-hover:text-foreground/90 transition-colors mb-2 line-clamp-2">
                      {blog.title}
                    </h3>

                    {blog.excerpt && (
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-primary/50 flex items-center justify-between text-xs font-bold text-foreground">
                    <span className="font-mono text-text-muted font-normal text-[11px]">
                      {formatDate(blog.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 group-hover:text-accent-lime transition-colors">
                      Read Article
                      <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── SECTION 4: FEEDS, COMPLIANCE & MACHINE DISCOVERY ────────────────── */}
        <section
          className="mb-20"
          aria-label="Feeds, Compliance, and Machine Discovery"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-border-primary/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                MACHINE DISCOVERY &amp; PROTOCOLS &bull; {machineFeeds.length}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Feeds &amp; Compliance Endpoints
              </h2>
              <p className="text-text-muted text-sm sm:text-base mt-1.5 max-w-xl leading-relaxed">
                Standardized machine endpoints for search crawlers, AI knowledge ingestion, and legal compliance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {machineFeeds.map((feed) => {
              const Icon = feed.icon;
              return (
                <Link
                  key={feed.href}
                  href={feed.href}
                  target={feed.isExternal ? "_blank" : undefined}
                  rel={feed.isExternal ? "noopener noreferrer" : undefined}
                  className="group relative rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Electric Lime Accent on Hover */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-6 sm:left-8 w-12 sm:w-16 h-[2px] bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg border border-border-primary bg-hover-bg flex items-center justify-center text-foreground group-hover:text-accent-lime transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-xs text-text-muted group-hover:text-accent-lime transition-colors">
                          {feed.route}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border-primary bg-hover-bg/60 text-text-muted uppercase tracking-wider font-semibold">
                        {feed.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground group-hover:text-foreground/90 transition-colors mb-2">
                      {feed.label}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {feed.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-primary/50 flex items-center justify-between text-xs font-bold text-foreground">
                    <span>{feed.isExternal ? "Open Protocol" : "View Policy"}</span>
                    {feed.isExternal ? (
                      <LuArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent-lime" />
                    ) : (
                      <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── CLIENT CONVERSION BENTO CARD ────────────────────────────────────── */}
        <div className="mt-16 relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center shadow-sm">
          {/* Subtle Ambient Electric Lime Center Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(184,255,0,0.14)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background/90 dark:bg-card-bg/90 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            LET&apos;S BUILD TOGETHER
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground max-w-2xl mx-auto mb-4 leading-tight">
            Have an AI or Backend Project in Mind?
          </h2>

          {/* Value Prop */}
          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Whether you need to architect autonomous agents, scale a custom RAG pipeline, or engineer resilient backend microservices &mdash; let&apos;s build systems that{" "}
            <span className="relative inline-block px-3 py-0.5 rounded-xl bg-accent-lime text-[#0A0A0A] font-black -rotate-1 shadow-xs border border-black/10 transition-transform hover:rotate-0">
              scale reliably
            </span>
            .
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-8 py-3.5 shadow-xs hover:shadow-[0_0_24px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <LuMail className="w-4 h-4 stroke-[2.5]" />
              <span>Start a Conversation</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-8 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all cursor-pointer"
            >
              <span>Explore Services</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Reassurance Features */}
          <div className="pt-6 border-t border-border-primary/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-foreground dark:text-accent-lime text-sm stroke-[2.5]" />
              Direct Engineer Access
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-foreground dark:text-accent-lime text-sm stroke-[2.5]" />
              Fixed-Milestone Proposals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-foreground dark:text-accent-lime text-sm stroke-[2.5]" />
              100% Repository &amp; IP Transfer
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
