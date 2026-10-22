import type { Ref } from 'vue'

interface UseFocusTrapReturn {
  activate: () => void
  deactivate: () => void
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function useFocusTrap(container: Ref<HTMLElement | null>): UseFocusTrapReturn {
  let _previouslyFocused: HTMLElement | null = null
  let _active = false

  const _focusables = (): HTMLElement[] => {
    if (!container.value) {
      return []
    }
    return Array.from(container.value.querySelectorAll<HTMLElement>(FOCUSABLE))
      .filter(el => !el.closest('[inert]') && el.offsetParent !== null)
  }

  const _onKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !container.value) {
      return
    }
    const items = _focusables()
    if (!items.length) {
      e.preventDefault()
      container.value.focus()
      return
    }
    const first = items[0]!
    const last = items[items.length - 1]!
    const current = document.activeElement
    const outside = !container.value.contains(current)
    if (e.shiftKey && (current === first || outside)) {
      e.preventDefault()
      last.focus()
    }
    else if (!e.shiftKey && (current === last || outside)) {
      e.preventDefault()
      first.focus()
    }
  }

  const activate = () => {
    if (!import.meta.client || _active) {
      return
    }
    _active = true
    _previouslyFocused = document.activeElement as HTMLElement | null
    document.addEventListener('keydown', _onKeydown)
  }

  const deactivate = () => {
    if (!import.meta.client || !_active) {
      return
    }
    _active = false
    document.removeEventListener('keydown', _onKeydown)
    const target = _previouslyFocused
    _previouslyFocused = null
    if (target && document.contains(target)) {
      requestAnimationFrame(() => target.focus())
    }
  }

  onBeforeUnmount(deactivate)

  return { activate, deactivate }
}
