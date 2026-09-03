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
const expandedProjectIds = ref<Set<string>>(new Set())

// Events

const onTriggerProject = (projectId: string, isExpanded: boolean) => {
  const set = new Set(expandedProjectIds.value)
  if (isExpanded) {
    set.add(projectId)
    // Scroll to milestone with offset for header
    nextTick(() => {
      if (!import.meta.client) {
        return
      }

      const milestoneElement = document.querySelector(`[data-project-id="${projectId}"]`)
      if (milestoneElement) {
        const headerOffset = 80 // Header height + some padding
        const elementPosition = milestoneElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    })
  }
  else { set.delete(projectId) }
  expandedProjectIds.value = set
}
</script>

<template>
  <div class="flex flex-col gap-20 u-sb-soft-transition">
    <div class="flex flex-col gap-3 md:gap-4 u-sb-soft-transition">
      <h2 class="ty-sb-title-xl u-sb-soft-transition">
        {{ t('pages.projects.personalProjects.title') }}
      </h2>
      <p class="ty-sb-paragraph text-sb-muted u-sb-soft-transition">
        {{ t('pages.projects.personalProjects.description') }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 u-sb-soft-transition">
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
          :class="{ 'lg:col-span-2': expandedProjectIds.has(project.id) }"
          :codebase-urls="project.codebaseUrls"
          :content="project.content"
          :deployment-urls="project.deploymentUrls"
          :image-alt="project.coverImageAlt"
          :image-src="project.coverImageSrc"
          :title="project.title"
          @toggle-description="onTriggerProject(project.id, $event)"
        />
      </template>
    </div>
  </div>
</template>
