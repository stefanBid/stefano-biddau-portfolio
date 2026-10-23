<script setup lang="ts">
import useMilestones from '~/composables/data/useMilestones'

// Dependencies
const { t, locale } = useI18n()
const { milestones } = useMilestones()

// Data
const TYPE_ICONS: Record<MilestoneType, string> = {
  education: 'solar:square-academic-cap-bold-duotone',
  internship: 'solar:case-minimalistic-bold-duotone',
  fullTime: 'solar:case-minimalistic-bold-duotone',
}

// Shared with the client so hydration matches the prerendered text, then refreshed on mount for "Present" durations
const now = useState('experience-now', () => Date.now())

const monthFormat = computed(() => new Intl.DateTimeFormat(locale.value, { month: 'short', year: 'numeric', timeZone: 'UTC' }))

// Locale files store dates as MM/DD/YYYY
const _parseDate = (value?: string): Date | null => {
  const [month, day, year] = (value ?? '').split('/').map(Number)
  if (!month || !day || !year) {
    return null
  }
  return new Date(Date.UTC(year, month - 1, day))
}

// Counts both the first and the last month, as LinkedIn does
const _formatDuration = (start: Date, end: Date): string => {
  const totalMonths = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth() + 1
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  return [
    years > 0 && t('pages.home.experience.years', years),
    months > 0 && t('pages.home.experience.months', months),
  ].filter(Boolean).join(' ')
}

const items = computed(() => [...milestones.value]
  .reverse()
  .map((milestone) => {
    const start = _parseDate(milestone.date)
    const end = _parseDate(milestone.endDate)

    return {
      id: milestone.id,
      role: milestone.role ?? milestone.title,
      organization: milestone.organization,
      typeLabel: milestone.type ? t(`pages.home.experience.types.${milestone.type}`) : undefined,
      icon: TYPE_ICONS[milestone.type ?? 'fullTime'],
      startIso: start?.toISOString().slice(0, 7),
      startLabel: start ? monthFormat.value.format(start) : undefined,
      endIso: end?.toISOString().slice(0, 7),
      endLabel: end ? monthFormat.value.format(end) : t('pages.home.experience.present'),
      duration: start ? _formatDuration(start, end ?? new Date(now.value)) : undefined,
    }
  }))

// Events
onMounted(() => {
  now.value = Date.now()
})
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
