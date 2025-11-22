export interface Milestone {
  id: number
  title: string
  subtitle?: string | null
  description: string
  imageSrc?: string | null
  imageAlt?: string | null
  date?: string
  order?: number
}

export default function useMilestones() {
  const config = useRuntimeConfig()

  // Easy Call to fetch milestones from Strapi API
  const fetchMilestones = () => {
    return useFetch<Milestone[]>(
      `${config.public.strapiUrl}/api/milestones`,
      {
        key: 'milestones', // cache key
        query: {
          sort: 'order:asc',
          populate: '*',
        },
        // Automatic transformation
        transform: (response) => {
          const strapiResponse = response as unknown as StrapiResponse<Milestone[]>
          return strapiResponse?.data || [] as Milestone[]
        },
      },
    )
  }

  const fetchMilestonesAdvanced = () => {
    return useAsyncData(
      'milestones',
      async () => {
        const response = await $fetch<StrapiResponse<Milestone[]>>(
          `${config.public.strapiUrl}/api/milestones`,
          {
            query: {
              sort: 'order:asc',
              populate: '*',
            },
          },
        )
        // Custom transformations
        return response.data.map(m => ({
          ...m,
          // Add custom logic
          isRecent: m.date ? new Date(m.date) > new Date('2024-01-01') : false,
        }))
      },
      {
        // Cache options
        lazy: false, // await before render
        server: true, // fetch on SSR
        default: () => [] as Milestone[], // default value
      },
    )
  }

  return {
    fetchMilestones, // Semplice
    fetchMilestonesAdvanced, // Avanzato
  }
}
