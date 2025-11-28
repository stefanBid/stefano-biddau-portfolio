<script setup lang="ts">
// Dependencies
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.skills.title'),
  description: () => t('meta.skills.description'),
  ogTitle: () => t('meta.skills.ogTitle'),
  ogDescription: () => t('meta.skills.description'),
  twitterTitle: () => t('meta.skills.ogTitle'),
  twitterDescription: () => t('meta.skills.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://www.stefanobiddau.com${route.fullPath}`,
})

const frontendIcons = [
  'logos:javascript',
  'logos:typescript-icon',
  'logos:vue',
  'logos:nodejs-icon',
  'logos:nuxt-icon',
  'logos:html-5',
  'logos:css-3',
  'logos:flutter',
]
</script>

<template>
  <div>
    <ThePageHero
      id="my-skills"
      :text="t('pages.skills.hero')"
    />
    <section aria-label="Skills and Technologies" class=" w-full py-20 flex  flex-col gap-20">
      <BaseCard
        v-for="value in 3"
        :key="value"
        class="p-0!"
        full-custom-content
        variant="dark"
      >
        <div class="h-[450px] relative  flex items-center overflow-hidden">
          <!-- Contenuto a sinistra -->
          <div class="flex flex-col h-full justify-center z-10 p-4 md:p-6 bg-sb-surface/60 rounded-xl u-sb-soft-transition">
            <h2
              class="ty-sb-title u-sb-soft-transition"
            >
              Skill Category {{ value }}
            </h2>
            <p
              class="ty-sb-paragraph text-justify mt-3 md:mt-4 u-sb-soft-transition"
            >
              Descrizione della skill e delle tecnologie usate.
            </p>
            <div>
              <BaseButton variant="primary">
                Scopri di più
              </BaseButton>
            </div>
          </div>
          <!-- Sistema solare a destra, metà visibile -->
          <div class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] flex items-center justify-end pointer-events-none ">
            <CustomSolarSystem :planets-icon="frontendIcons" />
          </div>
        </div>
      </BaseCard>
    </section>
  </div>
</template>
