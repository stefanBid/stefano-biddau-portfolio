<script setup lang="ts">
interface CustomSkillCardProps {
  name: string
  icon: string
}

// Input / Output
const props = defineProps<CustomSkillCardProps>()
</script>

<template>
  <BaseCard
    class="relative overflow-hidden rounded-xl shadow-md ring-1 ring-ink/5 p-2! sm:p-3! md:p-4!"
    full-custom-content
    variant="dark"
  >
    <div class="flex flex-col items-center gap-3 text-center hyphens-none sb-transition">
      <div
        class="flex items-center justify-center size-12 sm:size-14 md:size-16 rounded-lg
               bg-surface-2 shadow-sm
               ring-1 ring-ink/15 z-10 shrink-0 sb-transition"
      >
        <Icon
          aria-hidden="true"
          class="size-7 sm:size-8 md:size-9 text-ink sb-transition"
          :name="props.icon"
        />
      </div>

      <span class="sb-h4 text-ink sb-transition">
        {{ props.name }}
      </span>
    </div>
  </BaseCard>
</template>
