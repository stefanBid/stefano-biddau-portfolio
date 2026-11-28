import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const { pageSkipTransition, subPageSkipTransition, menuSkipTransition, tabSwitch } = usePageTransition()

    // Same top-level page: a locale-only change or a click on the my-projects
    // tabs keeps the scroll position. A link into the other tab (the Projects
    // "See the templates" teaser) is a real destination: start from its hero.
    if (pageSkipTransition.value) {
      if (subPageSkipTransition.value || tabSwitch.value || savedPosition) {
        return false
      }
      return { top: 0, behavior: 'instant' }
    }

    // Navigation from the mobile menu has no page transition, so there is no
    // transition end to wait for: jump straight to the target.
    if (menuSkipTransition.value) {
      return savedPosition ? { ...savedPosition, behavior: 'instant' } : { top: 0, behavior: 'instant' }
    }

    // Wait for the page transition to finish before scrolling —
    // otherwise the jump happens mid-animation instead of after it.
    // `behavior: 'instant'` overrides the global `scroll-behavior: smooth`
    // (main.css) — without it the browser glides to position over ~1s.
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:transition:finish', () => {
        if (savedPosition) {
          resolve({ ...savedPosition, behavior: 'instant' })
        }
        else if (to.hash) {
          // Deep links (e.g. home → /my-projects#project-<id>); the offset clears the fixed h-16 header
          resolve({ el: to.hash, top: 96, behavior: 'instant' })
        }
        else {
          resolve({ top: 0, behavior: 'instant' })
        }
      })
    })
  },
}
