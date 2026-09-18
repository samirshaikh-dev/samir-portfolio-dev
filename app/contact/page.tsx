import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL } from "@/lib/site-config";
import { getContactPageJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Contact | Samir Shaikh",
  description:
    "Get in touch with Samir Shaikh — freelance AI engineer, backend developer, and Forward Deployed Engineer open to remote roles, contract projects, and freelance collaborations. Reach out via email or the contact form.",
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

export default function ContactPage() {
  const contactJsonLd = getContactPageJsonLd();

  return (
    <main className="flex flex-col flex-1 px-6 pb-20 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="max-w-2xl mx-auto w-full pt-6 md:pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]}
        />
      </div>
      <PageHeader
        title="Get in Touch"
        subtitle="Tell me about your project. I reply within 24–48 hours with a free 30-minute discovery call — no commitment required."
      />

      {/* Guarantee chips */}
      <div className="max-w-2xl mx-auto w-full mb-8 -mt-2">
        <div className="flex flex-wrap gap-2">
          {[
            "✓ Fixed-price quote within 48h",
            "✓ NDA signed before code review",
            "✓ 30-day post-launch warranty",
          ].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full border border-border-primary bg-background text-text-secondary"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only">
        Looking to hire a freelance AI engineer, contract backend developer, or forward deployed engineer for an AI project? Need someone to build a RAG pipeline or ship full stack web features into your SaaS product? Samir Shaikh is an AI Backend Engineer and Full Stack Engineer available for freelance sprints, contract collaboration, and remote roles.
      </p>
      <div className="max-w-2xl mx-auto w-full">
        <ContactForm />

        {/* What happens next */}
        <div className="mt-10 pt-8 border-t border-border-primary">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
            What happens next
          </p>
          <ol className="flex flex-col sm:flex-row gap-4 sm:gap-0">
            {[
              { step: "01", label: "You submit", detail: "I receive your message instantly" },
              { step: "02", label: "I reply in 24h", detail: "With a scheduling link for a call" },
              { step: "03", label: "Free 30-min call", detail: "We align on scope & timeline" },
              { step: "04", label: "Fixed quote", detail: "Milestone proposal within 48h" },
            ].map((item, i, arr) => (
              <li key={item.step} className="flex sm:flex-col items-start sm:items-center sm:flex-1 gap-3 sm:gap-2 relative">
                {/* Connector line between steps (desktop) */}
                {i < arr.length - 1 && (
                  <span className="hidden sm:block absolute left-1/2 top-4 w-full h-px bg-border-primary" aria-hidden="true" />
                )}
                <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-background border border-border-primary flex items-center justify-center text-xs font-bold text-foreground">
                  {item.step}
                </span>
                <div className="sm:text-center sm:mt-2 sm:px-2">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-text-muted mt-0.5">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
