# Design System & Visual Theme Specification (`new-theme.md`)

> **Single Source of Truth** for the visual design language, color palette, design tokens, typography, component styling, and theme behaviors across Samir Shaikh's portfolio.
>
> **Companion Files:** `app/globals.css` (active CSS variables & `@theme`), `portfolio-theme.md` (theme reference), `docs/design.md` (layout standards).
> **Governing Principles:** [`agents/skills/ui-ux-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/ui-ux-engineer/SKILL.md) & [`agents/skills/accessibility-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/accessibility-engineer/SKILL.md).

---

## 1. Visual Theme Identity & Core Philosophy

The visual design system embodies a **high-tech, editorial, agentic AI engineer aesthetic** derived directly from Samir Shaikh's LinkedIn personal branding banner:

* **Minimal & Editorial Baseline:** Grounded in high-contrast typography, warm off-white page surfaces, and razor-sharp outlines.
* **Surgical Accentuation:** Electric Lime (`#B8FF00`) is used strictly as an accent for call-to-action buttons, active states, indicator dots, and subtle dark mode hairline glows.
* **Atmospheric Depth:** Soft radial glows in the upper corners paired with delicate geometric dot-matrix textures provide tactile depth without visual clutter.

> [!IMPORTANT]
> **Core Aesthetic Rule:** *"The lime should be an accent, not the whole background. That's what keeps it looking premium rather than flashy."*

---

## 2. Color Palette & Roles

The system is built on a strict five-role foundation, mapped across light and dark modes:

### 2.1 Brand Palette Breakdown

| Role | Color Name | Hex Code | Purpose & Semantic Application |
|---|---|---|---|
| **Primary Accent** | **Electric Lime** | `#B8FF00` | High-impact CTA pills, live status indicators, dark-mode border glows, active tab markers, highlighter pills. |
| **Dark Baseline** | **Deep Black** | `#0A0A0A` | Headings, primary text in light mode, base page background in dark mode, structural outlines. |
| **Light Baseline** | **Warm Off-White** | `#F7F8F2` | Base page background in light mode, primary text in dark mode. Warm, organic, easy on the eyes. |
| **Secondary Neutral** | **Slate Gray** | `#5F6368` | Body copy, secondary metadata, captions, timestamps, inactive icons. |
| **Structural Border** | **Muted Stone** | `#D9DDD2` | Card borders, section dividers, input outlines in light mode. |

---

## 3. Token Architecture (Tailwind CSS v4 & CSS Custom Properties)

All visual styling flows through CSS custom properties declared in `app/globals.css` and exposed directly as Tailwind utilities via `@theme`:

```css
@theme {
  --color-background:         var(--bg-primary);
  --color-foreground:         var(--text-primary);
  --color-text-secondary:     var(--text-secondary);
  --color-text-muted:         var(--text-muted);
  --color-nav-bg:             var(--nav-bg);
  --color-border-primary:     var(--border-primary);
  --color-border-secondary:   var(--border-secondary);
  --color-nav-border:         var(--nav-border);
  --color-footer-bg:          var(--footer-bg);
  --color-hover-bg:           var(--hover-bg);
  --color-card-bg:            var(--card-bg);
  --color-primary:            var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent-lime:        var(--accent-lime);
}
```

### 3.1 Token Comparison Matrix: Light vs. Dark Mode

| Token Name | Tailwind Utility | Light Mode (`:root`) | Dark Mode (`.dark`) | UI Role |
|---|---|---|---|---|
| `--bg-primary` | `bg-background` | `#F7F8F2` | `#0A0A0A` | Page canvas & background surface |
| `--text-primary` | `text-foreground` | `#0A0A0A` | `#F7F8F2` | Headings, emphasized text, primary icons |
| `--text-secondary` | `text-text-secondary` | `#5F6368` | `#A8ADA0` | Body copy, descriptions, navigation links |
| `--text-muted` | `text-text-muted` | `#5F6368` | `#75797E` | Captions, labels, inactive indicators |
| `--card-bg` | `bg-card-bg` | `#FFFFFF` | `#0E0E0E` | Elevating card bodies & bento surfaces |
| `--border-primary` | `border-border-primary` | `#D9DDD2` | `rgba(184, 255, 0, 0.25)` | Card boundaries, dividers, table borders |
| `--border-secondary` | `border-border-secondary` | `#C8CCC0` | `rgba(184, 255, 0, 0.40)` | Hovered borders, active card outlines |
| `--nav-bg` | `bg-nav-bg` | `rgba(247, 248, 242, 0.85)` | `rgba(10, 10, 10, 0.85)` | Frosted glass floating navigation |
| `--nav-border` | `border-nav-border` | `transparent` | `rgba(184, 255, 0, 0.15)` | Subtle nav separation line |
| `--footer-bg` | `bg-footer-bg` | `#EFF1E8` | `#050505` | Footer containers & page-transition gates |
| `--hover-bg` | `bg-hover-bg` | `#EAECE2` | `rgba(184, 255, 0, 0.08)` | Interactive button/row hover state |
| `--accent-lime` | `bg-accent-lime` / `text-accent-lime` | `#B8FF00` | `#B8FF00` | Electric Lime brand accent |
| `--primary` | `bg-primary` | `#0A0A0A` | `#B8FF00` | High-impact action surface |
| `--primary-foreground` | `text-primary-foreground` | `#F7F8F2` | `#0A0A0A` | Text rendered on `--primary` surface |

---

## 4. Typography & Typographic Hierarchy

Typography is loaded in `lib/fonts.ts` via `next/font/google` and injected as CSS variables on `<html>`:

```typescript
// lib/fonts.ts
--font-geist-sans:  Geist Sans       // Primary UI, Navigation, Headings, Body Copy
--font-geist-mono:  Geist Mono       // Code blocks, metrics, timestamps, badges
--font-playfair:    Playfair Display // Editorial Serif accent for select titles
```

### 4.1 Type Scale & Hierarchy

| Level | Size (Desktop / Mobile) | Weight | Tracking & Leading | Token & Style | Example Context |
|---|---|---|---|---|---|
| **Display H1** | `text-4xl sm:text-5xl md:text-6xl` | `font-black` (900) | `tracking-tight leading-[1.12]` | `text-foreground` | Hero main headline |
| **Display Flourish** | Matches H1 scale | `font-normal italic` | Serif (`--font-playfair`) | `text-text-secondary` | Editorial serif words (`— AI Developer`) |
| **Section H2** | `text-3xl sm:text-4xl` | `font-black` (900) | `tracking-tight leading-tight` | `text-foreground` | "How I Work", "Recent Writings" |
| **Card H3** | `text-xl sm:text-2xl` | `font-bold` (700) | `leading-snug` | `text-foreground` | Case study titles, bento headers |
| **Bento Numerals** | `text-4xl md:text-5xl` | `font-black` (900) | `tracking-tight` | `text-foreground` | Live commits count, stars, followers |
| **Body Copy** | `text-base sm:text-lg` | `font-normal` (400) | `leading-relaxed` | `text-text-secondary` | Hero value proposition, intro blurbs |
| **Secondary Copy** | `text-sm sm:text-base` | `font-normal` (400) | `leading-relaxed` | `text-text-muted` | Sub-descriptions, testimonials |
| **Micro Labels** | `text-[10px] sm:text-[11px]` | `font-semibold` (600) | `tracking-wider uppercase font-mono` | `text-text-muted` | Section tags, categories, date badges |

---

## 5. Visual Accents, Gradients & Atmospheric Effects

To match the high-end LinkedIn personal branding aesthetic, three signature background treatments are applied:

### 5.1 Ambient Radiant Glow (Top-Right)
A soft, non-intrusive Electric Lime radial gradient creates dimensional warmth without muddying readability:
```html
<div
  aria-hidden="true"
  className="absolute -top-32 right-0 w-[550px] h-[550px] 
             bg-[radial-gradient(circle,rgba(184,255,0,0.20)_0%,transparent_65%)] 
             dark:bg-[radial-gradient(circle,rgba(184,255,0,0.10)_0%,transparent_65%)] 
             blur-3xl pointer-events-none -z-10"
/>
```

### 5.2 Geometric Dot Matrix Texture (Canvas Overlay)
An ultra-subtle 24px grid overlay mimicking the technical pattern from the LinkedIn banner:
```html
<div
  aria-hidden="true"
  className="absolute inset-0 
             bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] 
             [background-size:24px_24px] 
             opacity-[0.035] dark:opacity-[0.07] 
             pointer-events-none -z-10"
/>
```

### 5.3 Signature Accent Dot (Top Pinned Marker)
Pill tags and status cards feature an Electric Lime anchor dot pinned to the top border:
```html
<span
  aria-hidden="true"
  className="absolute -top-1 left-1/2 -translate-x-1/2 
             w-2 h-2 rounded-full bg-accent-lime 
             border border-foreground/30 
             shadow-[0_0_6px_rgba(184,255,0,0.7)]"
/>
```

### 5.4 Signature Highlighter Pill
Phrases demanding focal contrast (e.g. `scale reliably`) employ an Electric Lime highlighter container:
```html
<span className="relative inline-block px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl bg-accent-lime text-[#0A0A0A] font-black -rotate-1 shadow-xs border border-black/10 transition-transform hover:rotate-0">
  scale reliably
</span>
```

---

## 6. Component-Level Styling Specifications

### 6.1 Buttons & Interactive Controls

#### Primary Action Button (Electric Lime Pill)
* **Visual Form:** Full pill radius (`rounded-full`), Electric Lime fill, Deep Black text.
* **Classes:**
  ```html
  <button className="inline-flex items-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-6 py-3 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all">
    View Services →
  </button>
  ```

#### Secondary Outlined Button
* **Visual Form:** Full pill radius, subtle border `#D9DDD2`, background matching canvas or card.
* **Classes:**
  ```html
  <button className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-6 py-3 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all">
    Book a Free Call
  </button>
  ```

#### Filter Tabs & Category Pills
* **Default State:** `bg-background dark:bg-card-bg text-text-secondary border-border-primary hover:border-foreground/30 hover:text-foreground`
* **Active State:**
  * Light: `bg-foreground text-background border-foreground shadow-xs font-semibold`
  * Dark: `dark:bg-accent-lime dark:text-[#0A0A0A] dark:border-accent-lime font-bold shadow-[0_0_12px_rgba(184,255,0,0.4)]`

---

### 6.2 Cards, Bento Containers & Elevation

* **Corner Radius Standard:**
  * Large Bento Cards / Hero Containers: `rounded-3xl` (24px)
  * Standard Content Cards (Projects, Blogs, Testimonials, Process): `rounded-2xl` (16px)
  * Small Badges & Input Fields: `rounded-xl` (12px)
  * Action Buttons & Status Pills: `rounded-full` (9999px)
* **Border Standard:**
  * Light Mode: `border border-border-primary` (clean `#D9DDD2` divider)
  * Dark Mode: `border border-border-primary` (`rgba(184, 255, 0, 0.25)` Electric Lime hairline)
* **Shadow Hierarchy:**
  * Base: `shadow-2xs` or `shadow-sm` (`rgba(0, 0, 0, 0.04)`)
  * Hover Elevation: `hover:shadow-md hover:border-foreground/30 transition-all duration-300`

---

### 6.3 Hero Bento Grid & Real-Time Git Commit Graph

* **Container:** `bg-background dark:bg-card-bg border border-border-primary rounded-3xl p-6 md:p-8 flex flex-col justify-between`
* **Commit Graph Bars:**
  * Zero-commit days: `bg-hover-bg group-hover/bar:bg-border-primary` (4% height)
  * Active commit days:
    * Light Mode: `bg-border-primary group-hover/bar:bg-[#0A0A0A]`
    * Dark Mode: `bg-border-primary dark:group-hover/bar:bg-accent-lime dark:group-hover/bar:shadow-[0_0_8px_rgba(184,255,0,0.5)]`
* **Tooltip Card:** `bg-background dark:bg-card-bg text-foreground border border-border-primary rounded-xl px-3 py-1.5 shadow-xl` with 45° bottom caret.

---

### 6.4 Badges, Trust Indicators & Pills

* **Live Availability Status Pill:**
  ```html
  <span className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-border-primary bg-background/90 dark:bg-card-bg/90 backdrop-blur-xs shadow-2xs">
    <span className="w-2 h-2 rounded-full animate-pulse bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]" />
    Available for freelance & full-time roles
  </span>
  ```
* **Production Systems Rating Badge:**
  * 5 Amber Stars: `FaStar text-amber-400`
  * Divider: `text-border-primary`
  * Text: `font-semibold text-text-muted uppercase tracking-wider text-[11px]`

---

## 7. Interaction & State Specifications

| State | Visual Treatment | CSS / Tailwind Tokens |
|---|---|---|
| **Hover (Cards)** | Border darkens or glows lime; elevation scales smoothly. | `hover:border-foreground/30 hover:shadow-md transition-all` |
| **Hover (Links)** | Underline illuminates in Electric Lime (dark) or Deep Black (light). | `hover:text-foreground text-decoration-color: var(--accent-lime)` |
| **Hover (Primary Button)** | Subtle scale up and neon aura expansion. | `hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02]` |
| **Active / Pressed** | Slight scale down for tactile click feedback. | `active:scale-[0.98]` |
| **Focus-Visible** | 2px high-visibility ring with 2px offset. | `focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none` |
| **Selected / Active Tab** | Inverts surface; in dark mode swaps to `#B8FF00` fill with `#0A0A0A` text. | `dark:bg-accent-lime dark:text-[#0A0A0A]` |
| **Disabled** | 50% opacity, pointer events disabled, cursor not allowed. | `opacity-50 cursor-not-allowed pointer-events-none` |
| **Error / Destructive** | Red accent surface with red border; never overrides green tokens. | `bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400` |

---

## 8. WCAG 2.2 Accessibility & Contrast Standards

Per [`agents/skills/accessibility-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/accessibility-engineer/SKILL.md), all token pairs are audited against WCAG 2.2 standards:

* **Deep Black (`#0A0A0A`) on Warm Off-White (`#F7F8F2`):** **17.6:1** &rarr; *Passes WCAG AAA (Req: 7.0:1)*
* **Deep Black (`#0A0A0A`) on Electric Lime (`#B8FF00`):** **15.6:1** &rarr; *Passes WCAG AAA (Req: 7.0:1)*
* **Slate Gray (`#5F6368`) on Warm Off-White (`#F7F8F2`):** **5.1:1** &rarr; *Passes WCAG AA (Req: 4.5:1)*
* **Warm Off-White (`#F7F8F2`) on Deep Black (`#0A0A0A`):** **17.6:1** &rarr; *Passes WCAG AAA (Req: 7.0:1)*
* **Electric Lime (`#B8FF00`) on Deep Black (`#0A0A0A`):** **15.6:1** &rarr; *Passes WCAG AAA (Req: 7.0:1)*

> [!CAUTION]
> **Accessibility Anti-Pattern:** Electric Lime (`#B8FF00`) on Warm Off-White (`#F7F8F2`) has a contrast ratio of **1.13:1** (Severe Failure).
> **Rule:** Never render Electric Lime as text on light surfaces. Lime text is strictly permitted on `#0A0A0A` or dark card surfaces.

---

## 9. Developer & AI Implementation Checklist

When creating or modifying UI components in this repository, strictly adhere to these 6 golden rules:

1. **Use Semantic Tokens Only:** Never use ad-hoc Tailwind colors like `bg-white`, `bg-black`, `bg-gray-100`, or `text-zinc-900`. Always use `bg-background`, `bg-card-bg`, `text-foreground`, `text-text-secondary`, `border-border-primary`.
2. **Card Backgrounds Must Adapt:** Always apply `bg-background dark:bg-card-bg` to cards and modules so they transition smoothly from `#F7F8F2` to `#0E0E0E`.
3. **Pill Radii for Badges & Primary Actions:** CTAs, status badges, and filter tabs must use `rounded-full` with deliberate padding (`px-5 py-2.5` or `px-6 py-3`).
4. **Content Cards Use `rounded-2xl`:** Feature cards, blog cards, testimonial items, and how-it-works cards must use `rounded-2xl` with `p-6` or `p-8`.
5. **Hairline Green Glow in Dark Mode:** Borders must be `border border-border-primary`. Do not manually declare green borders; `--border-primary` automatically renders the hairline Electric Lime glow in `.dark`.
6. **Preserve Content Separation:** Never alter client-provided copy, data structures, or titles when applying this visual theme.