import { resolveSkills } from '~/composables/data/useSkills'
import type { Skill } from '~/composables/data/useSkills'

export interface Project {
  id: string
  title: string
  meta?: string
  // Only used to link skills to the projects that use them (Skills page)
  skills: Skill[]
  content: RichBlock[]
  coverImageSrc?: string
  coverImageAlt?: string
  coverImageFit: 'cover' | 'contain'
  codebaseUrls?: MenuItem[]
  deploymentUrls?: MenuItem[]
  isOngoing: boolean
}

export default function useProjects() {
  const { tm: _tm, rt: _rt } = useI18n()
  const { resolveImageSrc } = useCloudinary()

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

    return rawProjects.map((item) => {
      return {
        id: _rt(item.id || ''),
        title: _rt(item.title || ''),
        meta: item.meta ? _rt(item.meta) : undefined,
        skills: Array.isArray(item.skills) ? resolveSkills(item.skills.map((id: Parameters<typeof _rt>[0]) => _rt(id))) : [],
        content: markdownToRichBlocks(_rt(item.content || '')),
        coverImageSrc: item.coverImageSrc ? resolveImageSrc(_rt(item.coverImageSrc)) : undefined,
        coverImageAlt: item.coverImageAlt ? _rt(item.coverImageAlt) : undefined,
        coverImageFit: item.coverImageFit && _rt(item.coverImageFit) === 'contain' ? 'contain' : 'cover',
        codebaseUrls: _mapUrls(item.codebaseUrls),
        deploymentUrls: _mapUrls(item.deploymentUrls),
        isOngoing: item.status ? _rt(item.status) === 'ongoing' : false,
      } as Project
    })
  })

  return {
    projects,
  }
}
