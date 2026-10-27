import type { RouteLocationRaw } from 'vue-router'
import useMilestones from '~/composables/data/useMilestones'
import useProjects from '~/composables/data/useProjects'
import useTemplates from '~/composables/data/useTemplates'
import type { Skill, SkillArea } from '~/composables/data/useSkills'

export interface SkillReference {
  key: string
  title: string
  skills: Skill[]
  to: RouteLocationRaw
}

interface UseSkillReferencesReturn {
  references: ComputedRef<SkillReference[]>
  referencesByArea: ComputedRef<Record<SkillArea, SkillReference[]>>
  referenceBySkill: ComputedRef<Record<string, SkillReference>>
}

// Skills whose best proof is not their first reference (work comes first): reference key by skill id
const PREFERRED_REFERENCE: Record<string, string> = {
  vue: 'acb2196a-5974-40ba-81c5-fccb58611c0b',
  vite: 'acb2196a-5974-40ba-81c5-fccb58611c0b',
  npm: 'acb2196a-5974-40ba-81c5-fccb58611c0b',
}

export default function useSkillReferences(): UseSkillReferencesReturn {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const { milestones } = useMilestones()
  const { projects } = useProjects()
  const { templates } = useTemplates()

  // Work and study first (one entry per organization, newest role), then projects, then the templates as a whole
  const references = computed<SkillReference[]>(() => {
    const work = [...milestones.value]
      .reverse()
      .filter(milestone => milestone.type !== 'upcoming' && milestone.skills.length > 0)
      .reduce<SkillReference[]>((items, milestone) => {
        const key = milestone.organization ?? milestone.id
        const existing = items.find(item => item.key === key)
        if (existing) {
          existing.skills = [...new Set([...existing.skills, ...milestone.skills])]
          return items
        }
        return [...items, {
          key,
          title: milestone.organization ?? milestone.title,
          skills: milestone.skills,
          to: { path: localePath('about-me'), hash: `#milestone-title-${milestone.id}` },
        }]
      }, [])

    const fromProjects = projects.value
      .filter(project => project.skills.length > 0)
      .map(project => ({
        key: project.id,
        title: project.title,
        skills: project.skills,
        to: { path: localePath('my-projects'), hash: `#project-${project.id}` },
      }))

    const templateSkills = [...new Set(templates.value.flatMap(template => template.skills))]
    const fromTemplates = templateSkills.length > 0
      ? [{ key: 'sb-templates', title: t('nav.sb-templates'), skills: templateSkills, to: localePath('/my-projects/sb-templates') }]
      : []

    return [...work, ...fromProjects, ...fromTemplates]
  })

  // Where each skill chip links: its preferred reference when it has one, otherwise the first place it shows up
  const referenceBySkill = computed<Record<string, SkillReference>>(() => {
    const map: Record<string, SkillReference> = {}
    references.value.forEach((reference) => {
      reference.skills.forEach((skill) => {
        map[skill.id] ??= reference
      })
    })
    Object.entries(PREFERRED_REFERENCE).forEach(([skillId, key]) => {
      const preferred = references.value.find(reference => reference.key === key && reference.skills.some(skill => skill.id === skillId))
      if (preferred) {
        map[skillId] = preferred
      }
    })
    return map
  })

  const referencesByArea = computed<Record<SkillArea, SkillReference[]>>(() => {
    const _byArea = (area: SkillArea) => references.value.filter(item => item.skills.some(skill => skill.area === area))
    return {
      frontend: _byArea('frontend'),
      backend: _byArea('backend'),
      tools: _byArea('tools'),
    }
  })

  return {
    references,
    referencesByArea,
    referenceBySkill,
  }
}
