<script setup lang="ts">
// Dependencies
const { t } = useI18n()
const localePath = useLocalePath()
const { pageTransition } = usePageTransition(true)
const route = useRoute()

// Data
type TabType = 'personalProjects' | 'templateProject'

const tabs: { id: TabType, icon: string, label: string }[] = [
  { id: 'personalProjects', icon: 'solar:archive-bold-duotone', label: t('pages.projects.personalProjects.tabLabel') },
  { id: 'templateProject', icon: 'solar:monitor-smartphone-bold-duotone', label: t('pages.projects.sbTemplatesProject.tabLabel') },
]

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
      :text="t('pages.projects.hero')"
    />
    <BaseTabs
      class="mt-20"
      :selected-tab-id="currentTabId"
      :tabs="tabs"
      @select="onSelectTab"
    />

    <section class="pt-10 pb-20">
      <NuxtPage :transition="pageTransition" />
    </section>
  </div>
</template>
