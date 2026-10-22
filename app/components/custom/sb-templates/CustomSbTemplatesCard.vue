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
        <div class="flex items-center justify-center p-4 bg-surface-2 w-full rounded-lg sb-transition">
          <div class="logo-container size-28 md:size-32 flex items-center justify-center rounded-xl bg-ink shadow-md ring-1 ring-ink/5 sb-transition transition-transform">
            <NuxtImg
              v-if="props.imageSrc"
              :alt="`${props.title} logo`"
              class="size-20 md:size-24 object-contain sb-transition transition-transform"
              :height="imageHeight"
              :src="props.imageSrc"
              :width="imageWidth"
            />
            <Icon
              v-else
              class="template-icon size-20 md:size-24 text-ink-muted sb-transition transition-transform"
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
          class="flex items-center justify-center gap-2 mt-6 sb-transition"
        >
          <template v-for="(icon, index) in props.icons" :key="index">
            <div class="flex items-center justify-center p-2 rounded-md bg-ink h-10 md:h-12">
              <Icon
                class="size-6 md:size-7 text-primary sb-transition"
                :name="icon"
              />
            </div>
            <span
              v-if="index < props.icons.length - 1"
              class="sb-body text-ink-muted"
            >
              +
            </span>
          </template>
        </div>

        <!-- Description -->
        <p class="sb-body text-center text-ink-muted mt-3 sb-transition">
          {{ props.description }}
        </p>
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
    0 8px 40px var(--sb-shadow-color),
    0 0 40px color-mix(in oklab, var(--color-primary) 50%, transparent),
    0 0 60px color-mix(in oklab, var(--color-primary) 30%, transparent);
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
