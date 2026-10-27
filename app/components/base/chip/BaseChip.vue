<script setup lang="ts">
interface BaseChipProps {
  text: string
  icon?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  accentColor?: string
  clickable?: boolean
  linkable?: {
    href: string
    target?: string
    rel?: string
  }
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<BaseChipProps>(), {
  icon: undefined,
  variant: 'primary',
  accentColor: undefined,
  clickable: false,
  linkable: undefined,
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'chip-click'): void
}>()

// State
const componentTag = computed(() => {
  if (props.linkable) {
    return 'a'
  }
  if (props.clickable) {
    return 'button'
  }
  return 'span'
})

const isInteractive = computed(() => {
  return props.clickable || props.linkable
})

// Events
const onClick = () => {
  if (props.clickable) {
    emit('chip-click')
  }
}
</script>

<template>
  <component
    :is="componentTag"
    class="inline-flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg sb-transition"
    :class="{
      'bg-primary text-on-primary': props.variant === 'primary',
      'bg-surface border border-border text-ink': props.variant === 'secondary',
      'bg-transparent border border-primary text-primary-ink': props.variant === 'outline',
      'bg-transparent border border-border-strong text-ink': props.variant === 'ghost',
      'cursor-pointer hover:scale-105 active:scale-95': isInteractive && props.variant === 'primary',
      'cursor-pointer hover:bg-surface-2 active:bg-border': isInteractive && props.variant === 'secondary',
      'cursor-pointer hover:bg-primary hover:text-on-primary active:opacity-90': isInteractive && props.variant === 'outline',
    }"
    :href="props.linkable?.href"
    :rel="props.linkable?.rel"
    :style="props.accentColor ? { borderColor: props.accentColor } : undefined"
    :target="props.linkable?.target"
    :type="props.clickable ? 'button' : undefined"
    @click="onClick"
  >
    <Icon
      v-if="props.icon"
      aria-hidden="true"
      class="size-3.5 md:size-4"
      :name="props.icon"
    />
    <span class="sb-overline truncate">{{ props.text }}</span>
    <span v-if="props.linkable?.target === '_blank'" class="sr-only">({{ t('a11y.newTab') }})</span>
  </component>
</template>
