---
applyTo: "**/components/**"
---

# Components — stefano-biddau-portfolio

## Component types

| Prefix | Rule | Examples |
|---|---|---|
| `Base` | Fully reusable, zero business logic, no Strapi/API calls | `BaseButton`, `BaseInput`, `BaseTabs` |
| `Custom` | Portfolio-specific, may use data composables and business logic | `CustomSkillsCard`, `CustomContactForm` |
| `The` | Singleton — used once per layout | `TheHeader`, `TheFooter`, `ThePageHero` |

- Never add Strapi data fetching or business logic into `Base` components.
- `Custom` components live in `app/components/custom/<feature>/`.
- `The` components live in `app/components/the-<name>/`.

---

## Creating a new Base component

1. Create a folder in `app/components/base/` (kebab-case): `app/components/base/my-widget/`
2. Create the file (PascalCase + prefix): `BaseMyWidget.vue`
3. Structure the `<script setup>` block with sections in order:
   ```ts
   // Dependencies
   // Input / Output
   // Data
   // Events
   ```
4. Always use `<script setup lang="ts">` — no Options API.
5. Define props with an inline interface + `withDefaults`. Only list props that need a default in `withDefaults`.
6. Use design system tokens for all styling — no raw hex values, no hardcoded sizes.
7. Add `u-sb-soft-transition` to all interactive elements.

## Creating a new Custom component

1. Create a folder in `app/components/custom/<feature>/` (kebab-case).
2. Create the file (PascalCase + `Custom` prefix): `CustomMyFeature.vue`
3. May use data composables (`useSkills`, `useProjects`, `useMilestones`, etc.) and business logic.
4. Always pair with a skeleton component `CustomMyFeatureSkeleton.vue` when it renders async data.
5. Same `<script setup>` structure and code conventions as `Base` components.

---

## Base component API catalogue

### `BaseButton`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Visual style |
| `type` | `'button' \| 'submit' \| 'reset' \| 'link'` | `'button'` | `'link'` renders an `<a>` tag with `target="_blank"` |
| `to` | `string` | `undefined` | Required when `type='link'` |
| `ariaLabel` | `string` | `undefined` | For icon-only usage |
| `isDisabled` | `boolean` | `false` | |
| `isLoading` | `boolean` | `false` | |

Slot: `default` (button label / content)

---

### `BaseCard`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | `undefined` | |
| `subtitle` | `string` | `undefined` | |
| `paragraph` | `string` | `undefined` | |
| `variant` | `'dark' \| 'dark-hover' \| 'light' \| 'light-hover'` | `'light'` | Background + hover behaviour |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Content alignment |
| `fullCustomContent` | `boolean` | `false` | If true, disables built-in layout — use `default` slot only |

Slots: `default`, `card-header`, `card-body`, `card-footer`

---

### `BaseInput`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `name` | `string` | `undefined` | Falls back to `${id}-name` |
| `label` | `string` | `undefined` | |
| `placeholder` | `string` | `'Insert a value...'` | |
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'search' \| 'tel' \| 'url'` | `'text'` | |
| `hint` | `string` | `undefined` | |
| `error` | `string \| null` | `null` | Shows error message and red border |
| `autocomplete` | `string` | `'off'` | |
| `prefixIcon` | `string` | `undefined` | Iconify name e.g. `solar:magnifer-bold-duotone` |

Model: `defineModel<string>('input')`

---

### `BaseTextarea`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `name` | `string` | `undefined` | |
| `label` | `string` | `undefined` | |
| `placeholder` | `string` | `'Insert a value...'` | |
| `hint` | `string` | `undefined` | |
| `error` | `string \| null` | `null` | |
| `maxLength` | `number` | `undefined` | Shows character counter when set |

Model: `defineModel<string>('input')`

---

### `BaseCheckbox`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `name` | `string` | `undefined` | |
| `label` | `string` | `undefined` | Shown if no `default` slot |
| `error` | `string \| null` | `null` | |

Model: `defineModel<boolean>('input')`
Slot: `default` (custom label content)

---

### `BaseCombobox`
Generic component (`<script setup lang="ts" generic="T">`).

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `type` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `items` | `{ label: string, value: T }[]` | — | Required |
| `name` | `string` | `undefined` | |
| `label` | `string` | `undefined` | |
| `placeholder` | `string` | `'Insert a value...'` | |
| `hint` | `string` | `undefined` | |
| `error` | `string \| null` | `null` | |
| `prefixIcon` | `string` | `undefined` | |

Model: `defineModel<T[]>('input', { default: () => [] })`

---

### `BaseChip`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `text` | `string` | — | Required |
| `icon` | `string` | `undefined` | Iconify name |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | |
| `clickable` | `boolean` | `false` | Renders as `<button>` |
| `linkable` | `{ href: string, target?: string, rel?: string }` | `undefined` | Renders as `<a>` |

Emits: `chip-click` (only when `clickable: true`)

---

### `BaseDialog`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `isOpen` | `boolean` | — | Required |
| `title` | `string` | — | Required |
| `subtitle` | `string` | `undefined` | |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'sm'` | |

Emits: `(e: 'close', value: false): void`
Slots: `default` (body), `header` (below title bar), `footer` (bottom action area)
Behaviour: closes on `Escape`, locks scroll when open, traps focus, uses `<Teleport to="body">`.

---

### `BaseAccordion`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required |
| `title` | `string` | — | Required |
| `icon` | `string` | `undefined` | Iconify name shown in icon box |
| `isOpen` | `boolean` | `undefined` | If omitted, accordion manages state internally |

Emits: `toggle` (only when `isOpen` is controlled externally)
Slot: `default` (body content)

---

### `BaseIconButton`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `icon` | `string` | — | Required. Iconify name |
| `ariaLabel` | `string` | `undefined` | Always set it |
| `isActive` | `boolean` | `false` | Active/pressed state styling |

Emits: `(e: 'click'): void`

---

### `BaseIconMenu`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `icon` | `string` | — | Required. Trigger button icon |
| `items` | `MenuItem[]` | — | Required |
| `selectedItemId` | `string \| null` | `null` | Highlighted item |

Emits: `(e: 'select', itemId: string): void`
Uses `useFloatingUi` internally with `placement: 'bottom-start'`.

---

### `BaseCloseButton`
No props.
Emits: `(e: 'close', value: false): void`
Renders a close (`mdi:close`) icon button.

---

### `BaseTabs`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `tabs` | `{ label: string, icon?: string, id: string \| number }[]` | — | Required |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | `primary` = accent fill; `secondary` = surface fill |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Tab row alignment |

Model: `defineModel<string | number>('selectedTabId')`

---

### `BaseEmptyBox`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | — | Required |
| `message` | `string` | — | Required |
| `icon` | `string` | `'solar:box-minimalistic-bold-duotone'` | Iconify name |
| `dimension` | `'normal' \| 'small'` | `'normal'` | Controls vertical padding and text size |

---

### `BaseRichText`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `blocks` | `RichBlock[]` | — | Required |

Converts `RichBlock[]` to sanitised HTML via `blocksToHtml` + `useSanitize`. Uses a `<style scoped>` block to apply typography tokens to the rendered HTML.

---

## Singleton components (`The*`)

### `TheHeader`
| Prop | Type | Notes |
|---|---|---|
| `routes` | `RouteItem[]` | Nav links |
| `langs` | `MenuItem[]` | Language switcher items |
| `selectedLangId` | `string` | Currently active locale code |

Emits: `(e: 'change-lang', langCode: string): void`

### `TheFooter`
| Prop | Type | Notes |
|---|---|---|
| `email` | `string` | |
| `phone` | `string` | |
| `githubUrl` | `string` | |
| `instagramUrl` | `string` | |
| `linkedinUrl` | `string` | |
| `quickLinks` | `RouteItem[]` | |

### `ThePageHero`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required. Used as unique key for `useState` animation guard |
| `text` | `string` | — | Required. Hero title text |
| `imageSrc` | `string` | `undefined` | Optional decorative image |
| `lockScroll` | `boolean` | `false` | If true, locks scroll during hero animation and unlocks on complete |

Emits: `(e: 'hero-animations-ended'): void`
Used once per page that has a fullscreen hero intro animation.

### `TheNotificationBanner` / `TheNotificationBox`
Driven by `useNotification`. Do not instantiate manually — managed by `default.vue`.

---

## Custom component catalogue

### `CustomContactForm`
| Prop | Type | Notes |
|---|---|---|
| `openForm` | `boolean` | Controls form visibility |

Emits: `(e: 'closeForm', value: boolean): void`
Uses `useEmailJs` for dual send (admin + reply-to-user), `zod` for validation, `useNotification` for feedback.

### `CustomSkillsCard`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | `string` | — | Required |
| `level` | `number` | — | Required. 0–5 scale shown as filled squares |
| `icon` | `string` | — | Required. Iconify name |
| `gold` | `boolean` | `false` | Highlights the card with a gold ring (top skill) |

### `CustomSkillsDialog`
Opens a `BaseDialog` with extended skill details.

### `CustomSkillsSkeleton`
Skeleton placeholder for `CustomSkillsCard` during data loading.

### `CustomProjectsCard`
| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | Required |
| `content` | `RichBlock[]` | Rich text rendered via `BaseRichText` |
| `coverImageSrc` | `string` | Optional project cover |
| `coverImageAlt` | `string` | Optional alt text |
| `codebaseUrl` | `string` | Optional GitHub link |
| `deployUrl` | `string` | Optional live demo link |

### `CustomProjectsSkeleton`
Skeleton placeholder for `CustomProjectsCard`.

### `CustomSbTemplatesCard`
| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | Required |
| `description` | `string` | Required |
| `codebaseUrl` | `string` | Required |
| `logoSrc` | `string` | Optional logo image |
| `langIcons` | `string[]` | Optional Iconify names for tech stack |

### `CustomSbTemplatesSkeleton`
Skeleton placeholder for `CustomSbTemplatesCard`.

### `CustomMilestone`
| Prop | Type | Notes |
|---|---|---|
| `id` | `string` | Required |
| `title` | `string` | Required |
| `content` | `RichBlock[]` | Required |
| `subtitle` | `string` | Optional |
| `imageSrc` | `string` | Optional |
| `imageCaption` | `string` | Optional |
| `date` | `string` | Optional |

### `CustomMilestoneSkeleton`
Skeleton placeholder for `CustomMilestone`.

### `CustomSolarSystem`
Decorative animated orbit component used in `my-skills.vue` to visualise technology categories as orbiting planets.

| Prop | Type | Notes |
|---|---|---|
| `planetsIcon` | `string[]` | Required. Iconify names of the technologies to display as orbiting planets (max 8) |
