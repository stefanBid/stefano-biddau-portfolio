<script setup lang="ts">
interface BaseTextareaProps {
  id: string
  name?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
}

// Input / Output
const props = withDefaults(defineProps<BaseTextareaProps>(), {
  label: undefined,
  placeholder: 'Insert a value...',
  name: undefined,
  hint: undefined,
  error: undefined,
})

const model = defineModel<string>('input')

const describedBy = computed(() => {
  const ids: string[] = []
  if (props.hint) {
    ids.push(`${props.id}-hint`)
  }
  if (props.error) {
    ids.push(`${props.id}-error`)
  }
  return ids.length ? ids.join(' ') : undefined
})
</script>

<template>
  <div>
    <label
      class="ty-sb-label block text-sb-muted u-sb-soft-transition mb-2 sm:mb-3"
      :for="props.id"
    >{{ props.label }}</label>
    <textarea
      :id="props.id"
      v-model="model"
      :aria-describedby="describedBy"
      :aria-invalid="props.error ? 'true' : 'false'"
      class="w-full rounded-lg bg-sb-surface-2 border border-sb-border px-3 py-1.5 sm:px-4 sm:py-2 text-sb-contrast ty-sb-paragraph focus:outline-none focus:ring-2 focus:ring-sb-accent resize-y min-h-38"
      :name="props.name || `${props.id}-name`"
      :placeholder="props.placeholder"
    ></textarea>
    <!-- Hint -->
    <p
      v-if="props.hint"
      :id="`${props.id}-hint`"
      class="ty-sb-label normal-case! text-sb-muted mt-1 sm:mt-1.5 u-sb-soft-transition"
    >
      {{ props.hint }}
    </p>
    <!-- Error -->
    <p
      v-if="props.error"
      :id="`${props.id}-error`"
      class="ty-sb-label normal-case! text-sb-danger mt-1 sm:mt-1.5 u-sb-soft-transition"
    >
      {{ props.error }}
    </p>
  </div>
</template>
