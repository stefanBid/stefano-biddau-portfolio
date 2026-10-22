<script setup lang="ts">
interface BaseCloseButtonProps {
  label: string
}

// Input / Output
const props = defineProps<BaseCloseButtonProps>()

const emit = defineEmits <{
  // eslint-disable-next-line no-unused-vars
  (e: 'close', falsyValue: false): void
}>()

// Events
const onClose = () => {
  emit('close', false)
}
</script>

<template>
  <button
    :aria-label="props.label"
    class="inline-flex group items-center rounded-lg p-1 sb-focus ml-4 cursor-pointer text-ink-muted hover:text-ink sb-transition"
    type="button"
    @click.stop="onClose"
  >
    <Icon
      aria-hidden="true"
      class="size-6 md:size-7 sb-transition"
      name="solar:close-circle-bold-duotone"
    />
  </button>
</template>
