<script setup lang="ts">
interface BaseTabsProps {
  tabs: Array<{ label: string, icon?: string, id: string | number }>
  selectedTabId?: string | number
  align?: 'left' | 'center' | 'right'
  panelId?: string
}

// Input / Output
const props = withDefaults(defineProps<BaseTabsProps>(), {
  selectedTabId: undefined,
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
    class="flex flex-row flex-wrap gap-x-6 md:gap-x-8 border-b border-border"
    :class="{
      'justify-center': props.align === 'center',
      'justify-end': props.align === 'right',
    }"
    role="tablist"
  >
    <BaseButton
      v-for="(tab, index) in props.tabs"
      :key="tab.id"
      :aria-controls="props.panelId"
      :aria-selected="safeSelectedTabId === tab.id"
      :is-active="safeSelectedTabId === tab.id"
      role="tab"
      :tabindex="safeSelectedTabId === tab.id ? 0 : -1"
      variant="tab"
      @click="onSelectTab(tab.id)"
      @keydown="onKeydown($event, index)"
    >
      {{ tab.label }}
    </BaseButton>
  </div>
</template>
