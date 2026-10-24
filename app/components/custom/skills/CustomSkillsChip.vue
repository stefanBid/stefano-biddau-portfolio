<script setup lang="ts">
interface CustomSkillsChipProps {
  name: string
  icon: string
  gold?: boolean
  onLight?: boolean
}

// Input / Output
const props = withDefaults(defineProps<CustomSkillsChipProps>(), {
  gold: false,
  onLight: false,
})
</script>

<template>
  <span
    class="inline-flex items-center gap-2.5 rounded-md border py-1.5 pl-1.5 pr-3"
    :class="props.gold ? 'gold-chip' : 'border-border bg-surface'"
  >
    <span
      class="flex items-center justify-center size-8 shrink-0 rounded-sm"
      :class="props.gold ? 'gold-icon' : (props.onLight ? 'bg-ink' : 'bg-surface-2')"
    >
      <Icon
        aria-hidden="true"
        class="size-5"
        :name="props.icon"
      />
    </span>
    <span class="sb-body-strong text-ink hyphens-none">{{ props.name }}</span>
  </span>
</template>

<style scoped>
.gold-chip {
  border-color: color-mix(in oklab, var(--sb-gold-300) 55%, transparent);
  background: linear-gradient(135deg, var(--sb-gold-800) 0%, var(--sb-gold-900) 70%);
}

.gold-icon {
  background: radial-gradient(circle at 30% 0%, var(--sb-gold-100) 0, var(--sb-gold-400) 45%, var(--sb-gold-800) 100%);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.35);
}
</style>
