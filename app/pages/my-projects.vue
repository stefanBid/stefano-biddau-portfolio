<script setup lang="ts">
// Dependencies
const { t } = useI18n()
const localePath = useLocalePath()
const { pageTransition } = usePageTransition(true)
const route = useRoute()
const { isFormOpen: isContactFormOpen } = useContact()
const { cloudinaryUrl } = useCloudinary()
const { navigatingFromTab } = usePageTransition()

// Data
type TabType = 'personalProjects' | 'templateProject'

const tabs = computed<{ id: TabType, label: string }[]>(() => [
  { id: 'personalProjects', label: t('pages.projects.personalProjects.tabLabel') },
  { id: 'templateProject', label: t('pages.projects.sbTemplatesProject.tabLabel') },
])

const currentTabId = computed<TabType>(() => route.path.includes('/sb-templates') ? 'templateProject' : 'personalProjects')

const hero = computed(() => {
  if (currentTabId.value === 'templateProject') {
    return {
      text: t('pages.projects.sbTemplatesProject.hero'),
      lead: t('pages.projects.sbTemplatesProject.lead'),
      imageSrc: cloudinaryUrl('v1793011184/sbt-logo_wgjk4u.svg'),
      imageKind: 'logo' as const,
    }
  }
  return {
    text: t('pages.projects.hero'),
    lead: t('pages.projects.lead'),
    imageSrc: '/images/3d-avatar/avatar-pose-6.webp',
    imageKind: 'avatar' as const,
  }
})

// Events
const onSelectTab = (tabId: string | number) => {
  navigatingFromTab.value = true
  navigateTo(localePath(tabId === 'templateProject' ? '/my-projects/sb-templates' : '/my-projects'))
}
</script>

<template>
  <div>
    <ThePageHero
      id="my-projects"
      :key="currentTabId"
      :image-kind="hero.imageKind"
      :image-src="hero.imageSrc"
      :lead="hero.lead"
      :text="hero.text"
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
