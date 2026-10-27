<script setup lang="ts">
import { SbContainer, SbFloating, SbReference } from 'sb-floating-panel-vue'
import type { SbPlacement } from 'sb-floating-panel-vue'
import { BaseButton } from '#components'

interface BaseMenuProps {
  label: string
  items: Array<MenuItem>
  kind?: 'links' | 'select'
  icon?: string
  iconOnly?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  placement?: SbPlacement
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<BaseMenuProps>(), {
  kind: 'links',
  icon: undefined,
  iconOnly: false,
  variant: 'secondary',
  size: 'md',
  placement: 'bottom-start',
})

const selected = defineModel<string | null>('selected', { default: null })

// Data
// A select shows its value on the trigger, like a native <select>
const triggerText = computed(() => props.kind === 'select' && selected.value ? selected.value : props.label)

const triggerAriaLabel = computed(() => {
  if (triggerText.value !== props.label) {
    return `${triggerText.value} – ${props.label}`
  }
  return props.iconOnly ? props.label : undefined
})

const _isExternal = (href: string) => /^https?:\/\//.test(href)

const _isSelected = (item: MenuItem) => props.kind === 'select' && item.code === selected.value

// Events
// closeOnSelect skips menuitemradio, so the menu closes itself after a pick
const onItemClick = (itemId: string, close: () => void) => {
  if (props.kind !== 'select') {
    return
  }
  selected.value = itemId
  close()
}
</script>

<template>
  <SbContainer
    match-width="min"
    :placement="props.placement"
    strategy="fixed"
  >
    <template #default="{ isOpen, close }">
      <SbReference
        :aria-label="triggerAriaLabel"
        :as="BaseButton"
        :icon-only="props.iconOnly"
        :is-active="isOpen"
        :size="props.size"
        :variant="props.variant"
      >
        <Icon
          v-if="props.icon"
          aria-hidden="true"
          :class="props.size === 'sm' && !props.iconOnly ? 'size-4' : 'size-5'"
          :name="props.icon"
        />
        <template v-if="!props.iconOnly">
          <span :aria-hidden="triggerAriaLabel ? 'true' : undefined">{{ triggerText }}</span>
          <span aria-hidden="true" class="inline-flex ml-auto pl-2">
            <Icon
              class="size-4 sb-transition"
              :class="{ 'rotate-180': isOpen }"
              name="solar:alt-arrow-down-linear"
            />
          </span>
        </template>
      </SbReference>

      <SbFloating
        :aria-label="props.label"
        as="ul"
        class="p-1.5 space-y-1 mb-0 rounded-lg border border-border-strong bg-surface-2 w-fit shadow-md outline-none"
        close-on-select
        role="menu"
        transition="scale-fade"
        :z-index="300"
      >
        <li v-for="item in props.items" :key="item.code" role="none">
          <component
            :is="props.kind === 'select' ? 'button' : 'a'"
            :aria-checked="props.kind === 'select' ? (_isSelected(item) ? 'true' : 'false') : undefined"
            :autofocus="_isSelected(item)"
            class="group flex w-full items-center gap-3 min-h-11 py-1.5 pl-1.5 pr-3 rounded-md text-left text-ink cursor-pointer sb-transition sb-focus"
            :class="_isSelected(item) ? 'bg-primary/12' : 'hover:bg-primary/8 focus-visible:bg-primary/8'"
            :download="props.kind === 'links' ? item.download : undefined"
            :href="props.kind === 'links' ? item.code : undefined"
            :rel="props.kind === 'links' && _isExternal(item.code) ? 'noopener noreferrer' : undefined"
            :role="props.kind === 'select' ? 'menuitemradio' : 'menuitem'"
            :target="props.kind === 'links' && _isExternal(item.code) ? '_blank' : undefined"
            :type="props.kind === 'select' ? 'button' : undefined"
            @click="onItemClick(item.code, close)"
          >
            <span
              v-if="item.icon && item.iconType"
              aria-hidden="true"
              class="flex size-9 shrink-0 items-center justify-center rounded-md border sb-transition"
              :class="_isSelected(item) ? 'border-primary-border bg-primary/15 text-primary-ink' : 'border-border bg-bg text-ink-muted group-hover:border-primary-border group-hover:text-primary-ink group-focus-visible:border-primary-border group-focus-visible:text-primary-ink'"
            >
              <Icon
                v-if="item.iconType === 'nuxt-icon'"
                class="size-5"
                :name="item.icon"
              />
              <NuxtImg
                v-else-if="item.iconType === 'custom'"
                alt=""
                class="size-5"
                :src="item.icon"
              />
            </span>
            <span class="flex flex-1 flex-col whitespace-nowrap">
              <span class="sb-label" :class="{ 'font-bold': _isSelected(item) }">{{ item.label }}</span>
              <span v-if="item.description" class="sb-small text-ink-muted">{{ item.description }}</span>
            </span>
            <span
              v-if="_isSelected(item)"
              aria-hidden="true"
              class="inline-flex shrink-0 ml-auto pl-2"
            >
              <Icon class="size-5 text-primary-ink" name="solar:check-circle-bold-duotone" />
            </span>
            <span
              v-else-if="props.kind === 'links' && item.download"
              aria-hidden="true"
              class="inline-flex shrink-0 ml-auto pl-2 text-ink-muted group-hover:text-primary-ink sb-transition"
            >
              <Icon class="size-5" name="solar:download-minimalistic-linear" />
            </span>
            <template v-else-if="props.kind === 'links' && _isExternal(item.code)">
              <span aria-hidden="true" class="inline-flex shrink-0 ml-auto pl-2 text-ink-muted group-hover:text-primary-ink sb-transition">
                <Icon class="size-5" name="solar:arrow-right-up-linear" />
              </span>
              <span class="sr-only">({{ t('a11y.newTab') }})</span>
            </template>
          </component>
        </li>
      </SbFloating>
    </template>
  </SbContainer>
</template>
