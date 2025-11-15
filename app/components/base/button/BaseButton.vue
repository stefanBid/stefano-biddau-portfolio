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
</script>

<template>
  <button
    class="ty-sb-btn-label border px-4 py-2 sm:px-6 sm:py-3 rounded-xl u-sb-soft-transition inline-flex items-center u-sb-focus"
    :class="{
      'cursor-pointer': !props.isDisabled && !props.isLoading,
      'opacity-45 cursor-not-allowed': props.isDisabled || props.isLoading,
      'bg-sb-accent hover:bg-sb-accent-hover border-sb-accent-border text-sb-contrast': props.variant === 'primary',
      'bg-sb-surface-2 hover:bg-sb-surface border-sb-border  text-sb-contrast': props.variant === 'secondary',
      'bg-transparent border-sb-accent text-sb-accent hover:bg-sb-accent hover:text-sb-main': props.variant=== 'outline',
    }"

    :disabled="props.isDisabled || props.isLoading"
    :type="props.type"
  >
    <slot></slot>
    <Icon v-if="props.isLoading" class="inline-block size-5 sm:size-6 ml-2 animate-spin" name="solar:refresh-circle-broken" />
  </button>
</template>
