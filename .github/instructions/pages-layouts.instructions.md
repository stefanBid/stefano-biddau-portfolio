---
applyTo: "**/pages/**,**/layouts/**"
---

# Pages & Layouts — stefano-biddau-portfolio

## Existing pages

All pages are pre-rendered (SSG). Never remove a `prerender: true` entry from `nuxt.config.ts` without reason.

| File | Route (EN) | Route (IT) | Content |
|---|---|---|---|
| `index.vue` | `/` | `/it` | Homepage: hero (`ThePageHero` + `CustomSolarSystem`), skills preview, contact form |
| `about-me.vue` | `/about-me` | `/it/about-me` | Timeline of milestones via `useMilestones` |
| `my-skills.vue` | `/my-skills` | `/it/my-skills` | Filterable skills grid via `useSkills` with `BaseTabs` |
| `my-projects.vue` | `/my-projects` | `/it/my-projects` | Projects grid via `useProjects` |
| `privacy-policy.vue` | `/privacy-policy` | `/it/privacy-policy` | Legal |
| `terms-and-conditions.vue` | `/terms-and-conditions` | `/it/terms-and-conditions` | Legal |

## Creating a new page — step by step

1. Create the `.vue` file inside `app/pages/` following the **file-name → URL** rules below.
2. Add `useHead()` with translated meta tags.
3. Add translation keys to both `i18n/locales/en.json` and `i18n/locales/it.json`.
4. Add a `prerender: true` entry in `nuxt.config.ts` for **both** EN and IT routes.

---

## Nuxt 4 file-based routing — naming rules

All pages live in `app/pages/`. The file path maps directly to the URL.

| File path | URL | Notes |
|---|---|---|
| `app/pages/index.vue` | `/` | Homepage |
| `app/pages/about.vue` | `/about` | Static page |
| `app/pages/blog/index.vue` | `/blog` | Section index |
| `app/pages/blog/[slug].vue` | `/blog/:slug` | Dynamic segment |
| `app/pages/blog/[[slug]].vue` | `/blog` and `/blog/:slug` | Optional dynamic segment |
| `app/pages/[...slug].vue` | `/anything/deep/path` | Catch-all |
| `app/pages/(group)/page.vue` | `/page` | Route group (folder ignored in URL) |

### Nested routes
A folder + `index.vue` creates a parent route. A folder + named file creates a child:

```
app/pages/
  account/
    index.vue      → /account
    settings.vue   → /account/settings
    [id].vue       → /account/:id
```

### Named routes
Nuxt 4 generates route names from the file path. Use them in `localePath()`:

| File | Route name |
|---|---|
| `index.vue` | `index` |
| `about.vue` | `about` |
| `blog/index.vue` | `blog` |
| `blog/[slug].vue` | `blog-slug` |

---

## Minimal page template

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

// Data

// Events
</script>

<template>
  <!-- page content -->
</template>
```

For pages with a hero animation, include `ThePageHero` at the top:

```vue
<template>
  <ThePageHero
    id="page-name"
    :text="t('pageName.hero.title')"
    lock-scroll
    @hero-animations-ended="onHeroEnd"
  />
  <!-- rest of page -->
</template>
```

## SEO / Head

Use `useSeoMeta()` on every page (preferred over `useHead()` for cleaner API). All string values must come from `useI18n()` — no hardcoded text.

```ts
useSeoMeta({
  title: t('home.meta.title'),
  description: t('home.meta.description'),
  ogTitle: t('home.meta.title'),
  ogDescription: t('home.meta.description'),
})
```

For multi-locale head (`lang`, canonical, alternate links) use `useLocaleHead()` — already handled in `app/layouts/default.vue`:

```ts
const i18nHead = useLocaleHead({ dir: true, seo: true })
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  meta: i18nHead.value.meta,
  link: i18nHead.value.link,
  titleTemplate: '%s — Stefano Biddau',
}))
```

---

## i18n

All user-facing strings go through `useI18n()`. Never hardcode UI text.

```ts
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()

// Translate
t('nav.home')

// Locale-aware route
localePath('index')       // → '/' (en) or '/it' (it)
localePath('about')       // → '/about' or '/it/about'
```

Language strategy: `prefix_except_default` — default locale (`en`) has no prefix, `it` uses `/it/...`.

Translation keys live in:
- `i18n/locales/en.json` — source of truth
- `i18n/locales/it.json` — Italian translations

Always add keys to both files simultaneously.

---

## Data fetching

Prefer `useFetch` / `useAsyncData` over `$fetch` inside pages to leverage SSR hydration.

```ts
// Simple GET
const { data, status, error } = await useFetch<MyType>('/api/endpoint')

// With key and transform
const { data } = await useAsyncData('unique-key', () =>
  $fetch<MyType>('/api/endpoint', { query: { id: route.params.id } }),
)
```

- `useFetch` for straightforward calls
- `useAsyncData` when you need a stable key or custom logic
- `$fetch` only inside server routes or event handlers

---

## Routing

Use `useRoute()` and `useRouter()` for navigation. Use `localePath()` for locale-aware links.

```ts
const route = useRoute()
const router = useRouter()

// Navigate programmatically
router.push(localePath('about'))
```

In templates, use `<NuxtLink>` with `:to="localePath('route-name')"`:

```vue
<NuxtLink :to="localePath('index')">Home</NuxtLink>
```

Route rules are defined in `nuxt.config.ts` under `routeRules`.

---

## Layout

The default layout (`app/layouts/default.vue`) provides:
- `TheHeader` (sticky, `h-16`)
- `<main>` with `pt-16 px-6 md:px-10` and centred `max-w-350` container
- `TheFooter`
- Notification system (`TheNotificationBox` + `TheNotificationBanner`)

Pages automatically use the default layout. To override on a specific page:

```vue
<script setup>
definePageMeta({ layout: 'custom-layout-name' })
</script>
```

To create a new layout, add `app/layouts/my-layout.vue` and expose a `<slot>`.

---

## Static vs dynamic rendering

Rendering mode is set per-route in `nuxt.config.ts`:

```ts
routeRules: {
  '/': { prerender: true },      // static at build time
  '/it': { prerender: true },
}
```

Dynamic routes that depend on runtime data should not use `prerender: true`.
