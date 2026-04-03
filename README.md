<div align="center">

  # Stefano Biddau — Portfolio

  [![Netlify Status](https://api.netlify.com/api/v1/badges/55a2b1a4-7d4b-4a3e-8edd-444dbf85092a/deploy-status)](https://app.netlify.com/projects/stefanobiddau/deploys)
  ![Version](https://img.shields.io/badge/version-1.3.23-blue)
  [![Node.js](https://img.shields.io/badge/node-%3E%3D24.11.0-brightgreen)](https://nodejs.org)
  [![Nuxt](https://img.shields.io/badge/nuxt-4-00DC82?logo=nuxt.js)](https://nuxt.com)
  [![Vue](https://img.shields.io/badge/vue-3-4FC08D?logo=vue.js)](https://vuejs.org)
  [![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6?logo=typescript)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
  ![License](https://img.shields.io/badge/license-Proprietary-red)

  **Portfolio personale di Stefano Biddau — Front-End Developer & Web Designer**

  [www.stefanobiddau.com](https://www.stefanobiddau.com)

</div>

---

## Table of Contents

1. [Overview](#1-overview)
2. [Getting Started](#2-getting-started)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Routing & Pages](#5-routing--pages)
6. [Layouts](#6-layouts)
7. [Components](#7-components)
8. [Composables & Utils](#8-composables--utils)
9. [Server API — Nitro Proxy Layer](#9-server-api--nitro-proxy-layer)
10. [AI Tooling — Prompts & Instructions](#10-ai-tooling--prompts--instructions)
11. [Deployment](#11-deployment)
12. [Environment Variables](#12-environment-variables)
13. [Versioning](#13-versioning)
14. [Dependencies](#14-dependencies)

---

## 1. Overview

This is Stefano Biddau's personal portfolio — a production Nuxt 4 SSG/SSR application deployed on Netlify. It showcases professional experience, projects, skills and a contact form.

Content is served via a **Strapi CMS** backend; all data fetching goes through a **Nitro proxy layer** (`server/api/`) to avoid CORS issues and enable server-side caching. The app is always dark-themed (no light/dark toggle).

Key design principles:

- **Always dark** — a single dark colour palette, no theme switching overhead.
- **Strapi-powered** — all portfolio content (milestones, projects, skills, templates) lives in the CMS and is fetched through server-side proxies.
- **i18n-first** — every user-facing string goes through `useI18n()`, supporting English (default) and Italian.
- **SSG + SSR hybrid** — all public pages are pre-rendered at build time; dynamic data (skills filters) is fetched client-side.
- **Type-safe throughout** — strict TypeScript, global interfaces in `global.d.ts`, Zod for form validation.

---

## 2. Getting Started

### Prerequisites

- **Node.js** ≥ 24.11.0 (see `.nvmrc`)
- **npm**
- A running **Strapi** instance (required for CMS data)
- **EmailJS** account (required for the contact form)

### Installation

```bash
git clone https://github.com/stefanoBid/stefano-biddau-portfolio.git
cd stefano-biddau-portfolio
npm install
```

### Environment setup

Create a `.env` file at the project root (see [Environment Variables](#12-environment-variables) for the full list):

```env
NUXT_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NUXT_EMAILJS_SERVICE_ID=your_emailjs_service_id
NUXT_EMAILJS_TEMPLATE_ADMIN_ID=your_admin_template_id
NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID=your_reply_to_template_id
NUXT_PUBLIC_STRAPI_URL=https://your-strapi-url.com
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
── server/                  ← Nitro server (proxy layer between frontend and Strapi)
     api/
       _health.get.ts       ← health check endpoint
       sb-milestones.get.ts ← proxy → Strapi milestones (cached 6h, locale-aware)
       sb-projects.get.ts   ← proxy → Strapi projects (cached 6h, locale-aware)
       sb-skills.get.ts     ← proxy → Strapi skills (dynamic filters + pagination, no cache)
       sb-templates.get.ts  ← proxy → Strapi sb-templates (cached 6h, locale-aware)
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
       useMilestones.ts     ← Nitro proxy data (useFetch, locale-aware)
       useNotification.ts   ← global notification system
       useProjects.ts       ← Nitro proxy data (useFetch, locale-aware)
       useSanitize.ts       ← XSS-safe HTML sanitisation
       useSkills.ts         ← Nitro proxy data ($fetch, filter-driven)
       useTemplates.ts      ← Nitro proxy data ($fetch, manual trigger)
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
       blocksToHtml.ts     ← Strapi rich text → HTML
       downloadFile.ts     ← browser file download trigger (client-side only)
       generateUuid.ts     ← UUID v4 generator
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

## 5. Routing & Pages

All pages are in `app/pages/` and follow Nuxt 4 file-based routing. Every page is **pre-rendered** at build time (`routeRules` in `nuxt.config.ts`). The i18n strategy is `prefix_except_default`: English is the default (no prefix), Italian gets `/it/`.

| File | Route (EN) | Route (IT) | Content |
|---|---|---|---|
| `index.vue` | `/` | `/it` | Hero + `CustomSolarSystem` + skills preview + contact form |
| `about-me.vue` | `/about-me` | `/it/about-me` | Career timeline via `useMilestones` |
| `my-skills.vue` | `/my-skills` | `/it/my-skills` | Filterable skills grid via `useSkills` with `BaseTabs` |
| `my-projects.vue` | `/my-projects` | `/it/my-projects` | Projects grid via `useProjects` |
| `privacy-policy.vue` | `/privacy-policy` | `/it/privacy-policy` | Legal |
| `terms-and-conditions.vue` | `/terms-and-conditions` | `/it/terms-and-conditions` | Legal |

### Adding a new page — step by step

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
useSeoMeta({
  title: t('pageName.meta.title'),
  description: t('pageName.meta.description'),
  ogTitle: t('pageName.meta.title'),
  ogDescription: t('pageName.meta.description'),
  ogUrl: 'https://www.stefanobiddau.com/my-page',
})
</script>

<template>
  <!-- page content -->
</template>
```

### i18n navigation

Use `localePath()` for all navigation links:

```vue
<NuxtLink :to="localePath('/my-skills')">Skills</NuxtLink>
```

---

## 6. Layouts

### `default.vue`

The only layout. Used by all pages. Structure: `TheHeader` → `<slot>` (page content) → `TheFooter` → `TheNotificationBanner` + `TheNotificationBox`.

A `useLocaleHead()` call in `default.vue` injects the correct `hreflang` alternate links on every page automatically.

### `ThePageHero`

Full-screen intro animation used on pages that need a cinematic entry. After the animation ends it emits `hero-animations-ended` so the page can reveal its content.

---

## 7. Components

All reusable components live in `app/components/`. Three component tiers:

| Prefix | Rule | Examples |
|---|---|---|
| `Base` | Fully reusable, zero business logic, no Strapi/API calls | `BaseButton`, `BaseInput`, `BaseTabs` |
| `Custom` | Portfolio-specific, may use data composables and business logic | `CustomSkillsCard`, `CustomContactForm` |
| `The` | Singleton — used once per layout | `TheHeader`, `TheFooter`, `ThePageHero` |

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
<BaseButton
  type="link"
  to="https://github.com/stefanoBid"
  variant="outline"
>
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
| `type` | `'text' \| 'password' \| 'email' \| …` | `'text'` | |
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

Decorative animated orbit component used in `my-skills.vue` to visualise tech categories as orbiting planets.

| Prop | Type | Notes |
|---|---|---|
| `planetsIcon` | `string[]` | Required. Iconify names to display as orbiting planets (max 8) |

Each `Custom*` component ships with a matching `*Skeleton.vue` for loading states.

---

## 8. Composables & Utils

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

---

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

Both functions return `{ success: boolean, data: SendResponse | null, error: unknown | null }`. Config keys come from `useRuntimeConfig().public`.

---

### `useMilestones(settings?)` / `useProjects(settings?)`

Fetch Strapi data through the Nitro proxy. Locale-aware — re-fetches automatically when the language changes.

```ts
const { data, pending, error } = useMilestones().fetchMilestones()
const { data, pending, error } = useProjects().fetchProjects()
```

- Uses `useFetch` with `watch: [locale]`.
- `settings.server` (default `true`) — enable SSR fetch.
- `settings.lazy` (default `false`) — non-blocking SSR fetch.

---

### `useSkills()`

Fetches skills with filters and pagination. Uses `$fetch` (manual trigger) because query params vary at runtime.

```ts
const { data, pending, error, pagination, fetchSkills } = useSkills()

await fetchSkills()
await fetchSkills({ name: 'vue', types: ['feFramework'], page: 1, pageSize: 12 })
```

State: `data: Ref<Skill[] | null>`, `pending: Ref<boolean>`, `error: Ref<Error | null>`, `pagination: ComputedRef<StrapiPagination | null>`.

---

### `useTemplates()`

Fetches GitHub templates via `$fetch` (manual trigger).

```ts
const { data, pending, error, fetchTemplates } = useTemplates()
await fetchTemplates()
```

---

### `useTypedText(input, options?)`

Typewriter animation via `typed.js`. **Client-side only.**

```ts
const { el, elStyle, isRunning } = useTypedText(['Frontend Dev', 'Vue Enthusiast', 'UI Craftsman'])
```

```vue
<span ref="el" :style="elStyle"></span>
```

- Single string → `LONG_TEXT_OPTIONS` (no loop, no backspace).
- Array of strings → `GROUP_STRING_OPTIONS` (loops with smart back-typing).
- Cursor character: `'\u00A0_'` (non-breaking space + underscore).
- Respects `prefers-reduced-motion` automatically.
- Loaded via dynamic import — SSR-safe.

---

### `useFloatingUi(config?)`

Wrapper around `@floating-ui/vue` for dropdown/tooltip positioning.

```ts
const { reference, floating, floatingStyles, open, toggleFloating } = useFloatingUi({
  placement: 'bottom-start',
  offset: 8,
  strategy: 'absolute',
})
```

---

### `useLockScroll()`

Prevents page scroll. Multi-caller safe — each instance holds its own owner ID.

```ts
const { lock, unlock, isLocked } = useLockScroll()
lock()    // adds scroll-locked class to <html>
unlock()  // removes it only when no other caller holds a lock
```

---

### `useSanitize()`

XSS-safe HTML rendering via `isomorphic-dompurify`.

```ts
const { sanitizeHtml } = useSanitize()
const clean = sanitizeHtml(dirtyHtml)
```

Server-side: skips DOMPurify (content trusted from CMS). Client-side: full DOMPurify sanitisation. Use only via `BaseRichText` — never write `v-html` directly.

---

### Utils

#### `generateUuid(): string`
Returns a random UUID v4 string.

#### `blocksToHtml(blocks: RichBlock[]): string`
Converts a Strapi `RichBlock[]` array to an HTML string. Always pair with `useSanitize()` before `v-html`, or use `BaseRichText` directly.

#### `downloadFile(publicUrl: string, filename: string): void`
Triggers a browser file download from a public URL (e.g. CV download). **Client-side only.**

---

### Global TypeScript types (`app/types/global.d.ts`)

All interfaces are declared globally — no import needed.

| Type | Description |
|---|---|
| `SkillType` | `'beLang' \| 'feLang' \| 'beFramework' \| 'feFramework' \| 'database' \| 'tool' \| 'other'` |
| `MenuItem` | `{ code, label, iconType, icon }` — language switcher and icon-menu items |
| `RouteItem` | `{ name, path, disabled? }` — navigation links |
| `NotificationItem` | `{ id, type, icon?, title?, message, dismissible?, autoClose?, duration? }` |
| `SkillsFilterPreset` | `{ key, filters: SkillType[] }` — preset filter buttons in `my-skills.vue` |
| `StrapiResponse<T>` | `{ data: T, meta: { pagination: { page, pageSize, pageCount, total } } }` |
| `RichBlock` | Union of `RichBlockParagraph \| RichBlockHeading \| RichBlockList \| RichBlockQuote \| RichBlockCode` |

---

## 9. Server API — Nitro Proxy Layer

The frontend **never calls Strapi directly**. All data flows through a Nitro proxy:

```
Client / SSR
    │
    ▼
/api/sb-*  (Nitro — server/api/)
    │
    ▼
Strapi CMS  (NUXT_PUBLIC_STRAPI_URL)
```

This pattern avoids CORS issues, hides the Strapi URL from the client bundle, enables server-side caching and allows graceful degradation.

### Endpoint catalogue

| File | Route | Caching | Notes |
|---|---|---|---|
| `_health.get.ts` | `GET /api/_health` | None | Health check |
| `sb-milestones.get.ts` | `GET /api/sb-milestones` | 6h SWR | Locale-aware |
| `sb-projects.get.ts` | `GET /api/sb-projects` | 6h SWR | Locale-aware |
| `sb-skills.get.ts` | `GET /api/sb-skills` | None | Dynamic filters + pagination |
| `sb-templates.get.ts` | `GET /api/sb-templates` | 6h SWR | Locale-aware |

### Caching strategy

| Setting | Value | Effect |
|---|---|---|
| `maxAge` | `60 * 60 * 6` | Cache lives for 6h on the server |
| `swr` | `true` | Returns cached data immediately while refreshing in background |
| `getKey` | locale string | Separate cache bucket per language |

Use `cachedEventHandler` for static/semi-static Strapi collections (milestones, projects, templates). Use `defineEventHandler` for endpoints with dynamic query params (skills) — caching filter combinations would grow unboundedly.

### Adding a new endpoint

1. Create `server/api/sb-<resource>.get.ts`.
2. Follow the locale-aware `cachedEventHandler` pattern (or `defineEventHandler` for dynamic filters).
3. Guard `baseUrl` at the top — return a `500` if missing.
4. Sanitise every query param before forwarding to Strapi.
5. Return `{ data: [] }` in the `catch` block to prevent build failures.
6. Add a matching composable `app/composables/use<Resource>.ts`.
7. Add a `*Skeleton.vue` component for the loading state.

---

## 10. AI Tooling — Prompts & Instructions

The project ships with pre-configured [GitHub Copilot](https://github.com/features/copilot) context under `.github/`. All configuration is versioned alongside the code.

### How GitHub Copilot is configured

| File / folder | Purpose |
|---|---|
| `.github/copilot-instructions.md` | Global rules: app context, response language, stack, naming conventions |
| `.github/instructions/*.instructions.md` | Scoped rules loaded automatically per file type |
| `.github/prompts/*.prompt.md` | Reusable Agent-mode workflows triggered by a phrase |

### Available prompts

| Prompt file | Trigger phrases | What it does |
|---|---|---|
| `update-docs.prompt.md` | "Aggiorna la documentazione" · "Aggiorna il README" | Reads the full project and rewrites `README.md` |
| `check-lint.prompt.md` | "Check del lint" · "Il progetto è pulito?" | Runs `eslint --fix`, reports remaining errors |
| `check-build.prompt.md` | "Check del build" · "Il progetto builda?" | Runs `nuxt typecheck` + `nuxt build` |
| `bump-version.prompt.md` | "Aggiornami il progetto alla versione X.Y.Z" | Updates `package.json` version, `CHANGELOG.md` and README badges |
| `check-dependencies.prompt.md` | "Verifichiamo le dipendenze" · "Aggiorna le dipendenze" | Checks outdated packages, runs `npm audit` |
| `check-gsc.prompt.md` | "Check GSC" · "Verifica la SEO" · "Il progetto è pronto per GSC?" | Validates `sitemap.xml`, `robots.txt`, meta tags across all pages |

### Instruction files

| File | Applies to | Governs |
|---|---|---|
| `design-system.instructions.md` | `**/*.vue` | CSS tokens, colours, typography, utilities, animations, icons |
| `components.instructions.md` | `**/components/**` | Full API catalogue for `Base*`, `Custom*`, `The*` components |
| `pages-layouts.instructions.md` | `**/pages/**`, `**/layouts/**` | Nuxt 4 routing, page template, SEO, i18n, data fetching |
| `composables-utils.instructions.md` | `**/composables/**`, `**/utils/**` | All composables, utils, global TypeScript types |
| `project-config.instructions.md` | `nuxt.config.ts`, `package.json` | `nuxt.config.ts` reference, scripts, dependencies, env vars |
| `server-api.instructions.md` | `**/server/**` | Nitro proxy rules, endpoint catalogue, caching strategy, Strapi integration |

---

## 11. Deployment

The project is pre-configured for **Netlify** (Nitro preset `netlify`).

```bash
npm run build
```

Connect the GitHub repository to Netlify with:

- **Build command:** `npm run build`
- **Publish directory:** `.output/public`
- **Node version:** `24.11.0`

Add all required environment variables under **Site settings → Environment variables** (see below).

---

## 12. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NUXT_EMAILJS_PUBLIC_KEY` | Yes | EmailJS public key |
| `NUXT_EMAILJS_SERVICE_ID` | Yes | EmailJS service ID |
| `NUXT_EMAILJS_TEMPLATE_ADMIN_ID` | Yes | EmailJS template ID for admin notification email |
| `NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID` | Yes | EmailJS template ID for reply-to-user email |
| `NUXT_PUBLIC_STRAPI_URL` | Yes | Strapi CMS base URL (e.g. `https://cms.example.com`) |

All variables are accessed in the app via `useRuntimeConfig().public`. They are declared in `nuxt.config.ts → runtimeConfig.public`. Never read `process.env` directly in Vue components.

---

## 13. Versioning

The project uses manual versioning via `package.json` and maintains a `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com) with Semantic Versioning.

```bash
# 1. Bump version
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

# 2. Update CHANGELOG.md

# 3. Commit and tag
git add package.json CHANGELOG.md
git commit -m "chore: bump version to 1.0.1"
git tag -a "v1.0.1" -m "Release v1.0.1"
git push origin main && git push origin v1.0.1
```

Use the `bump-version` Copilot Agent prompt to automate the full workflow (see [AI Tooling](#10-ai-tooling--prompts--instructions)).

---

## 14. Dependencies

| Package | Version | Purpose |
|---|---|---|
| `nuxt` | ^4.4.2 | Core framework |
| `vue` | ^3.5.x | UI framework |
| `vue-router` | ^5.x | Routing |
| `tailwindcss` | ^4.x | Utility-first CSS |
| `@tailwindcss/vite` | ^4.x | Tailwind v4 Vite plugin |
| `@nuxt/icon` | ^2.x | SVG icon system |
| `@nuxt/image` | ^2.x | Image optimisation |
| `@nuxtjs/i18n` | ^10.x | Multi-language support (EN + IT) |
| `@vueuse/nuxt` | ^14.x | Vue composition utilities |
| `@floating-ui/vue` | ^1.x | Floating element positioning |
| `isomorphic-dompurify` | ^3.x | XSS-safe HTML sanitisation |
| `@emailjs/browser` | ^4.x | Contact form email sending |
| `typed.js` | ^3.x | Typewriter text animation |
| `zod` | ^4.x | Runtime form validation |
| `@iconify-json/solar` *(dev)* | ^1.x | Solar icon set |
| `@iconify-json/mdi` *(dev)* | ^1.x | MDI icon set |
| `@iconify-json/logos` *(dev)* | ^1.x | Brand/tech logo icons |
| `@iconify-json/flagpack` *(dev)* | ^1.x | Flag icons |
| `@nuxt/eslint` *(dev)* | ^1.x | ESLint + stylistic rules |
| `@types/node` *(dev)* | ^25.x | Node.js type definitions |

---

<div align="center">

Copyright © 2025 Stefano Biddau — All Rights Reserved

This project is proprietary and confidential. See the [LICENSE](./LICENSE) file for details.

[www.stefanobiddau.com](https://www.stefanobiddau.com) · [@stefanoBid](https://github.com/stefanoBid)

</div>
