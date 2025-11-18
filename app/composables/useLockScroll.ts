const SCROLL_LOCK_CLASS = 'sb-scroll-locked'

export default function useLockScroll() {
  // array globale condiviso tra TUTTI i chiamanti
  const owners = useState<string[]>('scrollLockOwners', () => [])
  const isLocked = computed(() => owners.value.length > 0)

  // Unique owner ID for this composable instance
  const ownerId = ref<string | null>(null)

  const ensureOwnerId = () => {
    if (!ownerId.value) {
      if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        ownerId.value = crypto.randomUUID()
      }
      else {
        ownerId.value = `owner-${Math.random().toString(36).slice(2)}`
      }
    }
    return ownerId.value
  }

  function lock() {
    if (!import.meta.client) {
      return
    }

    const id = ensureOwnerId()

    // evita duplicati se lock() viene chiamato più volte dallo stesso owner
    if (!owners.value.includes(id)) {
      owners.value = [...owners.value, id]
    }
  }

  function unlock() {
    if (!import.meta.client || !ownerId.value) {
      return
    }

    if (owners.value.includes(ownerId.value)) {
      owners.value = owners.value.filter(id => id !== ownerId.value)
    }
  }

  // Applica / rimuove la classe sul <html>
  watch(
    isLocked,
    (value) => {
      if (!import.meta.client) {
        return
      }

      const root = document.documentElement
      if (value) {
        root.classList.add(SCROLL_LOCK_CLASS)
      }
      else {
        root.classList.remove(SCROLL_LOCK_CLASS)
      }
    },
    { immediate: true },
  )

  return {
    isLocked,
    lock,
    unlock,
  }
}
