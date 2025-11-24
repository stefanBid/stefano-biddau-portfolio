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
      'w-full sm:w-lg p-4 md:p-6 rounded-xl border backdrop-blur-sm u-sb-soft-transition',
      'shadow-[0_4px_20px_var(--color-sb-shadow)]',
      {
        'bg-[#0a3d2c] border-[#10b981]': props.type === 'success',
        'bg-[#3d2f0a] border-[#f59e0b]': props.type === 'warning',
        'bg-[#3d0a1a] border-sb-error': props.type === 'error',
        'bg-[#0a1d3d] border-[#3b82f6]': props.type === 'info',
      },
    ]"
    role="alert"
  >
    <div class="flex items-start gap-3 md:gap-4">
      <!-- Icon -->
      <div
        v-if="props.icon"
        :class="[
          'shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl u-sb-soft-transition',
          {
            'bg-[#10b981]/15 text-[#6ee7b7]': props.type === 'success',
            'bg-[#f59e0b]/15 text-[#fbbf24]': props.type === 'warning',
            'bg-sb-error/15 text-[#f87171]': props.type === 'error',
            'bg-[#3b82f6]/15 text-[#60a5fa]': props.type === 'info',
          },
        ]"
      >
        <Icon class="size-5 md:size-6" :name="props.icon" />
      </div>

      <!-- Text Content -->
      <div class="flex-1 min-w-0">
        <h3
          v-if="props.title"
          :class="[
            'font-bebas-neue text-lg sm:text-xl mb-1 u-sb-soft-transition',
            {
              'text-[#a7f3d0]': props.type === 'success',
              'text-[#fde68a]': props.type === 'warning',
              'text-[#fca5a5]': props.type === 'error',
              'text-[#bfdbfe]': props.type === 'info',
            },
          ]"
        >
          {{ props.title }}
        </h3>
        <p
          :class="[
            'text-[0.8125rem] sm:text-sm u-sb-soft-transition',
            {
              'text-[#d1fae5]': props.type === 'success',
              'text-[#fef3c7]': props.type === 'warning',
              'text-[#fecaca]': props.type === 'error',
              'text-[#dbeafe]': props.type === 'info',
            },
          ]"
        >
          {{ props.message }}
        </p>
      </div>

      <!-- Close Button -->
      <BaseCloseButton
        v-if="props.dismissible"
        :class="[
          'shrink-0 -mt-1 -mr-1',
          {
            'text-[#6ee7b7] hover:bg-[#10b981]/15': props.type === 'success',
            'text-[#fbbf24] hover:bg-[#f59e0b]/15': props.type === 'warning',
            'text-[#f87171] hover:bg-sb-error/15': props.type === 'error',
            'text-[#60a5fa] hover:bg-[#3b82f6]/15': props.type === 'info',
          },
        ]"
        @close="onClose()"
      />
    </div>
  </div>
</template>
