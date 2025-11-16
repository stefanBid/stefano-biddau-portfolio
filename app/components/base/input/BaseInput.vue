<script setup lang="ts">
interface BaseInputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
}
// Input / Output
const props = withDefaults(defineProps<BaseInputProps>(), {
  label: undefined,
  placeholder: 'Insert a value...',
  type: 'text',
})

const model = defineModel<string>('input')
</script>

<template>
  <div class="space-y-3">
    <label class="ty-sb-label block text-sb-muted">{{ props.label }}</label>
    <input
      v-model="model"
      class="w-full rounded-lg bg-sb-surface-2 border border-sb-border px-4 py-2 text-sb-contrast ty-sb-paragraph focus:outline-none focus:ring-2 focus:ring-sb-accent"
      :placeholder="props.placeholder"
      :type="props.type"
    />
  </div>
</template>
