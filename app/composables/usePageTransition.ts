export default function usePageTransition(isSubPage: boolean = false) {
  const pageSkipTransition = useState<boolean>('page-transition-skip', () => false)
  const subPageSkipTransition = useState<boolean>('sub-page-transition-skip', () => false)
  // Set by the mobile menu link that starts a navigation; the plugin turns it into menuSkipTransition for that navigation only
  const navigatingFromMenu = useState<boolean>('navigating-from-menu', () => false)
  const menuSkipTransition = useState<boolean>('menu-page-transition-skip', () => false)

  const pageTransition = computed(() => (
    (isSubPage ? subPageSkipTransition.value : pageSkipTransition.value) || menuSkipTransition.value
      ? { name: 'page', mode: 'out-in' as const, css: false }
      : undefined
  ))

  return {
    pageSkipTransition,
    subPageSkipTransition,
    navigatingFromMenu,
    menuSkipTransition,
    pageTransition,
  }
}
