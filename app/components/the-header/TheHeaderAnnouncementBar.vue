<script setup lang="ts">
interface TheHeaderAnnouncementBarProps {
  announcementRich: string
}

const props = defineProps<TheHeaderAnnouncementBarProps>()
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'close', falsyValue: false): void
}>()

const onClose = () => {
  emit('close', false)
}
</script>

<template>
  <div
    class="flex items-center justify-center max-w-[1400px] mx-auto u-sb-soft-transition px-6 md:px-10 py-1.5"
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="text-sb-accent ty-sb-label text-justify u-sb-soft-transition" v-html="props.announcementRich">
    </p>

    <BaseCloseButton @close="onClose" />
  </div>
</template>
