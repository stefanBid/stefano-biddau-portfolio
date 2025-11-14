<script setup lang="ts">
useHead({
  titleTemplate: '%s Full-Stack Developer & Web Designer',
})
</script>

<template>
  <div>
    <TheHeader />
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
