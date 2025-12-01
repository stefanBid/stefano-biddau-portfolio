<script setup lang="ts">
interface CustomProjectsCardProps {
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  projectUrl?: string
}

// Input / Output
const props = withDefaults(
  defineProps<CustomProjectsCardProps>(),
  {
    imageSrc: undefined,
    imageAlt: undefined,
  },
)

// Dependencies
const { sanitizeHtml } = useSanitize()
const { t } = useI18n()

// State
const isDescriptionExpanded = ref(false)
const MAX_DESCRIPTION_LENGTH = 100
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
}
</script>

<template>
  <article
    class="relative"
  >
    <!-- Content -->
    <BaseCard
      full-custom-content
      variant="dark"
    >
      <h2 class="ty-sb-title u-sb-soft-transition flex-1">
        {{ props.title }}
      </h2>
      <p
        v-if="props.description"
        class="ty-sb-paragraph text-justify mt-3 md:mt-4 u-sb-soft-transition"
        v-html="getDescriptionPreview"
      >
      </p>

      <!-- Expand indicator -->
      <button
        v-if="needsExpansion"
        class="inline-flex cursor-pointer items-center gap-1.5 mt-2 ty-sb-label text-sb-accent hover:text-sb-accent-hover u-sb-focus u-sb-soft-transition rounded px-2 py-1 w-fit"
        @click="onTriggerDescription()"
      >
        <span>{{ t('pages.about.milestoneCta') }}</span>
        <Icon
          class="size-5"
          :class="{
            'rotate-0': isDescriptionExpanded,
            'rotate-180': !isDescriptionExpanded,
          }"
          name=" solar:alt-arrow-down-bold-duotone"
        />
      </button>
    </BaseCard>
  </article>
</template>
