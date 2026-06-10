<div align="center">

  # Stefano Biddau — Portfolio

  [![Netlify Status](https://api.netlify.com/api/v1/badges/55a2b1a4-7d4b-4a3e-8edd-444dbf85092a/deploy-status)](https://app.netlify.com/projects/stefanobiddau/deploys)
  ![Version](https://img.shields.io/badge/version-1.5.1-blue)
  [![Node.js](https://img.shields.io/badge/node-%3E%3D24.11.0-brightgreen)](https://nodejs.org)
  [![Nuxt](https://img.shields.io/badge/nuxt-4.4.8-00DC82?logo=nuxt.js)](https://nuxt.com)
  [![Vue](https://img.shields.io/badge/vue-3.5.35-4FC08D?logo=vue.js)](https://vuejs.org)
  [![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6?logo=typescript)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
  ![License](https://img.shields.io/badge/license-Proprietary-red)

  **Stefano Biddau's personal portfolio — Front-End Developer & Web Designer**

  [stefanobiddau.com](https://stefanobiddau.com)

</div>

---

## Table of Contents

1. [Overview](#1-overview)
2. [Getting Started](#2-getting-started)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Components](#5-components)
6. [Pages & Routing](#6-pages--routing)
7. [Composables & Utils](#7-composables--utils)
8. [i18n](#8-i18n)
9. [AI Tooling — Prompts & Instructions](#9-ai-tooling--prompts--instructions)
10. [Deployment](#10-deployment)
11. [Dependencies](#11-dependencies)

---

## 1. Overview

Stefano Biddau's personal portfolio — a production Nuxt 4 SSG/SSR application deployed on Netlify. It showcases professional experience, projects, skills and a contact form. The app is always dark-themed (no light/dark toggle).

**Stack highlights:** Nuxt 4 · Vue 3 · Tailwind CSS v4 · TypeScript (strict) · EmailJS · Zod · i18n (EN + IT) · Netlify

Key design principles:

- **Always dark** — a single dark colour palette; no `dark:` Tailwind variants, no theme switching overhead.
- **Fully static** — all content is embedded at build time, pre-rendered via `routeRules` for maximum performance.
- **i18n-first** — every user-facing string goes through `useI18n()`, supporting English (default) and Italian.
- **Type-safe throughout** — strict TypeScript, global interfaces in `global.d.ts`, Zod for contact form validation.

---

## 2. Getting Started

### Prerequisites

- **Node.js** ≥ 24.11.0 (see `.nvmrc`)
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
NUXT_PUBLIC_CLOUDINARY_BASE=https://res.cloudinary.com/your-cloud/image/upload/
```

### Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server at `http://localhost:3000` |
| `npm run build` | Build for production (outputs to `.output/`) |
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
── .nvmrc                   ← pinned Node.js version (24.11.0)
── i18n/
     locales/
       en.json              ← English translations (source of truth)
       it.json              ← Italian translations
── app/
     app.vue               ← root entry point (NuxtLayout + NuxtPage)
     error.vue             ← global error page
     assets/
       css/
         main.css          ← entry point: imports all CSS layers in order
         theme.css         ← @theme block: CSS custom properties (always dark)
         typography.css    ← @utility ty-sb-* classes
         utilities.css     ← @utility u-sb-* classes
         animations.css    ← Vue transition classes (fade, slide-down, scale-fade)
     components/
       base/               ← reusable design-system components (zero business logic)
       custom/             ← portfolio-specific components (data fetching + business logic)
       the-footer/         TheFooter.vue
       the-header/         TheHeader.vue, TheHeaderMenuToggle.vue
       the-notification/   TheNotificationBanner.vue, TheNotificationBox.vue
       the-page-hero/      ThePageHero.vue
     composables/
       useEmailJs.ts        ← EmailJS dual-send (admin + reply-to-user)
       useFloatingUi.ts     ← @floating-ui/vue wrapper
       useLockScroll.ts     ← scroll lock with multi-caller safety
       useNotification.ts   ← global notification system
       useSanitize.ts       ← XSS-safe HTML sanitisation
       useTypedText.ts      ← typed.js wrapper for typewriter animations
     layouts/
       default.vue         ← TheHeader + <slot> + TheFooter + notifications
     pages/
       index.vue            ← / — Homepage
       about-me.vue         ← /about-me — Career milestones
       my-skills.vue        ← /my-skills — Filterable skills grid
       my-projects.vue      ← /my-projects — Projects showcase
       privacy-policy.vue   ← /privacy-policy
       terms-and-conditions.vue ← /terms-and-conditions
     plugins/
       scrollToTop.client.ts
     types/
       global.d.ts         ← global TS interfaces
     utils/
       blocksToHtml.ts     ← Rich text blocks → HTML
       downloadFile.ts     ← browser file download trigger (client-side only)
       generateUuid.ts     ← UUID v4 generator
       markdownToBlocks.ts ← Markdown → RichBlock[] converter
```

---

## 4. Design System

The design system lives entirely in `app/assets/css/`. It provides a single source of truth for colours, typography, spacing and transitions. The app is **always dark** — no `dark:` Tailwind variants are ever needed.

### Colours — `--color-sb-*`

All colours are CSS custom properties defined inside an `@theme` block in `theme.css`, auto-mapped to Tailwind utilities.

| Token | Tailwind utility | Value | Usage |
|---|---|---|---|
| `--color-sb-main` | `bg-sb-main` | `#0f0f20` | Page background |
| `--color-sb-surface` | `bg-sb-surface` | `#1a1a2e` | Card / elevated surface |
| `--color-sb-surface-2` | `bg-sb-surface-2` | `#232342` | Nested surfaces, inputs |
| `--color-sb-border` | `border-sb-border` | `#2a2a44` | Default borders |
| `--color-sb-shadow` | `shadow-[0_4px_20px_var(--color-sb-shadow)]` | `rgba(0,0,0,0.45)` | Shadows (always via `var()`) |
| `--color-sb-accent` | `bg-sb-accent / text-sb-accent` | `#e95905` | Primary CTA, highlights |
| `--color-sb-accent-hover` | `hover:bg-sb-accent-hover` | `#d24f05` | Hover state of accent |
| `--color-sb-accent-border` | `border-sb-accent-border` | `#b34704` | Border on accent elements |
| `--color-sb-contrast` | `text-sb-contrast` | `#f1f1f1` | Primary text |
| `--color-sb-muted` | `text-sb-muted` | `#9ca3af` | Secondary / placeholder text |
| `--color-sb-success/warning/error/info` | `text-sb-success` etc. | — | Status colours |
| `--color-sb-*-bg` | `bg-sb-success-bg` etc. | — | Status background tints |

Tailwind opacity modifiers are allowed: `bg-sb-main/80`, `text-sb-muted/70`.

### Typography — `ty-sb-*`

Custom `@utility` classes defined in `typography.css`. Apply them as regular Tailwind classes.

| Class | Font | Usage |
|---|---|---|
| `ty-sb-hero` | Bebas Neue, uppercase | Full-bleed hero text |
| `ty-sb-impact` | Bebas Neue, uppercase | Large display headings |
| `ty-sb-title-xl` | Bebas Neue | Extra large titles (`text-4xl` → `text-7xl`) |
| `ty-sb-title-lg` | Bebas Neue | Large section titles (`text-3xl` → `text-6xl`) |
| `ty-sb-title` | Bebas Neue | Section titles (`text-2xl` → `text-4xl`) |
| `ty-sb-subtitle-xl` | Space Mono semibold | Extra large sub-headings |
| `ty-sb-subtitle-lg` | Space Mono semibold | Large sub-headings |
| `ty-sb-subtitle` | Space Mono semibold | Sub-headings |
| `ty-sb-paragraph` | Space Mono | Body text |
| `ty-sb-label` | Space Mono, uppercase, tracked | Form labels, tags |
| `ty-sb-btn-label` | Space Mono bold, uppercase | Button text |
| `ty-sb-caption` | Space Mono italic | Captions, secondary notes |

```vue
<h1 class="ty-sb-title text-sb-contrast">My Skills</h1>
<p class="ty-sb-paragraph text-sb-muted">Some description.</p>
```

**Font families:**
- `font-bebas-neue` — Bebas Neue: all titles and display text
- `font-space-mono` — Space Mono: body, UI text, buttons

### Utility classes — `u-sb-*`

| Class | Effect |
|---|---|
| `u-sb-soft-transition` | `transition-all duration-200 ease-in-out` |
| `u-sb-hard-transition` | `transition-all duration-500 ease-in-out` |
| `u-sb-focus` | `outline-none ring-sb-contrast focus-visible:ring-2` |
| `u-sb-focus-within` | `outline-none ring-sb-contrast focus-within:ring-2` |
| `u-sb-no-focus` | Removes all focus outlines (use only on elements with custom focus handling) |

Always add `u-sb-soft-transition` to interactive elements.

### Animations — Vue `<Transition>`

| Name | Effect | Duration |
|---|---|---|
| `fade` | Opacity + slight Y offset | 800ms |
| `slide-down` | Opacity + slides from top | 200ms |
| `scale-fade` | Opacity + scale from 0.95 | 200ms |

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
<Icon name="solar:box-minimalistic-bold-duotone" class="size-5 text-sb-accent" />
<Icon name="logos:vue" class="size-5" />
<Icon name="flagpack:it" class="size-5" />
```

---

## 5. Components

All reusable components live in `app/components/`. Three component tiers:

| Prefix | Rule | Examples |
|---|---|---|
| `Base` | Fully reusable, zero business logic, no external data calls | `BaseButton`, `BaseInput`, `BaseTabs` |
| `Custom` | Portfolio-specific, may contain business logic | `CustomSkillsCard`, `CustomContactForm` |
| `The` | Singleton — used once per layout | `TheHeader`, `TheFooter`, `ThePageHero` |

### Base components

### `BaseButton`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Visual style |
| `type` | `'button' \| 'submit' \| 'reset' \| 'link'` | `'button'` | `'link'` renders `<a target="_blank">` |
| `to` | `string` | `undefined` | Required when `type='link'` |
| `ariaLabel` | `string` | `undefined` | For icon-only usage |
| `isDisabled` | `boolean` | `false` | |
| `isLoading` | `boolean` | `false` | Shows spinner |

Slot: `default` (button label / content)

```vue
<BaseButton variant="primary" :is-loading="isSaving" type="submit">
  Save
</BaseButton>
<BaseButton type="link" to="https://github.com/stefanoBid" variant="outline">
  <Icon name="mdi:github" class="size-4" /> GitHub
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

Model: `defineModel<string>('input')`

### `BaseCheckbox`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `name` | `string` | `undefined` | |
| `label` | `string` | `undefined` | Shown if no `default` slot |
| `error` | `string \| null` | `null` | |

Model: `defineModel<boolean>('input')`
Slot: `default` (custom label content)

### `BaseCombobox`

Generic component (`generic="T"`).

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `type` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `items` | `{ label: string, value: T }[]` | — | Required |
| `name` | `string` | `undefined` | |
| `label` | `string` | `undefined` | |
| `placeholder` | `string` | `'Insert a value...'` | |
| `hint` | `string` | `undefined` | |
| `error` | `string \| null` | `null` | |
| `prefixIcon` | `string` | `undefined` | |

Model: `defineModel<T[]>('input', { default: () => [] })`

### `BaseChip`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `text` | `string` | — | Required |
| `icon` | `string` | `undefined` | Iconify name |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | |
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
Behaviour: closes on `Escape`, locks scroll, traps focus, uses `<Teleport to="body">`.

### `BaseAccordion`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `title` | `string` | — | Required |
| `icon` | `string` | `undefined` | Iconify name |
| `isOpen` | `boolean` | `undefined` | If omitted, accordion manages state internally |

Emits: `toggle` (only when `isOpen` is controlled externally)
Slot: `default`

### `BaseIconButton`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `icon` | `string` | — | Required. Iconify name |
| `ariaLabel` | `string` | `undefined` | Always set it |
| `isActive` | `boolean` | `false` | Active/pressed state styling |

Emits: `(e: 'click'): void`

### `BaseIconMenu`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `icon` | `string` | — | Required. Trigger icon |
| `items` | `MenuItem[]` | — | Required |
| `selectedItemId` | `string \| null` | `null` | Highlighted item |

Emits: `(e: 'select', itemId: string): void`

### `BaseCloseButton`

No props. Emits: `(e: 'close', value: false): void`. Renders a `mdi:close` icon button.

### `BaseTabs`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `tabs` | `{ label: string, icon?: string, id: string \| number }[]` | — | Required |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | `primary` = accent fill; `secondary` = surface fill |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | |

Model: `defineModel<string | number>('selectedTabId')`

### `BaseEmptyBox`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | — | Required |
| `message` | `string` | — | Required |
| `icon` | `string` | `'solar:box-minimalistic-bold-duotone'` | |
| `dimension` | `'normal' \| 'small'` | `'normal'` | |

### `BaseRichText`

| Prop | Type | Notes |
|---|---|---|
| `blocks` | `RichBlock[]` | Required |

Converts `RichBlock[]` to sanitised HTML via `blocksToHtml` + `useSanitize`. Never write `v-html` directly — always use this component.

---

### Custom components

### `CustomContactForm`

| Prop | Type | Notes |
|---|---|---|
| `openForm` | `boolean` | Controls visibility |

Emits: `(e: 'closeForm', value: boolean): void`
Uses `useEmailJs` for dual send (admin + reply-to-user), `zod` for validation, `useNotification` for feedback.

### `CustomSkillsCard`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | `string` | — | Required |
| `level` | `number` | — | Required. 0–5 scale shown as filled squares |
| `icon` | `string` | — | Required. Iconify name |
| `gold` | `boolean` | `false` | Gold ring highlight (top skill) |

### `CustomSkillsDialog`

Opens a `BaseDialog` with extended skill details. Pairs with `CustomSkillsCard`.

### `CustomProjectsCard`

| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | Required |
| `content` | `RichBlock[]` | Rich text rendered via `BaseRichText` |
| `coverImageSrc` | `string` | Optional project cover |
| `coverImageAlt` | `string` | Optional alt text |
| `codebaseUrl` | `string` | Optional GitHub link |
| `deployUrl` | `string` | Optional live demo link |

### `CustomSbTemplatesCard`

| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | Required |
| `description` | `string` | Required |
| `codebaseUrl` | `string` | Required |
| `logoSrc` | `string` | Optional |
| `langIcons` | `string[]` | Optional Iconify names for tech stack |

### `CustomMilestone`

| Prop | Type | Notes |
|---|---|---|
| `id` | `string` | Required |
| `title` | `string` | Required |
| `content` | `RichBlock[]` | Required |
| `subtitle` | `string` | Optional |
| `imageSrc` | `string` | Optional |
| `imageCaption` | `string` | Optional |
| `date` | `string` | Optional |

### `CustomSolarSystem`

Decorative animated orbit component used in `index.vue`, visualising tech categories as orbiting planets.

| Prop | Type | Notes |
|---|---|---|
| `planetsIcon` | `string[]` | Required. Iconify names to display as orbiting planets (max 8) |

Each `Custom*` component ships with a matching `*Skeleton.vue` for loading states.

---

### Singleton components (The*)

### `TheHeader` / `TheHeaderMenuToggle`

Top navigation bar. Renders `RouteItem[]` links and a language switcher (`BaseIconMenu`). `TheHeaderMenuToggle` is the hamburger button on mobile.

### `TheFooter`

Bottom bar with navigation links and social icons.

### `TheNotificationBanner` / `TheNotificationBox`

Notification display layer. `TheNotificationBanner` shows toast-style banners at screen top; `TheNotificationBox` shows a fixed overlay list. Both consume `useNotification()` state.

### `ThePageHero`

Full-screen entry animation. After the animation ends it emits `hero-animations-ended` — use this to reveal page content.

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
| `index.vue` | `/` | `/it` | Hero + `CustomSolarSystem` + skills preview + contact form |
| `about-me.vue` | `/about-me` | `/it/about-me` | Career milestones timeline |
| `my-skills.vue` | `/my-skills` | `/it/my-skills` | Filterable skills grid with `BaseTabs` |
| `my-projects.vue` | `/my-projects` | `/it/my-projects` | Projects showcase grid |
| `privacy-policy.vue` | `/privacy-policy` | `/it/privacy-policy` | Legal |
| `terms-and-conditions.vue` | `/terms-and-conditions` | `/it/terms-and-conditions` | Legal |

### Creating a new page

1. Create the `.vue` file in `app/pages/` (kebab-case filename).
2. Call `useSeoMeta()` with translated meta tags.
3. Add translation keys to both `i18n/locales/en.json` and `i18n/locales/it.json`.
4. Add `prerender: true` in `nuxt.config.ts` for **both** EN and IT routes.
5. Add a `RouteItem` entry in `TheHeader` and `TheFooter` if the page should appear in navigation.

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

The only layout is `default.vue`. Structure: `TheHeader` → `<slot>` → `TheFooter` → `TheNotificationBanner` + `TheNotificationBox`. A `useLocaleHead()` call injects the correct `hreflang` alternate links on every page automatically.

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

- Single string → `LONG_TEXT_OPTIONS` (no loop, no backspace)
- Array of strings → `GROUP_STRING_OPTIONS` (loops with smart back-typing)
- Respects `prefers-reduced-motion` automatically

### `useFloatingUi(config?)`

Wrapper around `@floating-ui/vue` for dropdown/tooltip positioning.

```ts
const { reference, floating, floatingStyles, open, toggleFloating } = useFloatingUi({
  placement: 'bottom-start',
  offset: 8,
  strategy: 'absolute',
})
```

### `useLockScroll()`

Prevents page scroll. Multi-caller safe — each instance holds its own owner ID.

```ts
const { lock, unlock, isLocked } = useLockScroll()
lock()    // adds scroll-locked class to <html>
unlock()  // removes it only when no other caller holds a lock
```

### `useSanitize()`

XSS-safe HTML rendering via `isomorphic-dompurify`.

```ts
const { sanitizeHtml } = useSanitize()
const clean = sanitizeHtml(dirtyHtml)
```

Server-side: skips DOMPurify. Client-side: full sanitisation. Use only via `BaseRichText` — never write `v-html` directly.

---

### Utils

| Function | Signature | Description |
|---|---|---|
| `generateUuid` | `(): string` | Returns a random UUID v4 string |
| `blocksToHtml` | `(blocks: RichBlock[]): string` | Converts `RichBlock[]` to HTML. Always pair with `useSanitize()` or use `BaseRichText` |
| `downloadFile` | `(publicUrl: string, filename: string): void` | Triggers a browser file download. **Client-side only** |
| `markdownToBlocks` | `(markdown: string): RichBlock[]` | Converts Markdown text to `RichBlock[]` structure |

---

### Global TypeScript types (`app/types/global.d.ts`)

All interfaces are declared globally — no import needed

| Type | Description |
|---|---|
| `SkillType` | `'beLang' \| 'feLang' \| 'beFramework' \| 'feFramework' \| 'database' \| 'tool' \| 'other'` |
| `MenuItem` | `{ code, label, iconType, icon }` — language switcher and icon-menu items |
| `RouteItem` | `{ name, path, disabled? }` — navigation links |
| `NotificationItem` | `{ id, type, icon?, title?, message, dismissible?, autoClose?, duration? }` |
| `SkillsFilterPreset` | `{ key, filters: SkillType[] }` — preset filter buttons in `my-skills.vue` |
| `RichBlock` | Union of `RichBlockParagraph \| RichBlockHeading \| RichBlockList \| RichBlockQuote \| RichBlockCode` |

---

## 8. i18n

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

## 9. AI Tooling — Prompts & Instructions

The project ships with pre-configured [GitHub Copilot](https://github.com/features/copilot) context under `.github/`. All configuration is versioned alongside the code.

### How GitHub Copilot is configured

| File / folder | Purpose |
|---|---|
| `.github/copilot-instructions.md` | Global rules: app context, response language, stack, naming conventions |
| `.github/instructions/*.instructions.md` | Scoped rules loaded automatically per file type (`applyTo` patterns) |
| `.github/prompts/*.prompt.md` | Reusable Agent-mode workflows triggered by a phrase |

### Available prompts

To run a prompt, type the trigger phrase in **Agent mode** (`#` or `@agent`).

| Prompt file | Trigger phrases | What it does |
|---|---|---|
| `update-docs.prompt.md` | "Aggiorna la documentazione" · "Aggiorna il README" | Reads the full project and rewrites `README.md` |
| `check-lint.prompt.md` | "Check del lint" · "Il progetto è pulito?" | Runs `eslint --fix`, reports remaining errors |
| `check-build.prompt.md` | "Check del build" · "Il progetto builda?" | Runs `nuxt typecheck` + `nuxt build` |
| `check-dependencies.prompt.md` | "Verifichiamo le dipendenze" · "Aggiorna le dipendenze" | Checks outdated packages, runs `npm audit fix` |
| `check-gsc.prompt.md` | "Check GSC" · "Verifica la SEO" · "Il progetto è pronto per GSC?" | Validates `sitemap.xml`, `robots.txt`, meta tags across all pages |
| `full-checkup.prompt.md` | "Checkup completo" · "Full checkup" · "Controlla tutto" | Orchestrates dependencies, SEO, build and lint checks; optionally updates docs |

### Instruction files

| File | Applies to | Governs |
|---|---|---|
| `design-system.instructions.md` | `**/*.vue` | CSS tokens, colours, typography, utilities, animations, icons |
| `components.instructions.md` | `**/components/**` | Full API catalogue for `Base*`, `Custom*`, `The*` components |
| `pages-layouts.instructions.md` | `**/pages/**`, `**/layouts/**` | Nuxt 4 routing, page template, SEO, i18n, data fetching |
| `composables-utils.instructions.md` | `**/composables/**`, `**/utils/**` | All composables, utils, global TypeScript types |
| `project-config.instructions.md` | `nuxt.config.ts`, `package.json` | `nuxt.config.ts` reference, scripts, dependencies, env vars |

---

## 10. Deployment

The project is pre-configured for **Netlify** (Nitro preset `netlify`).

```bash
npm run build
```

Connect the GitHub repository to Netlify with:

- **Build command:** `npm run build`
- **Publish directory:** `.output/public`
- **Node version:** `24.11.0`

### Changing the deployment target

Edit `nuxt.config.ts → nitro.preset`. See [Nitro deploy presets](https://nitro.unjs.io/deploy) for all options (Vercel, Cloudflare, AWS Lambda, etc.).

### Environment variables

Add all variables under **Site settings → Environment variables** on Netlify. All are accessed via `useRuntimeConfig().public` — never read `process.env` directly in Vue components.

| Variable | Required | Description |
|---|---|---|
| `NUXT_EMAILJS_PUBLIC_KEY` | Yes | EmailJS public key |
| `NUXT_EMAILJS_SERVICE_ID` | Yes | EmailJS service ID |
| `NUXT_EMAILJS_TEMPLATE_ADMIN_ID` | Yes | EmailJS template ID — admin notification email |
| `NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID` | Yes | EmailJS template ID — reply-to-user email |
| `NUXT_PUBLIC_CLOUDINARY_BASE` | Optional | Cloudinary base URL for `@nuxt/image` cloud provider |

### Versioning

Versioning is handled automatically by the [Release Please](https://github.com/googleapis/release-please) GitHub Action on every push to `main`. It bumps `package.json`, creates a GitHub Release and updates `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com) conventions.

---

## 11. Dependencies

### Runtime dependencies

| Package | Version | Purpose |
|---|---|---|
| `nuxt` | `^4.4.2` | Core framework |
| `vue` | `^3.5.32` | UI framework |
| `vue-router` | `^5.0.4` | Routing |
| `tailwindcss` | `^4.2.2` | Utility-first CSS |
| `@tailwindcss/vite` | `^4.2.2` | Tailwind v4 Vite plugin |
| `@nuxt/eslint` | `^1.15.2` | ESLint + stylistic rules |
| `@nuxt/icon` | `^2.2.1` | SVG icon system |
| `@nuxt/image` | `^2.0.0` | Image optimisation |
| `@nuxtjs/i18n` | `^10.2.4` | Multi-language support (EN + IT) |
| `@vueuse/core` | `^14.2.1` | Vue composition utilities |
| `@vueuse/nuxt` | `^14.2.1` | Nuxt integration for VueUse |
| `@floating-ui/vue` | `^1.1.11` | Floating element positioning |
| `isomorphic-dompurify` | `^3.7.1` | XSS-safe HTML sanitisation |
| `@emailjs/browser` | `^4.4.1` | Contact form email sending |
| `typed.js` | `^3.0.0` | Typewriter text animation |
| `zod` | `^4.3.6` | Runtime form validation |
| `eslint` | `^10.1.0` | Linter |

### Dev dependencies

| Package | Version | Purpose |
|---|---|---|
| `@iconify-json/solar` | `^1.2.5` | Solar icon set |
| `@iconify-json/mdi` | `^1.2.3` | MDI icon set |
| `@iconify-json/logos` | `^1.2.11` | Brand/tech logo icons |
| `@iconify-json/flagpack` | `^1.2.7` | Flag icons |
| `@types/node` | `^25.5.2` | Node.js type definitions |
| `vue-tsc` | `^3.2.6` | Vue TypeScript type checking |

---

<div align="center">

Copyright © 2026 Stefano Biddau — All Rights Reserved

This project is proprietary and confidential. See the [LICENSE](./LICENSE) file for details.

[stefanobiddau.com](https://stefanobiddau.com) · [@stefanoBid](https://github.com/stefanoBid)

</div>
