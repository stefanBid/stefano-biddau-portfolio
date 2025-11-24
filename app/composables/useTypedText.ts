// app/composables/useTypedText.ts

import type { CSSProperties } from 'vue'
import type { TypedOptions } from 'typed.js'
import type Typed from 'typed.js'

type InputStrings = string | string[]
type InputOptions = Partial<TypedOptions>
type InputSource = InputStrings | Ref<InputStrings> | ComputedRef<InputStrings>

// Default Configuraton

const LONG_TEXT_OPTIONS: InputOptions = {
  typeSpeed: 60,
  backSpeed: 0,
  backDelay: 0,
  smartBackspace: false,
  loop: false,
  showCursor: true,
  cursorChar: '\u00A0_',
}

const GROUP_STRING_OPTIONS: InputOptions = {
  typeSpeed: 60,
  backSpeed: 30,
  backDelay: 1000,
  smartBackspace: true,
  loop: true,
  showCursor: true,
  cursorChar: '\u00A0_',
}

export default function useTypedText(input: InputSource, options?: InputOptions) {
  // Internal State

  /* --- Internal typed.js instance --- */
  let _instance: Typed | null = null
  const _rawInput = computed<InputStrings>(() =>
    isRef(input) ? input.value : input,
  )
  const _strings = shallowRef<string[]>(_normalizeStrings(_rawInput.value))
  const _typedOptions = shallowRef<InputOptions>(_normalizeOptions(options))

  function _normalizeStrings(value: InputStrings): string[] {
    const arr = Array.isArray(value) ? value : [value]

    return arr
      .map(s => (typeof s === 'string' ? s.trim() : ''))
      .filter(Boolean)
  }

  function _normalizeOptions(value?: InputOptions): InputOptions {
    const isSingle = _strings.value?.length <= 1
    const defaults = isSingle ? LONG_TEXT_OPTIONS : GROUP_STRING_OPTIONS

    return {
      ...defaults,
      ...value || {},
    }
  }

  function _reducedMotionOverrides(): InputOptions {
    if (typeof window === 'undefined') {
      return {}
    }
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    return reduced ? { typeSpeed: 9999, backSpeed: 9999, loop: false, showCursor: false } : {}
  }

  /* --- core logic --- */
  async function _mountTyped() {
    if (!el.value || isRunning.value) {
      return
    }

    // Snapshot the target element
    const target = el.value
    if (!target) {
      return
    }

    const { default: Typed } = await import('typed.js') // Lazy load for SSR safety

    const finalTypedOptions: TypedOptions = {
      ..._normalizeOptions(_typedOptions.value), // for sync with reactive options
      ..._reducedMotionOverrides(),
      strings: _strings.value,
    }

    _instance = new Typed(target, finalTypedOptions)
    isRunning.value = true
  }

  function _destroy() {
    _instance?.destroy()
    _instance = null
    isRunning.value = false
  }

  // State
  /* --- Target DOM element reference --- */
  const el = ref<HTMLElement | null>(null)
  const elStyle = {
    display: 'inline',
    verticalAlign: 'baseline',
    lineHeight: 'inherit',
  } as CSSProperties
  const isRunning = ref(false)

  function start() {
    if (!_instance) {
      _mountTyped()
    }
  }

  function stop() {
    _instance?.stop()
    isRunning.value = false
  }

  function reset(hard = true) {
    _instance?.reset(hard)
    isRunning.value = true
  }

  function recreate() {
    const wasRunning = isRunning.value
    _destroy()
    if (wasRunning) {
      start()
    }
    else {
      _mountTyped()
    }
  }

  function setOptions(next: InputOptions) {
    _typedOptions.value = _normalizeOptions({ ..._typedOptions.value, ...next })
    recreate()
  }

  function setStrings(next: InputStrings) {
    _strings.value = _normalizeStrings(next)
    _typedOptions.value = _normalizeOptions({ ..._typedOptions.value })
    recreate()
  }

  function update(nextInput?: InputStrings, nextOptions?: InputOptions) {
    if (nextInput) {
      _strings.value = _normalizeStrings(nextInput)
      if (!nextOptions) {
        _typedOptions.value = _normalizeOptions({ ..._typedOptions.value })
      }
    }
    if (nextOptions) {
      _typedOptions.value = _normalizeOptions({ ..._typedOptions.value, ...nextOptions })
    }
    recreate()
  }

  onMounted(() => {
    if (el.value) {
      _mountTyped()
    }
    else {
      const stop = watch(
        el,
        (next) => {
          if (next) {
            stop()
            _mountTyped()
          }
        },
      )
    }
  })

  onBeforeUnmount(() => {
    _destroy()
  })

  watch(_rawInput, (next) => {
    setStrings(next)
  })

  return {
    el,
    elStyle,
    isRunning,
    start,
    stop,
    reset,
    recreate,
    setOptions,
    setStrings,
    update,
  }
}
