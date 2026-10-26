<script setup lang="ts">
interface CustomSbTemplatesCardProps {
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
  defineProps<CustomSbTemplatesCardProps>(),
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

// State
const DEFAULT_IMAGE_WIDTH = 400 // fallback to keep width/height always set for NuxtImg (avoids CLS on lazy load)
const DEFAULT_IMAGE_HEIGHT = 400

const imageWidth = computed(() => props.imageWidth ?? DEFAULT_IMAGE_WIDTH)
const imageHeight = computed(() => props.imageHeight ?? DEFAULT_IMAGE_HEIGHT)

const TECH_NAMES: Record<string, string> = {
  'logos:nuxt-icon': 'Nuxt',
  'logos:flutter': 'Flutter',
  'logos:ios': 'iOS',
  'logos:android-icon': 'Android',
  'logos:astro-icon': 'Astro',
}

const techLabel = computed(() => (props.icons ?? [])
  .map(icon => TECH_NAMES[icon] ?? icon.split(':').pop()?.replace(/-icon$/, '') ?? icon)
  .join(' + '))
</script>

<template>
  <article :data-template-id="props.id">
    <BaseCard
      class="h-full group"
      :variant="props.codebaseUrl ? 'dark-hover' : 'dark'"
    >
      <!-- Card Header: Logo -->
      <template #card-header>
        <div class="flex items-center justify-center p-4 bg-surface-2 w-full rounded-lg sb-transition">
          <div class="size-28 md:size-32 flex items-center justify-center rounded-xl bg-ink shadow-md ring-1 ring-ink/5 sb-transition group-hover:shadow-lg group-focus-within:shadow-lg">
            <NuxtImg
              v-if="props.imageSrc"
              :alt="t('pages.projects.sbTemplatesProject.templateLogoAlt', { title: props.title })"
              class="size-20 md:size-24 object-contain sb-transition group-hover:scale-105 group-focus-within:scale-105"
              :height="imageHeight"
              :src="props.imageSrc"
              :width="imageWidth"
            />
            <Icon
              v-else
              aria-hidden="true"
              class="size-20 md:size-24 text-ink-muted sb-transition group-hover:scale-105 group-focus-within:scale-105"
              name="solar:box-bold"
            />
          </div>
        </div>
      </template>

      <!-- Card Body: Title, Description, Technologies -->
      <template #card-body>
        <!-- Title -->
        <h3 class="sb-h3 mb-0 text-center text-ink sb-transition">
          {{ props.title }}
        </h3>

        <!-- Technologies -->
        <div
          v-if="props.icons && props.icons.length > 0"
          :aria-label="techLabel"
          class="flex items-center justify-center gap-2 mt-6 sb-transition"
          role="img"
        >
          <template v-for="(icon, index) in props.icons" :key="index">
            <div class="flex items-center justify-center p-2 rounded-md bg-ink h-10 md:h-12">
              <Icon
                aria-hidden="true"
                class="size-6 md:size-7 text-primary-ink sb-transition"
                :name="icon"
              />
            </div>
            <span
              v-if="index < props.icons.length - 1"
              aria-hidden="true"
              class="sb-body text-ink-muted"
            >
              +
            </span>
          </template>
        </div>

        <!-- Description -->
        <p class="sb-body text-center text-ink-muted text-pretty hyphens-none mt-3 sb-transition">
          {{ props.description }}
        </p>
      </template>

      <!-- Card Footer: CTA -->
      <template #card-footer>
        <BaseButton
          class="w-full"
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
      </template>
    </BaseCard>
  </article>
</template>
