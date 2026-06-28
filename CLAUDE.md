# CLAUDE.md — stefano-biddau-portfolio

Nuxt 4 personal portfolio for Stefano Biddau. Production SSG/SSR app on Netlify. Always dark-themed — no light mode, no toggle.

---

## Stack

- **Nuxt 4** (Vue 3, `<script setup>`, SSR + prerender)
- **Tailwind CSS v4** via `@tailwindcss/vite` — no config file, tokens in CSS `@theme`
- **@nuxt/icon** — SVG mode; collections: `logos`, `mdi`, `solar`, `flagpack`
- **@nuxt/image** — `ipx` local + Cloudinary provider
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
- Node.js: **24.11.0** (`.nvmrc`)

---

## npm install policy

- `main` branch: **`npm ci` only** — never `npm install`
- All other branches: `npm install` allowed
- Use `npm run si` when unsure — auto-detects branch

---

## Project structure

```
nuxt.config.ts
package.json
tsconfig.json
eslint.config.mjs
i18n/locales/
  en.json            ← English (source of truth)
  it.json            ← Italian
app/
  app.vue            ← root: NuxtLayout + NuxtPage
  error.vue
  assets/css/
    main.css         ← entry: imports all CSS in order
    theme.css        ← @theme: CSS custom properties (always dark)
    typography.css   ← @utility ty-sb-* classes
    utilities.css    ← @utility u-sb-* classes
    animations.css   ← Vue transition classes
  components/
    base/            ← reusable, no business logic
    custom/          ← portfolio-specific, may use composables
    the-footer/      TheFooter.vue
    the-header/      TheHeader.vue, TheHeaderMenuToggle.vue
    the-notification/ TheNotificationBanner.vue, TheNotificationBox.vue
    the-page-hero/   ThePageHero.vue
  composables/
    useEmailJs.ts
    useFloatingUi.ts
    useLockScroll.ts
    useMilestones.ts
    useNotification.ts
    useProjects.ts
    useSanitize.ts
    useSkills.ts
    useTemplates.ts
    useTypedText.ts
  layouts/
    default.vue      ← TheHeader + <slot> + TheFooter + notifications
  pages/
    index.vue        ← /  (hero, skills preview, contact form)
    about-me.vue     ← /about-me
    my-skills.vue    ← /my-skills
    my-projects.vue  ← /my-projects
    privacy-policy.vue
    terms-and-conditions.vue
  plugins/
    scrollToTop.client.ts
  types/
    global.d.ts      ← global TS interfaces
  utils/
    blocksToHtml.ts
    downloadFile.ts
    generateUuid.ts
    markdownToBlocks.ts
server/api/          ← Nitro proxy endpoints (sb-*)
```

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

## Component API catalogue

### Base components

#### `BaseButton`
| Prop | Type | Default |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` |
| `type` | `'button' \| 'submit' \| 'reset' \| 'link'` | `'button'` |
| `to` | `string` | `undefined` — required when `type='link'` |
| `ariaLabel` | `string` | `undefined` |
| `isDisabled` | `boolean` | `false` |
| `isLoading` | `boolean` | `false` |

Slot: `default`

#### `BaseCard`
| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `undefined` |
| `subtitle` | `string` | `undefined` |
| `paragraph` | `string` | `undefined` |
| `variant` | `'dark' \| 'dark-hover' \| 'light' \| 'light-hover'` | `'light'` |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` |
| `fullCustomContent` | `boolean` | `false` |

Slots: `default`, `card-header`, `card-body`, `card-footer`

#### `BaseInput`
| Prop | Type | Default |
|---|---|---|
| `id` | `string` | — Required |
| `name` | `string` | `undefined` |
| `label` | `string` | `undefined` |
| `placeholder` | `string` | `'Insert a value...'` |
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'search' \| 'tel' \| 'url'` | `'text'` |
| `hint` | `string` | `undefined` |
| `error` | `string \| null` | `null` |
| `autocomplete` | `string` | `'off'` |
| `prefixIcon` | `string` | `undefined` |

Model: `defineModel<string>('input')`

#### `BaseTextarea`
| Prop | Type | Default |
|---|---|---|
| `id` | `string` | — Required |
| `label` | `string` | `undefined` |
| `placeholder` | `string` | `'Insert a value...'` |
| `hint` | `string` | `undefined` |
| `error` | `string \| null` | `null` |
| `maxLength` | `number` | `undefined` |

Model: `defineModel<string>('input')`

#### `BaseCheckbox`
| Prop | Type | Default |
|---|---|---|
| `id` | `string` | — Required |
| `label` | `string` | `undefined` |
| `error` | `string \| null` | `null` |

Model: `defineModel<boolean>('input')` · Slot: `default`

#### `BaseCombobox` (generic `<T>`)
| Prop | Type | Default |
|---|---|---|
| `id` | `string` | — Required |
| `type` | `'single' \| 'multiple'` | `'single'` |
| `items` | `{ label: string, value: T }[]` | — Required |
| `label` | `string` | `undefined` |
| `placeholder` | `string` | `'Insert a value...'` |
| `error` | `string \| null` | `null` |
| `prefixIcon` | `string` | `undefined` |

Model: `defineModel<T[]>('input', { default: () => [] })`

#### `BaseChip`
| Prop | Type | Default |
|---|---|---|
| `text` | `string` | — Required |
| `icon` | `string` | `undefined` |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` |
| `clickable` | `boolean` | `false` |
| `linkable` | `{ href: string, target?: string, rel?: string }` | `undefined` |

Emits: `chip-click` (only when `clickable: true`)

#### `BaseDialog`
| Prop | Type | Default |
|---|---|---|
| `isOpen` | `boolean` | — Required |
| `title` | `string` | — Required |
| `subtitle` | `string` | `undefined` |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'sm'` |

Emits: `(e: 'close', value: false): void` · Slots: `default`, `header`, `footer`
Closes on `Escape`, locks scroll, traps focus, `<Teleport to="body">`.

#### `BaseAccordion`
| Prop | Type | Default |
|---|---|---|
| `id` | `string` | — Required |
| `title` | `string` | — Required |
| `icon` | `string` | `undefined` |
| `isOpen` | `boolean` | `undefined` — if omitted, manages state internally |

Emits: `toggle` · Slot: `default`

#### `BaseIconButton`
| Prop | Type | Default |
|---|---|---|
| `icon` | `string` | — Required |
| `ariaLabel` | `string` | `undefined` — always set it |
| `isActive` | `boolean` | `false` |

Emits: `(e: 'click'): void`

#### `BaseIconMenu`
| Prop | Type | Default |
|---|---|---|
| `icon` | `string` | — Required |
| `items` | `MenuItem[]` | — Required |
| `selectedItemId` | `string \| null` | `null` |

Emits: `(e: 'select', itemId: string): void` · Uses `useFloatingUi` internally.

#### `BaseCloseButton`
No props. Emits: `(e: 'close', value: false): void`

#### `BaseTabs`
| Prop | Type | Default |
|---|---|---|
| `tabs` | `{ label: string, icon?: string, id: string \| number }[]` | — Required |
| `variant` | `'primary' \| 'secondary'` | `'primary'` |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` |

Model: `defineModel<string | number>('selectedTabId')`

#### `BaseEmptyBox`
| Prop | Type | Default |
|---|---|---|
| `title` | `string` | — Required |
| `message` | `string` | — Required |
| `icon` | `string` | `'solar:box-minimalistic-bold-duotone'` |
| `dimension` | `'normal' \| 'small'` | `'normal'` |

#### `BaseRichText`
Prop: `blocks: RichBlock[]` — Required. Converts to sanitised HTML via `blocksToHtml` + `useSanitize`.

### Singleton components (`The*`)

#### `TheHeader`
Props: `routes: RouteItem[]`, `langs: MenuItem[]`, `selectedLangId: string`
Emits: `(e: 'change-lang', langCode: string): void`

#### `TheFooter`
Props: `email`, `phone`, `githubUrl`, `instagramUrl`, `linkedinUrl`, `quickLinks: RouteItem[]`

#### `ThePageHero`
| Prop | Type | Default |
|---|---|---|
| `id` | `string` | — Required (key for `useState` animation guard) |
| `text` | `string` | — Required |
| `imageSrc` | `string` | `undefined` |
| `lockScroll` | `boolean` | `false` |

Emits: `(e: 'hero-animations-ended'): void`

#### `TheNotificationBanner` / `TheNotificationBox`
Driven by `useNotification` — managed by `default.vue`, do not instantiate manually.

### Custom components

#### `CustomContactForm`
Prop: `openForm: boolean` · Emits: `(e: 'closeForm', value: boolean): void`
Uses `useEmailJs`, `zod`, `useNotification`.

#### `CustomSkillsCard`
Props: `name: string`, `level: number` (0–5), `icon: string`, `gold?: boolean`

#### `CustomProjectsCard`
Props: `title`, `content: RichBlock[]`, `coverImageSrc?`, `coverImageAlt?`, `codebaseUrl?`, `deployUrl?`

#### `CustomSbTemplatesCard`
Props: `title`, `description`, `codebaseUrl`, `logoSrc?`, `langIcons?: string[]`

#### `CustomMilestone`
Props: `id`, `title`, `content: RichBlock[]`, `subtitle?`, `imageSrc?`, `imageCaption?`, `date?`

#### `CustomSolarSystem`
Prop: `planetsIcon: string[]` — Iconify names, max 8

Each Custom component has a paired `*Skeleton.vue` for loading states.

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

### `useMilestones(settings?)`
```ts
const { data, pending, error } = useMilestones({ server: true, lazy: false }).fetchMilestones()
```
Locale-aware, auto-refetches on language change.

### `useProjects(settings?)`
```ts
const { data, pending, error } = useProjects().fetchProjects()
```

### `useSkills()`
```ts
const { data, pending, error, pagination, fetchSkills } = useSkills()
await fetchSkills({ name: 'vue', types: ['feFramework'], page: 1, pageSize: 12 })
```
Uses `$fetch` (manual trigger) — not `useFetch`.

### `useTemplates()`
```ts
const { data, pending, error, fetchTemplates } = useTemplates()
await fetchTemplates()
```

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
- File: `app/composables/useSomething.ts`
- Export default function `useSomething`
- Always type return values explicitly
- `useState` for global/shared state, `ref`/`computed` for local
- Guard DOM access: `if (!import.meta.client) return`
- Private helpers: `_` prefix

---

## Utils

- `generateUuid(): string` — random UUID v4
- `blocksToHtml(blocks: RichBlock[]): string` — Strapi rich text → HTML; always pair with `useSanitize()`
- `downloadFile(publicUrl: string, filename: string): void` — browser download, client-side only
- `markdownToBlocks(md: string): RichBlock[]` — Markdown → RichBlock[]

---

## Global TypeScript types (`app/types/global.d.ts`)

All declared globally — no import needed.

```ts
type SkillType = 'beLang' | 'feLang' | 'beFramework' | 'feFramework' | 'database' | 'tool' | 'other'

interface MenuItem { code: string; label: string; iconType: 'nuxt-icon' | 'custom'; icon: string }
interface RouteItem { name: string; path: string; disabled?: true }
interface NotificationItem { id: string; type: 'success' | 'warning' | 'error' | 'info'; icon?: string; title?: string; message: string; dismissible?: boolean; autoClose?: boolean; duration?: number }
interface SkillsFilterPreset { key: string; filters: SkillType[] }
interface StrapiResponse<T> { data: T; meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } } }
type RichBlock = RichBlockParagraph | RichBlockHeading | RichBlockList | RichBlockQuote | RichBlockCode
```

Add new shared interfaces to `global.d.ts` inside `declare global {}` — never inline in components.

---

## Server API (Nitro proxy)

Frontend **never calls Strapi directly** — always through `/api/sb-*`.

```
Client / SSR → /api/sb-* (Nitro) → Strapi CMS
```

### Existing endpoints

| Route | Pattern | Cache |
|---|---|---|
| `GET /api/_health` | `defineEventHandler` | None |
| `GET /api/sb-milestones` | `cachedEventHandler` | 6h SWR, locale-aware |
| `GET /api/sb-projects` | `cachedEventHandler` | 6h SWR, locale-aware |
| `GET /api/sb-skills` | `defineEventHandler` | None (dynamic filters) |
| `GET /api/sb-templates` | `cachedEventHandler` | 6h SWR, locale-aware |

### Rules
- `cachedEventHandler` for static/semi-static data (locale collections)
- `defineEventHandler` for dynamic filters/pagination — never cache these
- Always guard `baseUrl` — return 500 if missing
- Sanitise all query params before forwarding to Strapi
- Return graceful empty data `{ data: [] }` in `catch` blocks
- `timeout: 30000` for locale endpoints; `timeout: 15000` for filter endpoints
- Never call Strapi from Vue components — always through `/api/sb-*`
- Never expose Strapi URL in client-side code

### Adding a new endpoint
1. `server/api/sb-<resource>.get.ts`
2. Add composable `app/composables/use<Resource>.ts`
3. Consume in relevant page or `Custom*` component
4. Add `*Skeleton.vue` for loading state

---

## `nuxt.config.ts` key reference

- `modules`: `['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@vueuse/nuxt', '@nuxtjs/i18n']` — no `@nuxtjs/color-mode`
- `ssr: true` — never disable
- `css: ['./app/assets/css/main.css']` — single entry; add imports inside `main.css`
- `nitro.preset: 'netlify'` — deployment target
- `nitro.externals.external: ['isomorphic-dompurify']` — excluded from server bundle
- `vite.plugins: [tailwindcss()]` — no `tailwind.config.js`
- `sourcemap: { client: false, server: false }` — never enable in production
- `compatibilityDate: '2025-07-15'` — update only on intentional Nuxt upgrades

### runtimeConfig (all under `public`)
| Key | Env var |
|---|---|
| `emailjsPublicKey` | `NUXT_EMAILJS_PUBLIC_KEY` |
| `emailjsServiceId` | `NUXT_EMAILJS_SERVICE_ID` |
| `emailjsTemplateAdminId` | `NUXT_EMAILJS_TEMPLATE_ADMIN_ID` |
| `emailjsTemplateReplyToId` | `NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID` |
| `strapiUrl` | `NUXT_PUBLIC_STRAPI_URL` |

### routeRules rendering modes
| Mode | Config |
|---|---|
| Static (SSG) | `{ prerender: true }` |
| SSR | *(omit rule)* |
| ISR | `{ isr: 60 }` |
| SPA | `{ ssr: false }` |

### Icon config
- `mode: 'svg'`, `fallbackToApi: false`
- Installed: `@iconify-json/logos`, `@iconify-json/mdi`, `@iconify-json/solar`, `@iconify-json/flagpack`
- Adding a collection: `npm install @iconify-json/<collection>`
- **Do not install `@iconify-json/lucide`**

### Image config
- Default provider: `ipx` (local). For remote: pass `provider="cloudinary"` to `<NuxtImg>`
- External domains → add to `domains[]`
- Global defaults: `quality: 80`, formats: `['webp', 'avif', 'png']`

---

## Accessibility
- `aria-label` on all icon-only interactive elements
- `aria-describedby` for form hints/errors
- `aria-invalid` on inputs with errors

---

## Documentation sync rule

Every change that creates a discrepancy with `README.md` **must** be followed by a targeted documentation update in the same session. This applies to: new/removed/renamed components, pages, composables, utils, layouts; prompt files; instruction files; dependencies; `nuxt.config.ts` changes; structural changes.

Edit only the affected sections — do not rewrite the full README unless asked.
