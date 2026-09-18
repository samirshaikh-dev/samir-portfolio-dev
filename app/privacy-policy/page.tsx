import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL, AUTHOR_NAME, AUTHOR_EMAIL, SITE_NAME } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Privacy Policy | Samir Shaikh",
  description:
    "Privacy Policy for samir-portfolio-dev.vercel.app — explains what data is collected through the contact form and Google Analytics, how it is used, and your rights.",
  keywords: [
    "Samir Shaikh Privacy Policy",
    "portfolio privacy policy",
    "contact form data policy",
  ],
  alternates: {
    canonical: `${APP_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | Samir Shaikh",
    description:
      "Privacy Policy for Samir Shaikh's portfolio — what data is collected, how it is used, and your rights.",
    url: `${APP_URL}/privacy-policy`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Samir Shaikh",
    description:
      "Privacy Policy for Samir Shaikh's portfolio — what data is collected, how it is used, and your rights.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  url: `${APP_URL}/privacy-policy`,
  description:
    "Privacy Policy for Samir Shaikh's portfolio website — explains data collection, usage, and your rights.",
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

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col flex-1 px-6 pb-20 md:px-10">
      <div className="max-w-3xl mx-auto w-full pt-6 md:pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Privacy Policy", href: "/privacy-policy" },
          ]}
        />
      </div>

      <PageHeader
        title="Privacy Policy"
        subtitle="What data this site collects, why, and how it is handled."
      />

      <div className="max-w-3xl mx-auto w-full">
        {/* Last updated */}
        <p className="text-xs text-text-muted font-mono mb-10">
          Last updated: 18 September 2026
        </p>

        <div className="prose prose-sm prose-gray dark:prose-invert max-w-none text-text-muted prose-headings:text-foreground prose-strong:text-foreground prose-a:text-foreground hover:prose-a:text-text-secondary prose-h2:font-serif prose-h2:italic prose-h2:font-semibold prose-h2:text-xl prose-h3:text-base prose-h3:font-semibold prose-hr:border-border-primary space-y-6">

          {/* 1 — Overview */}
          <section aria-labelledby="overview">
            <h2 id="overview">1. Overview</h2>
            <p>
              This Privacy Policy describes how{" "}
              <strong>{AUTHOR_NAME}</strong> (&ldquo;I&rdquo;, &ldquo;me&rdquo;,
              &ldquo;my&rdquo;) collects, uses, and protects personal
              information on this portfolio website located at{" "}
              <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                {APP_URL}
              </a>{" "}
              (the &ldquo;Site&rdquo;).
            </p>
            <p>
              This is a personal portfolio and professional services enquiry
              website, not a consumer product or SaaS application. Data
              collection is minimal and limited to what is strictly necessary to
              respond to your enquiries and understand aggregate traffic.
            </p>
          </section>

          <hr />

          {/* 2 — Data collected */}
          <section aria-labelledby="data-collected">
            <h2 id="data-collected">2. Data We Collect</h2>

            <h3>2.1 Contact Form</h3>
            <p>
              When you use the contact form at{" "}
              <Link href="/contact">/contact</Link>, the following data is
              submitted and stored:
            </p>
            <ul>
              <li>
                <strong>Name</strong> — provided by you
              </li>
              <li>
                <strong>Email address</strong> — provided by you, used to reply
                to your enquiry
              </li>
              <li>
                <strong>Message</strong> — the content of your enquiry
              </li>
            </ul>
            <p>
              No other personal data (phone number, IP address, device
              fingerprint) is captured through the contact form.
            </p>

            <h3>2.2 Google Analytics</h3>
            <p>
              This site uses <strong>Google Analytics 4 (GA4)</strong> to
              collect anonymised, aggregated usage data including pages visited,
              time on page, referral source, and browser/device type. This data
              is used solely to understand overall traffic patterns and improve
              the site. No personally identifiable information is linked to
              Analytics data.
            </p>
            <p>
              Google Analytics sets cookies in your browser (see Section 4). You
              can opt out using the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>

            <h3>2.3 Server Logs</h3>
            <p>
              The hosting infrastructure (Vercel) automatically logs standard
              HTTP request data — IP address, request path, user agent, and
              timestamp — for security and reliability purposes. These logs are
              managed by Vercel under their own{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              and are not used by me for any other purpose.
            </p>
          </section>

          <hr />

          {/* 3 — How data is used */}
          <section aria-labelledby="data-use">
            <h2 id="data-use">3. How Your Data Is Used</h2>
            <ul>
              <li>
                <strong>Contact form submissions</strong> — used exclusively to
                respond to your enquiry via email. Your data is not sold,
                shared, or used for any marketing purpose.
              </li>
              <li>
                <strong>Analytics data</strong> — used to understand site
                traffic in aggregate. No individual profiling.
              </li>
            </ul>
          </section>

          <hr />

          {/* 4 — Cookies */}
          <section aria-labelledby="cookies">
            <h2 id="cookies">4. Cookies</h2>
            <p>
              This site sets the following cookies:
            </p>
            <ul>
              <li>
                <strong>_ga, _ga_*</strong> — Google Analytics tracking
                cookies. Expire after 2 years / 24 hours respectively.
              </li>
              <li>
                <strong>Theme preference</strong> — a small local storage entry
                (not a cookie) storing your light/dark mode preference. Contains
                no personal data.
              </li>
            </ul>
            <p>
              No session, authentication, advertising, or tracking cookies are
              set beyond the above.
            </p>
          </section>

          <hr />

          {/* 5 — Third-party processors */}
          <section aria-labelledby="third-parties">
            <h2 id="third-parties">5. Third-Party Services</h2>
            <p>The following third-party services process data on behalf of this site:</p>
            <ul>
              <li>
                <strong>Vercel</strong> — hosting and edge infrastructure (
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Neon (Serverless PostgreSQL)</strong> — database storage
                for contact form submissions (
                <a
                  href="https://neon.tech/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Google Analytics</strong> — anonymised usage analytics
                (
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Cloudinary</strong> — image and media hosting (
                <a
                  href="https://cloudinary.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                )
              </li>
            </ul>
            <p>
              I do not sell or share personal data with any third party beyond
              the service processors listed above, and only to the extent
              necessary to operate the site.
            </p>
          </section>

          <hr />

          {/* 6 — Data retention */}
          <section aria-labelledby="data-retention">
            <h2 id="data-retention">6. Data Retention</h2>
            <p>
              Contact form submissions (name, email, message) are retained in
              the database until the enquiry has been resolved and a reasonable
              period has elapsed thereafter, or until you request deletion —
              whichever comes first.
            </p>
            <p>
              Google Analytics data is retained for 14 months per Google&apos;s
              default retention settings.
            </p>
          </section>

          <hr />

          {/* 7 — Your rights */}
          <section aria-labelledby="your-rights">
            <h2 id="your-rights">7. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or
              deletion of any personal data you have submitted through this
              site. To make a request, email{" "}
              <a href={`mailto:${AUTHOR_EMAIL}`}>{AUTHOR_EMAIL}</a> with the
              subject line &ldquo;Data Request&rdquo;. I will respond within 30
              days.
            </p>
          </section>

          <hr />

          {/* 8 — Children */}
          <section aria-labelledby="children">
            <h2 id="children">8. Children&apos;s Privacy</h2>
            <p>
              This site is not directed at children under the age of 13. I do
              not knowingly collect personal data from children. If you believe
              a child has submitted data through this site, contact me at{" "}
              <a href={`mailto:${AUTHOR_EMAIL}`}>{AUTHOR_EMAIL}</a> and I will
              delete it promptly.
            </p>
          </section>

          <hr />

          {/* 9 — Changes */}
          <section aria-labelledby="changes">
            <h2 id="changes">9. Changes to This Policy</h2>
            <p>
              I may update this Privacy Policy from time to time. The
              &ldquo;Last updated&rdquo; date at the top of this page will
              reflect any changes. Continued use of the site after a policy
              update constitutes acceptance of the revised policy.
            </p>
          </section>

          <hr />

          {/* 10 — Contact */}
          <section aria-labelledby="contact">
            <h2 id="contact">10. Contact</h2>
            <p>
              For any questions about this Privacy Policy or your data, contact:
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
