import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL, AUTHOR_EMAIL, AUTHOR_PHONE, LINKEDIN_URL, GITHUB_URL } from "@/lib/site-config";
import { getContactPageJsonLd } from "@/lib/seo/structured-data";
import {
  LuMail,
  LuShield,
  LuClock,
  LuCheck,
  LuArrowRight,
  LuCalendar,
  LuTerminal,
  LuGlobe,
} from "react-icons/lu";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Samir Shaikh | AI Backend Engineer & Full Stack Developer",
  description:
    "Get in touch with Samir Shaikh. Direct engineer communication for full-time remote engineering roles, production RAG pipelines, autonomous AI agents, and high-throughput backends. Replies within 12–24 hours.",
  keywords: [
    "contact Samir Shaikh",
    "hire AI backend engineer",
    "hire AI SDE",
    "hire full stack developer",
    "hire Node.js developer",
    "remote AI developer",
    "RAG engineer contact",
    "pgvector developer",
    "contract AI backend engineer",
    "hire freelance AI developer",
  ],
  alternates: {
    canonical: `${APP_URL}/contact`,
  },
  openGraph: {
    title: "Contact Samir Shaikh | AI Backend Engineer & Full Stack Developer",
    description:
      "Get in touch with Samir Shaikh. Available for full-time remote roles, production AI agents, 3072d vector retrieval architectures, and backend microservices.",
    url: `${APP_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Samir Shaikh | AI Backend Engineer & Full Stack Developer",
    description:
      "Direct technical inquiries for full-time remote roles, AI architecture sprints, and codebase audits.",
  },
};

const GUARANTEES = [
  {
    icon: <LuClock className="w-4 h-4 text-accent-lime shrink-0" />,
    title: "12–24h Direct Response",
    detail: "Every inquiry receives a technical reply directly from Samir.",
  },
  {
    icon: <LuShield className="w-4 h-4 text-accent-lime shrink-0" />,
    title: "Mutual NDA Protected",
    detail: "Confidentiality guaranteed prior to reviewing proprietary codebases.",
  },
  {
    icon: <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />,
    title: "100% IP & Code Transfer",
    detail: "All commits, documentation, and repositories belong entirely to you.",
  },
];

const DIRECT_CHANNELS = [
  {
    label: "Email",
    value: AUTHOR_EMAIL,
    href: `mailto:${AUTHOR_EMAIL}`,
    icon: <LuMail className="w-4 h-4 text-foreground dark:text-accent-lime" />,
    detail: "Direct technical inbox &bull; 12–24h response",
  },
  {
    label: "WhatsApp",
    value: AUTHOR_PHONE,
    href: `https://wa.me/${AUTHOR_PHONE.replace(/[^0-9]/g, "")}`,
    icon: <FaWhatsapp className="w-4 h-4 text-[#25D366]" />,
    detail: "Fastest channel for quick questions & async check-ins",
  },
  {
    label: "LinkedIn",
    value: "in/samirshaikh-dev",
    href: LINKEDIN_URL,
    icon: <FaLinkedin className="w-4 h-4 text-foreground dark:text-accent-lime" />,
    detail: "Recruiter reachouts & full-time role inquiries",
  },
  {
    label: "GitHub",
    value: "github.com/samirshaikh-dev",
    href: GITHUB_URL,
    icon: <FaGithub className="w-4 h-4 text-foreground dark:text-accent-lime" />,
    detail: "Verify public repositories, commits & architecture",
  },
];

const NEXT_STEPS = [
  {
    step: "01",
    title: "Inquiry Transmission",
    detail: "Submit role or project parameters. Instant email confirmation dispatched.",
  },
  {
    step: "02",
    title: "Technical Feasibility Review",
    detail: "Within 12–24h, Samir evaluates stack compatibility, deliverables, and timelines.",
  },
  {
    step: "03",
    title: "20-Minute Intro Screen",
    detail: "Direct video call to align on technical architecture, scope, or team culture.",
  },
  {
    step: "04",
    title: "Execution Roadmap",
    detail: "Fixed milestone proposal or standard contract onboarding (Deel/W-8BEN).",
  },
];

export default function ContactPage() {
  const contactJsonLd = getContactPageJsonLd();

  return (
    <main id="main-content" className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <div className="max-w-6xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
          />
        </div>

        {/* ── EDITORIAL HEADER ────────────────────────────────────────────── */}
        <header className="pb-10 pt-2 border-b border-border-primary mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            DIRECT TECHNICAL COMMUNICATION &bull; AVAILABILITY
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Start a Technical Conversation
          </h1>
          <p className="mt-2 text-base sm:text-lg font-mono text-accent-lime font-bold">
            Full-Time Remote Roles &bull; AI Architecture Sprints &bull; Codebase Audits
          </p>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
            Reach out directly. Every inquiry receives a direct technical response from Samir within
            12–24 hours. No sales intermediaries, automated recruitment filters, or account managers.
          </p>
        </header>

        {/* ── 3-POINT RISK REVERSAL COMMITMENT STRIP ───────────────────────── */}
        <section aria-label="Working guarantees" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {GUARANTEES.map((g) => (
            <div
              key={g.title}
              className="p-4 rounded-xl border border-border-primary bg-background dark:bg-card-bg flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-hover-bg border border-border-primary flex items-center justify-center shrink-0 mt-0.5">
                {g.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold text-foreground">{g.title}</h3>
                <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">{g.detail}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── MAIN WORKSPACE: FORM + COMPREHENSIVE SIDEBAR ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12 items-start">
          {/* Primary Column: Contact Form */}
          <section
            aria-labelledby="form-heading"
            className="lg:col-span-3 rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8"
          >
            <div className="mb-6 pb-4 border-b border-border-primary">
              <h2 id="form-heading" className="text-xl font-black tracking-tight text-foreground">
                Submit an Inquiry or Role Description
              </h2>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Fields marked with <span className="text-accent-lime">*</span> are required. Your
                information is kept strictly private under NDA upon request.
              </p>
            </div>

            <ContactForm />
          </section>

          {/* Secondary Column: Sidebar Specification & Reassurance ─────────── */}
          <aside aria-label="Direct channels and hiring parameters" className="lg:col-span-2 space-y-6">
            {/* Direct Communication Channels */}
            <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted font-bold">
                  Direct Channels
                </h2>
              </div>

              <div className="space-y-3">
                {DIRECT_CHANNELS.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={ch.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-border-primary bg-hover-bg/30 hover:border-foreground/30 hover:bg-hover-bg transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg border border-border-primary bg-background dark:bg-card-bg flex items-center justify-center shrink-0">
                      {ch.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                        {ch.label}
                      </div>
                      <div className="text-xs font-bold text-foreground truncate group-hover:text-text-secondary transition-colors">
                        {ch.value}
                      </div>
                      <div
                        className="text-[10px] text-text-muted truncate mt-0.5"
                        dangerouslySetInnerHTML={{ __html: ch.detail }}
                      />
                    </div>
                    <LuArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* What to Expect Timeline */}
            <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted font-bold">
                  What to Expect
                </h2>
              </div>

              <ol className="space-y-4" aria-label="Response process">
                {NEXT_STEPS.map((s, idx, arr) => (
                  <li key={s.step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                      <span className="w-6 h-6 rounded-md bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] flex items-center justify-center text-[10px] font-mono font-black">
                        {s.step}
                      </span>
                      {idx < arr.length - 1 && (
                        <span aria-hidden="true" className="w-px flex-1 min-h-[16px] bg-border-primary" />
                      )}
                    </div>
                    <div className="pt-0.5">
                      <p className="text-xs font-bold text-foreground">{s.title}</p>
                      <p className="text-[11px] text-text-secondary mt-0.5 leading-snug">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Current Availability & Legal Status */}
            <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-border-primary">
                <span className="w-2 h-2 rounded-full bg-accent-lime shrink-0" />
                <h2 className="text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                  Availability Snapshot
                </h2>
              </div>

              <div className="space-y-2 text-xs text-text-secondary leading-relaxed">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted font-mono text-[11px]">Notice Period:</span>
                  <span className="font-bold text-foreground">Immediate (0 Days)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted font-mono text-[11px]">Primary Focus:</span>
                  <span className="font-bold text-foreground">Full-Time Remote</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted font-mono text-[11px]">Timezone Sync:</span>
                  <span className="font-bold text-foreground">4–6h US/EU Overlap</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted font-mono text-[11px]">Contracts:</span>
                  <span className="font-bold text-foreground">Deel &bull; W-8BEN Ready</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
