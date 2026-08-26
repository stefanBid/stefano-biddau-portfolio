export default defineNuxtPlugin(() => {
  const router = useRouter()
  const getRouteBaseName = useRouteBaseName()

  router.beforeEach((to, from) => {
    // Same page, only the locale prefix changed — i18n updates the visible
    // text instantly via reactivity, so a full page fade/blur here would
    // just animate content that's already translated. Skip it.
    if (getRouteBaseName(to) === getRouteBaseName(from)) {
      to.meta.pageTransition = false
    }
  })
})
