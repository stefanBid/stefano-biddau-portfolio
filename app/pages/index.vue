<script setup lang="ts">
// Dependencies
const { t, locale } = useI18n()
const route = useRoute()

useSeoMeta({
  // LOCALIZED
  title: () => t('meta.home.title'),
  description: () => t('meta.home.description'),
  ogTitle: () => t('meta.home.title'),
  ogDescription: () => t('meta.home.description'),
  twitterTitle: () => t('meta.home.title'),
  twitterDescription: () => t('meta.home.description'),

  // DYNAMIC BUT NOT TIED TO CONTENT LANGUAGE
  ogUrl: () => `https://stefanobiddau.com${route.fullPath}`,
})

const { el, elStyle } = useTypedText(
  computed(() => [
    t('pages.home.subtitle.typed.0'),
    t('pages.home.subtitle.typed.1'),
    t('pages.home.subtitle.typed.2'),
    t('pages.home.subtitle.typed.3'),
  ]),
  {
    backDelay: 500,
  },
)

// State

const ready = ref(false)
const contactFormIsOpen = ref(false)

const getFile = computed<{ name: string, path: string }>(() => ({
  name: `Stefano_Biddau_CV_${locale.value}.pdf`,
  path: `/files/Stefano_Biddau_CV_${locale.value}.pdf`,
}))
</script>

<template>
  <div>
    <ThePageHero
      id="home"
      image-src="/images/my-avatar.webp"
      lock-scroll
      :text="t('pages.home.hero')"
      @hero-animations-ended="ready = true"
    />
    <section
      v-show="ready"
      :aria-hidden="!ready"
      class="py-20 min-h-[60vh] flex flex-col items-center justify-center"
      :inert="!ready"
    >
      <h2 class="ty-sb-title-xl text-center u-sb-soft-transition">
        {{ t('pages.home.title') }}
      </h2>
      <p class="ty-sb-subtitle-xl font-space-mono text-center mt-2 u-sb-soft-transition min-h-16">
        {{ t('pages.home.subtitle.costant') }}
        <span
          ref="el"
          aria-live="polite"
          class="text-sb-accent"
          :style="elStyle"
        ></span>
      </p>
      <div class="w-full mt-20 grid gap-10 md:gap-12 lg:gap-16 sm:grid-cols-1 lg:grid-cols-2 justify-items-center u-sb-soft-transition">
        <BaseCard
          align="center"
          class="max-w-xl"
          :paragraph="t('pages.home.cvCard.paragraph')"
          :subtitle="t('pages.home.cvCard.subtitle')"
          :title="t('pages.home.cvCard.title')"
          variant="dark-hover"
        >
          <template #card-header>
            <Icon class="size-10 sm:size-12 md:size-14 text-sb-contrast u-sb-soft-transition" name="solar:folder-with-files-bold-duotone" />
          </template>
          <template #card-footer>
            <BaseButton variant="primary" @click.stop="downloadFile(getFile.path, getFile.name)">
              {{ t('pages.home.cvCard.buttonText') }}
            </BaseButton>
          </template>
        </BaseCard>
        <BaseCard
          align="center"
          class="max-w-xl"
          :paragraph="t('pages.home.contactCard.paragraph')"
          :subtitle="t('pages.home.contactCard.subtitle')"
          :title="t('pages.home.contactCard.title')"
          variant="dark-hover"
        >
          <template #card-header>
            <Icon class="size-10 sm:size-12 md:size-14 text-sb-contrast u-sb-soft-transition" name="solar:letter-opened-bold-duotone" />
          </template>
          <template #card-footer>
            <BaseButton variant="primary" @click.stop="contactFormIsOpen = true">
              {{ t('pages.home.contactCard.buttonText') }}
            </BaseButton>
          </template>
        </BaseCard>
      </div>
    </section>
    <!-- Contact Form -->
    <CustomContactForm :open-form="contactFormIsOpen" @close-form="value => contactFormIsOpen = value" />
  </div>
</template>

<style scoped>
/* ===================== Animations ===================== */

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes scale-fade {
  0% {
    opacity: 0;
    transform:  scale(0.9);
  }
  100% {
    opacity: 1;
    transform:  scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out 0.5s forwards; /* 0.5s delay */
}

.animate-scale-fade {
  animation: scale-fade 1.8s ease-out forwards;
}
</style>
