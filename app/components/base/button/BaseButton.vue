<script setup lang="ts">
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  type?: 'button' | 'submit' | 'reset'
  isDisabled?: boolean
  isLoading?: boolean
}

// Input / Output
const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  type: 'button',
  isDisabled: false,
  isLoading: false,
})

const isInteractive = computed(() => {
  return !props.isDisabled && !props.isLoading
})
</script>

<template>
  <button
    class="ty-sb-btn-label border px-4 py-2 md:px-6 md:py-3 rounded-xl u-sb-soft-transition inline-flex items-center u-sb-focus"
    :class="[
      // General state
      isInteractive ? 'cursor-pointer' : 'opacity-45 cursor-not-allowed',

      // Variants
      props.variant === 'primary'
        ? isInteractive
          ? 'bg-sb-accent hover:bg-sb-accent-hover border-sb-accent-border text-sb-contrast'
          : 'bg-sb-accent border-sb-accent-border text-sb-contrast'
        : '',

      props.variant === 'secondary'
        ? isInteractive
          ? 'bg-sb-surface-2 hover:bg-sb-surface border-sb-border text-sb-contrast'
          : 'bg-sb-surface-2 border-sb-border text-sb-contrast'
        : '',

      props.variant === 'outline'
        ? isInteractive
          ? 'bg-transparent border-sb-accent text-sb-accent hover:bg-sb-accent hover:text-sb-main'
          : 'bg-transparent border-sb-accent text-sb-accent'
        : '',
    ]"

    :disabled="props.isDisabled || props.isLoading"
    :type="props.type"
  >
    <slot></slot>
    <Icon v-if="props.isLoading" class="inline-block size-5 md:size-6 ml-2 animate-spin" name="solar:refresh-circle-broken" />
  </button>
</template>
