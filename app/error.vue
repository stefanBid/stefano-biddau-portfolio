<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
    stack?: string
  }
}>()

const is404 = props.error.statusCode === 404

const handleBackHome = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div
    class="min-h-dvh bg-sb-main text-sb-contrast flex items-center justify-center pt-16 px-6 md:px-10 u-sb-soft-transition"
  >
    <main class="w-full max-w-[1400px] mx-auto">
      <section
        class="flex flex-col items-center text-center gap-6 py-20"
      >
        <!-- Badge status -->
        <p
          class="ty-sb-caption uppercase tracking-[0.2em] text-sb-muted bg-sb-surface/60 border border-sb-border rounded-xl px-4 py-1 u-sb-soft-transition"
        >
          {{ is404 ? 'Page not found' : 'Something went wrong' }}
        </p>

        <!-- Big code -->
        <h1 class="ty-sb-hero text-sb-accent drop-shadow mb-2 u-sb-soft-transition">
          {{ is404 ? '404' : 'Error' }}
        </h1>

        <!-- Title / message -->
        <div class="space-y-3 max-w-xl">
          <p class="ty-sb-subtitle text-sb-contrast u-sb-soft-transition">
            {{ is404 ? 'The page you are looking for does not exist.' : (props.error.statusMessage || props.error.message || 'An unexpected error occurred.') }}
          </p>

          <!-- DEBUG: Show full error in dev -->
          <details v-if="!is404" class="text-left mt-4">
            <summary class="ty-sb-label text-sb-muted cursor-pointer hover:text-sb-contrast u-sb-soft-transition">
              Technical Details (debug)
            </summary>
            <pre class="ty-sb-caption text-sb-muted bg-sb-surface border border-sb-border rounded-xl p-3 mt-2 overflow-auto u-sb-soft-transition">{{ JSON.stringify(props.error, null, 2) }}</pre>
          </details>

          <p class="ty-sb-paragraph text-sb-muted u-sb-soft-transition">
            Check the URL for mistakes, or go back to the homepage and continue exploring my work.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 mt-4 u-sb-soft-transition">
          <BaseButton type="button" variant="outline" @click="handleBackHome">
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
