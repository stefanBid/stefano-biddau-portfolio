<script setup lang="ts">
interface CustomSbTemplatesCardProps {
  id: number | string
  title: string
  shortDescription: string
  imageSrc?: string
  icons?: string[]
  deploymentUrl?: string
}

// Input / Output
const props = withDefaults(
  defineProps<CustomSbTemplatesCardProps>(),
  {
    imageSrc: undefined,
    icons: undefined,
    deploymentUrl: undefined,
  },
)

// Dependencies
const { t } = useI18n()
</script>

<template>
  <article :data-template-id="props.id">
    <BaseCard
      class="h-full flex flex-col"
      full-custom-content
      :variant="props.deploymentUrl ? 'dark-hover' : 'dark'"
    >
      <!-- Header: Logo -->
      <div class="flex items-center justify-center p-8 md:p-10 bg-sb-surface-2 rounded-xl u-sb-soft-transition">
        <div class="logo-container w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-2xl bg-sb-contrast shadow-[0_8px_30px_var(--color-sb-shadow)] ring-1 ring-white/5 u-sb-soft-transition">
          <NuxtImg
            v-if="props.imageSrc"
            :alt="`${props.title} logo`"
            class="w-20 h-20 md:w-24 md:h-24 object-contain u-sb-soft-transition"
            :src="props.imageSrc"
          />
          <Icon
            v-else
            class="size-20 md:size-24 text-sb-muted u-sb-soft-transition"
            name="solar:box-bold"
          />
        </div>
      </div>

      <!-- Body: Title, Description, Technologies -->
      <div class="flex-1 flex flex-col px-4 py-5 md:px-6 md:py-6 u-sb-soft-transition">
        <!-- Title -->
        <h3 class="ty-sb-title text-center text-sb-contrast u-sb-soft-transition">
          {{ props.title }}
        </h3>

        <!-- Description -->
        <p class="ty-sb-paragraph text-center text-sb-muted mt-3 u-sb-soft-transition">
          {{ props.shortDescription }}
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

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- CTA -->
        <div class="mt-6 flex justify-center">
          <BaseButton
            aria-label="Use template"
            :is-disabled="!props.deploymentUrl"
            :to="props.deploymentUrl"
            :type="props.deploymentUrl ? 'link' : 'button'"
            variant="primary"
          >
            <Icon
              class="size-5 md:size-6 mr-2"
              name="solar:rocket-2-bold-duotone"
            />
            {{ t('pages.projects.sbTemplatesProject.linkToCta') }}
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  </article>
</template>

<style scoped>
/* Enhanced glow on hover - only when deploymentUrl exists */
article:has(a[href]):hover .logo-container {
  box-shadow:
    0 8px 40px var(--color-sb-shadow),
    0 0 25px rgba(233, 89, 5, 0.25);
}

/* Scale effect on logo on hover - only when deploymentUrl exists */
article:has(a[href]):hover img,
article:has(a[href]):hover .size-20 {
  transform: scale(1.08);
}
</style>
