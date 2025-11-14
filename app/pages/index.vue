<script setup lang="ts">
// Feature 1: Show other content after hero section aninimation endeds
const ready = ref(false)
const heroDoneCount = ref(0)
const HERO_TARGET = 2 // Number of animations to wait for
const atTop = ref(true) // Track if user is at top of the page (to show or hide scroll indicator)

const heroImgWrap = ref<HTMLElement | null>(null)
const heroTitleWrap = ref<HTMLElement | null>(null)

const onAnimateEnd = () => {
  heroDoneCount.value += 1
  if (heroDoneCount.value >= HERO_TARGET) {
    ready.value = true
    lockScroll(false)
    // Clean up event listeners
    detach()
  }
}

const onScroll = () => {
  if (typeof window === 'undefined') {
    return
  }
  atTop.value = window.scrollY <= 64
}

const attach = () => {
  if (heroImgWrap.value) {
    heroImgWrap.value.addEventListener('animationend', onAnimateEnd)
  }
  if (heroTitleWrap.value) {
    heroTitleWrap.value.addEventListener('animationend', onAnimateEnd)
  }
}

const detach = () => {
  if (heroImgWrap.value) {
    heroImgWrap.value.removeEventListener('animationend', onAnimateEnd)
  }
  if (heroTitleWrap.value) {
    heroTitleWrap.value.removeEventListener('animationend', onAnimateEnd)
  }
}

onMounted(() => {
  const prefersReduced
    = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    ready.value = true
  }
  else {
    lockScroll(true)
    attach()
  }

  if (typeof window !== 'undefined') {
    atTop.value = window.scrollY <= 64
    window.addEventListener('scroll', onScroll)
  }
})

onBeforeUnmount(() => {
  detach()
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll)
  }
})

// Feature 2: Typed.js integration for dynamic text effect
const { el, elStyle } = useTypedText(
  [
    'Frontend Developer',
    'Backend Developer',
    'Web Designer',
    'UI/UX Enthusiast',
  ],
  {
    backDelay: 500,
  },
)

// Feature 3: Manage SEO meta tags

useSeoMeta({
  title: 'Stefano Biddau |',
  description: '[description]',
  ogTitle: '[og:title]',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary',
})
</script>

<template>
  <div>
    <!-- Welcome Hero Section -->
    <section class="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <!-- Hero image -->
      <div
        ref="heroImgWrap"
        class="absolute w-60 sm:w-72 md:w-80 lg:w-96 h-auto left-1/2 -translate-x-1/2 transform pointer-events-none animate-scale-fade u-sb-soft-transition z-0"
      >
        <NuxtImg
          alt="Hero"
          class="w-full h-auto"
          src="/images/my-avatar.webp"
        />
      </div>

      <!-- Title with local overlay -->
      <div
        ref="heroTitleWrap"
        class="relative z-10 inline-block  animate-fade-in opacity-0"
      >
        <!-- overlay only behind the text -->
        <div
          class="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-sb-main/80 via-sb-main/50 to-sb-main/80 blur-sm"
        ></div>

        <h1
          class="ty-sb-hero bg-linear-to-r from-sb-accent to-sb-contrast bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] u-sb-soft-transition px-6 py-2"
        >
          Welcome Back
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
    <section
      v-show="ready"
      :aria-hidden="!ready"
      class="py-20 min-h-[60vh] flex flex-col items-center justify-center"
      :inert="!ready"
    >
      <h2 class="ty-sb-title-xl text-center">
        Hello, I'm Stefano Biddau
      </h2>
      <p class="ty-sb-subtitle-xl font-space-mono text-center mt-2">
        And I'm a
        <span
          ref="el"
          aria-live="polite"
          class="text-sb-accent"
          :style="elStyle"
        ></span>
      </p>
      <div class="w-full mt-20 grid gap-10 md:gap-12 lg:gap-16 sm:grid-cols-1 lg:grid-cols-2 justify-items-center u-sb-soft-transition">
        <BaseCard
          align="center"
          class="max-w-xl"
          paragraph="A comprehensive overview of my skills, work experiences, and key projects. The document is updated and optimized for quick consultation."
          subtitle="Discover my professional journey"
          title="Download My CV"
          variant="dark-hover"
        >
          <template #card-header>
            <Icon class="size-10 sm:size-12 md:size-14 text-sb-contrast u-sb-soft-transition" name="solar:file-download-bold-duotone" />
          </template>
          <template #card-footer>
            <button class="ty-sb-btn-label bg-sb-accent hover:bg-sb-accent-hover px-6 py-3 rounded-xl text-sb-contrast transition">
              Download
            </button>
          </template>
        </BaseCard>
        <BaseCard
          align="center"
          class="max-w-xl"
          paragraph="If you need technical support or wish to discuss a collaboration, I would be happy to hear your ideas and find the best solution together."
          subtitle="Let's talk about your project"
          title="Contact Me"
          variant="dark-hover"
        >
          <template #card-header>
            <Icon class="size-10 sm:size-12 md:size-14 text-sb-contrast u-sb-soft-transition" name="solar:mailbox-bold-duotone" />
          </template>
          <template #card-footer>
            <button class="ty-sb-btn-label bg-sb-accent hover:bg-sb-accent-hover px-6 py-3 rounded-xl text-sb-contrast transition">
              Write to me
            </button>
          </template>
        </BaseCard>
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

@keyframes scale-fade {
  0% {
    opacity: 0;
    transform:  scale(0.9);
  }
  100% {
    opacity: 1;
    transform:  scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out 0.5s forwards; /* 0.5s delay */
}

.animate-scale-fade {
  animation: scale-fade 1.8s ease-out forwards;
}
</style>
