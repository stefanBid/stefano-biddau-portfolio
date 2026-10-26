<script setup lang="ts">
import useTemplates from '~/composables/data/useTemplates'

definePageMeta({
  sitemap: { lastmod: '2026-09-03', changefreq: 'monthly', priority: 0.8 },
})

// Dependencies
const { t } = useI18n()
const route = useRoute()
const { cloudinaryUrl } = useCloudinary()

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
  <div class="flex flex-col gap-10 md:gap-16">
    <header class="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-6">
      <div class="shrink-0 w-20 md:w-24 bg-ink rounded-lg p-3 md:p-4 shadow-md">
        <NuxtImg
          :alt="t('pages.projects.sbTemplatesProject.logoAlt')"
          class="w-full h-auto"
          fetchpriority="high"
          height="187"
          loading="eager"
          :src="cloudinaryUrl('v1793011184/sbt-logo_wgjk4u.svg')"
          width="160"
        />
      </div>
      <div class="flex flex-col gap-3">
        <h2 class="sb-h1 mb-0 text-balance">
          {{ t('pages.projects.sbTemplatesProject.title') }}
        </h2>
        <p class="sb-body text-ink-muted mb-0">
          {{ t('pages.projects.sbTemplatesProject.description') }}
        </p>
      </div>
    </header>

    <div
      v-if="templates && templates.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20"
    >
      <CustomSbTemplatesCard
        v-for="(template, index) in templates"
        :id="template.id"
        :key="template.id"
        v-reveal="index"
        :codebase-url="template.codebaseUrl"
        :description="template.description"
        :icons="template.langIcons"
        :image-height="template.logoHeight"
        :image-src="template.logoSrc"
        :image-width="template.logoWidth"
        :title="template.title"
      />
    </div>
    <p class="sb-body text-ink-muted text-left mb-0">
      {{ t('pages.projects.sbTemplatesProject.inProgress') }}
    </p>
  </div>
</template>
