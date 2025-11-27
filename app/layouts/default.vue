<script setup lang="ts">
const i18nHead = useLocaleHead({
  dir: true,
  seo: true,
})

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  meta: i18nHead.value.meta,
  link: i18nHead.value.link,
  titleTemplate: '%s Full-Stack Developer & Web Designer',
}))

const { t, setLocale, locale } = useI18n()
const localePath = useLocalePath()
const { notifications, removeNotification, info } = useNotification()

// State

const routes = computed(() => [
  { name: t('nav.home'), path: localePath('index') },
  { name: t('nav.about-me'), path: localePath('about-me') },
  { name: t('nav.my-skills'), path: localePath('my-skills') },
  { name: t('nav.my-projects'), path: localePath('my-projects'), disabled: true },
] as Array<RouteItem>)

const langs = [
  { code: 'en', label: 'English', icon: 'circle-flags:en' },
  { code: 'it', label: 'Italiano', icon: 'circle-flags:it' },
] as Array<MenuItem>

// Events
const onChangeLang = (langCode: string) => {
  setLocale(langCode as 'en' | 'it')
}

const onCloseNotification = (id: string) => {
  removeNotification(id)
}

onMounted(() => {
  // Show announcement notification only on client after hydration
  nextTick(() => {
    info({
      title: t('announcement.ui-refactor.title'),
      message: t('announcement.ui-refactor.body'),
      icon: 'solar:planet-bold-duotone',
      autoClose: true,
      dismissible: true,
      duration: 10000,
    })
  })
})
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
      <div class="w-full max-w-[1400px] mx-auto u-sb-soft-transition">
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
