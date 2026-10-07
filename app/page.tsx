import Hero from "@/components/home/Hero";
import HowIWork from "@/components/HowIWork";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToAction from "@/components/home/CallToAction";
import { getSpeakableJsonLd } from "@/lib/seo/structured-data";
import Link from "next/link";
import ProjectList, { Project } from "@/components/projects/ProjectList";
import BlogList from "@/components/blogs/BlogList";
import { getCachedHomepageProjects, getCachedHomepageBlogs } from "@/lib/cache";

export const revalidate = 3600;

export default async function Home() {
  const [projects, blogs] = await Promise.all([
    getCachedHomepageProjects() as Promise<Project[]>,
    getCachedHomepageBlogs(),
  ]);

  return (
    <main className="flex flex-col flex-1">
      {/* 1. Hero & Verified Velocity Bento Telemetry */}
      <Hero />

      {/* 2. Flagship Systems & Case Studies */}
      {projects.length > 0 && (
        <section
          id="case-studies"
          className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-border-primary/80"
          aria-label="Selected work and case studies"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 pb-4 border-b border-border-primary/80 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                  FLAGSHIP SYSTEMS
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
                  Selected Work &amp; Case Studies
                </h2>
                <p className="text-text-muted text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
                  Production-grade AI systems, high-throughput backends, and full-stack applications.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-text-secondary transition-colors group flex-shrink-0"
              >
                View all work
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <ProjectList initialProjects={projects} hideSearch />

            <div className="mt-8 flex justify-center sm:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-foreground px-5 py-2.5 border border-border-primary rounded-full bg-background shadow-xs hover:bg-hover-bg transition-colors"
              >
                View all work &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. Engineering Workflow (Process) */}
      <HowIWork variant="compact" />

      {/* 4. Client & Peer Endorsements (Social Proof) */}
      <TestimonialsSection variant="homepage" />

      {/* 5. Recent Writings (Thought Leadership) */}
      <section
        className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-border-primary/80"
        aria-label="Recent engineering writings"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 pb-4 border-b border-border-primary/80 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                TECHNICAL WRITINGS
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
                Recent Writings
              </h2>
              <p className="text-text-muted text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
                Thoughts on engineering, AI, and software development.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-text-secondary transition-colors group flex-shrink-0"
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

          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-bold text-foreground px-5 py-2.5 border border-border-primary rounded-full bg-background shadow-xs hover:bg-hover-bg transition-colors"
            >
              View all posts &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 6. High-Impact Closing CTA Banner */}
      <CallToAction />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSpeakableJsonLd(["h1", "h2", ".hero-intro"])),
        }}
      />
    </main>
  );
}
