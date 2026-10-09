import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { getCachedProjects, getCachedBlogs, getCachedSocials } from "@/lib/cache";
import { AUTHOR_NAME } from "@/lib/site-config";
import { SocialIcon } from "@/components/SocialIcons";

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blogs" },
  { label: "Services", href: "/services" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

const legalLinks = [
  { label: "Sitemap", href: "/sitemap" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-of-service" },
];

const MAX_ITEMS = 5;

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const MICRO_LABEL =
  "font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted sm:text-[11px]";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`group inline-flex max-w-full items-start gap-1 rounded-sm text-sm leading-relaxed text-text-secondary transition-colors duration-200 hover:text-foreground motion-reduce:transition-none ${FOCUS_RING}`}
    >
      <span className="line-clamp-2 break-words">{children}</span>
      <span
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-xs leading-none text-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-accent-lime motion-reduce:transform-none motion-reduce:transition-none"
      >
        ›
      </span>
    </Link>
  );
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`group mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-foreground transition-colors duration-200 hover:text-foreground dark:text-accent-lime motion-reduce:transition-none ${FOCUS_RING}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
      >
        →
      </span>
    </Link>
  );
}

export default async function Footer() {
  const [projects, blogs, socials] = await Promise.all([
    getCachedProjects(),
    getCachedBlogs(),
    getCachedSocials(),
  ]);

  const visibleProjects = projects.slice(0, MAX_ITEMS);
  const hasMoreProjects = projects.length > MAX_ITEMS;

  const visibleBlogs = blogs.slice(0, MAX_ITEMS);
  const hasMoreBlogs = blogs.length > MAX_ITEMS;

  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-border-primary bg-footer-bg">
      {/* Atmospheric depth: ambient lime glow + geometric dot matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(184,255,0,0.16)_0%,transparent_65%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] sm:h-[550px] sm:w-[550px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.07]"
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10 md:py-20">
        {/* ── Brand + Navigation Bento ─────────────────────────────────── */}
        <div className="grid overflow-hidden rounded-3xl border border-border-primary bg-background lg:grid-cols-12 dark:bg-card-bg">
          {/* Brand */}
          <div className="flex flex-col items-start gap-5 p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-border-primary">
            <Link
              href="/"
              className={`inline-flex rounded-2xl ${FOCUS_RING}`}
              aria-label="Samir Shaikh — back to homepage"
            >
              <span className="relative block h-14 w-14 overflow-hidden rounded-2xl border border-border-primary bg-background p-1 dark:bg-card-bg">
                <Image
                  src="/Logo.svg"
                  alt=""
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none dark:invert"
                  sizes="56px"
                />
              </span>
            </Link>

            <div>
              <p className="text-2xl font-black leading-tight tracking-tight text-foreground sm:text-3xl">
                {AUTHOR_NAME}
              </p>
              <span
                aria-hidden="true"
                className="mt-2.5 block h-px w-12 bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.5)]"
              />
            </div>

            <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-text-muted">
              AI Backend Engineer &amp; Full Stack Developer building production AI agents, custom RAG systems, and scalable backends.
            </p>

            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-2.5">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      aria-label={`${social.name} (opens in a new tab)`}
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-background text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-hover-bg hover:text-foreground hover:shadow-sm dark:bg-card-bg motion-reduce:transform-none motion-reduce:transition-none ${FOCUS_RING}`}
                    >
                      <SocialIcon name={social.name} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 p-6 sm:grid-cols-3 sm:p-8 lg:col-span-7"
          >
            {/* Pages */}
            <div className="min-w-0">
              <h2 className={`${MICRO_LABEL} mb-4`}>Pages</h2>
              <ul className="flex flex-col gap-2.5">
                {pageLinks.map(({ label, href }) => (
                  <li key={href}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div className="min-w-0">
              <h2 className={`${MICRO_LABEL} mb-4`}>Projects</h2>
              {visibleProjects.length === 0 ? (
                <p className="text-sm italic text-text-muted">No projects yet</p>
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {visibleProjects.map((project) => (
                    <li key={project.slug}>
                      <FooterLink href={`/projects/${project.slug}`}>{project.title}</FooterLink>
                    </li>
                  ))}
                  {hasMoreProjects && (
                    <li>
                      <ArrowLink href="/projects">More</ArrowLink>
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Blog */}
            <div className="min-w-0">
              <h2 className={`${MICRO_LABEL} mb-4`}>Blog</h2>
              {visibleBlogs.length === 0 ? (
                <p className="text-sm italic text-text-muted">No posts yet</p>
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {visibleBlogs.map((blog) => (
                    <li key={blog.slug}>
                      <FooterLink href={`/blogs/${blog.slug}`}>{blog.title}</FooterLink>
                    </li>
                  ))}
                  {hasMoreBlogs && (
                    <li>
                      <ArrowLink href="/blogs">More</ArrowLink>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </nav>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border-primary pt-6 sm:flex-row">
          <p className={`${MICRO_LABEL} text-center sm:text-left`}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {legalLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`inline-flex items-center rounded-full border border-border-primary px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-secondary transition-colors duration-200 hover:border-foreground/30 hover:bg-hover-bg hover:text-foreground motion-reduce:transition-none sm:text-[11px] ${FOCUS_RING}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
