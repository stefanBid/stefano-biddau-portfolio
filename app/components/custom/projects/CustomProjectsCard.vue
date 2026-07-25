<script setup lang="ts">
interface CustomProjectsCardProps {
  id: number | string
  title: string
  content: RichBlock[]
  imageSrc?: string
  imageAlt?: string
  codebaseUrls?: Array<MenuItem>
  deploymentUrls?: Array<MenuItem>
}

// Input / Output
const props = withDefaults(
  defineProps<CustomProjectsCardProps>(),
  {
    imageSrc: undefined,
    imageAlt: undefined,
  },
)

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'toggleDescription', value: boolean): void
}>()

// Dependencies
const { t } = useI18n()

// State
const isDescriptionExpanded = ref(false)
const MAX_CONTENT_BLOCKS = 1 // numero massimo di blocchi da mostrare in preview

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
  ariaLabel: string
}

const urlGroups = computed<UrlGroup[]>(() => {
  const groups: UrlGroup[] = []

  if (props.codebaseUrls?.length) {
    groups.push({
      key: 'codebase',
      urls: props.codebaseUrls,
      icon: 'solar:code-2-line-duotone',
      ariaLabel: 'Open link to project codebase',
    })
  }

  if (props.deploymentUrls?.length) {
    groups.push({
      key: 'deployment',
      urls: props.deploymentUrls,
      icon: 'solar:global-line-duotone',
      ariaLabel: 'Open link to deployed project',
    })
  }

  return groups
})

// Events
const onTriggerDescription = (event: Event) => {
  (event.currentTarget as HTMLElement)?.blur()
  isDescriptionExpanded.value = !isDescriptionExpanded.value
  emits('toggleDescription', isDescriptionExpanded.value)
}

const onSelectUrl = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <article :data-project-id="props.id">
    <BaseCard
      class="h-full"
      :variant="isDescriptionExpanded ? 'light' : 'dark-hover'"
    >
      <!-- Card Header -->
      <template #card-header>
        <div class="relative w-full h-72 md:h-80 rounded-t-xl u-sb-soft-transition">
          <!-- Background image layer: clipped by overflow-hidden -->
          <div class="absolute inset-0 overflow-hidden rounded-t-xl">
            <div class="w-full h-full">
              <NuxtImg
                :alt="props.imageAlt || props.title"
                class="w-full h-full min-h-full object-cover object-center"
                :src="props.imageSrc"
              />
            </div>
            <div class="absolute inset-0 bg-black/50"></div>
          </div>

          <!-- Content wrapper -->
          <div class="relative z-10 flex flex-col justify-between h-full p-4 md:p-6 u-sb-soft-transition">
            <!-- Top row: actions -->
            <div class="flex  items-center gap-2 self-end u-sb-soft-transition">
              <template v-for="group in urlGroups" :key="group.key">
                <BaseButton
                  v-if="group.urls.length === 1"
                  :aria-label="group.ariaLabel"
                  class="p-2! shrink-0"
                  :to="group.urls[0]!.code"
                  type="link"
                  variant="primary"
                >
                  <Icon
                    class="size-4 md:size-6"
                    :name="group.icon"
                  />
                </BaseButton>
                <BaseIconMenu
                  v-else
                  :icon="group.icon"
                  :items="group.urls"
                  @select="onSelectUrl"
                >
                  <template #trigger="{ isOpen, toggle }">
                    <BaseButton
                      :aria-expanded="isOpen ? 'true' : 'false'"
                      aria-haspopup="menu"
                      :aria-label="group.ariaLabel"
                      class="p-2! shrink-0"
                      type="button"
                      variant="primary"
                      @click="toggle(!isOpen)"
                    >
                      <Icon
                        class="size-4 md:size-6"
                        :name="group.icon"
                      />
                    </BaseButton>
                  </template>
                </BaseIconMenu>
              </template>
            </div>

            <!-- Bottom row: title - absolute positioned -->
            <div>
              <h2
                class="ty-sb-title text-white drop-shadow-lg u-sb-soft-transition"
                :class="{
                  'animate-pulse': isDescriptionExpanded,
                }"
              >
                {{ props.title }}
              </h2>
            </div>
          </div>
        </div>
      </template>

      <!-- Card Body -->
      <template #card-body>
        <BaseRichText
          v-if="props.content.length > 0"
          :blocks="getContentPreview"
          class="u-sb-soft-transition"
        />
      </template>

      <!-- Card Footer -->
      <template #card-footer>
        <button
          v-if="needsExpansion"
          class="inline-flex items-center gap-1.5 ty-sb-label px-2 py-1 text-sb-accent hover:text-sb-accent-hover cursor-pointer rounded u-sb-soft-transition u-sb-focus"
          @click="$event => onTriggerDescription($event)"
        >
          <span>
            {{ isDescriptionExpanded ? t('pages.projects.personalProjects.readLessCta') : t('pages.projects.personalProjects.readMoreCta') }}
          </span>
          <Icon
            class="size-5 transition-transform"
            :class="{ 'rotate-180': isDescriptionExpanded }"
            name="solar:alt-arrow-down-bold-duotone"
          />
        </button>
      </template>
    </BaseCard>
  </article>
</template>
