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

  // GLOBALS
  ogImage: '/images/card-logo.jpg',
  twitterImage: '/images/card-logo.jpg',
  twitterCard: 'summary',

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://www.stefanobiddau.com${route.fullPath}`,
})

// State

// Events
</script>

<template>
  <div>
    <ThePageHero
      id="my-skills"
      :text="t('pages.skills.hero')"
    />
  </div>
</template>
