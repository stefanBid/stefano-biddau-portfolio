import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const { pageSkipTransition, menuSkipTransition } = usePageTransition()

    // Same top-level page — either only the locale prefix changed, or it's
    // an in-page tab switch (my-projects.vue's index.vue / sb-templates.vue)
    // triggered via `navigateTo`, not a real page-to-page navigation — keep
    // the scroll position instead of jumping to top.
    if (pageSkipTransition.value) {
      return false
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
