---
name: design-system-proportions-audit
description: Audit and refactor a Vue/Nuxt component or CSS file against this project's design system (app/assets/css/theme.css, typography.css, utilities.css, animations.css, main.css) to fix dead/redundant ty-sb-*/u-sb-* utility classes, wrong or skipped heading tags, and margin/padding that isn't proportioned to the fluid font scale (--fs-sb-*). Use this whenever the user asks to check, audit, clean up, or refactor typography, spacing, margins, padding, font sizes, "proporzioni"/proportions, transitions (u-sb-soft-transition/u-sb-hard-transition), or dead/unused Tailwind custom classes on a selected file — even if they only say something like "controlla questo file" or "sistema gli spazi" without naming the design system explicitly.
---

# Design System Proportions Audit & Refactor

Full systematic audit + refactor of a single selected file (Vue component or CSS) against this
project's design-system tokens, so font sizes, spacing, and container padding are all in real
proportion — not a spot-check.

Applies to the `stefano-biddau-portfolio` Nuxt 4 project (see `CLAUDE.md` at repo root for full
conventions). Design system files live in `app/assets/css/`: `theme.css`, `typography.css`,
`utilities.css`, `animations.css`, `main.css`. If any path differs in the actual repo, locate the
real files first (search for `@theme`, `ty-sb-`, `u-sb-` definitions) — never guess values from
memory.

## Phase 0 — Read the design system (mandatory, every time)

Before judging anything in the target file, open and read all 5 design-system CSS files in full.
Do not reuse values from a previous run or from training memory — token values can change.
From them, produce a reference table and put it at the top of your report:

1. **Every `--fs-sb-*` token resolved to px** at both 320px and 1536px viewport (resolve any
   `clamp()` by hand — do the arithmetic, don't leave it as a formula).
2. **Every `ty-sb-*` utility**: which font-size token it uses, which semantic tag it matches (if
   any), and its font-weight/transform/style modifiers (bold, uppercase, italic).
3. **Default spacing on text tags** from `typography.css` `@layer base` (typically
   `h1,h2,h3,h4,p,ul,ol,blockquote { margin: 0 0 0.75em 0 }` plus a `:last-child` reset) — note
   the exact rule as written, it may have changed.
4. **Transition utilities** (`u-sb-soft-transition`, `u-sb-hard-transition`) with their durations,
   and the Vue `<Transition>` classes in `animations.css` (fade, slide-down, scale-fade, page, or
   whatever is actually defined) with their durations — needed to catch conflicts/duplicates.
5. Note the color tokens (`--color-sb-*`) exist but are **out of scope** for this audit — never
   flag colors.

Do not proceed to Phase 1 until this table is written from the actual files you just read.

## Phase 1 — Full-coverage pass over the target file

Walk the selected file from top to bottom. Every element that renders text (h1–h6, p, span,
label, small, code, buttons, badges, chips) and every container with margin/padding around one
(div, section, card, wrapper) must be evaluated — no sampling, no "the rest looks similar."

For each one, in this order:

1. **Resolve the actual font-size** (semantic tag default, `ty-sb-*` utility, or arbitrary
   Tailwind class like `text-[Npx]`/`text-xl`) and write the px value from the Phase 0 table (or
   convert standard Tailwind scale values by hand, e.g. `text-2xl` = 24px).
   **Inheritance trap — check every wrapper explicitly, don't assert "clean" without listing each
   child tag:** a `ty-sb-*`/font-size class applied to a *wrapping* element does **not** cascade
   down to child tags that carry their own explicit `font-size` in `@layer base` — currently
   `h1, h2, h3, h4/h5/h6, p, span, label, small, code`. Those always win over inheritance. Tags
   with **no** explicit base rule (`a`/`NuxtLink`, `div`, `button`, `li`, etc.) genuinely do
   inherit font-size normally from a wrapper. So: whenever a wrapper carries a font-size utility,
   list every direct/nested child that renders text, tag by tag, and mark each one either
   "inherits correctly" (no base rule) or "blocked — needs its own class/size" (has a base rule).
   A wrapper with mixed children (e.g. `<a>` links + a `<span>` separator) can have some children
   inheriting fine and others silently wrong at the same time — never stop checking after finding
   the first correct one.
2. **Heading correctness** (independent of classes): flag duplicate `h1`s, skipped heading levels
   (h1 straight to h4 with no h2/h3, unless it's an isolated repeated card component), headings
   used only for visual size with no real section-title meaning, and the inverse — a `div`/`span`
   styled with `ty-sb-h*` that is semantically a real section title and should be a heading tag.
3. **Utility class check**: is the applied `ty-sb-*`/`u-sb-*` class dead (not defined anywhere in
   the 5 files, or a typo), redundant (same tag already gets that exact style for free from the
   `@layer base` default — e.g. `<h1 class="ty-sb-h1">`), or legitimate (used to give a
   *different* tag the styling of another level, e.g. `ty-sb-h1` on a `<span>`)? Only exact
   tag↔utility matches count as redundant.
   **Tag-vs-utility check:** when an element uses a `ty-sb-*` utility that matches another
   semantic tag's own default style one-to-one (e.g. a `<span>` styled with `ty-sb-p`, a `<div>`
   styled with `ty-sb-label`), ask whether the element could just *be* that tag instead — dropping
   the utility class entirely and getting the style for free from `@layer base`. Recommend the tag
   swap when nothing blocks it (no inline-flow requirement, no nesting-validity issue like a `<p>`
   inside a `<p>`, no a11y/semantic reason to keep the generic tag); otherwise note why the
   utility is the right call (e.g. it must stay inline inside running text, or sits inside another
   block-level text tag where the matching semantic tag isn't valid HTML).
4. **Spacing to the next/previous text element in flow** — answer in order:
   - a) Does the existing default margin (`0.75em` or whatever Phase 0 found) already cover it?
     If a custom margin/padding is added on top, is it redundant (remove), insufficient/wrong for
     context (adjust), or justified (keep)?
   - a2) **`mb-0`/`mt-0` next to a parent `space-y-*` (or similar gap-via-margin utility):**
     before accepting a hard `mb-0`/`mt-0` override as "avoids double spacing," compute whether
     adjacent-sibling margin collapse already produces the exact same visual gap without it —
     block siblings collapse to the *larger* of the two margins, they don't add. If the element's
     own default margin is smaller than the parent's `space-y-*` value (common, since `0.75em` on
     a small utility-resized heading is often just a few px), collapse alone already yields the
     `space-y-*` value and the hard override changes nothing visually today. In that case flag it
     as **correggere: remove the `mb-0`/`mt-0`** — it buys nothing now and strips the element's
     default-margin safety net for the day it's reused outside this specific parent (where it
     would then render flush/stuck with zero fallback spacing). Only keep a hard `mb-0`/`mt-0`
     when the default margin is genuinely *larger* than the parent's gap (collapse would otherwise
     overshoot the intended spacing) or when there's no `space-y-*`/gap utility to collapse against.
     **Check the parent's `display` before applying this rule at all**: adjacent-sibling margin
     collapse only happens in normal block flow. A `flex`/`grid`/`flex-col` parent using Tailwind
     `gap-*` never collapses margins with its children — a child's own default margin there *adds*
     on top of the `gap`, it doesn't merge into it. In that case a `[&>child]:mb-0`-style override
     is usually **necessary, not redundant** — removing it would stack the default margin on top of
     the gap and overshoot the intended spacing. Get the parent's display model right before
     deciding whether collapse logic even applies.
   - b) If custom spacing is genuinely needed, should it be `margin` or `padding`? Rule: vertical
     spacing between two text elements in sequence (e.g. heading → paragraph) should always be
     `margin` (prefer `margin-bottom` on the first element, consistent with the base layer
     pattern), never `padding` — unless that element also has a visible background/border, in
     which case padding is legitimately its own "inner area."
   - c) If margin, is the amount proportioned? Expected ratio (margin px ÷ font-size px of the
     element above): **0.3–0.6×** for heading→text, **0.5–1×** for paragraph→paragraph,
     **small, ~4–8px** for label/caption→related text. The 0.75em default already sits inside
     the heading→text range in most cases, so for a plain heading→paragraph pair with no other
     custom spacing, the correct verdict is usually "OK, default is sufficient" — only flag it if
     a custom value pushes it clearly outside this range.
5. **Container padding**, if the element is a padded container around text: is padding
   proportioned to the contained font-size?
   - **Classify the container's structural role first, by what it *is*, not just by the font-size
     inside it**: tap-target/list-nav-item, button, chip/badge, or actual content card/section.
     Role decides the band, not text size alone — a mobile-drawer nav link and a content card can
     hold the same 16px text and still deserve different bands. Bands: chips/badges/small labels
     **0.5–1×**; buttons with bold label text: vertical **0.6–1×**, horizontal **1.5–2.5×**;
     tap-targets/list/nav items (drawer links, menu rows): **0.6–1×**, same logic as buttons —
     their padding is about touch-target comfort, not text breathing room; body-text cards/sections
     (actual paragraph/content blocks): **1–2×**; large-title containers (h1/hero/impact): don't go
     below **0.3×** (cramped). When role is ambiguous, prefer the band that requires the smaller,
     less invasive change, and say so explicitly in the verdict — don't silently pick whichever
     band the font-size alone happens to fit.
   - **Check per breakpoint, not once.** If the font-size token is fluid (`clamp()`) or padding is
     responsive (`p-3 md:p-4`, etc.), compute the ratio separately at 320px and at 1536px — a value
     that looks correct at one end can fall out of band, or visually break wrapping/overflow, at
     the other. State both ratios in the verdict when they differ meaningfully.
   - **Weigh UI risk before proposing a value.** A mathematically "ideal" padding bump can overflow,
     wrap text, or crowd a fixed-width sibling (icon, fixed column, narrow drawer) at the narrowest
     supported breakpoint (320px). If there's real risk, say so explicitly and prefer the smaller,
     safer adjustment over the textbook-ideal one — never propose a change that could visibly break
     the UI just to hit a ratio band exactly.
   - Flag fixed-px padding on containers whose text uses a fluid `clamp()` font token, since the
     ratio drifts >~30% between 320px and 1536px. Flag horizontal:vertical padding ratios beyond
     3:1 without an obvious layout reason (e.g. a horizontal nav bar).
6. **Transitions**: if `u-sb-soft-transition`/`u-sb-hard-transition` is present, confirm there's a
   real state change (hover, focus, toggle, dynamic `:class`); flag it if not. Check the duration
   (200ms vs 500ms) fits the scale of the change, and flag conflicts/duplication with a Vue
   `<Transition>` name applied to the same node.

Every element gets a row in the final table, even ones with verdict "OK, no change."

## Phase 2 — Report first (always, before touching any code)

Produce a Markdown report with:
- The Phase 0 reference table.
- One row per element from Phase 1, columns: `riga | elemento/tag | classe attuale | font-size
  risolto (px) | spaziatura/padding attuale | tipo (margin/padding/nessuno) | valore in px |
  rapporto calcolato | verdetto (OK / rimuovere / correggere valore / cambiare margin↔padding /
  tag sbagliato) | valore corretto proposto`.
- Report the same language the user is writing in (this project's user communicates in Italian —
  default to Italian for the report unless told otherwise).

The report must be exhaustive for the file — never truncate or summarize "the rest is similar,"
even for long files.

## Phase 3 — Apply the refactor (only after the report is shown in full)

Once the complete Phase 2 report has been shown, apply the corrections directly to the file, one
by one, exactly matching what the report already says (same line, same reasoning, same proposed
value) — no surprise edits. If you notice a new issue while editing that wasn't in the report,
stop, add it to the report with the same format, then apply it.

## Hard constraints

- Never skip Phase 0 — always read the 5 CSS files fresh, never rely on memorized token values.
- Cover the whole file in Phase 1 — no sampling.
- Report always precedes edits — never reorder this.
- Every applied edit must trace 1:1 back to a report row.
- Never start the dev server or run build/preview commands as part of this workflow.
- Don't rewrite the whole file — apply targeted, line-level edits only.
- Never touch color tokens (`--color-sb-*`) — out of scope.
- If a class used in the file can't be resolved because it's defined outside the 5 known files,
  mark it "da verificare" in the report and don't auto-correct it.
