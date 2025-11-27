interface Milestone {
  id: string
  title: string
  description: string
  subtitle?: string
  imageSrc?: string
  imageCaption?: string
  date?: string
}

interface MilestoneBE {
  id: number
  documentId: string
  title: string
  subtitle: string | null
  description: string
  image: {
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
  imageCaption: string | null
  date: string | null
}

export default function useMilestones() {
  const { locale: _locale } = useI18n()

  // State

  function fetchMilestones() {
    return useFetch<Milestone[] | null>(
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
          const strapiResponse = response as unknown as StrapiResponse<MilestoneBE[]>

          if (!strapiResponse?.data || !Array.isArray(strapiResponse.data)) {
            throw new Error('Invalid Strapi response structure')
          }

          return strapiResponse.data.map(resItem => ({
            id: resItem.documentId,
            title: resItem.title,
            subtitle: resItem.subtitle || undefined,
            description: resItem.description,
            imageSrc: resItem.image?.formats?.medium?.url || undefined,
            imageCaption: resItem.imageCaption || resItem.image?.caption || undefined,
            date: resItem.date || undefined,
          }))
        },
      },
    )
  }

  return {
    fetchMilestones,
  }
}
