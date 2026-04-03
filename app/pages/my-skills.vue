<script setup lang="ts">
// Dependencies
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.skills.title'),
  description: () => t('meta.skills.description'),
  ogTitle: () => t('meta.skills.ogTitle'),
  ogDescription: () => t('meta.skills.description'),
  twitterTitle: () => t('meta.skills.ogTitle'),
  twitterDescription: () => t('meta.skills.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})

// State
const openSkillsDialog = ref<boolean>(false)
const skillsPreset = ref<SkillsFilterPreset | undefined>(undefined)

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
const onOpenSkillsDialog = (filterPresetType?: 'frontend' | 'backend' | 'design') => {
  switch (filterPresetType) {
    case 'frontend':
      skillsPreset.value = {
        key: '',
        filters: [
          'feLang',
          'feFramework',
        ],
      }
      break
    case 'backend':
      skillsPreset.value = {
        key: '',
        filters: [
          'beLang',
          'beFramework',
          'database',
        ],
      }
      break
    case 'design':
      skillsPreset.value = {
        key: '',
        filters: [
          'tool',
        ],
      }
      break
    default:
      skillsPreset.value = undefined
      break
  }
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
    <section aria-label="Skills and Technologies" class=" w-full py-20 flex flex-col gap-20">
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
            <div class="min-h-117.5 w-full lg:w-2/3 h-full flex flex-col items-center md:items-start justify-center z-10 p-4 md:p-6 bg-sb-surface/70 rounded-xl u-sb-soft-transition">
              <h2 class="ty-sb-title text-center md:text-left u-sb-soft-transition">
                {{ t('pages.skills.frontendCard.title') }}
              </h2>
              <p class="ty-sb-paragraph text-justify mt-3 md:mt-4 u-sb-soft-transition">
                {{ t('pages.skills.frontendCard.paragraph') }}
              </p>
              <div class="mt-6 md:mt-8 u-sb-soft-transition">
                <BaseButton variant="primary" @click="onOpenSkillsDialog('frontend')">
                  {{ t('pages.skills.frontendCard.buttonText') }}
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Overlay that ONLY clips the solar system -->
          <div
            class="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
          >
            <!-- Solar system is positioned normally but gets clipped by the overlay bounds -->
            <div class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
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
            <div class="min-h-117.5 w-full lg:w-2/3 h-full flex flex-col items-center md:items-start justify-center z-10 p-4 md:p-6 bg-sb-surface/70 rounded-xl u-sb-soft-transition">
              <h2 class="ty-sb-title text-center md:text-left u-sb-soft-transition">
                {{ t('pages.skills.backendCard.title') }}
              </h2>
              <p class="ty-sb-paragraph text-justify mt-3 md:mt-4 u-sb-soft-transition">
                {{ t('pages.skills.backendCard.paragraph') }}
              </p>
              <div class="mt-6 md:mt-8 u-sb-soft-transition">
                <BaseButton variant="primary" @click="onOpenSkillsDialog('backend')">
                  {{ t('pages.skills.backendCard.buttonText') }}
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Overlay that ONLY clips the solar system -->
          <div
            class="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
          >
            <!-- Solar system is positioned normally but gets clipped by the overlay bounds -->
            <div class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
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
            <div class="min-h-117.5 w-full lg:w-2/3 h-full flex flex-col items-center md:items-start justify-center z-10 p-4 md:p-6 bg-sb-surface/70 rounded-xl u-sb-soft-transition">
              <h2 class="ty-sb-title text-center md:text-left u-sb-soft-transition">
                {{ t('pages.skills.designCard.title') }}
              </h2>
              <p class="ty-sb-paragraph text-justify mt-3 md:mt-4 u-sb-soft-transition">
                {{ t('pages.skills.designCard.paragraph') }}
              </p>
              <div class="mt-6 md:mt-8 u-sb-soft-transition">
                <BaseButton variant="primary" @click="onOpenSkillsDialog('design')">
                  {{ t('pages.skills.designCard.buttonText') }}
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Overlay that ONLY clips the solar system -->
          <div
            class="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
          >
            <!-- Solar system is positioned normally but gets clipped by the overlay bounds -->
            <div class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
              <CustomSolarSystem :planets-icon="ICONS.design" />
            </div>
          </div>
        </div>
      </BaseCard>
    </section>
    <CustomSkillsDialog
      :filter-preset="skillsPreset"
      :open-dialog="openSkillsDialog"
      @close-dialog="onCloseSkillsDialog"
    />
  </div>
</template>
