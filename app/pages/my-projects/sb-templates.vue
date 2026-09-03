<script setup lang="ts">
import useTemplates from '~/composables/data/useTemplates'

// Dependencies
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.sbTemplates.title'),
  description: () => t('meta.sbTemplates.description'),
  ogTitle: () => t('meta.sbTemplates.title'),
  ogDescription: () => t('meta.sbTemplates.description'),
  twitterTitle: () => t('meta.sbTemplates.title'),
  twitterDescription: () => t('meta.sbTemplates.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})

const { templates } = useTemplates()
</script>

<template>
  <div class="flex flex-col gap-20 u-sb-soft-transition">
    <div class="flex flex-col gap-3 md:gap-4 u-sb-soft-transition">
      <div class="flex items-center justify-center mb-4 md:mb-6 ">
        <div class="w-33 md:w-52 h-auto bg-sb-contrast rounded-xl p-4 md:p-6 shadow-[0_8px_30px_var(--color-sb-shadow)] u-sb-soft-transition flex items-center justify-center">
          <NuxtImg
            alt="SBT Logo"
            class="w-full h-auto u-sb-soft-transition"
            fetchpriority="high"
            height="187"
            loading="eager"
            src="/images/sbt-logos/sbt-logo.webp"
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

    <div
      v-if="templates && templates.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20 u-sb-soft-transition"
    >
      <CustomSbTemplatesCard
        v-for="template in templates"
        :id="template.id"
        :key="template.id"
        :codebase-url="template.codebaseUrl"
        :description="template.description"
        :icons="template.langIcons"
        :image-height="template.logoHeight"
        :image-src="template.logoSrc"
        :image-width="template.logoWidth"
        :title="template.title"
      />
    </div>
    <div
      class="flex items-start gap-3 md:gap-4 w-full p-4 md:p-6 rounded-xl border bg-sb-info-bg border-sb-info u-sb-soft-transition"
    >
      <div class="shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-sb-surface text-sb-info u-sb-soft-transition">
        <Icon class="size-5 md:size-6" name="solar:code-circle-bold-duotone" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="ty-sb-subtitle text-sb-contrast u-sb-soft-transition">
          {{ t('pages.projects.sbTemplatesProject.comingSoonCard.title') }}
        </h3>
        <p class="ty-sb-paragraph text-sb-muted u-sb-soft-transition">
          {{ t('pages.projects.sbTemplatesProject.comingSoonCard.paragraph') }}
        </p>
      </div>
    </div>
  </div>
</template>
