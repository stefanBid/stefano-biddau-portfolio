<script setup lang="ts">
import useGithubStats from '~/composables/data/useGithubStats'
import useProjects from '~/composables/data/useProjects'
import useSkills from '~/composables/data/useSkills'

// Dependencies
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { projects } = useProjects()
const { featuredStack } = useSkills()
const { stats: githubStats } = await useGithubStats()

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

const typedRole = computed(() => t('pages.home.subtitle.role'))

// Types once and drops the cursor, so nothing keeps moving next to the heading (WCAG 2.2.2)
const { el, elStyle } = useTypedText(
  typedRole,
  {
    contentType: 'null',
    onComplete: self => self.cursor?.remove(),
  },
)

const CONTACT_EMAIL = 'biddau.stefano99@gmail.com'

// State
const contactFormIsOpen = ref(false)

// Each group spans as many outer columns as it has tiles, so every tile keeps the same width and backend + database share a row on mobile
const STACK_GROUP_LAYOUT = {
  frontend: { span: 'col-span-3 md:col-span-5', cols: 'grid-cols-3 md:grid-cols-5' },
  backend: { span: 'col-span-2', cols: 'grid-cols-2' },
  database: { span: 'col-span-1', cols: 'grid-cols-1' },
} as const

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
    <section class="grid items-center content-center gap-6 py-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:py-16">
      <div class="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
        <h1 class="sb-display mb-0 text-balance">
          {{ t('pages.home.title') }}
        </h1>
        <p class="sb-h3 mt-4 min-h-14 text-ink-muted">
          {{ t('pages.home.subtitle.costant') }}
          <span class="sr-only">{{ typedRole }}</span>
          <span
            ref="el"
            aria-hidden="true"
            class="text-primary-ink"
            :style="elStyle"
          ></span>
        </p>
        <p class="sb-lead mt-4 mb-0 max-w-xl text-center text-pretty text-ink hyphens-none lg:text-left">
          {{ t('pages.home.lead') }}
        </p>
        <!-- Stacked on mobile: a one-column grid as wide as the widest button keeps both the same width -->
        <div class="mt-8 grid w-fit grid-cols-1 gap-4 sm:flex">
          <BaseButton size="lg" variant="primary" @click="contactFormIsOpen = true">
            {{ t('pages.home.contactCard.buttonText') }}
          </BaseButton>
          <BaseButton size="lg" variant="secondary" @click="downloadFile(getFile.path, getFile.name)">
            <Icon
              aria-hidden="true"
              class="size-5"
              name="solar:download-minimalistic-bold-duotone"
            />
            {{ t('pages.home.cvCard.buttonText') }}
          </BaseButton>
        </div>
      </div>
      <div class="order-1 lg:order-2 flex justify-center">
        <NuxtImg
          alt=""
          class="w-32 sm:w-64 lg:w-full lg:max-w-sm h-auto"
          fetchpriority="high"
          :height="1536"
          loading="eager"
          provider="none"
          src="/images/3d-avatar/avatar-pose-4.webp"
          :width="1024"
        />
      </div>
    </section>

    <section aria-labelledby="selected-work-title" class="pb-24">
      <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 id="selected-work-title" class="mb-0 scroll-mt-24">
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
              <h3 class="sb-h4 mb-1 text-left text-balance">
                {{ item.title }}
              </h3>
              <p class="sb-small text-ink-muted text-left mb-0">
                {{ item.meta }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section aria-labelledby="top-skills-title" class="pb-24">
      <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 id="top-skills-title" class="mb-0 scroll-mt-24">
            {{ t('pages.home.topSkills.title') }}
          </h2>
          <p class="sb-body text-ink-muted text-left mt-2 mb-0">
            {{ t('pages.home.topSkills.lead') }}
          </p>
        </div>
        <NuxtLink
          class="inline-flex items-center gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline sb-transition sb-focus rounded-sm"
          :to="localePath('my-skills')"
        >
          {{ t('pages.home.topSkills.viewAll') }}
          <Icon aria-hidden="true" class="size-4" name="solar:arrow-right-linear" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-3 gap-x-3 gap-y-8 md:grid-cols-5 md:gap-x-4 lg:grid-cols-8">
        <div
          v-for="group in featuredStack"
          :key="group.key"
          :class="STACK_GROUP_LAYOUT[group.key].span"
        >
          <h3 class="sb-label uppercase text-ink-muted mb-3">
            {{ t(`pages.home.topSkills.groups.${group.key}`) }}
          </h3>
          <ul
            class="grid gap-3 md:gap-4 mb-0 p-0 list-none"
            :class="STACK_GROUP_LAYOUT[group.key].cols"
          >
            <li v-for="skill in group.skills" :key="skill.id">
              <CustomSkillsCard
                class="h-full"
                compact
                :icon="skill.icon ?? 'solar:code-square-bold-duotone'"
                :level="skill.level"
                :name="skill.name"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section
      v-if="githubStats"
      aria-labelledby="github-title"
      class="pb-24"
    >
      <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 id="github-title" class="mb-0 scroll-mt-24">
          {{ t('pages.home.github.title') }}
        </h2>
        <a
          class="inline-flex items-center gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline sb-transition sb-focus rounded-sm"
          :href="githubStats.profileUrl"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon aria-hidden="true" class="size-4" name="mdi:github" />
          {{ t('pages.home.github.viewProfile') }}
          <Icon aria-hidden="true" class="size-4" name="solar:arrow-right-up-linear" />
          <span class="sr-only">({{ t('a11y.newTab') }})</span>
        </a>
      </div>
      <CustomGithubStats :stats="githubStats" />
    </section>

    <section aria-labelledby="experience-title" class="pb-24 grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <div class="flex flex-col items-start gap-4">
        <h2 id="experience-title" class="mb-0 scroll-mt-24">
          {{ t('pages.home.experience.title') }}
        </h2>
        <p class="sb-body text-ink-muted text-left mb-0">
          {{ t('pages.home.experience.lead') }}
        </p>
        <NuxtLink
          class="inline-flex items-center gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline sb-transition sb-focus rounded-sm"
          :to="localePath('about-me')"
        >
          {{ t('pages.home.experience.viewAll') }}
          <Icon aria-hidden="true" class="size-4" name="solar:arrow-right-linear" />
        </NuxtLink>
      </div>
      <CustomExperienceList />
    </section>

    <section aria-labelledby="closing-cta-title" class="pb-24">
      <div class="grid items-center overflow-hidden rounded-xl border border-border bg-surface md:grid-cols-[1.6fr_1fr]">
        <div class="flex flex-col items-start p-6 md:p-12">
          <h2 id="closing-cta-title" class="mb-0 text-balance">
            {{ t('pages.home.closingCta.title') }}
          </h2>
          <p class="sb-lead text-ink-muted text-left mt-4 mb-0 max-w-xl">
            {{ t('pages.home.closingCta.text') }}
          </p>
          <div class="mt-8 grid w-fit grid-cols-1 gap-4 sm:flex">
            <BaseButton variant="primary" @click="contactFormIsOpen = true">
              {{ t('pages.home.contactCard.buttonText') }}
            </BaseButton>
            <BaseButton variant="secondary" @click="downloadFile(getFile.path, getFile.name)">
              <Icon
                aria-hidden="true"
                class="size-5"
                name="solar:download-minimalistic-bold-duotone"
              />
              {{ t('pages.home.cvCard.buttonText') }}
            </BaseButton>
          </div>
          <p class="sb-body text-ink-muted text-left mt-6 mb-0">
            {{ t('pages.home.closingCta.emailPrefix') }}
            <a
              class="block w-fit hyphens-none text-primary-ink underline underline-offset-4 rounded-sm hover:text-primary-ink-hover sb-transition sb-focus sm:inline"
              :href="`mailto:${CONTACT_EMAIL}`"
            >{{ CONTACT_EMAIL.split('@')[0] }}<wbr />@{{ CONTACT_EMAIL.split('@')[1] }}</a>
          </p>
        </div>
        <div class="hidden md:flex justify-center self-end pt-8">
          <NuxtImg
            alt=""
            class="w-56 lg:w-64 h-auto"
            :height="1536"
            loading="lazy"
            provider="none"
            src="/images/3d-avatar/avatar-pose-2.webp"
            :width="1024"
          />
        </div>
      </div>
    </section>

    <LazyCustomContactForm :open-form="contactFormIsOpen" @close-form="value => contactFormIsOpen = value" />
  </div>
</template>
