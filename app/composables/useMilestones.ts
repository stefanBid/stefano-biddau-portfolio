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
  const { locale: _locale } = useI18n()

  // State

  function fetchMilestones() {
    return useFetch<Milestone[]>(
      '/api/sb-milestones',
      {
        // Key is reactive: when locale changes, Nuxt automatically re-fetches.
        key: () => `milestones-${_locale.value}`,

        // Enable SSR fetch (recommended for About page SEO)
        server: true,

        // Fetch immediately (not lazy) so SSR generates full HTML
        lazy: false,

        // Cancel ongoing requests if a new one starts
        dedupe: 'cancel',

        // Pass locale as query param to the server endpoint
        query: {
          locale: _locale.value,
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
      },
    )
  }

  return {
    fetchMilestones,
  }
}
