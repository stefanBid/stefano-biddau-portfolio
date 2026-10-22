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
  <div class="flex flex-col gap-20">
    <div class="grid gap-3 md:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-x-12 lg:items-start">
      <div class="flex items-center justify-center mb-4 md:mb-6 lg:col-span-2">
        <div class="w-33 md:w-52 h-auto bg-ink rounded-lg p-4 md:p-6 shadow-md flex items-center justify-center">
          <NuxtImg
            alt="SBT Logo"
            class="w-full h-auto"
            fetchpriority="high"
            height="187"
            loading="eager"
            src="/images/sbt-logos/sbt-logo.webp"
            width="160"
          />
        </div>
      </div>
      <h2 class="sb-h1 mb-0">
        {{ t('pages.projects.sbTemplatesProject.title') }}
      </h2>
      <p class="sb-body text-ink-muted">
        {{ t('pages.projects.sbTemplatesProject.description') }}
      </p>
    </div>

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
      <div class="shrink-0 flex items-center justify-center size-10 rounded-lg bg-surface-2 text-primary">
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
