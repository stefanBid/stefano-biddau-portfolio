interface Milestone {
  id: string
  title: string
  subtitle?: string | null
  description: string
  imageSrc?: string | null
  imageCaption?: string | null
  date?: string | null
}

interface MilestoneBE {
  id: number
  documentId: string
  title: string
  subtitle?: string | null
  description: string | null
  image?: {
    altermativeText: string | null
    caption: string | null
    formats: {
      small: {
        url: string
      }
      medium: {
        url: string
      }
      large: {
        url: string
      }
      thumbnail: {
        url: string
      }
    }
  } | null
  imageCaption?: string | null
  date?: string | null
}

export default function useMilestones() {
  // Internal state
  const _config = useRuntimeConfig()
  const { locale: _locale } = useI18n()

  // State

  /**
   * Fetch milestones from Strapi CMS
   * @returns Promise<Milestone[]>
   */
  function fetchMilestones() {
    return useFetch<Milestone[]>(
      `${_config.public.strapiUrl}/api/sb-milestones`,
      {
        key: `milestones-${_locale.value}`,
        lazy: true, // Do not block rendering
        server: true, // Fetch on server side
        dedupe: 'cancel', // Cancel previous requests when a new one is made
        query: {
          locale: _locale.value,
          sort: 'date:asc',
          populate: '*',
        },
        transform: (response) => {
          try {
            const strapiResponse = response as unknown as StrapiResponse<MilestoneBE[]>

            // Validate response structure
            if (!strapiResponse?.data || !Array.isArray(strapiResponse.data)) {
              // eslint-disable-next-line no-console
              console.error('[useMilestones] Invalid response:', response)
              return []
            }

            return strapiResponse.data.map((resItem) => {
              return {
                id: resItem.documentId,
                title: resItem.title,
                subtitle: resItem.subtitle ?? null,
                description: resItem.description ?? null,
                imageSrc: resItem.image?.formats?.medium?.url ?? null,
                imageCaption: resItem.imageCaption ?? resItem.image?.caption ?? null,
                date: resItem.date ?? null,
              } as Milestone
            })
          }
          catch (err) {
            // eslint-disable-next-line no-console
            console.error('[useMilestones] Transform error:', err)
            return []
          }
        },
        watch: [_locale],
      },
    )
  }

  return {
    fetchMilestones,
  }
}
