<script setup lang="ts">
interface BaseCheckboxProps {
  id: string
  name?: string
  label: string
  invalid?: boolean
}

// Input / Output
const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  name: undefined,
  invalid: false,
})

const model = defineModel<boolean>('input')
</script>

<template>
  <div
    class="inline-flex h-fit items-center gap-2"
  >
    <input
      :id="props.id"
      v-model="model"
      :aria-invalid="props.invalid ? 'true' : 'false'"
      autocomplete="on"
      class="size-4 rounded border bg-sb-surface-2 text-sb-accent focus:ring-2 focus:ring-sb-accent u-sb-soft-transition"
      :class="props.invalid ? 'border-sb-danger' : 'border-sb-border'"
      :name="props.name || `${props.id}-name`"
      type="checkbox"
    />

    <span class="ty-sb-paragraph text-sb-contrast u-sb-soft-transition">
      {{ props.label }}
    </span>
  </div>
</template>
