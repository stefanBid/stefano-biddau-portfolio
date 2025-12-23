<script setup lang="ts">
interface TheNotificationBannerProps {
  type?: 'success' | 'warning' | 'error' | 'info'
  icon?: string | null
  title?: string | null
  message: string
  dismissible?: boolean
  autoClose?: boolean
  duration?: number
}
// Input / Output
const props = withDefaults(defineProps<TheNotificationBannerProps>(), {
  type: 'info',
  icon: null,
  title: null,
  dismissible: true,
  autoClose: false,
  duration: 5000,
})

const emit = defineEmits <{
  // eslint-disable-next-line no-unused-vars
  (e: 'close', falsyValue: false): void
}>()

// Events
const onClose = () => {
  emit('close', false)
}

onMounted(() => {
  // Auto-close logic
  if (props.autoClose && props.duration > 0 && import.meta.client) {
    setTimeout(() => {
      onClose()
    }, props.duration)
  }
})
</script>

<template>
  <div
    :aria-live="props.type === 'error' ? 'assertive' : 'polite'"
    :class="[
      'w-full sm:w-lg p-4 md:p-6 rounded-xl border u-sb-soft-transition',
      'shadow-[0_4px_20px_var(--color-sb-shadow)]',
      {
        'bg-sb-success-bg border-sb-success': props.type === 'success',
        'bg-sb-warning-bg border-sb-warning': props.type === 'warning',
        'bg-sb-error-bg border-sb-error': props.type === 'error',
        'bg-sb-info-bg border-sb-info': props.type === 'info',
      },
    ]"
    role="alert"
  >
    <div class="flex items-start gap-3 md:gap-4 u-sb-soft-transition">
      <!-- Icon -->
      <div
        v-if="props.icon"
        :class="[
          'shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl u-sb-soft-transition',
          {
            'bg-sb-surface text-sb-success': props.type === 'success',
            'bg-sb-surface text-sb-warning': props.type === 'warning',
            'bg-sb-surface text-sb-error': props.type === 'error',
            'bg-sb-surface text-sb-info': props.type === 'info',
          },
        ]"
      >
        <Icon class="size-5 md:size-6" :name="props.icon" />
      </div>

      <!-- Text Content -->
      <div class="flex-1 min-w-0">
        <h3
          v-if="props.title"
          class="ty-sb-subtitle text-sb-contrast u-sb-soft-transition"
        >
          {{ props.title }}
        </h3>
        <p
          class="ty-sb-label normal-case! text-sb-muted u-sb-soft-transition"
        >
          {{ props.message }}
        </p>
      </div>

      <!-- Close Button -->
      <BaseCloseButton
        v-if="props.dismissible"
        class="shrink-0 -mt-1 -mr-1"
        @close="onClose()"
      />
    </div>
  </div>
</template>
