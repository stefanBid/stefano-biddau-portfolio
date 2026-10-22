<script setup lang="ts">
interface BaseTabsProps {
  tabs: Array<{ label: string, icon?: string, id: string | number }>
  selectedTabId?: string | number
  variant?: 'primary' | 'secondary'
  align?: 'left' | 'center' | 'right'
}

// Input / Output
const props = withDefaults(defineProps<BaseTabsProps>(), {
  selectedTabId: undefined,
  variant: 'primary',
  align: 'left',
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', tabId: string | number): void
}>()

// Computed
const safeSelectedTabId = computed(() => props.selectedTabId ?? props.tabs[0]?.id ?? '')

// Events
const onSelectTab = (tabId: string | number) => {
  if (safeSelectedTabId.value === tabId) {
    return
  }
  emit('select', tabId)
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center md:gap-4 pb-4 md:pb-6 border-b border-border sb-transition"
    :class="{
      'sm:justify-start': props.align === 'left',
      'sm:justify-end': props.align === 'right',
    }"
    role="tablist"
  >
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      :aria-selected="safeSelectedTabId === tab.id"
      class="sb-body-strong uppercase border gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg sb-transition inline-flex items-center justify-center cursor-pointer sb-focus"
      :class="[
        // Primary variant
        props.variant === 'primary'
          ? safeSelectedTabId === tab.id
            ? 'bg-primary hover:bg-primary-hover border-primary-border text-ink'
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
      type="button"
      @click="onSelectTab(tab.id)"
    >
      <Icon v-if="tab.icon" class="size-5 md:size-6" :name="tab.icon" />
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>
