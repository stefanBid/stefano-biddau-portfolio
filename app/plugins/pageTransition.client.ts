export default defineNuxtPlugin(() => {
  const router = useRouter()
  const getRouteBaseName = useRouteBaseName()
  const { skipTransition } = usePageTransition()

  router.beforeEach((to, from) => {
    // Same page, only the locale prefix changed — i18n updates the visible
    // text instantly via reactivity, so a full page fade/blur here would
    // just animate content that's already translated. Skip the visuals via
    // NuxtPage's `transition` prop (app.vue) instead of `to.meta.pageTransition`:
    // mutating route meta fights Nuxt's internal page-transition fork/vnode
    // caching (nuxt/dist/pages/runtime/page.js) and left stale disabled
    // state bleeding into the *next* navigation too.
    skipTransition.value = getRouteBaseName(to) === getRouteBaseName(from)
  })
})
