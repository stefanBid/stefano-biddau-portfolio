<script setup lang="ts" generic="T">
interface BaseComboboxProps {
  id: string
  name?: string
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
}

// Input / Output
const props = withDefaults(defineProps<BaseComboboxProps>(), {
  type: 'single',
  label: undefined,
  placeholder: 'Insert a value...',
  name: undefined,
  hint: undefined,
  error: null,
  prefixIcon: undefined,
})

const model = defineModel<T[]>('input', {
  default: () => [],
})

// Floating UI composable
const {
  reference,
  floating,
  floatingStyles,
  open,
  toggleFloating,
} = useFloatingUi({
  placement: 'bottom',
  offset: 8,
  strategy: 'fixed',
})

// State
const menu = ref<HTMLElement | null>(null)
const menuWidth = ref<string | null>(null)
const resizeRafId = ref<number | null>(null)

const { t } = useI18n()

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

// Helpers
const updateMenuWidth = () => {
  if (!import.meta.client) {
    return
  }
  const el = reference.value as HTMLElement | null
  if (el) {
    menuWidth.value = `${el.offsetWidth}px`
  }
}

// Events
const onSelect = (value: T) => {
  if (props.type === 'multiple') {
    if (model.value.includes(value)) {
      model.value = model.value.filter(v => v !== value)
    }
    else {
      model.value = [...model.value, value]
    }
  }
  else {
    if (model.value.includes(value)) {
      model.value = []
    }
    else {
      model.value = [value]
    }
    toggleFloating(false)
  }
}

// Click outside: close when clicking outside the menu, ignoring the trigger
onClickOutside(
  floating,
  () => {
    toggleFloating(false)
  },
  { ignore: [reference] },
)

const _options = () => Array.from(menu.value?.querySelectorAll<HTMLElement>('[role="option"]') ?? [])

// Capture phase + stopPropagation: Escape closes only the list, not the dialog around it
const onKeydown = (e: KeyboardEvent) => {
  if (!open.value) {
    return
  }
  if (e.key === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    toggleFloating(false)
    ;(reference.value as HTMLElement | null)?.focus()
    return
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const options = _options()
    if (!options.length) {
      return
    }
    e.preventDefault()
    const index = options.indexOf(document.activeElement as HTMLElement)
    const step = e.key === 'ArrowDown' ? 1 : -1
    options[(index + step + options.length) % options.length]?.focus()
  }
}

const onResize = () => {
  if (!import.meta.client) {
    return
  }
  // Throttle with requestAnimationFrame
  if (resizeRafId.value !== null) {
    cancelAnimationFrame(resizeRafId.value)
  }
  resizeRafId.value = requestAnimationFrame(() => {
    updateMenuWidth()
  })
}

onMounted(() => {
  if (!import.meta.client) {
    return
  }
  window.addEventListener('keydown', onKeydown, true)
  window.addEventListener('resize', onResize)
  // Initial width sync (in case the menu opens immediately)
  updateMenuWidth()
})

onBeforeUnmount(() => {
  if (!import.meta.client) {
    return
  }
  window.removeEventListener('keydown', onKeydown, true)
  window.removeEventListener('resize', onResize)
  if (resizeRafId.value !== null) {
    cancelAnimationFrame(resizeRafId.value)
  }
})

// When the menu opens, match width to the input and focus first item
watch(open, (newVal) => {
  if (!import.meta.client) {
    return
  }

  if (newVal) {
    nextTick(() => {
      updateMenuWidth()

      _options()[0]?.focus()
    })
  }
})
</script>

<template>
  <div>
    <label
      v-if="props.label"
      class="block text-ink-muted mb-2 md:mb-3 sb-transition"
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
            'rotate-0': !open,
            'rotate-180': open,
          }"
          name="solar:alt-arrow-down-line-duotone"
        />

      </span>

      <input
        :id="props.id"
        ref="reference"
        :aria-controls="`${props.id}-listbox`"
        :aria-describedby="describedBy"
        :aria-expanded="open ? 'true' : 'false'"
        aria-haspopup="listbox"
        :aria-invalid="props.error ? 'true' : 'false'"
        class="w-full rounded-lg bg-surface-2 border pl-3 pr-10 py-2 md:pl-4 md:pr-11 md:py-2.5 text-ink sb-body focus:outline-none focus:ring-2 focus:ring-focus-ring truncate"
        :class="{
          'border-error': props.error,
          'border-border-strong': !props.error,
          'pl-9! md:pl-10!': props.prefixIcon,
        }"
        :name="props.name || `${props.id}-name`"
        :placeholder="props.placeholder"
        readonly
        role="combobox"
        type="text"
        :value="valuesWithCommas"
        @click="toggleFloating(!open)"
        @keydown.down.prevent="toggleFloating(true)"
        @keydown.enter.prevent="toggleFloating(!open)"
        @keydown.space.prevent="toggleFloating(!open)"
      />
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

    <Teleport to="body">
      <transition name="scale-fade">
        <div
          v-if="open"
          ref="floating"
          class="z-300 rounded-lg border border-border/60 bg-surface shadow-md"
          :style="[
            floatingStyles,
            { width: menuWidth ? menuWidth : 'auto' },
          ]"
        >
          <ul
            :id="`${props.id}-listbox`"
            ref="menu"
            :aria-label="props.label"
            :aria-multiselectable="props.type === 'multiple' ? 'true' : undefined"
            class="outline-none max-h-80 overflow-y-auto p-1 mb-0"
            role="listbox"
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
          </ul>
        </div>
      </transition>
    </Teleport>
  </div>
</template>
