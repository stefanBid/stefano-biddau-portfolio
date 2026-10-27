import type { ComputedRef } from 'vue'

export type LegalDocumentKey = 'privacy' | 'terms'

export interface LegalSection {
  id: string
  title: string
  content: RichBlock[]
}

export interface LegalDocument {
  title: string
  lead: string
  summary: RichBlock[]
  sections: LegalSection[]
}

export interface UseLegalDocumentReturn {
  legalDocument: ComputedRef<LegalDocument>
}

export default function useLegalDocument(key: LegalDocumentKey): UseLegalDocumentReturn {
  const { t, tm: _tm, rt: _rt } = useI18n()

  const legalDocument = computed<LegalDocument>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawSections = _tm(`pages.${key}.sections`) as any

    return {
      title: t(`pages.${key}.title`),
      lead: t(`pages.${key}.lead`),
      summary: markdownToRichBlocks(t(`pages.${key}.summary`)),
      sections: Array.isArray(rawSections)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? rawSections.map((section: any) => ({
            id: _rt(section.id || ''),
            title: _rt(section.title || ''),
            content: markdownToRichBlocks(_rt(section.content || '')),
          }))
        : [],
    }
  })

  return {
    legalDocument,
  }
}
