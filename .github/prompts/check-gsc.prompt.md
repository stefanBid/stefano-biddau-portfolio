---
agent: agent
description: 'Check GSC readiness: validate sitemap.xml, robots.txt, and all meta tags (global + per-page).'
---

# Workflow — GSC Readiness Check

> **Trigger phrase**: "check GSC", "verifica la SEO", "controlla sitemap e meta tag", "il progetto è pronto per GSC?" or any clearly equivalent phrase.

> **Required mode: Agent.**
> If you do not have access to file system tools (you are in Ask Mode / Chat Mode), reply **only** with:
> "Per eseguire il GSC check devo essere in modalità **Agent**. Ri-lancia la richiesta in Agent mode."
> Then stop. Do not attempt the workflow.

---

## Step 1 — Read project domain

Before starting, read `nuxt.config.ts` to extract:
- `i18n.baseUrl` — must be `https://www.stefanobiddau.com`
- `routeRules` — which routes are prerendered (static) or SSR
- `app.head.meta` — the global default meta tags

Also read `i18n.locales` to know the full locale list (codes + hreflang values).
Expected locales: `en` (default, no prefix) and `it` (prefix `/it`).

---

## Step 2 — Check `public/robots.txt`

Read `public/robots.txt` and verify:

| Check | Expected |
|---|---|
| Contains `User-Agent: *` | ✅ |
| Contains `Allow: /` | ✅ |
| Contains `Sitemap:` directive | ✅ |
| `Sitemap:` URL uses production domain (`https://www.stefanobiddau.com`) | ✅ |
| Production domain matches `i18n.baseUrl` (`https://www.stefanobiddau.com`) | ✅ |

Report any mismatch or missing directive as ❌.

---

## Step 3 — Check `public/sitemap.xml`

Read `public/sitemap.xml` and verify:

| Check | Expected |
|---|---|
| Valid XML with correct `urlset` namespace | ✅ |
| Includes `xmlns:xhtml` for hreflang | ✅ |
| All `<loc>` URLs use `https://www.stefanobiddau.com` (not `localhost` or other domain) | ✅ |
| Each URL has `<lastmod>`, `<changefreq>`, `<priority>` | ✅ |
| Each URL has `<xhtml:link>` alternate entries for all locales | ✅ |
| `x-default` hreflang points to the default locale URL | ✅ |
| Hreflang values match `i18n.locales[].iso` from `nuxt.config.ts` | ✅ |
| All prerendered routes (from `routeRules`) are represented | ✅ |

Report each issue as ❌ with the exact `<loc>` or attribute involved.

---

## Step 4 — Check global meta tags in `nuxt.config.ts`

Read `app.head.meta` from `nuxt.config.ts` and verify the following tags are present and non-placeholder:

| Tag | Required value |
|---|---|
| `viewport` | `width=device-width, initial-scale=1` |
| `og:type` | `website` |
| `og:site_name` | `Stefano Biddau` |
| `og:image` | `https://www.stefanobiddau.com/images/card-logo.jpg` |
| `twitter:card` | `summary` |
| `twitter:image` | `https://www.stefanobiddau.com/images/card-logo.jpg` |
| `theme-color` | `#0f0f20` |

Flag any value that differs from the expected one above as ❌.

---

## Step 5 — Scan all pages for `useHead` / `useSeoMeta`

Run a recursive search across `app/pages/**/*.vue` to find all pages.

For each page file:

1. Check if `useHead()` or `useSeoMeta()` is called in `<script setup>`.
2. If present, extract the fields set:
   - `title` / `titleTemplate`
   - `meta` array (or flat `useSeoMeta` fields: `ogTitle`, `ogDescription`, `description`, `ogImage`, `twitterCard`, etc.)
   - `link` (canonical)
3. Verify:

| Check | Expected |
|---|---|
| Page sets a `title` | ✅ |
| Page sets a `description` or `ogDescription` | ✅ |
| Page sets `ogTitle` | ✅ |
| Page sets `ogImage` or inherits global `https://www.stefanobiddau.com/images/card-logo.jpg` | ✅ |
| `ogUrl` set to `https://www.stefanobiddau.com${route.fullPath}` | ✅ |
| All string values use `t()` / `$t()` — no hardcoded strings | ✅ |
| No placeholder values (`TODO`, `…`) | ✅ |

If a page does **not** call `useHead` or `useSeoMeta` at all, flag it as ⚠️ — it inherits only the global defaults.

---

## Step 6 — Report to the user

Provide a full report in Italian structured as follows:

```
## Risultato GSC readiness check

### robots.txt
[✅ OK / ❌ issue list]

### sitemap.xml
[✅ OK / ❌ issue list]

### Meta tag globali (nuxt.config.ts)
[✅ OK / ⚠️ placeholder list]

### Meta tag per pagina
| Pagina | title | description | ogTitle | ogImage | Note |
|---|---|---|---|---|---|
| /pages/index.vue | ✅ | ✅ | ✅ | ✅ | — |
| /pages/... | ... | ... | ... | ... | ... |

### Riepilogo
- ❌ Blockers (devono essere corretti prima del go-live): …
- ⚠️ Warning (placeholder da sostituire): …
- ✅ Tutto ok: …
```
