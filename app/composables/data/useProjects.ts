interface Project {
  id: string
  title: string
  content: RichBlock[]
  coverImageSrc?: string
  coverImageAlt?: string
  codebaseUrl?: string
  deployUrl?: string
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

    return rawProjects.map(item => ({
      id: _rt(item.id || ''),
      title: _rt(item.title || ''),
      content: markdownToRichBlocks(_rt(item.content || '')),
      coverImageSrc: item.coverImageSrc ? _rt(item.coverImageSrc) : undefined,
      coverImageAlt: item.coverImageAlt ? _rt(item.coverImageAlt) : undefined,
      codebaseUrl: item.codebaseUrl ? _rt(item.codebaseUrl) : undefined,
      deployUrl: item.deployUrl ? _rt(item.deployUrl) : undefined,
    } as Project))
  })

  return {
    projects,
  }
}
