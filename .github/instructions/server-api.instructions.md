---
applyTo: "**/server/**"
---

# Server API (Nitro Proxy) — stefano-biddau-portfolio

## Architecture

The frontend **never calls Strapi directly**. All data flows through a Nitro proxy layer:

```
Client / SSR
    │
    ▼
/api/sb-*  (Nitro — server/api/)
    │
    ▼
Strapi CMS  (config.public.strapiUrl)
```

This pattern:
- Avoids CORS issues (Strapi only receives server-to-server calls)
- Enables server-side caching via `cachedEventHandler`
- Hides the Strapi URL from the client bundle
- Allows graceful degradation (returns `{ data: [] }` if Strapi is down)

---

## Existing endpoints

| File | Route | Method | Caching | Notes |
|---|---|---|---|---|
| `_health.get.ts` | `GET /api/_health` | `defineEventHandler` | None | Health check |
| `sb-milestones.get.ts` | `GET /api/sb-milestones` | `cachedEventHandler` | 6h SWR | Locale-aware, sorted `date:asc` |
| `sb-projects.get.ts` | `GET /api/sb-projects` | `cachedEventHandler` | 6h SWR | Locale-aware, sorted `createdAt:asc` |
| `sb-skills.get.ts` | `GET /api/sb-skills` | `defineEventHandler` | None | Dynamic filters (name, type), pagination — no cache because query params vary at runtime |
| `sb-templates.get.ts` | `GET /api/sb-templates` | `cachedEventHandler` | 6h SWR | Locale-aware, sorted `createdAt:desc` |

---

## Endpoint anatomy

### Simple locale-aware endpoint (milestones / projects / templates pattern)

```ts
// server/api/sb-<resource>.get.ts

export default cachedEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const baseUrl = config.public.strapiUrl

  if (!baseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'STRAPI_URL_NOT_CONFIGURED',
    })
  }

  const strapiUrl = `${baseUrl}/api/sb-<resource>`
  const locale = typeof query.locale === 'string' ? query.locale : 'en'

  try {
    const response = await $fetch(strapiUrl, {
      params: {
        'locale': locale,
        'sort': 'date:asc',        // ← adjust per resource
        'populate': '*',
        'pagination[pageSize]': 100,
      },
      timeout: 30000,
    })
    return response
  }
  catch {
    // Graceful degradation: never break the build if Strapi is down
    return { data: [] }
  }
}, {
  maxAge: 60 * 60 * 6, // 6 hours
  swr: true,
  getKey: (event) => {
    const query = getQuery(event)
    const locale = typeof query.locale === 'string' ? query.locale : 'en'
    return `sb-<resource>-${locale}`
  },
})
```

### Endpoint with dynamic filters and pagination (skills pattern)

Use `defineEventHandler` (no cache) when query params vary at runtime — caching would serve stale filtered results.

```ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const baseUrl = config.public.strapiUrl

  if (!baseUrl) {
    throw createError({ statusCode: 500, statusMessage: 'STRAPI_URL_NOT_CONFIGURED' })
  }

  const strapiUrl = `${baseUrl}/api/sb-<resource>`

  // Sanitise query params before forwarding
  const nameFilter = typeof query.name === 'string' ? query.name : ''
  const rawTypes = query.type
  const types = Array.isArray(rawTypes)
    ? rawTypes
    : typeof rawTypes === 'string' && rawTypes.length > 0
      ? rawTypes.split(',').map(item => item.trim()).filter(Boolean)
      : []

  const page = Number.parseInt(typeof query.page === 'string' ? query.page : '', 10)
  const pageSize = Number.parseInt(typeof query.pageSize === 'string' ? query.pageSize : '', 10)

  const params: Record<string, string | number | string[] | undefined> = {
    'populate': '*',
    'sort': 'level:desc',
    'pagination[page]': Number.isFinite(page) && page > 0 ? page : 1,
    'pagination[pageSize]': Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 12,
  }

  if (nameFilter) {
    params['filters[name][$containsi]'] = nameFilter
  }

  if (types.length > 0) {
    params['filters[type][$in]'] = types // pass array directly — Nitro/$fetch handles serialisation
  }

  try {
    return await $fetch(strapiUrl, { params, timeout: 15000 })
  }
  catch {
    return { data: [], meta: { pagination: { page: 1, pageSize: 12, pageCount: 0, total: 0 } } }
  }
})
```

---

## Rules

### Always
- Use `cachedEventHandler` for Strapi endpoints that return **static or semi-static data** (locale-aware collections).
- Use `defineEventHandler` for endpoints with **dynamic query params** (filters, pagination) — caching would serve stale filtered results.
- Guard `baseUrl` at the top — return a `500` if missing.
- Sanitise every query param before forwarding to Strapi — never pass raw `event.query` directly.
- Return graceful empty data (`{ data: [] }`) in the `catch` block to prevent build failures.
- Use `timeout: 30000` on `$fetch` for locale-aware endpoints; `timeout: 15000` for filter endpoints.
- Name cache keys with the resource + discriminant (locale or serialised query params).

### Never
- Never call Strapi from a Vue component or composable directly — always go through `/api/sb-*`.
- Never expose the Strapi URL in client-side code — use `config.public.strapiUrl` (server-side only in Nitro handlers).
- Never use `cachedEventHandler` for endpoints with dynamic filters — each unique query combination would create a separate cache entry and grow unboundedly.
- Never import server utilities (`useRuntimeConfig`, `getQuery`, `$fetch` Nitro version) in Vue components.

---

## Caching strategy

| Setting | Value | Effect |
|---|---|---|
| `maxAge` | `60 * 60 * 6` (6h) | Cache lives for 6 hours on the server |
| `swr` | `true` | Stale-while-revalidate: returns cached data immediately while refreshing in background |
| `getKey` | locale or query hash | Separate cache buckets per language / filter combination |

> On Netlify, serverless functions do not share warm instances across invocations, so the effective cache lifetime depends on function warm-up. `swr: true` ensures users never wait for a cold Strapi call.

---

## Adding a new endpoint

1. Create `server/api/sb-<resource>.get.ts`
2. Follow the **simple locale-aware pattern** (or the filter/pagination pattern if needed)
3. Add a corresponding composable `app/composables/use<Resource>.ts`
4. Consume the composable in the relevant page or `Custom*` component
5. Add a `*Skeleton.vue` component for the loading state

---

## Strapi data model conventions

Frontend interfaces are defined **inside the composable file** (not in `global.d.ts`) because they are tightly coupled to the endpoint:

```ts
// In useMyResource.ts
interface MyResource {          // ← clean frontend shape
  id: string
  title: string
  // ...
}

interface MyResourceBE {        // ← raw Strapi shape (what the API returns)
  id: number
  documentId: string
  // ...
}
```

The Nitro proxy does **not** transform data — transformation (mapping `BE` → frontend shape) happens inside the composable's `transform` option on `useFetch`, or manually after `$fetch`.
