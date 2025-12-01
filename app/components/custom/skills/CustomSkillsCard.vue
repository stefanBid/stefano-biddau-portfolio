<script setup lang="ts">
interface CustomSkillCardProps {
  name: string
  level: number
  icon: string
  gold?: boolean
}

// Input / Output
const props = withDefaults(defineProps<CustomSkillCardProps>(), {
  gold: false,
})
</script>

<template>
  <BaseCard
    class="relative overflow-hidden rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.7)] ring-1 ring-white/5"
    :class="props.gold ? 'gold-card border-sb-contrast/50!' : ''"
    full-custom-content
    variant="dark"
  >
    <div class="flex items-center gap-4 md:gap-6 u-sb-soft-transition">
      <!-- Icon -->
      <div
        class="flex items-center justify-center size-12 sm:size-14 md:size-16 rounded-xl
               bg-sb-surface-2 shadow-[0_6px_14px_rgba(0,0,0,0.65)]
               ring-1 ring-white/15 z-10 shrink-0 u-sb-soft-transition"
        :class="props.gold ? 'gold-icon' : ''"
      >
        <Icon
          class="size-7 sm:size-8 md:size-9 text-sb-contrast u-sb-soft-transition"
          :name="props.icon"
        />
      </div>

      <div class="flex flex-col flex-1">
        <!-- Skill Name -->
        <span
          class="ty-sb-subtitle-lg font-bebas-neue! leading-tight! font-normal! text-sb-contrast u-sb-soft-transition"
        >
          {{ props.name }}
        </span>

        <!-- Level (0–5) -->
        <div class="flex gap-1 mt-1">
          <div
            v-for="n in 5"
            :key="n"
            class="size-3.5 rounded-sm u-sb-soft-transition"
            :class="
              props.gold
                ? 'gold-level-on'
                : (n <= props.level ? 'bg-sb-accent' : 'bg-sb-muted/40')
            "
          ></div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.gold-card {
  /* only the “gold bar” effect, the rest (shadow, radius, ring) is handled by Tailwind */
  background:
    radial-gradient(circle at 10% 0%, #7a5a1f 0, #3a280e 35%),
    linear-gradient(145deg, #d4af37 0%, #8b6b1f 35%, #f0d58c 60%, #5a4216 100%);
  background-blend-mode: multiply;
}

/* “gold bar” highlight */
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

/* keep content above the overlay */
.gold-card > * {
  position: relative;
  z-index: 1;
}

/* icon container in gold mode, on top of the base Tailwind elevation */
.gold-icon {
  background: radial-gradient(circle at 30% 0%, #f3e29b 0, #b3861a 45%, #4a3210 100%);
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.65),
    inset 0 1px 2px rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

/* “mini gold bar” level dots (used only when gold is true) */
.gold-level-on {
  background: linear-gradient(
    135deg,
    #f3e29b 0%,
    #d4af37 45%,
    #8b6b1f 100%
  );
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.7),
    inset 0 1px 1px rgba(255, 255, 255, 0.35);
}
</style>
