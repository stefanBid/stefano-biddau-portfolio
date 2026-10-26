<script setup lang="ts">
import useProjects from '~/composables/data/useProjects'

definePageMeta({
  sitemap: { lastmod: '2026-04-12', changefreq: 'monthly', priority: 0.9 },
})

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

// Ongoing work first, then client work and open source; personal and course exercises last, newest first
const PROJECT_ORDER = [
  'bd6a7d77-d3e5-48be-a83c-28d290f788ec',
  'acb2196a-5974-40ba-81c5-fccb58611c0b',
  '85156f53-d423-4b49-9561-4e0d46e18976',
  'e6eea13e-56a7-4150-ac8e-8a01410ca60d',
  'b5a5fa22-f5f0-4496-89ec-beebeb40d761',
  'a3b5168c-315a-4627-a40b-7436130a5dc7',
  '70fa96e9-9283-4a48-8ac6-e1576e2949ce',
]

// Thesis, personal and course exercises: listed compactly after the main work, without cover or text
const ARCHIVED_PROJECT_IDS = [
  '85156f53-d423-4b49-9561-4e0d46e18976',
  'e6eea13e-56a7-4150-ac8e-8a01410ca60d',
  'b5a5fa22-f5f0-4496-89ec-beebeb40d761',
  'a3b5168c-315a-4627-a40b-7436130a5dc7',
  '70fa96e9-9283-4a48-8ac6-e1576e2949ce',
]

const projects = computed(() => [...projectsData.value].sort((a, b) => {
  const rank = (id: string) => {
    const index = PROJECT_ORDER.indexOf(id)
    return index === -1 ? PROJECT_ORDER.length : index
  }
  return Number(b.isOngoing) - Number(a.isOngoing) || rank(a.id) - rank(b.id)
}))

const mainProjects = computed(() => projects.value.filter(project => !ARCHIVED_PROJECT_IDS.includes(project.id)))
const archivedProjects = computed(() => projects.value.filter(project => ARCHIVED_PROJECT_IDS.includes(project.id)))

// Ongoing projects span the full row; a regular card left alone in the last row of the 2-column grid does too, instead of leaving half the row empty
const fullWidthProjectIds = computed(() => {
  const ids = mainProjects.value.filter(project => project.isOngoing).map(project => project.id)
  const regular = mainProjects.value.filter(project => !project.isOngoing)
  if (regular.length % 2 === 1) {
    ids.push(regular.at(-1)!.id)
  }
  return ids
})

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
  <div class="flex flex-col gap-16 md:gap-24">
    <BaseEmptyBox
      v-if="!projects.length"
      icon="solar:laptop-minimalistic-bold-duotone"
      :message="t('pages.projects.personalProjects.noProjects.message')"
      :title="t('pages.projects.personalProjects.noProjects.title')"
    />

    <div v-if="mainProjects.length" class="grid grid-cols-1 lg:grid-cols-2 items-start gap-x-10 gap-y-10 md:gap-y-12">
      <CustomProjectsCard
        v-for="project in mainProjects"
        :id="project.id"
        :key="project.id"
        :codebase-urls="project.codebaseUrls"
        :content="project.content"
        :deployment-urls="project.deploymentUrls"
        :featured="fullWidthProjectIds.includes(project.id)"
        :image-alt="project.coverImageAlt"
        :image-fit="project.coverImageFit"
        :image-src="project.coverImageSrc"
        :initially-expanded="project.id === linkedProjectId"
        :is-ongoing="project.isOngoing"
        :meta="project.meta"
        :title="project.title"
      />
    </div>

    <section
      v-if="archivedProjects.length"
      aria-labelledby="projects-archive-title"
      class="flex flex-col gap-4"
    >
      <h2 id="projects-archive-title" class="sb-h3 mb-0">
        {{ t('pages.projects.personalProjects.archiveTitle') }}
      </h2>
      <ul class="m-0 p-0 list-none border-t border-border">
        <li
          v-for="project in archivedProjects"
          :id="`project-${project.id}`"
          :key="project.id"
          class="scroll-mt-24 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-5 border-b border-border text-left"
          :data-project-id="project.id"
        >
          <div class="flex-1 min-w-0">
            <h3
              :id="`project-title-${project.id}`"
              class="sb-h4 mb-0 text-ink text-balance outline-none"
              tabindex="-1"
            >
              {{ project.title }}
            </h3>
            <p v-if="project.meta" class="sb-small text-ink-muted text-left mt-1 mb-0">
              {{ project.meta }}
            </p>
          </div>
          <div class="flex flex-wrap gap-3 shrink-0">
            <BaseButton
              v-for="url in project.codebaseUrls"
              :key="url.code"
              size="sm"
              :to="url.code"
              type="link"
              variant="secondary"
            >
              <Icon
                aria-hidden="true"
                class="size-4"
                name="solar:code-2-line-duotone"
              />
              {{ t('pages.projects.links.code') }}
            </BaseButton>
            <BaseButton
              v-for="url in project.deploymentUrls"
              :key="url.code"
              size="sm"
              :to="url.code"
              type="link"
              variant="secondary"
            >
              <Icon
                aria-hidden="true"
                class="size-4"
                name="solar:global-line-duotone"
              />
              {{ t('pages.projects.links.live') }}
            </BaseButton>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
