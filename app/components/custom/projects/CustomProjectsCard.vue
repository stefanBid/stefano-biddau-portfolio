<script setup lang="ts">
interface CustomProjectsCardProps {
  id: number | string
  title: string
  meta?: string
  content: RichBlock[]
  imageSrc?: string
  imageAlt?: string
  imageFit?: 'cover' | 'contain'
  codebaseUrls?: Array<MenuItem>
  deploymentUrls?: Array<MenuItem>
  initiallyExpanded?: boolean
  isOngoing?: boolean
  featured?: boolean
}

// Input / Output
const props = withDefaults(
  defineProps<CustomProjectsCardProps>(),
  {
    imageSrc: undefined,
    imageAlt: undefined,
    imageFit: 'cover',
    meta: undefined,
    initiallyExpanded: false,
    isOngoing: false,
    featured: false,
  },
)

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'toggleDescription', value: boolean): void
}>()

// Dependencies
const { t } = useI18n()

// State
const isDescriptionExpanded = ref(props.initiallyExpanded)
const PREVIEW_BLOCKS = 1
// Up to this many blocks the whole text is short enough to show without a toggle
const MAX_BLOCKS_WITHOUT_TOGGLE = 2

watch(() => props.initiallyExpanded, (value) => {
  if (value) {
    isDescriptionExpanded.value = true
  }
})

const hasImage = computed(() => Boolean(props.imageSrc))
const isSplitLayout = computed(() => props.featured && hasImage.value)

const needsExpansion = computed(() => !props.featured && props.content.length > MAX_BLOCKS_WITHOUT_TOGGLE)

const getContentPreview = computed(() => {
  if (!props.content || !Array.isArray(props.content)) {
    return []
  }
  if (needsExpansion.value && !isDescriptionExpanded.value) {
    return props.content.slice(0, PREVIEW_BLOCKS)
  }
  return props.content
})

// Events
const onTriggerDescription = () => {
  isDescriptionExpanded.value = !isDescriptionExpanded.value
  emits('toggleDescription', isDescriptionExpanded.value)
}
</script>

<template>
  <article
    :id="`project-${props.id}`"
    class="scroll-mt-24"
    :class="{ 'lg:col-span-2': props.featured }"
    :data-project-id="props.id"
  >
    <BaseCard
      class="h-full"
      full-custom-content
      variant="dark"
    >
      <div
        class="h-full gap-5 md:gap-6"
        :class="isSplitLayout ? 'flex flex-col lg:grid lg:grid-cols-5 lg:gap-10' : 'flex flex-col'"
      >
        <div
          v-if="hasImage"
          class="relative shrink-0 h-48 md:h-60 overflow-hidden rounded-md"
          :class="[
            props.imageFit === 'contain' ? 'bg-ink flex items-center justify-center p-8 md:p-12' : 'bg-surface-2',
            { 'lg:col-span-2 lg:h-72 lg:self-start': isSplitLayout },
          ]"
        >
          <NuxtImg
            :alt="props.imageAlt || props.title"
            class="size-full object-center"
            :class="props.imageFit === 'contain' ? 'object-contain' : 'object-cover'"
            :src="props.imageSrc"
          />
          <BaseChip
            v-if="props.isOngoing"
            class="absolute top-3 right-3 md:top-4 md:right-4"
            icon="solar:record-circle-bold-duotone"
            :text="t('pages.projects.personalProjects.ongoing')"
          />
        </div>

        <div
          class="flex flex-1 flex-col min-w-0"
          :class="{ 'lg:col-span-3 lg:py-2': isSplitLayout }"
        >
          <BaseChip
            v-if="props.isOngoing && !hasImage"
            class="self-start mb-3"
            icon="solar:record-circle-bold-duotone"
            :text="t('pages.projects.personalProjects.ongoing')"
          />
          <h2
            :id="`project-title-${props.id}`"
            class="mb-0 text-ink text-balance outline-none"
            :class="props.featured ? 'sb-h2' : 'sb-h3'"
            tabindex="-1"
          >
            {{ props.title }}
          </h2>
          <p
            v-if="props.meta"
            class="sb-small text-ink-muted text-left mt-1 mb-0"
          >
            {{ props.meta }}
          </p>

          <BaseRichText
            v-if="props.content.length > 0"
            :id="`project-body-${props.id}`"
            :blocks="getContentPreview"
            class="mt-4 text-ink-muted"
          />

          <BaseButton
            v-if="needsExpansion"
            :aria-controls="`project-body-${props.id}`"
            :aria-describedby="`project-title-${props.id}`"
            :aria-expanded="isDescriptionExpanded ? 'true' : 'false'"
            class="-ml-6 self-start"
            tone="accent"
            variant="ghost"
            @click="onTriggerDescription"
          >
            {{ isDescriptionExpanded ? t('pages.projects.personalProjects.readLessCta') : t('pages.projects.personalProjects.readMoreCta') }}
            <Icon
              aria-hidden="true"
              class="size-5 sb-transition"
              :class="{ 'rotate-180': isDescriptionExpanded }"
              name="solar:alt-arrow-down-bold-duotone"
            />
          </BaseButton>

          <div
            v-if="props.codebaseUrls?.length || props.deploymentUrls?.length"
            class="flex flex-wrap items-center gap-3 mt-auto pt-6"
          >
            <CustomProjectsLinks :codebase-urls="props.codebaseUrls" :deployment-urls="props.deploymentUrls" />
          </div>
        </div>
      </div>
    </BaseCard>
  </article>
</template>
