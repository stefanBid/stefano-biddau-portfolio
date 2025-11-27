<script setup lang="ts">
interface BaseCheckboxProps {
  id: string
  name?: string
  label?: string
  error?: string
}

// Input / Output
const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  name: undefined,
  label: undefined,
  error: undefined,
})

const model = defineModel<boolean>('input')
</script>

<template>
  <div class="inline-flex h-fit items-center gap-2">
    <input
      :id="props.id"
      v-model="model"
      :aria-invalid="props.error ? 'true' : 'false'"
      autocomplete="on"
      class="
      relative
      peer size-4.5 md:size-5 shrink-0 rounded-md border
      u-sb-soft-transition cursor-pointer
      appearance-none
      outline-none
      bg-sb-surface-2
      checked:bg-sb-accent-hover
      checked:border-sb-contrast
      focus-visible:ring-2
      focus-visible:ring-sb-accent
      before:absolute
      before:left-1/2 before:top-1/2
      before:-translate-x-1/2 before:-translate-y-1/2
      before:flex before:items-center before:justify-center
      before:text-sb-contrast before:text-lg
      before:content-['✓'] before:opacity-0
      checked:before:opacity-100
    "
      :class="props.error ? 'border-red-500' : 'border-sb-border'"
      :name="props.name || `${props.id}-name`"
      type="checkbox"
    />

    <span
      v-if="!$slots.default"
      class="ty-sb-caption text-sb-contrast u-sb-soft-transition"
    >
      {{ props.label }}
    </span>
    <span
      v-else
      class="ty-sb-caption text-sb-contrast u-sb-soft-transition"
    >
      <slot></slot>
    </span>
  </div>
</template>
