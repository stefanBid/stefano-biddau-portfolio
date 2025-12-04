export interface SbTemplate {
  id: string
  title: string
  description: string
  codebaseUrl: string
  logoSrc?: string
  langIcons?: string[]
}

interface SbTemplateBE {
  id: number
  documentId: string
  createdAt: string
  title: string
  description: string
  codebaseUrl: string
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
  langIcons: string[] | null
}

export default function useTemplates() {
  const { locale: _locale } = useI18n()

  const templates = ref<SbTemplate[] | null>(null)
  const pending = ref(false)
  const fetchError = ref<Error | null>(null)

  async function fetchTemplates() {
    pending.value = true
    fetchError.value = null

    try {
      const strapiResponse = await $fetch<StrapiResponse<SbTemplateBE[]>>('/api/sb-templates', {
        params: {
          locale: _locale.value,
        },
      })

      if (!strapiResponse?.data || !Array.isArray(strapiResponse.data)) {
        throw new Error('Invalid Strapi response structure')
      }

      templates.value = strapiResponse.data.map(resItem => ({
        id: resItem.documentId,
        title: resItem.title,
        description: resItem.description,
        codebaseUrl: resItem.codebaseUrl,
        logoSrc: resItem.logo?.formats?.medium?.url || resItem.logo?.formats?.small?.url || resItem.logo?.formats?.thumbnail?.url || undefined,
        langIcons: resItem.langIcons || undefined,
      }))
    }
    catch (err) {
      fetchError.value = err as Error
      templates.value = []
    }
    finally {
      pending.value = false
    }
  }

  return {
    data: templates,
    pending,
    error: fetchError,
    fetchTemplates,
  }
}
