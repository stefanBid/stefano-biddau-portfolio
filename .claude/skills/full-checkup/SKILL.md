---
name: full-checkup
description: Run the full maintenance sequence for this Nuxt 4 portfolio — dependency check, SEO check, build check, lint check, then decide on a documentation update. Use when asked to run a full checkup or complete maintenance pass.
---

# Full checkup

Run, in order: the `dependency-check` skill → the `seo-check` skill → the `build-check` skill → the `lint-check` skill.

If any blocking errors surface (build errors, unfixable lint errors), stop and report them — do not proceed to docs update.

Otherwise, decide whether `README.md` needs updating (see the `update-documentation` skill's sync rule), and summarise all four results plus the doc decision.
