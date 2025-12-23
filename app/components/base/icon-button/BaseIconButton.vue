<script setup lang="ts">
interface BaseIconButtonProps {
  icon: string
  ariaLabel?: string
  isActive?: boolean
}

// Input / Output
const props = withDefaults(defineProps<BaseIconButtonProps>(), {
  ariaLabel: undefined,
  isActive: false,
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'click'): void
}>()

// Events
const onClick = () => {
  emit('click')
}
</script>

<template>
  <button
    :aria-label="props.ariaLabel"
    class="group relative inline-flex items-center justify-center rounded-lg border border-sb-border u-sb-soft-transition u-sb-focus cursor-pointer size-7 md:size-8"
    :class="{
      'bg-sb-surface-2': props.isActive,
      'bg-sb-surface border hover:bg-sb-surface-2': !props.isActive,
    }"
    type="button"
    @click="onClick"
  >
    <Icon
      class="size-4.5 md:size-5"
      :class="{
        'text-sb-contrast': props.isActive,
        'text-sb-muted group-hover:text-sb-contrast': !props.isActive,
      }"
      :name="props.icon"
    />
  </button>
</template>
