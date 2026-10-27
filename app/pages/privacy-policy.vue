<script setup lang="ts">
import useLegalDocument from '~/composables/data/useLegalDocument'

definePageMeta({
  sitemap: { lastmod: '2026-10-27', changefreq: 'yearly', priority: 0.5 },
})

// Dependencies
const { t } = useI18n()
const route = useRoute()
const { legalDocument } = useLegalDocument('privacy')

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.privacy.title'),
  description: () => t('meta.privacy.description'),
  ogTitle: () => t('meta.privacy.title'),
  ogDescription: () => t('meta.privacy.description'),
  twitterTitle: () => t('meta.privacy.title'),
  twitterDescription: () => t('meta.privacy.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})
</script>

<template>
  <CustomLegalDocument
    id="privacy"
    :legal-document="legalDocument"
    related="terms-and-conditions"
    updated-iso="2026-10-27"
  />
</template>
