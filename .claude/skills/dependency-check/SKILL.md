---
name: dependency-check
description: Check outdated npm dependencies for this Nuxt 4 portfolio, apply safe updates, and run a security audit. Use when asked to check/update dependencies, run a dependency check, or audit for vulnerabilities.
---

# Dependency check

1. Read `package.json`, run `npm outdated`.
2. Classify each outdated package: **safe** (latest has same major as declared constraint) vs **needs attention** (major bump, or changelog reveals a breaking concern for `nuxt`/`vue`/`vite` peer deps — check release notes before trusting a minor/patch bump).
3. Apply safe updates by editing `package.json` version constraints directly (not `npm update`, which only touches the lockfile), then run `npm run si`.
4. Run `npm fund` (informational), `npm audit`, then `npm audit fix`.
5. **Never run `npm audit fix --force`** — it bypasses semver and can silently introduce breaking major bumps. If a vulnerability needs it, stop and report (package, advisory, severity) instead.
6. Report: auto-updated packages, packages needing attention (with reason), vulnerabilities fixed vs remaining (direct vs transitive).
