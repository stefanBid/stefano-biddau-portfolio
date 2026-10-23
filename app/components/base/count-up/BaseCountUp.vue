<script setup lang="ts">
interface BaseCountUpProps {
  value: number
  duration?: number
}

// Dependencies
const { locale } = useI18n()

// Input / Output
const props = withDefaults(defineProps<BaseCountUpProps>(), {
  duration: 1400,
})

// Data
const el = useTemplateRef<HTMLElement>('el')

// SSR and no-JS render the final value; the count only restarts from 0 once mounted
const current = ref(props.value)

const numberFormat = computed(() => new Intl.NumberFormat(locale.value))
const displayValue = computed(() => numberFormat.value.format(Math.round(current.value)))
const finalValue = computed(() => numberFormat.value.format(props.value))

const _play = () => {
  const startedAt = performance.now()

  const _step = (now: number) => {
    const progress = Math.min((now - startedAt) / props.duration, 1)
    const eased = progress === 1 ? 1 : 1 - 2 ** (-10 * progress)
    current.value = props.value * eased
    if (progress < 1) {
      requestAnimationFrame(_step)
    }
  }

  requestAnimationFrame(_step)
}

const { stop } = useIntersectionObserver(el, ([entry]) => {
  if (!entry?.isIntersecting) {
    return
  }
  stop()
  _play()
}, { threshold: 0.6 })

// Events
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stop()
    return
  }
  current.value = 0
})
</script>

<template>
  <span ref="el" class="tabular-nums">
    <span class="sr-only">{{ finalValue }}</span>
    <span aria-hidden="true">{{ displayValue }}</span>
  </span>
</template>
