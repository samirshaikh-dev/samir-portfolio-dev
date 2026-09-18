import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQClient from "@/components/faq/FAQClient";
import { FAQS } from "@/lib/data/faqs";
import { APP_URL } from "@/lib/site-config";
import { getFaqPageJsonLd } from "@/lib/seo/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Samir Shaikh",
  description:
    "Explore verified answers to frequently asked questions about Samir Shaikh — Freelance AI Developer, AI Backend Engineer, and Forward Deployed Engineer (FDE). Topics cover freelance engineering services, project timelines, pricing, custom AI solutions, production RAG architectures, and tech stack.",
  keywords: [
    "Samir Shaikh FAQ",
    "freelance AI developer FAQ",
    "hire freelance backend developer",
    "custom AI solutions for business",
    "freelance development process",
    "Next.js web developer",
    "AI Backend Engineer FAQ",
    "Forward Deployed Engineer FAQ",
    "production RAG architecture",
    "pgvector and Gemini embeddings",
    "AI chatbot custom knowledge base",
    "project pricing and estimates",
  ],
  alternates: {
    canonical: `${APP_URL}/faq`,
  },
  openGraph: {
    title: "Frequently Asked Questions | Samir Shaikh",
    description:
      "Explore verified answers on freelance engineering services, custom AI solutions, production RAG systems, project timelines, and backend architecture by Samir Shaikh.",
    url: `${APP_URL}/faq`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Samir Shaikh",
    description:
      "Verified answers on freelance engineering services, custom AI solutions, RAG architectures, timelines, and pricing.",
  },
};

export default function FAQPage() {
  const faqJsonLd = getFaqPageJsonLd(FAQS);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 min-h-screen">
      {/* Schema.org FAQPage JSON-LD for Search & AI Answer Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Synchronized Breadcrumb Navigation & BreadcrumbList Schema */}
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />

      {/* Editorial Page Header */}
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Explore verified answers on AI systems, RAG architecture, backend design, engineering roles, and commercial services."
      />

      {/* Client-Side Category Filter & Live Search Accordion */}
      <FAQClient faqs={FAQS} />
    </div>
  );
}
