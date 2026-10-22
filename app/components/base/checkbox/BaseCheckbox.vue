<script setup lang="ts">
interface BaseCheckboxProps {
  id: string
  name?: string
  label?: string
  error?: string | null
}

// Input / Output
const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  name: undefined,
  label: undefined,
  error: null,
})

const model = defineModel<boolean>('input')
</script>

<template>
  <div>
    <div class="flex h-fit items-start gap-3">
      <input
        :id="props.id"
        v-model="model"
        :aria-describedby="props.error ? `${props.id}-error` : undefined"
        :aria-invalid="props.error ? 'true' : 'false'"
        class="
        relative
        peer size-5 mt-0.5 shrink-0 rounded-md border
        sb-transition cursor-pointer
        appearance-none
        outline-none
        bg-surface-2
        checked:bg-primary
        checked:border-primary
        focus-visible:ring-2
        focus-visible:ring-focus-ring
        before:absolute
        before:left-1/2 before:top-1/2
        before:-translate-x-1/2 before:-translate-y-1/2
        before:flex before:items-center before:justify-center
        before:text-on-primary before:sb-body-strong
        before:content-['✓'] before:opacity-0
        checked:before:opacity-100
      "
        :class="props.error ? 'border-error' : 'border-border-strong'"
        :name="props.name || `${props.id}-name`"
        type="checkbox"
      />

      <label
        class="sb-label normal-case text-ink cursor-pointer sb-transition"
        :for="props.id"
      >
        <slot>{{ props.label }}</slot>
      </label>
    </div>

    <p
      v-if="props.error"
      :id="`${props.id}-error`"
      class="sb-small text-error mt-2 pl-8 sb-transition"
      role="alert"
    >
      {{ props.error }}
    </p>
  </div>
</template>
