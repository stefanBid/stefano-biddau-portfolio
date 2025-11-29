<script setup lang="ts">
interface CustomSkillCardProps {
  name: string
  level: number
  icon: string
}

// Input / Output
const props = defineProps<CustomSkillCardProps>()
</script>

<template>
  <BaseCard
    full-custom-content
    variant="dark"
  >
    <div class="flex items-center gap-4 md:gap-6 u-sb-soft-transition">
      <!-- Icon -->
      <div class="flex items-center justify-center size-12 sm:size-14 md:size-16 rounded-md bg-sb-surface-2 shadow-md z-10 u-sb-soft-transition">
        <Icon class="size-7 sm:size-8 md:size-9 text-sb-contrast u-sb-soft-transition" :name="props.icon" />
      </div>

      <div class="flex flex-col">
        <!-- Skill Name -->
        <span class="text-sb-contrast ty-sb-subtitle-lg font-bebas-neue! leading-tight! font-normal!">
          {{ props.name }}
        </span>

        <!-- Level (0–5) -->
        <div class="flex gap-1 mt-1">
          <div
            v-for="n in 5"
            :key="n"
            class="size-3.5 rounded-sm u-sb-soft-transition"
            :class="n <= props.level ? 'bg-sb-accent' : 'bg-sb-muted/40'"
          ></div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
