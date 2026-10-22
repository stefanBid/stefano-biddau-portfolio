<script setup lang="ts">
interface ThePageHeroProps {
  id: string
  text: string
}

// Input / Output
const props = defineProps<ThePageHeroProps>()
</script>

<template>
  <section
    :id="`${props.id}-hero`"
    class="flex items-end pt-12 md:pt-24 pb-8 md:pb-12 border-b border-border"
  >
    <h1 class="sb-hero mb-0 text-balance animate-rise-in">
      {{ props.text }}
    </h1>
  </section>
</template>
