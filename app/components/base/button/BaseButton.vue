<script setup lang="ts">
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tab' | 'bare'
  tone?: 'neutral' | 'accent'
  type?: 'button' | 'submit' | 'reset' | 'link'
  ariaLabel?: string
  to?: string
  isDisabled?: boolean
  isLoading?: boolean
  isActive?: boolean
  iconOnly?: boolean
  block?: boolean
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  tone: 'neutral',
  type: 'button',
  to: undefined,
  ariaLabel: undefined,
  isDisabled: false,
  isLoading: false,
  isActive: false,
  iconOnly: false,
  block: false,
})

// Data
const isExternal = computed(() => /^https?:\/\//.test(props.to ?? ''))

const isInteractive = computed(() => props.type === 'link' || (!props.isDisabled && !props.isLoading))

const isFilled = computed(() => ['primary', 'secondary', 'outline'].includes(props.variant))

const classes = computed(() => {
  if (props.variant === 'bare') {
    return ['sb-transition sb-focus', isInteractive.value ? 'cursor-pointer' : 'cursor-not-allowed opacity-45']
  }

  return [
    'inline-flex items-center gap-2 rounded-lg sb-transition sb-focus',
    isInteractive.value ? 'cursor-pointer' : 'cursor-not-allowed opacity-45',
    props.block ? 'w-full justify-start text-left' : 'justify-center',

    // Size
    props.iconOnly
      ? 'size-11 md:size-10 shrink-0'
      : isFilled.value
        ? 'min-h-11 px-5 py-2.5 md:px-7 md:py-3'
        : props.variant === 'tab'
          ? 'min-h-11 px-1'
          : 'min-h-11 px-3',

    // Variants
    isFilled.value ? 'border sb-body-strong uppercase' : 'sb-body',

    props.variant === 'primary' && 'bg-primary border-primary-border text-on-primary',
    props.variant === 'primary' && isInteractive.value && 'hover:bg-primary-hover',

    props.variant === 'secondary' && 'bg-surface border-border text-ink',
    props.variant === 'secondary' && isInteractive.value && 'hover:bg-surface-2',

    props.variant === 'outline' && 'bg-transparent border-primary text-primary-ink',
    props.variant === 'outline' && isInteractive.value && 'hover:bg-primary hover:text-on-primary',

    props.variant === 'ghost' && props.tone === 'accent' && 'text-primary-ink',
    props.variant === 'ghost' && props.tone === 'accent' && isInteractive.value && 'hover:text-primary-ink-hover',
    props.variant === 'ghost' && props.tone === 'neutral' && (props.isActive ? 'text-ink bg-surface-2' : 'text-ink-muted'),
    props.variant === 'ghost' && props.tone === 'neutral' && isInteractive.value && 'hover:text-ink hover:bg-surface-2',

    props.variant === 'tab' && 'relative uppercase after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary after:sb-transition',
    props.variant === 'tab' && (props.isActive ? 'text-ink after:scale-x-100' : 'text-ink-muted hover:text-ink after:scale-x-0'),
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
