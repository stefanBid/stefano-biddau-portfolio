interface Milestone {
  id: string
  title: string
  content: RichBlock[]
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
  content: RichBlock[]
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

export default function useMilestones(settings?: { server?: boolean, lazy?: boolean }) {
  const { locale: _locale } = useI18n()

  // State

  function fetchMilestones() {
    return useFetch<Milestone[]>(
      '/api/sb-milestones',
      {
        // Key is reactive: when locale changes, Nuxt automatically re-fetches.
        key: `sb-milestones-${_locale.value}`,

        // Enable SSR fetch (recommended for SEO)
        server: settings?.server || true,

        // Fetch immediately (not lazy) so SSR generates full HTML
        lazy: settings?.lazy || false,

        // Watch locale changes and refetch
        watch: [_locale],

        // Cancel ongoing requests if a new one starts
        dedupe: 'cancel',

        // Default value to prevent null during language switch
        default: () => [],

        // Pass locale as query param to the server endpoint
        query: {
          locale: _locale.value,
        },
        transform: (response) => {
          const strapiResponse = response as unknown as StrapiResponse<MilestoneBE[]>

          if (!strapiResponse?.data || !Array.isArray(strapiResponse.data)) {
            // console.warn('[useMilestones] Invalid Strapi response:', strapiResponse)
            return []
          }

          return strapiResponse.data.map(resItem => ({
            id: resItem.documentId,
            title: resItem.title,
            subtitle: resItem.subtitle || undefined,
            content: resItem.content,
            imageSrc: resItem.image?.formats?.medium?.url || resItem.image?.formats?.small?.url || resItem.image?.formats?.thumbnail?.url || undefined,
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
