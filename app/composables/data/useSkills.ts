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
    id: '5e4c05bc-443b-450a-bb76-96ec91b76480',
    name: 'Adobe XD',
    level: 3.5,
    icon: 'logos:adobe-xd',
    category: 'tool',
    isGod: false,
  },
  {
    id: 'a7e5038d-eb1c-4fd5-bc12-e6ea29d7d97f',
    name: 'Angular',
    level: 5,
    icon: 'logos:angular-icon',
    category: 'feFramework',
    isGod: true,
  },
  {
    id: 'ad0f04c7-a00e-4336-8829-a3022018a16d',
    name: 'Bootstrap',
    level: 4,
    icon: 'logos:bootstrap',
    category: 'other',
    isGod: false,
  },
  {
    id: '34f3363b-1e0b-4eb2-8e97-790ec28f90b5',
    name: 'C#',
    level: 1.5,
    icon: 'logos:c-sharp',
    category: 'beLang',
    isGod: false,
  },
  {
    id: '3dd9c506-50e4-49b3-b207-44be672df33e',
    name: 'CSS',
    level: 5,
    icon: 'logos:css-3',
    category: 'feLang',
    isGod: true,
  },
  {
    id: '9ea85aeb-6b7d-4104-bb0a-1f550d2cffb4',
    name: 'Chromatic',
    level: 4,
    icon: 'logos:chromatic-icon',
    category: 'tool',
    isGod: false,
  },
  {
    id: '4f05c6d9-0495-45a9-a250-2667977e6063',
    name: 'Dart',
    level: 4,
    icon: 'logos:dart',
    category: 'feLang',
    isGod: false,
  },
  {
    id: 'df10b25f-9a49-4b92-b759-bbdc4ec3a5a5',
    name: 'Docker',
    level: 3,
    icon: 'logos:docker-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: 'be5bad34-30bf-4af8-9102-2ccf3e7dcc32',
    name: 'Figma',
    level: 4,
    icon: 'logos:figma',
    category: 'tool',
    isGod: false,
  },
  {
    id: '973b1c25-8edb-4182-a85c-9bb17fa4bb60',
    name: 'Flutter',
    level: 4,
    icon: 'logos:flutter',
    category: 'feFramework',
    isGod: false,
  },
  {
    id: '06bf5949-1241-4b96-bb5c-a953aeff37c1',
    name: 'Git',
    level: 4,
    icon: 'logos:git-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '2166c040-ccff-433a-8984-5379da2ee8f7',
    name: 'GraphQL',
    level: 4,
    icon: 'logos:graphql',
    category: 'database',
    isGod: false,
  },
  {
    id: 'c5d8034f-70a2-42cc-a35d-4b1811e0934a',
    name: 'HTML',
    level: 5,
    icon: 'logos:html-5',
    category: 'feLang',
    isGod: true,
  },
  {
    id: '6accbf72-3baa-49af-a341-39c59ab30114',
    name: 'Headless UI',
    level: 5,
    icon: 'logos:headlessui-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: 'de902cf9-7b63-4c30-a8a2-373b9ed6297a',
    name: 'Hibernate',
    level: 3.5,
    icon: 'logos:hibernate',
    category: 'beFramework',
    isGod: false,
  },
  {
    id: 'b64d4f97-e448-471c-ab6b-15719584e2e5',
    name: 'Java',
    level: 4,
    icon: 'logos:java',
    category: 'beLang',
    isGod: false,
  },
  {
    id: 'd5b69e1a-f21a-4518-b58f-c309d7b5ee33',
    name: 'JavaScript',
    level: 4.5,
    icon: 'logos:javascript',
    category: 'feLang',
    isGod: false,
  },
  {
    id: '9e9c9bd2-be67-41f7-95c6-676668f68af6',
    name: 'MySQL',
    level: 3.5,
    icon: 'logos:mysql-icon',
    category: 'database',
    isGod: false,
  },
  {
    id: 'fa39766a-bccc-4b0f-b66f-0b4e13e9dfbb',
    name: 'PostgreSQL',
    level: 3.5,
    icon: 'logos:postgresql',
    category: 'database',
    isGod: false,
  },
  {
    id: '81110e46-8baf-4641-8162-8e3d23f9f3c0',
    name: 'Netlify',
    level: 4,
    icon: 'logos:netlify-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '5a73a907-6c45-4ace-b0fd-36141f232b4b',
    name: 'Postman',
    level: 5,
    icon: 'logos:postman-icon',
    category: 'tool',
    isGod: true,
  },
  {
    id: '3cad6f87-345c-48a6-a8f0-dce4780a16b0',
    name: 'Node.js',
    level: 4,
    icon: 'logos:nodejs-icon',
    category: 'beLang',
    isGod: false,
  },
  {
    id: '6d231ebf-4476-4bc7-afc5-1757bf6a4b50',
    name: 'Nuxt',
    level: 4.5,
    icon: 'logos:nuxt-icon',
    category: 'feFramework',
    isGod: false,
  },
  {
    id: '4433519f-2ab5-42ee-b5cb-6600df3b662d',
    name: 'Astro',
    level: 5,
    icon: 'logos:astro-icon',
    category: 'feFramework',
    isGod: true,
  },
  {
    id: 'b35e5b49-139f-4aa0-a72a-25e692968620',
    name: 'Python',
    level: 3.5,
    icon: 'logos:python',
    category: 'beLang',
    isGod: false,
  },
  {
    id: '677fd3b7-ea5e-44e8-84c5-788b73ede3df',
    name: 'React',
    level: 3.5,
    icon: 'logos:react',
    category: 'feFramework',
    isGod: false,
  },
  {
    id: 'adaed290-35eb-4e61-bc7a-429ec4725eae',
    name: 'Slack',
    level: 4,
    icon: 'logos:slack-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '72744155-e004-4650-9f20-061187df4308',
    name: 'Spring',
    level: 4,
    icon: 'logos:spring-icon',
    category: 'beFramework',
    isGod: false,
  },
  {
    id: '711d70ab-7a76-46a3-82c0-a556782a8beb',
    name: 'Storybook',
    level: 4,
    icon: 'logos:storybook-icon',
    category: 'tool',
    isGod: false,
  },
  {
    id: 'f18bcb47-0483-418c-85de-f36b933058ae',
    name: 'Strapi',
    level: 3.5,
    icon: 'logos:strapi-icon',
    category: 'beFramework',
    isGod: false,
  },
  {
    id: '947250b1-f464-402d-a2f5-d97136754589',
    name: 'Tailwind CSS',
    level: 5,
    icon: 'logos:tailwindcss-icon',
    category: 'other',
    isGod: true,
  },
  {
    id: '815d36a9-6a39-4cba-9432-bb1974a3fce3',
    name: 'Turborepo',
    level: 3,
    icon: 'logos:turborepo-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '39443122-e4e9-4804-b447-df3792dc2b95',
    name: 'TypeScript',
    level: 5,
    icon: 'logos:typescript-icon',
    category: 'feLang',
    isGod: true,
  },
  {
    id: '69e4af11-3ead-4772-89c2-338097565e1c',
    name: 'Vite',
    level: 5,
    icon: 'logos:vitejs',
    category: 'feFramework',
    isGod: true,
  },
  {
    id: '81e673bb-81ed-484a-bfc0-0385b148a47f',
    name: 'Vue',
    level: 5,
    icon: 'logos:vue',
    category: 'feFramework',
    isGod: true,
  },
  {
    id: '6cb33d78-f380-4f18-9f38-b9efb7babfb7',
    name: 'npm',
    level: 5,
    icon: 'logos:npm-icon',
    category: 'other',
    isGod: false,
  },
  {
    id: '1da2f253-8e2b-4693-9f65-ed36ce6c90b9',
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
