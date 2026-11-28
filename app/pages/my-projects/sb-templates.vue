<script setup lang="ts">
import useTemplates from '~/composables/data/useTemplates'
import type { SbTemplateGroup } from '~/composables/data/useTemplates'

definePageMeta({
  sitemap: { lastmod: '2026-11-28', changefreq: 'monthly', priority: 0.8 },
})

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

const GROUPS: SbTemplateGroup[] = ['web', 'mobile']

const groups = computed(() => GROUPS
  .map(key => ({ key, templates: templates.value.filter(template => template.group === key) }))
  .filter(group => group.templates.length > 0))
</script>

<template>
  <div class="flex flex-col gap-14 md:gap-20">
    <section
      v-for="group in groups"
      :key="group.key"
      :aria-labelledby="`templates-group-${group.key}`"
    >
      <header class="flex flex-col gap-1 border-b border-border pb-4">
        <h2 :id="`templates-group-${group.key}`" class="sb-h2 mb-0">
          {{ t(`pages.projects.sbTemplatesProject.groups.${group.key}.title`) }}
        </h2>
        <p class="text-ink-muted text-left mb-0">
          {{ t(`pages.projects.sbTemplatesProject.groups.${group.key}.description`) }}
        </p>
      </header>
      <div class="divide-y divide-border">
        <CustomSbTemplatesRow
          v-for="(template, index) in group.templates"
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
    </section>
    <p class="sb-body text-ink-muted text-left mb-0">
      {{ t('pages.projects.sbTemplatesProject.inProgress') }}
    </p>
  </div>
</template>
