export default function usePageTransition(isSubPage: boolean = false) {
  const pageSkipTransition = useState<boolean>('page-transition-skip', () => false)
  const subPageSkipTransition = useState<boolean>('sub-page-transition-skip', () => false)

  const pageTransition = computed(() => (
    (isSubPage ? subPageSkipTransition.value : pageSkipTransition.value)
      ? { name: 'page', mode: 'out-in' as const, css: false }
      : undefined
  ))

  return {
    pageSkipTransition,
    subPageSkipTransition,
    pageTransition,
  }
}
