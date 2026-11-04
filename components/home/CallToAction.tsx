import Link from "next/link";
import { AUTHOR_EMAIL, LINKEDIN_URL, GITHUB_URL } from "@/lib/site-config";
import { FiArrowRight, FiFileText, FiLinkedin, FiGithub, FiMail } from "react-icons/fi";

export default function CallToAction() {
  return (
    <section
      className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-border-primary/80"
      aria-label="Direct collaboration and hiring inquiry"
    >
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl md:rounded-3xl border border-border-primary/80 bg-background dark:bg-card-bg p-8 sm:p-12 md:p-16 shadow-2xs">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              <span>07 / GET IN TOUCH</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.08] mb-4">
              Have a problem worth solving?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed">
              Whether you&apos;re building a new product, improving an existing system, or looking for an engineer to join your team &mdash; I&apos;d be happy to discuss it.
            </p>
          </div>

          {/* Dual-Audience Conversion Paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-border-primary/80">
            {/* Path 1: For Hiring & Engineering Teams */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-hover-bg/30 border border-border-primary/70">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-bold block mb-2">
                  Path 01 &bull; Engineering Teams &amp; Recruiters
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-2">
                  Hiring an Engineer?
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                  Available for full-time engineering roles (AI Backend / Full Stack / FDE) and contract sprints. Direct communication, honest estimations, and zero hand-waving.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border-primary/50">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
                >
                  <FiFileText className="w-3.5 h-3.5" />
                  <span>View Résumé</span>
                </Link>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs font-bold hover:bg-hover-bg transition-colors"
                >
                  <FiLinkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`mailto:${AUTHOR_EMAIL}?subject=Engineering%20Opportunity`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground text-xs font-semibold hover:bg-hover-bg transition-colors"
                >
                  <FiMail className="w-3.5 h-3.5" />
                  <span>Email Directly</span>
                </a>
              </div>
            </div>

            {/* Path 2: For Founders & Client Projects */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-hover-bg/30 border border-border-primary/70">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-bold block mb-2">
                  Path 02 &bull; Founders &amp; Startups
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-2">
                  Building a Product?
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                  Need a resilient backend, custom RAG knowledge base, or full-stack MVP? Let&apos;s evaluate the architecture, edge cases, and technical feasibility together.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border-primary/50">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
                >
                  <span>Discuss a Project</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs font-bold hover:bg-hover-bg transition-colors"
                >
                  <FiGithub className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={`mailto:${AUTHOR_EMAIL}?subject=Project%20Inquiry`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground text-xs font-semibold hover:bg-hover-bg transition-colors"
                >
                  <FiMail className="w-3.5 h-3.5" />
                  <span>Email Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Reassurance Footer */}
          <div className="mt-10 pt-6 border-t border-border-primary/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime" />
              <span>Worldwide Remote &bull; GMT+5:30 (Flexible Overlap)</span>
            </div>
            <div>
              <span>Verified Identity: Samir Shaikh &bull; {AUTHOR_EMAIL}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
