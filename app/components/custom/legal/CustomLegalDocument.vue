<script setup lang="ts">
import type { LegalDocument } from '~/composables/data/useLegalDocument'

interface CustomLegalDocumentProps {
  id: string
  legalDocument: LegalDocument
  updatedIso: string
  related: 'privacy-policy' | 'terms-and-conditions'
}

// Dependencies
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { isFormOpen: isContactFormOpen } = useContact()

// Input / Output
const props = defineProps<CustomLegalDocumentProps>()

// Data
const activeId = ref<string | null>(null)

const updatedLabel = computed(() => new Intl.DateTimeFormat(locale.value, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}).format(new Date(props.updatedIso)))

const ACTIVE_OFFSET = 160 // px from the top: below the sticky header, where a heading counts as reached

// Events
// The last section whose heading has passed the offset; at the bottom of the page the short last sections never reach it
const onScroll = () => {
  const { sections } = props.legalDocument
  const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (isAtBottom) {
    activeId.value = sections.at(-1)?.id ?? null
    return
  }
  const reached = sections.filter(section => (document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= ACTIVE_OFFSET)
  activeId.value = reached.at(-1)?.id ?? null
}

useEventListener('scroll', useThrottleFn(onScroll, 100, true), { passive: true })
onMounted(onScroll)
</script>

<template>
  <div>
    <ThePageHero
      :id="props.id"
      :lead="props.legalDocument.lead"
      :text="props.legalDocument.title"
    />
    <p class="sb-overline text-ink-muted text-left mt-6 mb-0">
      {{ t('pages.legal.updated') }}
      <time :datetime="props.updatedIso">{{ updatedLabel }}</time>
    </p>

    <div class="mt-12 pb-24 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-16">
      <nav :aria-labelledby="`${props.id}-toc-title`" class="hidden lg:block lg:sticky lg:top-24">
        <h2 :id="`${props.id}-toc-title`" class="sb-overline text-ink-muted mb-3">
          {{ t('pages.legal.toc') }}
        </h2>
        <ol class="m-0 p-0 list-none border-l border-border">
          <li
            v-for="(section, index) in props.legalDocument.sections"
            :key="section.id"
            class="m-0"
          >
            <a
              :aria-current="activeId === section.id ? 'location' : undefined"
              class="-ml-px flex min-h-11 items-center gap-3 border-l py-1 pl-4 sb-label text-left hyphens-none rounded-sm sb-transition sb-focus"
              :class="activeId === section.id ? 'border-primary text-primary-ink' : 'border-transparent text-ink-muted hover:text-ink'"
              :href="`#${section.id}`"
            >
              <span aria-hidden="true" class="tabular-nums">{{ index + 1 }}.</span>
              {{ section.title }}
            </a>
          </li>
        </ol>
      </nav>

      <div class="min-w-0">
        <section :aria-labelledby="`${props.id}-summary-title`" class="max-w-prose">
          <h2 :id="`${props.id}-summary-title`" class="sb-h3 mb-4 text-balance">
            {{ t('pages.legal.summary') }}
          </h2>
          <BaseRichText :blocks="props.legalDocument.summary" class="text-ink-muted [&_a[href^=mailto]]:block [&_a[href^=mailto]]:w-fit [&_li>strong:first-child]:block [&_li>strong:first-child]:text-left" />
        </section>

        <details class="group mt-10 rounded-lg border border-border bg-surface lg:hidden">
          <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-4 sb-label uppercase text-ink rounded-lg sb-focus [&::-webkit-details-marker]:hidden">
            {{ t('pages.legal.toc') }}
            <Icon
              aria-hidden="true"
              class="size-4 sb-transition group-open:rotate-180"
              name="solar:alt-arrow-down-linear"
            />
          </summary>
          <ol class="m-0 list-none px-4 pb-2">
            <li
              v-for="(section, index) in props.legalDocument.sections"
              :key="section.id"
              class="m-0 border-t border-border"
            >
              <a
                class="flex min-h-11 items-center gap-3 sb-label text-left text-ink-muted hyphens-none hover:text-ink rounded-sm sb-transition sb-focus"
                :href="`#${section.id}`"
              >
                <span aria-hidden="true" class="tabular-nums">{{ index + 1 }}.</span>
                {{ section.title }}
              </a>
            </li>
          </ol>
        </details>

        <div class="mt-14 space-y-12">
          <section
            v-for="(section, index) in props.legalDocument.sections"
            :id="section.id"
            :key="section.id"
            :aria-labelledby="`${section.id}-title`"
            class="max-w-prose scroll-mt-24"
          >
            <h2 :id="`${section.id}-title`" class="sb-h3 mb-4 text-balance">
              <span class="text-primary-ink">{{ index + 1 }}.</span>
              {{ section.title }}
            </h2>
            <BaseRichText :blocks="section.content" class="text-ink-muted [&_a[href^=mailto]]:block [&_a[href^=mailto]]:w-fit [&_li>strong:first-child]:block [&_li>strong:first-child]:text-left" />
          </section>
        </div>

        <div class="mt-16 max-w-prose border-t border-border pt-8">
          <p class="sb-body text-ink-muted text-left mb-6">
            {{ t('pages.legal.questions') }}
          </p>
          <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
            <BaseButton variant="primary" @click="isContactFormOpen = true">
              {{ t('pages.home.contactCard.buttonText') }}
            </BaseButton>
            <NuxtLink
              class="inline-flex min-h-11 items-center gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline rounded-sm sb-transition sb-focus"
              :to="localePath(props.related)"
            >
              {{ t(`nav.${props.related}`) }}
              <Icon aria-hidden="true" class="size-4" name="solar:arrow-right-linear" />
            </NuxtLink>
            <a
              class="inline-flex min-h-11 items-center gap-2 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline rounded-sm sb-transition sb-focus"
              :href="`#${props.id}-hero`"
            >
              {{ t('pages.legal.backToTop') }}
              <Icon aria-hidden="true" class="size-4" name="solar:arrow-up-linear" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
