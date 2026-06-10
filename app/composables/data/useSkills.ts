// composables/data/useSkills.ts

interface Skill {
  id: string
  name: string
  level: number
  category?: SkillType
  icon?: string
  isGod?: boolean
}

const DEFAULT_PAGE_SIZE = 12
const DEFAULT_STARTING_PAGE = 1

// Local skills data (detached from BE)
const SKILLS_DATA: Skill[] = [
  {
    id: '34',
    name: 'Adobe XD',
    level: 3.5,
    icon: 'logos:adobe-xd',
    category: 'tool',
    isGod: false,
  },
  {
    id: '1',
    name: 'Angular',
    level: 5,
    icon: 'logos:angular-icon',
    category: 'feFramework',
    isGod: true,
  },
  {
    id: '53',
    name: 'Bootstrap',
    level: 4,
    icon: 'logos:bootstrap',
    category: 'other',
    isGod: false,
  },
  {
    id: '4',
    name: 'C#',
    level: 1.5,
    icon: 'logos:c-sharp',
    category: 'beLang',
    isGod: false,
  },
  {
    id: '16',
    name: 'CSS',
    level: 5,
    icon: 'logos:css-3',
    category: 'feLang',
    isGod: true,
  },
  {
    id: '51',
    name: 'Chromatic',
    level: 4,
    icon: 'logos:chromatic-icon',
    category: 'tool',
    isGod: false,
  },
  {
    id: '20',
    name: 'Dart',
    level: 4,
    icon: 'logos:dart',
    category: 'feLang',
    isGod: false,
  },
  {
    id: '30',
    name: 'Docker',
    level: 3,
    icon: 'logos:docker-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '32',
    name: 'Figma',
    level: 4,
    icon: 'logos:figma',
    category: 'tool',
    isGod: false,
  },
  {
    id: '10',
    name: 'Flutter',
    level: 4,
    icon: 'logos:flutter',
    category: 'feFramework',
    isGod: false,
  },
  {
    id: '28',
    name: 'Git',
    level: 4,
    icon: 'logos:git-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '43',
    name: 'GraphQL',
    level: 4,
    icon: 'logos:graphql',
    category: 'database',
    isGod: false,
  },
  {
    id: '18',
    name: 'HTML',
    level: 5,
    icon: 'logos:html-5',
    category: 'feLang',
    isGod: true,
  },
  {
    id: '70',
    name: 'Headless UI',
    level: 5,
    icon: 'logos:headlessui-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '68',
    name: 'Hibernate',
    level: 3.5,
    icon: 'logos:hibernate',
    category: 'beFramework',
    isGod: false,
  },
  {
    id: '37',
    name: 'Java',
    level: 3.5,
    icon: 'logos:java',
    category: 'beLang',
    isGod: false,
  },
  {
    id: '14',
    name: 'JavaScript',
    level: 4.5,
    icon: 'logos:javascript',
    category: 'feLang',
    isGod: false,
  },
  {
    id: '45',
    name: 'MySQL',
    level: 3.5,
    icon: 'logos:mysql-icon',
    category: 'database',
    isGod: false,
  },
  {
    id: '63',
    name: 'Netlify',
    level: 4,
    icon: 'logos:netlify-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '61',
    name: 'Node.js',
    level: 4,
    icon: 'logos:nodejs-icon',
    category: 'beLang',
    isGod: false,
  },
  {
    id: '8',
    name: 'Nuxt',
    level: 4.5,
    icon: 'logos:nuxt-icon',
    category: 'feFramework',
    isGod: false,
  },
  {
    id: '41',
    name: 'Python',
    level: 3.5,
    icon: 'logos:python',
    category: 'beLang',
    isGod: false,
  },
  {
    id: '22',
    name: 'React',
    level: 3.5,
    icon: 'logos:react',
    category: 'feFramework',
    isGod: false,
  },
  {
    id: '47',
    name: 'Slack',
    level: 4,
    icon: 'logos:slack-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '39',
    name: 'Spring',
    level: 3.5,
    icon: 'logos:spring-icon',
    category: 'beFramework',
    isGod: false,
  },
  {
    id: '49',
    name: 'Storybook',
    level: 4,
    icon: 'logos:storybook-icon',
    category: 'tool',
    isGod: false,
  },
  {
    id: '55',
    name: 'Strapi',
    level: 4,
    icon: 'logos:strapi-icon',
    category: 'beFramework',
    isGod: false,
  },
  {
    id: '24',
    name: 'Tailwind CSS',
    level: 5,
    icon: 'logos:tailwindcss-icon',
    category: 'other',
    isGod: true,
  },
  {
    id: '26',
    name: 'Turborepo',
    level: 3,
    icon: 'logos:turborepo-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '12',
    name: 'TypeScript',
    level: 5,
    icon: 'logos:typescript-icon',
    category: 'feLang',
    isGod: true,
  },
  {
    id: '66',
    name: 'Vite',
    level: 5,
    icon: 'logos:vitejs',
    category: 'feFramework',
    isGod: true,
  },
  {
    id: '6',
    name: 'Vue',
    level: 5,
    icon: 'logos:vue',
    category: 'feFramework',
    isGod: true,
  },
  {
    id: '57',
    name: 'npm',
    level: 5,
    icon: 'logos:npm-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '59',
    name: 'pnpm',
    level: 4.5,
    icon: 'logos:pnpm',
    category: 'other',
    isGod: false,
  },
]

export default function useSkills() {
  // Filters (managed externally)
  const filters = ref({
    name: '',
    types: [] as SkillType[],
    page: DEFAULT_STARTING_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  // Reactive filtered and paginated skills
  const skills = computed<Skill[]>(() => {
    let filtered = [...SKILLS_DATA]

    // Filter by name (case-insensitive substring match)
    if (filters.value.name) {
      const searchLower = filters.value.name.toLowerCase()
      filtered = filtered.filter(skill => skill.name.toLowerCase().includes(searchLower))
    }

    // Filter by types (category match)
    if (filters.value.types.length > 0) {
      filtered = filtered.filter(skill => skill.category && filters.value.types.includes(skill.category))
    }

    // Sort by level (descending), then by isGod (true first), then by name (ascending)
    filtered.sort((a, b) => {
      // 1. Level descending
      if (b.level !== a.level) {
        return b.level - a.level
      }
      // 2. isGod true first
      if (a.isGod !== b.isGod) {
        return a.isGod ? -1 : 1
      }
      // 3. Name ascending (alphabetical)
      return a.name.localeCompare(b.name)
    })

    // Pagination
    const startIndex = (filters.value.page - 1) * filters.value.pageSize
    const endIndex = startIndex + filters.value.pageSize

    return filtered.slice(startIndex, endIndex)
  })

  // Reactive pagination info
  const pagination = computed<Pagination>(() => {
    let filtered = [...SKILLS_DATA]

    // Apply same filters to calculate total
    if (filters.value.name) {
      const searchLower = filters.value.name.toLowerCase()
      filtered = filtered.filter(skill => skill.name.toLowerCase().includes(searchLower))
    }

    if (filters.value.types.length > 0) {
      filtered = filtered.filter(skill => skill.category && filters.value.types.includes(skill.category))
    }

    // Sort by level (descending), then by isGod (true first), then by name (ascending)
    filtered.sort((a, b) => {
      // 1. Level descending
      if (b.level !== a.level) {
        return b.level - a.level
      }
      // 2. isGod true first
      if (a.isGod !== b.isGod) {
        return a.isGod ? -1 : 1
      }
      // 3. Name ascending (alphabetical)
      return a.name.localeCompare(b.name)
    })

    const total = filtered.length
    const pageCount = Math.ceil(total / filters.value.pageSize) || 1

    return {
      page: filters.value.page,
      pageSize: filters.value.pageSize,
      pageCount,
      total,
    }
  })

  return {
    filters,
    skills,
    pagination,
  }
}
