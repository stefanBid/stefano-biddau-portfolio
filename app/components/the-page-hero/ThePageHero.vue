<script setup lang="ts">
interface ThePageHeroProps {
  id: string
  text: string
  imageSrc?: string
  lead?: string
}

// Input / Output
const props = withDefaults(defineProps<ThePageHeroProps>(), {
  imageSrc: undefined,
  lead: undefined,
})
</script>

<template>
  <section
    :id="`${props.id}-hero`"
    class="grid items-end gap-6 pt-10 md:pt-16 border-b border-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 lg:gap-12"
    :class="props.imageSrc ? 'pb-0' : 'pb-8 md:pb-12'"
  >
    <div class="order-2 md:order-1 animate-rise-in" :class="{ 'pb-8 md:pb-12': props.imageSrc }">
      <h1 class="sb-hero mb-0 text-balance">
        {{ props.text }}
      </h1>
      <p v-if="props.lead" class="sb-lead text-ink-muted text-left text-pretty hyphens-none mt-4 mb-0 max-w-2xl">
        {{ props.lead }}
      </p>
    </div>
    <!-- Decorative: the page title already names the page. provider="none" serves the full-resolution WebP (1024×1536, q92) untouched -->
    <div
      v-if="props.imageSrc"
      class="order-1 md:order-2 justify-self-start md:justify-self-end w-32 sm:w-40 md:w-48 lg:w-60 animate-drift-in"
    >
      <BaseFloat class="sb-delay-800">
        <NuxtImg
          alt=""
          class="w-full h-auto"
          fetchpriority="high"
          :height="1536"
          loading="eager"
          provider="none"
          :src="props.imageSrc"
          :width="1024"
        />
      </BaseFloat>
    </div>
  </section>
</template>
