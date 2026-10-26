<script setup lang="ts">
import useSkillReferences from '~/composables/data/useSkillReferences'
import useSkills from '~/composables/data/useSkills'
import type { SkillTier } from '~/composables/data/useSkills'

definePageMeta({
  sitemap: { lastmod: '2026-04-12', changefreq: 'monthly', priority: 0.9 },
})

// Dependencies
const { t } = useI18n()
const route = useRoute()
const { areas } = useSkills()
const { referencesByArea } = useSkillReferences()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.skills.title'),
  description: () => t('meta.skills.description'),
  ogTitle: () => t('meta.skills.title'),
  ogDescription: () => t('meta.skills.description'),
  twitterTitle: () => t('meta.skills.title'),
  twitterDescription: () => t('meta.skills.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})

// Data
const TIERS: SkillTier[] = ['core', 'solid', 'familiar']

const activeSkillId = ref<string | null>(null)
const contactFormIsOpen = ref<boolean>(false)

// Events
const onHighlightSkill = (id: string | null) => {
  activeSkillId.value = id
}
</script>

<template>
  <div>
    <ThePageHero
      id="my-skills"
      image-src="/images/3d-avatar/avatar-pose-1.webp"
      :lead="t('pages.skills.lead')"
      :text="t('pages.skills.hero')"
    />

    <div :aria-label="t('a11y.skillTiersLegend')" class="py-8 border-b border-border" role="group">
      <dl class="grid gap-4 m-0 md:grid-cols-3 md:gap-10">
        <div
          v-for="tier in TIERS"
          :key="tier"
          class="flex items-start gap-3"
        >
          <CustomSkillsTierIcon class="mt-0.5" :tier="tier" />
          <div>
            <dt class="sb-label uppercase text-ink">
              {{ t(`pages.skills.tiers.${tier}.label`) }}
            </dt>
            <dd class="sb-small text-ink-muted text-left m-0 mt-1">
              {{ t(`pages.skills.tiers.${tier}.description`) }}
            </dd>
          </div>
        </div>
      </dl>
    </div>

    <section
      v-for="(area, index) in areas"
      :key="area.key"
      :aria-labelledby="`skills-${area.key}-title`"
      class="grid items-center gap-12 py-16 border-b border-border md:py-20 lg:gap-16"
      :class="index % 2 === 1 ? 'lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)]' : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]'"
    >
      <div :class="index % 2 === 1 && 'lg:order-2'">
        <h2 :id="`skills-${area.key}-title`" class="mb-0 text-balance">
          {{ t(`pages.skills.areas.${area.key}.title`) }}
        </h2>
        <p class="sb-body text-ink-muted text-left text-pretty hyphens-none mt-4 mb-0 max-w-2xl">
          {{ t(`pages.skills.areas.${area.key}.paragraph`) }}
        </p>
        <p v-if="referencesByArea[area.key].length" class="sb-small text-ink-muted text-left hyphens-none mt-4 mb-0">
          {{ t('pages.skills.seenIn') }}
          <template v-for="(item, itemIndex) in referencesByArea[area.key]" :key="item.key">
            <NuxtLink
              class="text-primary-ink underline underline-offset-4 rounded-sm hover:text-primary-ink-hover sb-transition sb-focus"
              :to="item.to"
            >
              {{ item.title }}
            </NuxtLink><span v-if="itemIndex < referencesByArea[area.key].length - 1">, </span>
          </template>
        </p>

        <div class="flex flex-col gap-8 mt-10">
          <div v-for="tier in area.tiers" :key="tier.key">
            <h3
              :id="`skills-${area.key}-${tier.key}`"
              class="flex items-center gap-2 sb-label uppercase text-ink mb-3"
            >
              <CustomSkillsTierIcon :tier="tier.key" />
              {{ t(`pages.skills.tiers.${tier.key}.label`) }}
              <span aria-hidden="true" class="text-ink-muted">· {{ tier.skills.length }}</span>
            </h3>
            <ul
              :aria-labelledby="`skills-${area.key}-${tier.key}`"
              class="flex flex-wrap gap-2 m-0 p-0 list-none"
              @mouseleave="onHighlightSkill(null)"
            >
              <li
                v-for="skill in tier.skills"
                :key="skill.id"
                @mouseenter="onHighlightSkill(skill.id)"
              >
                <CustomSkillsChip
                  :gold="skill.tier === 'core'"
                  :icon="skill.icon"
                  :name="skill.name"
                  :on-light="skill.onLight"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <figure aria-hidden="true" class="hidden m-0 lg:block" :class="index % 2 === 1 && 'lg:order-1'">
        <CustomSolarSystem :active-id="activeSkillId" :tiers="area.tiers" />
        <figcaption class="sb-small italic text-ink-muted text-center mt-4">
          {{ t('pages.skills.orbitCaption') }}
        </figcaption>
      </figure>
    </section>

    <div class="pt-24">
      <CustomClosingCta show-projects-link @contact="contactFormIsOpen = true" />
    </div>

    <LazyCustomContactForm :open-form="contactFormIsOpen" @close-form="value => contactFormIsOpen = value" />
  </div>
</template>
