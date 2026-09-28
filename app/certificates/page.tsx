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

  // Derive telemetry stats
  const totalCount = certList.length;
  const uniqueIssuers = new Set(certList.map((c) => c.issuer)).size;
  const allSkills = new Set<string>();
  certList.forEach((c) => c.skills?.forEach((s) => allSkills.add(s)));

  return (
    <div className="relative min-h-screen px-5 sm:px-8 md:px-10 pb-20 overflow-hidden">
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

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Certificates", href: "/certificates" },
            ]}
          />
        </div>

        {/* Editorial Page Header */}
        <header className="mb-10 sm:mb-12 pb-8 border-b border-border-primary/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            VERIFIED CREDENTIALS &amp; ACCREDITATIONS
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] text-foreground">
            Certificates &amp; Credentials
            <span
              className="block sm:inline font-normal italic text-text-secondary sm:ml-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              — Accreditations
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Verified accreditations, system architecture certifications, and technical
            specializations across backend engineering, cloud infrastructure, and distributed systems.
          </p>

          {/* Telemetry Highlights Bento Bar */}
          {totalCount > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 pt-6 border-t border-border-primary/80">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-background dark:bg-card-bg border border-border-primary shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-hover-bg border border-border-primary flex items-center justify-center font-mono font-bold text-base text-foreground">
                  {totalCount}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Total Accreditations</div>
                  <div className="text-xs font-bold text-foreground">Verified Credentials</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-background dark:bg-card-bg border border-border-primary shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-hover-bg border border-border-primary flex items-center justify-center font-mono font-bold text-base text-foreground">
                  {uniqueIssuers}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Institutions</div>
                  <div className="text-xs font-bold text-foreground">Issuing Organizations</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-background dark:bg-card-bg border border-border-primary shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-hover-bg border border-border-primary flex items-center justify-center font-mono font-bold text-base text-foreground">
                  {allSkills.size}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Competencies</div>
                  <div className="text-xs font-bold text-foreground">Core Specializations</div>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main Interactive Client Grid */}
        <main>
          <CertificatesClient certificates={certList} />
        </main>
      </div>
    </div>
  );
}
