---
applyTo: "**/*.vue"
---

# Design System — stefano-biddau-portfolio

## Colours (`--color-sb-*`)

All colours are defined as CSS custom properties in `app/assets/css/theme.css` inside an `@theme` block and auto-mapped to Tailwind utilities (`bg-sb-*`, `text-sb-*`, `border-sb-*`). **Never hardcode raw hex values.**

| Token | Tailwind utility | Value | Usage |
|---|---|---|---|
| `--color-sb-main` | `bg-sb-main` | `#0f0f20` | Page background |
| `--color-sb-surface` | `bg-sb-surface` | `#1a1a2e` | Card / elevated surface |
| `--color-sb-surface-2` | `bg-sb-surface-2` | `#232342` | Nested surfaces, inputs |
| `--color-sb-border` | `border-sb-border` | `#2a2a44` | Default borders |
| `--color-sb-shadow` | `shadow-[0_4px_20px_var(--color-sb-shadow)]` | `rgba(0,0,0,0.45)` | Shadows (always via `var()`) |
| `--color-sb-accent` | `bg-sb-accent` / `text-sb-accent` | `#e95905` | Primary CTA, highlights (vivid orange) |
| `--color-sb-accent-hover` | `hover:bg-sb-accent-hover` | `#d24f05` | Hover state of accent |
| `--color-sb-accent-border` | `border-sb-accent-border` | `#b34704` | Border on accent elements |
| `--color-sb-contrast` | `text-sb-contrast` | `#f1f1f1` | Primary text on dark |
| `--color-sb-muted` | `text-sb-muted` | `#9ca3af` | Secondary / placeholder text |
| `--color-sb-success` | `text-sb-success` / `bg-sb-success` | `#22c55e` | Success state |
| `--color-sb-warning` | `text-sb-warning` / `bg-sb-warning` | `#fb923c` | Warning state |
| `--color-sb-error` | `text-sb-error` / `bg-sb-error` | `#ef4444` | Error state |
| `--color-sb-info` | `text-sb-info` / `bg-sb-info` | `#60a5fa` | Info state |
| `--color-sb-success-bg` | `bg-sb-success-bg` | `#14532d` | Success tint background |
| `--color-sb-warning-bg` | `bg-sb-warning-bg` | `#78350f` | Warning tint background |
| `--color-sb-error-bg` | `bg-sb-error-bg` | `#7f1d1d` | Error tint background |
| `--color-sb-info-bg` | `bg-sb-info-bg` | `#1e3a8a` | Info tint background |

Tailwind opacity modifiers are allowed: `bg-sb-main/80`, `text-sb-muted/70`.

---

## Theme

The app is **always dark-themed**. There is no light mode, no `@nuxtjs/color-mode`, no theme toggle.
- **Never use `dark:` Tailwind variants** — they are not needed.
- All colours are defined once in `theme.css` and never change at runtime.

---

## Typography (`ty-sb-*`)

Custom `@utility` classes defined in `app/assets/css/typography.css`. Apply them as regular Tailwind classes.

| Class | Font | Usage |
|---|---|---|
| `ty-sb-hero` | Bebas Neue, uppercase | Full-bleed hero text (`text-6xl` → `text-[12rem]`) |
| `ty-sb-impact` | Bebas Neue, uppercase | Large display headings (`text-5xl` → `text-9xl`) |
| `ty-sb-title` | Bebas Neue | Section titles (`text-2xl` → `text-4xl`) |
| `ty-sb-title-lg` | Bebas Neue | Large section titles (`text-3xl` → `text-6xl`) |
| `ty-sb-title-xl` | Bebas Neue | Extra large titles (`text-4xl` → `text-7xl`) |
| `ty-sb-subtitle` | Space Mono semibold | Sub-headings (`text-base` → `text-xl`) |
| `ty-sb-subtitle-lg` | Space Mono semibold | Large sub-headings (`text-lg` → `text-2xl`) |
| `ty-sb-subtitle-xl` | Space Mono semibold | Extra large sub-headings (`text-xl` → `text-3xl`) |
| `ty-sb-paragraph` | Space Mono | Body text (`text-sm` → `text-lg`) |
| `ty-sb-label` | Space Mono, uppercase, tracked | Form labels, tags |
| `ty-sb-btn-label` | Space Mono bold, uppercase | Button text |
| `ty-sb-caption` | Space Mono italic | Captions, secondary notes |

### Font families
- `font-bebas-neue` → Bebas Neue (all titles: `ty-sb-hero`, `ty-sb-impact`, `ty-sb-title*`)
- `font-space-mono` → Space Mono (subtitles, body, labels, buttons)

> You can override the font on a single element using `font-bebas-neue!` or `font-space-mono!` even inside a `ty-sb-*` class.

---

## Utility classes (`u-sb-*`)

Defined in `app/assets/css/utilities.css`.

| Class | Effect |
|---|---|
| `u-sb-soft-transition` | `transition-all duration-200 ease-in-out` |
| `u-sb-hard-transition` | `transition-all duration-500 ease-in-out` |
| `u-sb-focus` | `outline-none ring-sb-contrast focus-visible:ring-2` |
| `u-sb-focus-within` | `outline-none ring-sb-contrast focus-within:ring-2` |
| `u-sb-no-focus` | Removes all focus outlines (use only on elements with custom focus handling) |

Always add `u-sb-soft-transition` to all interactive elements.

---

## Animations (Vue `<Transition>`)

Named transition classes defined in `app/assets/css/animations.css`.

| Name | Effect | Duration |
|---|---|---|
| `fade` | Opacity + slight Y offset | 800ms |
| `slide-down` | Opacity + slides from top | 200ms |
| `scale-fade` | Opacity + scale from 0.95 | 200ms |

```vue
<Transition name="scale-fade">
  <div v-if="isOpen">...</div>
</Transition>
```

---

## Icons

Always use the `<Icon>` component from `@nuxt/icon`. **The collection prefix is mandatory.**

Available collections:
| Collection | Purpose | Example |
|---|---|---|
| `solar` | Bold duotone UI icons | `solar:box-minimalistic-bold-duotone` |
| `mdi` | General purpose UI icons | `mdi:github` |
| `logos` | Brand / tech logos | `logos:vue`, `logos:nuxt-icon` |
| `flagpack` | Country flags | `flagpack:it`, `flagpack:gb` |

```vue
<Icon name="solar:arrow-right-bold-duotone" class="size-5 text-sb-accent" />
<Icon name="logos:vue" class="size-6" />
<Icon name="flagpack:it" class="size-5" />
```

- Size via Tailwind: `size-4`, `size-5`, `size-6`, `size-7`, etc.
- Colour via token: `text-sb-contrast`, `text-sb-muted`, `text-sb-accent`
- Always set `aria-label` on icon-only interactive elements
- **Do not use `lucide` — it is not installed in this project**
