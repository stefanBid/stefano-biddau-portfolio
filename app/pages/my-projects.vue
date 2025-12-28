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

// Templates - fetch on demand
const { data: templates, pending: templatesPending, error: templatesError, fetchTemplates } = useTemplates()

// State
const tabs = [
  { id: 'personalProjects', icon: 'solar:archive-bold-duotone', label: t('pages.projects.personalProjects.tabLabel') },
  { id: 'templateProject', icon: 'solar:monitor-smartphone-bold-duotone', label: t('pages.projects.sbTemplatesProject.tabLabel') },
]
const expandedProjectIds = ref<Set<string>>(new Set())
const currentTabId = ref<string>('personalProjects')

// Watch tab change to fetch templates on demand
watch(currentTabId, async (newTab) => {
  if (newTab === 'templateProject' && !templates.value) {
    await fetchTemplates()
  }
})

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

// Watch for fetch errors - SSR-safe (useNotification handles client-only internally)
watch(fetchError, (newError) => {
  if (!import.meta.client) {
    return
  } // ← GUARD CLIENT-ONLY
  if (newError) {
    error({
      title: t('pages.projects.projectError.title'),
      message: t('pages.projects.projectError.message'),
      autoClose: true,
      dismissible: true,
    })
  }
}, { immediate: true })

watch(templatesError, (newError) => {
  if (!import.meta.client) {
    return
  } // ← GUARD CLIENT-ONLY
  if (newError) {
    error({
      title: t('pages.projects.templatesError.title'),
      message: t('pages.projects.templatesError.message'),
      autoClose: true,
      dismissible: true,
    })
  }
}, { immediate: true })
</script>

<template>
  <div>
    <ThePageHero
      id="my-projects"
      :text="t('pages.projects.hero')"
    />
    <BaseTabs
      v-model:selected-tab-id="currentTabId"
      class="mt-20"
      :tabs="tabs"
    />

    <section class="pt-10 pb-20">
      <!-- Personal Projects Content -->
      <div v-if="currentTabId === 'personalProjects'" class="flex flex-col gap-20 u-sb-soft-transition">
        <div class="flex flex-col gap-3 md:gap-4 u-sb-soft-transition">
          <h2 class="ty-sb-title-xl u-sb-soft-transition">
            {{ t('pages.projects.personalProjects.title') }}
          </h2>
          <p class="ty-sb-paragraph text-sb-muted u-sb-soft-transition">
            {{ t('pages.projects.personalProjects.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 u-sb-soft-transition">
          <template v-if="pending">
            <CustomProjectsSkeleton v-for="n in 4" :key="n" />
          </template>
          <template v-else-if="fetchError || projects?.length === 0">
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
              :codebase-url="project.codebaseUrl"
              :content="project.content"
              :deployment-url="project.deployUrl"
              :image-alt="project.coverImageAlt"
              :image-src="project.coverImageSrc"
              :title="project.title"
              @toggle-description="onTriggerProject(project.id, $event)"
            />
          </template>
        </div>
      </div>

      <!-- Template Projects Content -->
      <div v-else-if="currentTabId === 'templateProject'" class="flex flex-col gap-20 u-sb-soft-transition">
        <div class="flex flex-col gap-3 md:gap-4 u-sb-soft-transition">
          <div class="flex items-center justify-center mb-4 md:mb-6 ">
            <div class="w-33 md:w-52 h-auto bg-sb-contrast rounded-xl p-4 md:p-6 shadow-[0_8px_30px_var(--color-sb-shadow)] u-sb-soft-transition flex items-center justify-center">
              <img
                alt="SBT Logo"
                class="w-full h-auto u-sb-soft-transition"
                fetchpriority="high"
                height="187"
                loading="eager"
                src="/images/sbt-logo.webp"
                width="160"
              />
            </div>
          </div>
          <h2 class="ty-sb-title-xl u-sb-soft-transition">
            {{ t('pages.projects.sbTemplatesProject.title') }}
          </h2>
          <p class="ty-sb-paragraph text-sb-muted u-sb-soft-transition">
            {{ t('pages.projects.sbTemplatesProject.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20 u-sb-soft-transition">
          <template v-if="templatesPending">
            <CustomSbTemplatesSkeleton v-for="n in 3" :key="n" />
          </template>
          <template v-else>
            <template v-if="templates && templates.length > 0">
              <CustomSbTemplatesCard
                v-for="template in templates"
                :id="template.id"
                :key="template.id"
                :codebase-url="template.codebaseUrl"
                :description="template.description"
                :icons="template.langIcons"
                :image-src="template.logoSrc"
                :title="template.title"
              />
              <CustomSbTemplatesCard
                v-for="n in 2"
                :id="n"
                :key="n"
                :description="t('pages.projects.sbTemplatesProject.comingSoonCard.paragraph')"
                :title="t('pages.projects.sbTemplatesProject.comingSoonCard.title')"
              />
            </template>
            <template v-else>
              <CustomSbTemplatesCard
                v-for="n in 3"
                :id="n"
                :key="n"
                :description="t('pages.projects.sbTemplatesProject.comingSoonCard.paragraph')"
                :title="t('pages.projects.sbTemplatesProject.comingSoonCard.title')"
              />
            </template>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
