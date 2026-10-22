<script setup lang="ts">
interface TheHeaderMenuToggleProps {
  open: boolean
}
// Dependencies
const { t } = useI18n()

// Input / Output
const props = defineProps<TheHeaderMenuToggleProps>()
const emit = defineEmits<{

  // eslint-disable-next-line no-unused-vars
  (e: 'toggle', newOpenValue: boolean): void
}>()

const onToggle = () => emit('toggle', !props.open)
</script>

<template>
  <BaseButton
    aria-controls="mobile-drawer"
    :aria-expanded="open ? 'true' : 'false'"
    :aria-label="open ? t('a11y.closeMenu') : t('a11y.openMenu')"
    class="-mr-2"
    icon-only
    variant="ghost"
    @click="onToggle()"
  >
    <svg
      aria-hidden="true"
      class="size-7"
      :class="open ? 'is-x' : 'is-burger'"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
    >

      <line
        class="top"
        x1="4"
        x2="20"
        y1="12"
        y2="12"
      />
      <line
        class="middle"
        x1="4"
        x2="20"
        y1="12"
        y2="12"
      />
      <line
        class="bottom"
        x1="4"
        x2="20"
        y1="12"
        y2="12"
      />
    </svg>
  </BaseButton>
</template>

<style scoped>
svg { transition: transform var(--sb-duration-state) var(--ease-in-out); }
line {
  transition: transform var(--sb-duration-state) var(--ease-in-out), opacity var(--sb-duration-state) var(--ease-in-out);
  transform-origin: 12px 12px;
}

svg.is-burger .top    { transform: translateY(-5px); }
svg.is-burger .middle { opacity: 1; }
svg.is-burger .bottom { transform: translateY( 5px); }

svg.is-x .top    { transform: rotate(45deg); }
svg.is-x .middle { opacity: 0; }
svg.is-x .bottom { transform: rotate(-45deg); }
</style>
