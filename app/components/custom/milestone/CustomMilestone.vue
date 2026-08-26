<script setup lang="ts">
interface CustomMilestoneProps {
  id: number | string
  isActive: boolean
  title: string
  content: RichBlock[]
  subtitle?: string
  imageSrc?: string
  imageAlt?: string
  date?: string
}

// Input / Output
const props = withDefaults(
  defineProps<CustomMilestoneProps>(),
  {
    subtitle: undefined,
    imageSrc: undefined,
    imageAlt: undefined,
    date: undefined,
  },
)

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', id: number | string): void
}>()

// Dependencies
const { t } = useI18n()

// State
const MAX_CONTENT_BLOCKS = 1 // max number of blocks to show when collapsed

const needsExpansion = computed(() => {
  const hasManyBlocks = props.content.length > MAX_CONTENT_BLOCKS
  return hasManyBlocks
})

const getContentPreview = computed(() => {
  if (!props.isActive && props.content.length > MAX_CONTENT_BLOCKS) {
    return props.content.slice(0, MAX_CONTENT_BLOCKS)
  }
  return props.content
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
      class="absolute -left-8.25 md:-left-12.75 top-3.5 sm:top-4.5 md:top-10 flex items-center justify-center pointer-events-none u-sb-soft-transition"
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
        class="relative size-4 md:size-5 bg-sb-accent rounded-full hover:bg-sb-accent-hover u-sb-focus cursor-pointer u-sb-soft-transition pointer-events-auto z-10"
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
      <div class="flex flex-col sm:flex-row items-start justify-start sm:justify-between gap-y-0.5 gap-x-4 u-sb-soft-transition">
        <h2 class="ty-sb-title u-sb-soft-transition flex-1">
          {{ props.title }}
        </h2>
        <time
          v-if="props.date"
          class="ty-sb-label text-sb-accent whitespace-nowrap u-sb-soft-transition"
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
      <BaseRichText
        v-if="props.content.length > 0"
        :blocks="getContentPreview"
        class="mt-3 md:mt-4 u-sb-soft-transition"
      />

      <!-- Polaroid Image (only when active) -->
      <div
        v-if="props.isActive && props.imageSrc"
        class="mt-6 md:mt-8 flex justify-center u-sb-soft-transition"
      >
        <div
          class="bg-white p-3 md:p-4 shadow-lg max-w-sm w-full u-sb-soft-transition"
        >
          <div class="w-full h-62 sm:h-80 md:h-96 overflow-hidden u-sb-soft-transition  ">
            <NuxtImg
              :alt="props.imageAlt || props.title"
              class="w-full h-full object-cover"
              loading="lazy"
              :src="props.imageSrc"
            />
          </div>
          <p
            v-if="props.imageAlt"
            class="text-center text-gray-700 mt-3 ty-sb-caption u-sb-soft-transition"
          >
            {{ props.imageAlt }}
          </p>
        </div>
      </div>

      <!-- Expand indicator -->
      <div class="flex justify-center md:justify-start">
        <button
          v-if="needsExpansion && !props.isActive"
          class="inline-flex cursor-pointer items-center gap-1.5 mt-2 ty-sb-label text-sb-accent hover:text-sb-accent-hover u-sb-focus u-sb-soft-transition rounded px-2 py-1 w-fit"
          @click="onSelect"
        >
          <span>{{ t('pages.about.milestoneCta') }}</span>
          <Icon class="size-5" name="solar:alt-arrow-down-bold-duotone" />
        </button>
      </div>
    </BaseCard>
  </article>
</template>
