"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Vercel Web Analytics + Speed Insights.
 *
 * Both components resolve their script src and event endpoints from
 * `NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG`, which the Vercel build
 * platform injects at build time. That value is absent locally and on any
 * non-Vercel build, so the script degrades to a no-op rather than erroring —
 * this is why there is no env-var gate here, unlike GoogleAnalytics.
 *
 * Each component already wraps itself in a `<Suspense>` boundary because it
 * reads `usePathname`/`useSearchParams`, so no extra boundary is required.
 *
 * Deliberately NOT loaded through `components/LazyClientComponents.tsx`:
 * that boundary exists for widgets needing `ssr: false` (which cannot be
 * used from a Server Component). These components have no browser-only API
 * and render nothing, so they carry no hydration or layout-shift risk.
 */
export function VercelAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default VercelAnalytics;
