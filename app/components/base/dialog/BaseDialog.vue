<script setup lang="ts">
interface BaseDialogProps {
  isOpen: boolean
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

// Dependencies
const { lock, unlock } = useLockScroll()
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<BaseDialogProps>(), {
  subtitle: undefined,
  size: 'sm',
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'close', falsyValue: false): void
}>()

// Data
const dialogRef = ref<HTMLElement | null>(null)
const { activate, deactivate } = useFocusTrap(dialogRef)

// Events
const onClose = () => {
  emit('close', false)
}

// defaultPrevented: Escape already closed a floating panel inside the dialog
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen && !e.defaultPrevented) {
    e.preventDefault()
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
  unlock()
})

watch(
  () => props.isOpen,
  (value) => {
    // Avoid DOM access during SSR
    if (!import.meta.client) {
      return
    }

    if (value) {
      // Disable scroll when dialog opens
      lock()
      activate()

      // Use requestAnimationFrame to avoid forced reflow
      nextTick(() => {
        requestAnimationFrame(() => {
          if (dialogRef.value) {
            dialogRef.value.focus()
          }
        })
      })
    }
    else {
      // Re-enable scroll when dialog closes
      unlock()
      deactivate()
    }
  },
  { immediate: true, flush: 'post' },
)
</script>

<template>
  <Teleport to="body">
    <Transition appear name="scale-fade">
      <div
        v-if="isOpen"
        aria-labelledby="sb-dialog-title"
        aria-modal="true"
        class="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-6 will-change-[opacity,transform]"
        role="dialog"
        style="isolation: isolate;"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-bg/80 backdrop-blur-sm sb-transition"
          @click="onClose"
        ></div>

        <!-- Dialog Panel -->
        <div
          ref="dialogRef"
          class="relative z-10 w-full mx-auto border rounded-lg border-border shadow-lg bg-bg outline-none flex flex-col max-h-[90dvh] sb-transition"
          :class="{
            'max-w-lg': size === 'sm',
            'max-w-4xl': size === 'md',
            'max-w-6xl': size === 'lg',
            'max-w-350 h-full': size === 'full',
          }"
          tabindex="-1"
        >
          <!-- HEADER -->
          <header
            class="flex items-start justify-between gap-4 p-4 md:p-6 border-b border-border/70 sb-transition"
          >
            <div class="flex flex-col flex-1 min-w-0">
              <h2
                id="sb-dialog-title"
                class="mb-0 sb-transition text-balance"
              >
                {{ props.title }}
              </h2>
              <p
                v-if="props.subtitle"
                class="text-ink-muted mt-2 sb-transition"
              >
                {{ props.subtitle }}
              </p>
            </div>

            <BaseCloseButton
              class="shrink-0"
              :label="t('a11y.closeDialog')"
              @close="onClose"
            />
          </header>

          <section
            v-if="$slots.header"
            id="second-custom-header"
            class="p-4 md:p-6 sb-transition"
          >
            <slot name="header" />
          </section>

          <!-- BODY -->
          <section
            class="flex-1 p-4 md:p-6 overflow-y-auto sb-body sb-transition"
          >
            <slot />
          </section>

          <!-- FOOTER -->
          <footer
            v-if="$slots.footer"
            class="flex justify-end gap-3 p-4 md:p-6 border-t border-border/70 sb-transition"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
