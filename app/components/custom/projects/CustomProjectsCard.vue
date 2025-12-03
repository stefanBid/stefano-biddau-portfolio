<script setup lang="ts">
interface CustomProjectsCardProps {
  id: number | string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  codebaseUrl?: string
  deploymentUrl?: string
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
const { sanitizeHtml } = useSanitize()
const { t } = useI18n()

// State
const isDescriptionExpanded = ref(false)
const MAX_DESCRIPTION_LENGTH = 200
const needsExpansion = computed(() => props.description.length > MAX_DESCRIPTION_LENGTH)
const getDescriptionPreview = computed(() => {
  if (needsExpansion.value && !isDescriptionExpanded.value) {
    return sanitizeHtml(props.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...')
  }
  return sanitizeHtml(props.description)
})

// Events
const onTriggerDescription = () => {
  isDescriptionExpanded.value = !isDescriptionExpanded.value
  emits('toggleDescription', isDescriptionExpanded.value)
}
</script>

<template>
  <article :data-project-id="props.id">
    <BaseCard
      class="p-0! h-full"
      full-custom-content
      variant="dark-hover"
    >
      <!-- Header wrapper: height driven by content (flex between) -->
      <div class="relative rounded-t-xl">
        <!-- Background image layer: clipped by overflow-hidden -->
        <div class="absolute inset-0 overflow-hidden rounded-t-xl">
          <div class="w-full h-full">
            <NuxtImg
              :alt="props.imageAlt || props.title"
              class="w-full h-full min-h-full object-cover object-center"
              :src="props.imageSrc"
            />
          </div>
          <div class="absolute inset-0 bg-black/60"></div>
        </div>

        <!-- Flex-between content wrapper (NOT clipped) -->
        <div class="relative z-10 flex flex-col justify-between p-4 md:p-6 u-sb-soft-transition">
          <!-- Top row: actions -->
          <div class="flex items-center gap-2 self-end mb-10 md:mb-20 u-sb-soft-transition">
            <BaseButton
              v-if="props.codebaseUrl"
              aria-label="Open link to project codebase"
              class="p-2!"
              :to="props.codebaseUrl"
              type="link"
              variant="primary"
            >
              <Icon
                class="size-4 md:size-6"
                name="solar:code-2-line-duotone"
              />
            </BaseButton>
            <BaseButton
              v-if="props.deploymentUrl"
              aria-label="Open link to deployed project"
              class="p-2!"
              :to="props.deploymentUrl"
              type="link"
              variant="primary"
            >
              <Icon
                class="size-4 md:size-6"
                name="solar:global-line-duotone"
              />
            </BaseButton>
          </div>

          <!-- Bottom row: title -->
          <div>
            <h2 class="ty-sb-title text-white drop-shadow-lg u-sb-soft-transition">
              {{ props.title }}
            </h2>
          </div>
        </div>
      </div>

      <!-- Card body -->
      <div class="flex flex-col flex-1 px-4 py-4 md:px-6 md:py-6">
        <p
          v-if="props.description"
          class="ty-sb-paragraph mt-2 u-sb-soft-transition text-justify"
          v-html="getDescriptionPreview"
        ></p>

        <div class="mt-4 flex items-center gap-2">
          <button
            v-if="needsExpansion"
            class="inline-flex items-center gap-1.5 ty-sb-label px-2 py-1 text-sb-accent hover:text-sb-accent-hover cursor-pointer rounded u-sb-soft-transition u-sb-focus"
            @click="onTriggerDescription()"
          >
            <span>{{ t('pages.about.milestoneCta') }}</span>
            <Icon
              class="size-5 transition-transform"
              :class="{ 'rotate-180': isDescriptionExpanded }"
              name="solar:alt-arrow-down-bold-duotone"
            />
          </button>
        </div>
      </div>
    </BaseCard>
  </article>
</template>
