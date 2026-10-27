<script setup lang="ts">
import useGithubStats from '~/composables/data/useGithubStats'
import useSelectedWork from '~/composables/data/useSelectedWork'
import useSkills from '~/composables/data/useSkills'

definePageMeta({
  sitemap: { lastmod: '2026-10-27', changefreq: 'monthly', priority: 1 },
})

// Dependencies
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { selectedWork } = useSelectedWork()
const { featuredStack } = useSkills()
const { isFormOpen: isContactFormOpen, cvItems } = useContact()
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
    // About 35ms per character with typed.js jitter: the role is written while the avatar settles
    typeSpeed: 28,
    // On the CSS entrance clock: a slow hydration cannot open a gap
    startDelay: 100,
    startDelayFrom: 'entrance',
    onComplete: self => self.cursor?.remove(),
  },
)

// SI2001 clients are named as the company's, not as my own: the group label keeps that honest
const CLIENT_GROUPS = [
  { key: 'si2001', names: ['ABB', 'Kleecks', 'Intesa Sanpaolo'] },
  { key: 'freelance', names: ['Studio Legale Romano'] },
] as const

// Data
// Each group spans as many outer columns as it has tiles, so every tile keeps the same width and backend + database share a row on mobile
const STACK_GROUP_LAYOUT = {
  frontend: { span: 'col-span-3 md:col-span-5', cols: 'grid-cols-3 md:grid-cols-5' },
  backend: { span: 'col-span-2', cols: 'grid-cols-2' },
  database: { span: 'col-span-1', cols: 'grid-cols-1' },
} as const
</script>

<template>
  <div>
    <!-- Pulled under the sticky header so the first screen is exactly one viewport; selected work starts below the fold -->
    <section class="relative -mt-16 grid min-h-svh items-center content-center gap-6 pt-20 pb-24 md:grid-cols-[1.2fr_1fr] md:gap-10 lg:pt-24 lg:pb-28 lg:gap-16">
      <!-- Copy and CTAs arrive as one block: readable and clickable at once, with transform + opacity only so hydration cannot stall it -->
      <div class="order-2 md:order-1 flex flex-col items-center text-center md:items-start md:text-left animate-rise-in-slow">
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
        <p class="sb-lead mt-4 mb-0 max-w-xl text-center text-pretty text-ink hyphens-none md:text-left">
          {{ t('pages.home.lead') }}
        </p>
        <!-- Stacked on mobile: a one-column grid as wide as the widest button keeps both the same width -->
        <div class="mt-8 grid w-fit grid-cols-1 gap-4 sm:flex md:grid lg:flex">
          <BaseButton size="lg" variant="primary" @click="isContactFormOpen = true">
            {{ t('pages.home.contactCard.buttonText') }}
          </BaseButton>
          <BaseMenu
            icon="solar:download-minimalistic-bold-duotone"
            :items="cvItems"
            :label="t('pages.home.cvCard.buttonText')"
            placement="bottom-start"
            size="lg"
          />
        </div>
      </div>
      <div class="order-1 md:order-2 flex justify-center animate-drift-in">
        <BaseFloat class="sb-delay-800 w-24 sm:w-48 md:w-full md:max-w-sm">
          <NuxtImg
            alt=""
            class="w-full h-auto"
            fetchpriority="high"
            :height="1536"
            loading="eager"
            provider="none"
            src="/images/3d-avatar/avatar-pose-4.webp"
            :width="1024"
          />
        </BaseFloat>
      </div>
      <a
        class="group absolute bottom-6 left-1/2 -translate-x-1/2 animate-rise-in-slow inline-flex items-center min-h-11 gap-2 whitespace-nowrap sb-label uppercase text-ink-muted hover:text-ink rounded-sm sb-transition sb-focus"
        href="#selected-work"
      >
        {{ t('pages.home.selectedWork.title') }}
        <Icon aria-hidden="true" class="size-4 sb-transition motion-safe:group-hover:translate-y-0.5" name="solar:arrow-down-linear" />
      </a>
    </section>

    <section
      id="selected-work"
      aria-labelledby="selected-work-title"
      class="scroll-mt-24 pt-8 pb-24"
    >
      <div v-reveal class="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 id="selected-work-title" class="mb-0 scroll-mt-24">
          {{ t('pages.home.selectedWork.title') }}
        </h2>
        <NuxtLink
          class="group inline-flex items-center min-h-11 gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline sb-transition sb-focus rounded-sm"
          :to="localePath('my-projects')"
        >
          {{ t('pages.home.selectedWork.viewAll') }}
          <Icon aria-hidden="true" class="size-4 sb-transition motion-safe:group-hover:translate-x-0.5" name="solar:arrow-right-linear" />
        </NuxtLink>
      </div>
      <ul class="grid gap-6 md:grid-cols-3 mb-0 p-0 list-none">
        <li
          v-for="(item, index) in selectedWork"
          :key="item.key"
          v-reveal="index + 1"
        >
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
              <p class="sb-body text-ink mt-3 mb-0">
                {{ item.outcome }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section v-reveal aria-labelledby="clients-title" class="pb-24">
      <h2 id="clients-title" class="mb-8 scroll-mt-24">
        {{ t('pages.home.clients.title') }}
      </h2>
      <div class="grid border-y border-border md:grid-cols-[1fr_auto]">
        <div
          v-for="(group, index) in CLIENT_GROUPS"
          :key="group.key"
          class="py-8 md:py-10"
          :class="index > 0 && 'border-t border-border md:border-t-0 md:border-l md:pl-10'"
        >
          <h3 class="sb-label uppercase text-ink-muted mb-4">
            {{ t(`pages.home.clients.groups.${group.key}`) }}
          </h3>
          <ul class="m-0 flex list-none flex-wrap gap-x-10 gap-y-2 p-0">
            <li
              v-for="name in group.names"
              :key="name"
              class="sb-h1 mb-0 text-left text-ink"
            >
              {{ name }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section v-reveal aria-labelledby="top-skills-title" class="pb-24">
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
          class="group inline-flex items-center min-h-11 gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline sb-transition sb-focus rounded-sm"
          :to="localePath('my-skills')"
        >
          {{ t('pages.home.topSkills.viewAll') }}
          <Icon aria-hidden="true" class="size-4 sb-transition motion-safe:group-hover:translate-x-0.5" name="solar:arrow-right-linear" />
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
                :icon="skill.icon"
                :name="skill.name"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section
      v-if="githubStats"
      v-reveal
      aria-labelledby="github-title"
      class="pb-24"
    >
      <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 id="github-title" class="mb-0 scroll-mt-24">
          {{ t('pages.home.github.title') }}
        </h2>
        <a
          class="group inline-flex items-center min-h-11 gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline sb-transition sb-focus rounded-sm"
          :href="githubStats.profileUrl"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon aria-hidden="true" class="size-4" name="mdi:github" />
          {{ t('pages.home.github.viewProfile') }}
          <Icon aria-hidden="true" class="size-4 sb-transition motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" name="solar:arrow-right-up-linear" />
          <span class="sr-only">({{ t('a11y.newTab') }})</span>
        </a>
      </div>
      <CustomGithubStats :stats="githubStats" />
    </section>

    <section v-reveal aria-labelledby="experience-title" class="pb-24">
      <div class="flex flex-col items-start gap-3 py-6 border-y border-border md:flex-row md:items-center md:gap-10">
        <h2 id="experience-title" class="sb-h3 mb-0 shrink-0">
          {{ t('pages.home.experience.title') }}
        </h2>
        <p class="sb-body text-ink text-left text-pretty hyphens-none mb-0 md:flex-1">
          {{ t('pages.home.experience.lead') }}
        </p>
        <NuxtLink
          class="group inline-flex shrink-0 items-center min-h-11 gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline sb-transition sb-focus rounded-sm"
          :to="localePath('about-me')"
        >
          {{ t('pages.home.experience.viewAll') }}
          <Icon aria-hidden="true" class="size-4 sb-transition motion-safe:group-hover:translate-x-0.5" name="solar:arrow-right-linear" />
        </NuxtLink>
      </div>
    </section>

    <CustomClosingCta @contact="isContactFormOpen = true" />
  </div>
</template>
