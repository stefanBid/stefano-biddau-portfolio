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

const { projects: projectsData } = useProjects()

// Client work first, then open source and personal projects; course exercises last
const PROJECT_ORDER = [
  'bd6a7d77-d3e5-48be-a83c-28d290f788ec',
  'acb2196a-5974-40ba-81c5-fccb58611c0b',
  'c33faabb-84a8-4f40-8d20-d864162267d6',
  'b5a5fa22-f5f0-4496-89ec-beebeb40d761',
  'a3b5168c-315a-4627-a40b-7436130a5dc7',
  '70fa96e9-9283-4a48-8ac6-e1576e2949ce',
]

const projects = computed(() => [...projectsData.value].sort((a, b) => {
  const rank = (id: string) => {
    const index = PROJECT_ORDER.indexOf(id)
    return index === -1 ? PROJECT_ORDER.length : index
  }
  return rank(a.id) - rank(b.id)
}))

// State
// Set on the client only: prerendered HTML has no hash, so it cannot drive the first render
const linkedProjectId = ref<string | null>(null)

// Events
onMounted(() => {
  watch(() => route.hash, (hash) => {
    linkedProjectId.value = hash.startsWith('#project-') ? decodeURIComponent(hash.slice('#project-'.length)) : null
    if (linkedProjectId.value) {
      // Keyboard and screen-reader users land on the linked project, not on <body>
      nextTick(() => document.getElementById(`project-title-${linkedProjectId.value}`)?.focus({ preventScroll: true }))
    }
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
          :meta="project.meta"
          :title="project.title"
        />
      </template>
    </div>
  </div>
</template>
