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
const onClose = (event: MouseEvent) => {
  event.stopPropagation()
  emit('close', false)
}
</script>

<template>
  <BaseButton
    :aria-label="props.label"
    icon-only
    variant="ghost"
    @click="onClose"
  >
    <Icon
      aria-hidden="true"
      class="size-6 md:size-7"
      name="solar:close-circle-bold-duotone"
    />
  </BaseButton>
</template>
