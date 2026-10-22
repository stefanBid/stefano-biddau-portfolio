<script setup lang="ts">
import useProjects from '~/composables/data/useProjects'

// Dependencies
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.projects.title'),
  description: () => t('meta.projects.description'),
  ogTitle: () => t('meta.projects.title'),
  ogDescription: () => t('meta.projects.description'),
  twitterTitle: () => t('meta.projects.title'),
  twitterDescription: () => t('meta.projects.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})

const { projects } = useProjects()

// State
// Set on the client only: prerendered HTML has no hash, so it cannot drive the first render
const linkedProjectId = ref<string | null>(null)

// Events
onMounted(() => {
  watch(() => route.hash, (hash) => {
    linkedProjectId.value = hash.startsWith('#project-') ? decodeURIComponent(hash.slice('#project-'.length)) : null
  }, { immediate: true })
})
</script>

<template>
  <div class="flex flex-col gap-10 md:gap-20">
    <header class="flex flex-col gap-3">
      <h2 class="sb-h1 mb-0 text-balance">
        {{ t('pages.projects.personalProjects.title') }}
      </h2>
      <p class="sb-body text-ink-muted mb-0">
        {{ t('pages.projects.personalProjects.description') }}
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-16 items-start">
      <template v-if="!projects || projects.length === 0">
        <div class="col-span-2">
          <BaseEmptyBox
            icon="solar:laptop-minimalistic-bold-duotone"
            :message="t('pages.projects.personalProjects.noProjects.message')"
            :title="t('pages.projects.personalProjects.noProjects.title')"
          />
        </div>
      </template>
      <template v-else>
        <CustomProjectsCard
          v-for="project in projects"
          :id="project.id"
          :key="project.id"
          :codebase-urls="project.codebaseUrls"
          :content="project.content"
          :deployment-urls="project.deploymentUrls"
          :image-alt="project.coverImageAlt"
          :image-src="project.coverImageSrc"
          :initially-expanded="project.id === linkedProjectId"
          :title="project.title"
        />
      </template>
    </div>
  </div>
</template>
