<div align="center">

  # Stefano Biddau — Portfolio

  [![Netlify Status](https://api.netlify.com/api/v1/badges/55a2b1a4-7d4b-4a3e-8edd-444dbf85092a/deploy-status)](https://app.netlify.com/projects/stefanobiddau/deploys)
  ![Version](https://img.shields.io/badge/version-2.0.1-blue)
  [![Node.js](https://img.shields.io/badge/node-%3E%3D24.19.0-brightgreen)](https://nodejs.org)
  [![Nuxt](https://img.shields.io/badge/nuxt-4.6.3-00DC82?logo=nuxt.js)](https://nuxt.com)
  [![Vue](https://img.shields.io/badge/vue-3.5.44-4FC08D?logo=vue.js)](https://vuejs.org)
  [![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6?logo=typescript)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
  ![License](https://img.shields.io/badge/license-Proprietary-red)

  **Stefano Biddau's personal portfolio — Front-End Developer & Web Designer**

  [stefanobiddau.com](https://stefanobiddau.com)

</div>

---

## Developer Notes

> Internal knowledge base for contributors: known issues, gotchas and version decisions that aren't obvious from the code alone. Not part of the numbered docs below — update this section whenever something like this is discovered or resolved.

### ✅ Resolved — `nuxt` upgraded to `4.6.3` (exact, no caret)

`4.5.0`'s bundled major upgrades (Vite 8, unhead v3 type-narrowing on `useHead`, unctx v3) were validated on a feature branch (`npx nuxt typecheck` + `npm run build` clean) and merged. `4.6.x` (Nuxt CLI v4, opt-in `nuxt/server` imports) needs no migration — validated the same way (typecheck + build + prerender clean); CLI v4 requires Node 24.11+, met by the `24.19.0` pin. `4.6.3` is a security + fix patch (dev-server hardening advisories, route-rule fixes), validated with typecheck + build + prerender. `nuxt` stays exact-pinned (no caret) rather than `^` — intentional for this core framework dependency; re-validate the same way before every future bump.

### ✅ Resolved — `NUXT_B2005` false positive on `check-if-page-unused.js`

Build/dev warning `Plugin .../check-if-page-unused.js has no default export and will be ignored at build time` is a known Nuxt false positive — the internal plugin does export a default, Nuxt's build-time check flags it incorrectly. Harmless, doesn't block build or dev server. Tracked upstream: [nuxt/nuxt#35664](https://github.com/nuxt/nuxt/issues/35664). Confirmed absent on `nuxt@4.6.2` (both `npm run build` and `nuxt dev`) and on `nuxt@4.6.3` (`npm run build`). If it resurfaces after a version bump, treat it as a regression tied to that version rather than a project config issue.

### ✅ Resolved — `@nuxt/image` `ipx` provider 500s on Netlify

Images went through `/_ipx/...` returned `500` in production while working fine in `nuxt dev`. Root cause: `ipx` gets bundled into the Netlify serverless function via node-file-trace, which unreliably traces sharp's native `.node` binary and the source images under `public/` — either miss causes the function to crash at runtime. `nuxt dev` runs unbundled (direct `node_modules` + `public/` filesystem access), so the bug never surfaces locally. Fixed by overriding the image provider to `'netlify'` under `$production` in `nuxt.config.ts` (dev keeps `ipx`), offloading transforms to Netlify's built-in Image CDN — no bundling, no native binary involved. Paired with a long-lived `Cache-Control` header on `/.netlify/images/*` in `netlify.toml` (URL+params are immutable per image, safe to cache aggressively).

---

## Table of Contents

1. [Overview](#1-overview)
2. [Getting Started](#2-getting-started)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Components](#5-components)
6. [Pages & Routing](#6-pages--routing)
7. [Composables & Utils](#7-composables--utils)
8. [Server API](#8-server-api)
9. [i18n](#9-i18n)
10. [AI Tooling — Claude Code Context](#10-ai-tooling--claude-code-context)
11. [Deployment](#11-deployment)
12. [Dependencies](#12-dependencies)

---

## 1. Overview

Stefano Biddau's personal portfolio — a production Nuxt 4 SSG/SSR application deployed on Netlify. It showcases professional experience, projects, skills and a contact form. The app is always dark-themed (no light/dark toggle).

**Stack highlights:** Nuxt 4 · Vue 3 · Tailwind CSS v4 · TypeScript (strict) · EmailJS · Zod · i18n (EN + IT) · Netlify

Key design principles:

- **Always dark** — a single dark colour palette; no `dark:` Tailwind variants, no theme switching overhead.
- **Fully static** — all content is embedded at build time, pre-rendered via `routeRules` for maximum performance.
- **i18n-first** — every user-facing string goes through `useI18n()`, supporting English (default) and Italian.
- **Type-safe throughout** — strict TypeScript, types exported by the composable that exposes them, Zod for contact form validation.

---

## 2. Getting Started

### Prerequisites

- **Node.js** ≥ 24.19.0 (see `.nvmrc`)
- **npm**
- **EmailJS** account (required for the contact form)

### Installation

```bash
git clone https://github.com/stefanoBid/stefano-biddau-portfolio.git
cd stefano-biddau-portfolio
npm install
```

### Environment setup

Create a `.env` file at the project root (see [Deployment](#11-deployment) for the full list):

```env
NUXT_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NUXT_EMAILJS_SERVICE_ID=your_emailjs_service_id
NUXT_EMAILJS_TEMPLATE_ADMIN_ID=your_admin_template_id
NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID=your_reply_to_template_id
NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NUXT_GITHUB_TOKEN=github_pat_your_fine_grained_token
```

### Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server at `http://localhost:3000` |
| `npm run build` | Build for production (outputs to `.output/`) |
| `npm run analyze` | Build and open the Nuxt bundle analyzer (`nuxi analyze`) |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run si` | Safe install dependencies (auto-detects branch, and run `npm install` or `npm ci`) |

---

## 3. Project Structure

```
── nuxt.config.ts           ← Nuxt configuration (modules, SSR, runtimeConfig, routeRules, nitro, vite…)
── package.json             ← dependencies and npm scripts
── tsconfig.json            ← TypeScript config — extends .nuxt/tsconfig.app.json
── eslint.config.mjs        ← ESLint flat config (extends @nuxt/eslint, stylistic rules)
── .nvmrc                   ← pinned Node.js version (24.19.0)
── .sb-context/             ← sb-context-fe Claude Code plugin state (project profile + settings)
── i18n/
     locales/
       en.json              ← English translations (source of truth)
       it.json              ← Italian translations
── app/
     app.vue               ← root entry point (NuxtLayout + NuxtPage)
     error.vue             ← global error page
     assets/
       css/
         main.css          ← entry point: imports Tailwind + the 3 files below, page-level base styles
         theme.css         ← colours (raw --sb-* per theme + @theme inline), shadows, radii, breakpoints
         typography.css    ← font families, --text-* role scale, sb-* type utilities, tag styles
         animation.css     ← durations, easings, keyframes, sb-transition/sb-focus, Vue transitions, reduced motion
     components/
       base/               ← reusable design-system components (zero business logic)
       custom/             ← portfolio-specific components (data fetching + business logic)
       the-footer/         TheFooter.vue
       the-header/         TheHeader.vue, TheHeaderMenuToggle.vue
       the-notification/   TheNotificationBanner.vue, TheNotificationBox.vue
       the-page-hero/      ThePageHero.vue
     composables/
       data/                ← content-source composables (i18n- or local-data-backed)
         useGithubStats.ts  ← GitHub profile stats from the prerendered /api/github-stats.json
         useMilestones.ts   ← reads pages.about.milestones from i18n
         useProjects.ts     ← reads pages.projects.personalProjects.list from i18n
         useSelectedWork.ts ← Romano + SB Templates + floating panel, linked to their Projects anchors
         useSkillReferences.ts ← where each skill is used (milestones, projects, templates)
         useSkills.ts       ← hardcoded local skills list, grouped by area and tier
         useTemplates.ts    ← reads pages.projects.sbTemplatesProject.list from i18n
         useLegalDocument.ts ← reads pages.privacy / pages.terms (summary + sections) from i18n
       useCloudinary.ts     ← builds Cloudinary delivery URLs from runtimeConfig
       useContact.ts        ← shared contact-form open state + CV file for the active locale
       useEmailJs.ts        ← EmailJS dual-send (admin + reply-to-user)
       useLockScroll.ts     ← scroll lock with multi-caller safety
       useNotification.ts   ← global notification system
       usePageTransition.ts ← shared skip-transition state (page fade + tab fade)
       useSanitize.ts       ← XSS-safe HTML sanitisation
       useTypedText.ts      ← typed.js wrapper for typewriter animations
     layouts/
       default.vue         ← TheHeader + <slot> + TheFooter + contact form + notifications
     pages/
       index.vue            ← / — Homepage
       about-me.vue         ← /about-me — Career milestones
       my-skills.vue        ← /my-skills — Skills by area and tier
       my-projects.vue      ← nested-route parent — hero + BaseTabs + <NuxtPage/> + CustomClosingCta
       my-projects/
         index.vue           ← /my-projects — featured project, projects grid, studies/exercises list
         sb-templates.vue    ← /my-projects/sb-templates — SB Templates showcase
       privacy-policy.vue   ← /privacy-policy (CustomLegalDocument)
       terms-and-conditions.vue ← /terms-and-conditions (CustomLegalDocument)
     plugins/
       pageTransition.client.ts ← drives usePageTransition state on navigation (skips fades for locale-only/tab changes)
       reveal.ts            ← v-reveal directive: first entrance of below-the-fold elements in the viewport
     router.options.ts     ← custom scrollBehavior, waits for page transition to finish
     types/
       global.d.ts         ← cross-cutting TS types (navigation, rich text, GitHub)
     utils/
       blocksToHtml.ts     ← Rich text blocks → HTML
       generateUuid.ts     ← UUID v4 generator
       markdownToBlocks.ts ← Markdown → RichBlock[] converter (exports `markdownToRichBlocks`; headings, lists, bold, italic, links)
── server/
     api/
       github-stats.json.ts ← GitHub profile stats, prerendered to a static JSON once per build
     routes/
       robots.txt.ts       ← per-request robots.txt, varies by Netlify deploy context
```

---

## 4. Design System

The design system lives entirely in `app/assets/css/`, in four files (`main.css`, `theme.css`, `typography.css`, `animation.css`). It is a **closed** Tailwind v4 theme: the default palette, text sizes, weights, radii, shadows, easings, animations and breakpoints are reset, so only the tokens below generate utilities. The app is **always dark** — no `dark:` Tailwind variants are ever needed. Prefix: `sb`.

### Colours

Literal colours live only in `theme.css`, as raw `--sb-*` variables, mapped to Tailwind roles with `@theme inline`. `@nuxtjs/color-mode` writes `data-theme="dark"` on `<html>`; the palette is the same for every theme. The default layout forces `dark` (`data-color-mode-forced` + `colorMode.preference = 'dark'`), overriding any stale preference saved in `localStorage`.

| Raw variable | Tailwind utility | Value | Usage |
|---|---|---|---|
| `--sb-bg` | `bg-bg` | `#0f0f20` | Page background |
| `--sb-surface` | `bg-surface` | `#1a1a2e` | Card / elevated surface |
| `--sb-surface-2` | `bg-surface-2` | `#232342` | Nested surfaces, inputs |
| `--sb-border` | `border-border` | `#2a2a44` | Default (decorative) borders |
| `--sb-border-strong` | `border-border-strong` | `#6e7299` | Input and control borders (3.26:1 on `surface-2`) |
| `--sb-ink` | `text-ink` | `#f1f1f1` | Primary text |
| `--sb-ink-muted` | `text-ink-muted` | `#9ca3af` | Secondary / placeholder text |
| `--sb-primary` | `bg-primary` / `text-primary` | `#e95905` | CTA, links, highlights |
| `--sb-primary-hover` | `hover:bg-primary-hover` | `#f06a1c` | Hover state of primary |
| `--sb-primary-border` | `border-primary-border` | `#b34704` | Border on primary elements |
| `--sb-on-primary` | `text-on-primary` | `#0f0f20` | Text on a primary fill |
| `--sb-primary-ink` | `text-primary-ink` | `#f47a32` | Orange **as text** (links, CTAs, dates): 5.52:1 on `surface-2`, 6.24:1 on `surface` |
| `--sb-primary-ink-hover` | `hover:text-primary-ink-hover` | `#f8904d` | Hover state of orange text |
| `--sb-success/warning/error/info` | `text-success` etc. | — | Status colours (text) |
| `--sb-*-soft` | `bg-success-soft` etc. | — | Status background tints |
| `--sb-focus-ring` | `ring-focus-ring` | = ink | Focus ring |

Tailwind opacity modifiers are allowed: `bg-bg/80`, `text-ink-muted/70`.

`primary` is for fills, borders and icons; orange text always uses `text-primary-ink` (`primary` itself is only 4.24:1 on `surface-2`). `--sb-gold-100` … `--sb-gold-900` are raw-only illustration colours for the gold skill cards (no Tailwind utilities). The solar system on the Skills page uses the same approach: `--sb-sun-*`, `--sb-planet-*`, `--sb-planet-atmo-*`, `--sb-orbit`, `--sb-planet-shadow`, `--sb-moon-100`. `--sb-tech-*` (adobe-xd, angular, css, figma, flutter, git, graphql, headless-ui, html, java, javascript, mysql, postgresql, python, slack, spring, storybook, strapi, turborepo, vue) are raw-only brand accents for the milestone stack chips, lifted to ≥ 4:1 on `surface`.

### Shapes and shadows

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` / `md` / `lg` / `xl` | 4 / 8 / 12 / 16px | code & links / buttons & inputs / cards & dialogs / logo blocks |
| `shadow-sm` | `0 4px 20px` | Cards, banners |
| `shadow-md` | `0 12px 32px` | Menus, logo blocks |
| `shadow-lg` | `0 20px 60px` | Dialogs, side menu |
| `drop-shadow-md` | `0 0 10px` | Text over images |

All shadows use `--sb-shadow-color` (`rgba(0,0,0,0.45)`). Breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 (no `2xl`).

### Typography — `sb-*`

One utility per role, defined in `typography.css`; each carries family, size, line height, weight and tracking (never colour). Only `sb-display`, `sb-h1`, `sb-h2` change size, in one step at `lg`; `sb-hero` scales fluidly with `clamp()`.

| Class | Font | Size (mobile → desktop) | Usage |
|---|---|---|---|
| `sb-hero` | Bebas Neue | 56 → 120px (fluid) | `ThePageHero` title, 404 code |
| `sb-display` | Bebas Neue | 66 → 75px | Big page titles (legal pages, error, home) |
| `sb-h1` | Bebas Neue | 39 → 44px | Page-level heading (`h1`) |
| `sb-h2` | Bebas Neue | 31 → 35px | Section heading (`h2`) |
| `sb-h3` | Bebas Neue | 27px | Sub-section / card title (`h3`) |
| `sb-h4` | Bebas Neue | 21px | Smallest heading (`h4`–`h6`) |
| `sb-lead` | Space Mono | 19px | Intro paragraph below a title |
| `sb-body` | Space Mono | 17px | Body text (`p`, `body`, inputs) |
| `sb-body-strong` | Space Mono bold | 17px | Emphasis, button text (add `uppercase` for buttons) |
| `sb-label` | Space Mono | 14px | Nav items, chips, tabs (add `uppercase` for nav) |
| `sb-small` | Space Mono | 12px | Captions, help, metadata (add `italic` for captions) |
| `sb-overline` | Space Mono, uppercase, tracked | 12px | Labels (`label`), tags, badges |

```vue
<h2 class="sb-h3 text-ink">My Skills</h2>
<p class="text-ink-muted">Some description.</p>
```

Running text (`p`, `li`, `blockquote`) is justified site-wide with automatic hyphenation (language from `<html lang>`, at least 3 letters each side of a break, never inside `strong` or links) and `text-wrap: pretty`; use `text-center`/`text-left` to opt out, which also turns hyphenation off. Tags `h1`–`h6`, `p`, `label`, `small`, `code` get their role for free; use the class only when the look must differ from the tag. Inside a component `<style>`, use `@reference "~/assets/css/main.css";` then `@apply sb-<role>;`.

**Font families:** `font-display` (Bebas Neue, 400) · `font-body` / `font-mono` (Space Mono, 400 and 700). Weights: `font-normal`, `font-bold` only.

### Motion and focus — `sb-*`

| Class / token | Effect |
|---|---|
| `sb-transition` | colour, background, border, outline, shadow, opacity, transform and Tailwind 4's separate `translate` / `scale` / `rotate` · `--sb-duration-feedback` (150ms) |
| `sb-transition-slow` | same properties · `--sb-duration-layout` (400ms) |
| `sb-focus` | `outline-none focus-visible:ring-2 ring-focus-ring` |
| `sb-focus-within` | same, on `focus-within` |
| `sb-no-focus` | Removes focus ring (only with custom focus handling) |
| `sb-delay-<ms>` | `animation-delay` in ms (`sb-delay-150`), to sequence an entrance |
| `sb-paused` | `animation-play-state: paused` |

Always add `sb-transition` to interactive elements. It does not animate width/height — avoid animating layout properties.

**Motion language.** The site's world is the astronaut, so its one authored moment is a weightless arrival on the home hero: the avatar drifts up and settles (`animate-drift-in`), meanwhile name, "I'm a", lead, CTAs and scroll cue rise in together as one block (`animate-rise-in-slow`, 400ms, transform + opacity only so hydration cannot stall it), and the role types from 100ms (about 35ms per character, on the CSS entrance clock of the block), done in ~1.3s. Afterwards every hero avatar floats slowly (`animate-float` via `BaseFloat`, paused offscreen). Supporting motion only explains state: mobile menu links arrive in sequence (50ms apart) and close at once, the open milestone photo enters with the `fade` transition (enter only: on close the two-column grid goes at once, a leaving photo would drop under the text), buttons press (`motion-safe:active:scale-98`), arrows on text links and skill chips nudge on hover (`motion-safe:group-hover:translate-*`), the Skills orbits pause offscreen.

**First entrance in the viewport — `v-reveal`** (`app/plugins/reveal.ts`, CSS in `animation.css` §5). Put `v-reveal` on a section or card; `v-reveal="index"` staggers a list (80ms per index, max 320ms). On mount the directive hides only elements still below the fold (`.sb-reveal`: opacity 0, `--sb-motion-distance` × 3 down), reveals each one once when it scrolls in (`.sb-reveal--in`, `--sb-duration-entrance`, ease-out) and removes both classes at the end so the element's own hover transitions come back. Server HTML never carries the classes: without JS everything is visible, and nothing above the fold flashes. Under reduced motion it is a plain fade. Used on the home sections and Selected work cards, About milestones and "Alongside", Skills areas, project and template cards and the closing CTA. Never on anchor targets such as the legal sections: an element still offset by `.sb-reveal` makes an in-page jump land under the sticky header.

Durations: `--sb-duration-feedback` 150ms · `-state` 200ms · `-layout` 400ms · `-entrance` 800ms. Easings: `ease-out` (arrival), `ease-in` (exit), `ease-in-out` (state). Animations: `animate-fade-in`, `animate-fade-out`, `animate-rise-in`, `animate-rise-in-slow` (home hero block), `animate-slide-in-right`, `animate-spin`, `animate-drift-in` (avatar arrival), `animate-float` (weightless loop). Under `prefers-reduced-motion`, `--sb-motion-distance` and `--sb-float-tilt` drop to 0, removing all movement while keeping opacity and colour changes.

### Animations — Vue `<Transition>`

| Name | Effect | Enter / leave |
|---|---|---|
| `fade` | Opacity + slight Y offset | 800ms / 150ms |
| `slide-down` | Opacity + slides from top | 200ms / 150ms |
| `scale-fade` | Opacity + scale from 0.95 | 200ms / 150ms |
| `page` | Opacity + blur (page change) | 400ms / 150ms |

```vue
<Transition name="scale-fade">
  <div v-if="isOpen">…</div>
</Transition>
```

### Icons

Always use `<Icon>` from `@nuxt/icon`. The collection prefix is mandatory.

| Collection | Usage |
|---|---|
| `solar` | General UI icons (bold duotone style) |
| `mdi` | General UI icons (outlined) |
| `logos` | Brand / technology logos |
| `flagpack` | Country flags |

```vue
<Icon name="solar:box-minimalistic-bold-duotone" class="size-5 text-primary" />
<Icon name="logos:vue" class="size-5" />
<Icon name="flagpack:it" class="size-5" />
```

---

### 3D avatars

`public/images/3d-avatar/avatar-pose-{1..5}.webp` — full-resolution (1024×1536) WebP with transparent background, quality 92 / alpha 100. One per page: home 4 (waving), About 3 (on a planet), Skills 1 (laptop), Projects 5 (presenting); 2 is unused. They are rendered with `<NuxtImg provider="none">` (registered in `nuxt.config.ts` → `image.providers.none`) so they are served untouched instead of being re-encoded at the global quality 80.

### Cloudinary images

Content images live on Cloudinary, not in `public/`: the SB Templates logos (`sbt-logo`, `sbt-nuxt-logo`, `sbt-flutter-logo`, `sbt-astro-logo` — optimised SVG, viewBox cropped to the artwork, 680×796), the Romano and sb-floating-panel-vue project logos, and the milestone photos (`unisa`, `workstation`). In the locale files `imageSrc` / `coverImageSrc` / `logoSrc` hold only the path after `image/upload/` (`v<version>/<public-id>.<ext>`); `useCloudinary().resolveImageSrc()` turns it into the full URL, while a value starting with `/` stays a file in `public/`. `sbt-logo` is the umbrella logo (SB Templates page header, home "Selected work").

The browser never fetches them from Cloudinary: `<NuxtImg>` uses the default provider (ipx in dev, Netlify Image CDN in production), allowed by `image.domains: ['res.cloudinary.com']` in `nuxt.config.ts` and `[images] remote_images` in `netlify.toml` (scoped to our cloud). Netlify pulls the original server-side, stores it on the edge and serves it from `/.netlify/images` (SVG passes through untouched); Cloudinary is only hit on an edge cache miss. Resizing is left to Netlify; the only Cloudinary transformation is `e_trim` on the sb-floating-panel-vue logo (cuts the transparent margin of the uploaded file — generated once, then cached as a derived asset). Keep the version segment in the path — re-uploading a file gives a new version, hence a new cache key.

Logos with a transparent background set `"coverImageFit": "contain"` on their project: the card (and home "Selected work" / About "Alongside") then shows them whole on a `bg-ink` panel instead of cropping them as a cover.

## 5. Components

All reusable components live in `app/components/`. Three component tiers:

| Prefix | Rule | Examples |
|---|---|---|
| `Base` | Fully reusable, zero business logic, no external data calls | `BaseButton`, `BaseInput`, `BaseTabs` |
| `Custom` | Portfolio-specific, may contain business logic | `CustomSkillsCard`, `CustomContactForm` |
| `The` | Singleton — used once per layout | `TheHeader`, `TheFooter`, `ThePageHero` |

### Base components

### `BaseButton`

Every **action** (submit, download, open, "Read more", links styled as buttons, pagination, close, language switch) uses `BaseButton`. A native `<button type="button">` is allowed only inside controls with their own semantics or drawing: tabs (`BaseTabs`), menu options (`BaseMenu`), and the hamburger (`TheHeaderMenuToggle`). ARIA attributes, `role`, `tabindex` and listeners pass through to the root element.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | `ghost` = text only |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The **only** prop that changes dimensions (see table below) |
| `tone` | `'neutral' \| 'accent'` | `'neutral'` | `ghost` only: `accent` uses `text-primary-ink` |
| `type` | `'button' \| 'submit' \| 'reset' \| 'link'` | `'button'` | `'link'` renders `NuxtLink` (client-side navigation for internal paths); external URLs open in a new tab, show an ↗ icon and announce it |
| `to` | `string` | `undefined` | Required when `type='link'` |
| `ariaLabel` | `string` | `undefined` | Required with `iconOnly` |
| `isDisabled` | `boolean` | `false` | |
| `isLoading` | `boolean` | `false` | Shows spinner |
| `isActive` | `boolean` | `false` | Selected state for `ghost` |
| `iconOnly` | `boolean` | `false` | Square button (36 / 44 / 52px by `size`) |
| `externalIconClass` | `string` | `undefined` | Extra classes on the external-link arrow (e.g. `hidden @xs:inline` to drop it in a narrow container) |

Every variant and `type` produces the same box at a given size; `variant`/`tone` only change colours (a `ghost` keeps a transparent 1px border). Text is always uppercase.

| Size | Height | Padding x | Text | `iconOnly` | Use for |
|---|---|---|---|---|---|
| `sm` | 36px (hit area 44px) | 14px | `sb-label` bold | 36×36 | Supporting or compact actions: on images, toolbars, pagination, filter chips, header controls, language switch, close, secondary form actions ("Clear form") |
| `md` | 44px | 24px | `sb-body-strong` | 44×44 | Default. Actions in page or dialog content: card CTAs, form submit, "Back to home", "Read more" |
| `lg` | 52px | 32px | `sb-body-strong` | 52×52 | The page's main call to action, one per screen, in the first viewport (home CTAs, 404 "Back to home") |

Never resize a `BaseButton` with classes: pick a `size`. Buttons that stack on narrow screens share one width (one-column grid sized to the widest, e.g. the home CTAs). A `ghost` aligned under text compensates its padding with a negative margin (`-ml-6` at `md`).

Slot: `default` (button label / content). Icons inside are spaced by the built-in `gap-2`.

```vue
<BaseButton variant="primary" :is-loading="isSaving" type="submit">
  Save
</BaseButton>
<BaseButton size="sm" type="link" to="https://github.com/stefanBid" variant="outline">
  <Icon name="mdi:github" class="size-4" /> GitHub
</BaseButton>
<BaseButton variant="ghost" tone="accent" class="uppercase" @click="toggle">
  Read more
</BaseButton>
```

### `BaseCard`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | `undefined` | |
| `subtitle` | `string` | `undefined` | |
| `paragraph` | `string` | `undefined` | |
| `variant` | `'dark' \| 'dark-hover' \| 'light' \| 'light-hover'` | `'light'` | |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | |
| `fullCustomContent` | `boolean` | `false` | Disables built-in layout — use `default` slot only |

Slots: `default`, `card-header`, `card-body`, `card-footer`

### `BaseInput`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `name` | `string` | `undefined` | Falls back to `${id}-name` |
| `label` | `string` | `undefined` | |
| `placeholder` | `string` | `'Insert a value...'` | |
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'search' \| 'tel' \| 'url'` | `'text'` | |
| `hint` | `string` | `undefined` | |
| `error` | `string \| null` | `null` | Shows error message + red border |
| `autocomplete` | `string` | `'off'` | |
| `prefixIcon` | `string` | `undefined` | Iconify name e.g. `solar:magnifer-bold-duotone` |

Model: `defineModel<string>('input')`

### `BaseTextarea`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `name` | `string` | `undefined` | |
| `label` | `string` | `undefined` | |
| `placeholder` | `string` | `'Insert a value...'` | |
| `hint` | `string` | `undefined` | |
| `error` | `string \| null` | `null` | |
| `maxLength` | `number` | `undefined` | Shows character counter when set |
| `minLength` | `number` | `undefined` | Below it, the counter tracks the minimum (`4 / 10`), then the maximum. The hint is replaced by the error when there is one |

Model: `defineModel<string>('input')`

### `BaseCheckbox`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `name` | `string` | `undefined` | |
| `label` | `string` | `undefined` | Shown if no `default` slot |
| `error` | `string \| null` | `null` | Rendered below, linked via `aria-describedby` (no live region: the form announces one summary and moves focus) |

Model: `defineModel<boolean>('input')`
Slot: `default` (custom label content, rendered inside a `<label for>` so the text toggles the box)

### `BaseChip`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `text` | `string` | — | Required |
| `icon` | `string` | `undefined` | Iconify name |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | `ghost` = transparent, `border-strong` outline |
| `accentColor` | `string` | `undefined` | CSS colour for the border (e.g. `var(--sb-tech-vue)`) |
| `clickable` | `boolean` | `false` | Renders as `<button>` |
| `linkable` | `{ href: string, target?: string, rel?: string }` | `undefined` | Renders as `<a>` |

Emits: `chip-click` (only when `clickable: true`)

### `BaseDialog`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `isOpen` | `boolean` | — | Required |
| `title` | `string` | — | Required |
| `subtitle` | `string` | `undefined` | |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'sm'` | |

Emits: `(e: 'close', value: false): void`
Slots: `default` (body), `header`, `footer`
Behaviour: closes on `Escape` (unless a floating panel inside already handled it — `defaultPrevented`), locks scroll, traps Tab inside and restores focus on close (`useFocusTrap`), uses `<Teleport to="body">`.

### `BaseMenu`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Required. Accessible name of the menu; trigger text (its `aria-label` with `iconOnly`) |
| `items` | `MenuItem[]` | — | Required. `links`: `code` is the `href`; `select`: `code` is the value. `icon` + `iconType` optional, shown in a tile before the label; `description` optional second line; `download` (links only) = filename for the anchor's `download` attribute, with a download icon |
| `kind` | `'links' \| 'select'` | `'links'` | `links`: `role="menuitem"` anchors; `select`: `role="menuitemradio"` buttons with a check on the selected item, and the trigger shows the selected `code` (like a native `<select>`, `aria-label` = `code – label`) |
| `icon` | `string` | `undefined` | Trigger icon, before the text |
| `iconOnly` | `boolean` | `false` | Same as `BaseButton`: square trigger with the icon only, `label` as `aria-label`, no chevron |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'secondary'` | `BaseButton` variant of the trigger |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | `BaseButton` size of the trigger (icon `size-4` at `sm` with text, `size-5` otherwise) |
| `placement` | `SbPlacement` | `'bottom-start'` | Panel placement; flips when there is no room |

Model: `defineModel<string | null>('selected', { default: null })` — used by `kind="select"`, `null` = nothing selected (the trigger shows `label`); ignored by `links`.
The trigger is always a `BaseButton` (`isActive` while open): icon and text on the left, chevron (flips while open) pushed to the far right (`ml-auto`), so it stays at the edge when the trigger is stretched. Built on `sb-floating-panel-vue`: `SbFloating` renders the `role="menu"` panel (`fixed`, at least as wide as the trigger). The library handles ↓/↑ on the trigger, ↑/↓/Home/End/typing, click outside and Escape (only the menu, focus back to the trigger) and close-on-pick for links (`closeOnSelect`). Each item: icon tile (`bg-bg`, border) + label and optional description; hover/focus tints the row (`bg-primary/8`) and turns the tile orange, the selected `select` item keeps the tint (`bg-primary/12`, orange tile, bold label, check). `select` opens on the checked item (`autofocus`) and calls the container's `close()` after a pick, since `closeOnSelect` skips `menuitemradio`. External links open in a new tab with the arrow icon and the `a11y.newTab` hint. Used by `TheHeader` (language switcher: `kind="select"`, `ghost`, `sm`, `bottom-end`) `CustomProjectsLinks` (more than one link) and the CV download (`useContact().cvItems`, in the home hero, `CustomClosingCta` and the mobile menu).

### `BaseCloseButton`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Required. Accessible name (`aria-label`) |

Emits: `(e: 'close', value: false): void`. Renders a `solar:close-circle-bold-duotone` icon button (`type="button"`).

### `BaseTabs`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `tabs` | `{ label: string, icon?: string, id: string \| number }[]` | — | Required. Rendered as native underlined text tabs; `icon` is not shown |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | |
| `selectedTabId` | `string \| number` | first tab | |
| `panelId` | `string` | `undefined` | `id` of the `role="tabpanel"` the tabs control |

Emits: `(e: 'select', tabId: string | number): void`. Roving tabindex; ←/→/↑/↓/Home/End move and select.

### `BaseEmptyBox`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | — | Required |
| `message` | `string` | — | Required |
| `icon` | `string` | `'solar:box-minimalistic-bold-duotone'` | |
| `dimension` | `'normal' \| 'small'` | `'normal'` | |

### `BaseFloat`

No props, default slot. Wraps content in `animate-float` (slow weightless drift: up `--sb-motion-distance` × 1.5 with `--sb-float-tilt` rotation and back, 8s; starts and ends at rest so it takes over from `animate-drift-in` without a jump) and pauses it while off screen (`useElementVisibility` → `sb-paused`). Under reduced motion distance and tilt are 0, so nothing moves. Put the size classes on `BaseFloat` and `w-full` on the child; delay the start with `sb-delay-*` when an entrance runs first. Used by the home hero and `ThePageHero` avatars.

### `BaseCountUp`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `number` | — | Required. Final value, formatted with `Intl.NumberFormat` for the active locale |
| `duration` | `number` | `1400` | Milliseconds, exponential ease-out |

Counts from 0 to `value` the first time it is 60% in view. SSR and no-JS render the final value; `prefers-reduced-motion` skips the animation. The animated digits are `aria-hidden`, screen readers get the final value only.

### `BaseRichText`

| Prop | Type | Notes |
|---|---|---|
| `blocks` | `RichBlock[]` | Required |

Converts `RichBlock[]` to sanitised HTML via `blocksToHtml` + `useSanitize`. Plain left clicks on internal links (`/…`) go through `navigateTo`, so they don't reload the app. Never write `v-html` directly — always use this component.

---

### Custom components

### `CustomContactForm`

| Prop | Type | Notes |
|---|---|---|
| `openForm` | `boolean` | Controls visibility |

Emits: `(e: 'closeForm', value: boolean): void`
Uses `useEmailJs` for dual send (admin + reply-to-user), `zod` for validation, `useNotification` for feedback.

### `CustomSkillsCard`

Vertical tile (icon above name) for the home "Core stack" grid.

| Prop | Type | Notes |
|---|---|---|
| `name` | `string` | Required |
| `icon` | `string` | Required. Iconify name |

### `CustomSkillsChip`

Inline skill chip (icon + name) for the Skills page tier lists. A linked gold chip gets its own gold hover border (scoped CSS sits outside the Tailwind layers and would hide `hover:border-ink-muted`).

| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | `string` | — | Required |
| `icon` | `string` | — | Required. Iconify name |
| `gold` | `boolean` | `false` | Gold treatment — set for `core` tier skills: gold chip, gold rim around the dark logo tile |
| `onLight` | `boolean` | `false` | Light logo tile for dark logos |
| `to` | `RouteLocationRaw` | `undefined` | When set, the chip is a `NuxtLink` with a trailing arrow (orange on hover) to where the skill is used |
| `seenIn` | `string` | `undefined` | Name of that place, read by screen readers after the skill name (`pages.skills.chipSeenIn`) |

The Skills page passes each skill's `referenceBySkill` entry from `useSkillReferences()`; skills with no reference stay plain chips.

### `CustomSkillsTierIcon`

Three concentric rings with the given tier's ring highlighted (inner = `core`, middle = `solid`, outer = `familiar`). Decorative (`aria-hidden`), used in the Skills legend and tier headings.

| Prop | Type | Notes |
|---|---|---|
| `tier` | `SkillTier` | Required |

### `CustomProjectsCard`

| Prop | Type | Notes |
|---|---|---|
| `id` | `string \| number` | Required. Renders the article as `#project-<id>` (deep-link target) |
| `title` | `string` | Required |
| `meta` | `string` | Optional `type · year · stack` line under the title (from `pages.projects.personalProjects.list[].meta`) |
| `content` | `RichBlock[]` | Rich text rendered via `BaseRichText`. Up to 2 blocks are shown in full; longer text shows the first block and "Read more" expands in place |
| `imageSrc` | `string` | Optional project cover. Without it the card has no image panel, the "Ongoing" chip moves above the title and `featured` stays one column |
| `imageAlt` | `string` | Optional alt text |
| `imageFit` | `'cover' \| 'contain'` | `'cover'`. `contain` shows the image whole on a `bg-ink` panel — for logos with a transparent background (from `coverImageFit`) |
| `codebaseUrls` | `MenuItem[]` | Optional source links ("Code") |
| `deploymentUrls` | `MenuItem[]` | Optional live links ("Live site"); npmjs.com links are labelled "npm" |
| `initiallyExpanded` | `boolean` | `false`. Set by `my-projects/index.vue` for the project named in the URL hash |
| `isOngoing` | `boolean` | `false`. Shows an "Ongoing" chip on the cover (above the title when there is no cover); `my-projects/index.vue` sorts ongoing projects first |
| `featured` | `boolean` | `false`. Spans both grid columns with cover and full text side by side (`lg`: cover 2/5 at a fixed `h-72`, top-aligned and sticky under the header (`top-24`) while the text scrolls, text 3/5), no "Read more". `my-projects/index.vue` sets it for ongoing projects |
| `isHighlighted` | `boolean` | `false`. Orange ring (offset 4px) set by `my-projects/index.vue` for 2.4s on the project a deep link landed on; archive rows get an orange tint instead |

Links render through `CustomProjectsLinks` (see below).

Deep links such as `/my-projects#project-<id>` (used by the home "Selected work" cards) open and scroll to that project; the scroll is handled in `app/router.options.ts` after the page transition.

Each card keeps its own height in the grid (`items-start`), so expanding one never stretches its neighbour. The grid ends with an SB Templates teaser card (logo, meta and outcome from `useSelectedWork`, `secondary` link button "See the templates" to the SB Templates tab); it spans both columns only when it would be alone in the last row. The cover shows only the image (and the "Ongoing" chip); title, meta, text and the `secondary` link buttons sit below it, always with visible labels. The thesis, personal exercises (Sfrigola Core, Sfrigola App) and course exercises (`ARCHIVED_PROJECT_IDS` in `my-projects/index.vue`) are not cards: they are listed after the grid as compact rows (title, meta, `CustomProjectsLinks` at `size="sm"`) under `pages.projects.personalProjects.archiveTitle`, keeping their `#project-<id>` anchors.

### `CustomProjectsLinks`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `codebaseUrls` | `MenuItem[]` | `[]` | Source links ("Code") |
| `deploymentUrls` | `MenuItem[]` | `[]` | Live links ("Live site"); all-npmjs.com links are labelled "npm" with the `mdi:npm` icon |
| `size` | `'sm' \| 'md'` | `'md'` | `md` in `CustomProjectsCard`, `sm` in the studies rows of `my-projects/index.vue` |

Code and live links form one list: up to three links are separate `secondary` `BaseButton` links ("Code", "Live site", "npm", plus the link's own label when a kind repeats), more go into one `BaseMenu` ("Links", `pages.projects.links.menu`). Each item is labelled after its kind ("Code", "Live site", "npm"), with the link's own label as `description` when a kind has more than one link. Renders nothing without links; the caller owns the wrapper and its spacing.

### `CustomSbTemplatesCard`

| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | Required |
| `description` | `string` | Required |
| `codebaseUrl` | `string` | Required |
| `logoSrc` | `string` | Optional |
| `langIcons` | `string[]` | Optional Iconify names for tech stack |

Logo, centred title and tech icons; the description is running text, justified like the rest of the site.

### `CustomMilestone`

| Prop | Type | Notes |
|---|---|---|
| `id` | `string \| number` | Required |
| `isOpen` | `boolean` | Required — controlled by the page |
| `role` | `string` | Required — card heading |
| `period` | `MilestonePeriod` | Required — `start – end` line, duration after `organization · type` |
| `content` | `RichBlock[]` | Required — first block only while closed |
| `organization` / `typeLabel` | `string` | Optional |
| `stack` | `MilestoneStackItem[]` | Optional — rendered as `ghost` `BaseChip`s, with the technology logo and a brand-coloured border when known |
| `imageSrc` / `imageWidth` / `imageHeight` | | Optional — polaroid `figure`, shown only when open |
| `imageCaption` | `string` | Optional — `figcaption` (image `alt` is then empty) |

Emits `toggle(id)`. Each milestone opens and closes on its own (Read more ↔ Show less, `aria-expanded`); the timeline dot is decorative. From `lg`, a milestone with clients, stack or an open photo splits in two columns: text and Read more on the left, a 22rem column on the right with clients, stack chips and, when open, the photo (`h-72`, sticky under the header) — the card never shows text beside empty space. Below `lg` the two columns are `display: contents` and `order` keeps the stacked order: clients, stack, text, photo, Read more. Closing a milestone whose top is above the viewport scrolls it back into view, instantly under reduced motion.

### `CustomClosingCta`

| Prop | Type | Notes |
|---|---|---|
| `showProjectsLink` | `boolean` | Optional — adds a link to My Projects |
| `title` | `string` | Optional — replaces `pages.home.closingCta.title` |
| `text` | `string` | Optional — replaces `pages.home.closingCta.text` |
| `imageSrc` | `string` | Optional — avatar pose, default `avatar-pose-2.webp` |

Closing call to action at the end of every main page: contact (emits `contact`; pages set `useContact().isFormOpen`, the layout owns the single `CustomContactForm`), CV download menu (EN/IT, active locale first), mailto fallback. About Me passes its own copy (`pages.about.closingCta`, the "next chapter" after the timeline) and pose (`avatar-pose-5.webp`, hand held out).

### `CustomGithubStats`

| Prop | Type | Notes |
|---|---|---|
| `stats` | `GithubStats` | Required |

Home page GitHub section: a ledger of animated counters (`BaseCountUp`) — contributions in the last year (only when the build had a token), public repositories, stars received, years on GitHub, values in `sb-h3` `text-ink` with only contributions in `text-primary-ink` — next to the three most-starred own repositories. The page hides the whole section when `useGithubStats()` returns `null`.

### `CustomLegalDocument`

| Prop | Type | Notes |
|---|---|---|
| `id` | `string` | Required. Prefix for the hero (`<id>-hero`), summary and TOC ids |
| `legalDocument` | `LegalDocument` | Required. From `useLegalDocument('privacy' \| 'terms')` |
| `updatedIso` | `string` | Required. `YYYY-MM-DD` of the last content change, shown as "Last updated" (UTC, locale format); keep it equal to the page's sitemap `lastmod` |
| `related` | `'privacy-policy' \| 'terms-and-conditions'` | Required. The other legal page, linked at the end |

Shared layout of Privacy Policy and Terms and Conditions: `ThePageHero` (title + plain-language lead), "Last updated", an "At a glance" summary, then numbered sections (`<section id>` with `scroll-mt-24`, linkable as `#rights`, `#processors`…) rendered with `BaseRichText` at `max-w-prose`. Table of contents: a sticky left rail from `lg` (20rem; numbers hang, titles `text-balance`) (active section in `text-primary-ink`, `aria-current="location"`, computed from the scroll position), a collapsible `<details>` above the summary below `lg`, which folds again when a section is picked. List items that start with a bold label (`**Access** Get a copy…`) show the label on its own line, and `mailto:` links sit on their own line so the justified line before them does not stretch. Ends with the contact `BaseButton` (opens the shared form via `useContact`), a link to the related page and "Back to top" (scrolls to the top and moves focus to the hero `h1`, which is `tabindex="-1"`).

### `CustomSolarSystem`

Animated orbit diagram on the Skills page (`lg` and up), one per area. The tier is encoded three ways: orbit distance (inner = `core`, middle = `solid`, outer = `familiar`), planet size (1 / 0.85 / 0.75) and body (`core`: gold medal rim around a dark face; `solid`: `surface-2` disc; `familiar`: dashed empty shell). Logos always sit on a dark face, or a light one for `onLight` skills, at full opacity; each planet is a real skill and logos stay upright. Purely visual (`aria-hidden`) — the tier lists beside it carry the same data. Sized by its container; paused under `prefers-reduced-motion`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `tiers` | `SkillTierGroup[]` | — | Required. One orbit per non-empty tier |
| `activeId` | `string \| null` | `null` | Skill to highlight (others dim) — set while hovering its chip |

Each `Custom*` component ships with a matching `*Skeleton.vue` for loading states.

---

### Singleton components (The*)

### `TheHeader` / `TheHeaderMenuToggle`

Top navigation bar. Desktop: logo left; nav and language menu (`BaseMenu` `kind="select"`, ghost, showing `EN`/`IT`) right. The nav has a fixed width (fits the longest locale) with labels spread evenly (`justify-between`), so it never resizes on a language switch; the active link's underline matches its text width. Mobile: `TheHeaderMenuToggle` opens a full-screen menu under the header, with large Bebas links in the lower half (active one marked by the orange rule) then "Get in touch" `BaseButton` (closes the menu and opens the contact form) and the "Download CV" `BaseMenu` (`top-start`, EN/IT), and `EN | IT` `BaseButton`s (`aria-pressed`); switching language keeps the menu open. Focus is trapped in the panel and returns to the toggle on close; Escape closes it; page scroll is locked.

### `TheFooter`

Bottom bar with navigation links and social icons.

### `TheNotificationBanner` / `TheNotificationBox`

Notification display layer. `TheNotificationBanner` shows toast-style banners at screen top; `TheNotificationBox` shows a fixed overlay list. Both consume `useNotification()` state.

### `ThePageHero`

Page opener for About, Skills and Projects: the page `h1` in `sb-hero` (fluid 56 → 120px, `rise-in`) and, with `imageSrc`, a decorative 3D avatar (`alt=""`, fade-in) — on the right from `lg`, above the title (160px wide) on mobile, 240×360px on desktop. Closed by a bottom border. Props: `id`, `text`, `imageSrc?`, `lead?` (one `sb-lead` paragraph under the title), `overline?` (orange `sb-overline` above the `h1`: About names the page there, "About me", and keeps the `h1` for a first-person line). On Projects the hero comes before the tabs and each tab's heading is an `h2`. The home page has its own first screen (`h1` = the name alone, then "I'm a" + typed role, CTAs, avatar): exactly one viewport tall (`min-h-svh`, pulled under the sticky header), with a link down to Selected work; below it, a clients band (SI2001 clients and freelance clients, names only).

---

### Creating a new component

**Base component:**
1. Create `app/components/base/<my-widget>/BaseMyWidget.vue`
2. Use `<script setup lang="ts">` with sections: `// Dependencies`, `// Input / Output`, `// Data`, `// Events`
3. Zero business logic — no external data calls
4. Style with design tokens only (no raw hex, no hardcoded sizes)

**Custom component:**
1. Create `app/components/custom/<feature>/CustomMyFeature.vue`
2. May contain business logic and use composables
3. Always pair with `CustomMyFeatureSkeleton.vue` for loading states when needed

**The component:**
1. Create `app/components/the-<name>/TheMyName.vue`
2. Singleton — used once per layout; no props unless strictly necessary

---

## 6. Pages & Routing

All pages live in `app/pages/` and follow Nuxt 4 file-based routing. Every public page is **pre-rendered** at build time via `routeRules` in `nuxt.config.ts`. The i18n strategy is `prefix_except_default`: English is the default (no prefix), Italian gets `/it/`.

### File-based routing

| File | Route (EN) | Route (IT) | Content |
|---|---|---|---|
| `index.vue` | `/` | `/it` | Hero, Selected work, clients band, core stack, GitHub stats, one-line Experience strip, `CustomClosingCta` |
| `about-me.vue` | `/about-me` | `/it/about-me` | Career milestones timeline + "Alongside the day job" proof list + `CustomClosingCta` with its own copy and pose |
| `my-skills.vue` | `/my-skills` | `/it/my-skills` | Tier legend (short labels on one line below `md`, full descriptions from `md`), one section per area (tier lists + `CustomSolarSystem`), `CustomClosingCta` |
| `my-projects.vue` (parent) + `my-projects/index.vue` | `/my-projects` | `/it/my-projects` | Featured project, projects grid, studies/exercises list, `CustomClosingCta` (both tabs) |
| `my-projects/sb-templates.vue` | `/my-projects/sb-templates` | `/it/my-projects/sb-templates` | SB Templates showcase grid |
| `privacy-policy.vue` | `/privacy-policy` | `/it/privacy-policy` | Legal |
| `terms-and-conditions.vue` | `/terms-and-conditions` | `/it/terms-and-conditions` | Legal |

### Creating a new page

1. Create the `.vue` file in `app/pages/` (kebab-case filename).
2. Call `useSeoMeta()` with translated meta tags.
3. Add translation keys to both `i18n/locales/en.json` and `i18n/locales/it.json`.
4. Add `prerender: true` in `nuxt.config.ts` for **both** EN and IT routes.
5. Add `definePageMeta({ sitemap: { lastmod, changefreq, priority } })` — the page reaches the sitemap automatically (both locales, with hreflang); the meta only tunes its entry. `sitemap: false` keeps it out.
6. Add a `RouteItem` entry in `TheHeader` and `TheFooter` if the page should appear in navigation.

### Minimal page template

```vue
<script setup lang="ts">
// Dependencies
const { t } = useI18n()

// SEO
const route = useRoute()

useSeoMeta({
  title: () => t('pageName.meta.title'),
  description: () => t('pageName.meta.description'),
  ogTitle: () => t('pageName.meta.title'),
  ogDescription: () => t('pageName.meta.description'),
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})
</script>

<template>
  <!-- page content -->
</template>
```

### Layouts

`default.vue` also renders a "Skip to content" link (first focusable element, visible on focus) targeting `<main id="main">`; `app.vue` mounts `<NuxtRouteAnnouncer />` so client-side page changes are announced.

The only layout is `default.vue`. Structure: `TheHeader` → `<slot>` → `TheFooter` → `CustomContactForm` (one instance, opened through `useContact()`) → `TheNotificationBanner` + `TheNotificationBox`. A `useLocaleHead()` call injects the correct `hreflang` alternate links on every page automatically.

### i18n routing

Use `localePath()` for all navigation links — never hardcode locale prefixes:

```vue
<NuxtLink :to="localePath('/my-skills')">Skills</NuxtLink>
```

---

## 7. Composables & Utils

Composables live in `app/composables/`. All are auto-imported — no manual imports needed.

### UI composables

### `useNotification()`

Global notification system. State is shared across the app via `useState`.

```ts
const { notifications, success, warning, error, info, removeNotification, clearNotifications } = useNotification()

info({
  title: 'Heads up',
  message: 'Your session will expire soon.',
  icon: 'solar:bell-bold-duotone',
  dismissible: true,
  autoClose: true,
  duration: 5000,
})
```

All four methods accept `Omit<NotificationItem, 'type' | 'id'>`. Must be called **client-side only**.

### `useEmailJs()`

Sends emails via EmailJS. **Client-side only.**

```ts
const { sendContactEmailAdmin, sendReplyToUser } = useEmailJs()

const result = await sendContactEmailAdmin({
  from_name: 'Mario Rossi',
  from_email: 'mario@example.com',
  message: 'Hello!',
  agree_time: new Date().toISOString(),
  year: String(new Date().getFullYear()),
})
```

Both functions return `{ success: boolean, data: SendResponse | null, error: unknown | null }`.

### `useTypedText(input, options?)`

Typewriter animation via `typed.js`. **Client-side only.**

```ts
const { el, elStyle, isRunning } = useTypedText(['Frontend Dev', 'Vue Enthusiast', 'UI Craftsman'])
// or with reactive computed (auto-updates when locale changes)
const { el, elStyle } = useTypedText(computed(() => [t('key.0'), t('key.1')]))
```

```vue
<span ref="el" :style="elStyle"></span>
```

| Return | Type | Description |
|---|---|---|
| `el` | `Ref<HTMLElement \| null>` | Bind via `ref="el"` |
| `elStyle` | `CSSProperties` | Bind via `:style="elStyle"` |
| `isRunning` | `Ref<boolean>` | Whether animation is active |
| `start()` / `stop()` / `reset(hard?)` | — | Manual playback control |
| `recreate()` / `setOptions()` / `setStrings()` / `update()` | — | Dynamic reconfiguration |

Besides the `typed.js` options, `startDelayFrom: 'entrance'` counts `startDelay` from the parent's CSS entrance animation instead of from mount, so a slow hydration shortens the wait instead of adding to it (home hero).

- Single string → `LONG_TEXT_OPTIONS` (no loop, no backspace)
- Array of strings → `GROUP_STRING_OPTIONS` (loops with smart back-typing)
- Under `prefers-reduced-motion` typed.js is skipped and the first string is written as static text
- Home types its single role once (`contentType: 'null'` so `&` survives) and removes the cursor in `onComplete`, so nothing keeps moving next to the heading

### `useCloudinary()`

Builds a Cloudinary delivery URL from a path relative to `image/upload/` (version included), using `runtimeConfig.public.cloudinaryCloudName`. `resolveImageSrc()` is what the content composables use on locale values: `/…` stays a `public/` path, anything else goes through `cloudinaryUrl()`. Pass the result to `<NuxtImg>` with the default provider — never link it directly (see [Cloudinary images](#cloudinary-images)).

```ts
const { cloudinaryUrl, resolveImageSrc } = useCloudinary()
cloudinaryUrl('v1793011184/sbt-logo_wgjk4u.svg')
// → https://res.cloudinary.com/dsmtyu2iw/image/upload/v1793011184/sbt-logo_wgjk4u.svg
resolveImageSrc('/sb-logo.svg') // → unchanged (file in public/)
```

### `useContact()`

The single contact form lives in `default.vue`; page CTAs and the mobile menu open it through shared state. `cvItems` are the `BaseMenu` items of the CV download (EN and IT, active locale first, flag icon, `download` filename).

```ts
const { isFormOpen, cvItems } = useContact()
isFormOpen.value = true
```

### `useLockScroll()`

Prevents page scroll. Multi-caller safe — each instance holds its own owner ID.

```ts
const { lock, unlock, isLocked } = useLockScroll()
lock()    // adds scroll-locked class to <html>
unlock()  // removes it only when no other caller holds a lock
```

### `useFocusTrap(container)`

Keeps Tab / Shift+Tab inside `container` while active and restores focus to the previously focused element on deactivate. `deactivate(false)` skips the restore (used when a navigation moves focus elsewhere). Used by `BaseDialog` and the mobile drawer in `TheHeader`. Client-side only.

```ts
const panel = ref<HTMLElement | null>(null)
const { activate, deactivate } = useFocusTrap(panel)
```

### `usePageTransition(isSubPage?)`

Shared skip-transition state, driven by `plugins/pageTransition.client.ts` on every navigation.

```ts
const { pageTransition } = usePageTransition() // app.vue — outer NuxtPage
const { pageTransition } = usePageTransition(true) // my-projects.vue — inner NuxtPage (tabs)
```

Returns `undefined` (default `page` transition applies) unless the relevant skip flag is set — `pageSkipTransition` when the top-level route is unchanged (locale-only change or a tab switch), `subPageSkipTransition` when the leaf route is unchanged (locale-only change). A third flag, `menuSkipTransition`, skips the transition for any navigation started from the full-screen mobile menu: `TheHeader` sets `navigatingFromMenu` on the link click and the plugin turns it into `menuSkipTransition` for that navigation only; `router.options.ts` then scrolls to the top immediately instead of waiting for the transition end. Bind the returned `pageTransition` to `<NuxtPage :transition="pageTransition">`.

### `useSanitize()`

XSS-safe HTML rendering via `isomorphic-dompurify`.

```ts
const { sanitizeHtml } = useSanitize()
const clean = sanitizeHtml(dirtyHtml)
```

Server-side: skips DOMPurify. Client-side: full sanitisation. Use only via `BaseRichText` — never write `v-html` directly.

---

### Content-source composables (`app/composables/data/`)

No backend/CMS — these read from i18n translation files or a local hardcoded list instead of a server. See [Server API](#8-server-api).

### `useMilestones()`

```ts
const { milestones } = useMilestones()
```

Reads `pages.about.milestones` from the active i18n locale via `tm()`/`rt()` — content authored as Markdown, converted with `markdownToRichBlocks`. Purely reactive: no fetch, no loading/error state, updates automatically on language change. Besides `date` (start, `MM/DD/YYYY`), each entry may carry `endDate` (same format; omitted = still ongoing), `role`, `organization`, `type` (`MilestoneType`), `stack` (free keywords) and `clients` (string lists), and `skills` (skill ids, resolved to `Skill` objects). The composable maps each `stack` name to a `MilestoneStackItem` (logo and `--sb-tech-*` brand colour from its `STACK_BRANDS` table, none for unknown names) and adds `typeLabel` and `period` (`MilestonePeriod`: month labels, ISO values, LinkedIn-style duration; "Present" refreshed on mount), used by `CustomMilestone`. A planned `endDate` in the future is shown as is, but the duration only counts up to today; an `upcoming` entry (future `date`, no duration) is the About Me "coming soon" step. The home page shows no milestone list: its Experience strip is one sentence (`pages.home.experience.lead`) linking to About Me.

### `useSelectedWork()`

```ts
const { selectedWork } = useSelectedWork()
```

The three proof pieces (Romano, SB Templates, sb-floating-panel-vue) with title, cover, meta line, an `outcome` line (what it is, from `pages.about.alongside.outcomes`), an `angle` line (what it means to me, first person, from `pages.about.alongside.angles`) and a link to their Projects anchor. The home "Selected work" grid and the Projects SB Templates teaser show the outcome, the About Me "Alongside the day job" list shows the angle.

### `useProjects()`

```ts
const { projects } = useProjects()
```

Same pattern as `useMilestones` — reads `pages.projects.personalProjects.list`. An entry with `status: "ongoing"` gets `isOngoing: true`. `skills` (skill ids) resolve to `Skill` objects, used only to link skills to projects on the Skills page ("Seen in"); `meta` stays the authored line. `coverImageSrc`/`coverImageAlt` are optional — the archived thesis and course exercises have none, and `CustomProjectsCard` drops the image panel when it is missing. `coverImageFit` is `'cover'` unless the entry sets `"contain"` (logos on a transparent background).

### `useTemplates()`

```ts
const { templates } = useTemplates()
```

Same pattern as `useMilestones` — reads `pages.projects.sbTemplatesProject.list`. `skills` (skill ids) resolve to `Skill` objects; `langIcons` stay as platform icons.

### `useLegalDocument(key)`

```ts
const { legalDocument } = useLegalDocument('privacy') // or 'terms'
```

Reads `pages.<key>` from the active locale: `title`, `lead`, `summary` (Markdown list) and `sections` (`{ id, title, content }`, content in Markdown, links allowed — write `@` as `{'@'}`). Section ids are the same in every locale so anchors survive a language switch. Shared labels live in `pages.legal`. Exports `LegalDocument`, `LegalSection`, `LegalDocumentKey`.

### `useSkillReferences()`

```ts
const { references, referencesByArea, referenceBySkill } = useSkillReferences()
```

Where each skill is used, built from the `skills` ids of the other content sources: work and study milestones (every type but `upcoming`, one entry per organization, newest role, linking to its About Me milestone — SI2001 for the work tools, University of Salerno for HTML, CSS, JavaScript, MySQL), projects (linking to their Projects anchor) and SB Templates (one entry). No reference points to this site's repo. Each `SkillReference` is `{ key, title, skills, to }`. `referencesByArea` groups them by skill area for the Skills page "Seen in" line (plain text, names only). `referenceBySkill` picks the chip link (`CustomSkillsChip` `to`, the only proof link on the page): the first reference, unless `PREFERRED_REFERENCE` names another (Vue, Vite and npm → sb-floating-panel-vue).

### `useSkills()`

```ts
const { areas, featuredStack } = useSkills()
```

Skills are a hardcoded local list (`SKILLS_DATA`, in the composable file, not i18n) — no backend. Each skill has a readable slug `id` (`vue`, `spring`, `tailwind-css`), referenced by the `skills` arrays of projects, templates and milestones in the locale files, an `area` (`frontend`, `backend`, `tools`) and a `tier` (`core`: used every day, gold; `solid`: used across many projects; `familiar`: studied or used rarely). `areas` is the Skills page data: one `SkillAreaGroup` per area with its non-empty tiers in order, skills alphabetical. `resolveSkills(ids)` (named export) maps ids to skills and drops unknown ones. `featuredStack` is the home page "Core stack": `FEATURED_STACK` ids grouped by area (`frontend`, `backend`, `database`), in authored order, core-tier ids only (so "Core stack" never contradicts the gold tier).

### `useGithubStats()`

```ts
const { stats } = await useGithubStats()
```

The one async content source: `useFetch('/api/github-stats.json')`, which is prerendered at build time, so visitors never call GitHub and client-side navigation reads the same static file. `stats` is `GithubStats | null` — `null` when GitHub was unreachable during the build.

---

### Utils

| Function | Signature | Description |
|---|---|---|
| `generateUuid` | `(): string` | Returns a random UUID v4 string |
| `blocksToHtml` | `(blocks: RichBlock[], newTabLabel?: string): string` | Converts `RichBlock[]` to HTML. `newTabLabel` adds an `sr-only` note to `http(s)` links, which open in a new tab (`BaseRichText` passes `a11y.newTab`). Always pair with `useSanitize()` or use `BaseRichText` |
| `markdownToRichBlocks` | `(markdown: string): RichBlock[]` | Converts Markdown text (`##`/`###`, `- ` lists, `**bold**`, `*italic*`, `[label](url)`) to `RichBlock[]`. `blocksToHtml` opens only `http(s)` links in a new tab; `mailto:` and site paths stay in the tab |

---

### TypeScript types

Types a composable exposes are exported from that composable and imported with `import type`:

| From | Types |
|---|---|
| `composables/data/useSkills` | `Skill` (`{ id, name, icon, area, tier, onLight? }`), `SkillArea`, `SkillTier`, `SkillTierGroup`, `SkillAreaGroup`, `StackArea`, `StackGroup` |
| `composables/data/useSkillReferences` | `SkillReference` (`{ key, title, skills, to }`) |
| `composables/data/useMilestones` | `Milestone`, `MilestoneType`, `MilestonePeriod` (`{ startIso?, startLabel?, endIso?, endLabel, duration? }`), `MilestoneStackItem` (`{ name, icon?, color? }`) |
| `composables/data/useProjects` | `Project` |
| `composables/data/useTemplates` | `SbTemplate` |
| `composables/useNotification` | `NotificationItem` (`{ id, type, icon?, title?, message, dismissible?, autoClose?, duration? }`) |

`app/types/global.d.ts` declares the remaining types globally (no import needed): cross-cutting ones and those shared with `server/`.

| Type | Description |
|---|---|
| `MenuItem` | `{ code, label, iconType, icon, description, download }` — language switcher and `BaseMenu` items (`code` = href with `kind="links"`, value with `kind="select"`) |
| `RouteItem` | `{ name, path, disabled? }` — navigation links |
| `GithubRepo` | `{ name, url, description, language, stars }` |
| `GithubStats` | `{ login, profileUrl, publicRepos, totalStars, yearsOnGithub, contributionsLastYear, topRepos }` — `contributionsLastYear` is `null` without a token |
| `RichBlock` | Union of `RichBlockParagraph \| RichBlockHeading \| RichBlockList \| RichBlockQuote \| RichBlockCode` |

---

## 8. Server API

No backend/CMS — `useMilestones`/`useProjects`/`useTemplates`/`useSkills` read from i18n translation files or local data, not from a server. The only `server/` code is small Nitro routes for things that must vary per Netlify deploy context or can't be a static file.

### `server/api/github-stats.json.ts`

Serves `/api/github-stats.json`, prerendered (`routeRules['/api/github-stats.json'] = { prerender: true }`), so GitHub is queried once per deploy and the result ships as a static file. Reads the public profile and owned repositories of `stefanBid` over REST; with `NUXT_GITHUB_TOKEN` set it also reads contributions in the last year over GraphQL (anonymous GraphQL is refused). Any GitHub failure returns `{ stats: null }` instead of failing the build. Totals and top repositories exclude forks.

In dev only, the GitHub fetch is wrapped in `defineCachedFunction` (10 min, keyed by token presence): dev renders the home and its `_payload.json` on every visit, and without the cache each navigation to `/` waited ~0.5s on GitHub (and spent rate limit). Builds bypass the cache and always fetch fresh; errors are never cached.

The token lives in `runtimeConfig.githubToken` (server-only, default `''`) and is filled at runtime from `NUXT_GITHUB_TOKEN`. Never assign `process.env.…` to it in `nuxt.config.ts`: that value gets inlined into the Netlify Function bundle.

### `server/routes/robots.txt.ts`

Serves `/robots.txt`. `Disallow: /` on `deploy-preview`/`branch-deploy` Netlify contexts, `Allow: /` + `Sitemap: …/sitemap_index.xml` on `production`. Netlify's `CONTEXT` is only set at build time, not in the Function runtime, so `nuxt.config.ts` resolves it into `runtimeConfig.public.isProduction` and the route reads that via `useRuntimeConfig(event)`. Never prerendered — `routeRules['/robots.txt'] = { prerender: false }` in `nuxt.config.ts`, so each deploy serves its own rules.

### Sitemap (`@nuxtjs/sitemap`)

No hand-written `sitemap.xml`. The module builds it from the app pages; `@nuxtjs/i18n` (`prefix_except_default`) makes it a multi-sitemap: `/sitemap_index.xml` → `/__sitemap__/en.xml` + `/__sitemap__/it-IT.xml`, each URL with `hreflang` alternates (`en`, `it-IT`, `x-default`). `/sitemap.xml` redirects (302) to the index. Every `<loc>` resolves against `site.url` in `nuxt.config.ts`. Prerendered pages also contribute their `<img>` inside `<main>` as image entries.

- `sitemap.zeroRuntime: true` — all sitemap files are prerendered at build, no sitemap code at runtime. Content is static, so nothing changes between deploys.
- Per-page `lastmod` / `changefreq` / `priority` live in each page's `definePageMeta({ sitemap })` and apply to both locales. `lastmod` is set by hand: bump it when the page content really changes (file mtime would be the checkout time on Netlify).
- Future dynamic content: add a `sources: ['/api/__sitemap__/urls']` endpoint (`defineSitemapEventHandler`) instead of listing URLs by hand, and drop `zeroRuntime` if it must change without a rebuild.

### Adding new server code

- `server/routes/<name>.ts` → served at `/<name>`
- `server/api/<name>.ts` → served at `/api/<name>`

---

## 9. i18n

The app uses `@nuxtjs/i18n` with the `prefix_except_default` strategy. English (`en`) is the default locale — no URL prefix. Italian (`it`) uses the `/it/` prefix.

Translation files live in `i18n/locales/`. English is the source of truth.

### Adding a new translation key

1. Add the key to `i18n/locales/en.json` (English value).
2. Add the same key to `i18n/locales/it.json` (Italian value).
3. Use `$t('key')` in templates or `const { t } = useI18n()` in `<script setup>`.

**Never hardcode user-facing strings.** Every visible string — labels, placeholders, `aria-label`, error messages, button text — must go through `$t()`.

```vue
<!-- Template -->
<p>{{ $t('pages.home.hero') }}</p>

<!-- Script -->
<script setup lang="ts">
const { t } = useI18n()
const label = t('nav.home')
</script>
```

### Adding a new language

1. Add a locale file `i18n/locales/<code>.json` with all keys translated.
2. Register it in `nuxt.config.ts → i18n.locales`:
   ```ts
   { code: 'fr', iso: 'fr-FR', language: 'fr-FR', name: 'Français', file: 'fr.json' }
   ```
3. Add `routeRules` entries for the new locale prefix in `nuxt.config.ts`.
4. Add the flag to the language switcher in `TheHeader`.

---

## 10. AI Tooling — Claude Code Context

The project ships with a single root [`CLAUDE.md`](./CLAUDE.md), versioned alongside the code. It's the project's context file for [Claude Code](https://claude.com/claude-code) — loaded automatically into every session opened in this repo, no manual setup or per-file-type config needed.

### What `CLAUDE.md` covers

One file, all context: stack, npm install policy, project structure, naming rules, code conventions (Vue/Nuxt patterns, TypeScript, styling, i18n, ESLint), the full design system (colours, typography, utilities, animations, icons), the component API catalogue, pages, composables, utils, global types, server API conventions, and `nuxt.config.ts` reference.

### Maintenance workflows

Run through the sb-context-fe Claude Code plugins (project profile and settings in `.sb-context/`), listed in `CLAUDE.md`'s "Maintenance workflows" section:

| Command | What it does |
|---|---|
| `/sb-health:deps` | Outdated/vulnerable dependencies, safe updates, major-version migrations |
| `/sb-health:lint` | Runs `eslint --fix`, reports remaining warnings/errors |
| `/sb-health:build` | Type check + production build, categorises errors |
| `/sb-health:seo` | Validates `robots.txt`, sitemap and per-page SEO meta |
| `/sb-health:checkup` | Full maintenance pass |
| `/sb-health:docs` | Syncs `README.md` with the codebase, editing only affected sections |
| `/sb-design:check` | Read-only check that the global style is still aligned |
| `/sb-design:migrate` | Finds template classes the theme no longer generates and proposes replacements |

### Documentation sync rule

`CLAUDE.md` enforces that any change creating a discrepancy with `README.md` (new/removed/renamed components, pages, composables, utils, dependencies, `nuxt.config.ts` changes) must be followed by a targeted doc update in the same session.

---

## 11. Deployment

The project is pre-configured for **Netlify** (Nitro preset `netlify`).

```bash
npm run build
```

Connect the GitHub repository to Netlify with:

- **Build command:** `npm run build`
- **Publish directory:** `.output/public`
- **Node version:** `24.19.0`

### Changing the deployment target

Edit `nuxt.config.ts → nitro.preset`. See [Nitro deploy presets](https://nitro.unjs.io/deploy) for all options (Vercel, Cloudflare, AWS Lambda, etc.).

### Image optimisation — `netlify` provider in production

`nuxt.config.ts → $production.image.provider` is set to `'netlify'` (dev keeps `'ipx'`). The `ipx` provider gets bundled into the Netlify serverless function via node-file-trace, which unreliably traces sharp's native `.node` binary and the `public/` source images — either miss crashes the function (`500` on every `/_ipx/*` request). The `netlify` provider offloads transforms to Netlify's built-in Image CDN instead — no bundling, no native binary. `netlify.toml` also sets a long-lived `Cache-Control` header on `/.netlify/images/*` (URL + params are immutable per image, safe to cache aggressively). See [Developer Notes](#developer-notes) for the full root cause.

### Environment variables

Add all variables under **Site settings → Environment variables** on Netlify. All are accessed via `useRuntimeConfig().public` — never read `process.env` directly in Vue components.

| Variable | Required | Description |
|---|---|---|
| `NUXT_EMAILJS_PUBLIC_KEY` | Yes | EmailJS public key |
| `NUXT_EMAILJS_SERVICE_ID` | Yes | EmailJS service ID |
| `NUXT_EMAILJS_TEMPLATE_ADMIN_ID` | Yes | EmailJS template ID — admin notification email |
| `NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID` | Yes | EmailJS template ID — reply-to-user email |
| `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Optional | Overrides `runtimeConfig.public.cloudinaryCloudName` (default `dsmtyu2iw`), the Cloudinary account `useCloudinary()` builds URLs for |
| `NUXT_GITHUB_TOKEN` | Optional | GitHub fine-grained token, *Public repositories* access, no permissions. Mark it secret, Builds scope only. Without it the home page drops the contributions counter, and REST calls are anonymous (60 requests/h per IP) |

### Versioning

Versioning is handled automatically by the [Release Please](https://github.com/googleapis/release-please) GitHub Action on every push to `main`. It bumps `package.json`, creates a GitHub Release and updates `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com) conventions.

---

## 12. Dependencies

### Runtime dependencies

| Package | Version | Purpose |
|---|---|---|
| `nuxt` | `4.6.3` | Core framework (exact pin, see [Developer Notes](#developer-notes)) |
| `vue` | `^3.5.44` | UI framework |
| `vue-router` | `^5.4.0` | Routing |
| `tailwindcss` | `^4.3.3` | Utility-first CSS |
| `@tailwindcss/vite` | `^4.3.3` | Tailwind v4 Vite plugin |
| `@nuxt/eslint` | `^1.17.0` | ESLint + stylistic rules |
| `@nuxt/fonts` | `^1.2.0` | Self-hosted Google Fonts (Bebas Neue, Space Mono) — served from `/_nuxt/fonts/` in production; a provider/download failure fails the build (`throwOnError` default) |
| `@nuxt/icon` | `^2.6.1` | SVG icon system |
| `@nuxt/image` | `^2.2.0` | Image optimisation |
| `@nuxtjs/color-mode` | `^4.0.1` | Centralised colour-mode config, fixed to dark |
| `@nuxtjs/i18n` | `^10.6.0` | Multi-language support (EN + IT) |
| `@nuxtjs/sitemap` | `^9.1.0` | Sitemap generated from pages + i18n hreflang, prerendered (`zeroRuntime`) |
| `@vueuse/core` | `^15.0.0` | Vue composition utilities |
| `@vueuse/nuxt` | `^15.0.0` | Nuxt integration for VueUse |
| `sb-floating-panel-vue` | `^5.3.1` | Headless floating panels (`SbContainer`, `SbReference`, `SbFloating`) for `BaseMenu` — placement, keyboard, ARIA, dismissal. Brings `@floating-ui/vue` as an auto-installed peer (not in `package.json`) |
| `isomorphic-dompurify` | `^4.6.0` | XSS-safe HTML sanitisation |
| `@emailjs/browser` | `^5.0.3` | Contact form email sending |
| `typed.js` | `^3.0.0` | Typewriter text animation |
| `zod` | `^4.6.7` | Runtime form validation |
| `eslint` | `^10.13.0` | Linter |

`esbuild` is pinned via `overrides` (`^0.28.0`) for dedup only — the dev-server CORS advisory (GHSA-67mh) is now fixed upstream by every consumer; only `@intlify/bundle-utils@11.2.7` (under `@nuxtjs/i18n`) still asks `^0.25.4`, so without the override npm would install two esbuild copies. Drop it once bundle-utils moves to `^0.28`, see `package.json` and `.sb-context/dependency-notes.json`.

`npm audit` is clean: the former `node-forge` ≤ 1.4.0 advisory (GHSA-86w9-cpqp-85rv, via `nuxt` → `nitropack` → `listhen`) is fixed by `node-forge@1.4.1`, picked up in range. The install still warns that a transitive `vue-i18n@10` is deprecated — build-time only (`@nuxtjs/i18n` → `@intlify/unplugin-vue-i18n` → `@intlify/vue-i18n-extensions@8`), the runtime uses `vue-i18n@11`; waits on upstream, tracked in `.sb-context/dependency-notes.json`.

### Dev dependencies

| Package | Version | Purpose |
|---|---|---|
| `@iconify-json/solar` | `^1.2.13` | Solar icon set |
| `@iconify-json/mdi` | `^1.2.3` | MDI icon set |
| `@iconify-json/logos` | `^1.2.18` | Brand/tech logo icons |
| `@iconify-json/flagpack` | `^1.2.8` | Flag icons |
| `@types/node` | `^26.6.5` | Node.js type definitions |
| `typescript` | `^6.0.3` | TypeScript compiler — held on 6.x, see below |
| `vue-tsc` | `^3.3.13` | Vue TypeScript type checking |

`typescript` is intentionally held on `^6` (`_comment_typescript` in `package.json`): TS 7 is the native Go compiler and ships no classic JS compiler API, which `vue-tsc`/`@volar` (`nuxt typecheck`) relies on — Vue support is planned with TS 7.1 — and `@typescript-eslint` peers `typescript <6.1.0`. Tracked in `.sb-context/dependency-notes.json`.

---

<div align="center">

Copyright © 2026 Stefano Biddau — All Rights Reserved

This project is proprietary and confidential. See the [LICENSE](./LICENSE) file for details.

[stefanobiddau.com](https://stefanobiddau.com) · [@stefanoBid](https://github.com/stefanoBid)

</div>
