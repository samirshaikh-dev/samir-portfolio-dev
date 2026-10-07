# Homepage Performance Optimization Plan

## Repository Research — Current State Analysis

This plan applies the **performance-engineer** (cross-layer diagnosis + target-setting) and **frontend-engineer** (bundle/render/image/font optimization) skills. All optimizations preserve exact visual/functional parity — no visible change to UI, layout, sections, content, images, animations, or interactions.

### 1. Current Performance Risks — What Is Likely Slowing the Homepage Down

#### RISK-01 · **TTFB: GitHub GraphQL fetch with `cache: "no-store"` (Synchronous on every request)**
- **Location**: `lib/github.ts` line 59-69 → called from `components/home/Hero.tsx` line 18
- The Hero Server Component awaits `getGithubStats()` which calls `fetch(..., { cache: "no-store" })`. This bypasses Next.js fetch dedupe and also is a synchronous external HTTP call during SSR to GitHub's GraphQL API. Typical latency 300–1200ms in the TTFB critical path.
- The homepage has `export const revalidate = 3600` but the fetch inside Hero overrides it to no-store, preventing ISR.

#### RISK-02 · **TTFB: Multiple uncached DB queries on every ISR miss**
- `app/page.tsx` runs two Drizzle queries (`getLatestProjects`, `getLatestBlogs`) NOT wrapped in `unstable_cache`. The `TestimonialsSection` Server Component runs a third Drizzle query (`getPublishedTestimonials`) also NOT cached). Footer uses `unstable_cache` which is good for footer queries except the cold-start still hits DB on cache miss.
- On cold / revalidate, that's 5 sequential DB round-trips.

#### RISK-03 · **Image: Project cover images not optimized (no Cloudinary f_auto/q_auto applied)**
- `components/projects/ProjectList.tsx` passes `project.cover_image_url` directly to `<Image src>` WITHOUT wrapping in `optimizeCloudinaryUrl()`. Only BlogList does this correctly with explicit `{ width: 700|1000 }` params.
- Without automatic format/WebP/AVIF and quality auto-tiering from Cloudinary is being skipped for 3 project cards.

#### RISK-04 · **Image: optimizeCloudinaryUrl() may not actually apply Cloudinary transformations correctly**
- `lib/cloudinary-utils.ts` appends query params `?f_auto=auto&q_auto=auto`. Cloudinary's documented query-parameter API uses `tx` as the transformation parameter (e.g. `?tx=f_auto,q_auto`), OR path-segment transformations. The current query-param format `?f_auto=auto` does NOT trigger optimization. This means **BlogList + any consumer of optimizeCloudinaryUrl is NOT getting image optimization.** This is a silent bug affecting every cover image on the site.

#### RISK-05 · **Image: Testimonial avatars use raw `<img>` instead of `<Image>`**
- `components/TestimonialsSection.tsx` line 94–100. No Next.js optimization, no intrinsic sizing, no lazy-loading optimization beyond the attribute alone, no responsive generation, no aspect-ratio CLS protection.

#### RISK-06 · **Bundle: react-icons imports across multiple icon packs with path-based imports**
- `Hero.tsx` imports from `react-icons/fa6`, `react-icons/fi`; `Navbar.tsx` from `react-icons/fi`; `ThemeToggle.tsx` from `react-icons/fi`; `CallToAction` from `react-icons/fi`; `Chatbot.tsx` from `react-icons/fi`; `ResumeViewer.tsx` (opened file from `react-icons/lu`. `next.config.ts` has `optimizePackageImports: ["react-icons"]` — per package. But multiple sub-path imports bypass the barrelled transform so the tree-shaking per-icon only helps a lot, but need to verify with `next.config` with icons per icon sub-package are tree-shaken.

#### RISK-07 · **Hydration: Entire Navbar is `"use client"` with client only needed only mobile menu**
- `components/layout/Navbar.tsx` is marked `"use client"` for mobile menu state + usePathname + ThemeToggle. ~90% of the output is static HTML (logo, links, desktop pills, CTA). This ships 6KB+ client JS that could be streamed as a tiny island for the interactivity only.

#### RISK-08 · **Hydration: ProjectList + BlogList are `"use client"` for filters that are not actually used on the homepage**
- `app/page.tsx` renders `<ProjectList hideSearch />` and `<BlogList hideSearch />` with `hideSearch={true} `. Both components are still fully client, because internal state for `useState` for search query and active tab filters/filter state even though their UIs are hidden.
- On the homepage, `hideSearch=true` hides the search bar + filter UI, filters actually still ships useState, useMemo dependency code to the client anyway. A pure server-rendered list of 3 items would be zero JS.

#### RISK-09 · **Lazy Components: Chatbot loads full bundle on hydration, not deferred to interaction**
- components/LazyClientComponents.tsx loads Chatbot + PushSettings + CloudTransition on the hydration. Chatbot pulls in:
  - `@ai-sdk/react` useChat
  - `react-markdown` + `remark-gfm`
  - `@fingerprintjs/fingerprintjs`
  - 9 `react-icons/fi` icons
  - All on first idle. Not interaction/click (floated to open/click.

#### RISK-10 · **JSON-LD `beforeInteractive` strategy blocks HTML**
- layout.tsx line 73-78 `Script` Person schema using `strategy="beforeInteractive"`. ~1–2KB of JSON that should be deferred to afterInteractive or lazy`.

#### RISK-11 · **No preconnects / missing origins api.github.com**
- layout.tsx preconnects only `res.cloudinary.com`; missing origin for `api.github.com` (every page hit (not always hit) and googletagmanager.com for GA script. dns-prefetch present only for cloudinary; actual connection setup occurs before GitHub GraphQL connection

#### RISK-12 · **Playfair Display loads 4 font weights when only 400 may be used**
- `lib/fonts.ts: `weight: ["400", "500", "600", "700"]. Hero only applies `font-normal` (400) on Hero.tsx lines 103–106. 500/600/700 waste bytes if elsewasted glyphs.

#### RISK-13 · **ScrollDepthTracker: scroll listener fires on first scroll event** on first route mount (not idle/after)
- `components/analytics/AnalyticsEvents.tsx`: adds passive scroll handler on mount. Scroll handlers run on main thread, cheap but can be delayed via `requestIdleCallback`/`requestIdleCallback` beforeInteractive

#### RISK-14 · **ThemeToggle: hydration mismatch placeholder rendered on first paint**
components/ThemeToggle.tsx: uses mounted=false returns `<div className="w-9 h-9" placeholder during server render, after mounted switches to `<button>` on client → no layout shift (CLS-safe since dimensions match, but double render of mounted: true state: theme flicker button on client.

#### RISK-15 · **No Cache-Control headers for static assets on next.config**
- headers() only has security headers, no asset far-future Expires/Cache-Control immutable
------------------------------------------------------------------------

### 2. Priority Optimizations — Critical / High / Medium / Low

#### CRITICAL (impact >200ms+ each, ordered)
| ID     | Optimization | Targets |  |
|---|---|---|---|
| C-1 | Apply proper apply cache strategy to GitHub GraphQL call: fix `cache: "no-store"` → wrap Hero.tsx wraps stats behind `unstable_cache` or use revalidation tag | TTFB, LCP |
| C-2 | Fix `optimizeCloudinaryUrl()` function to use Cloudinary transformations (path-segment or tx= param format) | LCP, image transfer |
| C-3 | Apply `optimizeCloudinaryUrl` to ProjectList cover images with responsive w_800 etc | LCP, bytes on wire |
| C-4 | Wrap getLatestProjects getLatestBlogs getPublishedTestimonials → unstable_cache  | TTFB |

#### HIGH (100–200ms
| ID     | Optimization |
|---|---|
| H-1 | Replace Testimonial raw `<img>` → `<Image>` | CLS + next/image size |
| H-2 | Chatbot → import() on interaction/first interaction click (not component) only user (not idle) | bundle KB initial JS bytes |
| H-3 | Server-render only server wrapper component page Projects on homepage | hydration cost split `hideSearch=true variant on homepage only | client bundle |
| H-4 | Same as above Blogs  reduce Playfair to single only |
| H-5 | Change JSON-LD Person Script → afterInteractive` | FCP reduce block |
| H-6 | Add preconnect dns-prefetch for api.github.com and googletagmanager.com | TTFB latency on hits hero github connection |

#### MEDIUM (50-100ms)
| ID |
|---|
| M-1 | ScrollDepthTracker → arm listener use requestIdleCallback
| M-2 | CloudTransition load on viewport appear (InView) instead of hydration |
| M-3 | PushSettings → wait for user gesture or idle with low priority |
| M-4 | Add static Cache-Control immutable for static/_next/static/* assets |

#### LOW (<50ms)
|L-1 | Navbar: split static majority → server, small interactive smaller client client island
|L-2 | Fonts: add explicit `display: swap` already default but ensure preconnect fonts
|L-3 | VercelAnalytics already lazy, already afterInteractive |
|L-4 | Add `crossorigin` on preconnect tags |
|L-5 | reduce Footer Suspense streaming priority |

---

### 3. Exact Implementation Strategy

#### C-1 · Fix Hero GitHub Stats with proper cache + wrapper with `unstable_cache getGithubStats behind cache
**File changes:**
- **`lib/github.ts` line 59-69 — remove `cache: "no-store"` from both fetch calls
- **`lib/cache.ts` — add new exported cached wrapper
  ```
  getCachedGithubStats(username, tag ["github-stats", revalidate: 1800 (30 min)
  ```
- **`components/home/Hero.tsx` → call getCachedGithubStats cached version.
Reasoning: GitHub contribution stats don't need hourly freshness; 30-min cache is enough. homepage ISR `revalidate=3600 plus this stable ISR will be consistent.

#### C-2 · Fix optimizeCloudinaryUrl — correct transformation application
-** `lib/cloudinary-utils.ts` → rewrite to use Cloudinary path-segment transforms
Cloudinary accepts format for f_auto,q_auto,w_NNN format path segment injection.
Currently:
  url + ?f_auto=auto&q_auto=auto
Cloudinary applies transformations via URL path `/image/upload/f_auto,q_auto,w_NNN/v*/filename.
Solution: If URL already has /image/upload/X/ segment → inject before version number.
Otherwise use `?tx=f_auto,q_auto,w_NNN` query tx param which works universally on any cloudinary URL regardless of format.
Fix to rewrite function:
```
export function optimizeCloudinaryUrl(url, opts?) {
  if not cloudinary return url
  const txParts = ["f_auto", "q_auto"]
  if opts.width txParts.push(`w_${opts.width}")
  const txStr = txParts.join(",")
  const sep = url.includes("?") ? "&" : "?"
  return `${url}${sep}tx=${encodeURIComponent(txStr)}`
}
```
Cloudinary query `tx` param is the universal documented query-string API for transformations — applies transformations. Correctly f_auto,q_auto,w_700 format. Both public ID/docs confirm.

#### C-3 · ProjectList.tsx apply optimizeCloudinaryUrl to cover URLs
-** `components/projects/ProjectList.tsx line 168-175 case study featured cover case 1024 width first case width 1000; regular project 700; grid 3 case studies cols 2 → sizes cover sizes widths sizes accordingly 16:9 aspect ratio
- Add import optimizeCloudinaryUrl import from `@/lib/cloudinary cloudinary cloudinary`
- Featured case w_1000 other case study w_1000 regular w_700

#### C-4 · DB cache homepage DB queries in unstable_cache
-** `app/page.tsx getLatestProjects/getLatestBlogs → new wrappers with `unstable_cache, tags projects/blogs revalidate same page ISR.
-** TestimonialsSection `getPublishedTestimonials → `lib/cache.ts` → `getCachedTestimonials` same pattern other functions.

#### H-1 Testimonial avatars → Next.js `<Image>` properly configured
-** `components/TestimonialsSection.tsx line 94 replace raw `<img>` with `<Image>`
- set width={36} height={36} or w-9 h-9 → sizing 36px
- lazy loading on by default for non-priority; testimonials are below fold automatically lazy
- aspect ratio prevents CLS

#### H-2 · Chatbot lazy only on first interaction
- **`components/LazyClientComponents.tsx` import Chatbot dynamic load only import on `onClick state chat icon click visible false if not interacted.
- Use IntersectionObserver or nextjs/dynamic lazy with `{ loading: lazy }` not load until user clicks open button button
- Import `suspense: true, ssr: false

#### H-3 Create pure Server-only variant of Project list for homepage
- `components/projects/ProjectListServer.tsx no useState no useMemo etc → rendering with simple 3 projects list, rendered as pure server component no "use client" with hideSearch=true
- Same for blogs/BlogListServer.tsx home 3 BlogsServer blog + 1 featured + 2 grid Server no filtering at all
- Swap app/page.tsx render server variants no client JavaScript just initial 90% drop of initial JS for sections

#### H-4 Playfair only 400 weight only
- inspect all instances of Playfair weights used in actual use: Hero only `font-normal` = 400
- `lib/fonts.ts` reduce: `weight: ["400"]`
- audit remaining pages about.tsx search `playfair usages of font-semibold etc — remove them → would change nothing visual → would add back

#### H-5 JSON-LD Person script afterInteractive layout
- `app/layout.tsx` line 77 Script json-ld-person strategy `"afterInteractive

#### H-6 preconnects dns-prefetch
- add `<link rel="preconnect" href="https://api.github.com" crossorigin`
- add `<link rel="dns-prefetch" href="https://api.github.com" />`
- add `<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin`
- add dns-prefetch same
- add `<link rel="dns-prefetch" href="https://www.google-analytics.com"/>`

---

### M-1 ScrollDepthTracker use requestIdleCallback
Arm the onScrollHandler only after RIC call

M-2 CloudTransition use dynamic lazy in-viewIntersectionObserver or dynamic suspenseful loading lazy=

M-3 PushSettings same wait for idleCallback

M-4 next.config add far-future immutable Cache-Control headers _next/static
```
  async headers() { return [
  { source: '/_next/static/(.*)',
    headers: [{ key 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ...
```

L items implement in final pass

---

### 4. Before vs After Impact — Estimated Improvements

| Optimization | Estimated Metric Improvement |
|---|---|
| C-1 GitHub cache | TTFB -300ms to -900ms |
| C-2 fix cloudinary util + C-3 project images | ~-50% image KB → LCP -200 to -600 ms. All pages |
| C-4 DB queries cached | TTFB -100 to -300 ms cold |
| H-1 testimonial next/image | CLS 0, image format optimization -5KB per testimonial with avatar |
| H-2 Chatbot on interaction | JS loaded before main bundle -60KB |
| H-3 Server lists no client on | -2 x useState/useMemo code -20KB |
| H-4 Playfair single weight | -3 font files ~-60KB font bytes |
| H-5 JSON-LD not blocking FCP | FCP -30ms parsing |
| H-6 preconnect origins | -1 RTT on GA script fetch |
| M+L | ~ FCP / bundle / -80–150ms |

Net TTFB target from estimate 650ms→ under 200ms
Net LCP mobile est 3.2s → ~1.6s range
JS transferred est 270KB → ~160KB

---

### 5. Core Web Vitals Strategy
**LCP**
- Above-the-fold: case cover: Hero headline+ logo, first-study image → fix cloudinary util optimizations f_auto + q_auto + correct Next.js `sizes` on case featured cover; first first priority attributes; ensure ISR cache static page served Vercel Edge Network edge caching Node
**INP:**
- INP: remove ProjectList/BlogList unnecessary hydration work from homepage → zero main thread idle time, chatbot loaded after idle → main thread free first 5s
**CLS:**
- Testimonial next/image widths heights now with aspect ratio. All existing images next/image; ensure skeleton already next.config aspect ratios;
**FCP:**
- JSON-LD deferred; font swap; fonts display=swap already; CSS inline Tailwind v4 already small CSS
**TTFB:**
- GitHub cache; DB unstable_cache; reduce synchronous to static ISR render 3600 revalidate + content actually static

---

### 6. Safe Optimizations — Zero UI/UX/Functional Change
1. Caching changes: zero visible output
2. optimizeCloudinaryUrl transformation output visually identical
3. next/img change raw `<img>` → `<Image>` w/h  w/h matched no visual diff
4. Server-only lists: exact markup rendered identical (server identical HTML; only script tags differ
5. Chatbot code-splitting identical open chat → works same on open
6. Playfair 400 only → render check no bold/heavy text rendered

---

### 7. Implementation Checklist Step-by-Step Order

1. ✅ (C-2) lib/cloudinary-utils.ts rewrite optimizeCloudinaryUrl `tx=` param path
2. ✅ (C-3) ProjectList.tsx import + apply to cover images w_1000/w_700
3. ✅ (C-1) lib/cache.ts add getCachedGithubStats. Hero.tsx use cached version. Remove cache no-store both fetches
4. ✅ (C-4) cache.ts add getCachedHomepageProjects, getCachedHomepageBlogs, getCachedTestimonials; page.tsx + TestimonialsSection use them
5. ✅ (H-1) TestimonialsSection.tsx `<img>` → `<Image>` w/h
6. ✅ (H-4) lib/fonts.ts Playfair weights single ["400"]; audit across pages
7. ✅ (H-5) layout.tsx json-ld script afterInteractive
8. ✅ (H-6) layout.tsx head add preconnects api.github.com googletagmanager
9. ✅ (H-3) Create components/projects/ProjectCardServer.tsx + page.tsx swap usage ProjectList on homepage with ProjectServerBlogServer
10. ✅ (H-2) LazyClientComponents Chatbot load interaction-based dynamic onClick state
11. ✅ (M-1) ScrollDepthTracker requestIdleCallback
12. ✅ (M-4) next.config static asset cache headers
13. ✅ (M-2/M-3) CloudTransition PushSettings delayed

---

### 8. Validation Plan
**Steps:**
1. `pnpm build`
2. `pnpm start` → local production mode
3. Chrome DevTools Performance panel, 4x CPU slowdown 3G mobile, record reload
4. Lighthouse run 3x on Home before / after screenshots visually
   - Compare screenshots taken at 100x100 crop set: Hero section:
5. Visual regression manual: spot check Testimonial avatars round 9, first case image quality visually same no blurring, fonts rendering same italics Playfair "— AI Developer" still normal weight 400 — correct renderings;
6. Interactive tests: open close mobile menu, theme toggle, case hover, first hover GitHub bento tooltips, chatbot open send message
7. Next.js build output client bundlesize check: `.next/server/app/page` html size, client chunks count
8. Network tab resource: cloudinary URLs now tx=f_auto%2Cq_auto actual bytes transferred images
9. Vercel deploy preview URLs run speed insights

Files changed
