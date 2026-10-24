<script setup lang="ts">
interface BaseIconButtonProps {
  icon: string
  ariaLabel?: string
  isActive?: boolean
  text?: string
}

// Input / Output
const props = withDefaults(defineProps<BaseIconButtonProps>(), {
  ariaLabel: undefined,
  isActive: false,
  text: undefined,
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'click'): void
}>()

// Events
const onClick = () => {
  emit('click')
}
</script>

<template>
  <BaseButton
    :aria-label="props.text ? `${props.text} – ${props.ariaLabel}` : props.ariaLabel"
    class="border border-border"
    :icon-only="!props.text"
    :is-active="props.isActive"
    size="sm"
    variant="ghost"
    @click="onClick"
  >
    <Icon
      aria-hidden="true"
      class="size-5"
      :name="props.icon"
    />
    <span
      v-if="props.text"
      aria-hidden="true"
      class="uppercase"
    >{{ props.text }}</span>
  </BaseButton>
</template>
