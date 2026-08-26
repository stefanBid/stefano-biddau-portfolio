---
name: seo-check
description: Verify SEO/GSC readiness for this Nuxt 4 portfolio — robots.txt, sitemap.xml, global meta tags, and per-page useSeoMeta() calls. Use when asked to check SEO, Google Search Console readiness, meta tags, or sitemap correctness.
---

# SEO / GSC readiness check

Verify against `nuxt.config.ts` (`i18n.baseUrl` must be `https://stefanobiddau.com`, `routeRules`, `app.head.meta`):
- `/robots.txt` (served dynamically by `server/routes/robots.txt.ts`, not a static file): on the `production` Netlify context, `User-Agent: *`, `Allow: /`, `Sitemap:` directive pointing at the production domain; on any other context (`deploy-preview`, `branch-deploy`), `Disallow: /`.
- `public/sitemap.xml`: valid `urlset` + `xmlns:xhtml`, all `<loc>` on the production domain, `<lastmod>`/`<changefreq>`/`<priority>` present, `<xhtml:link>` alternates per locale, correct `x-default`, all prerendered routes represented.
- Global meta tags match the `app.head` config in `nuxt.config.ts`.
- Every page in `app/pages/**/*.vue`: has `useSeoMeta()`/`useHead()`, sets `title`, `description`/`ogDescription`, `ogTitle`, `ogImage` (own or inherited), all strings via `t()`/`$t()`, no placeholder values. Flag pages with no call at all (they only inherit globals).
