"use client";

import { track } from "@vercel/analytics";
import type {
  AnalyticsEventName,
  AnalyticsEventParams,
} from "@/lib/analytics/events";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispatches a custom event to BOTH analytics backends.
 *
 * - Google Analytics 4 via `window.gtag` (gated on NEXT_PUBLIC_GA_ID)
 * - Vercel Web Analytics via `track()`
 *
 * Both sinks are no-ops when unconfigured, so callers never need to guard:
 * `gtag` is absent when `NEXT_PUBLIC_GA_ID` is unset, and `track` self-no-ops
 * when the Vercel build-time observability config is not injected (local
 * dev, non-Vercel builds, or before Web Analytics is enabled in the
 * dashboard). This preserves the devops-engineer invariant that absent
 * configuration is a silent no-op rather than an error.
 *
 * This module is client-only. Importing it from a Server Component will
 * yield a client reference, not a callable function.
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  params?: AnalyticsEventParams,
): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }

  track(eventName, params);
}
