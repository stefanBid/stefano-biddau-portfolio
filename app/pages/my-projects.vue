<script setup lang="ts">
// Dependencies
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.projects.title'),
  description: () => t('meta.projects.description'),
  ogTitle: () => t('meta.projects.ogTitle'),
  ogDescription: () => t('meta.projects.description'),
  twitterTitle: () => t('meta.projects.ogTitle'),
  twitterDescription: () => t('meta.projects.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://www.stefanobiddau.com${route.fullPath}`,
})

const { fetchProjects } = useProjects()
const { error } = useNotification()
const { data: projects, pending, error: fetchError } = fetchProjects()

// Events
// Watch for fetch errors - SSR-safe (useNotification handles client-only internally)
watch(fetchError, (newError) => {
  if (!import.meta.client) {
    return
  } // ← GUARD CLIENT-ONLY
  if (newError) {
    error({
      title: t('pages.projects.projectsError.title'),
      message: t('pages.projects.projectsError.message'),
      autoClose: true,
      dismissible: true,
    })
  }
})
</script>

<template>
  <div>
    <ThePageHero
      id="my-projects"
      :text="t('pages.projects.hero')"
    />
    <div class="">
    </div>
  </div>
</template>
