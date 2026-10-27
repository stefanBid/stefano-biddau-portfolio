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
  color?: string
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

// Stack keywords as authored in the locale files; keywords without a brand render as neutral chips
const STACK_BRANDS: Record<string, Omit<MilestoneStackItem, 'name'>> = {
  'Adobe XD': { icon: 'logos:adobe-xd', color: 'var(--sb-tech-adobe-xd)' },
  'Angular': { icon: 'logos:angular-icon', color: 'var(--sb-tech-angular)' },
  'API REST': { icon: 'mdi:api' },
  'CSS': { icon: 'logos:css-3', color: 'var(--sb-tech-css)' },
  'Figma': { icon: 'logos:figma', color: 'var(--sb-tech-figma)' },
  'Flutter': { icon: 'logos:flutter-icon', color: 'var(--sb-tech-flutter)' },
  'Git': { icon: 'logos:git-icon', color: 'var(--sb-tech-git)' },
  'GraphQL': { icon: 'logos:graphql', color: 'var(--sb-tech-graphql)' },
  'Headless UI': { icon: 'logos:headlessui-icon', color: 'var(--sb-tech-headless-ui)' },
  'HTML': { icon: 'logos:html-5', color: 'var(--sb-tech-html)' },
  'Java': { icon: 'logos:java', color: 'var(--sb-tech-java)' },
  'Java EE': { icon: 'logos:java', color: 'var(--sb-tech-java)' },
  'JavaScript': { icon: 'logos:javascript', color: 'var(--sb-tech-javascript)' },
  'MySQL': { icon: 'logos:mysql-icon', color: 'var(--sb-tech-mysql)' },
  'PostgreSQL': { icon: 'logos:postgresql', color: 'var(--sb-tech-postgresql)' },
  'Python': { icon: 'logos:python', color: 'var(--sb-tech-python)' },
  'REST API': { icon: 'mdi:api' },
  'Slack': { icon: 'logos:slack-icon', color: 'var(--sb-tech-slack)' },
  'Spring Batch': { icon: 'logos:spring-icon', color: 'var(--sb-tech-spring)' },
  'Spring Boot': { icon: 'logos:spring-icon', color: 'var(--sb-tech-spring)' },
  'Storybook': { icon: 'logos:storybook-icon', color: 'var(--sb-tech-storybook)' },
  'Strapi': { icon: 'logos:strapi-icon', color: 'var(--sb-tech-strapi)' },
  'Turborepo': { icon: 'logos:turborepo-icon', color: 'var(--sb-tech-turborepo)' },
  'Vue.js': { icon: 'logos:vue', color: 'var(--sb-tech-vue)' },
}

export default function useMilestones() {
  const { t: _t, tm: _tm, rt: _rt, locale } = useI18n()
  const { resolveImageSrc } = useCloudinary()

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
        imageSrc: item.imageSrc ? resolveImageSrc(_rt(item.imageSrc)) : undefined,
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
              return { name, ...STACK_BRANDS[name] }
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
