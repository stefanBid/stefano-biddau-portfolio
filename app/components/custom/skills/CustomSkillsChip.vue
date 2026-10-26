<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface CustomSkillsChipProps {
  name: string
  icon: string
  gold?: boolean
  onLight?: boolean
  to?: RouteLocationRaw
  seenIn?: string
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<CustomSkillsChipProps>(), {
  gold: false,
  onLight: false,
  to: undefined,
  seenIn: undefined,
})

// Data
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'span'"
    class="inline-flex items-center gap-2.5 rounded-md border py-1.5 pl-1.5"
    :class="[
      props.gold ? 'gold-chip' : 'border-border bg-surface',
      props.to ? 'group pr-2.5 hover:border-ink-muted sb-transition sb-focus' : 'pr-3',
    ]"
    :to="props.to"
  >
    <span
      class="flex items-center justify-center size-8 shrink-0 rounded-sm"
      :class="[props.onLight ? 'bg-ink' : 'bg-surface-2', { 'gold-icon': props.gold }]"
    >
      <Icon
        aria-hidden="true"
        class="size-5"
        :name="props.icon"
      />
    </span>
    <span class="sb-body-strong text-ink hyphens-none">{{ props.name }}</span>
    <template v-if="props.to">
      <Icon
        aria-hidden="true"
        class="size-4 shrink-0 text-ink-muted group-hover:text-primary-ink sb-transition"
        name="solar:arrow-right-linear"
      />
      <span v-if="props.seenIn" class="sr-only">, {{ t('pages.skills.chipSeenIn', { place: props.seenIn }) }}</span>
    </template>
  </component>
</template>

<style scoped>
.gold-chip {
  border-color: color-mix(in oklab, var(--sb-gold-300) 55%, transparent);
  background: linear-gradient(135deg, var(--sb-gold-800) 0%, var(--sb-gold-900) 70%);
}

/* Gold rim around the tile, not behind the logo: brand colours keep their contrast */
.gold-icon {
  box-shadow:
    0 0 0 2px var(--sb-gold-300),
    0 1px 6px color-mix(in oklab, var(--sb-gold-300) 35%, transparent);
}
</style>
