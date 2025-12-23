<script setup lang="ts">
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  type?: 'button' | 'submit' | 'reset' | 'link'
  ariaLabel?: string
  to?: string
  isDisabled?: boolean
  isLoading?: boolean
}

// Input / Output
const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  type: 'button',
  to: undefined,
  ariaLabel: undefined,
  isDisabled: false,
  isLoading: false,
})

const isInteractive = computed(() => {
  return !props.isDisabled && !props.isLoading
})
</script>

<template>
  <a
    v-if="props.type === 'link'"
    :aria-label="props.ariaLabel"
    class="ty-sb-btn-label border px-4 py-2 md:px-6 md:py-3 rounded-xl u-sb-soft-transition inline-flex items-center justify-center u-sb-focus"
    :class="[
      // Variants
      props.variant === 'primary'
        ? 'bg-sb-accent hover:bg-sb-accent-hover border-sb-accent-border text-sb-contrast'
        : '',

      props.variant === 'secondary'
        ? 'bg-sb-surface-2 hover:bg-sb-surface border-sb-border text-sb-contrast'
        : '',

      props.variant === 'outline'
        ? 'bg-transparent border-sb-accent text-sb-accent hover:bg-sb-accent hover:text-sb-main'
        : '',
    ]"
    :href="props.to"
    rel="noopener noreferrer"
    target="_blank"
  >
    <slot></slot>
  </a>
  <button
    v-else
    :aria-label="props.ariaLabel"
    class="ty-sb-btn-label border px-4 py-2 md:px-6 md:py-3 rounded-xl u-sb-soft-transition inline-flex items-center justify-center u-sb-focus"

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
