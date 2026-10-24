<script setup lang="ts">
interface BaseTextareaProps {
  id: string
  name?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string | null
  maxLength?: number
  minLength?: number
}

// Input / Output
const props = withDefaults(defineProps<BaseTextareaProps>(), {
  label: undefined,
  placeholder: 'Insert a value...',
  name: undefined,
  hint: undefined,
  error: null,
  maxLength: undefined,
  minLength: undefined,
})

const model = defineModel<string>('input')

const describedBy = computed(() => {
  const ids: string[] = []
  if (props.hint && !props.error) {
    ids.push(`${props.id}-hint`)
  }
  if (props.error) {
    ids.push(`${props.id}-error`)
  }
  return ids.length ? ids.join(' ') : undefined
})

const lengths = computed(() => {
  const current = model.value?.length || 0
  // Below the minimum the counter tracks the minimum; past it, the maximum
  const belowMin = !!props.minLength && current < props.minLength
  return {
    current,
    target: belowMin ? props.minLength! : (props.maxLength || 0),
    isOver: !!props.maxLength && current > props.maxLength,
  }
})
</script>

<template>
  <div>
    <label
      class="block text-ink-muted sb-transition mb-2 md:mb-3"
      :for="props.id"
    >{{ props.label }}</label>
    <textarea
      :id="props.id"
      v-model="model"
      :aria-describedby="describedBy"
      :aria-invalid="props.error ? 'true' : 'false'"
      class="w-full rounded-lg bg-surface-2 border px-3 py-2 md:px-4 md:py-2.5 text-ink sb-body focus:outline-none focus:ring-2 focus:ring-focus-ring resize-y min-h-38"
      :class="props.error ? 'border-error' : 'border-border-strong'"
      :name="props.name || `${props.id}-name`"
      :placeholder="props.placeholder"
    ></textarea>
    <div class="flex items-start justify-between gap-4 mt-1.5">
      <p
        v-if="props.error"
        :id="`${props.id}-error`"
        class="sb-small text-error sb-transition"
      >
        {{ props.error }}
      </p>
      <p
        v-else-if="props.hint"
        :id="`${props.id}-hint`"
        class="sb-small text-ink-muted sb-transition"
      >
        {{ props.hint }}
      </p>
      <p
        v-if="props.maxLength || props.minLength"
        aria-hidden="true"
        class="ml-auto shrink-0 sb-small tabular-nums text-left"
        :class="lengths.isOver ? 'text-error' : 'text-ink-muted'"
      >
        {{ lengths.current }} / {{ lengths.target }}
      </p>
    </div>
  </div>
</template>
