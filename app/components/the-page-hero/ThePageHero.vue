<script setup lang="ts">
interface ThePageHeroProps {
  id: string
  text: string
  bordered?: boolean
}

// Input / Output
const props = withDefaults(defineProps<ThePageHeroProps>(), {
  bordered: true,
})
</script>

<template>
  <section
    :id="`${props.id}-hero`"
    class="flex items-end md:min-h-[40dvh] pt-10 md:pt-16 pb-8 md:pb-14"
    :class="{ 'border-b border-border': props.bordered }"
  >
    <h1 class="sb-hero mb-0 text-balance animate-rise-in">
      {{ props.text }}
    </h1>
  </section>
</template>
