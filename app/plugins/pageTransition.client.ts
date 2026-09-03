export default defineNuxtPlugin(() => {
  const router = useRouter()
  const getRouteBaseName = useRouteBaseName()
  const { pageSkipTransition, subPageSkipTransition } = usePageTransition()

  router.beforeEach((to, from) => {
    // Top-level matched route (parent): equal for a locale-only change AND
    // for a tab switch inside my-projects.vue (index.vue / sb-templates.vue
    // share the same parent). Drives the outer NuxtPage fade (app.vue) and
    // the scroll-to-top skip (router.options.ts) — neither should react to
    // an in-page tab switch.
    const toParent = to.matched[0] as Parameters<typeof getRouteBaseName>[0]
    const fromParent = from.matched[0] as Parameters<typeof getRouteBaseName>[0]
    pageSkipTransition.value = getRouteBaseName(toParent) === getRouteBaseName(fromParent)

    // Leaf route: equal only on a locale-only change (same page, only the
    // locale prefix changed) — i18n updates the visible text instantly via
    // reactivity, so a fade here would just animate content that's already
    // translated. A tab switch changes the leaf, so this stays `false` and
    // the inner NuxtPage (my-projects.vue) still fades between tabs. Skip
    // via NuxtPage's `transition` prop instead of `to.meta.pageTransition`:
    // mutating route meta fights Nuxt's internal page-transition fork/vnode
    // caching (nuxt/dist/pages/runtime/page.js) and left stale disabled
    // state bleeding into the *next* navigation too.
    subPageSkipTransition.value = getRouteBaseName(to) === getRouteBaseName(from)
  })
})
