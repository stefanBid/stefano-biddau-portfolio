<script setup lang="ts">
interface BaseCardProps {
  title: string
  subtitle?: string
  paragraph?: string
  variant?: 'dark' | 'dark-hover' | 'light' | 'light-hover'
  align?: 'left' | 'center' | 'right'
  fullCustomContent?: boolean
}

const props = withDefaults(defineProps<BaseCardProps>(), {
  variant: 'light',
  align: 'left',
  fullCustomContent: false,
})
</script>

<template>
  <div
    class="flex flex-col p-4 md:p-6 rounded-xl border border-sb-border shadow-[0_4px_20px_var(--color-sb-shadow)] u-sb-soft-transition"
    :class="{
      'bg-sb-surface': props.variant === 'dark',
      'bg-sb-surface hover:bg-sb-surface-2': props.variant === 'dark-hover',
      'bg-sb-surface-2': props.variant === 'light',
      'bg-sb-surface-2 hover:bg-sb-surface': props.variant === 'light-hover',
    }"
  >
    <template v-if="props.fullCustomContent">
      <slot></slot>
    </template>
    <template v-else>
      <div
        v-if="$slots['card-header']"
        class="flex items-start mb-3 md:mb-4 u-sb-soft-transition"
        :class="{
          'justify-center md:justify-start': props.align === 'left',
          'justify-center': props.align === 'center',
          'justify-center md:justify-end': props.align === 'right',
        }"
      >
        <slot name="card-header"></slot>
      </div>
      <h2
        class="ty-sb-title u-sb-soft-transition"
        :class="{
          'text-center md:text-left': props.align === 'left',
          'text-center': props.align === 'center',
          'text-center md:text-right': props.align === 'right',
        }"
      >
        {{ props.title }}
      </h2>
      <p
        v-if="props.subtitle"
        class="ty-sb-subtitle text-sb-muted mt-1 u-sb-soft-transition"
        :class="{
          'text-center md:text-left': props.align === 'left',
          'text-center': props.align === 'center',
          'text-center md:text-right': props.align === 'right',
        }"
      >
        {{ props.subtitle }}
      </p>
      <p
        v-if="props.paragraph"
        class="ty-sb-paragraph text-justify mt-3 md:mt-4 u-sb-soft-transition"
      >
        {{ props.paragraph }}
      </p>
      <div
        v-if="$slots['card-footer']"
        class="flex flex-1 items-end mt-6 md:mt-8"
        :class="{
          'justify-center md:justify-start': props.align === 'left',
          'justify-center': props.align === 'center',
          'justify-center md:justify-end': props.align === 'right',
        }"
      >
        <slot name="card-footer"></slot>
      </div>
    </template>
  </div>
</template>
