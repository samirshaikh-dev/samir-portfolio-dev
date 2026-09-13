# Portfolio Theme — Color & Design Reference

> Single source of reference for the site's color system and visual theme. Companion to `docs/design.md` (component & layout conventions) and `AGENTS.md` (universal agent standards).
>
> **Sources of truth:** `app/globals.css` (design tokens), `lib/fonts.ts` (typography), `docs/design.md` (design language), `lib/seo/metadata.ts` + `app/manifest.ts` (PWA/browser chrome), `app/blogs/[slug]/opengraph-image.tsx` + `app/projects/[slug]/opengraph-image.tsx` (social cards).
> **Governing skill:** `agents/skills/ui-ux-engineer/SKILL.md` — intentional design, a consistent visual language, and token-based scales rather than ad-hoc per-screen choices.

---

## 1. Theme Identity

**Minimal · High-contrast · Content-first.**

- **Light mode** is clean white with black text — editorial, newspaper-like. It is the neutral baseline with no accent decoration.
- **Dark mode** introduces a subtle green accent palette — the developer/terminal feel. Dark scanlines of green are applied to borders, hovers, and active states rather than as surface fills.
- Decoration is functional: color communicates state (hover, active navigation, live commit activity) instead of existing purely for effect.
- A bento-card layout surfaces real data (GitHub stats) over stock imagery, reinforcing the "terminal dashboard" reading.
- Contrast is maximized: pure black text on pure white (light) and pure white on pure black (dark) — WCAG AA+.

---

## 2. Token Architecture

All color decisions funnel through CSS custom properties defined in `app/globals.css` and mapped into the Tailwind v4 theme via `@theme {}`:

```css
@theme {
  --color-background:      var(--bg-primary);
  --color-foreground:      var(--text-primary);
  --color-text-secondary:  var(--text-secondary);
  --color-text-muted:      var(--text-muted);
  --color-nav-bg:          var(--nav-bg);
  --color-border-primary:  var(--border-primary);
  --color-nav-border:      var(--nav-border);
  --color-footer-bg:       var(--footer-bg);
  --color-hover-bg:        var(--hover-bg);
  --color-primary:         var(--primary);
  --color-primary-foreground: var(--primary-foreground);
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
| `bg-primary` / `text-primary-foreground` | `--primary` / `--primary-foreground` | Inverting FAB / buttons |

Two-layer strategy: the **semantic layer** (Tailwind tokens) sits above the **palette layer** (CSS vars), and both swap wholesale when `.dark` is applied. Components never reference raw hex.

---

## 3. Color System

### 3.1 Light Theme (`:root`)

| Variable | Value | Tailwind equivalent | Role |
|---|---|---|---|
| `--bg-primary` | `#ffffff` | white | Page background |
| `--text-primary` | `#000000` | black | Headings, strong text |
| `--text-secondary` | `#374151` | gray-700 | Body copy |
| `--text-muted` | `#6b7280` | gray-500 | Captions, labels, inactive links |
| `--nav-bg` | `rgba(255,255,255,0.8)` | white/80 | Frosted-glass navbar |
| `--border-primary` | `#e5e7eb` | gray-200 | Card borders |
| `--nav-border` | `transparent` | — | Navbar bottom border (none) |
| `--footer-bg` | `#f9fafb` | gray-50 | Footer background |
| `--hover-bg` | `#f3f4f6` | gray-100 | Interactive hover background |
| `--primary` | `#000000` | black | Button / FAB surface |
| `--primary-foreground` | `#ffffff` | white | Text on `--primary` |

### 3.2 Dark Theme (`.dark`)

| Variable | Value | Tailwind equivalent | Role |
|---|---|---|---|
| `--bg-primary` | `#000000` | black | Page background |
| `--text-primary` | `#ffffff` | white | Headings, strong text |
| `--text-secondary` | `#d1d5db` | gray-300 | Body copy |
| `--text-muted` | `#9ca3af` | gray-400 | Captions, labels, inactive links |
| `--nav-bg` | `rgba(0,0,0,0.8)` | black/80 | Frosted-glass navbar |
| `--border-primary` | `rgba(74,222,128,0.25)` | green-400/25 | Card borders — subtle green glow |
| `--nav-border` | `rgba(74,222,128,0.15)` | green-400/15 | Navbar bottom border |
| `--footer-bg` | `#0a0a0a` | — | Footer background |
| `--hover-bg` | `rgba(74,222,128,0.08)` | green-400/8 | Interactive hover background tint |
| `--primary` | `#ffffff` | white | Button / FAB surface |
| `--primary-foreground` | `#000000` | black | Text on `--primary` |

### 3.3 Accents (Dark Mode Only)

| Variable | Value | Equivalent | Role |
|---|---|---|---|
| `--accent-green` | `#4ade80` | green-400 | Links hover, active ToC border, live commit bars, prose accents |
| `--accent-red` | `#f87171` | red-400 | Blog "view all" hover, destructive emphasis |

---

## 4. Accent Usage in Dark Mode

The green accent is applied **structurally** — it never paints large surface areas, only edges, traces, and state markers:

| Surface | Value | Effect |
|---|---|---|
| Card border | `rgba(74,222,128,0.25)` | Hairline green on every card border |
| Navbar border | `rgba(74,222,128,0.15)` | Faint green line under the fixed nav |
| Hover background | `rgba(74,222,128,0.08)` | Green-tinted hover, e.g. list rows |
| Active ToC item | `border-left-color: var(--accent-green)` | Marks current heading in the sidebar |
| Prose link hover | `color` / `text-decoration-color: var(--accent-green)` | Link feedback in articles |
| Hero commit bars | `dark:bg-[var(--accent-green)]` on hover | Live activity in the bento chart |
| Blog "view all" hover | `--accent-red` | Red counterpoint reserved for blog links |

---

## 5. Secondary Color Systems

### 5.1 OpenGraph / Social Cards

Both `opengraph-image.tsx` files use a fixed dark editorial palette independent of theme state:

- **Background:** `linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)` — echoes `--footer-bg` (`#0a0a0a`).
- **Branding bar:** white labels at stepped opacities (`rgba(255,255,255,0.5/0.35/0.2/0.25)`).
- **Texture:** purple and blue radial glows at low opacity (`rgba(120,80,255,0.12)`, `rgba(60,180,255,0.08)`).

| Card type | Accent line gradient |
|---|---|
| Blog | `linear-gradient(90deg, #7c4fff, #3bb4ff)` — violet → cyan |
| Project | `linear-gradient(90deg, #50c878, #7c4fff)` — emerald → violet |

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
- **Page transitions:** `CloudTransition` panels use `bg-footer-bg`, adapting from `#f9fafb` (light) to `#0a0a0a` (dark).
- **Browser chrome:** `theme_color: "#000000"` in both `lib/seo/metadata.ts` and `app/manifest.ts`; `background_color: "#ffffff"` in the manifest.

---

## 8. Usage Conventions

1. **Tokens only:** use `bg-background`, `text-foreground`, `bg-hover-bg`, etc. Never `bg-white` / `bg-black` directly — the component should adapt to both themes.
2. **Borders:** all cards use `border border-border-primary` (auto-swaps to the green hairline in dark).
3. **Secondary text:** `text-text-muted` for captions/labels; reserve `text-foreground` for primary content.
4. **Cards on hover:** `transition-shadow hover:shadow-md` — elevation, not scale/transform.
5. **Exceptions:** one-off Tailwind color classes are acceptable for state colors (`bg-blue-50 dark:bg-blue-900/20`) and the pink sponsor button; everything else flows through tokens.
6. **Media:** Cloudinary assets are always wrapped in `optimizeCloudinaryUrl()` so imagery inherits the theme's clean rendering (`f_auto,q_auto`).

---

## 9. Reference Map

| File | Theme role |
|---|---|
| `app/globals.css` | All CSS custom properties + `@theme {}` + prose/TOC styles |
| `lib/fonts.ts` | Font variables `--font-geist-sans`, `--font-geist-mono`, `--font-playfair` |
| `docs/design.md` | Full design language: spacing, motion, components, breakpoints |
| `lib/seo/metadata.ts` | `themeColor: "#000000"` |
| `app/manifest.ts` | PWA `theme_color` / `background_color` |
| `app/blogs/[slug]/opengraph-image.tsx` | Blog social card palette (violet → cyan) |
| `app/projects/[slug]/opengraph-image.tsx` | Project social card palette (emerald → violet) |
| `components/layout/CloudTransition.tsx` | Uses `bg-footer-bg` for mask panels |
| `app/[routes]` + `components/` | Token consumption via Tailwind classes |

---

*Conventions referenced from `agents/skills/ui-ux-engineer/SKILL.md`: deliberate choices over templated defaults, a coherent token-based visual language across every screen, and high-contrast accessibility designed in from the start.*