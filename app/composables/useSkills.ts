/* eslint-disable @typescript-eslint/no-explicit-any */
// composables/useSkills.ts

interface Skill {
  id: string
  name: string
  level: number
  category?: SkillType
  icon?: string
  isGod?: boolean
}

interface SkillBE {
  id: number
  documentId: string
  name: string
  level: number | string
  type: string
  icon?: string | null
  isGod: boolean | null
}

const DEFAULT_PAGE_SIZE = 12
const DEFAULT_STARTING_PAGE = 1

export default function useSkills() {
  const skills = ref<Skill[] | null>(null)
  const pending = ref(false)
  const fetchError = ref<Error | null>(null)
  const pagination = ref<StrapiResponse<SkillBE[]>['meta']['pagination'] | null>(null)

  // Internal state for filters
  const filtersState = reactive({
    name: '',
    types: [] as SkillType[],
    page: DEFAULT_STARTING_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  async function fetchSkills(params?: Partial<typeof filtersState>) {
    // 1) update filters state if passed
    if (params) {
      filtersState.name = params.name ?? filtersState.name
      filtersState.types = params.types ?? filtersState.types
      filtersState.page = params.page && params.page > 0 ? params.page : filtersState.page
      filtersState.pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : filtersState.pageSize
    }

    // 2) build the actual query
    const query: Record<string, any> = {
      page: filtersState.page,
      pageSize: filtersState.pageSize,
    }

    if (filtersState.name) {
      query.name = filtersState.name
    }

    if (filtersState.types.length) {
      query.type = filtersState.types
    }

    pending.value = true
    fetchError.value = null

    try {
      const strapiResponse = await $fetch<StrapiResponse<SkillBE[]>>('/api/sb-skills', {
        params: query,
      })

      pagination.value = strapiResponse.meta?.pagination ?? null

      if (!strapiResponse?.data || !Array.isArray(strapiResponse.data)) {
        throw new Error('Invalid Strapi response structure')
      }

      skills.value = strapiResponse.data.map(resItem => ({
        id: resItem.documentId || String(resItem.id),
        name: resItem.name,
        level: Number(resItem.level) || 0,
        category: resItem.type as SkillType | undefined,
        icon: resItem.icon || undefined,
        isGod: resItem.isGod || false,
      }))
    }
    catch (err) {
      fetchError.value = err as Error
      skills.value = []
    }
    finally {
      pending.value = false
    }
  }

  return {
    data: skills,
    pending,
    error: fetchError,
    pagination: computed(() => pagination.value),
    fetchSkills,
  }
}
