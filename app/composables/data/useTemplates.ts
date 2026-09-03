export interface SbTemplate {
  id: string
  title: string
  description: string
  codebaseUrl: string
  logoSrc?: string
  logoWidth?: number
  logoHeight?: number
  langIcons?: string[]
}

export default function useTemplates() {
  const { tm: _tm, rt: _rt } = useI18n()

  // State
  const templates = computed<SbTemplate[]>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawTemplates = _tm('pages.projects.sbTemplatesProject.list') as any

    if (!Array.isArray(rawTemplates) || rawTemplates.length === 0) {
      return []
    }

    return rawTemplates.map(item => ({
      id: _rt(item.id || ''),
      title: _rt(item.title || ''),
      description: _rt(item.description || ''),
      codebaseUrl: item.codebaseUrl ? _rt(item.codebaseUrl) : '',
      logoSrc: item.logoSrc ? _rt(item.logoSrc) : undefined,
      logoWidth: item.logoWidth,
      logoHeight: item.logoHeight,
      langIcons: Array.isArray(item.langIcons) ? item.langIcons.map((icon: string) => _rt(icon)) : undefined,
    } as SbTemplate))
  })

  return {
    templates,
  }
}
