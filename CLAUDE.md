# CLAUDE.md — stefano-biddau-portfolio

Nuxt 4 personal portfolio for Stefano Biddau. Production SSG/SSR app on Netlify. Always dark-themed — no light mode, no toggle.

---

## Stack

- **Nuxt 4** (Vue 3, `<script setup>`, SSR + prerender)
- **Tailwind CSS v4** via `@tailwindcss/vite` — no config file, tokens in CSS `@theme`
- **@nuxt/icon** — SVG mode; collections: `logos`, `mdi`, `solar`, `flagpack`
- **@nuxt/image** — `ipx` local + Cloudinary provider
- **@nuxt/fonts** — self-hosts Bebas Neue + Space Mono from Google, no external `fonts.googleapis.com` request
- **@nuxtjs/color-mode** — `preference`/`fallback` fixed to `'dark'`, no `'system'` — app has no light theme and no toggle, module exists only for a centralized config point
- **@nuxtjs/i18n** — `en` (default, no prefix) + `it` (`/it/...`); `prefix_except_default`
- **@vueuse/nuxt** — Vue composition utilities
- **@floating-ui/vue** — dropdowns, menus
- **isomorphic-dompurify** — HTML sanitisation (client-side only)
- **@emailjs/browser** — contact form (client-side only)
- **typed.js** — typewriter animation (client-side only)
- **zod** — form validation
- **ESLint** with `@nuxt/eslint` + stylistic rules
- **TypeScript** strict mode
- Deployment: **Netlify** (Nitro preset)
- Node.js: **24.19.0** (`.nvmrc`)

---

## npm install policy

- `main` branch: **`npm ci` only** — never `npm install`
- All other branches: `npm install` allowed
- Use `npm run si` when unsure — auto-detects branch

---

## Naming rules

| Element | Style | Example |
|---|---|---|
| Directory | kebab-case | `my-feature/` |
| Vue file | PascalCase + prefix | `BaseButton.vue`, `TheHeader.vue`, `CustomSkillsCard.vue` |
| Composable | camelCase + `use` | `useNotification.ts` |
| Utility / type | camelCase | `generateUuid.ts` |
| CSS utility | `ty-sb-*` / `u-sb-*` | `ty-sb-title`, `u-sb-soft-transition` |
| CSS variable | `--color-sb-*` | `--color-sb-accent` |

- `Base*` — fully reusable, zero business logic, no API calls
- `Custom*` — portfolio-specific, may use composables; in `app/components/custom/<feature>/`
- `The*` — singletons (one per layout); in `app/components/the-<name>/`

---

## Code conventions

### Vue & Nuxt 4
- All hardcoded strings and code comments in **English**
- `<script setup lang="ts">` always — no Options API
- Nuxt auto-imports: composables, utils, components, Vue APIs, Nuxt composables — no manual imports needed
- `useRuntimeConfig()` for env vars — never `process.env` in components
- Prefer `useFetch` / `useAsyncData` over `$fetch` in components
- `<ClientOnly>` for browser-only APIs

### `<script setup>` structure (in order, omit unused)
```ts
// Dependencies   ← composables destructured
// Input / Output ← props, model, emit
// Data           ← refs, reactive state, computed
// Events         ← handler functions
```

### Props
```ts
interface MyComponentProps {
  title: string
  size?: 'sm' | 'md' | 'lg'
}
const props = withDefaults(defineProps<MyComponentProps>(), {
  size: 'sm',
})
```

### defineModel
```ts
const model = defineModel<string>('input')
```

### defineEmits (call-signature syntax)
```ts
const emit = defineEmits<{
  (e: 'close', value: false): void
  (e: 'select', item: MyItem): void
}>()
```

### Function naming
| Category | Prefix | Example |
|---|---|---|
| Event handlers / watchers | `on` | `onClose`, `onKeydown` |
| Internal helpers | `_` | `_buildPayload`, `_resetState` |
| General utilities | free | `fetchData`, `resetForm` |

### TypeScript
- Strict mode — no `any`, use `unknown` and narrow
- `interface` for object shapes, `type` for unions/utility types
- Global interfaces → `app/types/global.d.ts` — never inline in components

### Styling
- Default: inline Tailwind utility classes directly in templates
- No custom CSS classes unless explicitly requested
- No `<style>` blocks unless explicitly requested
- Never hardcode raw hex values — use design tokens
- No `dark:` Tailwind variants needed
- Dynamic classes via `:class` with arrays/objects — never string concatenation

### i18n — ABSOLUTE RULE
- **Never hardcode strings in templates or scripts**
- Every user-facing string uses `$t('key')` (template) or `const { t } = useI18n()` (script)
- Always add keys to **both** `en.json` and `it.json` simultaneously

### ESLint
No semicolons · single quotes · trailing commas · 2-space indent · `vue/attributes-order: alphabetical` · max 3 attributes per line (1 per line when multiline)

### Comments
Write no comments. Only add one when the WHY is non-obvious. Never explain WHAT the code does.

---

## Design system

### Colours (`--color-sb-*` / Tailwind `bg-sb-*`, `text-sb-*`, `border-sb-*`)

| Token | Value | Usage |
|---|---|---|
| `sb-main` | `#0f0f20` | Page background |
| `sb-surface` | `#1a1a2e` | Card / elevated surface |
| `sb-surface-2` | `#232342` | Nested surfaces, inputs |
| `sb-border` | `#2a2a44` | Default borders |
| `sb-shadow` | `rgba(0,0,0,0.45)` | Shadows via `var()` only |
| `sb-accent` | `#e95905` | Primary CTA, highlights |
| `sb-accent-hover` | `#d24f05` | Hover on accent |
| `sb-accent-border` | `#b34704` | Border on accent elements |
| `sb-contrast` | `#f1f1f1` | Primary text |
| `sb-muted` | `#9ca3af` | Secondary / placeholder text |
| `sb-success` | `#22c55e` | Success |
| `sb-warning` | `#fb923c` | Warning |
| `sb-error` | `#ef4444` | Error |
| `sb-info` | `#60a5fa` | Info |
| `sb-success-bg` | `#14532d` | Success tint bg |
| `sb-warning-bg` | `#78350f` | Warning tint bg |
| `sb-error-bg` | `#7f1d1d` | Error tint bg |
| `sb-info-bg` | `#1e3a8a` | Info tint bg |

Opacity modifiers allowed: `bg-sb-main/80`.

### Typography (`ty-sb-*`)

| Class | Font | Usage |
|---|---|---|
| `ty-sb-hero` | Bebas Neue, uppercase | Full-bleed hero (`text-6xl` → `text-[12rem]`) |
| `ty-sb-impact` | Bebas Neue, uppercase | Large display (`text-5xl` → `text-9xl`) |
| `ty-sb-title` | Bebas Neue | Section titles (`text-2xl` → `text-4xl`) |
| `ty-sb-title-lg` | Bebas Neue | Large section titles (`text-3xl` → `text-6xl`) |
| `ty-sb-title-xl` | Bebas Neue | XL titles (`text-4xl` → `text-7xl`) |
| `ty-sb-subtitle` | Space Mono semibold | Sub-headings (`text-base` → `text-xl`) |
| `ty-sb-subtitle-lg` | Space Mono semibold | Large sub-headings (`text-lg` → `text-2xl`) |
| `ty-sb-subtitle-xl` | Space Mono semibold | XL sub-headings (`text-xl` → `text-3xl`) |
| `ty-sb-paragraph` | Space Mono | Body text (`text-sm` → `text-lg`) |
| `ty-sb-label` | Space Mono, uppercase, tracked | Form labels, tags |
| `ty-sb-btn-label` | Space Mono bold, uppercase | Button text |
| `ty-sb-caption` | Space Mono italic | Captions, secondary notes |

- `font-bebas-neue` → all titles (`ty-sb-hero`, `ty-sb-impact`, `ty-sb-title*`)
- `font-space-mono` → subtitles, body, labels, buttons

### Utility classes (`u-sb-*`)

| Class | Effect |
|---|---|
| `u-sb-soft-transition` | `transition-all duration-200 ease-in-out` |
| `u-sb-hard-transition` | `transition-all duration-500 ease-in-out` |
| `u-sb-focus` | `outline-none ring-sb-contrast focus-visible:ring-2` |
| `u-sb-focus-within` | `outline-none ring-sb-contrast focus-within:ring-2` |
| `u-sb-no-focus` | Removes all focus outlines |

Always add `u-sb-soft-transition` to interactive elements.

### Animations (Vue `<Transition>`)

| Name | Effect | Duration |
|---|---|---|
| `fade` | Opacity + slight Y offset | 800ms |
| `slide-down` | Opacity + slides from top | 200ms |
| `scale-fade` | Opacity + scale from 0.95 | 200ms |

### Icons
- Always `<Icon>` from `@nuxt/icon`, collection prefix mandatory
- Collections: `solar` (bold duotone UI), `mdi` (general UI), `logos` (brand/tech), `flagpack` (flags)
- Size via Tailwind: `size-4` to `size-7`
- Colour via token: `text-sb-contrast`, `text-sb-muted`, `text-sb-accent`
- Always `aria-label` on icon-only interactive elements
- **Do not use `lucide`** — not installed

---

## Pages

All pages are pre-rendered (SSG). Never remove `prerender: true` entries.

| File | Route EN | Route IT |
|---|---|---|
| `index.vue` | `/` | `/it` |
| `about-me.vue` | `/about-me` | `/it/about-me` |
| `my-skills.vue` | `/my-skills` | `/it/my-skills` |
| `my-projects.vue` | `/my-projects` | `/it/my-projects` |
| `privacy-policy.vue` | `/privacy-policy` | `/it/privacy-policy` |
| `terms-and-conditions.vue` | `/terms-and-conditions` | `/it/terms-and-conditions` |

### Creating a new page
1. Create `.vue` in `app/pages/`
2. Add `useSeoMeta()` with translated meta tags
3. Add translation keys to both `en.json` and `it.json`
4. Add `prerender: true` for both EN and IT routes in `nuxt.config.ts`

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
})
</script>

<template>
  <!-- page content -->
</template>
```

### Layout
Default layout (`app/layouts/default.vue`): `TheHeader` (sticky, `h-16`) + `<main>` (`pt-16 px-6 md:px-10`, `max-w-350` container) + `TheFooter` + notifications.

---

## Composables

### `useNotification()`
```ts
const { notifications, removeNotification, clearNotifications, success, warning, error, info } = useNotification()
info({ title: 'Title', message: 'Message', icon?: '...', dismissible?: true, autoClose?: true, duration?: 5000 })
```
Methods: `success()`, `warning()`, `error()`, `info()` — accept `Omit<NotificationItem, 'type' | 'id'>`.
Client-side only — composable guards internally.

### `useEmailJs()`
```ts
const { sendContactEmailAdmin, sendReplyToUser } = useEmailJs()
```
Both return `{ success: boolean, data: SendResponse | null, error: unknown | null }`.
Client-side only.

### `useMilestones()`
```ts
const { milestones } = useMilestones()
```
No backend — reads `pages.about.milestones` from the active i18n locale via `tm()`/`rt()`, content authored as Markdown and converted with `markdownToRichBlocks`. Purely reactive: no fetch, no loading/error state, updates automatically on language change.

### `useProjects()`
```ts
const { projects } = useProjects()
```
Same pattern as `useMilestones` — reads `pages.projects.personalProjects.list`.

### `useSkills()`
```ts
const { filters, skills, pagination } = useSkills()
filters.value.name = 'vue'
filters.value.types = ['feFramework']
filters.value.page = 1
```
Skills are a hardcoded local list (`SKILLS_DATA`, in the composable file, not i18n) — no backend. `skills` and `pagination` are `computed` from `filters`; mutate `filters.value` directly to refilter/paginate, nothing to `await`.

### `useTemplates()`
```ts
const { templates } = useTemplates()
```
Same pattern as `useMilestones` — reads `pages.projects.sbTemplatesProject.list`.

### `useTypedText(input, options?)`
```ts
const { el, elStyle, isRunning } = useTypedText(['Frontend Dev', 'UI Craftsman'])
// Template: <span ref="el" :style="elStyle"></span>
```
Client-side only. Respects `prefers-reduced-motion`.

### `useFloatingUi(config?)`
```ts
const { reference, floating, floatingStyles, open, toggleFloating } = useFloatingUi({
  placement: 'bottom-start', offset: 8, strategy: 'absolute',
})
```

### `useLockScroll()`
```ts
const { lock, unlock, isLocked } = useLockScroll()
```
SSR-safe, multiple concurrent owners safe.

### `useSanitize()`
```ts
const { sanitizeHtml } = useSanitize()
const clean = sanitizeHtml(dirtyHtml)
```
Use with `v-html` only via `BaseRichText` — never write `v-html` directly with unsanitised content.

### Writing new composables
- File: `app/composables/useSomething.ts` — content-source composables (backed by i18n or a local data array, like `useMilestones`/`useProjects`/`useSkills`/`useTemplates`) go in `app/composables/data/useSomething.ts` instead
- Export default function `useSomething`
- Always type return values explicitly
- `useState` for global/shared state, `ref`/`computed` for local
- Guard DOM access: `if (!import.meta.client) return`
- Private helpers: `_` prefix

---

## Utils

- `generateUuid(): string` — random UUID v4
- `blocksToHtml(blocks: RichBlock[]): string` — RichBlock[] → HTML; always pair with `useSanitize()`
- `downloadFile(publicUrl: string, filename: string): void` — browser download, client-side only
- `markdownToRichBlocks(markdown: string): RichBlock[]` — Markdown (as authored in i18n locale files) → RichBlock[]

---

## Global TypeScript types (`app/types/global.d.ts`)

Add new shared interfaces to `global.d.ts` inside `declare global {}` — never inline in components.

---

## Server API (Nitro)

No backend/CMS — `useMilestones`/`useProjects`/`useTemplates`/`useSkills` read from i18n translation files or local data, not from a server. The only `server/` code is small Nitro routes for things that must vary per Netlify deploy context or can't be a static file:

- `server/routes/robots.txt.ts` — `Disallow: /` on `deploy-preview`/`branch-deploy` (via `process.env.CONTEXT`), `Allow: /` + sitemap link on `production`. Never prerender this route (`routeRules['/robots.txt'] = { prerender: false }` in `nuxt.config.ts`) — it must run per-request to read `CONTEXT`.

New server code goes in `server/routes/<name>.ts` (served at `/<name>`) or `server/api/<name>.ts` (served at `/api/<name>`), depending on whether the path needs the `/api` prefix.

---

## `nuxt.config.ts` key reference

### `tsconfig.json`
Fully delegated to auto-generated `.nuxt/tsconfig.app.json` / `.nuxt/tsconfig.server.json` (strict mode, path aliases, Vue types). Never manually add `compilerOptions` — run `nuxt prepare` to regenerate after config changes.

---

## `package.json` scripts

| Script | Command | Use |
|---|---|---|
| `dev` | `nuxt dev` | Local development server |
| `build` | `nuxt build` | SSR production build |
| `generate` | `nuxt generate` | Full static site generation |
| `preview` | `nuxt preview` | Preview the production build locally |
| `postinstall` | `nuxt prepare` | Generates `.nuxt/` types after install |
| `lint` | `eslint .` | Check for lint errors |
| `lint:fix` | `eslint . --fix` | Auto-fix lint errors |
| `si` | branch-aware install | `npm ci` on `main`, `npm install` elsewhere |

---

## Accessibility
- `aria-label` on all icon-only interactive elements
- `aria-describedby` for form hints/errors
- `aria-invalid` on inputs with errors

---

## Maintenance workflows

On request, run these checks (`dependency-check`, `lint-check`, `build-check`, `seo-check`, `full-checkup`, `update-documentation` skills). Report results in the same language the user asked in.

---

## Documentation sync rule

Every change that creates a discrepancy with `README.md` **must** be followed by a targeted documentation update in the same session. This applies to: new/removed/renamed components, pages, composables, utils, layouts; prompt files; instruction files; dependencies; `nuxt.config.ts` changes; structural changes.

Edit only the affected sections — do not rewrite the full README unless asked.
