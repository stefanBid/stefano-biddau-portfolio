<script setup lang="ts">
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
}

// Input / Output
const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
})
</script>

<template>
  <button
    class="ty-sb-btn-label border px-4 py-2 sm:px-6 sm:py-3 rounded-xl u-sb-soft-transition cursor-pointer"
    :class="{
      'bg-sb-accent hover:bg-sb-accent-hover border-sb-accent-border text-sb-contrast': props.variant === 'primary',
      'bg-sb-surface-2 hover:bg-sb-surface border-sb-border  text-sb-contrast': props.variant === 'secondary',
      'bg-transparent border-sb-accent text-sb-accent hover:bg-sb-accent hover:text-sb-main': props.variant=== 'outline',
    }"
  >
    <slot></slot>
  </button>
</template>
