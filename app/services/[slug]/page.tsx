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
  LuCalendar,
  LuTriangleAlert,
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
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-24 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Radiant ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.06] pointer-events-none -z-10"
      />

      <div className="max-w-5xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: service.title, href: `/services/${service.id}` },
            ]}
          />
        </div>

        {/* ── TOP UTILITY ROW ─────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 sm:px-5 rounded-2xl border border-border-primary bg-background/80 dark:bg-card-bg/80 backdrop-blur-xs shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-accent-lime shadow-[0_0_10px_rgba(184,255,0,0.9)] animate-pulse"
            />
            <span className="text-xs sm:text-sm font-mono font-bold text-foreground">
              {category ? category.title.toUpperCase() : "ENGINEERING SPRINT"} &bull; {service.badge}
            </span>
          </div>
          <div className="text-xs font-mono text-accent-lime font-bold">
            100% IP Transfer &bull; 14-Day Bug Warranty
          </div>
        </div>

        {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
        <div className="pb-10 pt-2 border-b border-border-primary/80 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            OFFERING BLUEPRINT &bull; {service.typicalDuration || "1–2 WEEKS"}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.14] mb-4">
            {service.title}
          </h1>

          <p className="text-text-muted text-base sm:text-lg max-w-3xl leading-relaxed">
            {service.tagline}
          </p>

          {/* ── DUAL PRICING BENTO ROW ────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {/* Tier 1: Standard Fixed Sprint */}
            <div className="p-6 rounded-3xl border-2 border-accent-lime/70 bg-background dark:bg-card-bg shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                  <span>Standard Sprint</span>
                  <span className="text-accent-lime font-bold">{service.typicalDuration || "1–2 Weeks"}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-foreground mb-1">
                  {service.startingPrice || "From $500"}
                </div>
                <p className="text-xs text-text-secondary mt-1 mb-5">
                  Fixed milestone scope &bull; No hourly surprises &bull; Direct GitHub delivery
                </p>
                <div className="text-xs text-text-muted space-y-1.5 mb-6">
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime stroke-[2.5]" />
                    <span>Defined technical checklist &amp; unit tests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime stroke-[2.5]" />
                    <span>Committed to your private repository</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime stroke-[2.5]" />
                    <span>14-day post-launch bug warranty</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/contact?service=${service.id}&scope=standard`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-xs sm:text-sm font-extrabold py-3.5 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Book Standard Sprint</span>
                <LuArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>

            {/* Tier 2: Custom Scope / Retainer */}
            <div className="p-6 rounded-3xl border border-border-primary bg-hover-bg/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                  <span>Custom Scope / Retainer</span>
                  <span className="font-bold text-text-secondary">Flexible Scope</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                  Custom Quote
                </div>
                <p className="text-xs text-text-secondary mt-1 mb-5">
                  {service.customScopeSubtitle ||
                    "For complex multi-tenant datasets, legacy architectures, or ongoing monthly engineering retainers."}
                </p>
                <div className="text-xs text-text-muted space-y-1.5 mb-6">
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime stroke-[2.5]" />
                    <span>Free 30-minute discovery &amp; architecture review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime stroke-[2.5]" />
                    <span>Custom milestone breakdown within 48 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-3.5 h-3.5 text-accent-lime stroke-[2.5]" />
                    <span>Dedicated weekly velocity (10–20 hrs/week)</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/contact?service=${service.id}&scope=custom`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-bold py-3.5 hover:border-foreground/30 hover:bg-hover-bg transition-all cursor-pointer shadow-2xs"
              >
                <span>Request Custom Scope &amp; Quote</span>
                <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Reassurance Features */}
          <div className="mt-6 pt-5 border-t border-border-primary/60 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuShieldCheck className="text-accent-lime text-sm stroke-[2.5]" />
              Direct Senior Engineer Access
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuShieldCheck className="text-accent-lime text-sm stroke-[2.5]" />
              100% Repository &amp; IP Transfer
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuShieldCheck className="text-accent-lime text-sm stroke-[2.5]" />
              Signed Mutual NDA Protected
            </span>
          </div>
        </div>

        {/* ── PROBLEM vs SAMIR'S ENGINEERING SOLUTION ─────────────────────────── */}
        <section aria-labelledby="problem-solution-heading" className="mb-14">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              ARCHITECTURAL RATIONALE
            </div>
            <h2
              id="problem-solution-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Why Teams Need This &amp; How We Engineer It
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Failure Mode */}
            <div className="p-6 sm:p-7 rounded-3xl border border-red-500/20 bg-red-500/5 dark:bg-red-950/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-500 font-bold mb-3">
                <LuTriangleAlert className="w-4 h-4 shrink-0" />
                The Problem With Typical Approaches
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {service.problemStatement ||
                  "Most solutions rely on brittle third-party wrappers, unindexed queries, or unmaintained templates that break under user load and leave behind mounting technical debt."}
              </p>
            </div>

            {/* The Engineering Solution */}
            <div className="p-6 sm:p-7 rounded-3xl border border-accent-lime/30 bg-accent-lime/5 dark:bg-accent-lime/5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-lime font-bold mb-3">
                <LuSparkles className="w-4 h-4 shrink-0" />
                Samir&apos;s Engineering Approach
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {service.solutionApproach ||
                  service.description}
              </p>
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE & DATA FLOW DIAGRAM BOX ────────────────────────────── */}
        {service.architectureDiagram && (
          <section aria-labelledby="architecture-diagram-heading" className="mb-14">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                SYSTEM DESIGN &bull; DATA FLOW
              </div>
              <h2
                id="architecture-diagram-heading"
                className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
              >
                Technical Architecture Blueprint
              </h2>
            </div>

            <div className="rounded-3xl border border-border-primary bg-[#080808] text-white p-6 sm:p-8 shadow-sm overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-zinc-400">
                    {service.architectureDiagram.title}
                  </span>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent-lime">
                  PRODUCTION TESTED
                </div>
              </div>

              {/* Monospace ASCII Architecture Diagram */}
              <pre className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-zinc-300 pb-4">
                {service.architectureDiagram.diagram}
              </pre>

              {/* Benchmarks Strip */}
              {service.architectureDiagram.benchmarks && (
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2.5">
                  {service.architectureDiagram.benchmarks.map((bm, bIdx) => (
                    <span
                      key={bIdx}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-lime bg-accent-lime/10 px-3 py-1 rounded-full border border-accent-lime/20"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                      {bm}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── DELIVERABLES MATRIX & SCOPE BOUNDARIES ──────────────────────────── */}
        <section aria-labelledby="deliverables-heading" className="mb-14">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              SPECIFICATION &bull; SCOPE BOUNDARIES
            </div>
            <h2
              id="deliverables-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Exact Deliverables &amp; Scope
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Included Deliverables */}
            <div className="p-6 sm:p-7 rounded-3xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-lime font-bold mb-4">
                <LuCheck className="w-4 h-4 stroke-[2.5]" />
                Included in Standard Sprint
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                {(service.scopeBoundaries?.included || service.deliverables).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0 stroke-[2.5] mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Scope Opportunities */}
            <div className="p-6 sm:p-7 rounded-3xl border border-border-primary bg-hover-bg/30">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted font-bold mb-4">
                <LuLayers className="w-4 h-4 text-text-muted" />
                Available Under Custom Scope
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
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
        <section aria-labelledby="tech-stack-heading" className="mb-14">
          <div className="p-6 sm:p-8 rounded-3xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
              <LuTerminal className="w-4 h-4 text-accent-lime" />
              Production Tech Stack &amp; Tools
            </div>
            <h3 id="tech-stack-heading" className="text-xl font-bold text-foreground mb-4">
              Technologies Used in This Service
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-xl border border-border-primary bg-hover-bg text-xs sm:text-sm font-mono font-medium text-foreground hover:border-foreground/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4-STEP SPRINT EXECUTION ROADMAP ─────────────────────────────────── */}
        <section aria-labelledby="process-roadmap-heading" className="mb-14">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              SPRINT LIFECYCLE
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
                className="p-5 rounded-2xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-accent-lime font-mono block mb-2">
                    {ps.step}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5">
                    {ps.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {ps.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICE-SPECIFIC FAQs ───────────────────────────────────────────── */}
        {service.serviceFaqs && service.serviceFaqs.length > 0 && (
          <section aria-labelledby="service-faqs-heading" className="mb-14">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                COMMON QUESTIONS
              </div>
              <h2
                id="service-faqs-heading"
                className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {service.serviceFaqs.map((faq, fIdx) => (
                <details
                  key={fIdx}
                  className="group rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-5 transition-colors open:bg-hover-bg/40 shadow-2xs"
                >
                  <summary className="cursor-pointer font-bold text-sm sm:text-base text-foreground list-none flex items-center justify-between gap-3">
                    <span>{faq.question}</span>
                    <span className="text-accent-lime font-mono text-lg transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border-primary/60 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── FINAL BOOKING CONVERSION BENTO CARD ─────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center shadow-sm mb-16">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(184,255,0,0.14)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
          />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
            LET&apos;S GET STARTED
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground max-w-xl mx-auto mb-3">
            Ready to Build {service.title}?
          </h2>

          <p className="text-text-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
            Tell me about your tech stack and target timeline. I review requirements and provide a clear milestone scope within 24–48 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href={`/contact?service=${service.id}&scope=standard`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-8 py-3.5 shadow-xs hover:shadow-[0_0_24px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Book Standard Sprint ({service.startingPrice || "From $500"})</span>
              <LuArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <Link
              href={`/contact?service=${service.id}&scope=custom`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-8 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all cursor-pointer"
            >
              <span>Discuss Custom Scope</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-border-primary/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuClock className="text-accent-lime text-sm" />
              {service.typicalDuration || "1–2 Weeks Delivery"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuShieldCheck className="text-accent-lime text-sm" />
              100% Repository &amp; IP Transfer
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuCheck className="text-accent-lime text-sm stroke-[2.5]" />
              14-Day Post-Launch Warranty
            </span>
          </div>
        </div>

        {/* ── EXPLORE RELATED SERVICES ────────────────────────────────────────── */}
        {relatedServices.length > 0 && (
          <section aria-labelledby="related-services-heading">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                  ADJACENT CAPABILITIES
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
                className="text-xs font-mono text-text-secondary hover:text-foreground underline underline-offset-4 decoration-border-primary hover:decoration-accent-lime"
              >
                All 13 Services &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedServices.map((rel) => (
                <div
                  key={rel.id}
                  className="p-5 rounded-2xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs hover:border-foreground/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                      {rel.badge}
                    </span>
                    <h3 className="text-base font-bold text-foreground mb-1 leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-2 mb-4">
                      {rel.tagline}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border-primary flex items-center justify-between text-xs">
                    <span className="font-mono text-accent-lime font-bold">
                      {rel.startingPrice}
                    </span>
                    <Link
                      href={`/services/${rel.id}`}
                      className="text-foreground hover:text-text-secondary font-bold flex items-center gap-1"
                    >
                      <span>View Scope</span>
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
