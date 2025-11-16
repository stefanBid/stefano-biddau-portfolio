<script setup lang="ts">
// Input / Output
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
    class="inline-flex group items-center rounded-xl p-1 u-sb-focus ml-4 cursor-pointer text-sb-muted hover:text-sb-contrast u-sb-soft-transition"
    @click.stop="onClose"
  >
    <Icon
      class="size-6 md:size-7 u-sb-soft-transition"
      name="solar:close-circle-bold-duotone"
    />
  </button>
</template>
