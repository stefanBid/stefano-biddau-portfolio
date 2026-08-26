---
name: lint-check
description: Run ESLint auto-fix and report remaining lint warnings/errors for this Nuxt 4 portfolio. Use when asked to check or fix lint issues, or run a lint check.
---

# Lint check

1. `npm run lint:fix`, note files touched.
2. `npm run lint`, categorise remaining diagnostics as warnings (non-blocking) vs errors (blocking).
3. **Never silence with `// eslint-disable`** — fix in code.
4. Report files auto-fixed, remaining warnings, remaining errors (file:line, rule, description).
