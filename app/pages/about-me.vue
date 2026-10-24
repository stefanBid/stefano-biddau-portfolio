<script setup lang="ts">
import useMilestones from '~/composables/data/useMilestones'
import useSelectedWork from '~/composables/data/useSelectedWork'

// Dependencies
const { t } = useI18n()
const route = useRoute()
const { milestones: milestonesByDate } = useMilestones()
const { selectedWork } = useSelectedWork()

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
      :lead="t('pages.about.lead')"
      :text="t('pages.about.hero')"
    />

    <section aria-labelledby="timeline-title" class="py-20">
      <h2 id="timeline-title" class="sr-only">
        {{ t('a11y.timelineSection') }}
      </h2>
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
          <article :aria-labelledby="`milestone-title-${step.id}`" class="relative rounded-lg border border-dashed border-border-strong px-4 py-3 md:px-6 md:py-4">
            <div
              aria-hidden="true"
              class="absolute -left-8.25 md:-left-12.75 top-4 md:top-5 flex items-center justify-center"
            >
              <span class="block size-4 md:size-5 rounded-full border-2 border-primary bg-bg"></span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-1 gap-x-6">
              <h3 :id="`milestone-title-${step.id}`" class="sb-h4 mb-0 flex-1 text-balance">
                {{ step.role ?? step.title }}
              </h3>
              <p v-if="step.period.startLabel" class="sb-overline text-primary-ink text-left mb-0 sm:whitespace-nowrap">
                <time :datetime="step.period.startIso">{{ t('pages.about.upcomingFrom', { date: step.period.startLabel }) }}</time>
              </p>
            </div>
            <BaseRichText
              v-if="step.content.length"
              :blocks="step.content"
              class="mt-1 max-w-[75ch] text-ink-muted *:sb-small *:text-left *:mb-0"
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

    <section
      v-if="selectedWork.length"
      aria-labelledby="alongside-title"
      class="pb-24"
    >
      <h2 id="alongside-title" class="mb-0 text-balance">
        {{ t('pages.about.alongside.title') }}
      </h2>
      <p class="sb-lead text-ink-muted text-left text-pretty hyphens-none mt-4 mb-0 max-w-2xl">
        {{ t('pages.about.alongside.lead') }}
      </p>
      <ul class="mt-8 mb-0 p-0 max-w-4xl list-none border-t border-border">
        <li
          v-for="item in selectedWork"
          :key="item.key"
          class="border-b border-border"
        >
          <NuxtLink
            class="group flex items-center gap-4 py-5 text-left rounded-sm sb-transition sb-focus md:gap-6"
            :to="item.to"
          >
            <span
              aria-hidden="true"
              class="hidden sm:flex w-28 md:w-36 aspect-video shrink-0 overflow-hidden rounded-md border border-border"
              :class="item.imageFit === 'contain' ? 'bg-ink items-center justify-center p-2' : 'bg-surface-2'"
            >
              <NuxtImg
                alt=""
                :class="item.imageFit === 'contain' ? 'h-full w-auto object-contain' : 'size-full object-cover'"
                loading="lazy"
                sizes="112px md:144px"
                :src="item.imageSrc"
              />
            </span>
            <span class="flex flex-1 flex-col gap-1">
              <span class="sb-h4 text-ink group-hover:text-primary-ink sb-transition">{{ item.title }}</span>
              <span class="sb-small text-ink-muted">{{ item.meta }}</span>
              <span class="sb-body text-ink-muted text-pretty hyphens-none">{{ t(`pages.about.alongside.outcomes.${item.slug}`) }}</span>
            </span>
            <Icon
              aria-hidden="true"
              class="size-6 shrink-0 text-primary-ink sb-transition group-hover:translate-x-1"
              name="solar:arrow-right-linear"
            />
          </NuxtLink>
        </li>
      </ul>
    </section>

    <CustomClosingCta show-projects-link @contact="contactFormIsOpen = true" />

    <LazyCustomContactForm :open-form="contactFormIsOpen" @close-form="value => contactFormIsOpen = value" />
  </div>
</template>
