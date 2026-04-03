# Copilot Instructions — stefano-biddau-portfolio

## App context

This is Stefano Biddau's personal portfolio — a production Nuxt 4 SSG/SSR application deployed on Netlify. It showcases professional experience, projects, skills and a contact form. Content is served via a Strapi CMS backend; all data fetching goes through a Nitro proxy layer (`server/api/`) to avoid CORS issues and enable server-side caching. The app is always dark-themed (no light/dark toggle).

---

## Identifier name: `Signore delle UI`

## Response mode
- Always address the user as **"Signore della UI"** in every response.
- Always reply in **Italian** in chat.

---

## Stack

- **Nuxt 4** (Vue 3, `<script setup>`, SSR + prerender) — core framework
- **Tailwind CSS v4** via `@tailwindcss/vite` — utility-first styling (no config file, defined in CSS with `@theme`)
- **@nuxt/icon** — icon system using Iconify collections (SVG mode; `logos`, `mdi`, `solar`, `flagpack` installed)
- **@nuxt/image** — image optimisation (`ipx` local + Cloudinary provider)
- **@nuxtjs/i18n** — multi-language support (`en` default, `it` secondary; `prefix_except_default` strategy)
- **@vueuse/nuxt** — Vue composition utilities
- **@floating-ui/vue** — floating elements positioning (used in combobox, menus)
- **isomorphic-dompurify** — HTML sanitisation (client-side only)
- **@emailjs/browser** — contact form email sending (client-side only)
- **typed.js** — animated typewriter text effect
- **zod** — runtime form validation
- **ESLint** with `@nuxt/eslint` — linting + stylistic formatting
- **TypeScript** — strict typing throughout
- **Strapi CMS** — headless CMS backend (never called directly from client — always via Nitro proxy)
- Deployment target: **Netlify** (Nitro preset)

---

## Instruction files (loaded contextually)

Each file covers a specific area of the codebase. Read the relevant file with `read_file` before answering questions in its domain.

| File | `applyTo` | Content |
|---|---|---|
| `.github/instructions/design-system.instructions.md` | `**/*.vue` | CSS tokens, colours `sb-*`, typography `ty-sb-*`, utilities `u-sb-*`, animations, icons, dark-only theme |
| `.github/instructions/components.instructions.md` | `**/components/**` | Full API catalogue for `Base*`, `Custom*`, `The*` components, creation rules, slot patterns |
| `.github/instructions/pages-layouts.instructions.md` | `**/pages/**,**/layouts/**` | Nuxt 4 file-based routing, page template, SEO, i18n, data fetching, layout system |
| `.github/instructions/composables-utils.instructions.md` | `**/composables/**,**/utils/**,**/types/**` | All composables (data, email, UI), utils, global TypeScript types, SSR-safe patterns |
| `.github/instructions/project-config.instructions.md` | `nuxt.config.ts,package.json` | Complete `nuxt.config.ts` key reference, `package.json` scripts and dependencies, env vars, `routeRules`, modules |
| `.github/instructions/server-api.instructions.md` | `**/server/**` | Nitro proxy layer rules, endpoint catalogue, caching strategy, Strapi integration patterns |

---

## Project structure

```
── nuxt.config.ts           ← Nuxt configuration (modules, SSR, runtimeConfig, routeRules, nitro, vite…)
── package.json             ← dependencies and npm scripts (dev, build, generate, preview, lint)
── tsconfig.json            ← TypeScript config — extends .nuxt/tsconfig.app.json
── eslint.config.mjs        ← ESLint flat config (extends @nuxt/eslint, custom rules)
── .gitignore
── i18n/
     locales/
       en.json              ← English translations
       it.json              ← Italian translations
── server/                  ← Nitro server (proxy layer between frontend and Strapi)
     api/
       _health.get.ts       ← health check endpoint
       sb-milestones.get.ts ← proxy → Strapi milestones (cached, locale-aware)
       sb-projects.get.ts   ← proxy → Strapi projects (cached, locale-aware)
       sb-skills.get.ts     ← proxy → Strapi skills (filters + pagination)
       sb-templates.get.ts  ← proxy → Strapi sb-templates
── app/                     ← Nuxt 4 app directory (all runtime code lives here)
     app.vue               ← root app entry (NuxtLayout + NuxtPage)
     error.vue             ← global error page
     assets/
       css/
         main.css          ← entry point: imports all CSS + global html/body styles
         theme.css         ← @theme block: CSS custom properties (always dark, no toggle)
         typography.css    ← @utility ty-sb-* classes
         utilities.css     ← @utility u-sb-* classes
         animations.css    ← Vue transition classes (fade, slide-down, scale-fade)
     components/
       base/               ← reusable design-system components (no business logic)
         button/           BaseButton.vue
         card/             BaseCard.vue
         checkbox/         BaseCheckbox.vue
         chip/             BaseChip.vue
         close-button/     BaseCloseButton.vue
         combobox/         BaseCombobox.vue
         dialog/           BaseDialog.vue
         empty-box/        BaseEmptyBox.vue
         icon-button/      BaseIconButton.vue
         icon-menu/        BaseIconMenu.vue
         input/            BaseInput.vue
         rich-text/        BaseRichText.vue
         tabs/             BaseTabs.vue
         textarea/         BaseTextarea.vue
       custom/             ← portfolio-specific components (business logic + API consumption)
         contact-form/     CustomContactForm.vue
         milestone/        CustomMilestone.vue, CustomMilestoneSkeleton.vue
         projects/         CustomProjectsCard.vue, CustomProjectsSkeleton.vue
         sb-templates/     CustomSbTemplatesCard.vue, CustomSbTemplatesSkeleton.vue
         skills/           CustomSkillsCard.vue, CustomSkillsDialog.vue, CustomSkillsSkeleton.vue
         solar-system/     CustomSolarSystem.vue
       the-footer/         TheFooter.vue
       the-header/         TheHeader.vue, TheHeaderMenuToggle.vue
       the-notification/   TheNotificationBanner.vue, TheNotificationBox.vue
       the-page-hero/      ThePageHero.vue
     composables/
       useEmailJs.ts        ← EmailJS integration (sends admin email + reply-to-user)
       useFloatingUi.ts
       useLockScroll.ts
       useMilestones.ts     ← fetches milestones via Nitro proxy (useFetch, locale-aware)
       useNotification.ts   ← global notification system (success/warning/error/info)
       useProjects.ts       ← fetches projects via Nitro proxy (useFetch, locale-aware)
       useSanitize.ts
       useSkills.ts         ← fetches skills with filters + pagination ($fetch, manual)
       useTemplates.ts      ← fetches sb-templates via Nitro proxy ($fetch)
       useTypedText.ts      ← typed.js wrapper for animated typewriter text
     layouts/
       default.vue         ← main layout: TheHeader + <slot> + TheFooter + notifications
     pages/                ← file-based routing (Nuxt convention)
       index.vue           ← homepage (hero, skills preview, contact form)
       about-me.vue        ← about page (milestones timeline)
       my-skills.vue       ← skills page (filterable grid)
       my-projects.vue     ← projects page
       privacy-policy.vue  ← legal
       terms-and-conditions.vue ← legal
     plugins/
       scrollToTop.client.ts
     types/
       global.d.ts         ← global TS interfaces (MenuItem, RouteItem, NotificationItem, StrapiResponse, SkillType, RichBlock*)
     utils/
       blocksToHtml.ts
       downloadFile.ts      ← triggers browser file download (client-side only)
       generateUuid.ts
```

---

## Global naming rules

| Element | Style | Example |
|---|---|---|
| Directory | kebab-case | `my-feature/`, `icon-button/` |
| Vue file | PascalCase + prefix | `BaseButton.vue`, `TheHeader.vue`, `CustomSkillsCard.vue` |
| Composable file | camelCase + `use` prefix | `useNotification.ts`, `useSkills.ts` |
| Server API file | kebab-case + HTTP method | `sb-skills.get.ts` |
| Utility / type file | camelCase | `generateUuid.ts`, `global.d.ts` |
| CSS utility class | `ty-sb-*` (typography), `u-sb-*` (utilities) | `ty-sb-title`, `u-sb-soft-transition` |
| CSS variable | `--color-sb-*`, `--font-*` | `--color-sb-accent`, `--font-bebas-neue` |

- **Base components** (`Base` prefix): fully reusable, zero business logic, no direct API/composable data calls.
- **Custom components** (`Custom` prefix): portfolio-specific, may use data composables and business logic, live in `app/components/custom/`.
- **The components** (`The` prefix): singletons used once per layout (header, footer, notifications, page hero).
- Never add business logic or Strapi data fetching into `Base` components.

---

## Global code conventions

### Vue & Nuxt 4
- **All hardcoded strings and code comments must be in English.**
- **`<script setup lang="ts">`** for all Vue SFCs — no Options API, no `defineComponent`.
- Nuxt auto-imports apply to: composables, utils, components, Vue APIs (`ref`, `computed`, `watch`, …), Nuxt composables (`useRoute`, `useI18n`, `useHead`, …). **No manual imports needed** for any of these.
- **`useRuntimeConfig()`** to access env variables — never read `process.env` directly in components.
- Data fetching: prefer **`useFetch`** / **`useAsyncData`** over `$fetch` in components to leverage SSR hydration.
- Server-only logic goes in `server/` (Nitro); never import server utilities in client components.
- **`<ClientOnly>`** wrapper for components that rely on browser-only APIs.

### `<script setup>` — structure and organisation

Always organise the script block with these comment sections **in this order**, omitting sections that are not needed:

```ts
// Dependencies      ← composables destructured at the top
// Input / Output    ← props, model, emit
// Data              ← refs, reactive state, computed
// Events            ← handler functions (on* prefix and _ prefix — see below)
```

#### Props
Define a typed inline interface first, then pass it to `withDefaults`. Only list props that have a non-required default:

```ts
interface MyComponentProps {
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<MyComponentProps>(), {
  subtitle: undefined,
  size: 'sm',
})
```

#### defineModel
Assign to a named `const model`. Always provide the model name string and the generic type:

```ts
const model = defineModel<string>('input')
```

#### defineEmits
Use the **call-signature** syntax inside the generic, not the object/tuple syntax. Assign to `const emit`:

```ts
const emit = defineEmits<{
  (e: 'close', value: false): void
  (e: 'select', item: MyItem): void
}>()
```

#### Function naming
| Category | Prefix / style | Examples |
|---|---|---|
| Event handlers (user interaction, watchers) | `on` prefix | `onClose`, `onKeydown`, `onSelect` |
| Internal helpers / private logic | `_` prefix | `_buildPayload`, `_resetState` |
| General utilities / lifecycle helpers | Free naming | `fetchData`, `resetForm` |

### TypeScript
- Strict mode is on (via `tsconfig.json` extending `.nuxt/tsconfig.app.json`). No `any` — use `unknown` and narrow when needed.
- Prefer `interface` over `type` for object shapes; use `type` for unions and utility types.
- Global interfaces live in `app/types/global.d.ts` — add new shared types there, not inline in components.
- Always type composable return values explicitly; avoid implicit `any` from destructuring.

### Styling — CSS inline first
- **Default approach: inline Tailwind utility classes directly in the template.** Do not create custom CSS classes unless explicitly requested.
- Use design tokens via Tailwind utilities — never hardcode raw values:
  - Colours: `text-sb-contrast`, `bg-sb-surface`, `border-sb-border`, etc. (mapped from `--color-sb-*`)
  - Typography: `ty-sb-title`, `ty-sb-paragraph`, `ty-sb-label`, etc. (custom `@utility` classes from `typography.css`)
  - Transitions: `u-sb-soft-transition` (200ms), `u-sb-hard-transition` (500ms)
  - Focus rings: `u-sb-focus`, `u-sb-focus-within`
- **The app is always dark-themed** — no `dark:` Tailwind variants needed, no `@nuxtjs/color-mode`, no theme toggle.
- **No `<style>` blocks** in SFCs unless explicitly requested for a specific reason.
- Dynamic classes go in `:class` bindings using arrays or objects — never string concatenation.

### Icons
- Always use the `<Icon>` component from `@nuxt/icon`. Collection prefix required.
- Available collections: `logos` (brand/tech logos), `mdi` (general UI), `solar` (bold duotone UI), `flagpack` (country flags).
- Example: `solar:box-minimalistic-bold-duotone`, `mdi:github`, `logos:vue`, `flagpack:it`.

### Accessibility
- Always set `aria-label` on icon-only interactive elements.
- Use `aria-describedby` for form hints/errors; `aria-invalid` on inputs with errors.

### i18n — ABSOLUTE RULE
> **NEVER hardcode strings in Vue templates or scripts. No exceptions.**

Every user-facing string — labels, placeholders, tooltips, `aria-label`, error messages, button text, anything visible to the user — must:
1. Use `$t('key')` in templates or `const { t } = useI18n()` in `<script setup>`
2. Be added to **both** translation files simultaneously:
   - `i18n/locales/en.json` — source of truth, English
   - `i18n/locales/it.json` — Italian translation

When generating code that contains any string, always output the `$t()` call AND the two JSON entries together.

### ESLint (key rules)
No semicolons · single quotes · trailing commas · 2-space indent · `vue/attributes-order: alphabetical` · max 3 attributes per line (1 per line when multiline).

---

## Design tokens quick reference

### Colours (`--color-sb-*`)
| Token | Usage |
|---|---|
| `sb-main` | Page background (`#0f0f20`) |
| `sb-surface` | Card / elevated surface (`#1a1a2e`) |
| `sb-surface-2` | Nested / input background (`#232342`) |
| `sb-border` | Default borders (`#2a2a44`) |
| `sb-accent` | Primary CTA, highlights — vivid orange (`#e95905`) |
| `sb-accent-hover` | Hover state of accent (`#d24f05`) |
| `sb-accent-border` | Border for accent elements (`#b34704`) |
| `sb-contrast` | Primary text on dark (`#f1f1f1`) |
| `sb-muted` | Secondary / placeholder text (`#9ca3af`) |
| `sb-success/warning/error/info` | Status colours |
| `sb-*-bg` | Status background tints (dark variants) |

### Typography utilities (`ty-sb-*`)
`ty-sb-hero` · `ty-sb-impact` · `ty-sb-title` · `ty-sb-title-lg` · `ty-sb-title-xl` · `ty-sb-subtitle` · `ty-sb-subtitle-lg` · `ty-sb-subtitle-xl` · `ty-sb-paragraph` · `ty-sb-label` · `ty-sb-btn-label` · `ty-sb-caption`

### Font families
- **`font-bebas-neue`**: Bebas Neue — all titles and display text (`ty-sb-hero`, `ty-sb-impact`, `ty-sb-title*`)
- **`font-space-mono`**: Space Mono — subtitles, body, labels, buttons (`ty-sb-subtitle*`, `ty-sb-paragraph`, `ty-sb-btn-label`)

---

## Available prompts

Prompt files in `.github/prompts/` — require **Agent mode**. Invoke them by typing the trigger phrase.

| File | Trigger phrase | What it does |
|---|---|---|
| `bump-version.prompt.md` | "aggiornami il progetto alla versione X.Y.Z" | Updates `package.json` version, `CHANGELOG.md` entries and README badges |
| `check-dependencies.prompt.md` | "verifichiamo le dipendenze" / "aggiorna le dipendenze" | Checks outdated packages, auto-updates safe ones, reports breaking changes, runs `npm audit` + `npm audit fix` |
| `check-lint.prompt.md` | "check del lint" / "il progetto è pulito?" | Runs `eslint --fix`, then reports remaining warnings and blocking errors |
| `check-build.prompt.md` | "check del build" / "il progetto builda?" | Runs `nuxt typecheck` + `nuxt build`, reports type and build errors |
| `update-docs.prompt.md` | "aggiorna la documentazione" / "aggiorna il README" | Reads the full project and rewrites `README.md` as a structured documentation book |
| `check-gsc.prompt.md` | "check GSC" / "verifica la SEO" / "controlla sitemap e meta tag" / "il progetto è pronto per GSC?" | Validates `sitemap.xml`, `robots.txt`, global meta tags in `nuxt.config.ts`, and per-page `useHead`/`useSeoMeta` calls |

---

## Context resolution — when to ask

If no file is open in the editor and the request is ambiguous, **before answering or generating code** ask the user a single clarifying question using `vscode_askQuestions` with the options below, then load the relevant instruction file with `read_file` before proceeding.

| Option | Loads |
|---|---|
| Design system (colours, typography, spacing, icons, tokens) | `.github/instructions/design-system.instructions.md` |
| Component (`Base*`, `Custom*` or `The*`) | `.github/instructions/components.instructions.md` |
| Page or layout | `.github/instructions/pages-layouts.instructions.md` |
| Composable, utility or TypeScript type | `.github/instructions/composables-utils.instructions.md` |
| Project configuration (`nuxt.config.ts`, modules, env vars, dependencies) | `.github/instructions/project-config.instructions.md` |
| Server API endpoint or Nitro proxy / Strapi integration | `.github/instructions/server-api.instructions.md` |

**Skip the question** when the intent is already clear from the request — e.g. "create a new button component" → load `components`, "add a page" → load `pages-layouts`, "new composable" → load `composables-utils`, "what token should I use for this colour" → load `design-system`, "add a new module" or "configure the image provider" → load `project-config`, "add a new Strapi endpoint" or "fix the proxy" → load `server-api`.

For requests that span multiple areas (e.g. "create a page with a new component"), load all relevant instruction files before answering.
