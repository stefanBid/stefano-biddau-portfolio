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
    class="flex flex-col items-center justify-center px-4 md:px-6 sb-transition"
    :class="{
      'py-20': props.dimension === 'normal',
      'py-10': props.dimension === 'small',
    }"
  >
    <Icon
      class="text-ink-muted opacity-50 sb-transition"
      :class="{
        'mb-6 size-16': props.dimension === 'normal',
        'mb-4 size-12': props.dimension === 'small',
      }"
      :name="props.icon"
    />
    <h3
      class="text-ink text-center sb-transition"
      :class="{
        'sb-h3 mb-2': props.dimension === 'normal',
        'sb-h4 mb-1.5': props.dimension === 'small',
      }"
    >
      {{ props.title }}
    </h3>
    <p
      class="text-ink-muted text-center max-w-md sb-transition"
      :class="{
        'sb-body': props.dimension === 'normal',
        'sb-label!': props.dimension === 'small',
      }"
    >
      {{ props.message }}
    </p>
  </div>
</template>
