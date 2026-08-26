import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const { skipTransition } = usePageTransition()

    // Same page, only the locale prefix changed — keep the scroll position
    // instead of jumping to top. Checked explicitly here rather than relying
    // on `page:transition:finish` never firing for a same-component nav:
    // some pages (e.g. my-projects.vue) trigger their own internal
    // `navigateTo` on mount, which fires a real transition cycle and would
    // otherwise force an unwanted scroll-to-top.
    if (skipTransition.value) {
      return false
    }

    // Wait for the page transition to finish before scrolling —
    // otherwise the jump happens mid-animation instead of after it.
    // `behavior: 'instant'` overrides the global `scroll-behavior: smooth`
    // (main.css) — without it the browser glides to position over ~1s.
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:transition:finish', () => {
        resolve(savedPosition ? { ...savedPosition, behavior: 'instant' } : { top: 0, behavior: 'instant' })
      })
    })
  },
}
