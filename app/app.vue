<script setup lang="ts">
const { pageTransition } = usePageTransition()
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage :transition="pageTransition" />
  </NuxtLayout>
</template>
