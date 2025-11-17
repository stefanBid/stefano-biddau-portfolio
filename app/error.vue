<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const is404 = props.error.statusCode === 404

const handleBackHome = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div
    class="min-h-dvh bg-sb-main text-sb-contrast flex items-center justify-center pt-16 px-6 md:px-10"
  >
    <main class="w-full max-w-[1400px] mx-auto">
      <section
        class="flex flex-col items-center text-center gap-6 py-20"
      >
        <!-- Badge status -->
        <p
          class="ty-sb-caption uppercase tracking-[0.2em] text-sb-muted bg-sb-surface/60 border border-sb-border rounded-full px-4 py-1 u-sb-soft-transition"
        >
          {{ is404 ? 'Page not found' : 'Something went wrong' }}
        </p>

        <!-- Big code -->
        <h1 class="ty-sb-hero text-sb-accent drop-shadow mb-2 u-sb-soft-transition">
          {{ is404 ? '404' : 'Error' }}
        </h1>

        <!-- Title / message -->
        <div class="space-y-3 max-w-xl">
          <p class="ty-sb-subtitle text-sb-contrast">
            {{ is404 ? 'The page you are looking for does not exist.' : (props.error.statusMessage || props.error.message || 'An unexpected error occurred.') }}
          </p>

          <p class="ty-sb-paragraph text-sb-muted">
            Check the URL for mistakes, or go back to the homepage and continue exploring my work.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4">
          <BaseButton type="button" variant="primary" @click="handleBackHome">
            Back to Home
          </BaseButton>

          <NuxtLink
            class="ty-sb-btn-label text-sb-muted underline underline-offset-4 hover:text-sb-contrast u-sb-soft-transition"
            to="/"
          >
            Go to stefanobiddau.com
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>
