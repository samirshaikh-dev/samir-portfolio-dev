import { Metadata } from "next";
import { db } from "@/lib/db";
import { certificates } from "@/lib/schema";
import { eq, asc, desc } from "drizzle-orm";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CertificatesClient from "@/components/certificates/CertificatesClient";
import { getCertificatesPageJsonLd } from "@/lib/seo/structured-data";
import { APP_URL, AUTHOR_NAME } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Certificates & Professional Credentials | Samir Shaikh",
  description:
    "Explore verified professional certificates, degrees, and technical credentials earned by Samir Shaikh across backend engineering, cloud platforms, and distributed systems.",
  alternates: {
    canonical: `${APP_URL}/certificates`,
  },
  openGraph: {
    title: "Certificates & Professional Credentials | Samir Shaikh",
    description:
      "Explore verified professional certificates, degrees, and technical credentials earned by Samir Shaikh across backend engineering, cloud platforms, and distributed systems.",
    url: `${APP_URL}/certificates`,
    type: "website",
    images: [
      {
        url: `${APP_URL}/Filled_Logo.png`,
        width: 1200,
        height: 630,
        alt: `${AUTHOR_NAME} - Certificates & Professional Credentials`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificates & Professional Credentials | Samir Shaikh",
    description:
      "Explore verified professional certificates, degrees, and technical credentials earned by Samir Shaikh.",
    images: [`${APP_URL}/Filled_Logo.png`],
  },
};

export default async function CertificatesPage() {
  const certList = await db
    .select()
    .from(certificates)
    .where(eq(certificates.isPublished, true))
    .orderBy(asc(certificates.displayOrder), desc(certificates.issueDate));

  const jsonLd = getCertificatesPageJsonLd(certList);

  // Derive stats
  const totalCount = certList.length;
  const uniqueIssuers = new Set(certList.map((c) => c.issuer)).size;
  const allSkills = new Set<string>();
  certList.forEach((c) => c.skills?.forEach((s) => allSkills.add(s)));

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Certificates", href: "/certificates" },
        ]}
      />

      {/* Page Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-serif">
          Certificates & Credentials
        </h1>
        <p className="mt-3 text-sm md:text-base text-text-secondary max-w-3xl leading-relaxed">
          Verified accreditations, system architecture certifications, and technical
          specializations across backend engineering, cloud infrastructure, and distributed systems.
        </p>

        {/* Highlights / Stats Bar */}
        {totalCount > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-text-muted border-y border-border-primary py-3">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground text-sm">{totalCount}</span>
              <span>Verified Accreditations</span>
            </div>
            <span className="text-border-primary">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground text-sm">{uniqueIssuers}</span>
              <span>Issuing Organizations</span>
            </div>
            <span className="text-border-primary">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground text-sm">{allSkills.size}</span>
              <span>Core Specializations</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Interactive Client Grid */}
      <main>
        <CertificatesClient certificates={certList} />
      </main>
    </div>
  );
}
