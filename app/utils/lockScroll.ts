const SCROLL_LOCK_CLASS = 'sb-scroll-locked'

// Stato condiviso del lock
let lockCount = 0

export default function (locked: boolean) {
  if (!import.meta.client) {
    return
  }

  const root = document.documentElement

  if (locked) {
    lockCount++
  }
  else {
    lockCount = Math.max(0, lockCount - 1)
  }

  if (lockCount > 0) {
    root.classList.add(SCROLL_LOCK_CLASS)
  }
  else {
    root.classList.remove(SCROLL_LOCK_CLASS)
  }
}
