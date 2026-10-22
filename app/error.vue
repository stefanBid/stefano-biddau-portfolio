<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
    stack?: string
  }
}>()

// Dependencies
const { t } = useI18n()
const localePath = useLocalePath()

// Data
const is404 = computed(() => props.error.statusCode === 404)
const showDetails = import.meta.dev

useSeoMeta({
  title: () => (is404.value ? t('errorPage.notFoundTitle') : t('errorPage.genericTitle')),
  robots: 'noindex',
})

// Events
const onBackHome = () => {
  clearError({ redirect: localePath('index') })
}
</script>

<template>
  <NuxtLayout>
    <section class="min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center text-center gap-6 py-20">
      <h1 class="sb-hero text-primary-ink mb-0 tabular-nums">
        {{ is404 ? '404' : (props.error.statusCode ?? 500) }}
      </h1>

      <div class="space-y-3 max-w-xl">
        <h2 class="sb-h3 mb-0">
          {{ is404 ? t('errorPage.notFoundTitle') : t('errorPage.genericTitle') }}
        </h2>
        <p class="text-ink-muted">
          {{ is404 ? t('errorPage.notFoundMessage') : t('errorPage.genericMessage') }}
        </p>
        <p class="text-ink-muted">
          {{ t('errorPage.hint') }}
        </p>

        <details v-if="showDetails && !is404" class="text-left mt-4">
          <summary class="sb-label text-ink-muted cursor-pointer hover:text-ink sb-transition">
            {{ t('errorPage.technicalDetails') }}
          </summary>
          <pre class="sb-small text-ink-muted bg-surface border border-border rounded-lg p-3 mt-2 overflow-auto">{{ JSON.stringify(props.error, null, 2) }}</pre>
        </details>
      </div>

      <BaseButton
        class="mt-4"
        type="button"
        variant="primary"
        @click="onBackHome"
      >
        {{ t('errorPage.backHome') }}
      </BaseButton>
    </section>
  </NuxtLayout>
</template>
