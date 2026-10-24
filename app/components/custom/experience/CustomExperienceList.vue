<script setup lang="ts">
import useMilestones from '~/composables/data/useMilestones'

// Dependencies
const { milestones } = useMilestones()

// Data
const TYPE_ICONS: Record<Exclude<MilestoneType, 'upcoming'>, string> = {
  education: 'solar:square-academic-cap-bold-duotone',
  internship: 'solar:case-minimalistic-bold-duotone',
  fullTime: 'solar:case-minimalistic-bold-duotone',
}

// Announced next steps stay on the About page: the home list shows only what already happened
const items = computed(() => [...milestones.value]
  .filter(milestone => milestone.type !== 'upcoming')
  .reverse()
  .map(milestone => ({
    id: milestone.id,
    role: milestone.role ?? milestone.title,
    organization: milestone.organization,
    typeLabel: milestone.typeLabel,
    icon: TYPE_ICONS[milestone.type === 'upcoming' || !milestone.type ? 'fullTime' : milestone.type],
    ...milestone.period,
  })))
</script>

<template>
  <ol class="m-0 p-0 list-none">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      class="relative flex gap-4 md:gap-5"
      :class="index < items.length - 1 && 'pb-8'"
    >
      <span
        v-if="index < items.length - 1"
        aria-hidden="true"
        class="absolute left-6 top-14 bottom-2 w-px bg-border"
      ></span>
      <span class="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
        <Icon
          aria-hidden="true"
          class="size-6 text-primary-ink"
          :name="item.icon"
        />
      </span>
      <div class="min-w-0 pt-0.5">
        <h3 class="sb-h4 mb-1 text-left text-balance">
          {{ item.role }}
        </h3>
        <p v-if="item.organization || item.typeLabel" class="sb-body text-ink text-left mb-0">
          {{ [item.organization, item.typeLabel].filter(Boolean).join(' · ') }}
        </p>
        <p v-if="item.startLabel" class="sb-small text-ink-muted text-left mb-0 mt-1">
          <time :datetime="item.startIso">{{ item.startLabel }}</time>
          –
          <time v-if="item.endIso" :datetime="item.endIso">{{ item.endLabel }}</time>
          <template v-else>
            {{ item.endLabel }}
          </template>
          <template v-if="item.duration">
            · {{ item.duration }}
          </template>
        </p>
      </div>
    </li>
  </ol>
</template>
