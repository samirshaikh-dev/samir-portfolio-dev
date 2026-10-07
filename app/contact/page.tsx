import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL, AUTHOR_EMAIL, AUTHOR_PHONE, LINKEDIN_URL, GITHUB_URL } from "@/lib/site-config";
import { getContactPageJsonLd } from "@/lib/seo/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact | Samir Shaikh — Freelance AI Developer (Backend-First)",
  description:
    "Get in touch with Samir Shaikh — freelance AI developer (backend-first) available for freelance projects, contract sprints, and engineering roles. Reach out via email or the contact form.",
  keywords: [
    "contact Samir Shaikh",
    "hire freelance AI engineer",
    "hire freelance backend developer",
    "hire full stack developer",
    "hire Node.js developer",
    "hire AI backend developer",
    "freelance backend developer",
    "freelance AI backend developer",
    "remote backend developer",
    "remote AI backend developer",
    "backend developer available for hire",
    "AI engineer for hire",
    "contract backend engineer",
    "contract AI backend engineer",
    "work with Samir Shaikh",
    "backend development services",
  ],
  alternates: {
    canonical: `${APP_URL}/contact`,
  },
  openGraph: {
    title: "Contact | Samir Shaikh",
    description:
      "Get in touch with Samir Shaikh — open to remote roles, contract work, and collaborations in AI backend and Forward Deployed Engineering.",
    url: `${APP_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Samir Shaikh",
    description:
      "Get in touch with Samir Shaikh — open to remote roles, freelance work, and collaborations.",
  },
};

const GUARANTEES = [
  {
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Fixed-price quote within 48h",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: "NDA signed before code review",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: "30-day post-launch warranty",
  },
];

const NEXT_STEPS = [
  { step: "01", label: "You submit", detail: "I receive your message instantly" },
  { step: "02", label: "I reply in 24h", detail: "With a scheduling link for a call" },
  { step: "03", label: "Free 30-min call", detail: "We align on scope & timeline" },
  { step: "04", label: "Fixed quote", detail: "Milestone proposal within 48h" },
];

const DIRECT_CHANNELS = [
  {
    label: "Email",
    value: AUTHOR_EMAIL,
    href: `mailto:${AUTHOR_EMAIL}`,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    detail: "Replies within 24–48h",
  },
  {
    label: "WhatsApp",
    value: AUTHOR_PHONE,
    href: `https://wa.me/${AUTHOR_PHONE.replace(/[^0-9]/g, "")}`,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    detail: "Fastest response channel",
  },
  {
    label: "LinkedIn",
    value: "samirshaikh-dev",
    href: LINKEDIN_URL,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    detail: "Professional inquiries",
  },
  {
    label: "GitHub",
    value: "samirshaikh-dev",
    href: GITHUB_URL,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    detail: "Open source & code reviews",
  },
];

export default function ContactPage() {
  const contactJsonLd = getContactPageJsonLd();

  return (
    <main id="main-content" className="relative flex flex-col flex-1 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* Atmospheric Background Layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(184,255,0,0.14)_0%,transparent_65%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(184,255,0,0.07)_0%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.025] dark:opacity-[0.055]"
      />

      <div className="relative px-5 sm:px-8 md:px-10 pb-20 pt-6 md:pt-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
          />

          {/* Hero Header */}
          <div className="mt-8 mb-12 md:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)] animate-pulse" />
              AVAILABLE FOR NEW PROJECTS
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.08] mb-4">
              Let&apos;s Build{" "}
              <span className="font-serif italic font-normal text-text-secondary">
                Something
              </span>
              <br />
              <span className="font-serif italic font-normal text-text-secondary">
                That Scales.
              </span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed">
              Tell me about your project. I reply within{" "}
              <span className="font-semibold text-foreground">24–48 hours</span> with a free
              30-minute discovery call — no commitment required.
            </p>
          </div>

          {/* Hidden SEO content */}
          <p className="sr-only">
            Looking to hire a freelance AI developer for an AI project, RAG pipeline, or custom agent workflow? Need scalable backend infrastructure or end-to-end full stack delivery for your SaaS product? Samir Shaikh is available for freelance projects, contract sprints, and remote engineering roles.
          </p>

          {/* Main Grid: Form + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">
            {/* Contact Form — Primary Column */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl sm:rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8 shadow-2xs">
                {/* Form header */}
                <div className="mb-6 pb-4 border-b border-border-primary/60">
                  <h2 className="text-lg font-black tracking-tight text-foreground">
                    Send an Inquiry
                  </h2>
                  <p className="text-xs text-text-muted mt-1">
                    Fields marked with * are required. Your details are never sold or shared.
                  </p>
                </div>

                {/* Guarantee pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {GUARANTEES.map((g) => (
                    <span
                      key={g.label}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-text-secondary shadow-2xs"
                    >
                      <span className="text-foreground dark:text-accent-lime">{g.icon}</span>
                      {g.label}
                    </span>
                  ))}
                </div>

                <ContactForm />
              </div>
            </div>

            {/* Sidebar: Direct Channels + What Happens Next */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Direct Contact Channels */}
              <div className="rounded-2xl sm:rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-7 shadow-2xs">
                <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-border-primary/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                  <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted font-bold">
                    Direct Channels
                  </h2>
                </div>

                <div className="space-y-3">
                  {DIRECT_CHANNELS.map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={channel.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className="group flex items-center gap-3.5 p-3.5 rounded-2xl border border-border-primary/60 hover:border-foreground/30 hover:bg-hover-bg transition-all duration-200"
                    >
                      <span className="w-9 h-9 rounded-xl border border-border-primary bg-hover-bg/50 flex items-center justify-center text-text-secondary group-hover:text-foreground group-hover:border-foreground/30 transition-colors flex-shrink-0 dark:group-hover:text-accent-lime">
                        {channel.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-0.5">
                          {channel.label}
                        </div>
                        <div className="text-xs font-semibold text-foreground truncate group-hover:text-text-secondary transition-colors">
                          {channel.value}
                        </div>
                        <div className="text-[11px] text-text-muted">{channel.detail}</div>
                      </div>
                      <svg
                        className="w-3.5 h-3.5 text-text-muted group-hover:text-foreground group-hover:translate-x-0.5 transition-all flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* What Happens Next */}
              <div className="rounded-2xl sm:rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-7 shadow-2xs">
                <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-border-primary/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                  <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted font-bold">
                    What Happens Next
                  </h2>
                </div>

                <ol className="space-y-4" aria-label="After you submit the form">
                  {NEXT_STEPS.map((item, i, arr) => (
                    <li key={item.step} className="flex items-start gap-3">
                      {/* Step number + vertical connector */}
                      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                        <span className="w-7 h-7 rounded-full bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] flex items-center justify-center text-[10px] font-black font-mono">
                          {item.step}
                        </span>
                        {i < arr.length - 1 && (
                          <span aria-hidden="true" className="w-px flex-1 min-h-[18px] bg-border-primary/60" />
                        )}
                      </div>
                      <div className="pt-0.5">
                        <p className="text-sm font-bold text-foreground leading-tight">{item.label}</p>
                        <p className="text-xs text-text-muted mt-0.5 leading-snug">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Availability Callout */}
              <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 shadow-2xs relative overflow-hidden">
                <span
                  aria-hidden="true"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]"
                />
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-text-muted">
                    Current Availability
                  </span>
                </div>
                <p className="text-sm font-black text-foreground tracking-tight">
                  Open to Freelance &amp; Contracts
                </p>
                <p className="text-xs text-text-secondary mt-1 leading-snug">
                  Available for projects starting immediately. Remote-first, worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
