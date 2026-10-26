<script setup lang="ts">
import { SbContainer, SbFloating, SbReference } from 'sb-floating-panel-vue'
import { BaseIconButton } from '#components'

interface BaseIconMenuProps {
  icon: string
  label: string
  items: Array<MenuItem>
  selectedItemId?: string | null
}

// Input / Output
const props = withDefaults(defineProps<BaseIconMenuProps>(), {
  selectedItemId: null,
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', itemId: string): void
}>()

// Events
// closeOnSelect skips menuitemradio, so the menu closes itself after a pick
const onSelect = (itemId: string, close: () => void) => {
  emit('select', itemId)
  close()
}
</script>

<template>
  <SbContainer placement="bottom-end" strategy="fixed">
    <template #default="{ isOpen, close }">
      <SbReference
        :aria-label="props.label"
        :as="BaseIconButton"
        :icon="props.icon"
        :is-active="isOpen"
        :text="props.selectedItemId ?? undefined"
      />

      <SbFloating
        :aria-label="props.label"
        as="ul"
        class="p-2 space-y-2 mb-0 rounded-lg border border-border/60 bg-surface w-fit shadow-md outline-none"
        role="menu"
        transition="scale-fade"
        :z-index="300"
      >
        <li v-for="item in props.items" :key="item.code" role="none">
          <!-- autofocus: a click opens the menu on the checked item -->
          <button
            :aria-checked="item.code === props.selectedItemId ? 'true' : 'false'"
            :autofocus="item.code === props.selectedItemId"
            class="inline-flex w-full items-center gap-2 min-h-11 px-3 rounded-md text-left sb-label cursor-pointer sb-transition sb-focus"
            :class="item.code === props.selectedItemId ? 'bg-surface-2 text-ink' : 'text-ink-muted hover:bg-surface-2 hover:text-ink'"
            role="menuitemradio"
            type="button"
            @click="onSelect(item.code, close)"
          >
            <span class="truncate flex-1">{{ item.label }}</span>
            <Icon
              v-if="item.code === props.selectedItemId"
              aria-hidden="true"
              class="size-4 shrink-0 text-primary-ink"
              name="solar:check-circle-bold-duotone"
            />
            <template v-if="item.icon && item.iconType ">
              <Icon
                v-if="item.iconType === 'nuxt-icon'"
                aria-hidden="true"
                class="size-4 shrink-0"
                :name="item.icon"
              />
              <NuxtImg
                v-else-if="item.iconType === 'custom'"
                alt=""
                class="size-4 shrink-0"
                :src="item.icon"
              />
            </template>
          </button>
        </li>
      </SbFloating>
    </template>
  </SbContainer>
</template>
