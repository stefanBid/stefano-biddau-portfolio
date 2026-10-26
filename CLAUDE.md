# CLAUDE.md — stefano-biddau-portfolio

Nuxt 4 personal portfolio for Stefano Biddau. Production SSG/SSR app on Netlify. Always dark-themed — no light mode, no toggle.

---

## Stack

- **Nuxt 4** (Vue 3, `<script setup>`, SSR + prerender)
- **Tailwind CSS v4** via `@tailwindcss/vite` — no config file, tokens in CSS `@theme`
- **@nuxt/icon** — SVG mode; collections: `logos`, `mdi`, `solar`, `flagpack`
- **@nuxt/image** — `ipx` in dev, Netlify Image CDN in production; Cloudinary images are remote sources pulled through them (`image.domains`, `netlify.toml` `remote_images`), never linked directly
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
| CSS utility | `sb-*` | `sb-h3`, `sb-transition` |
| CSS variable | `--sb-*` (raw) → Tailwind role | `--sb-primary` → `bg-primary` |

- `Base*` — fully reusable, zero business logic, no API calls
- **Actions use `BaseButton`** (variants `primary`, `secondary`, `outline`, `ghost`; `iconOnly`, `isActive`, `tone`). **Only `size` changes dimensions** — same box for every variant/type: `sm` 36px (hit 44) for supporting/compact actions (on images, toolbars, pagination, chips, header controls, close, secondary form actions); `md` 44px default for actions in content and dialogs (card CTAs, submit, back, read more); `lg` 52px for the page's single main CTA in the first viewport. Native `<button type="button">` only inside controls with their own semantics or drawing: tabs, menu/listbox options, hamburger. Never resize a `BaseButton` with classes
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
- Types a composable exposes are declared and exported in that composable file; consumers use `import type { X } from '~/composables/...'`. `app/types/global.d.ts` only holds cross-cutting types (`MenuItem`, `RouteItem`, `RichBlock*`) and types shared with `server/` (`GithubRepo`, `GithubStats`) — never inline shared interfaces in components

### Styling
- Default: inline Tailwind utility classes directly in templates
- No custom CSS classes unless explicitly requested
- No `<style>` blocks unless explicitly requested
- Never hardcode raw hex values — use design tokens
- Closed theme: only theme tokens generate utilities — no default palette (`text-white`, `bg-gray-*`), text sizes (`text-sm`), `font-semibold`/`font-medium`, `2xl:`, arbitrary values (`text-[15px]`, `shadow-[…]`)
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

Four files in `app/assets/css/`, prefix `sb`, structure maintained by the sb-design plugin (`/sb-design:check`, `/sb-design:align`): `main.css` (entry, page base styles), `theme.css`, `typography.css`, `animation.css`. Values and full tables: README §4.

### Colours (`theme.css`)
Raw `--sb-*` variables (the only place for literal colours) mapped to Tailwind roles in `@theme inline`: `bg`, `surface`, `surface-2`, `border`, `border-strong` (inputs, ≥ 3:1), `ink`, `ink-muted`, `primary`, `primary-hover`, `primary-border`, `on-primary`, `primary-ink` / `primary-ink-hover` (orange as text), `success|warning|error|info` + `-soft`, `focus-ring`. Use `bg-bg`, `text-ink`, `text-ink-muted`, `bg-primary text-on-primary`, `bg-error-soft text-error`. Opacity modifiers allowed: `bg-bg/80`. Orange text is always `text-primary-ink`, never `text-primary` (fails AA on `surface-2`). `--sb-gold-100…900` are raw-only illustration colours for the gold skill cards.

### Shapes and shadows (`theme.css`)
`rounded-sm|md|lg|xl` (4/8/12/16px), `rounded-full`; `shadow-sm|md|lg`; `drop-shadow-md` (text over images). Breakpoints `sm` `md` `lg` `xl` only.

### Typography (`sb-*`, `typography.css`)
One class per role, carrying family, size, line height, weight, tracking (never colour): `sb-hero` (fluid, `ThePageHero` only), `sb-display`, `sb-h1`–`sb-h4` (Bebas Neue); `sb-lead`, `sb-body`, `sb-body-strong`, `sb-label`, `sb-small`, `sb-overline` (Space Mono). Only `sb-display`/`sb-h1`/`sb-h2` step down below `lg`. `h1`–`h6`, `p`, `label` (→ `sb-label`), `small`, `code` get their role for free — add a class only when the look must differ from the tag (`<h2 class="sb-h3">`). Buttons: `sb-body-strong uppercase`; nav: `sb-label uppercase`; captions: `sb-small italic`. Running text (`p`, `li`, `blockquote`) is justified site-wide with `hyphens: auto` (base layer in `typography.css`); centered copy opts out with `text-center`. Families: `font-display`, `font-body`; weights: `font-normal`, `font-bold`. In a component `<style>`: `@reference "~/assets/css/main.css";` then `@apply sb-<role>;`.

### Motion and focus (`animation.css`)
Always add `sb-transition` to interactive elements (colour, background, border, shadow, opacity, transform — not width/height); `sb-transition-slow` for panels. Focus: `sb-focus`, `sb-focus-within`, `sb-no-focus`. Durations `--sb-duration-feedback|state|layout|entrance`; easings `ease-out|in|in-out`; animations `animate-fade-in|fade-out|rise-in|slide-in-right|spin`. Vue `<Transition>` names: `fade`, `slide-down`, `scale-fade`, `page`. Reduced motion zeroes `--sb-motion-distance`.

### Icons
- Always `<Icon>` from `@nuxt/icon`, collection prefix mandatory
- Collections: `solar` (bold duotone UI), `mdi` (general UI), `logos` (brand/tech), `flagpack` (flags)
- Size via Tailwind: `size-4` to `size-7`
- Colour via token: `text-ink`, `text-ink-muted`, `text-primary-ink`
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

Creating a new page: file in `app/pages/`, `useSeoMeta()` with `t()` values, i18n keys in both locales, `prerender: true` route rules for `/route` and `/it/route` in `nuxt.config.ts`, row in this table.

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
No backend — reads `pages.about.milestones` from the active i18n locale via `tm()`/`rt()`, content authored as Markdown and converted with `markdownToRichBlocks`. Purely reactive: no fetch, no loading/error state, updates automatically on language change. Each entry carries `period` (labels + duration) and `typeLabel`, shared by `CustomExperienceList` and `CustomMilestone`. `type: 'upcoming'` (future start) is the About "coming soon" step, never shown on home; a future `endDate` is displayed but durations stop at today.

### `useProjects()`
```ts
const { projects } = useProjects()
```
Same pattern as `useMilestones` — reads `pages.projects.personalProjects.list`. `coverImageSrc` optional (archived projects have none); `coverImageFit: 'contain'` for transparent logos (shown on `bg-ink`). `skills` (ids) only link skills to projects on the Skills page; `meta` stays the authored line.

### `useSkillReferences()`
```ts
const { references, referencesByArea } = useSkillReferences()
```
Where each skill is used: work milestones (one entry per organization, links to its About milestone), projects (Projects anchor) and SB Templates (one entry). `referencesByArea` feeds the Skills page "Seen in" line. Exports `SkillReference`.

### `useSkills()`
```ts
const { areas, featuredStack } = useSkills()
```
Skills are a hardcoded local list (`SKILLS_DATA`, in the composable file, not i18n) — no backend. Each skill has a slug `id` (`vue`, `tailwind-css`…), `area` (`frontend`/`backend`/`tools`) and `tier` (`core` = every day, gold; `solid` = used across many projects; `familiar` = studied or used rarely). `areas`: Skills page groups, non-empty tiers in order. `resolveSkills(ids)` (named export) maps ids to skills, dropping unknown ids. **Skill links:** projects and SB Templates in the locale files carry `skills: [ids]`; milestones carry `skills: [ids]` plus `stack` (free keywords shown as chips, e.g. Java EE, REST API). `featuredStack`: home "Core stack", `FEATURED_STACK` ids grouped `frontend`/`backend`/`database`, independent from tiers.

### `useGithubStats()`
```ts
const { stats } = await useGithubStats()
```
The one async content source — `useFetch('/api/github-stats.json')`, prerendered once per build (see Server API). `stats` is `GithubStats | null`; `null` when GitHub was unreachable, hide the UI then.

### `useSelectedWork()`
```ts
const { selectedWork } = useSelectedWork()
```
Romano + SB Templates + sb-floating-panel-vue with meta line and Projects anchor link — home "Selected work".

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

### `useCloudinary()`
```ts
const { cloudinaryUrl, resolveImageSrc } = useCloudinary()
cloudinaryUrl('v1793011184/sbt-logo_wgjk4u.svg')
```
Full delivery URL from `runtimeConfig.public.cloudinaryCloudName`. `resolveImageSrc` is for locale values: `/…` stays in `public/`, anything else is a Cloudinary path. Pass it to `<NuxtImg>` with the default provider, never `provider="none"` — Netlify caches it on the edge, so Cloudinary is hit only on a cache miss. Keep the version segment in the path.

### `useLockScroll()`
```ts
const { lock, unlock, isLocked } = useLockScroll()
```
SSR-safe, multiple concurrent owners safe.

### `useFocusTrap(container)`
```ts
const { activate, deactivate } = useFocusTrap(panelRef)
```
Traps Tab inside `panelRef` while active, restores focus on deactivate. Use for every modal surface (dialog, drawer). Client-side only.

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
- Export the types the composable exposes from the same file
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

## TypeScript types

Types exposed by a composable live in, and are exported from, that composable (e.g. `Skill` from `useSkills`, `Milestone` from `useMilestones`, `NotificationItem` from `useNotification`). `app/types/global.d.ts` (`declare global {}`) keeps only cross-cutting types (`MenuItem`, `RouteItem`, `RichBlock*`) and the GitHub types shared with `server/`.

---

## Server API (Nitro)

No backend/CMS — `useMilestones`/`useProjects`/`useTemplates`/`useSkills` read from i18n translation files or local data, not from a server. The only `server/` code is small Nitro routes for things that must vary per Netlify deploy context or can't be a static file:

- `server/api/github-stats.json.ts` — GitHub profile stats, prerendered to a static JSON (`routeRules['/api/github-stats.json'] = { prerender: true }`); contributions need `NUXT_GITHUB_TOKEN`. Token is `runtimeConfig.githubToken: ''`, filled from env at runtime — never assign `process.env` to it in `nuxt.config.ts` (it gets inlined into the function bundle). The fetch is cached 10 min in dev only (`shouldBypassCache: () => !import.meta.dev`), so dev navigations don't wait on GitHub
- `server/routes/robots.txt.ts` — `Disallow: /` on `deploy-preview`/`branch-deploy`, `Allow: /` + sitemap link on `production`. Netlify's `CONTEXT` exists only at build time, so `nuxt.config.ts` resolves it into `runtimeConfig.public.isProduction` and the route reads that via `useRuntimeConfig(event)` — never `process.env.CONTEXT` in the route. Never prerender this route (`routeRules['/robots.txt'] = { prerender: false }` in `nuxt.config.ts`) — each deploy must serve its own rules.

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

Handled by the sb-context-fe plugins (project state in `.sb-context/`): `/sb-health:deps`, `/sb-health:lint`, `/sb-health:build`, `/sb-health:seo`, `/sb-health:checkup` (full pass), `/sb-health:docs` (README sync); `/sb-design:check` (style still aligned?), `/sb-design:migrate` (templates using classes the theme no longer generates). Report results in the same language the user asked in.

---

## Documentation sync rule

Every change that creates a discrepancy with `README.md` **must** be followed by a targeted documentation update in the same session. This applies to: new/removed/renamed components, pages, composables, utils, layouts; prompt files; instruction files; dependencies; `nuxt.config.ts` changes; structural changes.

Edit only the affected sections — do not rewrite the full README unless asked.
