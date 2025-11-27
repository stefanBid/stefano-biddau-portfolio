<script setup lang="ts">
interface ThePageHeroProps {
  id: string
  text: string
  imageSrc?: string
  lockScroll?: boolean
}

// Input / Output
const props = withDefaults(
  defineProps<ThePageHeroProps>(),
  {
    imageSrc: undefined,
    lockScroll: false,
  },
)

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'hero-animations-ended'): void
}>()

// Dependencies
const { lock, unlock } = useLockScroll()

// State
const SCROLL_OFFSET = 100 // Offset to consider user at top of the page

const heroHasPlayed = useState(`hero-${props.id}-has-played`, () => false)
const ready = ref(false)
const heroDoneCount = ref(0)
const atTop = ref(true) // Track if user is at top of the page (to show or hide scroll indicator)
const heroTarget = ref(0) // Number of animations to wait for (fixed at mount, not reactive)
const heroImgWrap = ref<HTMLElement | null>(null)
const heroTitleWrap = ref<HTMLElement | null>(null)

// Events
const onAnimateEnd = () => {
  heroDoneCount.value += 1
  if (heroDoneCount.value >= heroTarget.value) {
    ready.value = true
    if (props.lockScroll) {
      unlock()
    }
    heroHasPlayed.value = true
    // Clean up event listeners
    detach()
    emits('hero-animations-ended')
  }
}

const onScroll = () => {
  if (!import.meta.client) {
    return
  }
  atTop.value = window.scrollY <= SCROLL_OFFSET
}

const attach = () => {
  if (heroImgWrap.value && import.meta.client) {
    heroImgWrap.value.addEventListener('animationend', onAnimateEnd)
  }
  if (heroTitleWrap.value && import.meta.client) {
    heroTitleWrap.value.addEventListener('animationend', onAnimateEnd)
  }
}

const detach = () => {
  if (heroImgWrap.value && import.meta.client) {
    heroImgWrap.value.removeEventListener('animationend', onAnimateEnd)
  }
  if (heroTitleWrap.value && import.meta.client) {
    heroTitleWrap.value.removeEventListener('animationend', onAnimateEnd)
  }
}

onMounted(() => {
  const prefersReduced
    = import.meta.client
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // Set target based on initial state (don't make it reactive)
  if (heroHasPlayed.value) {
    heroTarget.value = 0 // Already played, no animations to wait for
  }
  else {
    heroTarget.value = props.imageSrc ? 2 : 1 // 2 if image + title, 1 if only title
  }

  if (prefersReduced) {
    ready.value = true
    heroHasPlayed.value = true
    emits('hero-animations-ended')
  }
  else if (heroHasPlayed.value) {
    ready.value = true
    emits('hero-animations-ended')
  }
  else {
    heroDoneCount.value = 0
    if (props.lockScroll) {
      lock()
    }
    attach()
  }

  if (import.meta.client) {
    atTop.value = window.scrollY <= SCROLL_OFFSET
    window.addEventListener('scroll', onScroll)
  }
})

onBeforeUnmount(() => {
  if (props.lockScroll) {
    unlock()
  }
  detach()
  if (import.meta.client) {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>

<template>
  <section class="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
    <!-- Hero image -->
    <div
      v-if="props.imageSrc"
      ref="heroImgWrap"
      class="absolute w-60 sm:w-72 md:w-80 lg:w-96 h-auto left-1/2 -translate-x-1/2 transform pointer-events-none u-sb-soft-transition z-0"
      :class="{
        'animate-scale-fade': !heroHasPlayed,
      }"
    >
      <NuxtImg
        alt="Hero"
        class="w-full h-auto"
        :src="props.imageSrc"
      />
    </div>

    <!-- Title with local overlay -->
    <div
      ref="heroTitleWrap"
      class="relative z-10 inline-block "
      :class="{
        'animate-fade-in-delayed opacity-0': !heroHasPlayed && props.imageSrc,
        'animate-fade-in opacity-0': !heroHasPlayed && !props.imageSrc,
      }"
    >
      <!-- overlay only behind the text -->
      <div
        class="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-sb-main/80 via-sb-main/50 to-sb-main/80 blur-sm"
      ></div>

      <h1
        class="ty-sb-hero bg-linear-to-r from-sb-accent to-sb-contrast bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] u-sb-soft-transition px-6 py-2"
      >
        {{ props.text }}
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

.animate-fade-in-delayed {
  animation: fade-in 1.2s ease-out 0.5s forwards; /* 0.5s delay */
}

.animate-fade-in {
  animation: fade-in 1.2s ease-in-out;
}

.animate-scale-fade {
  animation: scale-fade 1.8s ease-out forwards;
}
</style>
