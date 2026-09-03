---
name: add-page
description: Scaffold a new page for this Nuxt 4 portfolio — file, SEO meta, i18n keys, prerender routes. Use when asked to add/create a new page.
---

# Add a new page

1. Create `.vue` in `app/pages/`
2. Add `useSeoMeta()` with translated meta tags
3. Add translation keys to both `en.json` and `it.json`
4. Add `prerender: true` for both EN and IT routes in `nuxt.config.ts`

## Minimal page template
```vue
<script setup lang="ts">
// Dependencies
const { t } = useI18n()

// SEO
useSeoMeta({
  title: t('pageName.meta.title'),
  description: t('pageName.meta.description'),
  ogTitle: t('pageName.meta.title'),
  ogDescription: t('pageName.meta.description'),
})
</script>

<template>
  <!-- page content -->
</template>
```
