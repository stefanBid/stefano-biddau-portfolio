<script setup lang="ts">
interface CustomMilestoneProps {
  id: number | string
  isActive: boolean
  title: string
  subtitle?: string | null
  description: string
  imageSrc?: string | null
  imageAlt?: string | null
}

// Input / Output

const props = withDefaults(
  defineProps<CustomMilestoneProps>(),
  {
    subtitle: null,
    imageSrc: null,
    imageAlt: null,
  },
)

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', id: number | string): void
}>()

// State
const MAX_DESCRIPTION_LENGTH = 100
const getDescriptionPreview = (desc: string): string => {
  if (desc.length <= MAX_DESCRIPTION_LENGTH) {
    return desc
  }
  return desc.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
}

// Events
const onSelect = () => {
  emits('select', props.id)
}
</script>

<template>
  <article
    v-for="item in 10"
    :key="item"
    class="relative"
  >
    <!-- Content -->
    <div class="pl-6 sm:pl-10">
      <h2 class="ty-sb-title u-sb-soft-transition">
        {{ props.title }}
      </h2>
      <p
        v-if="props.subtitle"
        class="ty-sb-subtitle text-sb-muted mt-1 u-sb-soft-transition"
      >
        {{ props.subtitle }}
      </p>
      <p
        v-if="props.description"
        class="ty-sb-paragraph text-justify mt-3 md:mt-4 u-sb-soft-transition"
      >
        {{ getDescriptionPreview(props.description) }}
      </p>
    </div>

    <!-- Timeline Point with Halo Effect -->
    <div
      class="absolute -left-[33px] sm:-left-[51px] top-3.5 sm:top-4.5 md:top-5.5 flex items-center justify-center pointer-events-none u-sb-soft-transition"
    >
      <!-- Static Halo (aureola fissa che rimane) -->
      <div
        class="absolute inset-0 rounded-full u-sb-soft-transition"
        :class="{
          'bg-sb-accent/40 scale-200': props.isActive,
          'bg-transparent scale-0': !props.isActive,
        }"
      ></div>
      <!-- Clickable Point -->
      <button
        :aria-label="`View milestone ${item}`"
        :aria-pressed="props.isActive"
        class="relative size-4 sm:size-5 bg-sb-accent rounded-full hover:bg-sb-accent-hover u-sb-focus cursor-pointer u-sb-soft-transition pointer-events-auto z-10"
        @click="onSelect"
      ></button>
    </div>
  </article>
</template>
