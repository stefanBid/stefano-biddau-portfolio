<script setup lang="ts">
useHead({
  titleTemplate: '%s Full-Stack Developer & Web Designer',
})

const announcement = `🚀 <b>The portfolio is getting a fresh new look!</b> <br> I'm currently updating the design and polishing the user experience. Thanks for your patience!`
const showAnnouncement = ref(true)

const routes = computed(() => [
  { name: 'Home', path: '/' },
  { name: 'About me', path: '/about', disabled: true },
  { name: 'Skills', path: '/skills', disabled: true },
  { name: 'Projects', path: '/projects', disabled: true },
] as Array<{ name: string, path: string, disabled?: true }>)

const langs = [
  { code: 'en', label: 'English', icon: 'us' },
  { code: 'it', label: 'Italiano', icon: 'it' },
]
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
      :show-announcement="showAnnouncement"
    >
      <template #announcement>
        <TheHeaderAnnouncementBar
          :announcement-rich="announcement"
          @close="falsyValue => showAnnouncement = falsyValue"
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
