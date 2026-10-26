<script setup lang="ts">
// Data
const el = ref<HTMLElement | null>(null)
// A loop nobody sees still costs frames: it runs only while on screen
const isVisible = useElementVisibility(el)
</script>

<template>
  <div
    ref="el"
    class="animate-float"
    :class="{ 'sb-paused': !isVisible }"
  >
    <slot></slot>
  </div>
</template>
