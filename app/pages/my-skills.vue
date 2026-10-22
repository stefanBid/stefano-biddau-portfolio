<script setup lang="ts">
import useSkills from '~/composables/data/useSkills'

// Dependencies
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.skills.title'),
  description: () => t('meta.skills.description'),
  ogTitle: () => t('meta.skills.title'),
  ogDescription: () => t('meta.skills.description'),
  twitterTitle: () => t('meta.skills.title'),
  twitterDescription: () => t('meta.skills.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})

// State
const { countByTypes } = useSkills()

const openSkillsDialog = ref<boolean>(false)
const filterTypes = ref<SkillType[]>([])

const PRESET_TYPES: Record<'frontend' | 'backend' | 'design', SkillType[]> = {
  frontend: ['feLang', 'feFramework'],
  backend: ['beLang', 'beFramework', 'database'],
  design: ['tool'],
}

const ICONS = {
  frontend: [
    'logos:html-5',
    'logos:css-3',
    'logos:javascript',
    'logos:typescript-icon',
    'logos:vue',
    'logos:nuxt-icon',
    'logos:angular-icon',
    'logos:flutter',
  ],
  backend: [
    'logos:nodejs-icon',
    'logos:java',
    'logos:spring-icon',
    'logos:strapi-icon',
    'logos:mysql-icon',
    'logos:graphql',
  ],
  design: [
    'logos:figma',
    'logos:adobe-xd',
    'logos:storybook-icon',
    'logos:chromatic-icon',
  ],
}

// Events
const onOpenSkillsDialog = (filterPresetType?: keyof typeof PRESET_TYPES) => {
  filterTypes.value = filterPresetType ? PRESET_TYPES[filterPresetType] : []
  openSkillsDialog.value = true
}

const onCloseSkillsDialog = () => {
  openSkillsDialog.value = false
}
</script>

<template>
  <div>
    <ThePageHero
      id="my-skills"
      :text="t('pages.skills.hero')"
    />
    <section :aria-label="t('a11y.skillsSection')" class=" w-full py-20 flex flex-col gap-20">
      <!-- CARD FRONTEND SKILLS -->
      <BaseCard
        class="p-0!"
        full-custom-content
        variant="dark"
      >
        <!-- Relative wrapper that represents the visible area of the card -->
        <div class="relative h-fit">
          <!-- Left content (not clipped) -->
          <div class="flex items-center">
            <div class="min-h-96 w-full lg:w-2/3 h-full flex flex-col items-center md:items-start justify-center z-10 p-4 md:p-6 bg-surface md:bg-surface/70 rounded-lg">
              <h2 class="sb-h3 mb-0 text-center md:text-left">
                {{ t('pages.skills.frontendCard.title') }}
              </h2>
              <p class="sb-body mt-3 md:mt-4 mb-0">
                {{ t('pages.skills.frontendCard.paragraph') }}
              </p>
              <div class="mt-6 md:mt-8">
                <BaseButton variant="primary" @click="onOpenSkillsDialog('frontend')">
                  {{ t('pages.skills.frontendCard.buttonText', { count: countByTypes(PRESET_TYPES.frontend) }) }}
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Overlay that ONLY clips the solar system -->
          <div
            class="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
          >
            <!-- Solar system is positioned normally but gets clipped by the overlay bounds -->
            <div class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 hidden md:block">
              <CustomSolarSystem :planets-icon="ICONS.frontend" />
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- CARD BACKEND SKILLS -->
      <BaseCard
        class="p-0!"
        full-custom-content
        variant="dark"
      >
        <!-- Relative wrapper that represents the visible area of the card -->
        <div class="relative h-fit">
          <!-- Left content (not clipped) -->
          <div class="flex items-center">
            <div class="min-h-96 w-full lg:w-2/3 h-full flex flex-col items-center md:items-start justify-center z-10 p-4 md:p-6 bg-surface md:bg-surface/70 rounded-lg">
              <h2 class="sb-h3 mb-0 text-center md:text-left">
                {{ t('pages.skills.backendCard.title') }}
              </h2>
              <p class="sb-body mt-3 md:mt-4 mb-0">
                {{ t('pages.skills.backendCard.paragraph') }}
              </p>
              <div class="mt-6 md:mt-8">
                <BaseButton variant="primary" @click="onOpenSkillsDialog('backend')">
                  {{ t('pages.skills.backendCard.buttonText', { count: countByTypes(PRESET_TYPES.backend) }) }}
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Overlay that ONLY clips the solar system -->
          <div
            class="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
          >
            <!-- Solar system is positioned normally but gets clipped by the overlay bounds -->
            <div class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 hidden md:block">
              <CustomSolarSystem :planets-icon="ICONS.backend" />
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- CARD DESIGN SKILLS -->
      <BaseCard
        class="p-0!"
        full-custom-content
        variant="dark"
      >
        <!-- Relative wrapper that represents the visible area of the card -->
        <div class="relative h-fit">
          <!-- Left content (not clipped) -->
          <div class="flex items-center">
            <div class="min-h-96 w-full lg:w-2/3 h-full flex flex-col items-center md:items-start justify-center z-10 p-4 md:p-6 bg-surface md:bg-surface/70 rounded-lg">
              <h2 class="sb-h3 mb-0 text-center md:text-left">
                {{ t('pages.skills.designCard.title') }}
              </h2>
              <p class="sb-body mt-3 md:mt-4 mb-0">
                {{ t('pages.skills.designCard.paragraph') }}
              </p>
              <div class="mt-6 md:mt-8">
                <BaseButton variant="primary" @click="onOpenSkillsDialog('design')">
                  {{ t('pages.skills.designCard.buttonText', { count: countByTypes(PRESET_TYPES.design) }) }}
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Overlay that ONLY clips the solar system -->
          <div
            class="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
          >
            <!-- Solar system is positioned normally but gets clipped by the overlay bounds -->
            <div class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 hidden md:block">
              <CustomSolarSystem :planets-icon="ICONS.design" />
            </div>
          </div>
        </div>
      </BaseCard>
    </section>
    <LazyCustomSkillsDialog
      :filter-types="filterTypes"
      :open-dialog="openSkillsDialog"
      @close-dialog="onCloseSkillsDialog"
    />
  </div>
</template>
