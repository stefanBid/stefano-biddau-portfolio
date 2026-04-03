---
applyTo: "**/composables/**,**/utils/**,**/types/**"
---

# Composables, Utils & Types — stefano-biddau-portfolio

## Available composables

### `useNotification()`
Global notification system. State is shared across the app via `useState`.

```ts
const { notifications, removeNotification, clearNotifications, success, warning, error, info } = useNotification()

// Show a notification
info({
  title: 'Title',
  message: 'Message text',       // required
  icon: 'solar:bell-bold-duotone', // optional — Iconify name
  dismissible: true,             // optional — show close button
  autoClose: true,               // optional — auto-dismiss
  duration: 5000,                // optional — ms before auto-close
})
```

Methods: `success()`, `warning()`, `error()`, `info()` — all accept `Omit<NotificationItem, 'type' | 'id'>`.
`removeNotification(id: string)`, `clearNotifications()`.
`notifications` is a `ComputedRef<NotificationItem[]>`.

> Must be called client-side only (`import.meta.client`). The composable guards this internally.

---

### `useEmailJs()`
Sends emails via EmailJS. **Client-side only** — always wrap calls inside `<ClientOnly>` or guard with `import.meta.client`.

```ts
const { sendContactEmailAdmin, sendReplyToUser } = useEmailJs()

// Send contact email to admin
const result = await sendContactEmailAdmin({
  from_name: 'Mario Rossi',
  from_email: 'mario@example.com',
  message: 'Hello!',
  agree_time: new Date().toISOString(),
  year: String(new Date().getFullYear()),
})

// Send reply confirmation to user
const result = await sendReplyToUser({
  user_name: 'Mario Rossi',
  to_email: 'mario@example.com',
  message: 'Hello!',
  year: String(new Date().getFullYear()),
})
```

Both functions return `{ success: boolean, data: SendResponse | null, error: unknown | null }`.
Config keys come from `useRuntimeConfig().public` (`emailjsPublicKey`, `emailjsServiceId`, `emailjsTemplateAdminId`, `emailjsTemplateReplyToId`).

---

### `useMilestones(settings?)`
Fetches milestones from the Nitro proxy (`/api/sb-milestones`). Locale-aware — automatically re-fetches when the language changes.

```ts
const { data, pending, error } = useMilestones().fetchMilestones()
// or with custom settings:
const { data, pending, error } = useMilestones({ server: false, lazy: true }).fetchMilestones()
```

- Uses `useFetch` with `watch: [locale]` for automatic locale-driven re-fetch.
- `settings.server` (default `true`) — enable SSR fetch.
- `settings.lazy` (default `false`) — non-blocking SSR fetch.
- Returns `Milestone[] | null`.

---

### `useProjects(settings?)`
Fetches projects from the Nitro proxy (`/api/sb-projects`). Same API as `useMilestones`.

```ts
const { data, pending, error } = useProjects().fetchProjects()
```

Returns `Project[] | null`.

---

### `useSkills()`
Fetches skills with filters and pagination from `/api/sb-skills`. Uses `$fetch` (manual trigger) instead of `useFetch` because filters can change at runtime.

```ts
const { data, pending, error, pagination, fetchSkills } = useSkills()

// Initial fetch
await fetchSkills()

// Filtered fetch
await fetchSkills({ name: 'vue', types: ['feFramework'], page: 1, pageSize: 12 })
```

State: `data: Ref<Skill[] | null>`, `pending: Ref<boolean>`, `error: Ref<Error | null>`, `pagination: ComputedRef<StrapiPagination | null>`.

---

### `useTemplates()`
Fetches GitHub templates from `/api/sb-templates`. Uses `$fetch` (manual trigger).

```ts
const { data, pending, error, fetchTemplates } = useTemplates()
await fetchTemplates()
```

`data: Ref<SbTemplate[] | null>`. `SbTemplate` is an exported interface from `useTemplates.ts`.

---

### `useTypedText(input, options?)`
Wrapper around `typed.js` for animated typewriter text. **Client-side only** — must be used inside `<ClientOnly>` or `onMounted`.

```ts
const { el, elStyle, isRunning } = useTypedText('Hello, world!')
// or with reactive array (loops through strings)
const { el, elStyle } = useTypedText(['Frontend Dev', 'Vue Enthusiast', 'UI Craftsman'])
// or with reactive computed (auto-updates when source changes)
const { el, elStyle } = useTypedText(computed(() => [t('key.0'), t('key.1')]))
// or with custom options override
const { el, elStyle } = useTypedText('Hello', { backDelay: 500 })
```

```vue
<!-- Template usage -->
<span ref="el" :style="elStyle"></span>
```

- `el` — `Ref<HTMLElement | null>` — bind via `ref="el"` to the target `<span>`
- `elStyle` — `CSSProperties` — bind via `:style="elStyle"` (sets `display: inline; vertical-align: baseline`)
- `isRunning` — `Ref<boolean>` — whether the animation is active
- Additional controls: `start()`, `stop()`, `reset(hard?)`, `recreate()`, `setOptions(opts)`, `setStrings(strings)`, `update(strings?, opts?)`
- Single string → uses `LONG_TEXT_OPTIONS` (no loop, no backspace)
- Array of strings → uses `GROUP_STRING_OPTIONS` (loops with smart back-typing)
- Cursor character: `'\u00A0_'` (non-breaking space + underscore)
- Respects `prefers-reduced-motion` automatically (disables animation if set)
- `typed.js` is loaded via dynamic import — SSR-safe

---

### `useFloatingUi(config?)`
Wrapper around `@floating-ui/vue` for dropdown/tooltip/menu positioning.

```ts
const { reference, floating, floatingStyles, open, toggleFloating } = useFloatingUi({
  placement: 'bottom-start',  // default
  offset: 8,                  // default
  strategy: 'absolute',       // default
})
```

- `reference` / `floating` — `Ref<HTMLElement | null>` to bind via `ref`
- `floatingStyles` — bind to `:style` on the floating element
- `open` — `Ref<boolean>` current visibility state
- `toggleFloating(state?: boolean)` — open/close the floating element

---

### `useLockScroll()`
Prevents page scroll. Each instance gets a unique owner ID, so multiple callers are safe.

```ts
const { lock, unlock, isLocked } = useLockScroll()

lock()    // adds scroll-locked class to <html>
unlock()  // removes it (only when no other owner holds the lock)
```

- SSR-safe: guards with `import.meta.client`
- `isLocked: ComputedRef<boolean>`

---

### `useSanitize()`
XSS-safe HTML rendering via `isomorphic-dompurify`.

```ts
const { sanitizeHtml } = useSanitize()
const clean = sanitizeHtml(dirtyHtml)
```

- Server-side: skips DOMPurify (content trusted from CMS), converts `\n` to `<br>`
- Client-side: full DOMPurify sanitisation with allowlist of safe tags/attributes
- Use with `v-html` only via `BaseRichText` — never write `v-html` directly with unsanitised content

---

## Writing new composables

1. File in `app/composables/`, named `useSomething.ts`
2. Export a default function named `useSomething`
3. Always type return values explicitly
4. Use `useState` for global/shared state, `ref`/`computed` for local state
5. Guard any DOM/browser access with `if (!import.meta.client) return`
6. Private helpers use `_` prefix (e.g. `_ensureOwnerId`)
7. For Strapi data composables: use `useFetch` for locale-aware SSR data, `$fetch` for manually-triggered or filter-driven fetches

```ts
export default function useMyFeature() {
  const _cache = ref<Map<string, string>>(new Map())
  const items = computed(() => [..._cache.value.values()])

  function add(key: string, value: string) {
    _cache.value.set(key, value)
  }

  return { items, add }
}
```

---

## Available utils

### `generateUuid(): string`
Returns a random UUID v4 string. Used internally by `useNotification` and `useLockScroll`.

### `blocksToHtml(blocks: RichBlock[]): string`
Converts a `RichBlock[]` array (Strapi rich text format) to an HTML string. Used by `BaseRichText` — pair it with `useSanitize().sanitizeHtml()` before passing to `v-html`.

### `downloadFile(publicUrl: string, filename: string): void`
Triggers a browser file download from a public URL. **Client-side only** — guards with `import.meta.client`. Used for CV download.

```ts
downloadFile('https://cdn.example.com/cv.pdf', 'stefano-biddau-cv.pdf')
```

---

## Global TypeScript types (`app/types/global.d.ts`)

All shared interfaces are declared globally — no import needed anywhere in the app.

### `SkillType`
```ts
type SkillType = 'beLang' | 'feLang' | 'beFramework' | 'feFramework' | 'database' | 'tool' | 'other'
```
Used for skill category filtering.

### `MenuItem`
```ts
interface MenuItem {
  code: string
  label: string
  iconType: 'nuxt-icon' | 'custom'
  icon: string
}
```
Used for language switcher items and icon-menu entries.

### `RouteItem`
```ts
interface RouteItem {
  name: string
  path: string
  disabled?: true
}
```
Used for navigation links in `TheHeader` and `TheFooter`.

### `NotificationItem`
```ts
interface NotificationItem {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  icon?: string
  title?: string
  message: string
  dismissible?: boolean
  autoClose?: boolean
  duration?: number
}
```

### `SkillsFilterPreset`
```ts
interface SkillsFilterPreset {
  key: string
  filters: SkillType[]
}
```
Used in `my-skills.vue` to define preset filter buttons.

### `StrapiResponse<T>`
```ts
interface StrapiResponse<T> {
  data: T
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
```
Wrapper for all Strapi collection responses consumed by the Nitro proxy endpoints.

### `RichBlock*` types

Strapi-compatible rich text block structure used by `BaseRichText` and `blocksToHtml`.

```ts
type RichBlock = RichBlockParagraph | RichBlockHeading | RichBlockList | RichBlockQuote | RichBlockCode

// Leaf nodes
interface RichBlockText    { type: 'text'; text: string; bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean; code?: boolean }
interface RichBlockLink    { type: 'link'; url: string; children: RichBlockText[] }

// Block nodes
interface RichBlockParagraph { type: 'paragraph'; children: RichBlockChild[] }
interface RichBlockHeading   { type: 'heading'; level: 1|2|3|4|5|6; children: RichBlockText[] }
// … (see global.d.ts for full definitions)
```

---

## Adding new global types

Add new shared interfaces to `app/types/global.d.ts` inside the `declare global {}` block. Never define shared types inline in components or pages.
