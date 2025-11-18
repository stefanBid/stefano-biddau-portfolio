<script setup lang="ts">
useHead({
  titleTemplate: '%s Full-Stack Developer & Web Designer',
})

const { setLocale, locale } = useI18n()
const localePath = useLocalePath()

const announcement = `🚀 <b>The portfolio is getting a fresh new look!</b> <br> I'm currently updating the design and polishing the user experience. Thanks for your patience!`
const showAnnouncement = ref(true)

// State

const routes = computed(() => [
  { name: 'Home', path: localePath('') },
  { name: 'About me', path: localePath('about'), disabled: true },
  { name: 'Skills', path: localePath('skills'), disabled: true },
  { name: 'Projects', path: localePath('projects'), disabled: true },
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
      email="sxhjkhdkjhsdkjh"
      github-url="https://github.com/stefanobiddau"
      instagram-url="https://www.instagram.com/stefanobiddau/"
      linkedin-url="https://www.linkedin.com/in/stefanobiddau/"
      phone="+39 3297247711"
      :quick-links="routes"
      site-name="Stefano Biddau"
      tagline="Full Stack Developer crafting performant and elegant web experiences."
    />
  </div>
</template>
