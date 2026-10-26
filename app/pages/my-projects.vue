<script setup lang="ts">
// Dependencies
const { t } = useI18n()
const localePath = useLocalePath()
const { pageTransition } = usePageTransition(true)
const route = useRoute()
const { isFormOpen: isContactFormOpen } = useContact()

// Data
type TabType = 'personalProjects' | 'templateProject'

const tabs = computed<{ id: TabType, label: string }[]>(() => [
  { id: 'personalProjects', label: t('pages.projects.personalProjects.tabLabel') },
  { id: 'templateProject', label: t('pages.projects.sbTemplatesProject.tabLabel') },
])

const currentTabId = computed<TabType>(() => route.path.includes('/sb-templates') ? 'templateProject' : 'personalProjects')

// Events
const onSelectTab = (tabId: string | number) => {
  navigateTo(localePath(tabId === 'templateProject' ? '/my-projects/sb-templates' : '/my-projects'))
}
</script>

<template>
  <div>
    <ThePageHero
      id="my-projects"
      image-src="/images/3d-avatar/avatar-pose-5.webp"
      :lead="t('pages.projects.lead')"
      :text="t('pages.projects.hero')"
    />
    <BaseTabs
      class="mt-8 md:mt-12"
      panel-id="projects-panel"
      :selected-tab-id="currentTabId"
      :tabs="tabs"
      @select="onSelectTab"
    />

    <section
      id="projects-panel"
      :aria-labelledby="`projects-panel-tab-${currentTabId}`"
      class="pt-10 pb-20"
      role="tabpanel"
    >
      <NuxtPage :transition="pageTransition" />
    </section>

    <CustomClosingCta @contact="isContactFormOpen = true" />
  </div>
</template>
