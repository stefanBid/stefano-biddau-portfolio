interface Project {
  id: string
  title: string
  content: RichBlock[]
  coverImageSrc?: string
  coverImageAlt?: string
  codebaseUrls?: MenuItem[]
  deploymentUrls?: MenuItem[]
}

export default function useProjects() {
  const { tm: _tm, rt: _rt } = useI18n()

  // State
  const projects = computed<Project[]>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawProjects = _tm('pages.projects.personalProjects.list') as any

    if (!Array.isArray(rawProjects) || rawProjects.length === 0) {
      return []
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _mapUrls = (rawUrls: any): MenuItem[] | undefined => {
      if (!Array.isArray(rawUrls) || rawUrls.length === 0) {
        return undefined
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rawUrls.map((url: any) => ({
        code: _rt(url.code || ''),
        label: _rt(url.label || ''),
      } as MenuItem))
    }

    return rawProjects.map(item => ({
      id: _rt(item.id || ''),
      title: _rt(item.title || ''),
      content: markdownToRichBlocks(_rt(item.content || '')),
      coverImageSrc: item.coverImageSrc ? _rt(item.coverImageSrc) : undefined,
      coverImageAlt: item.coverImageAlt ? _rt(item.coverImageAlt) : undefined,
      codebaseUrls: _mapUrls(item.codebaseUrls),
      deploymentUrls: _mapUrls(item.deploymentUrls),
    } as Project))
  })

  return {
    projects,
  }
}
