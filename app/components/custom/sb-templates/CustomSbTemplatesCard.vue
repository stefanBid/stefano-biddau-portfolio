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
    deploymentUrl: undefined,
  },
)

// Dependencies
const { t } = useI18n()

// State
const DEFAULT_IMAGE_WIDTH = 400 // fallback to keep width/height always set for NuxtImg (avoids CLS on lazy load)
const DEFAULT_IMAGE_HEIGHT = 400

const imageWidth = computed(() => props.imageWidth ?? DEFAULT_IMAGE_WIDTH)
const imageHeight = computed(() => props.imageHeight ?? DEFAULT_IMAGE_HEIGHT)
</script>

<template>
  <article :data-template-id="props.id">
    <BaseCard
      class="h-full group"
      :variant="props.codebaseUrl ? 'dark-hover' : 'dark'"
    >
      <!-- Card Header: Logo -->
      <template #card-header>
        <div class="flex items-center justify-center p-4 bg-sb-surface-2 w-full rounded-xl u-sb-soft-transition">
          <div class="logo-container size-28 md:size-32 flex items-center justify-center rounded-2xl bg-sb-contrast shadow-[0_8px_30px_var(--color-sb-shadow)] ring-1 ring-white/5 u-sb-soft-transition transition-transform">
            <NuxtImg
              v-if="props.imageSrc"
              :alt="`${props.title} logo`"
              class="size-20 md:size-24 object-contain u-sb-soft-transition transition-transform"
              :height="imageHeight"
              loading="lazy"
              :src="props.imageSrc"
              :width="imageWidth"
            />
            <Icon
              v-else
              class="template-icon size-20 md:size-24 text-sb-muted u-sb-soft-transition transition-transform"
              name="solar:box-bold"
            />
          </div>
        </div>
      </template>

      <!-- Card Body: Title, Description, Technologies -->
      <template #card-body>
        <!-- Title -->
        <h3 class="ty-sb-title text-center text-sb-contrast u-sb-soft-transition">
          {{ props.title }}
        </h3>

        <!-- Description -->
        <p class="ty-sb-paragraph text-center text-sb-muted mt-3 u-sb-soft-transition">
          {{ props.description }}
        </p>

        <!-- Technologies -->
        <div
          v-if="props.icons && props.icons.length > 0"
          class="flex items-center justify-center gap-2 mt-6 u-sb-soft-transition"
        >
          <template v-for="(icon, index) in props.icons" :key="index">
            <Icon
              class="size-6 md:size-7 text-sb-accent u-sb-soft-transition"
              :name="icon"
            />
            <span
              v-if="index < props.icons.length - 1"
              class="ty-sb-subtitle text-sb-muted"
            >
              +
            </span>
          </template>
        </div>
      </template>

      <!-- Card Footer: CTA -->
      <template #card-footer>
        <BaseButton
          aria-label="Use template"
          class="w-full cta-button transition-transform"
          :is-disabled="!props.codebaseUrl"
          :to="props.codebaseUrl"
          :type="props.codebaseUrl ? 'link' : 'button'"
          variant="primary"
        >
          <Icon
            class="size-5 md:size-6 mr-2"
            name="solar:rocket-2-bold-duotone"
          />
          {{ t('pages.projects.sbTemplatesProject.linkToCta') }}
        </BaseButton>
      </template>
    </BaseCard>
  </article>
</template>

<style scoped>
/* Enhanced glow on hover and focus - only when codebaseUrl exists */
article:has(a[href]):hover .logo-container,
article:has(a[href]):focus-within .logo-container {
  box-shadow:
    0 8px 40px var(--color-sb-shadow),
    0 0 40px rgba(233, 89, 5, 0.5),
    0 0 60px rgba(233, 89, 5, 0.3);
  transform: scale(1.05);
}

/* Scale effect on logo on hover and focus - only when codebaseUrl exists */
article:has(a[href]):hover img,
article:has(a[href]):hover .template-icon,
article:has(a[href]):focus-within img,
article:has(a[href]):focus-within .template-icon {
  transform: scale(1.08);
}

/* Scale effect on button on hover and focus - only when codebaseUrl exists */
article:has(a[href]):hover .cta-button,
article:has(a[href]):focus-within .cta-button {
  transform: scale(1.05);
}
</style>
