interface Project {
  id: string
  title: string
  content: RichBlock[]
  coverImageSrc?: string
  coverImageAlt?: string
  codebaseUrl?: string
  deployUrl?: string
}

interface ProjectBE {
  id: number
  documentId: string
  createdAt: string
  title: string
  content: RichBlock[]
  cover: {
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
  codebaseUrl: string | null
  deployUrl: string | null
}

export default function useProjects(settings?: { server?: boolean, lazy?: boolean }) {
  const { locale: _locale } = useI18n()

  // State
  function fetchProjects() {
    return useFetch<Project[]>(
      '/api/sb-projects',
      {
        // Key is reactive: when locale changes, Nuxt automatically re-fetches.
        key: `sb-projects-${_locale.value}`,

        // Enable SSR fetch (recommended for About page SEO)
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
          const strapiResponse = response as unknown as StrapiResponse<ProjectBE[]>

          if (!strapiResponse?.data || !Array.isArray(strapiResponse.data)) {
            // console.warn('[useProjects] Invalid Strapi response:', strapiResponse)
            return []
          }

          return strapiResponse.data.map(resItem => ({
            id: resItem.documentId,
            title: resItem.title,
            content: resItem.content,
            coverImageSrc: resItem.cover?.formats?.medium?.url || resItem.cover?.formats?.small?.url || resItem.cover?.formats?.thumbnail?.url || undefined,
            coverImageAlt: resItem.cover?.altermativeText || undefined,
            codebaseUrl: resItem.codebaseUrl || undefined,
            deployUrl: resItem.deployUrl || undefined,
          }))
        },
      },
    )
  }

  return {
    fetchProjects,
  }
}
