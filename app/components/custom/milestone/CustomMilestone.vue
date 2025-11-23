<script setup lang="ts">
interface CustomMilestoneProps {
  id: number | string
  isActive: boolean
  title: string
  subtitle?: string | null
  description: string
  imageSrc?: string | null
  imageAlt?: string | null
  date?: string | null
}

// Input / Output
const props = withDefaults(
  defineProps<CustomMilestoneProps>(),
  {
    subtitle: null,
    imageSrc: null,
    imageAlt: null,
    date: null,
  },
)

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', id: number | string): void
}>()

// Dependencies
const { sanitizeHtml } = useSanitize()
const { t } = useI18n()

// State
const MAX_DESCRIPTION_LENGTH = 100
const needsExpansion = computed(() => props.description.length > MAX_DESCRIPTION_LENGTH)
const getDescriptionPreview = computed(() => {
  if (needsExpansion.value && !props.isActive) {
    return sanitizeHtml(props.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...')
  }
  return sanitizeHtml(props.description)
})

// Events
const onSelect = () => {
  emits('select', props.id)
}
</script>

<template>
  <article
    class="relative"
    :data-milestone-id="props.id"
  >
    <!-- Timeline Point with Halo Effect -->
    <div
      class="absolute -left-[33px] sm:-left-[51px] top-3.5 sm:top-4.5 md:top-10 flex items-center justify-center pointer-events-none u-sb-soft-transition"
    >
      <!-- Static Halo -->
      <div
        class="absolute inset-0 rounded-full u-sb-soft-transition"
        :class="{
          'bg-sb-accent/40 scale-200': props.isActive,
          'bg-transparent scale-0': !props.isActive,
        }"
      ></div>
      <!-- Clickable Point -->
      <button
        :aria-label="`View milestone ${props.id}`"
        :aria-pressed="props.isActive"
        class="relative size-4 sm:size-5 bg-sb-accent rounded-full hover:bg-sb-accent-hover u-sb-focus cursor-pointer u-sb-soft-transition pointer-events-auto z-10"
        @click="onSelect"
      ></button>
    </div>

    <!-- Content -->
    <BaseCard
      :class="{
        'bg-transparent!': !props.isActive,
      }"
      full-custom-content
      variant="dark"
    >
      <!-- Header: Title + Date -->
      <div class="flex flex-col sm:flex-row items-start justify-start sm:justify-between gap-y-0.5 gap-x-4">
        <h2 class="ty-sb-title u-sb-soft-transition flex-1">
          {{ props.title }}
        </h2>
        <time
          v-if="props.date"
          class="ty-sb-label text-sb-accent whitespace-nowrap"
          :datetime="props.date"
        >
          {{ props.date }}
        </time>
      </div>
      <p
        v-if="props.subtitle"
        class="ty-sb-subtitle text-sb-muted mt-1 u-sb-soft-transition"
      >
        {{ props.subtitle }}
      </p>
      <p
        v-if="props.description"
        class="ty-sb-paragraph text-justify mt-3 md:mt-4 u-sb-soft-transition"
        v-html="getDescriptionPreview"
      >
      </p>
      <!-- Expand indicator -->
      <button
        v-if="needsExpansion && !props.isActive"
        class="inline-flex cursor-pointer items-center gap-1.5 mt-2 ty-sb-label text-sb-accent hover:text-sb-accent-hover u-sb-focus u-sb-soft-transition rounded px-2 py-1 w-fit"
        @click="onSelect"
      >
        <span>{{ t('pages.about-me.milestone-cta') }}</span>
        <Icon class="size-4" name="solar:alt-arrow-down-bold-duotone" />
      </button>
    </BaseCard>
  </article>
</template>
