<script setup lang="ts">
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  tone?: 'neutral' | 'accent'
  type?: 'button' | 'submit' | 'reset' | 'link'
  ariaLabel?: string
  to?: string
  isDisabled?: boolean
  isLoading?: boolean
  isActive?: boolean
  iconOnly?: boolean
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'md',
  tone: 'neutral',
  type: 'button',
  to: undefined,
  ariaLabel: undefined,
  isDisabled: false,
  isLoading: false,
  isActive: false,
  iconOnly: false,
})

// Data
const isExternal = computed(() => /^https?:\/\//.test(props.to ?? ''))

const isInteractive = computed(() => props.type === 'link' || (!props.isDisabled && !props.isLoading))

// Only size changes the box: every variant and type shares height, padding, type and border width
const SIZE_CLASSES = {
  // sm is 36px tall; the invisible ::before extends the hit area to 44px
  sm: {
    box: 'h-9 px-3.5 sb-label font-bold relative before:absolute before:-inset-y-1 before:inset-x-0',
    icon: 'size-9 relative before:absolute before:-inset-1',
  },
  md: {
    box: 'h-11 px-6 sb-body-strong',
    icon: 'size-11',
  },
  lg: {
    box: 'h-13 px-8 sb-body-strong',
    icon: 'size-13',
  },
} as const

const classes = computed(() => {
  const size = SIZE_CLASSES[props.size]

  return [
    'inline-flex items-center justify-center gap-2 rounded-lg border uppercase whitespace-nowrap sb-transition sb-focus',
    isInteractive.value ? 'cursor-pointer' : 'cursor-not-allowed opacity-45',

    // Size
    props.iconOnly ? `${size.icon} shrink-0` : size.box,

    // Variants: colours only
    props.variant === 'primary' && 'bg-primary border-primary-border text-on-primary',
    props.variant === 'primary' && isInteractive.value && 'hover:bg-primary-hover',

    props.variant === 'secondary' && 'bg-surface border-border text-ink',
    props.variant === 'secondary' && isInteractive.value && 'hover:bg-surface-2',

    props.variant === 'outline' && 'bg-transparent border-primary text-primary-ink',
    props.variant === 'outline' && isInteractive.value && 'hover:bg-primary hover:text-on-primary',

    props.variant === 'ghost' && 'border-transparent',
    props.variant === 'ghost' && props.tone === 'accent' && 'text-primary-ink',
    props.variant === 'ghost' && props.tone === 'accent' && isInteractive.value && 'hover:text-primary-ink-hover',
    props.variant === 'ghost' && props.tone === 'neutral' && (props.isActive ? 'text-ink bg-surface-2' : 'text-ink-muted'),
    props.variant === 'ghost' && props.tone === 'neutral' && isInteractive.value && 'hover:text-ink hover:bg-surface-2',
  ]
})
</script>

<template>
  <a
    v-if="props.type === 'link'"
    :aria-label="props.ariaLabel"
    :class="classes"
    :href="props.to"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :target="isExternal ? '_blank' : undefined"
  >
    <slot></slot>
    <Icon
      v-if="isExternal && !props.iconOnly"
      aria-hidden="true"
      class="size-4 shrink-0"
      name="solar:arrow-right-up-linear"
    />
    <span v-if="isExternal" class="sr-only">({{ t('a11y.newTab') }})</span>
  </a>
  <button
    v-else
    :aria-label="props.ariaLabel"
    :class="classes"
    :disabled="props.isDisabled || props.isLoading"
    :type="props.type"
  >
    <slot></slot>
    <Icon
      v-if="props.isLoading"
      aria-hidden="true"
      class="inline-block size-5 md:size-6 animate-spin"
      name="solar:refresh-circle-broken"
    />
  </button>
</template>
