<script setup lang="ts">
import useLegalDocument from '~/composables/data/useLegalDocument'

definePageMeta({
  sitemap: { lastmod: '2026-10-26', changefreq: 'yearly', priority: 0.5 },
})

// Dependencies
const { t } = useI18n()
const route = useRoute()
const { legalDocument } = useLegalDocument('terms')

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.terms.title'),
  description: () => t('meta.terms.description'),
  ogTitle: () => t('meta.terms.title'),
  ogDescription: () => t('meta.terms.description'),
  twitterTitle: () => t('meta.terms.title'),
  twitterDescription: () => t('meta.terms.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})
</script>

<template>
  <CustomLegalDocument
    id="terms"
    :legal-document="legalDocument"
    related="privacy-policy"
    updated-iso="2026-10-26"
  />
</template>
