<script setup lang="ts" generic="T">
import { SbContainer, SbFloating, SbReference } from 'sb-floating-panel-vue'

interface BaseComboboxProps {
  id: string
  type?: 'single' | 'multiple'
  items: {
    label: string
    value: T
  }[]
  label?: string
  placeholder?: string
  hint?: string
  error?: string | null
  prefixIcon?: string
  hideLabelOnMobile?: boolean
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<BaseComboboxProps>(), {
  type: 'single',
  label: undefined,
  placeholder: 'Insert a value...',
  hint: undefined,
  error: null,
  prefixIcon: undefined,
  hideLabelOnMobile: false,
})

const model = defineModel<T[]>('input', {
  default: () => [],
})

// Data
const valuesWithCommas = computed<string>(() => {
  if (model.value.length > 1) {
    return t('a11y.selectedCount', { count: model.value.length })
  }
  return model.value.map((v) => {
    const item = props.items.find(i => i.value === v)
    return item ? item.label : ''
  }).join(', ')
})

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

// Events
const onSelect = (value: T) => {
  if (props.type === 'multiple') {
    model.value = model.value.includes(value)
      ? model.value.filter(v => v !== value)
      : [...model.value, value]
    return
  }
  model.value = model.value.includes(value) ? [] : [value]
}
</script>

<template>
  <SbContainer
    match-width
    placement="bottom"
    strategy="fixed"
  >
    <template #default="{ isOpen }">
      <div>
        <label
          v-if="props.label"
          :id="`${props.id}-label`"
          class="block text-ink-muted mb-2 md:mb-3 sb-transition"
          :class="{ 'max-md:sr-only': props.hideLabelOnMobile }"
          :for="props.id"
        >
          {{ props.label }}
        </label>

        <div class="relative">
          <span
            v-if="props.prefixIcon"
            class="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-ink-muted sb-transition pointer-events-none"
          >
            <Icon class="size-5" :name="props.prefixIcon" />
          </span>

          <span class="absolute top-1/2 right-3 md:right-4 transform -translate-y-1/2 text-ink sb-transition pointer-events-none">
            <Icon
              class="size-6 sb-transition"
              :class="{
                'rotate-0': !isOpen,
                'rotate-180': isOpen,
              }"
              name="solar:alt-arrow-down-line-duotone"
            />
          </span>

          <!-- Labelled by the label and its own text, so the selected value is announced too -->
          <SbReference
            :id="props.id"
            :aria-describedby="describedBy"
            :aria-invalid="props.error ? 'true' : 'false'"
            :aria-labelledby="props.label ? `${props.id}-label ${props.id}` : undefined"
            class="block w-full rounded-lg bg-surface-2 border pl-3 pr-10 py-2 md:pl-4 md:pr-11 md:py-2.5 text-left sb-body cursor-pointer sb-transition focus:outline-none focus:ring-2 focus:ring-focus-ring"
            :class="{
              'border-error': props.error,
              'border-border-strong': !props.error,
              'pl-9! md:pl-10!': props.prefixIcon,
            }"
          >
            <span class="block truncate" :class="valuesWithCommas ? 'text-ink' : 'text-ink-muted'">
              {{ valuesWithCommas || props.placeholder }}
            </span>
          </SbReference>
        </div>

        <!-- Hint -->
        <p
          v-if="props.hint"
          :id="`${props.id}-hint`"
          class="sb-small text-ink-muted mt-1.5 sb-transition"
        >
          {{ props.hint }}
        </p>

        <!-- Error -->
        <p
          v-if="props.error"
          :id="`${props.id}-error`"
          class="sb-small text-error mt-1.5 sb-transition"
        >
          {{ props.error }}
        </p>
      </div>

      <SbFloating
        :aria-label="props.label"
        :aria-multiselectable="props.type === 'multiple' ? 'true' : undefined"
        as="ul"
        class="max-h-80 overflow-y-auto p-1 mb-0 rounded-lg border border-border/60 bg-surface shadow-md outline-none"
        close-on-select
        role="listbox"
        transition="scale-fade"
        :z-index="300"
      >
        <li v-for="item in props.items" :key="item.label" role="none">
          <button
            :aria-selected="model.includes(item.value) ? 'true' : 'false'"
            class="inline-flex w-full items-center gap-2 min-h-11 px-3 rounded-md text-left sb-label cursor-pointer sb-transition sb-focus"
            :class="model.includes(item.value) ? 'bg-surface-2 text-ink' : 'text-ink-muted hover:bg-surface-2 hover:text-ink'"
            role="option"
            type="button"
            @click="onSelect(item.value)"
          >
            <span class="truncate flex-1">{{ item.label }}</span>
            <Icon
              v-if="model.includes(item.value)"
              aria-hidden="true"
              class="size-5 text-primary-ink sb-transition"
              name="solar:check-circle-bold-duotone"
            />
          </button>
        </li>
      </SbFloating>
    </template>
  </SbContainer>
</template>
