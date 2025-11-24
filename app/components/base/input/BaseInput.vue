<script setup lang="ts">
interface BaseInputProps {
  id: string
  name?: string
  label?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
  hint?: string
  error?: string | null
  autocomplete?: string
}
// Input / Output
const props = withDefaults(defineProps<BaseInputProps>(), {
  label: undefined,
  placeholder: 'Insert a value...',
  type: 'text',
  name: undefined,
  autocomplete: 'off',
  hint: undefined,
  error: null,
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
      class="ty-sb-label block text-sb-muted u-sb-soft-transition mb-2 md:mb-3"
      :for="props.id"
    >{{ props.label }}</label>
    <input
      :id="props.id"
      v-model="model"
      :aria-describedby="describedBy"
      :aria-invalid="props.error ? 'true' : 'false'"
      :autocomplete="props.autocomplete"
      class="w-full rounded-lg bg-sb-surface-2 border px-3 py-1.5 md:px-4 md:py-2 text-sb-contrast ty-sb-paragraph focus:outline-none focus:ring-2 focus:ring-sb-accent"
      :class="props.error ? 'border-red-500' : 'border-sb-border'"
      :name="props.name || `${props.id}-name`"
      :placeholder="props.placeholder"
      :type="props.type"
    />
    <!-- Hint -->
    <p
      v-if="props.hint"
      :id="`${props.id}-hint`"
      class="ty-sb-label normal-case! text-sb-muted mt-1 md:mt-1.5 u-sb-soft-transition"
    >
      {{ props.hint }}
    </p>

    <!-- Error -->
    <p
      v-if="props.error"
      :id="`${props.id}-error`"
      class="ty-sb-label normal-case! text-red-500 mt-1 md:mt-1.5 u-sb-soft-transition"
      role="alert"
    >
      {{ props.error }}
    </p>
  </div>
</template>
