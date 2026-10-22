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
  <div class="flex flex-col gap-10 md:gap-20">
    <header class="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-6">
      <div class="shrink-0 w-20 md:w-24 bg-ink rounded-lg p-3 md:p-4 shadow-md">
        <NuxtImg
          :alt="t('pages.projects.sbTemplatesProject.logoAlt')"
          class="w-full h-auto"
          fetchpriority="high"
          height="187"
          loading="eager"
          src="/images/sbt-logos/sbt-logo.webp"
          width="160"
        />
      </div>
      <div class="flex flex-col gap-3">
        <h1 class="sb-h1 mb-0 text-balance">
          {{ t('pages.projects.sbTemplatesProject.title') }}
        </h1>
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
      class="flex items-start gap-3 md:gap-4 w-full p-4 md:p-6 rounded-lg border border-border bg-surface"
    >
      <div class="shrink-0 flex items-center justify-center size-10 rounded-lg bg-surface-2 text-primary-ink">
        <Icon aria-hidden="true" class="size-6" name="solar:code-circle-bold-duotone" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="sb-h4 text-ink">
          {{ t('pages.projects.sbTemplatesProject.comingSoonCard.title') }}
        </h3>
        <p class="sb-body text-ink-muted">
          {{ t('pages.projects.sbTemplatesProject.comingSoonCard.paragraph') }}
        </p>
      </div>
    </div>
  </div>
</template>
