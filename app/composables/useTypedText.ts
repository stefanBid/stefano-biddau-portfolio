// app/composables/useTypedText.ts

import type { CSSProperties } from 'vue'
import type { TypedOptions } from 'typed.js'
import type Typed from 'typed.js'

type InputStrings = string | string[]
type InputOptions = Partial<TypedOptions>

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

export default function (input: InputStrings, options?: InputOptions) {
  /* --- Target DOM element reference --- */
  const el = ref<HTMLElement | null>(null)
  const elStyle = {
    display: 'inline',
    verticalAlign: 'baseline',
    lineHeight: 'inherit',
  } as CSSProperties

  /* --- Reactive state --- */
  const strings = shallowRef<string[]>(_normalizeStrings(input))
  const typedOptions = shallowRef<InputOptions>(_normalizeOptions(options))
  const isRunning = ref(false)

  /* --- Public API --- */
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
    typedOptions.value = _normalizeOptions({ ...typedOptions.value, ...next })
    recreate()
  }

  function setStrings(next: InputStrings) {
    strings.value = _normalizeStrings(next)
    typedOptions.value = _normalizeOptions({ ...typedOptions.value })
    recreate()
  }

  function update(nextInput?: InputStrings, nextOptions?: InputOptions) {
    if (nextInput) {
      strings.value = _normalizeStrings(nextInput)
      if (!nextOptions) {
        typedOptions.value = _normalizeOptions({ ...typedOptions.value })
      }
    }
    if (nextOptions) {
      typedOptions.value = _normalizeOptions({ ...typedOptions.value, ...nextOptions })
    }
    recreate()
  }

  /* --- Private API --- */
  /* --- Internal typed.js instance --- */
  let _instance: Typed | null = null

  /* --- core logic --- */
  async function _mountTyped() {
    if (!el.value || isRunning.value) {
      return
    }

    const { default: Typed } = await import('typed.js') // Lazy load for SSR safety

    const finalTypedOptions: TypedOptions = {
      ..._normalizeOptions(typedOptions.value), // for sync with reactive options
      ..._reducedMotionOverrides(),
      strings: strings.value,
    }

    _instance = new Typed(el.value, finalTypedOptions)
    isRunning.value = true
  }

  function _destroy() {
    _instance?.destroy()
    _instance = null
    isRunning.value = false
  }

  /* --- Helpers --- */
  function _normalizeStrings(value: InputStrings): string[] {
    const arr = Array.isArray(value) ? value : [value]

    return arr
      .map(s => (typeof s === 'string' ? s.trim() : ''))
      .filter(Boolean)
  }

  function _normalizeOptions(value?: InputOptions): InputOptions {
    const isSingle = strings.value?.length <= 1
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

  onMounted(() => {
    _mountTyped()
  })

  onBeforeUnmount(() => {
    _destroy()
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
