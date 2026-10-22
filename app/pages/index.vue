<script setup lang="ts">
import useProjects from '~/composables/data/useProjects'

// Dependencies
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { projects } = useProjects()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.home.title'),
  description: () => t('meta.home.description'),
  ogTitle: () => t('meta.home.title'),
  ogDescription: () => t('meta.home.description'),
  twitterTitle: () => t('meta.home.title'),
  twitterDescription: () => t('meta.home.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})

const typedRoles = computed(() => [
  t('pages.home.subtitle.typed.0'),
  t('pages.home.subtitle.typed.1'),
  t('pages.home.subtitle.typed.2'),
  t('pages.home.subtitle.typed.3'),
])

const { el, elStyle } = useTypedText(
  typedRoles,
  {
    backDelay: 500,
  },
)

// State
const contactFormIsOpen = ref(false)

const SELECTED_PROJECT_IDS = [
  'bd6a7d77-d3e5-48be-a83c-28d290f788ec',
  'c33faabb-84a8-4f40-8d20-d864162267d6',
  'acb2196a-5974-40ba-81c5-fccb58611c0b',
]

const selectedProjects = computed(() => SELECTED_PROJECT_IDS
  .map(id => projects.value.find(p => p.id === id))
  .filter(p => p !== undefined))

const getFile = computed<{ name: string, path: string }>(() => ({
  name: `Stefano_Biddau_CV_${locale.value}.pdf`,
  path: `/files/Stefano_Biddau_CV_${locale.value}.pdf`,
}))
</script>

<template>
  <div>
    <section class="min-h-[calc(100dvh-4rem)] grid items-center content-center gap-8 py-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div class="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
        <h1 class="sb-display mb-0 text-balance">
          {{ t('pages.home.title') }}
        </h1>
        <p class="sb-h3 mt-4 min-h-14 text-ink-muted">
          {{ t('pages.home.subtitle.costant') }}
          <span class="sr-only">{{ typedRoles.join(', ') }}</span>
          <span
            ref="el"
            aria-hidden="true"
            class="text-primary"
            :style="elStyle"
          ></span>
        </p>
        <div class="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
          <BaseButton variant="primary" @click="contactFormIsOpen = true">
            {{ t('pages.home.contactCard.buttonText') }}
          </BaseButton>
          <BaseButton variant="secondary" @click="downloadFile(getFile.path, getFile.name)">
            <Icon
              aria-hidden="true"
              class="size-5 mr-2"
              name="solar:download-minimalistic-bold-duotone"
            />
            {{ t('pages.home.cvCard.buttonText') }}
          </BaseButton>
        </div>
      </div>
      <div class="order-1 lg:order-2 flex justify-center">
        <NuxtImg
          alt=""
          class="w-40 sm:w-64 lg:w-full lg:max-w-md h-auto"
          fetchpriority="high"
          loading="eager"
          src="/images/my-avatar.webp"
        />
      </div>
    </section>

    <section aria-labelledby="selected-work-title" class="pb-24">
      <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 id="selected-work-title" class="mb-0">
          {{ t('pages.home.selectedWork.title') }}
        </h2>
        <NuxtLink
          class="inline-flex items-center gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline sb-transition sb-focus rounded-sm"
          :to="localePath('my-projects')"
        >
          {{ t('pages.home.selectedWork.viewAll') }}
          <Icon aria-hidden="true" class="size-4" name="solar:arrow-right-linear" />
        </NuxtLink>
      </div>
      <ul class="grid gap-6 md:grid-cols-3 mb-0 p-0 list-none">
        <li v-for="project in selectedProjects" :key="project.id">
          <NuxtLink
            class="group block h-full rounded-lg overflow-hidden border border-border bg-surface hover:border-ink-muted sb-transition sb-focus"
            :to="localePath('my-projects')"
          >
            <div class="aspect-video overflow-hidden bg-surface-2">
              <NuxtImg
                :alt="project.coverImageAlt || ''"
                class="size-full object-cover group-hover:scale-105 sb-transition-slow"
                loading="lazy"
                :src="project.coverImageSrc"
              />
            </div>
            <h3 class="sb-h4 p-4 md:p-5 mb-0 text-balance">
              {{ project.title }}
            </h3>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <LazyCustomContactForm :open-form="contactFormIsOpen" @close-form="value => contactFormIsOpen = value" />
  </div>
</template>
