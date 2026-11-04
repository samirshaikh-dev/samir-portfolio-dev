import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import {
  getAllServices,
  getServiceBySlug,
  getCategoryByServiceId,
  getRelatedServices,
  PROCESS_STEPS,
} from "@/lib/data/services";
import { APP_URL, AUTHOR_NAME, AUTHOR_EMAIL } from "@/lib/site-config";
import {
  LuCheck,
  LuArrowRight,
  LuShieldCheck,
  LuClock,
  LuTerminal,
  LuSparkles,
  LuLayers,
  LuTriangleAlert,
  LuChevronDown,
} from "react-icons/lu";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((s) => ({
    slug: s.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title = `${service.title} | Samir Shaikh — Freelance AI & Backend Engineer`;
  const description = `${service.tagline} ${service.startingPrice ? `Pricing: ${service.startingPrice}.` : ""} ${service.typicalDuration ? `Delivery: ${service.typicalDuration}.` : ""} 100% IP transfer & 14-day warranty.`;

  return {
    title,
    description,
    keywords: [
      service.title,
      ...(service.tags || []),
      "Samir Shaikh",
      "freelance AI developer",
      "freelance backend engineer",
      "hire AI developer",
      "software development sprint",
    ],
    alternates: {
      canonical: `${APP_URL}/services/${service.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${APP_URL}/services/${service.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const category = getCategoryByServiceId(service.id);
  const relatedServices = getRelatedServices(service.id, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Person",
          name: AUTHOR_NAME,
          url: APP_URL,
          email: AUTHOR_EMAIL,
        },
        offers: {
          "@type": "Offer",
          price: service.priceAmount || "450",
          priceCurrency: service.priceCurrency || "USD",
          availability: "https://schema.org/InStock",
        },
        serviceType: service.title,
        areaServed: "Global",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: APP_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${APP_URL}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${APP_URL}/services/${service.id}`,
          },
        ],
      },
      ...(service.serviceFaqs && service.serviceFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: service.serviceFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-24 pt-6 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto w-full space-y-14">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.title, href: `/services/${service.id}` },
          ]}
        />

        {/* ── EDITORIAL HERO HEADER ───────────────────────────────────────────── */}
        <header className="border-b border-border-primary pb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted mb-3">
            <span className="uppercase tracking-wider">
              {category ? category.title : "ENGINEERING SPRINT"} &bull; {service.badge}
            </span>
            {service.typicalDuration && (
              <span className="inline-flex items-center gap-1.5 text-text-secondary">
                <LuClock className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
                <span>{service.typicalDuration} DELIVERY</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.12] mb-4">
            {service.title}
          </h1>

          <p className="text-text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
            {service.tagline}
          </p>

          {/* Quick Risk Reversal Reassurance Strip */}
          <div className="mt-6 pt-5 border-t border-border-primary flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuShieldCheck className="text-accent-lime text-sm" aria-hidden="true" />
              Direct Senior Engineer Access
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuShieldCheck className="text-accent-lime text-sm" aria-hidden="true" />
              100% Repository &amp; IP Transfer
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuShieldCheck className="text-accent-lime text-sm" aria-hidden="true" />
              14-Day Bug Warranty
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuShieldCheck className="text-accent-lime text-sm" aria-hidden="true" />
              Signed Mutual NDA Protected
            </span>
          </div>

          {/* ── ENGAGEMENT PATHS (FIXED SPRINT vs CUSTOM SCOPE) ────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Tier 1: Standard Fixed Sprint */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                  <span>Standard Fixed Sprint</span>
                  <span className="text-foreground font-bold">{service.typicalDuration || "1–2 Weeks"}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-foreground mb-1">
                  {service.startingPrice || "From $500"}
                </div>
                <p className="text-xs text-text-secondary mt-1 mb-5">
                  Fixed milestone scope &bull; No hourly surprises &bull; Direct GitHub delivery
                </p>
                <div className="text-xs text-text-secondary space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime shrink-0" aria-hidden="true" />
                    <span>Defined technical checklist &amp; test suite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime shrink-0" aria-hidden="true" />
                    <span>Committed directly to your private repository</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime shrink-0" aria-hidden="true" />
                    <span>14-day post-launch bug warranty</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/contact?service=${service.id}&scope=standard`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs sm:text-sm font-bold py-3 hover:opacity-90 transition-opacity"
              >
                <span>Book Standard Sprint</span>
                <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tier 2: Custom Scope / Retainer */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                  <span>Custom Scope / Retainer</span>
                  <span className="font-bold text-text-secondary">Flexible Scope</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                  Custom Milestone Quote
                </div>
                <p className="text-xs text-text-secondary mt-1 mb-5">
                  {service.customScopeSubtitle ||
                    "For complex multi-tenant datasets, legacy architectures, or ongoing monthly engineering retainers."}
                </p>
                <div className="text-xs text-text-secondary space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime shrink-0" aria-hidden="true" />
                    <span>Free 30-minute discovery &amp; architecture review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime shrink-0" aria-hidden="true" />
                    <span>Custom milestone breakdown within 48 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime shrink-0" aria-hidden="true" />
                    <span>Dedicated weekly velocity (10–20 hrs/week)</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/contact?service=${service.id}&scope=custom`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-bold py-3 hover:bg-hover-bg transition-colors"
              >
                <span>Request Custom Scope &amp; Quote</span>
                <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* ── PROBLEM vs SAMIR'S ENGINEERING SOLUTION (JUDGEMENT OVER HYPE) ───── */}
        <section aria-labelledby="problem-solution-heading">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>ARCHITECTURAL RATIONALE</span>
            </div>
            <h2
              id="problem-solution-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Why Typical Approaches Fail &amp; How We Engineer It
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl leading-relaxed">
              Real engineering discernment: diagnosing root failure modes and engineering resilient solutions instead of generic AI wrappers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Failure Mode */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted font-bold">
                <LuTriangleAlert className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true" />
                <span>The Problem With Typical Approaches</span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {service.problemStatement ||
                  "Most solutions rely on brittle third-party wrappers, unindexed queries, or unmaintained templates that break under user load, introduce latency spikes, and leave behind mounting technical debt."}
              </p>
            </div>

            {/* The Engineering Solution */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                <LuSparkles className="w-4 h-4 text-accent-lime shrink-0" aria-hidden="true" />
                <span>Samir&apos;s Engineering Approach</span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {service.solutionApproach || service.description}
              </p>
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE & DATA FLOW DIAGRAM BOX ────────────────────────────── */}
        {service.architectureDiagram && (
          <section aria-labelledby="architecture-diagram-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                <span>SYSTEM DESIGN &bull; DATA FLOW</span>
              </div>
              <h2
                id="architecture-diagram-heading"
                className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
              >
                Technical Architecture Blueprint
              </h2>
            </div>

            <div className="rounded-2xl border border-border-primary bg-[#0A0A0A] text-white p-6 sm:p-8 overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="text-xs font-mono text-zinc-400 font-bold">
                  {service.architectureDiagram.title}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent-lime">
                  PRODUCTION TESTED
                </div>
              </div>

              {/* Monospace ASCII Architecture Diagram */}
              <pre className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-zinc-300 pb-2">
                {service.architectureDiagram.diagram}
              </pre>

              {/* Benchmarks Strip */}
              {service.architectureDiagram.benchmarks && (
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {service.architectureDiagram.benchmarks.map((bm, bIdx) => (
                    <span
                      key={bIdx}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-white/5 px-2.5 py-1 rounded border border-white/10"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                      {bm}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── DELIVERABLES MATRIX & SCOPE BOUNDARIES (BUYER CERTAINTY) ────────── */}
        <section aria-labelledby="deliverables-heading">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>SPECIFICATION &bull; SCOPE BOUNDARIES</span>
            </div>
            <h2
              id="deliverables-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Exact Deliverables &amp; Scope
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl leading-relaxed">
              Clear scope boundaries eliminate surprises. Here is exactly what is delivered in a standard sprint versus what is handled under custom scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Included Deliverables */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground font-bold mb-4">
                <LuCheck className="w-4 h-4 text-accent-lime shrink-0" aria-hidden="true" />
                <span>Included in Standard Sprint</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                {(service.scopeBoundaries?.included || service.deliverables).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Scope Opportunities */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted font-bold mb-4">
                <LuLayers className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true" />
                <span>Available Under Custom Scope</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                {(
                  service.scopeBoundaries?.customScope || [
                    "Complex multi-tenant enterprise data partitioning",
                    "Ongoing monthly velocity retainer (10–20 hrs/week)",
                    "Native mobile app integrations (React Native / iOS / Android)",
                  ]
                ).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-text-muted font-bold">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── PRODUCTION TECH STACK ───────────────────────────────────────────── */}
        <section aria-labelledby="tech-stack-heading">
          <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
              <LuTerminal className="w-4 h-4 text-accent-lime" aria-hidden="true" />
              <span>Production Tech Stack &amp; Tools</span>
            </div>
            <h3 id="tech-stack-heading" className="text-lg font-bold text-foreground mb-4">
              Technologies Implemented in This Service
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg border border-border-primary bg-hover-bg/50 text-xs font-mono font-medium text-foreground hover:border-foreground/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4-STEP SPRINT EXECUTION ROADMAP ─────────────────────────────────── */}
        <section aria-labelledby="process-roadmap-heading">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>SPRINT LIFECYCLE</span>
            </div>
            <h2
              id="process-roadmap-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              How This Sprint Is Executed
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((ps) => (
              <div
                key={ps.step}
                className="p-5 rounded-2xl border border-border-primary bg-background dark:bg-card-bg flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-text-muted/40 font-mono block mb-2">
                    {ps.step}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5">
                    {ps.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {ps.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICE-SPECIFIC FAQs ───────────────────────────────────────────── */}
        {service.serviceFaqs && service.serviceFaqs.length > 0 && (
          <section aria-labelledby="service-faqs-heading">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                <span>FREQUENT QUESTIONS</span>
              </div>
              <h2
                id="service-faqs-heading"
                className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
              >
                Frequently Asked Questions About This Sprint
              </h2>
            </div>

            <div className="space-y-3">
              {service.serviceFaqs.map((faq, fIdx) => (
                <details
                  key={fIdx}
                  className="group rounded-xl border border-border-primary bg-background dark:bg-card-bg p-4 transition-colors open:bg-hover-bg/30"
                >
                  <summary className="cursor-pointer font-bold text-xs sm:text-sm text-foreground list-none flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime rounded-lg">
                    <span>{faq.question}</span>
                    <LuChevronDown
                      className="w-4 h-4 text-text-muted shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border-primary/60 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── FINAL BOOKING CONVERSION SECTION ─────────────────────────────────── */}
        <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span>START A DIRECT ENGAGEMENT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground max-w-xl mx-auto mb-3">
            Ready to Build {service.title}?
          </h2>

          <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
            Tell me about your tech stack and target timeline. I review requirements and provide a clear milestone scope within 24–48 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href={`/contact?service=${service.id}&scope=standard`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs sm:text-sm font-bold px-6 py-3.5 hover:opacity-90 transition-opacity"
            >
              <span>Book Standard Sprint ({service.startingPrice || "From $500"})</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/contact?service=${service.id}&scope=custom`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-bold px-6 py-3.5 hover:bg-hover-bg transition-colors"
            >
              <span>Discuss Custom Scope</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-border-primary flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuClock className="text-accent-lime text-sm" aria-hidden="true" />
              {service.typicalDuration || "1–2 Weeks Delivery"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuShieldCheck className="text-accent-lime text-sm" aria-hidden="true" />
              100% Repository &amp; IP Transfer
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-accent-lime text-sm" aria-hidden="true" />
              14-Day Post-Launch Warranty
            </span>
          </div>
        </div>

        {/* ── EXPLORE RELATED SERVICES ────────────────────────────────────────── */}
        {relatedServices.length > 0 && (
          <section aria-labelledby="related-services-heading" className="pt-6 border-t border-border-primary">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                  <span>ADJACENT CAPABILITIES</span>
                </div>
                <h2
                  id="related-services-heading"
                  className="text-xl sm:text-2xl font-black tracking-tight text-foreground"
                >
                  Explore Related Engineering Services
                </h2>
              </div>
              <Link
                href="/services"
                className="text-xs font-mono text-text-secondary hover:text-foreground underline underline-offset-4"
              >
                All 13 Services &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedServices.map((rel) => (
                <div
                  key={rel.id}
                  className="p-5 rounded-2xl border border-border-primary bg-background dark:bg-card-bg hover:border-foreground/30 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                      {rel.badge}
                    </span>
                    <h3 className="text-base font-bold text-foreground mb-1 leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2 mb-4">
                      {rel.tagline}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border-primary flex items-center justify-between text-xs">
                    <span className="font-mono text-foreground font-bold">
                      {rel.startingPrice}
                    </span>
                    <Link
                      href={`/services/${rel.id}`}
                      className="text-foreground hover:text-text-secondary font-bold flex items-center gap-1"
                    >
                      <span>View Blueprint</span>
                      <LuArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
