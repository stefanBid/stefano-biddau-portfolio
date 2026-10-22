<script setup lang="ts">
interface BaseTabsProps {
  tabs: Array<{ label: string, icon?: string, id: string | number }>
  selectedTabId?: string | number
  variant?: 'primary' | 'secondary'
  align?: 'left' | 'center' | 'right'
  panelId?: string
}

// Input / Output
const props = withDefaults(defineProps<BaseTabsProps>(), {
  selectedTabId: undefined,
  variant: 'primary',
  align: 'left',
  panelId: undefined,
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', tabId: string | number): void
}>()

// Data
const tablistRef = ref<HTMLElement | null>(null)

const safeSelectedTabId = computed(() => props.selectedTabId ?? props.tabs[0]?.id ?? '')

// Events
const onSelectTab = (tabId: string | number) => {
  if (safeSelectedTabId.value === tabId) {
    return
  }
  emit('select', tabId)
}

const onKeydown = (e: KeyboardEvent, index: number) => {
  const keys: Record<string, number> = {
    ArrowRight: index + 1,
    ArrowDown: index + 1,
    ArrowLeft: index - 1,
    ArrowUp: index - 1,
    Home: 0,
    End: props.tabs.length - 1,
  }
  const target = keys[e.key]
  if (target === undefined) {
    return
  }
  e.preventDefault()
  const next = (target + props.tabs.length) % props.tabs.length
  tablistRef.value?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
  const tab = props.tabs[next]
  if (tab) {
    onSelectTab(tab.id)
  }
}
</script>

<template>
  <div
    ref="tablistRef"
    class="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center md:gap-4 pb-4 md:pb-6 border-b border-border sb-transition"
    :class="{
      'sm:justify-start': props.align === 'left',
      'sm:justify-end': props.align === 'right',
    }"
    role="tablist"
  >
    <button
      v-for="(tab, index) in props.tabs"
      :key="tab.id"
      :aria-controls="props.panelId"
      :aria-selected="safeSelectedTabId === tab.id"
      class="sb-body-strong uppercase border gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg sb-transition inline-flex items-center justify-center cursor-pointer sb-focus"
      :class="[
        // Primary variant
        props.variant === 'primary'
          ? safeSelectedTabId === tab.id
            ? 'bg-primary hover:bg-primary-hover border-primary-border text-on-primary'
            : 'bg-transparent hover:bg-surface-2 border-border text-ink hover:text-ink'
          : '',

        // Secondary variant
        props.variant === 'secondary'
          ? safeSelectedTabId === tab.id
            ? 'bg-surface-2 hover:bg-surface border-border text-ink'
            : 'bg-transparent hover:bg-surface-2 border-border text-ink hover:text-ink'
          : '',

      ]"
      role="tab"
      :tabindex="safeSelectedTabId === tab.id ? 0 : -1"
      type="button"
      @click="onSelectTab(tab.id)"
      @keydown="onKeydown($event, index)"
    >
      <Icon
        v-if="tab.icon"
        aria-hidden="true"
        class="size-5 md:size-6"
        :name="tab.icon"
      />
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>
