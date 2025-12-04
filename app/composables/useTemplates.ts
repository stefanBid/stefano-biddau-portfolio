interface SbTemplate {
  id: string
  title: string
  description: string
  deploymentUrl: string
  logoSrc?: string
  icons?: string[]
}

interface SbTemplateBE {
  id: number
  documentId: string
  createdAt: string
  title: string
  description: string
  deploymentUrl: string
  logo: {
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
  icons: string[] | null
}

export default function useTemplates(settings?: { server?: boolean, lazy?: boolean }) {
  const { locale: _locale } = useI18n()

  // State
  function fetchTemplates() {
    return useFetch<SbTemplate[] | null>(
      '/api/sb-templates',
      {
        // Key is reactive: when locale changes, Nuxt automatically re-fetches.
        key: () => `sb-templates-${_locale.value}`,

        // Enable SSR fetch (recommended for SEO)
        server: settings?.server || true,

        // Fetch immediately (not lazy) so SSR generates full HTML
        lazy: settings?.lazy || false,

        // Cancel ongoing requests if a new one starts
        dedupe: 'cancel',

        // Pass locale as query param to the server endpoint
        query: computed(() => ({
          locale: _locale.value,
        })),

        transform: (response) => {
          const strapiResponse = response as unknown as StrapiResponse<SbTemplateBE[]>

          if (!strapiResponse?.data || !Array.isArray(strapiResponse.data)) {
            throw new Error('Invalid Strapi response structure')
          }

          return strapiResponse.data.map(resItem => ({
            id: resItem.documentId,
            title: resItem.title,
            description: resItem.description,
            deploymentUrl: resItem.deploymentUrl,
            logoSrc: resItem.logo?.formats?.medium?.url || resItem.logo?.formats?.small?.url || resItem.logo?.formats?.thumbnail?.url || undefined,
            icons: resItem.icons || undefined,
          }))
        },

      },
    )
  }

  return {
    fetchTemplates,
  }
}
