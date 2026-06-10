<script setup lang="ts">
const i18nHead = useLocaleHead({
  dir: true,
  seo: true,
})

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  meta: i18nHead.value.meta,
  link: i18nHead.value.link,
}))

const { t, setLocale, locale } = useI18n()
const localePath = useLocalePath()
const { notifications, removeNotification } = useNotification()

// State

const routes = computed(() => [
  { name: t('nav.home'), path: localePath('index'), routeName: 'index' },
  { name: t('nav.about-me'), path: localePath('about-me'), routeName: 'about-me' },
  { name: t('nav.my-skills'), path: localePath('my-skills'), routeName: 'my-skills' },
  { name: t('nav.my-projects'), path: localePath('my-projects'), routeName: 'my-projects' },
] as Array<RouteItem>)

const langs = [
  { code: 'en', label: 'English', iconType: 'nuxt-icon', icon: 'flagpack:gb-ukm' },
  { code: 'it', label: 'Italiano', iconType: 'nuxt-icon', icon: 'flagpack:it' },
] as Array<MenuItem>

// Events
const onChangeLang = (langCode: string) => {
  setLocale(langCode as 'en' | 'it')
}

const onCloseNotification = (id: string) => {
  removeNotification(id)
}

/*
  onMounted(() => {
    // Show announcement notification only on client after hydration
    nextTick(() => {
      info({
        title: t('announcement.uiRefactor.title'),
        message: t('announcement.uiRefactor.body'),
        icon: 'solar:planet-bold-duotone',
        autoClose: true,
        dismissible: true,
        duration: 10000,
      })
    })
  })
*/
</script>

<template>
  <div>
    <TheHeader
      :langs="langs"
      :routes="routes"
      :selected-lang-id="locale"
      @change-lang="langCode => onChangeLang(langCode)"
    />
    <main class="pt-16 px-6 md:px-10 u-sb-soft-transition">
      <div class="w-full max-w-350 mx-auto u-sb-soft-transition">
        <slot></slot>
      </div>
    </main>
    <TheFooter
      email="biddau.stefano99@gmail.com"
      github-url="https://github.com/stefanBid"
      instagram-url="https://www.instagram.com/stefano_bid/"
      linkedin-url="https://www.linkedin.com/in/stefano-biddau/"
      phone="+39 3297247711"
      :quick-links="routes"
    />
    <ClientOnly>
      <TheNotificationBox>
        <transition-group class="flex flex-col gap-3" name="slide-down" tag="div">
          <TheNotificationBanner
            v-for="notification in notifications"
            :key="notification.id"
            :auto-close="notification.autoClose"
            :dismissible="notification.dismissible"
            :duration="notification.duration"
            :icon="notification.icon"
            :message="notification.message"
            :title="notification.title"
            :type="notification.type"
            @close="onCloseNotification(notification.id)"
          />
        </transition-group>
      </TheNotificationBox>
    </ClientOnly>
  </div>
</template>
