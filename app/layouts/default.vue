<script setup lang="ts">
useHead({
  titleTemplate: '%s Full-Stack Developer & Web Designer',
})

const announcement = `🚀 <b>The portfolio is getting a fresh new look!</b> <br> I'm currently updating the design and polishing the user experience. Thanks for your patience!`
const showAnnouncement = ref(true)

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Dev', path: '/dev/styleguide' },
]

const langs = [
  { code: 'en', label: 'English', icon: 'us' },
  { code: 'it', label: 'Italiano', icon: 'it' },
]
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
    <footer class="mt-20 mb-10 text-center text-sb-muted ty-sb-small u-sb-soft-transition">
      © {{ new Date().getFullYear() }} Stefano Biddau. All rights reserved.
    </footer>
  </div>
</template>
