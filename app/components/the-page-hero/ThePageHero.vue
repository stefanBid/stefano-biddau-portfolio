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
</script>

<template>
  <section class="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
    <!-- Hero image -->
    <div
      v-if="props.imageSrc"
      ref="heroImgWrap"
      class="absolute w-60 sm:w-72 md:w-80 lg:w-96 h-auto left-1/2 -translate-x-1/2 transform pointer-events-none z-0"
    >
      <NuxtImg
        alt="Hero"
        class="w-full h-auto"
        fetchpriority="high"
        loading="eager"
        :src="props.imageSrc"
      />
    </div>

    <!-- Title with local overlay -->
    <div
      ref="heroTitleWrap"
      class="relative z-10 inline-block "
    >
      <!-- overlay only behind the text -->
      <div
        class="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-bg/80 via-bg/50 to-bg/80 blur-sm"
      ></div>

      <h1
        class="sb-hero bg-linear-to-r from-primary to-ink bg-clip-text text-transparent drop-shadow-md px-[0.4em] py-[0.3em]"
      >
        {{ props.text }}
      </h1>
    </div>
    <transition name="fade">
      <Icon
        class="absolute size-14 md:size-16 lg:size-20  bottom-6 animate-bounce text-primary z-10 pointer-events-none"
        name="solar:double-alt-arrow-down-bold-duotone"
      />
    </transition>
  </section>
</template>
