---
name: build-check
description: Typecheck and build this Nuxt 4 portfolio, collecting TypeScript and build errors/warnings. Use when asked to check or verify the build, or run a build check.
---

# Build check

1. `npx nuxt typecheck` — collect TypeScript errors (file, line, error code, description).
2. `npm run build` — collect build errors (`Vite error`, `Nitro error`, `Module not found`, `SSR error`, `Other`) and warnings.
3. Report categorised results; build errors are blocking, type errors and warnings are not necessarily.
