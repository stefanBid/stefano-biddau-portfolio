---
name: update-documentation
description: Sync README.md with the actual codebase state for this Nuxt 4 portfolio — outdated sections, missing components/composables/pages, wrong versions, broken links. Use when asked to update documentation, sync the README, or after changes that affect documented structure.
---

# Update documentation (`README.md`)

1. Read `README.md`, `package.json`, `nuxt.config.ts`, `CLAUDE.md`, and the full `app/` tree in parallel.
2. Diff documented state vs actual codebase: outdated sections, missing components/composables/pages, wrong versions, broken links.
3. Rewrite only the affected sections (full rewrite only if explicitly asked). Required chapters: Overview, Getting Started, Project Structure, Design System, Components, Pages & Routing, Server API, Composables & Utils, i18n, Deployment, Dependencies — Server API and Deployment sections are mandatory, never omit them.
4. Don't invent unverifiable information — omit or mark `TBD`.

## Documentation sync rule

Every change that creates a discrepancy with `README.md` **must** be followed by a targeted documentation update in the same session. This applies to: new/removed/renamed components, pages, composables, utils, layouts; prompt files; instruction files; dependencies; `nuxt.config.ts` changes; structural changes.

Edit only the affected sections — do not rewrite the full README unless asked.
