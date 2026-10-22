<script setup lang="ts">
interface BaseIconMenuProps {
  icon: string
  label: string
  items: Array<MenuItem>
  selectedItemId?: string | null
}

// Input / Output
const props = withDefaults(defineProps<BaseIconMenuProps>(), {
  selectedItemId: null,
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', itemId: string): void
}>()

// Floating UI composable
const { reference, floating, floatingStyles, open, toggleFloating } = useFloatingUi({
  placement: 'bottom-start',
  offset: 8,
  strategy: 'fixed',
})

// State
const menu = ref<HTMLElement | null>(null)

const _focusTrigger = () => {
  reference.value?.querySelector<HTMLElement>('button')?.focus()
}

// Events
const onSelect = (itemId: string) => {
  emit('select', itemId)
  toggleFloating(false)
  nextTick(() => _focusTrigger())
}

onClickOutside(floating, () => {
  toggleFloating(false)
}, { ignore: [reference] })

const _items = () => Array.from(menu.value?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? [])

// Capture phase + stopPropagation: Escape closes only this menu, not an enclosing dialog or drawer
const onKeydown = (e: KeyboardEvent) => {
  if (!open.value) {
    return
  }
  if (e.key === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    toggleFloating(false)
    _focusTrigger()
    return
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const items = _items()
    if (!items.length) {
      return
    }
    e.preventDefault()
    const index = items.indexOf(document.activeElement as HTMLElement)
    const step = e.key === 'ArrowDown' ? 1 : -1
    items[(index + step + items.length) % items.length]?.focus()
  }
}

onMounted(() => {
  if (!import.meta.client) {
    return
  }
  window.addEventListener('keydown', onKeydown, true)
})

onBeforeUnmount(() => {
  if (!import.meta.client) {
    return
  }
  window.removeEventListener('keydown', onKeydown, true)
})

watch(open, (newVal) => {
  if (newVal) {
    nextTick(() => {
      const items = _items()
      const selected = items.find(el => el.getAttribute('aria-checked') === 'true')
      ;(selected ?? items[0])?.focus()
    })
  }
})
</script>

<template>
  <div class="relative inline-block">
    <!-- Trigger -->
    <div ref="reference">
      <slot
        :is-open="open"
        name="trigger"
        :toggle="toggleFloating"
      >
        <BaseIconButton
          :aria-expanded="open ? 'true' : 'false'"
          aria-haspopup="menu"
          :aria-label="props.label"
          :icon="props.icon"
          :is-active="open"
          :text="props.selectedItemId ?? undefined"
          @click="toggleFloating(!open)"
        />
      </slot>
    </div>

    <!-- Menu -->
    <Teleport to="body">
      <transition name="scale-fade">
        <div
          v-if="open"
          ref="floating"
          class="z-300 rounded-lg border border-border/60 bg-surface w-fit shadow-md"
          :style="floatingStyles"
        >
          <ul
            ref="menu"
            :aria-label="props.label"
            class="p-2 outline-none space-y-2 mb-0"
            role="menu"
          >
            <li v-for="item in props.items" :key="item.code" role="none">
              <button
                :aria-checked="item.code === props.selectedItemId ? 'true' : 'false'"
                class="inline-flex w-full items-center gap-2 min-h-11 px-3 rounded-md text-left sb-label cursor-pointer sb-transition sb-focus"
                :class="item.code === props.selectedItemId ? 'bg-surface-2 text-ink' : 'text-ink-muted hover:bg-surface-2 hover:text-ink'"
                role="menuitemradio"
                type="button"
                @click="onSelect(item.code)"
              >
                <span class="truncate flex-1">{{ item.label }}</span>
                <Icon
                  v-if="item.code === props.selectedItemId"
                  aria-hidden="true"
                  class="size-4 shrink-0 text-primary-ink"
                  name="solar:check-circle-bold-duotone"
                />
                <template v-if="item.icon && item.iconType ">
                  <Icon
                    v-if="item.iconType === 'nuxt-icon'"
                    aria-hidden="true"
                    class="size-4 shrink-0"
                    :name="item.icon"
                  />
                  <NuxtImg
                    v-else-if="item.iconType === 'custom'"
                    alt=""
                    class="size-4 shrink-0"
                    :src="item.icon"
                  />
                </template>
              </button>
            </li>
          </ul>
        </div>
      </transition>
    </Teleport>
  </div>
</template>
