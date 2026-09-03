interface Milestone {
  id: string
  title: string
  content: RichBlock[]
  subtitle?: string
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
  imageCaption?: string
  date?: string
}

export default function useMilestones() {
  const { tm: _tm, rt: _rt } = useI18n()

  // State
  const milestones = computed<Milestone[]>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawMilestones = _tm('pages.about.milestones') as any

    if (!Array.isArray(rawMilestones) || rawMilestones.length === 0) {
      return []
    }

    // Convert i18n reactive objects to plain JavaScript objects (POJO)
    return rawMilestones.map(item => ({
      id: _rt(item.id || ''),
      title: _rt(item.title || ''),
      content: markdownToRichBlocks(_rt(item.content || '')),
      subtitle: item.subtitle ? _rt(item.subtitle) : undefined,
      imageSrc: item.imageSrc ? _rt(item.imageSrc) : undefined,
      imageWidth: item.imageWidth,
      imageHeight: item.imageHeight,
      imageCaption: item.imageCaption ? _rt(item.imageCaption) : undefined,
      date: item.date ? _rt(item.date) : undefined,
    } as Milestone))
  })

  return {
    milestones,
  }
}
