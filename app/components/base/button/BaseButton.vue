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

const isExternal = computed(() => /^https?:\/\//.test(props.to ?? ''))

const isInteractive = computed(() => {
  return !props.isDisabled && !props.isLoading
})
</script>

<template>
  <a
    v-if="props.type === 'link'"
    :aria-label="props.ariaLabel"
    class="sb-body-strong uppercase border px-5 py-2.5 md:px-7 md:py-3 rounded-lg sb-transition inline-flex items-center justify-center sb-focus"
    :class="[
      // Variants
      props.variant === 'primary'
        ? 'bg-primary hover:bg-primary-hover border-primary-border text-on-primary'
        : '',

      props.variant === 'secondary'
        ? 'bg-surface hover:bg-surface-2 border-border text-ink'
        : '',

      props.variant === 'outline'
        ? 'bg-transparent border-primary text-primary hover:bg-primary hover:text-on-primary'
        : '',
    ]"
    :href="props.to"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :target="isExternal ? '_blank' : undefined"
  >
    <slot></slot>
  </a>
  <button
    v-else
    :aria-label="props.ariaLabel"
    class="sb-body-strong uppercase border px-5 py-2.5 md:px-7 md:py-3 rounded-lg sb-transition inline-flex items-center justify-center sb-focus"

    :class="[
      // General state
      isInteractive ? 'cursor-pointer' : 'opacity-45 cursor-not-allowed',

      // Variants
      props.variant === 'primary'
        ? isInteractive
          ? 'bg-primary hover:bg-primary-hover border-primary-border text-on-primary'
          : 'bg-primary border-primary-border text-on-primary'
        : '',

      props.variant === 'secondary'
        ? isInteractive
          ? 'bg-surface hover:bg-surface-2 border-border text-ink'
          : 'bg-surface border-border text-ink'
        : '',

      props.variant === 'outline'
        ? isInteractive
          ? 'bg-transparent border-primary text-primary hover:bg-primary hover:text-on-primary'
          : 'bg-transparent border-primary text-primary'
        : '',
    ]"
    :disabled="props.isDisabled || props.isLoading"
    :type="props.type"
  >
    <slot></slot>
    <Icon v-if="props.isLoading" class="inline-block size-5 md:size-6 ml-2 animate-spin" name="solar:refresh-circle-broken" />
  </button>
</template>
