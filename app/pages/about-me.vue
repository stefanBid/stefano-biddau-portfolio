<script setup lang="ts">
// Dependencies
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.about.title'),
  description: () => t('meta.about.description'),
  ogTitle: () => t('meta.about.ogTitle'),
  ogDescription: () => t('meta.about.description'),
  twitterTitle: () => t('meta.about.ogTitle'),
  twitterDescription: () => t('meta.about.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})

const { fetchMilestones } = useMilestones()
const { error } = useNotification()
const { data: milestones, pending, error: fetchError } = fetchMilestones()

// State
const userSelectedId = ref<string | null>(null)
const safeMilestones = computed(() => milestones.value ?? [])

const selectedMilestoneId = computed(() => {
  return userSelectedId.value || safeMilestones.value?.[0]?.id || null
})

// Events

const onSelectMilestone = (id: string | number) => {
  userSelectedId.value = String(id)

  // Scroll to milestone with offset for header
  nextTick(() => {
    if (!import.meta.client) {
      return
    }

    const milestoneElement = document.querySelector(`[data-milestone-id="${id}"]`)
    if (milestoneElement) {
      const headerOffset = 80 // Header height + some padding
      const elementPosition = milestoneElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  })
}

// Watch for fetch errors - SSR-safe (useNotification handles client-only internally)
watch(fetchError, (newError) => {
  if (newError && import.meta.client) {
    error({
      title: t('pages.about.milestoneError.title'),
      message: t('pages.about.milestoneError.message'),
      autoClose: true,
      dismissible: true,
    })
  }
}, { immediate: true })
</script>

<template>
  <div>
    <ThePageHero
      id="about-me"
      :text="t('pages.about.hero')"
    />
    <!-- Timeline Section -->
    <section aria-label="Professional Timeline" class="relative w-full py-20 u-sb-soft-transition">
      <div
        class="relative flex w-full flex-col gap-10 u-sb-soft-transition"
        :class="{
          'border-l-2 border-sb-contrast/30 pl-6 md:pl-10 ': safeMilestones.length || pending,
        }"
      >
        <!-- Milestones -->
        <template v-if="pending">
          <CustomMilestoneSkeleton v-for="n in 3" :key="n" />
        </template>
        <template v-else-if="fetchError">
          <!-- Error message -->
          <BaseEmptyBox
            icon="solar:danger-triangle-bold-duotone"
            :message="t('pages.about.milestoneError.message')"
            :title="t('pages.about.milestoneError.title')"
          />
        </template>
        <template v-else-if="!safeMilestones.length">
          <!-- No milestones message -->
          <BaseEmptyBox
            icon="solar:history-3-bold-duotone"
            :message="t('pages.about.noMilestones.message')"
            :title="t('pages.about.noMilestones.title')"
          />
        </template>
        <template v-else>
          <CustomMilestone
            v-for="(milestone) in safeMilestones"
            :id="milestone.id"
            :key="milestone.id"
            :content="milestone.content"
            :date="milestone.date"
            :image-alt="milestone.imageCaption"
            :image-src="milestone.imageSrc"
            :is-active="selectedMilestoneId === milestone.id"
            :subtitle="milestone.subtitle"
            :title="milestone.title"
            @select="onSelectMilestone"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===================== Animations ===================== */

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 1.2s ease-in-out;
}
</style>
