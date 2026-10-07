"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/trackEvent";

/**
 * Fires `scroll_depth_75` once per route when the user scrolls past 75% of
 * the page.
 *
 * The effect is keyed on `pathname` rather than mounting once. The root
 * layout persists across App Router client-side navigations, so a
 * `useEffect(..., [])` would arm exactly once for the whole session and never
 * report depth on any subsequent route. Depending on `pathname` tears down
 * the old listener and re-registers a fresh one with `fired` reset, which is
 * the same `usePathname` re-arm pattern used by `ConditionalFooter` and
 * `CloudTransition`.
 */
export function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let fired = false;
    let cleanupListener: (() => void) | undefined;

    function registerListener() {
      function handleScroll() {
        if (fired) return;
        const scrolled = window.scrollY + window.innerHeight;
        const total = document.documentElement.scrollHeight;
        if (total > 0 && scrolled / total >= 0.75) {
          fired = true;
          trackEvent(analyticsEvents.scrollDepth75, { page: pathname ?? "" });
          window.removeEventListener("scroll", handleScroll);
        }
      }

      window.addEventListener("scroll", handleScroll, { passive: true });
      cleanupListener = () => window.removeEventListener("scroll", handleScroll);
    }

    const idleId =
      typeof window !== "undefined" && typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(registerListener, { timeout: 2000 })
        : setTimeout(registerListener, 1000);

    return () => {
      if (typeof window !== "undefined" && typeof window.cancelIdleCallback === "function" && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId as NodeJS.Timeout);
      }
      cleanupListener?.();
    };
  }, [pathname]);

  return null;
}

export default ScrollDepthTracker;
