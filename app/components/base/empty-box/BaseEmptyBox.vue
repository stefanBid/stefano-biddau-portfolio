<script setup lang="ts">
interface BaseEmptyBoxProps {
  title: string
  message: string
  icon?: string
  dimension?: 'normal' | 'small'
}
// Input / Output
const props = withDefaults(
  defineProps<BaseEmptyBoxProps>(),
  {
    icon: 'solar:box-minimalistic-bold-duotone',
    dimension: 'normal',
  },
)
</script>

<template>
  <div
    class="flex flex-col items-center justify-center px-4 md:px-6 u-sb-soft-transition"
    :class="{
      'py-20': props.dimension === 'normal',
      'py-10': props.dimension === 'small',
    }"
  >
    <Icon
      class="text-sb-muted opacity-50 u-sb-soft-transition"
      :class="{
        'mb-6 size-16': props.dimension === 'normal',
        'mb-4 size-12': props.dimension === 'small',
      }"
      :name="props.icon"
    />
    <h3
      class="text-sb-contrast text-center u-sb-soft-transition"
      :class="{
        'ty-sb-title mb-2': props.dimension === 'normal',
        'ty-sb-subtitle mb-1.5': props.dimension === 'small',
      }"
    >
      {{ props.title }}
    </h3>
    <p
      class="text-sb-muted text-center max-w-md u-sb-soft-transition"
      :class="{
        'ty-sb-paragraph': props.dimension === 'normal',
        'ty-sb-paragraph text-sm!': props.dimension === 'small',
      }"
    >
      {{ props.message }}
    </p>
  </div>
</template>
