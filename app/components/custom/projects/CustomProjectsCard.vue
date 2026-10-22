<script setup lang="ts">
interface CustomProjectsCardProps {
  id: number | string
  title: string
  meta?: string
  content: RichBlock[]
  imageSrc?: string
  imageAlt?: string
  codebaseUrls?: Array<MenuItem>
  deploymentUrls?: Array<MenuItem>
  initiallyExpanded?: boolean
}

// Input / Output
const props = withDefaults(
  defineProps<CustomProjectsCardProps>(),
  {
    imageSrc: undefined,
    imageAlt: undefined,
    meta: undefined,
    initiallyExpanded: false,
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
const MAX_CONTENT_BLOCKS = 1

watch(() => props.initiallyExpanded, (value) => {
  if (value) {
    isDescriptionExpanded.value = true
  }
})

const needsExpansion = computed(() => {
  const hasManyBlocks = props.content?.length > MAX_CONTENT_BLOCKS
  return hasManyBlocks
})

const getContentPreview = computed(() => {
  if (!props.content || !Array.isArray(props.content)) {
    return []
  }
  if (!isDescriptionExpanded.value && props.content.length > MAX_CONTENT_BLOCKS) {
    return props.content.slice(0, MAX_CONTENT_BLOCKS)
  }
  return props.content
})

interface UrlGroup {
  key: string
  urls: MenuItem[]
  icon: string
  label: string
}

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
    groups.push({
      key: 'deployment',
      urls: props.deploymentUrls,
      icon: 'solar:global-line-duotone',
      label: t('pages.projects.links.live'),
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
    :data-project-id="props.id"
  >
    <BaseCard
      class="h-full"
      :variant="isDescriptionExpanded ? 'light' : 'dark'"
    >
      <!-- Card Header -->
      <template #card-header>
        <div class="relative w-full h-72 md:h-80 rounded-t-lg sb-transition">
          <!-- Background image layer: clipped by overflow-hidden -->
          <div class="absolute inset-0 overflow-hidden rounded-t-lg">
            <div class="w-full h-full">
              <NuxtImg
                :alt="props.imageAlt || props.title"
                class="w-full h-full min-h-full object-cover object-center"
                :src="props.imageSrc"
              />
            </div>
            <div class="absolute inset-0 bg-linear-to-t from-bg/90 via-bg/40 to-transparent"></div>
          </div>

          <!-- Content wrapper -->
          <div class="relative z-10 flex flex-col justify-between h-full p-4 md:p-6 sb-transition">
            <!-- Top row: actions -->
            <div class="flex  items-center gap-2 self-end sb-transition">
              <template v-for="group in urlGroups" :key="group.key">
                <BaseButton
                  v-if="group.urls.length === 1"
                  class="shrink-0"
                  size="sm"
                  :to="group.urls[0]!.code"
                  type="link"
                  variant="primary"
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
                      class="shrink-0"
                      size="sm"
                      type="button"
                      variant="primary"
                      @click="toggle(!isOpen)"
                    >
                      <Icon
                        aria-hidden="true"
                        class="size-5"
                        :name="group.icon"
                      />
                      {{ group.label }}
                    </BaseButton>
                  </template>
                </BaseIconMenu>
              </template>
            </div>

            <!-- Bottom row: title - absolute positioned -->
            <div>
              <h2
                :id="`project-title-${props.id}`"
                class="sb-h3 mb-0 text-ink drop-shadow-md outline-none sb-transition"
                tabindex="-1"
              >
                {{ props.title }}
              </h2>
              <p
                v-if="props.meta"
                class="sb-small text-ink/80 text-left mt-1 mb-0"
              >
                {{ props.meta }}
              </p>
            </div>
          </div>
        </div>
      </template>

      <!-- Card Body -->
      <template #card-body>
        <!-- Collapsed cards share one height: fixed 4-line preview, faded at the bottom -->
        <BaseRichText
          v-if="props.content.length > 0"
          :id="`project-body-${props.id}`"
          :blocks="getContentPreview"
          :class="{ 'h-27 overflow-hidden mask-b-from-50%': !isDescriptionExpanded }"
        />
      </template>

      <!-- Card Footer -->
      <template #card-footer>
        <BaseButton
          v-if="needsExpansion"
          :aria-controls="`project-body-${props.id}`"
          :aria-expanded="isDescriptionExpanded ? 'true' : 'false'"
          class="-ml-3 uppercase"
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
          v-else
          aria-hidden="true"
          class="min-h-11"
        ></div>
      </template>
    </BaseCard>
  </article>
</template>
