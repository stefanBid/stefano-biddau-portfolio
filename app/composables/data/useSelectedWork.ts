import useProjects from '~/composables/data/useProjects'

interface SelectedWorkItem {
  key: string
  slug: 'romano' | 'floatingPanel' | 'sbTemplates'
  title: string
  imageSrc?: string
  imageAlt: string
  imageFit: 'cover' | 'contain'
  meta: string
  to: string | { path: string, hash?: string }
}

const PROJECT_LINKS = [
  { id: 'bd6a7d77-d3e5-48be-a83c-28d290f788ec', metaKey: 'romano' },
  { id: 'acb2196a-5974-40ba-81c5-fccb58611c0b', metaKey: 'floatingPanel' },
] as const

export default function useSelectedWork() {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const { projects } = useProjects()

  // State
  const selectedWork = computed<SelectedWorkItem[]>(() => {
    const fromProjects = PROJECT_LINKS
      .map(({ id, metaKey }) => {
        const project = projects.value.find(p => p.id === id)
        if (!project) {
          return undefined
        }
        return {
          key: id,
          slug: metaKey,
          title: project.title,
          imageSrc: project.coverImageSrc,
          imageAlt: project.coverImageAlt || '',
          imageFit: 'cover' as const,
          meta: t(`pages.home.selectedWork.meta.${metaKey}`),
          to: { path: localePath('my-projects'), hash: `#project-${id}` },
        }
      })
      .filter(item => item !== undefined)

    const sbTemplates = {
      key: 'sb-templates',
      slug: 'sbTemplates' as const,
      title: t('nav.sb-templates'),
      imageSrc: '/images/sbt-logos/sbt-logo.webp',
      imageAlt: t('pages.projects.sbTemplatesProject.logoAlt'),
      imageFit: 'contain' as const,
      meta: t('pages.home.selectedWork.meta.sbTemplates'),
      to: { path: localePath('/my-projects/sb-templates') },
    }

    return fromProjects.length === 2 ? [fromProjects[0]!, sbTemplates, fromProjects[1]!] : [...fromProjects, sbTemplates]
  })

  return {
    selectedWork,
  }
}
