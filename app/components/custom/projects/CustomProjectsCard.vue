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

interface UrlGroup {
  key: string
  urls: MenuItem[]
  icon: string
  label: string
}

const _isNpmPackage = (urls: MenuItem[]) => urls.every(url => url.code.includes('npmjs.com'))

const urlGroups = computed<UrlGroup[]>(() => {
  const groups: UrlGroup[] = []

  if (props.codebaseUrls?.length) {
    groups.push({
      key: 'codebase',
      urls: props.codebaseUrls,
      icon: 'solar:code-2-line-duotone',
      label: t('pages.projects.links.code'),
    })
  }

  if (props.deploymentUrls?.length) {
    const isPackage = _isNpmPackage(props.deploymentUrls)
    groups.push({
      key: 'deployment',
      urls: props.deploymentUrls,
      icon: isPackage ? 'mdi:npm' : 'solar:global-line-duotone',
      label: isPackage ? t('pages.projects.links.package') : t('pages.projects.links.live'),
    })
  }

  return groups
})

// Events
const onTriggerDescription = () => {
  isDescriptionExpanded.value = !isDescriptionExpanded.value
  emits('toggleDescription', isDescriptionExpanded.value)
}

const onSelectUrl = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
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
          class="relative shrink-0 h-56 md:h-72 overflow-hidden rounded-md"
          :class="[
            props.imageFit === 'contain' ? 'bg-ink flex items-center justify-center p-8 md:p-12' : 'bg-surface-2',
            { 'lg:col-span-3 lg:h-full lg:min-h-96': isSplitLayout },
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
          :class="{ 'lg:col-span-2 lg:py-2': isSplitLayout }"
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
            v-if="urlGroups.length"
            class="flex flex-wrap items-center gap-3 mt-auto pt-6"
          >
            <template v-for="group in urlGroups" :key="group.key">
              <BaseButton
                v-if="group.urls.length === 1"
                :to="group.urls[0]!.code"
                type="link"
                variant="secondary"
              >
                <Icon
                  aria-hidden="true"
                  class="size-5"
                  :name="group.icon"
                />
                {{ group.label }}
              </BaseButton>
              <BaseIconMenu
                v-else
                :icon="group.icon"
                :items="group.urls"
                :label="group.label"
                @select="onSelectUrl"
              >
                <template #trigger="{ isOpen, toggle }">
                  <BaseButton
                    :aria-expanded="isOpen ? 'true' : 'false'"
                    aria-haspopup="menu"
                    type="button"
                    variant="secondary"
                    @click="toggle(!isOpen)"
                  >
                    <Icon
                      aria-hidden="true"
                      class="size-5"
                      :name="group.icon"
                    />
                    {{ group.label }}
                    <Icon
                      aria-hidden="true"
                      class="size-4 sb-transition"
                      :class="{ 'rotate-180': isOpen }"
                      name="solar:alt-arrow-down-linear"
                    />
                  </BaseButton>
                </template>
              </BaseIconMenu>
            </template>
          </div>
        </div>
      </div>
    </BaseCard>
  </article>
</template>
