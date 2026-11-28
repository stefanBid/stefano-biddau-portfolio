<script setup lang="ts">
interface CustomSbTemplatesRowProps {
  id: number | string
  title: string
  description: string
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
  icons?: string[]
  codebaseUrl?: string
}

// Input / Output
const props = withDefaults(
  defineProps<CustomSbTemplatesRowProps>(),
  {
    imageSrc: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    icons: undefined,
    codebaseUrl: undefined,
  },
)

// Dependencies
const { t } = useI18n()

// Data
const DEFAULT_IMAGE_WIDTH = 400 // fallback to keep width/height always set for NuxtImg (avoids CLS on lazy load)
const DEFAULT_IMAGE_HEIGHT = 400

const imageWidth = computed(() => props.imageWidth ?? DEFAULT_IMAGE_WIDTH)
const imageHeight = computed(() => props.imageHeight ?? DEFAULT_IMAGE_HEIGHT)

const TECH_NAMES: Record<string, string> = {
  'logos:nuxt-icon': 'Nuxt',
  'logos:vue': 'Vue',
  'logos:vitejs': 'Vite',
  'logos:flutter-icon': 'Flutter',
  'logos:ios': 'iOS',
  'logos:android-icon': 'Android',
  'logos:astro-icon': 'Astro',
}

const techLabel = computed(() => (props.icons ?? [])
  .map(icon => TECH_NAMES[icon] ?? icon.split(':').pop()?.replace(/-icon$/, '') ?? icon)
  .join(' + '))
</script>

<template>
  <article
    :id="`template-${props.id}`"
    class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-4 py-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-8 md:gap-y-2"
  >
    <div class="flex size-16 items-center justify-center rounded-lg bg-ink p-2 shadow-sm md:row-span-2 md:size-20">
      <NuxtImg
        v-if="props.imageSrc"
        :alt="t('pages.projects.sbTemplatesProject.templateLogoAlt', { title: props.title })"
        class="size-full object-contain"
        :height="imageHeight"
        :src="props.imageSrc"
        :width="imageWidth"
      />
      <Icon
        v-else
        aria-hidden="true"
        class="size-7 text-ink-muted"
        name="solar:box-bold"
      />
    </div>

    <div class="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 md:self-end">
      <h3 class="sb-h3 mb-0 text-ink">
        {{ props.title }}
      </h3>
      <div
        v-if="props.icons && props.icons.length > 0"
        :aria-label="techLabel"
        class="flex items-center gap-1.5"
        role="img"
      >
        <span
          v-for="icon in props.icons"
          :key="icon"
          class="flex size-8 items-center justify-center rounded-sm bg-ink"
        >
          <Icon
            aria-hidden="true"
            class="size-5"
            :name="icon"
          />
        </span>
      </div>
    </div>
    <p class="col-span-2 mb-0 max-w-3xl text-ink-muted md:col-span-1 md:col-start-2 md:self-start">
      {{ props.description }}
    </p>

    <BaseButton
      class="col-span-2 justify-self-start md:col-span-1 md:col-start-3 md:row-span-2 md:row-start-1 md:justify-self-end"
      :is-disabled="!props.codebaseUrl"
      :to="props.codebaseUrl"
      :type="props.codebaseUrl ? 'link' : 'button'"
      variant="secondary"
    >
      <Icon
        aria-hidden="true"
        class="size-5"
        name="solar:rocket-2-bold-duotone"
      />
      {{ t('pages.projects.sbTemplatesProject.linkToCta') }}
    </BaseButton>
  </article>
</template>
