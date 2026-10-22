<script setup lang="ts">
interface CustomSkillCardProps {
  name: string
  level: number
  icon: string
  gold?: boolean
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<CustomSkillCardProps>(), {
  gold: false,
})
</script>

<template>
  <BaseCard
    class="relative overflow-hidden rounded-xl shadow-md ring-1 ring-ink/5"
    :class="props.gold ? 'gold-card border-ink/50!' : ''"
    full-custom-content
    variant="dark"
  >
    <div class="flex items-center gap-4 md:gap-6 sb-transition">
      <!-- Icon -->
      <div
        class="flex items-center justify-center size-12 sm:size-14 md:size-16 rounded-lg
               bg-surface-2 shadow-sm
               ring-1 ring-ink/15 z-10 shrink-0 sb-transition"
        :class="props.gold ? 'gold-icon' : ''"
      >
        <Icon
          aria-hidden="true"
          class="size-7 sm:size-8 md:size-9 text-ink sb-transition"
          :name="props.icon"
        />
      </div>

      <div class="flex flex-col flex-1">
        <!-- Skill Name -->
        <span
          class="sb-h4 text-ink sb-transition"
        >
          {{ props.name }}
        </span>

        <!-- Level (0–5) -->
        <div
          :aria-label="t('a11y.skillLevel', { level: props.gold ? 5 : props.level })"
          class="flex gap-1 mt-1"
          role="img"
        >
          <div
            v-for="n in 5"
            :key="n"
            class="size-3.5 rounded-sm sb-transition"
            :class="
              props.gold
                ? 'gold-level-on'
                : (n <= props.level ? 'bg-primary' : 'bg-ink-muted/40')
            "
          ></div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.gold-card {
  background:
    radial-gradient(circle at 10% 0%, var(--sb-gold-600) 0, var(--sb-gold-900) 35%),
    linear-gradient(145deg, var(--sb-gold-300) 0%, var(--sb-gold-500) 35%, var(--sb-gold-200) 60%, var(--sb-gold-700) 100%);
  background-blend-mode: multiply;
}

.gold-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.16),
    transparent 40%,
    transparent 60%,
    rgba(0, 0, 0, 0.35)
  );
  opacity: 0.9;
  pointer-events: none;
}

.gold-card > * {
  position: relative;
  z-index: 1;
}

.gold-icon {
  background: radial-gradient(circle at 30% 0%, var(--sb-gold-100) 0, var(--sb-gold-400) 45%, var(--sb-gold-800) 100%);
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.65),
    inset 0 1px 2px rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.gold-level-on {
  background: linear-gradient(
    135deg,
    var(--sb-gold-100) 0%,
    var(--sb-gold-300) 45%,
    var(--sb-gold-500) 100%
  );
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.7),
    inset 0 1px 1px rgba(255, 255, 255, 0.35);
}
</style>
