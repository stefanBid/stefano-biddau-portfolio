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

const PROJECT_LINKS = [
  { id: 'bd6a7d77-d3e5-48be-a83c-28d290f788ec', metaKey: 'romano' },
  { id: 'acb2196a-5974-40ba-81c5-fccb58611c0b', metaKey: 'floatingPanel' },
]

const selectedWork = computed(() => {
  const fromProjects = PROJECT_LINKS
    .map(({ id, metaKey }) => {
      const project = projects.value.find(p => p.id === id)
      if (!project) {
        return undefined
      }
      return {
        key: id,
        title: project.title,
        imageSrc: project.coverImageSrc,
        imageAlt: project.coverImageAlt || '',
        imageFit: 'cover' as const,
        meta: t(`pages.home.selectedWork.meta.${metaKey}`),
        to: { path: localePath('my-projects'), hash: `#project-${id}` },
      }
    })
    .filter(item => item !== undefined)

  const sbTemplates = {
    key: 'sb-templates',
    title: t('nav.sb-templates'),
    imageSrc: '/images/sbt-logos/sbt-logo.webp',
    imageAlt: t('pages.projects.sbTemplatesProject.logoAlt'),
    imageFit: 'contain' as const,
    meta: t('pages.home.selectedWork.meta.sbTemplates'),
    to: { path: localePath('/my-projects/sb-templates') },
  }

  return fromProjects.length === 2 ? [fromProjects[0]!, sbTemplates, fromProjects[1]!] : [...fromProjects, sbTemplates]
})

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
            class="text-primary-ink"
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
        <li v-for="item in selectedWork" :key="item.key">
          <NuxtLink
            class="group block h-full rounded-lg overflow-hidden border border-border bg-surface hover:border-ink-muted sb-transition sb-focus"
            :to="item.to"
          >
            <div
              class="aspect-video overflow-hidden"
              :class="item.imageFit === 'contain' ? 'bg-ink flex items-center justify-center p-6' : 'bg-surface-2'"
            >
              <NuxtImg
                :alt="item.imageAlt"
                class="group-hover:scale-105 sb-transition-slow"
                :class="item.imageFit === 'contain' ? 'h-full w-auto object-contain' : 'size-full object-cover'"
                loading="lazy"
                :src="item.imageSrc"
              />
            </div>
            <div class="p-4 md:p-5">
              <h3 class="sb-h4 mb-1 text-balance">
                {{ item.title }}
              </h3>
              <p class="sb-small text-ink-muted mb-0">
                {{ item.meta }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <LazyCustomContactForm :open-form="contactFormIsOpen" @close-form="value => contactFormIsOpen = value" />
  </div>
</template>
