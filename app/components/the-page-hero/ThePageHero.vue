<script setup lang="ts">
interface ThePageHeroProps {
  id: string
  text: string
  imageSrc?: string
  imageKind?: 'avatar' | 'logo'
  lead?: string
  overline?: string
}

// Input / Output
const props = withDefaults(defineProps<ThePageHeroProps>(), {
  imageSrc: undefined,
  imageKind: 'avatar',
  lead: undefined,
  overline: undefined,
})
</script>

<template>
  <section
    :id="`${props.id}-hero`"
    class="grid items-end gap-6 pt-10 md:pt-16 border-b border-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 lg:gap-12"
    :class="props.imageSrc && props.imageKind === 'avatar' ? 'pb-0' : 'pb-8 md:pb-12'"
  >
    <div class="order-2 md:order-1 animate-rise-in" :class="{ 'pb-8 md:pb-12': props.imageSrc && props.imageKind === 'avatar' }">
      <p v-if="props.overline" class="sb-overline text-primary-ink text-left mb-3">
        {{ props.overline }}
      </p>
      <h1 class="sb-hero mb-0 text-balance outline-none" tabindex="-1">
        {{ props.text }}
      </h1>
      <p v-if="props.lead" class="sb-lead text-ink-muted text-left text-pretty hyphens-none mt-4 mb-0 max-w-2xl">
        {{ props.lead }}
      </p>
    </div>
    <div
      v-if="props.imageSrc && props.imageKind === 'logo'"
      class="order-1 md:order-2 justify-self-start md:justify-self-end size-28 sm:size-32 md:size-40 lg:size-48 flex items-center justify-center rounded-xl bg-ink p-4 md:p-6 shadow-md animate-drift-in"
    >
      <NuxtImg
        alt=""
        class="size-full object-contain"
        fetchpriority="high"
        :height="796"
        loading="eager"
        :src="props.imageSrc"
        :width="680"
      />
    </div>
    <!-- Decorative: the page title already names the page. provider="none" serves the full-resolution WebP (1024×1536, q92) untouched -->
    <div
      v-else-if="props.imageSrc"
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
