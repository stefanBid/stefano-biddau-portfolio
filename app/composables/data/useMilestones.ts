import { resolveSkills } from '~/composables/data/useSkills'
import type { Skill } from '~/composables/data/useSkills'

export type MilestoneType = 'education' | 'internship' | 'fullTime' | 'upcoming'

export interface MilestonePeriod {
  startIso?: string
  startLabel?: string
  endIso?: string
  endLabel: string
  duration?: string
}

export interface MilestoneStackItem {
  name: string
  icon?: string
}

export interface Milestone {
  id: string
  title: string
  content: RichBlock[]
  subtitle?: string
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
  imageCaption?: string
  date?: string
  endDate?: string
  role?: string
  organization?: string
  type?: MilestoneType
  typeLabel?: string
  stack: MilestoneStackItem[]
  skills: Skill[]
  clients: string[]
  period: MilestonePeriod
}

// Stack keywords as authored in the locale files; keywords without a logo render as plain chips
const STACK_ICONS: Record<string, string> = {
  'Angular': 'logos:angular-icon',
  'API REST': 'mdi:api',
  'CSS': 'logos:css-3',
  'Flutter': 'logos:flutter-icon',
  'HTML': 'logos:html-5',
  'Java': 'logos:java',
  'Java EE': 'logos:java',
  'JavaScript': 'logos:javascript',
  'PostgreSQL': 'logos:postgresql',
  'Python': 'logos:python',
  'REST API': 'mdi:api',
  'Spring Batch': 'logos:spring-icon',
  'Spring Boot': 'logos:spring-icon',
  'Vue.js': 'logos:vue',
}

export default function useMilestones() {
  const { t: _t, tm: _tm, rt: _rt, locale } = useI18n()

  // Shared with the client so hydration matches the prerendered text, then refreshed on mount for "Present" durations
  const now = useState('milestones-now', () => Date.now())

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
      years > 0 && _t('pages.home.experience.years', years),
      months > 0 && _t('pages.home.experience.months', months),
    ].filter(Boolean).join(' ')
  }

  const _buildPeriod = (date?: string, endDate?: string): MilestonePeriod => {
    const start = _parseDate(date)
    const end = _parseDate(endDate)
    const today = new Date(now.value)
    // A planned end date still counts only up to today; a future start has no duration yet
    const durationEnd = end && end < today ? end : today

    return {
      startIso: start?.toISOString().slice(0, 7),
      startLabel: start ? monthFormat.value.format(start) : undefined,
      endIso: end?.toISOString().slice(0, 7),
      endLabel: end ? monthFormat.value.format(end) : _t('pages.home.experience.present'),
      duration: start && start <= today ? _formatDuration(start, durationEnd) : undefined,
    }
  }

  // State
  const milestones = computed<Milestone[]>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawMilestones = _tm('pages.about.milestones') as any

    if (!Array.isArray(rawMilestones) || rawMilestones.length === 0) {
      return []
    }

    // Convert i18n reactive objects to plain JavaScript objects (POJO)
    return rawMilestones.map((item) => {
      const date = item.date ? _rt(item.date) : undefined
      const endDate = item.endDate ? _rt(item.endDate) : undefined
      const type = item.type ? _rt(item.type) as MilestoneType : undefined

      return {
        id: _rt(item.id || ''),
        title: _rt(item.title || ''),
        content: markdownToRichBlocks(_rt(item.content || '')),
        subtitle: item.subtitle ? _rt(item.subtitle) : undefined,
        imageSrc: item.imageSrc ? _rt(item.imageSrc) : undefined,
        imageWidth: item.imageWidth,
        imageHeight: item.imageHeight,
        imageCaption: item.imageCaption ? _rt(item.imageCaption) : undefined,
        date,
        endDate,
        role: item.role ? _rt(item.role) : undefined,
        organization: item.organization ? _rt(item.organization) : undefined,
        type,
        typeLabel: type ? _t(`pages.home.experience.types.${type}`) : undefined,
        stack: Array.isArray(item.stack)
          ? item.stack.map((entry: Parameters<typeof _rt>[0]) => {
              const name = _rt(entry)
              return { name, icon: STACK_ICONS[name] }
            })
          : [],
        skills: Array.isArray(item.skills) ? resolveSkills(item.skills.map((id: Parameters<typeof _rt>[0]) => _rt(id))) : [],
        clients: Array.isArray(item.clients) ? item.clients.map(_rt) : [],
        period: _buildPeriod(date, endDate),
      } as Milestone
    })
  })

  // Events
  onMounted(() => {
    now.value = Date.now()
  })

  return {
    milestones,
  }
}
