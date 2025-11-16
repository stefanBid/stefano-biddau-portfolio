<script setup lang="ts">
interface BaseDialogProps {
  isOpen: boolean
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}
// Input / Output
const props = withDefaults(defineProps<BaseDialogProps>(), {
  size: 'sm',
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'close', falsyValue: false): void
}>()

// Data
const dialogRef = ref<HTMLElement | null>(null)

// Events
const onClose = () => {
  emit('close', false)
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    onClose()
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
  }
  lockScroll(false)
})

watch(
  () => props.isOpen,
  (value) => {
    if (value) {
      lockScroll(true)
      nextTick(() => dialogRef.value?.focus())
    }
    else {
      lockScroll(false)
    }
  },
  { immediate: true },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="scale-fade">
      <div
        v-if="isOpen"
        aria-labelledby="sb-dialog-title"
        aria-modal="true"
        class="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-sb-main/80 backdrop-blur-sm u-sb-soft-transition"
          @click="onClose"
        ></div>

        <!-- Dialog Panel -->
        <div
          ref="dialogRef"
          class="relative z-10 w-full border rounded-xl border-sb-border shadow-[0_20px_60px_var(--color-sb-shadow)] bg-sb-main u-sb-soft-transition outline-none flex flex-col max-h-[90dvh]"
          :class="{
            'max-w-lg': size === 'sm',
            'max-w-4xl': size === 'md',
            'max-w-6xl': size === 'lg',
            'max-w-none w-full': size === 'full',
          }"
          tabindex="-1"
        >
          <!-- HEADER -->
          <header
            class="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-sb-border/70 u-sb-soft-transition"
          >
            <div class="flex flex-col flex-1 min-w-0">
              <h2
                id="sb-dialog-title"
                class="ty-sb-title u-sb-soft-transition truncate"
              >
                {{ props.title }}
              </h2>
              <p
                v-if="props.subtitle"
                class="ty-sb-subtitle text-sb-muted mt-1 u-sb-soft-transition"
              >
                {{ props.subtitle }}
              </p>
            </div>

            <BaseCloseButton
              class="shrink-0"
              @close="onClose"
            />
          </header>

          <!-- BODY -->
          <section
            class="flex-1 my-4 sm:my-6 p-4 sm:p-6 overflow-y-auto ty-sb-paragraph u-sb-soft-transition"
          >
            <slot></slot>
          </section>

          <!-- FOOTER -->
          <footer
            v-if="$slots.footer"
            class="flex justify-end gap-3 p-4 sm:p-6 border-t border-sb-border/70 u-sb-soft-transition"
          >
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
