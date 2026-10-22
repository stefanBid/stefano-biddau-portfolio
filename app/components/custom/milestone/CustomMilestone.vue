<script setup lang="ts">
interface CustomMilestoneProps {
  id: number | string
  isActive: boolean
  title: string
  content: RichBlock[]
  subtitle?: string
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
  date?: string
}

// Input / Output
const props = withDefaults(
  defineProps<CustomMilestoneProps>(),
  {
    subtitle: undefined,
    imageSrc: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAlt: undefined,
    date: undefined,
  },
)

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', id: number | string): void
}>()

// Dependencies
const { t, locale } = useI18n()

// State
const MAX_CONTENT_BLOCKS = 1 // max number of blocks to show when collapsed
const DEFAULT_IMAGE_WIDTH = 800 // fallback to keep width/height always set for NuxtImg (avoids CLS on lazy load)
const DEFAULT_IMAGE_HEIGHT = 1000

// Locale files store dates as MM/DD/YYYY
const parsedDate = computed(() => {
  const [month, day, year] = (props.date ?? '').split('/').map(Number)
  if (!month || !day || !year) {
    return null
  }
  return new Date(Date.UTC(year, month - 1, day))
})

const isoDate = computed(() => parsedDate.value?.toISOString().slice(0, 10))

const displayDate = computed(() => parsedDate.value
  ? new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(parsedDate.value)
  : props.date)

const imageWidth = computed(() => props.imageWidth ?? DEFAULT_IMAGE_WIDTH)
const imageHeight = computed(() => props.imageHeight ?? DEFAULT_IMAGE_HEIGHT)

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

const titleRef = ref<HTMLElement | null>(null)
const focusTitleOnOpen = ref(false)

// Events
const onSelect = () => {
  emits('select', props.id)
}

// The Read more button unmounts once the milestone opens: hand focus to the title so keyboard users keep their place
const onReadMore = () => {
  focusTitleOnOpen.value = true
  onSelect()
}

watch(() => props.isActive, (isActive) => {
  if (isActive && focusTitleOnOpen.value) {
    focusTitleOnOpen.value = false
    nextTick(() => titleRef.value?.focus())
  }
})
</script>

<template>
  <article
    class="relative"
    :data-milestone-id="props.id"
  >
    <!-- Timeline Point with Halo Effect -->
    <div
      class="absolute -left-8.25 md:-left-12.75 top-3.5 sm:top-4.5 md:top-10 flex items-center justify-center pointer-events-none sb-transition"
    >
      <!-- Static Halo -->
      <div
        class="absolute inset-0 rounded-full sb-transition"
        :class="{
          'bg-primary/40 scale-200': props.isActive,
          'bg-transparent scale-0': !props.isActive,
        }"
      ></div>
      <!-- Clickable Point -->
      <BaseButton
        :aria-controls="`milestone-body-${props.id}`"
        :aria-expanded="props.isActive ? 'true' : 'false'"
        :aria-label="t('a11y.showMilestone', { title: props.title })"
        class="relative size-4 md:size-5 bg-primary rounded-full hover:bg-primary-hover pointer-events-auto z-10"
        variant="bare"
        @click="onSelect"
      />
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
      <div class="flex flex-col sm:flex-row items-start justify-start sm:justify-between gap-y-0.5 gap-x-4 sb-transition">
        <h2
          ref="titleRef"
          class="sb-h3 mb-0 sb-transition flex-1 outline-none"
          tabindex="-1"
        >
          {{ props.title }}
        </h2>
        <time
          v-if="props.date"
          class="sb-overline text-primary-ink whitespace-nowrap sb-transition"
          :datetime="isoDate"
        >
          {{ displayDate }}
        </time>
      </div>
      <p
        v-if="props.subtitle"
        class="sb-h4 text-ink-muted mt-2 mb-0 sb-transition"
      >
        {{ props.subtitle }}
      </p>
      <div
        class="mt-5 md:mt-6"
        :class="{ 'lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12 lg:items-start': props.isActive && props.imageSrc }"
      >
        <BaseRichText
          v-if="props.content.length > 0"
          :id="`milestone-body-${props.id}`"
          :blocks="getContentPreview"
          class="sb-transition"
        />

        <!-- Polaroid Image (only when active) -->
        <div
          v-if="props.isActive && props.imageSrc"
          class="mt-6 md:mt-8 lg:mt-0 lg:sticky lg:top-24 flex justify-center sb-transition"
        >
          <div
            class="bg-ink p-3 md:p-4 shadow-md max-w-sm w-full sb-transition"
          >
            <div class="w-full h-62 sm:h-80 md:h-96 overflow-hidden sb-transition  ">
              <NuxtImg
                :alt="props.imageAlt || props.title"
                class="w-full h-full object-cover"
                :height="imageHeight"
                loading="lazy"
                :src="props.imageSrc"
                :width="imageWidth"
              />
            </div>
            <p
              v-if="props.imageAlt"
              class="text-center text-bg mt-3 sb-small italic sb-transition"
            >
              {{ props.imageAlt }}
            </p>
          </div>
        </div>
      </div>

      <!-- Expand indicator -->
      <div class="flex justify-center md:justify-start">
        <BaseButton
          v-if="needsExpansion && !props.isActive"
          :aria-controls="`milestone-body-${props.id}`"
          aria-expanded="false"
          class="mt-2 md:-ml-3 uppercase"
          tone="accent"
          variant="ghost"
          @click="onReadMore"
        >
          {{ t('pages.about.milestoneCta') }}
          <Icon aria-hidden="true" class="size-5" name="solar:alt-arrow-down-bold-duotone" />
        </BaseButton>
      </div>
    </BaseCard>
  </article>
</template>
