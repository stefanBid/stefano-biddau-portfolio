<script setup lang="ts">
import type { MilestonePeriod, MilestoneStackItem } from '~/composables/data/useMilestones'

interface CustomMilestoneProps {
  id: number | string
  isOpen: boolean
  role: string
  period: MilestonePeriod
  content: RichBlock[]
  organization?: string
  typeLabel?: string
  stack?: MilestoneStackItem[]
  clients?: string[]
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
  imageCaption?: string
}

// Dependencies
const { t } = useI18n()
const reducedMotion = usePreferredReducedMotion()

// Input / Output
const props = withDefaults(
  defineProps<CustomMilestoneProps>(),
  {
    organization: undefined,
    typeLabel: undefined,
    stack: () => [],
    clients: () => [],
    imageSrc: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageCaption: undefined,
  },
)

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'toggle', id: number | string): void
}>()

// State
const MAX_CONTENT_BLOCKS = 1 // max number of blocks to show when collapsed
const DEFAULT_IMAGE_WIDTH = 800 // fallback to keep width/height always set for NuxtImg (avoids CLS on lazy load)
const DEFAULT_IMAGE_HEIGHT = 1000

const articleRef = ref<HTMLElement | null>(null)

const imageWidth = computed(() => props.imageWidth ?? DEFAULT_IMAGE_WIDTH)
const imageHeight = computed(() => props.imageHeight ?? DEFAULT_IMAGE_HEIGHT)

// The photo only shows when open, so a milestone with an image is always expandable
const isExpandable = computed(() => props.content.length > MAX_CONTENT_BLOCKS || Boolean(props.imageSrc))

const visibleContent = computed(() => props.isOpen ? props.content : props.content.slice(0, MAX_CONTENT_BLOCKS))

const subline = computed(() => [props.organization, props.typeLabel].filter(Boolean).join(' · '))
// Screen readers announce "·" as "middle dot"
const srSubline = computed(() => [props.organization, props.typeLabel].filter(Boolean).join(', '))

// Events
// Collapsing a long milestone can leave its top above the viewport: bring it back so the reader keeps their place
const onToggle = () => {
  const isClosing = props.isOpen
  emits('toggle', props.id)

  if (!isClosing) {
    return
  }

  nextTick(() => {
    const article = articleRef.value
    if (article && article.getBoundingClientRect().top < 0) {
      article.scrollIntoView({ block: 'start', behavior: reducedMotion.value === 'reduce' ? 'auto' : 'smooth' })
    }
  })
}
</script>

<template>
  <article
    ref="articleRef"
    :aria-labelledby="`milestone-title-${props.id}`"
    class="relative scroll-mt-24"
  >
    <div
      aria-hidden="true"
      class="absolute -left-8.25 md:-left-12.75 top-5 md:top-7.5 flex items-center justify-center pointer-events-none"
    >
      <span
        class="absolute inset-0 rounded-full sb-transition"
        :class="props.isOpen ? 'bg-primary/40 scale-200' : 'bg-transparent scale-0'"
      ></span>
      <span class="relative block size-4 md:size-5 rounded-full bg-primary"></span>
    </div>

    <BaseCard
      :class="{ 'bg-transparent!': !props.isOpen }"
      full-custom-content
      variant="dark"
    >
      <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-1 gap-x-6">
        <h3
          :id="`milestone-title-${props.id}`"
          class="mb-0 flex-1 text-balance scroll-mt-24"
        >
          {{ props.role }}
          <span v-if="srSubline" class="sr-only">, {{ srSubline }}</span>
        </h3>
        <p v-if="props.period.startLabel" class="sb-overline text-primary-ink text-left mb-0 sm:whitespace-nowrap">
          <time :datetime="props.period.startIso">{{ props.period.startLabel }}</time>
          –
          <time v-if="props.period.endIso" :datetime="props.period.endIso">{{ props.period.endLabel }}</time>
          <template v-else>
            {{ props.period.endLabel }}
          </template>
        </p>
      </div>
      <p v-if="subline || props.period.duration" class="sb-body text-ink-muted text-left hyphens-none mt-1 mb-0">
        {{ subline }}
        <template v-if="props.period.duration">
          <template v-if="subline">
            ·
          </template>
          <span class="whitespace-nowrap">{{ props.period.duration }}</span>
        </template>
      </p>

      <p v-if="props.clients.length" class="sb-body text-ink-muted text-left hyphens-none mt-3 mb-0">
        {{ t('pages.about.clientsLabel') }}
        <strong class="font-bold text-ink">{{ props.clients.join(' · ') }}</strong>
      </p>

      <ul v-if="props.stack.length" class="flex flex-wrap gap-2 mt-4 mb-0 p-0 list-none">
        <li v-for="item in props.stack" :key="item.name">
          <BaseChip
            :icon="item.icon"
            :text="item.name"
            variant="secondary"
          />
        </li>
      </ul>

      <div
        :id="`milestone-body-${props.id}`"
        class="mt-5 md:mt-6"
        :class="{ 'lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:items-start': props.isOpen && props.imageSrc }"
      >
        <BaseRichText
          v-if="visibleContent.length"
          :blocks="visibleContent"
          class="max-w-[75ch] *:text-left *:text-pretty md:*:text-justify"
        />

        <figure
          v-if="props.isOpen && props.imageSrc"
          class="mx-auto mt-6 mb-0 w-full max-w-sm bg-ink p-3 shadow-md md:mt-8 md:p-4 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:mt-0"
        >
          <div class="w-full h-62 sm:h-80 md:h-96 overflow-hidden">
            <NuxtImg
              :alt="props.imageCaption ? '' : props.role"
              class="w-full h-full object-cover"
              :height="imageHeight"
              loading="lazy"
              sizes="320px sm:352px"
              :src="props.imageSrc"
              :width="imageWidth"
            />
          </div>
          <figcaption
            v-if="props.imageCaption"
            class="sb-small italic text-center text-balance text-bg mt-3"
          >
            {{ props.imageCaption }}
          </figcaption>
        </figure>

        <div v-if="isExpandable" class="flex lg:col-start-1 lg:row-start-2">
          <BaseButton
            :aria-controls="`milestone-body-${props.id}`"
            :aria-expanded="props.isOpen ? 'true' : 'false'"
            class="mt-2 -ml-4 md:-ml-6"
            tone="accent"
            variant="ghost"
            @click="onToggle"
          >
            {{ props.isOpen ? t('pages.about.milestoneCtaLess') : t('pages.about.milestoneCta') }}
            <span class="sr-only">: {{ [props.role, srSubline].filter(Boolean).join(', ') }}</span>
            <Icon
              aria-hidden="true"
              class="size-5 sb-transition"
              :class="{ 'rotate-180': props.isOpen }"
              name="solar:alt-arrow-down-bold-duotone"
            />
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  </article>
</template>
