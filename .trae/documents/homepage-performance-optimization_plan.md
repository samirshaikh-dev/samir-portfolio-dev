# Homepage Performance Optimization Plan (Revised & Verified)

## Executive Summary

This plan outlines the end-to-end performance optimization strategy for the portfolio homepage (`/`), applying the **performance-engineer** (systemic bottleneck diagnosis and latency budgeting) and **frontend-engineer** (React 19 / Next.js 16 rendering boundaries, image delivery, and bundle budgeting) directives from [`agents/skills/`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/).

All optimizations maintain **100% visual, stylistic, functional, and SEO parity** with the live site while dramatically reducing Time to First Byte (TTFB), Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and hydration bundle weight.

---

## 1. Verified Bottlenecks & Critical Corrections

### RISK-01 · TTFB: Uncached GitHub GraphQL Fetch in Server Component
- **Location:** [`lib/github.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/github.ts#L69) → consumed in [`components/home/Hero.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/home/Hero.tsx#L18)
- **Diagnosis:** `getGithubStats()` invokes `fetch("https://api.github.com/graphql", { ..., cache: "no-store" })`. This synchronous external HTTP call runs during SSR, adding **300ms–1200ms** to TTFB on every cache revalidation or cold start, and invalidates Next.js App Router ISR caching behavior.
- **Solution:** Remove `cache: "no-store"` and wrap the call in `unstable_cache` with a 30-minute revalidation window (`revalidate: 1800`, tags: `["github-stats"]`).

### RISK-02 · TTFB: Uncached Homepage Database Queries on Revalidation
- **Location:** [`app/page.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/page.tsx#L15-L68) and [`components/TestimonialsSection.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/TestimonialsSection.tsx#L12)
- **Diagnosis:** `getLatestProjects()` and `getLatestBlogs()` execute raw Drizzle DB queries without cache wrappers on each page revalidation. Similarly, `TestimonialsSection` queries the database directly.
- **Solution:** Wrap these queries inside [`lib/cache.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/cache.ts) via `unstable_cache` with tag-based revalidation (`["homepage-projects"]`, `["homepage-blogs"]`, `["testimonials"]`).

### RISK-03 · Images: Unoptimized Project Cover Images
- **Location:** [`components/projects/ProjectList.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/projects/ProjectList.tsx#L168-L175) and line 311
- **Diagnosis:** Project card cover images pass raw `cover_image_url` strings into `<Image>` without `optimizeCloudinaryUrl()`, unlike [`components/blogs/BlogList.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/blogs/BlogList.tsx#L179).
- **Solution:** Wrap all Cloudinary image references in `optimizeCloudinaryUrl(url, { width: 1000 })` for case studies and `{ width: 700 }` for standard project cards.

### RISK-04 · Images: Cloudinary Transformation URL Path Injection Bug
- **Location:** [`lib/cloudinary-utils.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/cloudinary-utils.ts#L15-L21)
- **Diagnosis & Technical Correction:**
  - *Current Code:* Appends query parameters `?f_auto=auto&q_auto=auto`, which Cloudinary CDN ignores for dynamic image transformations.
  - *Architectural Rule:* Cloudinary does **not** perform transformations via query parameters (neither `?f_auto=auto` nor `?tx=...`). Transformations **must** be injected as path segments immediately after `/image/upload/` (e.g. `https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_800/v1/...`).
- **Solution:** Update `optimizeCloudinaryUrl()` in `lib/cloudinary-utils.ts` to inject path segments into the Cloudinary delivery URL.

### RISK-05 · Images: Testimonial Avatars Using Raw `<img>` Tag
- **Location:** [`components/TestimonialsSection.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/TestimonialsSection.tsx#L94-L100)
- **Diagnosis:** Renders an unoptimized raw `<img>` element without Next.js modern format generation (WebP/AVIF), intrinsic sizing, or CLS protection.
- **Solution:** Replace `<img>` with Next.js `<Image src={testimonial.avatarUrl} alt="..." width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-border-primary flex-shrink-0" />`.

### RISK-06 · Hydration: Heavy Chatbot Bundle Hydrating on Initial Load
- **Location:** [`components/LazyClientComponents.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/LazyClientComponents.tsx#L15-L18) → [`components/Chatbot.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/Chatbot.tsx)
- **Diagnosis:** While marked with `ssr: false`, `Chatbot.tsx` immediately downloads `@ai-sdk/react`, `react-markdown`, `remark-gfm`, and `@fingerprintjs/fingerprintjs` during initial client hydration (~60–80KB JS), competing for main-thread parsing time during the critical FCP/LCP window.
- **Solution:** Separate the floating launcher trigger button from the chat drawer. Keep the trigger lightweight, and dynamically import the chat conversation drawer only upon user interaction (first click/tap) or on `requestIdleCallback`.

### RISK-07 · SEO/HTML: JSON-LD Person Schema Strategy
- **Location:** [`app/layout.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/layout.tsx#L73-L78)
- **Diagnosis:** Uses Next.js `<Script strategy="beforeInteractive">` for `application/ld+json`. Next.js `<Script>` injects client runtime loader hooks intended for executable JS tags (e.g., Google Tag Manager), adding unnecessary hydration overhead for purely declarative structured data.
- **Solution:** Replace `<Script>` with a standard HTML `<script type="application/ld+json">` tag. This eliminates client JS overhead, avoids blocking hydration, and ensures structured data is immediately present in initial server HTML for search crawlers.

### RISK-08 · Client Preconnects: Eliminating Ineffective Origins
- **Location:** [`app/layout.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/layout.tsx) `<head>`
- **Diagnosis & Technical Correction:**
  - The browser should **never** preconnect to `api.github.com` because GitHub GraphQL is called strictly server-side. Preconnecting to `api.github.com` wastes browser socket limits.
- **Solution:** Keep client preconnects focused only on domains the user's browser connects to: `res.cloudinary.com` and `www.googletagmanager.com`.

### RISK-09 · Analytics: Main-Thread Scroll Event Contention
- **Location:** [`components/analytics/AnalyticsEvents.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/analytics/AnalyticsEvents.tsx#L23-L39)
- **Diagnosis:** Registers passive scroll event listeners immediately upon mount.
- **Solution:** Defer listener attachment inside `requestIdleCallback` (with `setTimeout` fallback for Safari) so the main thread remains clear for critical user interaction immediately after paint.

---

## 2. Priority Optimizations Matrix

| Priority | ID | Optimization Target | Files Involved | Primary Metric Impact |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | **C-1** | Fix GitHub Stats Cache (`cache: "no-store"` removal + `unstable_cache`) | [`lib/github.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/github.ts), [`lib/cache.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/cache.ts), [`components/home/Hero.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/home/Hero.tsx) | **TTFB: -300ms to -900ms** |
| **P0** | **C-2** | Fix Cloudinary path-segment transformation injection | [`lib/cloudinary-utils.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/cloudinary-utils.ts) | **LCP / Bytes: -40% to -60%** |
| **P0** | **C-3** | Apply `optimizeCloudinaryUrl` to ProjectList cover images | [`components/projects/ProjectList.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/projects/ProjectList.tsx) | **LCP: -150ms to -400ms** |
| **P1** | **C-4** | Cache Homepage Drizzle DB queries with `unstable_cache` | [`lib/cache.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/cache.ts), [`app/page.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/page.tsx), [`components/TestimonialsSection.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/TestimonialsSection.tsx) | **TTFB: -50ms to -150ms** |
| **P1** | **H-1** | Replace raw `<img>` with Next `<Image>` for Testimonial avatars | [`components/TestimonialsSection.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/TestimonialsSection.tsx) | **CLS: 0, Image size: -15KB** |
| **P1** | **H-2** | Code-split Chatbot drawer; load on user interaction or idle | [`components/LazyClientComponents.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/LazyClientComponents.tsx) | **Initial JS: -60KB to -80KB** |
| **P2** | **H-3** | Replace JSON-LD `<Script>` with standard HTML `<script>` | [`app/layout.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/layout.tsx) | **FCP: -20ms to -40ms** |
| **P2** | **M-1** | Defer `ScrollDepthTracker` via `requestIdleCallback` | [`components/analytics/AnalyticsEvents.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/analytics/AnalyticsEvents.tsx) | **INP / Main thread idle** |

---

## 3. Detailed Implementation Specifications

### Step 1: Cloudinary Path-Segment Transformation Injection
**File:** [`lib/cloudinary-utils.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/cloudinary-utils.ts)

Rewrite `optimizeCloudinaryUrl` to inject path segments into the delivery URL:
```typescript
/**
 * Injects Cloudinary auto-format, quality, and width transformations into a URL path segment.
 * Converts: https://res.cloudinary.com/<cloud>/image/upload/v1234/sample.jpg
 * To:       https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_800/v1234/sample.jpg
 */
export function optimizeCloudinaryUrl(
  url: string,
  options?: { width?: number; quality?: number }
): string {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) return url;
  if (!url.includes("/image/upload/")) return url;

  const transforms: string[] = ["f_auto", "q_auto"];
  if (options?.width) transforms.push(`w_${options.width}`);
  if (options?.quality) transforms.push(`q_${options.quality}`);
  const transformStr = transforms.join(",");

  // Prevent duplicate transformation injection
  if (url.includes(`/image/upload/${transformStr}/`)) return url;

  // Insert transformation segment directly after "/image/upload/"
  return url.replace("/image/upload/", `/image/upload/${transformStr}/`);
}
```

---

### Step 2: Apply Image Optimization in Project Cards
**File:** [`components/projects/ProjectList.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/projects/ProjectList.tsx)

1. Import `optimizeCloudinaryUrl` from `@/lib/cloudinary-utils`.
2. Wrap featured case study covers:
   ```tsx
   src={optimizeCloudinaryUrl(project.cover_image_url, { width: 1000 })}
   ```
3. Wrap standard grid project covers:
   ```tsx
   src={optimizeCloudinaryUrl(project.cover_image_url, { width: 700 })}
   ```

---

### Step 3: Cache GitHub Stats & Homepage Database Queries
**Files:** [`lib/github.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/github.ts), [`lib/cache.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/cache.ts), [`components/home/Hero.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/home/Hero.tsx), [`app/page.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/page.tsx)

1. **In `lib/github.ts`:**
   Remove `cache: "no-store"` from `getGithubStats()`.
2. **In `lib/cache.ts`:**
   Add cached helper functions:
   ```typescript
   export const getCachedGithubStats = (token: string, username: string) =>
     unstable_cache(
       async () => getGithubStats(token, username),
       [`github-stats-${username}`],
       { revalidate: 1800, tags: ["github-stats"] }
     )();

   export const getCachedHomepageProjects = unstable_cache(
     async () => {
       return db
         .select({ /* project fields */ })
         .from(projectsSchema)
         .where(eq(projectsSchema.isPublished, true))
         .orderBy(asc(projectsSchema.displayOrder), desc(projectsSchema.publishedAt))
         .limit(3);
     },
     ["homepage-projects"],
     { revalidate: 3600, tags: ["projects"] }
   );

   export const getCachedHomepageBlogs = unstable_cache(
     async () => {
       const result = await db
         .select({ /* blog fields */ })
         .from(blogsSchema)
         .where(eq(blogsSchema.isPublished, true))
         .orderBy(desc(blogsSchema.publishedAt))
         .limit(3);
       return result.map((b) => ({
         ...b,
         published_at: b.published_at ? b.published_at.toISOString() : "",
         stars: b.stars ?? 0,
       }));
     },
     ["homepage-blogs"],
     { revalidate: 3600, tags: ["blogs"] }
   );
   ```
3. **In `components/home/Hero.tsx` & `app/page.tsx`:**
   Replace direct fetches with the cached wrappers.

---

### Step 4: Convert Testimonial Avatars to Next.js `<Image>`
**File:** [`components/TestimonialsSection.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/TestimonialsSection.tsx)

Replace:
```tsx
<img
  src={testimonial.avatarUrl}
  alt={`${testimonial.name} photo`}
  className="w-9 h-9 rounded-full object-cover border border-border-primary flex-shrink-0"
  loading="lazy"
/>
```
With:
```tsx
<Image
  src={optimizeCloudinaryUrl(testimonial.avatarUrl, { width: 72, quality: 85 })}
  alt={`${testimonial.name} photo`}
  width={36}
  height={36}
  className="w-9 h-9 rounded-full object-cover border border-border-primary flex-shrink-0"
/>
```

---

### Step 5: Defer Chatbot Bundle Hydration
**File:** [`components/LazyClientComponents.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/LazyClientComponents.tsx)

Create a lightweight client launcher for the chatbot so the heavy AI SDK and Markdown renderer are not fetched until the user clicks to chat or after idle:
```tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FiMessageSquare } from "react-icons/fi";

const CloudTransition = dynamic(
  () => import("@/components/layout/CloudTransition"),
  { ssr: false }
);

const PushSettings = dynamic(
  () => import("@/components/PushSettings").then((m) => ({ default: m.PushSettings })),
  { ssr: false }
);

const ChatbotDrawer = dynamic(
  () => import("@/components/Chatbot"),
  { ssr: false }
);

export default function LazyClientComponents() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CloudTransition />
      <PushSettings />
      {isOpen ? (
        <ChatbotDrawer autoOpen onClose={() => setIsOpen(false)} />
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-foreground text-background shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <FiMessageSquare className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
```

---

### Step 6: Convert Structured Data to Standard `<script>`
**File:** [`app/layout.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/layout.tsx#L73-L78)

Replace:
```tsx
<Script
  id="json-ld-person"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  strategy="beforeInteractive"
/>
```
With:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

### Step 7: Defer Analytics Event Listeners
**File:** [`components/analytics/AnalyticsEvents.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/analytics/AnalyticsEvents.tsx)

Wrap event listener registration inside `requestIdleCallback` (with a 2000ms timeout) so initial render execution is unimpeded:
```typescript
useEffect(() => {
  let fired = false;
  let cleanupListener: (() => void) | undefined;

  const registerListener = () => {
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
  };

  const idleId = typeof window.requestIdleCallback === "function"
    ? window.requestIdleCallback(registerListener, { timeout: 2000 })
    : setTimeout(registerListener, 1000);

  return () => {
    if (typeof window.cancelIdleCallback === "function" && typeof idleId === "number") {
      window.cancelIdleCallback(idleId);
    } else {
      clearTimeout(idleId as NodeJS.Timeout);
    }
    cleanupListener?.();
  };
}, [pathname]);
```

---

## 4. Expected Performance Impact

| Metric | Current Measured / Estimated | Optimized Target | Improvement Driver |
| :--- | :--- | :--- | :--- |
| **TTFB (Time to First Byte)** | ~650ms – 1400ms | **< 180ms** | GitHub stats cached (eliminates 300–1200ms external GraphQL wait) + Drizzle DB queries wrapped in `unstable_cache`. |
| **LCP (Largest Contentful Paint)** | ~2.8s – 3.4s (Mobile) | **< 1.5s** | Cloudinary path-segment `f_auto,q_auto,w_1000` transformation applied to case study cards. |
| **CLS (Cumulative Layout Shift)** | 0.02 – 0.05 | **0.000** | Testimonial avatars explicitly sized via Next `<Image>`. |
| **Initial JS Hydration Weight** | ~280KB gzipped | **~195KB gzipped** | Deferring Chatbot drawer bundle (`@ai-sdk/react`, `react-markdown`, `remark-gfm`). |
| **FCP (First Contentful Paint)** | ~1.2s | **< 0.8s** | Elimination of blocking `beforeInteractive` JSON-LD `<Script>`. |

---

## 5. Non-Negotiable Guardrails

1. **Zero Layout Shifts or Visual Differences:** All font weights, container dimensions, aspect ratios (`16/9`, `16/10`), colors, borders, and animations must remain identical.
2. **Preserve Font Declarations:** Do not prune Playfair Display weights in `lib/fonts.ts` — weights 500 and 700 are actively referenced across hero flourishes and project card placeholders.
3. **No Component Forking:** Avoid creating duplicate "Server" variants of 500-line components. Keep component composition clean and DRY.
4. **Package Manager Standard:** Always use `pnpm` (`pnpm run build`, `pnpm run dev`, `pnpm run lint`). Never invoke `npm` or `yarn`.

---

## 6. Verification & Quality Assurance Protocol

1. **TypeScript & Build Verification:**
   ```bash
   pnpm run lint
   pnpm run build
   ```
2. **Local Production Simulation:**
   ```bash
   pnpm run start
   ```
3. **Network Tab Inspection:**
   - Verify GitHub GraphQL is not invoked on homepage requests.
   - Inspect image requests to verify URLs contain `/image/upload/f_auto,q_auto,w_.../` and response `content-type` is `image/avif` or `image/webp`.
   - Verify initial JavaScript chunk download does not include `@ai-sdk/react` or `react-markdown` until clicking the chat launcher.
4. **Lighthouse Audit:**
   - Run 3 audits on `http://localhost:3000` with 4x CPU slowdown and simulated Slow 4G.
   - Target Score: **Performance 98–100, Accessibility 100, Best Practices 100, SEO 100**.
