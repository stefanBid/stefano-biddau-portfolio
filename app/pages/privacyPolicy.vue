<script setup lang="ts">
// Dependencies
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.privacy.title'),
  description: () => t('meta.privacy.description'),
  ogTitle: () => t('meta.privacy.title'),
  ogDescription: () => t('meta.privacy.description'),
  twitterTitle: () => t('meta.privacy.title'),
  twitterDescription: () => t('meta.privacy.description'),

  // GLOBALS
  ogImage: '/images/card-logo.jpg',
  twitterImage: '/images/card-logo.jpg',
  twitterCard: 'summary',

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://www.stefanobiddau.com${route.fullPath}`,
})

const lastUpdate = computed(() => {
  const date = new Date('2025-11-18')
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
})
</script>

<template>
  <div class="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24">
    <article class="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
      <!-- Header -->
      <header class="space-y-4 sm:space-y-5 md:space-y-6 text-center">
        <h1 class="ty-sb-hero u-sb-soft-transition">
          {{ t('privacy.title') }}
        </h1>
        <p class="ty-sb-subtitle text-sb-muted u-sb-soft-transition">
          {{ t('privacy.subtitle') }}
        </p>
        <p class="ty-sb-label text-sb-muted/70 u-sb-soft-transition">
          {{ t('privacy.lastUpdate') }}: {{ lastUpdate }}
        </p>
      </header>

      <hr class="border-sb-border u-sb-soft-transition" />

      <!-- Introduction -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title-xl u-sb-soft-transition">
          {{ t('privacy.intro.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('privacy.intro.content') }}
        </p>
      </section>

      <!-- Section 1: Data Controller -->
      <section class="bg-sb-surface p-6 sm:p-8 md:p-10 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('privacy.dataController.title') }}
        </h2>
        <div class="space-y-3 sm:space-y-4">
          <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
            {{ t('privacy.dataController.name') }}: <span class="text-sb-contrast">Stefano Biddau</span>
          </p>
          <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
            {{ t('privacy.dataController.email') }}:
            <a
              class="text-sb-accent hover:text-sb-accent-hover underline underline-offset-4 u-sb-soft-transition u-sb-focus rounded"
              href="mailto:biddau.stefano99@gmail.com"
            >
              biddau.stefano99@gmail.com
            </a>
          </p>
        </div>
      </section>

      <!-- Section 2: Data Collected -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('privacy.dataCollected.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('privacy.dataCollected.intro') }}
        </p>
        <ul class="space-y-3 sm:space-y-4 ml-4 sm:ml-6">
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span><strong class="text-sb-contrast">{{ t('privacy.dataCollected.name') }}:</strong> {{ t('privacy.dataCollected.nameDesc') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span><strong class="text-sb-contrast">{{ t('privacy.dataCollected.email') }}:</strong> {{ t('privacy.dataCollected.emailDesc') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span><strong class="text-sb-contrast">{{ t('privacy.dataCollected.message') }}:</strong> {{ t('privacy.dataCollected.messageDesc') }}</span>
          </li>
        </ul>
      </section>

      <!-- Section 3: Purpose -->
      <section class="bg-sb-surface-2 p-6 sm:p-8 md:p-10 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('privacy.purpose.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('privacy.purpose.content') }}
        </p>
      </section>

      <!-- Section 4: Legal Basis -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('privacy.legalBasis.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('privacy.legalBasis.content') }}
        </p>
      </section>

      <!-- Section 5: Third Parties -->
      <section class="bg-sb-surface p-6 sm:p-8 md:p-10 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('privacy.thirdParties.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('privacy.thirdParties.intro') }}
        </p>
        <div class="space-y-2 sm:space-y-3">
          <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
            <strong class="text-sb-contrast">EmailJS</strong> - {{ t('privacy.thirdParties.emailjs') }}
          </p>
          <p class="ty-sb-label text-sb-muted/70 u-sb-soft-transition">
            {{ t('privacy.thirdParties.privacyPolicy') }}:
            <a
              class="text-sb-accent hover:text-sb-accent-hover underline underline-offset-4 u-sb-soft-transition u-sb-focus rounded"
              href="https://www.emailjs.com/legal/privacy-policy/"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://www.emailjs.com/legal/privacy-policy/
            </a>
          </p>
        </div>
      </section>

      <!-- Section 6: Data Retention -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('privacy.dataRetention.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('privacy.dataRetention.content') }}
        </p>
      </section>

      <!-- Section 7: Your Rights -->
      <section class="bg-sb-surface-2 p-6 sm:p-8 md:p-10 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('privacy.yourRights.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('privacy.yourRights.intro') }}
        </p>
        <ul class="space-y-2 sm:space-y-3 ml-4 sm:ml-6">
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('privacy.yourRights.access') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('privacy.yourRights.rectification') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('privacy.yourRights.erasure') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('privacy.yourRights.restriction') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('privacy.yourRights.portability') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('privacy.yourRights.objection') }}</span>
          </li>
        </ul>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition pt-3 sm:pt-4">
          {{ t('privacy.yourRights.contact') }}:
          <a
            class="text-sb-accent hover:text-sb-accent-hover underline underline-offset-4 u-sb-soft-transition u-sb-focus rounded"
            href="mailto:biddau.stefano99@gmail.com"
          >
            biddau.stefano99@gmail.com
          </a>
        </p>
      </section>

      <!-- Section 8: Changes -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('privacy.changes.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('privacy.changes.content') }}
        </p>
      </section>

      <!-- Back to Home -->
      <div class="flex justify-center pt-6 sm:pt-8 md:pt-10">
        <NuxtLink
          class="ty-sb-btn-label bg-sb-accent hover:bg-sb-accent-hover border border-sb-accent-border text-sb-contrast px-6 py-3 rounded-xl u-sb-soft-transition u-sb-focus inline-flex items-center gap-2"
          :to="localePath('index')"
        >
          <Icon class="size-5" name="solar:arrow-left-line-duotone" />
          {{ t('privacy.backHome') }}
        </NuxtLink>
      </div>
    </article>
  </div>
</template>
