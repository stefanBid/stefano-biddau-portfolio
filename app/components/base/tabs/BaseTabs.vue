<script setup lang="ts">
interface BaseTabsProps {
  tabs: Array<{ label: string, icon?: string, id: string | number }>
  variant?: 'primary' | 'secondary'
  align?: 'left' | 'center' | 'right'
}

// Input / Output
const props = withDefaults(defineProps<BaseTabsProps>(), {
  variant: 'primary',
  align: 'left',
})

const selectedTabId = defineModel<string | number>('selectedTabId')

// Computed
const safeSelectedTabId = computed({
  get: () => selectedTabId.value ?? props.tabs[0]?.id ?? '',
  set: (value: string | number) => {
    selectedTabId.value = value
  },
})

// Events
const onSelectTab = (tabId: string | number) => {
  if (safeSelectedTabId.value === tabId) {
    return
  }
  safeSelectedTabId.value = tabId
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center md:gap-4 pb-4 md:pb-6 border-b border-sb-border u-sb-soft-transition"
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
      class="ty-sb-btn-label border gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-xl u-sb-soft-transition inline-flex items-center justify-center cursor-pointer u-sb-focus"
      :class="[
        // Primary variant
        props.variant === 'primary'
          ? safeSelectedTabId === tab.id
            ? 'bg-sb-accent hover:bg-sb-accent-hover border-sb-accent-border text-sb-contrast'
            : 'bg-transparent hover:bg-sb-surface-2 border-sb-border text-sb-text hover:text-sb-contrast'
          : '',

        // Secondary variant
        props.variant === 'secondary'
          ? safeSelectedTabId === tab.id
            ? 'bg-sb-surface-2 hover:bg-sb-surface border-sb-border text-sb-contrast'
            : 'bg-transparent hover:bg-sb-surface-2 border-sb-border text-sb-text hover:text-sb-contrast'
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
