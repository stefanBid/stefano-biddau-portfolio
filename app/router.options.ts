import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

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
