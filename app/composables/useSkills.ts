interface Skill {
  id: string
  name: string
  level: number
  category?: SkillType
  icon?: string
}

interface SkillBE {
  id: number
  documentId: string
  name: string
  level: number | string
  type: string
  icon?: string | null
}

export default function useSkills() {
  const pagination = ref<StrapiResponse<SkillBE[]>['meta']['pagination'] | null>(null)

  const filtersState = reactive({
    name: '',
    types: [] as SkillType[],
    page: 1,
    pageSize: 9,
  })

  const request = useFetch<Skill[] | null>('/api/sb-skills', {
    // Run only when explicitly triggered via execute()
    immediate: false,
    // Client-side fetch by default to avoid SSR calls when not needed
    server: false,
    // Avoid automatic re-fetch on query change; we trigger manually via fetchSkills
    watch: false,
    query: computed(() => ({
      name: filtersState.name || undefined,
      type: filtersState.types.length ? filtersState.types : undefined,
      page: filtersState.page,
      pageSize: filtersState.pageSize,
    })),
    transform: (response) => {
      const strapiResponse = response as unknown as StrapiResponse<SkillBE[]>

      pagination.value = strapiResponse?.meta?.pagination ?? null

      if (!strapiResponse?.data || !Array.isArray(strapiResponse.data)) {
        throw new Error('Invalid Strapi response structure')
      }

      return strapiResponse.data.map(resItem => ({
        id: resItem.documentId || String(resItem.id),
        name: resItem.name,
        level: Number(resItem.level) || 0,
        category: resItem.type as SkillType | undefined,
        icon: resItem.icon || undefined,
      }))
    },
  })

  function fetchSkills(params?: Partial<typeof filtersState>) {
    if (params) {
      filtersState.name = params.name ?? filtersState.name
      filtersState.types = params.types ?? filtersState.types
      filtersState.page = params.page && params.page > 0 ? params.page : filtersState.page
      filtersState.pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : filtersState.pageSize
    }

    return request.execute()
  }

  return {
    pagination: computed(() => pagination.value),
    ...request,
    fetchSkills,
  }
}
