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
  const config = useRuntimeConfig()
  const { locale } = useI18n()

  const fetchMilestones = () => {
    return useFetch<Milestone[]>(
      `${config.public.strapiUrl}/api/sb-milestones`,
      {
        key: `milestones-${locale.value}`,
        lazy: true, // Do not block rendering
        server: true, // Fetch on server side
        dedupe: 'cancel', // Cancel previous requests when a new one is made
        query: {
          locale: locale.value,
          sort: 'date:asc',
          populate: '*',
        },
        transform: (response) => {
          const strapiResponse = response as unknown as StrapiResponse<MilestoneBE[]>
          return strapiResponse.data.map((resItem) => {
            return {
              id: resItem.documentId,
              title: resItem.title,
              subtitle: resItem.subtitle ?? null,
              description: resItem.description ?? null,
              imageSrc: resItem.image?.formats.medium.url ?? null,
              imageCaption: resItem.imageCaption ?? resItem.image?.caption ?? null,
              date: resItem.date ?? null,
            } as Milestone
          })
        },
        watch: [locale],
      },
    )
  }

  return {
    fetchMilestones,
  }
}
