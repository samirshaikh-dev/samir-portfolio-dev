import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL, AUTHOR_NAME, AUTHOR_EMAIL, SITE_NAME } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Terms of Service | Samir Shaikh",
  description:
    "Terms of Service for samir-portfolio-dev.vercel.app — the terms governing use of this personal portfolio website and how freelance services enquiries are handled.",
  keywords: [
    "Samir Shaikh Terms of Service",
    "portfolio terms and conditions",
    "freelance engineer terms",
  ],
  alternates: {
    canonical: `${APP_URL}/terms-of-service`,
  },
  openGraph: {
    title: "Terms of Service | Samir Shaikh",
    description:
      "Terms of Service for Samir Shaikh's portfolio — the terms governing use of this personal portfolio website.",
    url: `${APP_URL}/terms-of-service`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Samir Shaikh",
    description:
      "Terms of Service for Samir Shaikh's portfolio — terms governing use of this personal portfolio website.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  url: `${APP_URL}/terms-of-service`,
  description:
    "Terms of Service for Samir Shaikh's portfolio website — terms governing access and use.",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: APP_URL,
  },
  author: {
    "@type": "Person",
    name: AUTHOR_NAME,
    url: APP_URL,
  },
  dateModified: "2026-09-18",
  inLanguage: "en-US",
};

export default function TermsOfServicePage() {
  return (
    <main className="flex flex-col flex-1 px-6 pb-20 md:px-10">
      <div className="max-w-3xl mx-auto w-full pt-6 md:pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Terms of Service", href: "/terms-of-service" },
          ]}
        />
      </div>

      <PageHeader
        title="Terms of Service"
        subtitle="The terms governing your use of this portfolio website."
      />

      <div className="max-w-3xl mx-auto w-full">
        {/* Last updated */}
        <p className="text-xs text-text-muted font-mono mb-10">
          Last updated: 18 September 2026
        </p>

        <div className="prose prose-sm prose-gray dark:prose-invert max-w-none text-text-muted prose-headings:text-foreground prose-strong:text-foreground prose-a:text-foreground hover:prose-a:text-text-secondary prose-h2:font-serif prose-h2:italic prose-h2:font-semibold prose-h2:text-xl prose-h3:text-base prose-h3:font-semibold prose-hr:border-border-primary space-y-6">

          {/* 1 — Nature of the site */}
          <section aria-labelledby="nature">
            <h2 id="nature">1. Nature of This Website</h2>
            <p>
              This website (&ldquo;Site&rdquo;), located at{" "}
              <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                {APP_URL}
              </a>
              , is a personal portfolio website operated by{" "}
              <strong>{AUTHOR_NAME}</strong> (&ldquo;I&rdquo;, &ldquo;me&rdquo;,
              &ldquo;my&rdquo;).
            </p>
            <p>
              The Site is an informational and professional enquiry platform. It
              is <strong>not</strong> a SaaS product, e-commerce store, or
              consumer application. No products are sold, and no services are
              rendered through this website directly. Services described on the{" "}
              <Link href="/services">Services</Link> page are offered for enquiry
              purposes only — any engagement would be governed by a separate
              freelance services agreement negotiated between the parties.
            </p>
            <p>
              By accessing or using this Site, you agree to be bound by these
              Terms of Service. If you do not agree, please do not use the Site.
            </p>
          </section>

          <hr />

          {/* 2 — Acceptable use */}
          <section aria-labelledby="acceptable-use">
            <h2 id="acceptable-use">2. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>
                Use the Site for any unlawful purpose or in violation of any
                applicable laws or regulations.
              </li>
              <li>
                Attempt to gain unauthorised access to any part of the Site or
                its infrastructure.
              </li>
              <li>
                Submit false, misleading, or abusive content through the contact
                form.
              </li>
              <li>
                Scrape, crawl, or harvest content from this Site for commercial
                or competitive purposes without prior written consent.
              </li>
              <li>
                Transmit spam, unsolicited marketing, or malicious code of any
                kind.
              </li>
            </ul>
          </section>

          <hr />

          {/* 3 — Intellectual property */}
          <section aria-labelledby="ip">
            <h2 id="ip">3. Intellectual Property</h2>
            <p>
              All content on this Site — including but not limited to text,
              code snippets, project descriptions, blog posts, images, and
              design — is the intellectual property of{" "}
              <strong>{AUTHOR_NAME}</strong> unless otherwise attributed.
            </p>
            <p>
              You may share links to pages on this Site and quote brief excerpts
              (with attribution) for non-commercial, informational purposes.
              Reproducing substantial portions of the Site&apos;s content,
              republishing blog posts in full, or using portfolio content for
              commercial purposes without written permission is prohibited.
            </p>
          </section>

          <hr />

          {/* 4 — Third-party links */}
          <section aria-labelledby="third-party-links">
            <h2 id="third-party-links">4. Third-Party Links</h2>
            <p>
              This Site may contain links to third-party websites (e.g., GitHub,
              LinkedIn, project demos, blog references). These links are
              provided for convenience and informational purposes only. I have
              no control over the content, privacy practices, or availability of
              third-party sites and accept no responsibility for them.
            </p>
          </section>

          <hr />

          {/* 5 — No warranty */}
          <section aria-labelledby="no-warranty">
            <h2 id="no-warranty">5. No Warranty</h2>
            <p>
              This Site is provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
              <strong>&ldquo;as available&rdquo;</strong> without any warranty
              of any kind, express or implied, including but not limited to
              warranties of merchantability, fitness for a particular purpose,
              accuracy, or non-infringement.
            </p>
            <p>
              I do not guarantee that the Site will be uninterrupted,
              error-free, or free of viruses or other harmful components.
              Portfolio project descriptions and blog posts reflect my knowledge
              and experience at the time of writing and may not be fully
              up-to-date.
            </p>
          </section>

          <hr />

          {/* 6 — Limitation of liability */}
          <section aria-labelledby="liability">
            <h2 id="liability">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, I shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of your access to or use of — or
              inability to access or use — this Site or any content on it.
            </p>
            <p>
              In no event shall my total liability to you for any claim arising
              from your use of this Site exceed the amount you have paid me, if
              any, in the twelve months preceding the claim.
            </p>
          </section>

          <hr />

          {/* 7 — Privacy */}
          <section aria-labelledby="privacy">
            <h2 id="privacy">7. Privacy</h2>
            <p>
              Use of this Site is also governed by my{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>, which is
              incorporated into these Terms by reference. By using this Site,
              you consent to the data practices described in the Privacy Policy.
            </p>
          </section>

          <hr />

          {/* 8 — Governing law */}
          <section aria-labelledby="governing-law">
            <h2 id="governing-law">8. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the <strong>Republic of India</strong>, without regard
              to its conflict of law provisions. Any disputes arising under
              these Terms shall be subject to the exclusive jurisdiction of the
              courts located in Gujarat, India.
            </p>
          </section>

          <hr />

          {/* 9 — Changes */}
          <section aria-labelledby="changes">
            <h2 id="changes">9. Changes to These Terms</h2>
            <p>
              I reserve the right to update these Terms of Service at any time.
              The &ldquo;Last updated&rdquo; date at the top of this page will
              reflect any changes. Your continued use of the Site after changes
              are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          <hr />

          {/* 10 — Contact */}
          <section aria-labelledby="contact">
            <h2 id="contact">10. Contact</h2>
            <p>
              For questions about these Terms, reach out via the{" "}
              <Link href="/contact">contact form</Link> or email:
            </p>
            <address className="not-italic">
              <strong>{AUTHOR_NAME}</strong>
              <br />
              <a href={`mailto:${AUTHOR_EMAIL}`}>{AUTHOR_EMAIL}</a>
            </address>
          </section>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
