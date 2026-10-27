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
const COLLAPSED_STACK_ITEMS = 3 // chips shown on mobile when collapsed, the rest stay for screen readers
const DEFAULT_IMAGE_WIDTH = 800 // fallback to keep width/height always set for NuxtImg (avoids CLS on lazy load)
const DEFAULT_IMAGE_HEIGHT = 1000

const articleRef = ref<HTMLElement | null>(null)

const imageWidth = computed(() => props.imageWidth ?? DEFAULT_IMAGE_WIDTH)
const imageHeight = computed(() => props.imageHeight ?? DEFAULT_IMAGE_HEIGHT)

// The photo only shows when open, so a milestone with an image is always expandable
const isExpandable = computed(() => props.content.length > MAX_CONTENT_BLOCKS || Boolean(props.imageSrc))

const hiddenStackCount = computed(() => props.isOpen ? 0 : Math.max(props.stack.length - COLLAPSED_STACK_ITEMS, 0))

// Right column on lg: clients, stack and (when open) the photo, so the text never sits beside empty space
const hasAside = computed(() => props.clients.length > 0 || props.stack.length > 0 || (props.isOpen && Boolean(props.imageSrc)))

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
      class="absolute -left-5.25 md:-left-12.75 top-5 md:top-7.5 flex items-center justify-center pointer-events-none"
    >
      <span
        class="absolute inset-0 rounded-full sb-transition"
        :class="props.isOpen ? 'bg-primary/40 scale-200' : 'bg-transparent scale-0'"
      ></span>
      <span class="relative block size-4 md:size-5 rounded-full bg-primary"></span>
    </div>

    <BaseCard
      class="max-md:px-3"
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
          <span v-if="subline" class="hidden sm:inline">
            ·
          </span>
          <span class="block whitespace-nowrap sm:inline">{{ props.period.duration }}</span>
        </template>
      </p>

      <div
        :id="`milestone-body-${props.id}`"
        class="flex flex-col"
        :class="{ 'lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-x-12 lg:mt-5': hasAside }"
      >
        <!-- display: contents below lg lets both columns interleave through order: clients and stack first, then text, photo, toggle -->
        <div class="contents" :class="{ 'lg:block lg:col-start-1 lg:row-start-1': hasAside }">
          <BaseRichText
            v-if="visibleContent.length"
            :blocks="visibleContent"
            class="order-2 mt-5 max-w-prose md:mt-6 lg:mt-0"
          />

          <div v-if="isExpandable" class="order-4 flex">
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

        <div v-if="hasAside" class="contents lg:col-start-2 lg:row-start-1 lg:flex lg:flex-col lg:gap-4 lg:self-stretch">
          <p v-if="props.clients.length" class="order-1 sb-body text-ink-muted text-left hyphens-none mt-3 mb-0 lg:mt-0">
            {{ t('pages.about.clientsLabel') }}
            <strong class="font-bold text-ink">{{ props.clients.join(' · ') }}</strong>
          </p>

          <ul v-if="props.stack.length" class="order-1 flex flex-wrap gap-2 mt-4 mb-0 p-0 list-none lg:mt-0">
            <li
              v-for="(item, index) in props.stack"
              :key="item.name"
              :class="{ 'max-md:sr-only': !props.isOpen && index >= COLLAPSED_STACK_ITEMS }"
            >
              <BaseChip
                :accent-color="item.color"
                :icon="item.icon"
                :text="item.name"
                variant="ghost"
              />
            </li>
            <li
              v-if="hiddenStackCount"
              aria-hidden="true"
              class="md:hidden"
            >
              <BaseChip :text="`+${hiddenStackCount}`" variant="ghost" />
            </li>
          </ul>

          <!-- CSS entrance, not <Transition>: Vue keeps a leaving node for two frames even without leave classes, and the photo would flash after the layout changed -->
          <figure
            v-if="props.isOpen && props.imageSrc"
            class="order-3 mx-auto mt-6 mb-0 w-full max-w-sm bg-ink p-3 shadow-md animate-rise-in md:mt-8 md:p-4 lg:sticky lg:top-24 lg:mx-0 lg:mt-2"
          >
            <div class="w-full h-62 sm:h-80 md:h-96 lg:h-72 overflow-hidden">
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
        </div>
      </div>
    </BaseCard>
  </article>
</template>
