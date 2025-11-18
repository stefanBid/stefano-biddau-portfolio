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

const announcement = computed(() => {
  const title = t('announcement.ui-refactor.title')
  const body = t('announcement.ui-refactor.body')
  return `🚀 - <strong>${title}</strong>- 🚀<br/>${body}`
})

// State
const showAnnouncement = ref(true)

const routes = computed(() => [
  { name: t('nav.home'), path: localePath('index') },
  { name: t('nav.about-me'), path: localePath('about-me'), disabled: true },
  { name: t('nav.my-skills'), path: localePath('my-skills'), disabled: true },
  { name: t('nav.my-projects'), path: localePath('my-projects'), disabled: true },
] as Array<RouteItem>)

const langs = [
  { code: 'en', label: 'English', icon: 'circle-flags:en' },
  { code: 'it', label: 'Italiano', icon: 'circle-flags:it' },
] as Array<LangItem>

// Events
const onChangeLang = (langCode: string) => {
  setLocale(langCode as 'en' | 'it')
}

const onCloseAnnouncement = () => {
  showAnnouncement.value = false
}

onMounted(() => {
  if (import.meta.client) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }
})
</script>

<template>
  <div>
    <TheHeader
      :langs="langs"
      :routes="routes"
      :selected-lang-id="locale"
      :show-announcement="showAnnouncement"
      @change-lang="langCode => onChangeLang(langCode)"
    >
      <template #announcement>
        <TheHeaderAnnouncementBar
          :announcement-rich="announcement"
          @close="onCloseAnnouncement()"
        />
      </template>
    </TheHeader>
    <main class="pt-16 px-6 md:px-10">
      <div class="w-full max-w-[1400px] mx-auto u-sb-soft-transition">
        <slot></slot>
      </div>
    </main>
    <TheFooter
      email="biddau.stefano99@gmail.com"
      github-url="https://github.com/stefanobiddau"
      instagram-url="https://www.instagram.com/stefanobiddau/"
      linkedin-url="https://www.linkedin.com/in/stefanobiddau/"
      phone="+39 3297247711"
      :quick-links="routes"
    />
  </div>
</template>
