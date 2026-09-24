import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import HowIWork from "@/components/HowIWork";
import TestimonialsSection from "@/components/TestimonialsSection";
import { APP_URL, AUTHOR_EMAIL } from "@/lib/site-config";
import {
  getServiceJsonLd,
  getSpeakableJsonLd,
  LONGTAIL_KEYWORDS,
} from "@/lib/seo/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Freelance AI Developer, Website Developer & SEO Services | Samir Shaikh",
  description:
    "Hire Samir Shaikh — freelance AI developer, website developer & SEO specialist. Custom business websites, SEO optimization services, website speed optimization, production AI chatbots, and backend architectures for businesses, startups, and product teams.",
  keywords: [
    ...LONGTAIL_KEYWORDS.slice(0, 15),
    "freelance AI developer",
    "freelance AI engineer",
    "freelance website developer",
    "website developer for business",
    "custom website development",
    "SEO optimization services",
    "freelance SEO specialist",
    "website speed optimization",
    "AI chatbot for website",
    "AI chatbot for SaaS",
    "custom knowledge base AI",
    "custom knowledge base",
    "production-grade AI chatbot",
    "production-grade AI systems",
    "stop chatbot from hallucinating",
    "Forward Deployed Engineer",
    "hire freelance AI developer",
    "hire website developer",
    "AI workflow automation for startups",
    "AI agent development services",
    "backend API development services",
    "full-stack web development services",
    "technical SEO engineer",
  ],
  alternates: {
    canonical: `${APP_URL}/services`,
  },
  openGraph: {
    title: "Freelance AI Developer, Website Developer & SEO Services | Samir Shaikh",
    description:
      "Hire Samir Shaikh — freelance AI developer, website developer & SEO specialist. Custom business websites, SEO optimization services, website speed optimization, production AI chatbots, and backend architectures.",
    url: `${APP_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance AI Developer, Website Developer & SEO Services | Samir Shaikh",
    description:
      "Hire Samir Shaikh — freelance AI developer, website developer & SEO specialist. Custom business websites, SEO optimization services, website speed optimization, production AI chatbots, and backend architectures.",
  },
};

import {
  SERVICE_CATEGORIES,
  PROCESS_STEPS,
  ENGAGEMENT_MODELS,
  SERVICES_FAQS,
} from "@/lib/data/services";


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
    <main className="flex flex-col flex-1 px-6 pb-24 md:px-10">
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

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto w-full pt-6 md:pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto w-full">
        <PageHeader
          title="Freelance AI & Engineering Services"
          subtitle="Production-grade AI chatbots, custom knowledge bases, backend architectures, and modern web apps — built for startups, founders, and product teams ready to ship."
        />

        {/* Hero Value Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-border-primary bg-card-bg p-6 md:p-10 mb-16 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-green-600 dark:text-green-400 font-semibold bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-full inline-block mb-3">
                ● Available for Freelance Projects, Contracts & Forward Deployed Roles
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
                Ship production-grade software that drives real business results.
              </h2>
              <p className="service-desc text-text-muted text-base leading-relaxed">
                I help startups, business owners, and engineering teams build and ship custom business websites, comprehensive SEO services, and production-grade AI features — custom knowledge bases, AI chatbots for websites and SaaS, AI agents, and workflow automation — alongside high-performance Node.js/TypeScript backend systems and web speed optimization. Available as a freelance developer, SEO consultant, or Forward Deployed Engineer.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Discuss a Project
              </Link>
              <a
                href={`mailto:${AUTHOR_EMAIL}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border-primary bg-background text-foreground font-medium text-sm hover:bg-hover-bg transition-colors"
              >
                Email Directly
              </a>
            </div>
          </div>
        </div>

        {/* Pricing & Delivery Guarantee Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 p-4 rounded-xl border border-border-primary bg-card-bg/60 text-left">
          <div className="flex items-center gap-3 px-3">
            <span className="text-emerald-500 font-bold text-base">✓</span>
            <div>
              <p className="text-xs font-semibold text-foreground">Transparent Starting Rates</p>
              <p className="text-[11px] text-text-muted">Clear budget guidance with zero surprise scope bloat</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 border-t sm:border-t-0 sm:border-l border-border-primary/60 pt-3 sm:pt-0">
            <span className="text-emerald-500 font-bold text-base">✓</span>
            <div>
              <p className="text-xs font-semibold text-foreground">Fixed-Price Quotes in 48h</p>
              <p className="text-[11px] text-text-muted">Detailed milestone scope after a free discovery call</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 border-t sm:border-t-0 sm:border-l border-border-primary/60 pt-3 sm:pt-0">
            <span className="text-emerald-500 font-bold text-base">✓</span>
            <div>
              <p className="text-xs font-semibold text-foreground">100% Code & IP Ownership</p>
              <p className="text-[11px] text-text-muted">Committed directly to your private repositories</p>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-20 space-y-20">
          {SERVICE_CATEGORIES.map((category, catIdx) => (
            <div key={category.id} id={category.id}>
              {/* Category Header */}
              <div className="mb-8 pb-4 border-b border-border-primary">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  CATEGORY {String(catIdx + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
                  {category.title}
                </h2>
                <p className="text-sm text-text-muted mt-1.5 max-w-2xl">
                  {category.subtitle}
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.services.map((service) => (
                  <div
                    key={service.id}
                    id={service.id}
                    className="group flex flex-col justify-between rounded-xl border border-border-primary bg-card-bg p-6 md:p-8 hover:border-border-secondary transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[11px] font-semibold text-text-muted tracking-wider">
                          {service.badge}
                        </span>
                        {service.startingPrice && (
                          <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {service.startingPrice}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs font-mono text-text-secondary mb-4 italic">
                        {service.tagline}
                      </p>
                      <p className="text-sm text-text-muted leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2.5">
                          Key Deliverables
                        </h4>
                        <ul className="space-y-2">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                              <span className="text-green-500 font-bold mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-primary/60 mb-4">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] px-2 py-0.5 rounded bg-background border border-border-primary text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        {service.relatedLink && (
                          <Link
                            href={service.relatedLink.href}
                            className="text-xs font-mono font-medium text-foreground hover:underline inline-flex items-center gap-1"
                          >
                            {service.relatedLink.label}
                          </Link>
                        )}
                        <Link
                          href={`/contact?service=${encodeURIComponent(service.id)}`}
                          className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1 ml-auto"
                        >
                          Request quote &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 4-Stage Delivery Process */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              HOW WE WORK TOGETHER
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
              Engineering Delivery Process
            </h2>
            <p className="text-sm text-text-muted mt-2 max-w-2xl">
              A structured, low-friction engineering process designed to eliminate ambiguity and deliver dependable software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-xl border border-border-primary bg-card-bg p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-bold text-text-secondary/40 block mb-3">
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
        </div>

        {/* Engagement Models */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              FLEXIBLE COLLABORATION
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
              Engagement Models
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.title}
                className="rounded-xl border border-border-primary bg-card-bg p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-border-primary text-text-muted inline-block">
                      {model.badge}
                    </span>
                    {model.startingPrice && (
                      <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {model.startingPrice}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {model.title}
                  </h3>
                  <p className="text-xs text-text-muted mb-6">
                    {model.subtitle}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {model.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                        <span className="text-foreground font-bold mt-0.5">▪</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="w-full text-center py-2 px-4 rounded-lg border border-border-primary bg-background hover:bg-hover-bg text-xs font-mono font-medium text-foreground transition-colors"
                >
                  Inquire Now →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* How I Work */}
        <div className="mb-20">
          <HowIWork variant="full" />
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <TestimonialsSection variant="services" />
        </div>

        {/* Services FAQ */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-border-primary border-y border-border-primary">
            {SERVICES_FAQS.map((faq, idx) => (
              <div key={idx} className="py-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-2xl border border-border-primary bg-card-bg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
            Have a project or opportunity in mind?
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you need a production-grade AI chatbot for your website or SaaS, a custom knowledge base, scalable backend APIs, or full-stack web engineering, let&apos;s talk through your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </Link>
            <Link
              href="/resume"
              className="w-full sm:w-auto px-8 py-3 rounded-lg border border-border-primary bg-background text-foreground font-medium text-sm hover:bg-hover-bg transition-colors"
            >
              View Full Resume
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
