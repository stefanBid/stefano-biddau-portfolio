<script setup lang="ts">
import type { SkillTier } from '~/composables/data/useSkills'

interface CustomSkillsTierIconProps {
  tier: SkillTier
}

// Input / Output
const props = defineProps<CustomSkillsTierIconProps>()

// Data
const RINGS: { tier: SkillTier, r: number }[] = [
  { tier: 'core', r: 3 },
  { tier: 'solid', r: 6 },
  { tier: 'familiar', r: 9 },
]
</script>

<template>
  <svg
    aria-hidden="true"
    class="size-5 shrink-0"
    fill="none"
    viewBox="0 0 20 20"
  >
    <circle
      v-for="ring in RINGS"
      :key="ring.tier"
      :class="ring.tier === props.tier ? 'text-primary-ink' : 'text-ink-muted/40'"
      cx="10"
      cy="10"
      :r="ring.r"
      stroke="currentColor"
      :stroke-width="ring.tier === props.tier ? 2 : 1"
    />
  </svg>
</template>
