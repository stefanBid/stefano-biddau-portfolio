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
    <p class="text-sb-accent ty-sb-label text-center u-sb-soft-transition" v-html="props.announcementRich">
    </p>

    <button
      class="inline-flex group items-center rounded-xl p-1 u-sb-focus ml-4 cursor-pointer text-sb-muted hover:text-sb-contrast u-sb-soft-transition"
      @click.stop="onClose"
    >
      <Icon
        class="size-4 md:size-6"
        name="solar:close-circle-bold-duotone"
      />
    </button>
  </div>
</template>
