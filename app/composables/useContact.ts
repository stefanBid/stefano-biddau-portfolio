import type { ComputedRef, Ref } from 'vue'

export interface UseContactReturn {
  isFormOpen: Ref<boolean>
  cvItems: ComputedRef<MenuItem[]>
}

const CV_LOCALES = [
  { code: 'en', icon: 'flagpack:gb-ukm' },
  { code: 'it', icon: 'flagpack:it' },
] as const

export default function useContact(): UseContactReturn {
  const { t, locale } = useI18n()
  // One form in the layout: page CTAs and the mobile menu all open the same one
  const isFormOpen = useState<boolean>('contact-form-open', () => false)

  // Links kind of BaseMenu: the browser downloads the PDF through the anchor's download attribute
  const cvItems = computed<MenuItem[]>(() => [...CV_LOCALES]
    .sort((a, b) => Number(b.code === locale.value) - Number(a.code === locale.value))
    .map(cv => ({
      code: `/files/Stefano_Biddau_CV_${cv.code}.pdf`,
      label: t(`pages.home.cvCard.versions.${cv.code}.label`),
      description: t(`pages.home.cvCard.versions.${cv.code}.description`),
      icon: cv.icon,
      iconType: 'nuxt-icon',
      download: `Stefano_Biddau_CV_${cv.code}.pdf`,
    })))

  return {
    isFormOpen,
    cvItems,
  }
}
