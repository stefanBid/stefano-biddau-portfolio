export default function usePageTransition() {
  const skipTransition = useState<boolean>('page-transition-skip', () => false)

  const pageTransition = computed(() => (
    skipTransition.value
      ? { name: 'page', mode: 'out-in' as const, css: false }
      : undefined
  ))

  return { skipTransition, pageTransition }
}
