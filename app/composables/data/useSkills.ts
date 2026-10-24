// composables/data/useSkills.ts

export type SkillArea = 'frontend' | 'backend' | 'tools'
export type SkillTier = 'daily' | 'shipped' | 'familiar'
export type StackArea = 'frontend' | 'backend' | 'database'

export interface Skill {
  id: string
  name: string
  icon: string
  area: SkillArea
  tier: SkillTier
  onLight?: boolean
}

export interface SkillTierGroup {
  key: SkillTier
  skills: Skill[]
}

export interface SkillAreaGroup {
  key: SkillArea
  total: number
  tiers: SkillTierGroup[]
}

export interface StackGroup {
  key: StackArea
  skills: Skill[]
}

interface UseSkillsReturn {
  areas: ComputedRef<SkillAreaGroup[]>
  featuredStack: ComputedRef<StackGroup[]>
}

const AREAS: SkillArea[] = ['frontend', 'backend', 'tools']
const TIERS: SkillTier[] = ['daily', 'shipped', 'familiar']

// Home page "Core stack": a curated full-stack profile, independent from tiers
const FEATURED_STACK: Record<StackArea, string[]> = {
  frontend: ['angular', 'vue', 'vite', 'nuxt', 'flutter'],
  backend: ['spring', 'java'],
  database: ['postgresql'],
}

// id: stable slug referenced by `skills` in projects, templates and milestones (locale files)
// daily: in use every day · shipped: used in delivered work · familiar: used, not core
// onLight: dark logo that needs a light backing to stay visible
const SKILLS_DATA: Skill[] = [
  {
    id: 'adobe-xd',
    name: 'Adobe XD',
    icon: 'logos:adobe-xd',
    area: 'tools',
    tier: 'familiar',
  },
  {
    id: 'angular',
    name: 'Angular',
    icon: 'logos:angular-icon',
    area: 'frontend',
    tier: 'daily',
  },
  {
    id: 'astro',
    name: 'Astro',
    icon: 'logos:astro-icon',
    area: 'frontend',
    tier: 'daily',
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    icon: 'logos:bootstrap',
    area: 'frontend',
    tier: 'shipped',
  },
  {
    id: 'chromatic',
    name: 'Chromatic',
    icon: 'logos:chromatic-icon',
    area: 'tools',
    tier: 'shipped',
  },
  {
    id: 'css',
    name: 'CSS',
    icon: 'logos:css-3',
    area: 'frontend',
    tier: 'daily',
  },
  {
    id: 'dart',
    name: 'Dart',
    icon: 'logos:dart',
    area: 'frontend',
    tier: 'shipped',
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: 'logos:docker-icon',
    area: 'tools',
    tier: 'familiar',
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: 'logos:figma',
    area: 'tools',
    tier: 'shipped',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    icon: 'logos:flutter-icon',
    area: 'frontend',
    tier: 'shipped',
  },
  {
    id: 'git',
    name: 'Git',
    icon: 'logos:git-icon',
    area: 'tools',
    tier: 'shipped',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    icon: 'logos:graphql',
    area: 'backend',
    tier: 'shipped',
  },
  {
    id: 'headless-ui',
    name: 'Headless UI',
    icon: 'logos:headlessui-icon',
    area: 'frontend',
    tier: 'daily',
  },
  {
    id: 'hibernate',
    name: 'Hibernate',
    icon: 'logos:hibernate',
    area: 'backend',
    tier: 'familiar',
    onLight: true,
  },
  {
    id: 'html',
    name: 'HTML',
    icon: 'logos:html-5',
    area: 'frontend',
    tier: 'daily',
  },
  {
    id: 'java',
    name: 'Java',
    icon: 'logos:java',
    area: 'backend',
    tier: 'shipped',
    onLight: true,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'logos:javascript',
    area: 'frontend',
    tier: 'shipped',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: 'logos:mysql-icon',
    area: 'backend',
    tier: 'familiar',
    onLight: true,
  },
  {
    id: 'netlify',
    name: 'Netlify',
    icon: 'logos:netlify-icon',
    area: 'tools',
    tier: 'shipped',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: 'logos:nodejs-icon',
    area: 'backend',
    tier: 'shipped',
  },
  {
    id: 'npm',
    name: 'npm',
    icon: 'logos:npm-icon',
    area: 'tools',
    tier: 'daily',
  },
  {
    id: 'nuxt',
    name: 'Nuxt',
    icon: 'logos:nuxt-icon',
    area: 'frontend',
    tier: 'shipped',
  },
  {
    id: 'pnpm',
    name: 'pnpm',
    icon: 'logos:pnpm',
    area: 'tools',
    tier: 'shipped',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: 'logos:postgresql',
    area: 'backend',
    tier: 'familiar',
  },
  {
    id: 'postman',
    name: 'Postman',
    icon: 'logos:postman-icon',
    area: 'tools',
    tier: 'daily',
  },
  {
    id: 'python',
    name: 'Python',
    icon: 'logos:python',
    area: 'backend',
    tier: 'familiar',
  },
  {
    id: 'react',
    name: 'React',
    icon: 'logos:react',
    area: 'frontend',
    tier: 'familiar',
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'logos:slack-icon',
    area: 'tools',
    tier: 'shipped',
  },
  {
    id: 'spring',
    name: 'Spring',
    icon: 'logos:spring-icon',
    area: 'backend',
    tier: 'shipped',
  },
  {
    id: 'storybook',
    name: 'Storybook',
    icon: 'logos:storybook-icon',
    area: 'tools',
    tier: 'shipped',
  },
  {
    id: 'strapi',
    name: 'Strapi',
    icon: 'logos:strapi-icon',
    area: 'backend',
    tier: 'familiar',
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS',
    icon: 'logos:tailwindcss-icon',
    area: 'frontend',
    tier: 'daily',
  },
  {
    id: 'turborepo',
    name: 'Turborepo',
    icon: 'logos:turborepo-icon',
    area: 'tools',
    tier: 'familiar',
    onLight: true,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'logos:typescript-icon',
    area: 'frontend',
    tier: 'daily',
  },
  {
    id: 'vite',
    name: 'Vite',
    icon: 'logos:vitejs',
    area: 'frontend',
    tier: 'daily',
  },
  {
    id: 'vue',
    name: 'Vue',
    icon: 'logos:vue',
    area: 'frontend',
    tier: 'daily',
  },
]

const SKILLS_BY_ID = new Map(SKILLS_DATA.map(skill => [skill.id, skill]))

// Unknown ids are dropped, so a typo in a locale file never breaks a page
export const resolveSkills = (ids: string[]): Skill[] =>
  ids.map(id => SKILLS_BY_ID.get(id)).filter(skill => skill !== undefined)

export default function useSkills(): UseSkillsReturn {
  const areas = computed<SkillAreaGroup[]>(() => AREAS.map((area) => {
    const skills = SKILLS_DATA.filter(skill => skill.area === area)
    return {
      key: area,
      total: skills.length,
      tiers: TIERS
        .map(tier => ({ key: tier, skills: skills.filter(skill => skill.tier === tier) }))
        .filter(group => group.skills.length > 0),
    }
  }))

  const featuredStack = computed<StackGroup[]>(() => (Object.keys(FEATURED_STACK) as StackArea[]).map(key => ({
    key,
    skills: resolveSkills(FEATURED_STACK[key]),
  })))

  return {
    areas,
    featuredStack,
  }
}
