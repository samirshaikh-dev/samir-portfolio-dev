import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import HowIWork from "@/components/HowIWork";
import TestimonialsSection from "@/components/TestimonialsSection";
import { APP_URL, AUTHOR_EMAIL } from "@/lib/site-config";
import {
  getServiceJsonLd,
  getSpeakableJsonLd,
  LONGTAIL_KEYWORDS,
} from "@/lib/seo/structured-data";
import {
  SERVICE_CATEGORIES,
  PROCESS_STEPS,
  ENGAGEMENT_MODELS,
  SERVICES_FAQS,
} from "@/lib/data/services";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Freelance AI Developer, Backend Engineer & Codebase Rescue | Samir Shaikh",
  description:
    "Hire Samir Shaikh — freelance AI developer, backend engineer & Forward Deployed Engineer. Codebase audits, emergency rescue sprints, SaaS AI augmentation, performance optimization, and custom Next.js web applications.",
  keywords: [
    ...LONGTAIL_KEYWORDS.slice(0, 15),
    "codebase audit service",
    "fix broken MVP developer",
    "codebase rescue developer",
    "add AI to existing SaaS",
    "freelance backend developer retainer",
    "slow database query optimization",
    "WhatsApp API integration developer",
    "freelance AI developer",
    "freelance AI engineer",
    "freelance website developer",
    "website developer for business",
    "custom website development",
    "SEO optimization services",
    "website speed optimization",
    "AI chatbot for website",
    "AI chatbot for SaaS",
    "custom knowledge base AI",
    "production-grade AI chatbot",
    "Forward Deployed Engineer",
    "hire freelance AI developer",
    "AI agent development services",
    "backend API development services",
    "full-stack web development services",
    "local business website developer",
  ],
  alternates: {
    canonical: `${APP_URL}/services`,
  },
  openGraph: {
    title: "Freelance AI Developer, Backend Engineer & Codebase Rescue | Samir Shaikh",
    description:
      "Hire Samir Shaikh — freelance AI developer, backend engineer & Forward Deployed Engineer. Codebase audits, emergency rescue sprints, SaaS AI augmentation, performance optimization, and custom Next.js web applications.",
    url: `${APP_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance AI Developer, Backend Engineer & Codebase Rescue | Samir Shaikh",
    description:
      "Hire Samir Shaikh — freelance AI developer, backend engineer & Forward Deployed Engineer. Codebase audits, emergency rescue sprints, SaaS AI augmentation, performance optimization, and custom Next.js web applications.",
  },
};

export default function ServicesPage() {
  const serviceJsonLd = getServiceJsonLd();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SERVICES_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-24 overflow-hidden">
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

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSpeakableJsonLd(["h1", "h2", ".service-desc"])),
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        {/* Breadcrumbs */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
            ]}
          />
        </div>

        {/* Editorial Section Hero Header */}
        <header className="mb-10 sm:mb-12 pb-8 border-b border-border-primary/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            ENGINEERING SERVICES &amp; CONSULTING
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] text-foreground">
            Freelance AI &amp; Engineering
            <span
              className="block sm:inline font-normal italic text-text-secondary sm:ml-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              — Services
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Add AI to existing products, rescue broken MVPs, audit inherited codebases, tune slow backends, and scale with dedicated retainers.
          </p>
        </header>

        {/* Hero Value Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-10 mb-12 shadow-2xs hover:border-foreground/30 hover:shadow-md transition-all duration-300 group">
          <span
            aria-hidden="true"
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_6px_rgba(184,255,0,0.7)]"
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-border-primary bg-hover-bg text-text-secondary mb-4 shadow-2xs">
                <span className="w-2 h-2 rounded-full animate-pulse bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]" />
                Available for Audits, Rescue Sprints, Feature Builds &amp; Retainers
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4 leading-tight">
                Audit, rescue, scale, or augment your software with{" "}
                <span className="relative inline-block px-3 py-0.5 rounded-xl bg-accent-lime text-[#0A0A0A] font-black -rotate-1 shadow-xs border border-black/10">
                  production-grade AI
                </span>
              </h2>

              <p className="service-desc text-text-secondary text-sm sm:text-base leading-relaxed">
                Whether you need to add an AI chatbot or smart search to an existing SaaS, rescue an MVP after a developer disappeared, audit an inherited codebase, optimize slow API queries, or hire an embedded backend engineer on retainer — I deliver clean, tested TypeScript code committed directly to your repository.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-7 py-3.5 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
              >
                Discuss a Project →
              </Link>
              <a
                href={`mailto:${AUTHOR_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-7 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all text-center"
              >
                Email Directly
              </a>
            </div>
          </div>
        </div>

        {/* Pricing & Delivery Guarantee Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs">
            <span className="w-8 h-8 rounded-full bg-accent-lime/20 dark:bg-accent-lime/20 text-foreground dark:text-accent-lime flex items-center justify-center font-bold text-xs flex-shrink-0">
              ✓
            </span>
            <div>
              <p className="text-xs font-bold text-foreground">3–5 Day Codebase Audit</p>
              <p className="text-[11px] text-text-muted mt-0.5">Low-risk fixed-price assessment before committing to larger work</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs">
            <span className="w-8 h-8 rounded-full bg-accent-lime/20 dark:bg-accent-lime/20 text-foreground dark:text-accent-lime flex items-center justify-center font-bold text-xs flex-shrink-0">
              ✓
            </span>
            <div>
              <p className="text-xs font-bold text-foreground">48h Scope &amp; Rapid Triage</p>
              <p className="text-[11px] text-text-muted mt-0.5">Clear milestone proposals or immediate emergency fix-it responses</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs">
            <span className="w-8 h-8 rounded-full bg-accent-lime/20 dark:bg-accent-lime/20 text-foreground dark:text-accent-lime flex items-center justify-center font-bold text-xs flex-shrink-0">
              ✓
            </span>
            <div>
              <p className="text-xs font-bold text-foreground">100% Code &amp; IP Ownership</p>
              <p className="text-[11px] text-text-muted mt-0.5">Committed directly to your private GitHub or GitLab repos</p>
            </div>
          </div>
        </div>

        {/* Service Categories Section */}
        <div className="mb-20 space-y-20">
          {SERVICE_CATEGORIES.map((category, catIdx) => (
            <section key={category.id} id={category.id} aria-labelledby={`category-heading-${category.id}`}>
              {/* Category Header */}
              <div className="mb-8 pb-4 border-b border-border-primary/80">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase mb-2 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                  CATEGORY {String(catIdx + 1).padStart(2, "0")}
                </div>
                <h2
                  id={`category-heading-${category.id}`}
                  className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-1"
                >
                  {category.title}
                </h2>
                <p className="text-sm text-text-secondary mt-1.5 max-w-2xl leading-relaxed">
                  {category.subtitle}
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.services.map((service) => (
                  <article
                    key={service.id}
                    id={service.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8 hover:border-foreground/30 hover:shadow-md transition-all duration-300 shadow-2xs overflow-hidden"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_6px_rgba(184,255,0,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-text-muted tracking-wider uppercase">
                          {service.badge}
                        </span>
                        {service.startingPrice && (
                          <span className="font-mono text-xs font-bold px-3 py-0.5 rounded-full bg-hover-bg text-foreground border border-border-primary dark:border-accent-lime/30 dark:text-accent-lime shadow-2xs">
                            {service.startingPrice}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-foreground mb-2 group-hover:text-text-secondary transition-colors">
                        <Link
                          href={`/services/${service.id}`}
                          className="hover:text-foreground dark:hover:text-accent-lime transition-colors"
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-xs font-mono text-text-muted mb-4 italic">
                        {service.tagline}
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-foreground mb-3 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                          Key Deliverables
                        </h4>
                        <ul className="space-y-2">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-text-muted">
                              <span className="text-foreground dark:text-accent-lime font-bold mt-0.5">✓</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-primary mb-5">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-hover-bg border border-border-primary/80 text-text-muted font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <Link
                          href={`/services/${service.id}`}
                          className="text-xs font-mono font-bold text-foreground hover:text-text-secondary dark:hover:text-accent-lime underline underline-offset-4 decoration-border-primary inline-flex items-center gap-1 transition-colors"
                        >
                          View Scope & Architecture →
                        </Link>
                        <Link
                          href={`/contact?service=${encodeURIComponent(service.id)}&scope=standard`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs font-extrabold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xs dark:shadow-[0_0_12px_rgba(184,255,0,0.35)] ml-auto"
                        >
                          Request quote →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 4-Stage Delivery Process */}
        <section aria-labelledby="process-heading" className="mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase mb-2 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              STRUCTURED ENGAGEMENT
            </div>
            <h2 id="process-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-1">
              Engineering Delivery Process
            </h2>
            <p className="text-sm text-text-secondary mt-1.5 max-w-2xl leading-relaxed">
              A structured, low-friction engineering process designed to eliminate ambiguity and deliver dependable software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="group relative rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 flex flex-col justify-between hover:border-foreground/30 hover:shadow-md transition-all duration-300 shadow-2xs"
              >
                <div>
                  <span className="font-mono text-3xl font-black text-text-secondary/30 block mb-3 group-hover:text-foreground/40 transition-colors">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Models */}
        <section aria-labelledby="engagement-models-heading" className="mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase mb-2 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              FLEXIBLE COLLABORATION
            </div>
            <h2 id="engagement-models-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-1">
              Engagement Models
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.title}
                className="group relative rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8 flex flex-col justify-between hover:border-foreground/30 hover:shadow-md transition-all duration-300 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full border border-border-primary text-text-muted font-semibold uppercase tracking-wider inline-block">
                      {model.badge}
                    </span>
                    {model.startingPrice && (
                      <span className="font-mono text-xs font-bold text-foreground dark:text-accent-lime">
                        {model.startingPrice}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                    {model.title}
                  </h3>
                  <p className="text-xs text-text-muted mb-6">
                    {model.subtitle}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {model.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime mt-1.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="w-full text-center py-2.5 px-4 rounded-full border border-border-primary bg-background dark:bg-card-bg hover:bg-hover-bg hover:border-foreground/30 text-xs font-mono font-bold text-foreground transition-all shadow-2xs"
                >
                  Inquire Now →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* How I Work Section */}
        <div className="mb-20">
          <HowIWork variant="full" />
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <TestimonialsSection variant="services" />
        </div>

        {/* Services FAQ */}
        <section aria-labelledby="faq-heading" className="mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase mb-2 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              QUESTIONS &amp; ANSWERS
            </div>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8 divide-y divide-border-primary shadow-2xs">
            {SERVICES_FAQS.map((faq, idx) => (
              <div key={idx} className="py-6 first:pt-0 last:pb-0">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final High-Impact CTA Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center shadow-2xs">
          <span
            aria-hidden="true"
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_6px_rgba(184,255,0,0.7)]"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3">
            Have a project or opportunity in mind?
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you need a 3–5 day codebase audit, emergency bug rescue, AI chatbot for your SaaS, or a dedicated backend engineer on retainer, let&apos;s talk through your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent-lime text-[#0A0A0A] font-extrabold text-sm shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get in Touch →
            </Link>
            <Link
              href="/resume"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground font-bold text-sm hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all"
            >
              View Full Resume
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
