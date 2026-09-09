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

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
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
  <article class="space-y-8 sm:space-y-10 md:space-y-12 pt-16">
    <!-- Header -->
    <header class="space-y-4 sm:space-y-5 md:space-y-6 text-center">
      <h1 class="ty-sb-hero mb-0">
        {{ t('pages.terms.title') }}
      </h1>
      <p class="ty-sb-h4 text-sb-muted">
        {{ t('pages.terms.subtitle') }}
      </p>
      <p class="ty-sb-label text-sb-muted/70">
        {{ t('pages.terms.lastUpdate') }}: {{ lastUpdate }}
      </p>
    </header>

    <hr class="border-sb-border" />

    <!-- Introduction -->
    <section class="space-y-4 md:space-y-5">
      <h2 class="ty-sb-h1">
        {{ t('pages.terms.intro.title') }}
      </h2>
      <p class="ty-sb-p text-sb-muted leading-relaxed">
        {{ t('pages.terms.intro.content') }}
      </p>
    </section>

    <!-- Section 1: Acceptance -->
    <BaseCard full-custom-content variant="dark">
      <div class="space-y-4 md:space-y-5">
        <h2 class="ty-sb-h3">
          {{ t('pages.terms.acceptance.title') }}
        </h2>
        <p class="ty-sb-p text-sb-muted leading-relaxed">
          {{ t('pages.terms.acceptance.content') }}
        </p>
      </div>
    </BaseCard>

    <!-- Section 2: Use of Website -->
    <section class="space-y-4 md:space-y-5">
      <h2 class="ty-sb-h3">
        {{ t('pages.terms.useOfWebsite.title') }}
      </h2>
      <p class="ty-sb-p text-sb-muted leading-relaxed">
        {{ t('pages.terms.useOfWebsite.intro') }}
      </p>
      <ul class="space-y-2 md:space-y-3 ml-4 md:ml-6">
        <li class="ty-sb-p text-sb-muted leading-relaxed flex gap-3">
          <span class="text-sb-accent shrink-0">•</span>
          <span>{{ t('pages.terms.useOfWebsite.point1') }}</span>
        </li>
        <li class="ty-sb-p text-sb-muted leading-relaxed flex gap-3">
          <span class="text-sb-accent shrink-0">•</span>
          <span>{{ t('pages.terms.useOfWebsite.point2') }}</span>
        </li>
        <li class="ty-sb-p text-sb-muted leading-relaxed flex gap-3">
          <span class="text-sb-accent shrink-0">•</span>
          <span>{{ t('pages.terms.useOfWebsite.point3') }}</span>
        </li>
        <li class="ty-sb-p text-sb-muted leading-relaxed flex gap-3">
          <span class="text-sb-accent shrink-0">•</span>
          <span>{{ t('pages.terms.useOfWebsite.point4') }}</span>
        </li>
      </ul>
    </section>

    <!-- Section 3: Intellectual Property -->
    <BaseCard full-custom-content variant="light">
      <div class="space-y-4 md:space-y-5">
        <h2 class="ty-sb-h3">
          {{ t('pages.terms.intellectualProperty.title') }}
        </h2>
        <p class="ty-sb-p text-sb-muted leading-relaxed">
          {{ t('pages.terms.intellectualProperty.content') }}
        </p>
      </div>
    </BaseCard>

    <!-- Section 4: Contact Form -->
    <section class="space-y-4 md:space-y-5">
      <h2 class="ty-sb-h3">
        {{ t('pages.terms.contactForm.title') }}
      </h2>
      <p class="ty-sb-p text-sb-muted leading-relaxed">
        {{ t('pages.terms.contactForm.intro') }}
      </p>
      <ul class="space-y-2 md:space-y-3 ml-4 md:ml-6">
        <li class="ty-sb-p text-sb-muted leading-relaxed flex gap-3">
          <span class="text-sb-accent shrink-0">•</span>
          <span>{{ t('pages.terms.contactForm.point1') }}</span>
        </li>
        <li class="ty-sb-p text-sb-muted leading-relaxed flex gap-3">
          <span class="text-sb-accent shrink-0">•</span>
          <span>{{ t('pages.terms.contactForm.point2') }}</span>
        </li>
        <li class="ty-sb-p text-sb-muted leading-relaxed flex gap-3">
          <span class="text-sb-accent shrink-0">•</span>
          <span>{{ t('pages.terms.contactForm.point3') }}</span>
        </li>
      </ul>
    </section>

    <!-- Section 5: Third-Party Links -->
    <BaseCard full-custom-content variant="dark">
      <div class="space-y-4 md:space-y-5">
        <h2 class="ty-sb-h3">
          {{ t('pages.terms.thirdPartyLinks.title') }}
        </h2>
        <p class="ty-sb-p text-sb-muted leading-relaxed">
          {{ t('pages.terms.thirdPartyLinks.content') }}
        </p>
      </div>
    </BaseCard>

    <!-- Section 6: Disclaimer -->
    <section class="space-y-4 md:space-y-5">
      <h2 class="ty-sb-h3">
        {{ t('pages.terms.disclaimer.title') }}
      </h2>
      <p class="ty-sb-p text-sb-muted leading-relaxed">
        {{ t('pages.terms.disclaimer.content') }}
      </p>
    </section>

    <!-- Section 7: Limitation of Liability -->
    <BaseCard full-custom-content variant="light">
      <div class="space-y-4 md:space-y-5">
        <h2 class="ty-sb-h3">
          {{ t('pages.terms.liability.title') }}
        </h2>
        <p class="ty-sb-p text-sb-muted leading-relaxed">
          {{ t('pages.terms.liability.content') }}
        </p>
      </div>
    </BaseCard>

    <!-- Section 8: Changes to Terms -->
    <section class="space-y-4 md:space-y-5">
      <h2 class="ty-sb-h3">
        {{ t('pages.terms.changes.title') }}
      </h2>
      <p class="ty-sb-p text-sb-muted leading-relaxed">
        {{ t('pages.terms.changes.content') }}
      </p>
    </section>

    <!-- Section 9: Governing Law -->
    <BaseCard full-custom-content variant="dark">
      <div class="space-y-4 md:space-y-5">
        <h2 class="ty-sb-h3">
          {{ t('pages.terms.governingLaw.title') }}
        </h2>
        <p class="ty-sb-p text-sb-muted leading-relaxed">
          {{ t('pages.terms.governingLaw.content') }}
        </p>
      </div>
    </BaseCard>

    <!-- Section 10: Contact -->
    <section class="space-y-4 md:space-y-5">
      <h2 class="ty-sb-h3">
        {{ t('pages.terms.contact.title') }}
      </h2>
      <p class="ty-sb-p text-sb-muted leading-relaxed">
        {{ t('pages.terms.contact.content') }}:
        <a
          class="text-sb-accent hover:text-sb-accent-hover underline underline-offset-4 u-sb-soft-transition u-sb-focus rounded"
          href="mailto:biddau.stefano99@gmail.com"
        >
          biddau.stefano99@gmail.com
        </a>
      </p>
    </section>

    <!-- Back to Home -->
    <div class="flex justify-center pt-6 sm:pt-8 md:pt-10">
      <BaseButton
        type="button"
        variant="outline"
        @click="$router.push(localePath('index'))"
      >
        <Icon class="inline-block size-5 md:size-6 mr-2" name="solar:arrow-left-line-duotone" />
        {{ t('pages.terms.backHome') }}
      </BaseButton>
    </div>
  </article>
</template>
