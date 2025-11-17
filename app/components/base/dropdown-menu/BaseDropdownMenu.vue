<script setup lang="ts">
type DropdownMenuItem = {
  id: string
  label: string
  iconifyString?: string
}

interface BaseDropdownMenuProps {
  items: DropdownMenuItem[]
  selectedItemId?: string
  label?: string
  offsetY?: number
  position?: 'left' | 'right'
}

// Imput / Output
const props = withDefaults(defineProps<BaseDropdownMenuProps>(), {
  label: undefined,
  offsetY: 8,
  position: 'left',
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', itemId: string): void
}>()

// Dependencies

// State
const button = ref<HTMLElement | null>(null)
const tooltip = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)

const isOpen = ref(false)

const alignmentClass = computed(() =>
  props.position === 'right' ? 'right-0' : 'left-0',
)
const offsetStyle = computed(() => ({
  marginTop: `${props.offsetY ?? 8}px`,
}))

// Events
const onToggleMenu = (newVal: boolean) => {
  if (newVal === isOpen.value) {
    return
  }

  isOpen.value = newVal

  if (newVal) {
    // Focus first menuitem after the DOM is updated
    nextTick(() => {
      const first = menu.value?.querySelector<HTMLElement>('[role="menuitem"]')

      first?.focus()
    })
  }
  else {
    // Return focus to the trigger for accessibility
    button.value?.focus()
  }
}

const onSelect = (itemId: string) => {
  emit('select', itemId)
  onToggleMenu(false)
}

onClickOutside(tooltip, () => {
  onToggleMenu(false)
}, { ignore: [button] })

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    onToggleMenu(false)
  }
}

onMounted(() => {
  if (!import.meta.client) {
    return
  }
  // Bind keyboard listener only in client runtime
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (!import.meta.client) {
    return
  }
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="relative inline-block">
    <!-- Trigger -->
    <button
      ref="button"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-haspopup="'menu'"
      class="inline-flex items-center gap-2 rounded-xl px-3 py-2 md:px-4 md:py-2.5
             bg-sb-surface text-sb-contrast hover:bg-sb-surface/90 transition sb-focus ty-sb-btn-label"
      type="button"
      @click="onToggleMenu(!isOpen)"
    >
      {{ label ?? 'Menu' }}
      <svg aria-hidden="true" class="size-4 md:size-5" viewBox="0 0 20 20">
        <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" fill="currentColor" />
      </svg>
    </button>

    <!-- Menu -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 origin-top rounded-2xl border border-sb-border/60 bg-sb-surface shadow-xl
               min-w-48 sm:min-w-56"
        :class="alignmentClass"
        :style="offsetStyle"
      >
        <ul
          ref="menu"
          class="py-1 md:py-1.5 outline-none"
          role="menu"
        >
          <li v-for="item in props.items" :key="item.id">
            <button
              :aria-current="item.id === props.selectedItemId ? 'true' : 'false'"
              class="group block w-full text-left rounded-xl mx-1
                     px-3 py-2 md:px-3.5 md:py-2.5
                     text-sb-contrast hover:bg-sb-surface-2 focus:outline-none sb-focus ty-sb-label normal-case!"
              role="menuitem"
              type="button"
              @click="onSelect(item.id)"
            >
              <span class="inline-flex items-center gap-2">
                <!-- optional icon slot via iconify string -->
                <svg v-if="item.iconifyString" aria-hidden="true" class="size-4 md:size-5 opacity-80">
                  <!-- placeholder; render your Iconify component here if needed -->
                </svg>
                <span class="truncate">{{ item.label }}</span>
                <span
                  v-if="item.id === props.selectedItemId"
                  aria-hidden="true"
                  class="ml-auto opacity-80"
                >✓</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
