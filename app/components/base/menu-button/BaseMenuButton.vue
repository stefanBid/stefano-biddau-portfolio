<script setup lang="ts">
import { SbContainer, SbFloating, SbReference } from 'sb-floating-panel-vue'
import { BaseButton } from '#components'

interface BaseMenuButtonProps {
  label: string
  items: Array<MenuItem>
  icon?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<BaseMenuButtonProps>(), {
  icon: undefined,
  variant: 'secondary',
  size: 'md',
})

// Data
const _isExternal = (href: string) => /^https?:\/\//.test(href)
</script>

<template>
  <SbContainer match-width="min">
    <template #default="{ isOpen }">
      <SbReference
        :as="BaseButton"
        :size="props.size"
        :variant="props.variant"
      >
        <Icon
          v-if="props.icon"
          aria-hidden="true"
          :class="props.size === 'sm' ? 'size-4' : 'size-5'"
          :name="props.icon"
        />
        {{ props.label }}
        <Icon
          aria-hidden="true"
          class="size-4 sb-transition"
          :class="{ 'rotate-180': isOpen }"
          name="solar:alt-arrow-down-linear"
        />
      </SbReference>

      <SbFloating
        :aria-label="props.label"
        as="ul"
        class="p-2 space-y-2 mb-0 rounded-lg border border-border/60 bg-surface shadow-md outline-none"
        close-on-select
        role="menu"
        transition="scale-fade"
        :z-index="300"
      >
        <li v-for="item in props.items" :key="item.code" role="none">
          <a
            class="flex w-full items-center gap-2 min-h-11 px-3 rounded-md sb-label text-ink-muted whitespace-nowrap hover:bg-surface-2 hover:text-ink sb-transition sb-focus"
            :href="item.code"
            :rel="_isExternal(item.code) ? 'noopener noreferrer' : undefined"
            role="menuitem"
            :target="_isExternal(item.code) ? '_blank' : undefined"
          >
            <template v-if="item.icon && item.iconType">
              <Icon
                v-if="item.iconType === 'nuxt-icon'"
                aria-hidden="true"
                class="size-5 shrink-0"
                :name="item.icon"
              />
              <NuxtImg
                v-else-if="item.iconType === 'custom'"
                alt=""
                class="size-5 shrink-0"
                :src="item.icon"
              />
            </template>
            <span class="flex-1">{{ item.label }}</span>
            <template v-if="_isExternal(item.code)">
              <Icon
                aria-hidden="true"
                class="size-4 shrink-0"
                name="solar:arrow-right-up-linear"
              />
              <span class="sr-only">({{ t('a11y.newTab') }})</span>
            </template>
          </a>
        </li>
      </SbFloating>
    </template>
  </SbContainer>
</template>
