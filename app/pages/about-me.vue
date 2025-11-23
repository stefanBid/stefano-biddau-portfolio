<script setup lang="ts">
// Dependencies
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.about-me.title'),
  description: () => t('meta.about-me.description'),
  ogTitle: () => t('meta.about-me.ogTitle'),
  ogDescription: () => t('meta.about-me.description'),
  twitterTitle: () => t('meta.about-me.ogTitle'),
  twitterDescription: () => t('meta.about-me.description'),

  // GLOBALS
  ogImage: '/images/card-logo.jpg',
  twitterImage: '/images/card-logo.jpg',
  twitterCard: 'summary',

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://www.stefanobiddau.com${route.fullPath}`,
})

const { fetchMilestones } = useMilestones()

const { data: milestones } = await fetchMilestones()

// State
const heroHasPlayed = useState('hero-about-me-has-played', () => false)
const ready = ref(false)
const heroDoneCount = ref(0)
const HERO_TARGET = 1 // Number of animations to wait for
const atTop = ref(true) // Track if user is at top of the page (to show or hide scroll indicator)

const heroTitleWrap = ref<HTMLElement | null>(null)

const selectedMilestoneId = ref(0)

const MILESTONES = [
  {
    id: 1,
    title: 'Milestone 1',
    subtitle: 'Subtitle 1',
    description: 'Description for milestone 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    id: 2,
    title: 'Milestone 2',
    subtitle: 'Subtitle 2',
    description: 'Description for milestone 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    id: 3,
    title: 'Milestone 3',
    subtitle: 'Subtitle 3',
    description: 'Description for milestone 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  // Add more milestones as needed
]

// Events

const onAnimateEnd = () => {
  heroDoneCount.value += 1
  if (heroDoneCount.value >= HERO_TARGET) {
    ready.value = true
    heroHasPlayed.value = true
    // Clean up event listeners
    detach()
  }
}

const onScroll = () => {
  if (!import.meta.client) {
    return
  }
  atTop.value = window.scrollY <= 100
}

const attach = () => {
  if (heroTitleWrap.value && import.meta.client) {
    heroTitleWrap.value.addEventListener('animationend', onAnimateEnd)
  }
}

const detach = () => {
  if (heroTitleWrap.value && import.meta.client) {
    heroTitleWrap.value.removeEventListener('animationend', onAnimateEnd)
  }
}

onMounted(() => {
  const prefersReduced
    = import.meta.client
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    ready.value = true
    heroHasPlayed.value = true
  }
  else if (heroHasPlayed.value) {
    ready.value = true
  }
  else {
    heroDoneCount.value = 0
    attach()
  }

  if (import.meta.client) {
    atTop.value = window.scrollY <= 100
    window.addEventListener('scroll', onScroll)
  }
})

onBeforeUnmount(() => {
  detach()
  if (import.meta.client) {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>

<template>
  <div>
    <section class="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <!-- Hero image -->
      <!-- Title with local overlay -->
      <div
        ref="heroTitleWrap"
        class="relative z-10 inline-block "
        :class="{
          'animate-fade-in opacity-0': !heroHasPlayed,
        }"
      >
        <!-- overlay only behind the text -->
        <div
          class="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-sb-main/80 via-sb-main/50 to-sb-main/80 blur-sm"
        ></div>

        <h1
          class="ty-sb-hero bg-linear-to-r from-sb-accent to-sb-contrast bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] u-sb-soft-transition px-6 py-2"
        >
          {{ t('pages.about-me.hero') }}
        </h1>
      </div>
      <transition name="fade">
        <Icon
          v-if="ready && atTop"
          class="absolute size-14 md:size-16 lg:size-20  bottom-6 animate-bounce text-sb-accent z-10 pointer-events-none u-sb-soft-transition"
          name="solar:double-alt-arrow-down-bold-duotone"
        />
      </transition>
    </section>
    <!-- Timeline Section -->
    <section aria-label="Professional Timeline" class="relative w-full py-10">
      <div class="border-l-2 border-sb-contrast/30 relative flex flex-col gap-10 pl-6 sm:pl-10 mx-4 sm:mx-5 u-sb-soft-transition">
        <!-- Milestones -->
        <CustomMilestone
          v-for="(milestone) in MILESTONES"
          :id="milestone.id"
          :key="milestone.id"
          :description="milestone.description"
          :is-active="selectedMilestoneId === milestone.id"
          :subtitle="milestone.subtitle"
          :title="milestone.title"
          @select="selectedMilestoneId = milestone.id"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===================== Animations ===================== */

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 1.2s ease-in-out;
}
</style>
