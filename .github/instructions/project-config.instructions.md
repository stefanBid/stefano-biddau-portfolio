---
applyTo: "nuxt.config.ts,package.json,.nvmrc,tsconfig.json,eslint.config.mjs"
---

# Project Configuration — stefano-biddau-portfolio

## `nuxt.config.ts` — complete reference

The single source of truth for the entire Nuxt application setup. Every key has a specific purpose — never duplicate configuration across files.

---

### `modules`
```ts
modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@vueuse/nuxt', '@nuxtjs/i18n']
```
Add new Nuxt modules here. **There is no `@nuxtjs/color-mode`** — the app is always dark-themed. Do not add it.

---

### `ssr`
```ts
ssr: true
```
SSR is always enabled. Never disable it — this template is designed for server-side rendering.

---

### `devtools`
```ts
devtools: { enabled: process.env.NODE_ENV !== 'production' }
```
Dev tools are active only in development. Do not change this.

---

### `app.head`
Global HTML head applied to **all pages**. Page-level `useSeoMeta()` calls merge with and override these values.

Current global head entries:
| Meta | Value | Purpose |
|---|---|---|
| `viewport` | `width=device-width, initial-scale=1` | Mobile responsiveness |
| `format-detection` | `telephone=no` | Disable iOS phone number detection |
| `theme-color` | `#0f0f20` | Mobile browser bar colour (matches `--color-sb-main`) |
| `og:type` | `website` | Open Graph type |
| `og:site_name` | `Stefano Biddau` | Site name |
| `og:image` | `https://www.stefanobiddau.com/images/card-logo.jpg` | OG image (1200×630px) |
| `twitter:card` | `summary` | Twitter card type |
| `twitter:image` | `https://www.stefanobiddau.com/images/card-logo.jpg` | Twitter image |
| `link[favicon]` | `/favicon.ico` | Browser tab icon |

---

### `css`
```ts
css: ['./app/assets/css/main.css']
```
Single entry point for all styles. `main.css` imports the full CSS cascade in order:
1. Google Fonts
2. Tailwind CSS
3. `theme.css` (design tokens — always-dark, no toggle)
4. `typography.css` (ty-sb-* utilities)
5. `utilities.css` (u-sb-* utilities)
6. `animations.css` (Vue transition classes)
7. Global `html`/`body` styles

**Never add additional CSS files here** — import them inside `main.css` instead to preserve cascade order.

---

### `runtimeConfig`
```ts
runtimeConfig: {
  public: {
    emailjsPublicKey: process.env.NUXT_EMAILJS_PUBLIC_KEY,
    emailjsServiceId: process.env.NUXT_EMAILJS_SERVICE_ID,
    emailjsTemplateAdminId: process.env.NUXT_EMAILJS_TEMPLATE_ADMIN_ID,
    emailjsTemplateReplyToId: process.env.NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID,
    strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL,
  },
}
```

All keys are under `public` — accessible on both server and client.

| Key | Env var | Purpose |
|---|---|---|
| `emailjsPublicKey` | `NUXT_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `emailjsServiceId` | `NUXT_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `emailjsTemplateAdminId` | `NUXT_EMAILJS_TEMPLATE_ADMIN_ID` | EmailJS template for admin email |
| `emailjsTemplateReplyToId` | `NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID` | EmailJS template for user reply |
| `strapiUrl` | `NUXT_PUBLIC_STRAPI_URL` | Strapi CMS base URL (used by Nitro proxy) |

Access in composables: `const config = useRuntimeConfig()` → `config.public.strapiUrl`.

---

### `routeRules`
Per-route rendering strategy. Add an entry for every page that should be statically generated or have specific caching.

```ts
routeRules: {
  '/': { prerender: true },     // en homepage — static
  '/it': { prerender: true },   // it homepage — static
}
```

**When adding a new page**, decide its rendering mode:
| Mode | Config | Use when |
|---|---|---|
| Static (SSG) | `{ prerender: true }` | Page content doesn't change at runtime |
| SSR (default) | *(omit the rule)* | Page needs fresh server data on each request |
| ISR | `{ isr: 60 }` | Revalidate every N seconds |
| SPA | `{ ssr: false }` | Dashboard / auth-gated pages |

For **dynamic routes** with static content (e.g. `/blog/[slug]`), use `nuxt generate` + prerender hooks instead of `prerender: true` on a wildcard.

---

### `sourcemap`
```ts
sourcemap: { client: false, server: false }
```
Disabled in all environments for security. Do not enable in production.

---

### `compatibilityDate`
```ts
compatibilityDate: '2025-07-15'
```
Locks Nuxt behaviour to a specific feature snapshot. Update only intentionally when upgrading Nuxt.

---

### `nitro`
```ts
nitro: {
  preset: 'netlify',
  externals: {
    external: ['isomorphic-dompurify'],
  }
}
```
- **`preset: 'netlify'`** — deployment target. Change to `'vercel'`, `'node-server'`, etc. when deploying elsewhere.
- **`externals.external`** — libraries excluded from the server bundle. `isomorphic-dompurify` is excluded because it requires `jsdom` which is incompatible with Netlify serverless runtime. It is used client-side only.

---

### `vite`
```ts
vite: {
  plugins: [tailwindcss()]
}
```
Tailwind CSS v4 is loaded as a Vite plugin — there is **no `tailwind.config.js`**. All design tokens are defined in `app/assets/css/theme.css` via `@theme`.

---

### `eslint`
```ts
eslint: {
  config: { stylistic: true }
}
```
Enables stylistic formatting rules via `@nuxt/eslint`. The full rule set is in `eslint.config.mjs`.

---

### `i18n`
```ts
i18n: {
  baseUrl: 'https://www.stefanobiddau.com',
  strategy: 'prefix_except_default',
  defaultLocale: 'en',
  locales: [
    { code: 'en', iso: 'en-US', language: 'en-US', name: 'English', file: 'en.json' },
    { code: 'it', iso: 'it-IT', language: 'it-IT', name: 'Italiano', file: 'it.json' },
  ],
  langDir: 'locales/',
  detectBrowserLanguage: false,
}
```
- **`baseUrl`**: set to the real portfolio domain — needed for canonical + alternate `<link>` tags.
- **`strategy: 'prefix_except_default'`**: English at `/page`, Italian at `/it/page`.
- **`detectBrowserLanguage: false`**: intentional — prevents unexpected redirects.

---

### `icon`
```ts
icon: {
  mode: 'svg',
  serverBundle: 'local',
  fallbackToApi: false,
  clientBundle: { scan: true, includeCustomCollections: true, sizeLimitKb: 256 }
}
```
- **`mode: 'svg'`** — inline SVG rendering, no external font/sprite requests.
- **`fallbackToApi: false`** — only locally installed collections are used. To add a new collection: `npm install @iconify-json/<collection>`.
- Installed collections: `@iconify-json/logos`, `@iconify-json/mdi`, `@iconify-json/solar`, `@iconify-json/flagpack`.
- **Do not install `@iconify-json/lucide`** — not used in this project.

---

### `image`
```ts
image: {
  provider: 'ipx',           // local optimisation
  providers: {
    cloudinary: {
      name: 'cloudinary',
      options: { baseURL: process.env.NUXT_PUBLIC_CLOUDINARY_BASE }
    }
  },
  domains: [],               // whitelist external image domains here
  quality: 80,
  format: ['webp', 'avif', 'png'],
  screens: { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }
}
```
- Default provider is `ipx` (local). For remote images via Cloudinary, pass `provider="cloudinary"` to `<NuxtImg>`.
- To allow images from an external domain (e.g. a CMS), add the domain to `domains[]`.
- `quality: 80` and `format: ['webp', 'avif', 'png']` are global defaults applied to all `<NuxtImg>` unless overridden per-instance.

---

## `package.json` — scripts & dependencies

### Scripts
| Script | Command | Use |
|---|---|---|
| `dev` | `nuxt dev` | Local development server |
| `build` | `nuxt build` | SSR production build |
| `generate` | `nuxt generate` | Full static site generation |
| `preview` | `nuxt preview` | Preview the production build locally |
| `postinstall` | `nuxt prepare` | Generates `.nuxt/` types after `npm install` |
| `lint` | `eslint .` | Check for lint errors |
| `lint:fix` | `eslint . --fix` | Auto-fix lint errors |

### Runtime dependencies
| Package | Version | Purpose |
|---|---|---|
| `nuxt` | `^4.4.2` | Core framework |
| `vue` | `^3.5.30` | UI framework |
| `vue-router` | `^5.0.4` | Router |
| `tailwindcss` | `^4.2.2` | CSS framework |
| `@tailwindcss/vite` | `^4.2.2` | Tailwind v4 Vite plugin |
| `@nuxt/eslint` | `^1.15.2` | ESLint integration |
| `@nuxt/icon` | `^2.2.1` | Icon system |
| `@nuxt/image` | `^2.0.0` | Image optimisation |
| `@nuxtjs/i18n` | `^10.2.3` | Internationalisation |
| `@vueuse/core` | `^14.2.1` | Vue composition utilities |
| `@vueuse/nuxt` | `^14.2.1` | VueUse Nuxt integration |
| `@floating-ui/vue` | `^1.1.11` | Floating element positioning |
| `@emailjs/browser` | `^4.4.1` | Contact form email sending (client-side) |
| `isomorphic-dompurify` | `^3.5.1` | HTML sanitisation (client-side) |
| `typed.js` | `^3.0.0` | Animated typewriter text (client-side) |
| `zod` | `^4.3.6` | Runtime form validation |
| `eslint` | `^10.0.3` | Linter |

### Dev dependencies
| Package | Version | Purpose |
|---|---|---|
| `@iconify-json/logos` | `^1.2.10` | Brand/tech logos icon collection |
| `@iconify-json/mdi` | `^1.2.3` | General UI icon collection |
| `@iconify-json/solar` | `^1.2.5` | Bold duotone UI icon collection |
| `@iconify-json/flagpack` | `^1.2.7` | Flag icon collection |
| `@types/node` | `^25.5.0` | Node.js types |

### Node.js version
Pinned to **24.11.0** via `.nvmrc`. Use `nvm use` to switch to the correct version.

---

## `tsconfig.json`
```json
{
  "files": [],
  "references": [
    { "path": "./.nuxt/tsconfig.app.json" },
    { "path": "./.nuxt/tsconfig.server.json" }
  ]
}
```
TypeScript configuration is fully delegated to the auto-generated `.nuxt/tsconfig.app.json` (strict mode, path aliases, Vue types). **Never manually add `compilerOptions` here** unless for a very specific override — run `nuxt prepare` to regenerate after changes.
