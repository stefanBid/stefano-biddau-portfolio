<script setup lang="ts">
// Dependencies
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.terms.title'),
  description: () => t('meta.terms.description'),
  ogTitle: () => t('meta.terms.title'),
  ogDescription: () => t('meta.terms.description'),
  twitterTitle: () => t('meta.terms.title'),
  twitterDescription: () => t('meta.terms.description'),

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
          {{ t('pages.terms.title') }}
        </h1>
        <p class="ty-sb-subtitle text-sb-muted u-sb-soft-transition">
          {{ t('pages.terms.subtitle') }}
        </p>
        <p class="ty-sb-label text-sb-muted/70 u-sb-soft-transition">
          {{ t('pages.terms.lastUpdate') }}: {{ lastUpdate }}
        </p>
      </header>

      <hr class="border-sb-border u-sb-soft-transition" />

      <!-- Introduction -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title-xl u-sb-soft-transition">
          {{ t('pages.terms.intro.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.intro.content') }}
        </p>
      </section>

      <!-- Section 1: Acceptance -->
      <section class="bg-sb-surface p-6 sm:p-8 md:p-10 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.acceptance.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.acceptance.content') }}
        </p>
      </section>

      <!-- Section 2: Use of Website -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.useOfWebsite.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.useOfWebsite.intro') }}
        </p>
        <ul class="space-y-2 sm:space-y-3 ml-4 sm:ml-6">
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('pages.terms.useOfWebsite.point1') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('pages.terms.useOfWebsite.point2') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('pages.terms.useOfWebsite.point3') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('pages.terms.useOfWebsite.point4') }}</span>
          </li>
        </ul>
      </section>

      <!-- Section 3: Intellectual Property -->
      <section class="bg-sb-surface-2 p-6 sm:p-8 md:p-10 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.intellectualProperty.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.intellectualProperty.content') }}
        </p>
      </section>

      <!-- Section 4: Contact Form -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.contactForm.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.contactForm.intro') }}
        </p>
        <ul class="space-y-2 sm:space-y-3 ml-4 sm:ml-6">
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('pages.terms.contactForm.point1') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('pages.terms.contactForm.point2') }}</span>
          </li>
          <li class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition flex gap-3">
            <span class="text-sb-accent shrink-0">•</span>
            <span>{{ t('pages.terms.contactForm.point3') }}</span>
          </li>
        </ul>
      </section>

      <!-- Section 5: Third-Party Links -->
      <section class="bg-sb-surface p-6 sm:p-8 md:p-10 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.thirdPartyLinks.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.thirdPartyLinks.content') }}
        </p>
      </section>

      <!-- Section 6: Disclaimer -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.disclaimer.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.disclaimer.content') }}
        </p>
      </section>

      <!-- Section 7: Limitation of Liability -->
      <section class="bg-sb-surface-2 p-6 sm:p-8 md:p-10 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.liability.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.liability.content') }}
        </p>
      </section>

      <!-- Section 8: Changes to Terms -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.changes.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.changes.content') }}
        </p>
      </section>

      <!-- Section 9: Governing Law -->
      <section class="bg-sb-surface p-6 sm:p-8 md:p-10 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.governingLaw.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.governingLaw.content') }}
        </p>
      </section>

      <!-- Section 10: Contact -->
      <section class="space-y-4 sm:space-y-5">
        <h2 class="ty-sb-title u-sb-soft-transition">
          {{ t('pages.terms.contact.title') }}
        </h2>
        <p class="ty-sb-paragraph text-sb-muted leading-relaxed u-sb-soft-transition">
          {{ t('pages.terms.contact.content') }}:
          <a
            class="text-sb-accent hover:text-sb-accent-hover underline underline-offset-4 u-sb-soft-transition u-sb-focus rounded"
            href="mailto:stefanobiddau@gmail.com"
          >
            stefanobiddau@gmail.com
          </a>
        </p>
      </section>

      <!-- Back to Home -->
      <div class="flex justify-center pt-6 sm:pt-8 md:pt-10">
        <NuxtLink
          class="ty-sb-btn-label bg-sb-accent hover:bg-sb-accent-hover border border-sb-accent-border text-sb-contrast px-6 py-3 rounded-xl u-sb-soft-transition u-sb-focus inline-flex items-center gap-2"
          :to="localePath('index')"
        >
          <Icon class="size-5" name="solar:arrow-left-line-duotone" />
          {{ t('pages.terms.backHome') }}
        </NuxtLink>
      </div>
    </article>
  </div>
</template>
