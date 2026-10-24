<script setup lang="ts">
import useMilestones from '~/composables/data/useMilestones'

// Dependencies
const { t } = useI18n()
const route = useRoute()
const { milestones: milestonesByDate } = useMilestones()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.about.title'),
  description: () => t('meta.about.description'),
  ogTitle: () => t('meta.about.title'),
  ogDescription: () => t('meta.about.description'),
  twitterTitle: () => t('meta.about.title'),
  twitterDescription: () => t('meta.about.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})

// Data
// Most recent first: the next step, then the current role, is what a visitor needs to see
const upcoming = computed(() => [...milestonesByDate.value].reverse().filter(milestone => milestone.type === 'upcoming'))
const milestones = computed(() => [...milestonesByDate.value].reverse().filter(milestone => milestone.type !== 'upcoming'))

const openIds = ref<string[]>(milestones.value[0] ? [milestones.value[0].id] : [])
const contactFormIsOpen = ref(false)

// Events
const onToggleMilestone = (id: string | number) => {
  const key = String(id)
  openIds.value = openIds.value.includes(key)
    ? openIds.value.filter(openId => openId !== key)
    : [...openIds.value, key]
}
</script>

<template>
  <div>
    <ThePageHero
      id="about-me"
      image-src="/images/3d-avatar/avatar-pose-3.webp"
      :lead="t('pages.home.lead')"
      :text="t('pages.about.hero')"
    />

    <section :aria-label="t('a11y.timelineSection')" class="py-20">
      <BaseEmptyBox
        v-if="!milestones.length && !upcoming.length"
        icon="solar:history-3-bold-duotone"
        :message="t('pages.about.noMilestones.message')"
        :title="t('pages.about.noMilestones.title')"
      />
      <ol v-else class="m-0 flex list-none flex-col gap-10 border-l-2 border-ink/30 p-0 pl-6 md:pl-10">
        <li
          v-for="step in upcoming"
          :key="step.id"
          class="text-left"
        >
          <article :aria-labelledby="`milestone-title-${step.id}`" class="relative rounded-lg border border-dashed border-border-strong p-4 md:p-6">
            <div
              aria-hidden="true"
              class="absolute -left-8.25 md:-left-12.75 top-5 md:top-7.5 flex items-center justify-center"
            >
              <span class="block size-4 md:size-5 rounded-full border-2 border-primary bg-bg"></span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-1 gap-x-6">
              <h2 :id="`milestone-title-${step.id}`" class="sb-h3 mb-0 flex-1 text-balance">
                {{ step.role ?? step.title }}
              </h2>
              <p v-if="step.period.startLabel" class="sb-overline text-primary-ink text-left mb-0 sm:whitespace-nowrap">
                <time :datetime="step.period.startIso">{{ t('pages.about.upcomingFrom', { date: step.period.startLabel }) }}</time>
              </p>
            </div>
            <BaseRichText
              v-if="step.content.length"
              :blocks="step.content"
              class="mt-2 max-w-[75ch] text-ink-muted *:text-left *:mb-0"
            />
          </article>
        </li>
        <li
          v-for="milestone in milestones"
          :key="milestone.id"
          class="text-left"
        >
          <CustomMilestone
            :id="milestone.id"
            :clients="milestone.clients"
            :content="milestone.content"
            :image-caption="milestone.imageCaption"
            :image-height="milestone.imageHeight"
            :image-src="milestone.imageSrc"
            :image-width="milestone.imageWidth"
            :is-open="openIds.includes(milestone.id)"
            :organization="milestone.organization"
            :period="milestone.period"
            :role="milestone.role ?? milestone.title"
            :stack="milestone.stack"
            :type-label="milestone.typeLabel"
            @toggle="onToggleMilestone"
          />
        </li>
      </ol>
    </section>

    <CustomClosingCta show-projects-link @contact="contactFormIsOpen = true" />

    <LazyCustomContactForm :open-form="contactFormIsOpen" @close-form="value => contactFormIsOpen = value" />
  </div>
</template>
