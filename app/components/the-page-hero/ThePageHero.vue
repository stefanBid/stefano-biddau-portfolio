<script setup lang="ts">
interface ThePageHeroProps {
  id: string
  text: string
  imageSrc?: string
}

// Input / Output
const props = withDefaults(defineProps<ThePageHeroProps>(), {
  imageSrc: undefined,
})
</script>

<template>
  <section
    :id="`${props.id}-hero`"
    class="grid items-end gap-6 pt-10 md:pt-16 border-b border-border lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12"
    :class="props.imageSrc ? 'pb-0' : 'pb-8 md:pb-12'"
  >
    <h1
      class="order-2 lg:order-1 sb-hero mb-0 text-balance animate-rise-in"
      :class="{ 'pb-8 md:pb-12': props.imageSrc }"
    >
      {{ props.text }}
    </h1>
    <!-- Decorative: the page title already names the page. provider="none" serves the full-resolution WebP (1024×1536, q92) untouched -->
    <NuxtImg
      v-if="props.imageSrc"
      alt=""
      class="order-1 lg:order-2 justify-self-center lg:justify-self-end w-40 sm:w-48 lg:w-60 h-auto animate-fade-in"
      fetchpriority="high"
      :height="1536"
      loading="eager"
      provider="none"
      :src="props.imageSrc"
      :width="1024"
    />
  </section>
</template>
