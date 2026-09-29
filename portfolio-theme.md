# Portfolio Theme — Color & Design Reference

> Single source of reference for the site's color system and visual theme. Companion to `docs/design.md` (component & layout conventions) and `AGENTS.md` (universal agent standards).
>
> **Sources of truth:** `app/globals.css` (design tokens), `lib/fonts.ts` (typography), `docs/design.md` (design language), `lib/seo/metadata.ts` + `app/manifest.ts` (PWA/browser chrome), `app/blogs/[slug]/opengraph-image.tsx` + `app/projects/[slug]/opengraph-image.tsx` (social cards).
> **Governing skills:** [`agents/skills/ui-ux-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/ui-ux-engineer/SKILL.md) (intentional design tokens, visual hierarchy) & [`agents/skills/accessibility-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/accessibility-engineer/SKILL.md) (WCAG 2.2 AA contrast compliance).

---

## 1. Theme Identity & Brand Palette

**Editorial · High-contrast · Agentic AI aesthetic.**

The portfolio adheres to a strict four-color brand system:

| Role | Color Value | Description & Intent |
|---|---|---|
| **Background** | `#F7F8F2` | **Warm Off-White:** Clean, tactile, editorial baseline surface. Soft on the eyes while preserving high contrast. |
| **Primary Text & Outlines** | `#0A0A0A` | **Deep Black:** Razor-sharp typography, structural borders, headings, and high-impact actions. |
| **Primary Accent** | `#B8FF00` | **Electric Lime:** High-tech vibrancy for state markers, badges, hover glow, and active highlights. |
| **Secondary Text** | `#5F6368` | **Slate Gray:** Subtle supporting body copy, captions, and secondary UI metadata. |
| **Borders** | `#D9DDD2` | **Muted Stone:** Crisp, subtle structural card and section dividers in light mode. |

> [!IMPORTANT]
> **Core Principle:** *"The lime should be an accent, not the whole background. That's what keeps it looking premium rather than flashy."*

### 1.1 Contrast & WCAG 2.2 AA Conformance
- **Deep Black (`#0A0A0A`) on Warm Off-White (`#F7F8F2`):** **17.6:1** (Exceeds WCAG AAA requirement of 7:1).
- **Slate Gray (`#5F6368`) on Warm Off-White (`#F7F8F2`):** **5.1:1** (Exceeds WCAG AA requirement of 4.5:1 for normal text).
- **Warm Off-White (`#F7F8F2`) on Deep Black (`#0A0A0A`):** **17.6:1** (Exceeds WCAG AAA).
- **Deep Black (`#0A0A0A`) on Electric Lime (`#B8FF00`):** **15.6:1** (Exceeds WCAG AAA).
- **Accessibility Rule:** Electric Lime (`#B8FF00`) must **never** be used as raw body text on `#F7F8F2` (contrast ratio ~1.13:1). Lime is strictly an accent: badges with dark text, border glows in dark mode, indicator pings, and dark mode interactive states.

---

## 2. Token Architecture

All color decisions funnel through CSS custom properties defined in `app/globals.css` and mapped into the Tailwind v4 theme via `@theme {}`:

```css
@theme {
  --color-background:         var(--bg-primary);
  --color-foreground:         var(--text-primary);
  --color-text-secondary:     var(--text-secondary);
  --color-text-muted:         var(--text-muted);
  --color-nav-bg:             var(--nav-bg);
  --color-border-primary:     var(--border-primary);
  --color-nav-border:         var(--nav-border);
  --color-footer-bg:          var(--footer-bg);
  --color-hover-bg:           var(--hover-bg);
  --color-primary:            var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent-lime:        var(--accent-lime);
}
```

### 2.1 Tailwind Tokens

| Token | Maps to | Typical use |
|---|---|---|
| `bg-background` / `text-foreground` | `--bg-primary` / `--text-primary` | Page surfaces & primary text |
| `text-text-secondary` | `--text-secondary` | Body copy |
| `text-text-muted` | `--text-muted` | Captions, labels, inactive links |
| `bg-nav-bg` | `--nav-bg` | Frosted-glass navbar |
| `border-border-primary` | `--border-primary` | Card & section borders |
| `border-nav-border` | `--nav-border` | Navbar bottom border |
| `bg-footer-bg` | `--footer-bg` | Footer / page-transition panels |
| `bg-hover-bg` | `--hover-bg` | Interactive hover background |
| `bg-primary` / `text-primary-foreground` | `--primary` / `--primary-foreground` | Inverting FAB / action buttons |
| `bg-accent-lime` / `border-accent-lime` | `--accent-lime` | Brand accent pills, tags, highlights |

**Two-layer strategy:** The **semantic layer** (Tailwind tokens) sits above the **palette layer** (CSS variables), and both swap wholesale when `.dark` is applied. Components never reference hardcoded hex codes.

---

## 3. Color System

### 3.1 Light Theme (`:root`)

| Variable | Value | Tailwind equivalent | Role |
|---|---|---|---|
| `--bg-primary` | `#F7F8F2` | warm off-white | Base page background |
| `--text-primary` | `#0A0A0A` | deep black | Headings, strong text, primary elements |
| `--text-secondary` | `#5F6368` | slate gray | Body copy, secondary descriptions |
| `--text-muted` | `#5F6368` | slate gray | Captions, labels, inactive links |
| `--nav-bg` | `rgba(247, 248, 242, 0.85)` | warm off-white/85 | Frosted-glass navbar |
| `--border-primary` | `#D9DDD2` | muted stone | Structural card & section borders |
| `--nav-border` | `transparent` | — | Navbar bottom border |
| `--footer-bg` | `#EFF1E8` | soft warm gray | Footer background & transitions |
| `--hover-bg` | `#EAECE2` | light stone | Interactive hover background |
| `--accent-lime` | `#B8FF00` | electric lime | Primary brand accent |
| `--primary` | `#0A0A0A` | deep black | Primary button / FAB surface |
| `--primary-foreground` | `#F7F8F2` | warm off-white | Text on `--primary` |

### 3.2 Dark Theme (`.dark`)

| Variable | Value | Tailwind equivalent | Role |
|---|---|---|---|
| `--bg-primary` | `#0A0A0A` | deep black | Base page background |
| `--text-primary` | `#F7F8F2` | warm off-white | Headings, strong text |
| `--text-secondary` | `#A8ADA0` | warm gray | Body copy |
| `--text-muted` | `#75797E` | muted slate | Captions, labels, inactive links |
| `--nav-bg` | `rgba(10, 10, 10, 0.85)` | deep black/85 | Frosted-glass navbar |
| `--border-primary` | `rgba(184, 255, 0, 0.25)` | lime/25 | Card borders — subtle Electric Lime glow |
| `--nav-border` | `rgba(184, 255, 0, 0.15)` | lime/15 | Navbar bottom border |
| `--footer-bg` | `#050505` | obsidian black | Footer background |
| `--hover-bg` | `rgba(184, 255, 0, 0.08)` | lime/8 | Interactive hover background tint |
| `--accent-lime` | `#B8FF00` | electric lime | Primary brand accent |
| `--accent-green` | `#B8FF00` | electric lime | Active ToC border, links hover, commit bars |
| `--accent-red` | `#f87171` | red-400 | Blog "view all" hover, destructive emphasis |
| `--primary` | `#B8FF00` | electric lime | High-impact button / FAB surface |
| `--primary-foreground` | `#0A0A0A` | deep black | Text on `--primary` |

---

## 4. Accent Usage & Design Guidelines

The Electric Lime (`#B8FF00`) accent is applied **deliberately and structurally**:

| Surface | Light Mode | Dark Mode | Effect |
|---|---|---|---|
| **Card border** | `#D9DDD2` | `rgba(184, 255, 0, 0.25)` | Clean stone divider (light) / Hairline lime glow (dark) |
| **Navbar border** | `transparent` | `rgba(184, 255, 0, 0.15)` | Faint lime separation under fixed nav |
| **Hover background** | `#EAECE2` | `rgba(184, 255, 0, 0.08)` | Subtle warm tint (light) / Lime sheen (dark) |
| **Active ToC item** | `border-left-color: #0A0A0A` | `border-left-color: #B8FF00` | Razor-sharp indicator bar |
| **Prose link hover** | `text-primary` (`#0A0A0A`) | `color: #B8FF00` | Clean underline (light) / Lime illumination (dark) |
| **Hero commit bars** | `group-hover:bg-[#0A0A0A]` | `dark:group-hover:bg-[#B8FF00]` | Dynamic activity feedback in bento chart |
| **Primary Buttons** | `bg-[#0A0A0A] text-[#F7F8F2]` | `bg-[#B8FF00] text-[#0A0A0A]` | Inverting high-contrast CTA |

---

## 5. Secondary Color Systems

### 5.1 OpenGraph / Social Cards

Both `opengraph-image.tsx` files use a fixed dark editorial palette independent of theme state:

- **Background:** `linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)` — echoes `--footer-bg` (`#0a0a0a`).
- **Branding bar:** white labels at stepped opacities (`rgba(255,255,255,0.5/0.35/0.2/0.25)`).
- **Texture:** lime, purple, and blue radial glows at low opacity.

| Card type | Accent line gradient |
|---|---|
| Blog | `linear-gradient(90deg, #B8FF00, #3bb4ff)` — electric lime → cyan |
| Project | `linear-gradient(90deg, #B8FF00, #7c4fff)` — electric lime → violet |

### 5.2 Sponsor Button

The only persistent non-token color in the UI: `pink-500` / `pink-600` (`border-pink-200 dark:border-pink-900`, hover fill `bg-pink-500`), used in the desktop nav and mobile menu. Documented exception per `docs/design.md` §2.3.

### 5.3 Semantic State Colors

Standard Tailwind classes are used for stateful feedback (permitted exception in `docs/design.md` §2.3):

| Meaning | Light | Dark |
|---|---|---|
| Success | `green-50` bg, `green-600`/`green-700` text | `green-900/20` bg, `green-400` text |
| Error | `red-50` bg, `red-600` text | `red-900/20` bg, `red-400` text |
| Info / new | `blue-50` bg, `blue-600` text | `blue-900/20` bg, `blue-400` text |
| Neutral disabled | `gray-300` text | inherited |

---

## 6. Typography

Fonts load via `next/font/google` in `lib/fonts.ts` and are exposed as CSS variables on `<html>`:

| Variable | Font | Use |
|---|---|---|
| `--font-geist-sans` | Geist Sans | Default UI: body, nav, cards |
| `--font-geist-mono` | Geist Mono | Code blocks and inline code |
| `--font-playfair` | Playfair Display | Hero `<h1>` only — editorial display serif |

**Type scale highlights:** Hero H1 `text-4xl → sm:text-5xl` font-medium Playfair; Section H2 `text-3xl` bold tracking-tight; Card labels `text-xs` uppercase tracking-wider; prose body `1rem / 1.75` in `--text-muted`.

---

## 7. Dark Mode Implementation

- **Mechanism:** `next-themes` with `class` strategy — `.dark` is applied to `<html>`; all tokens switch via the `.dark {}` block in `globals.css`.
- **Logo:** `dark:invert` flips the black SVG → white.
- **Page transitions:** `CloudTransition` panels use `bg-footer-bg`, adapting from `#EFF1E8` (light) to `#050505` (dark).
- **Browser chrome:** `theme_color: "#0A0A0A"` in both `lib/seo/metadata.ts` and `app/manifest.ts`; `background_color: "#F7F8F2"` in the manifest.

---

## 8. Usage Conventions

1. **Tokens only:** use `bg-background`, `text-foreground`, `bg-hover-bg`, `border-border-primary`, etc. Never `bg-white` / `bg-black` directly — components must adapt automatically across themes.
2. **Borders:** all cards use `border border-border-primary` (renders as `#D9DDD2` in light, Electric Lime hairline glow in dark).
3. **Secondary text:** `text-text-muted` for captions/labels; reserve `text-foreground` for primary content.
4. **Cards on hover:** `transition-shadow hover:shadow-md` — elevation, not scale/transform.
5. **Exceptions:** one-off Tailwind color classes are acceptable for state colors (`bg-blue-50 dark:bg-blue-900/20`) and the pink sponsor button; everything else flows through tokens.
6. **Media:** Cloudinary assets are always wrapped in `optimizeCloudinaryUrl()` so imagery inherits the theme's clean rendering (`f_auto,q_auto`).

---

## 9. Reference Map

| File | Theme role |
|---|---|
| `app/globals.css` | All CSS custom properties + `@theme {}` + prose/TOC styles |
| `portfolio-theme.md` | Single source of truth for color specifications and tokens |
| `lib/fonts.ts` | Font variables `--font-geist-sans`, `--font-geist-mono`, `--font-playfair` |
| `docs/design.md` | Full design language: spacing, motion, components, breakpoints |
| `lib/seo/metadata.ts` | `themeColor: "#0A0A0A"` |
| `app/manifest.ts` | PWA `theme_color` (`#0A0A0A`) / `background_color` (`#F7F8F2`) |
| `app/blogs/[slug]/opengraph-image.tsx` | Blog social card palette (lime → cyan) |
| `app/projects/[slug]/opengraph-image.tsx` | Project social card palette (lime → violet) |
| `components/layout/CloudTransition.tsx` | Uses `bg-footer-bg` for mask panels |
| `app/[routes]` + `components/` | Token consumption via Tailwind classes |

---

*Conventions referenced from [`agents/skills/ui-ux-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/ui-ux-engineer/SKILL.md) and [`agents/skills/accessibility-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/accessibility-engineer/SKILL.md): deliberate choices over templated defaults, a coherent token-based visual language across every screen, and high-contrast accessibility designed in from the start.*