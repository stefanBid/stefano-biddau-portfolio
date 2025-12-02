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

// State
const expandedProjectIds = ref<Set<string>>(new Set())

// Events

const onTriggerProject = (projectId: string, isExpanded: boolean) => {
  const set = new Set(expandedProjectIds.value)
  if (isExpanded) {
    set.add(projectId)
  }
  else { set.delete(projectId) }
  expandedProjectIds.value = set
}

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
    <div class="grid grid-cols-1 gap-20 md:grid-cols-2 py-20">
      <template v-if="pending">
      </template>
      <template v-else>
        <template v-for="(project) in projects" :key="project.id">
          <CustomProjectsCard
            class="min-h-[400px]"
            :class="{ 'col-span-2': expandedProjectIds.has(project.id) }"
            :codebase-url="project.codebaseUrl"
            :deployment-url="project.deployUrl"
            :description="project.description"
            :image-alt="project.coverImageAlt"
            :image-src="project.coverImageSrc"
            :title="project.title"
            @toggle-description="onTriggerProject(project.id, $event)"
          />
        </template>
      </template>
    </div>
  </div>
</template>
