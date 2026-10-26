<script setup lang="ts">
interface CustomClosingCtaProps {
  showProjectsLink?: boolean
}

// Dependencies
const { t } = useI18n()
const localePath = useLocalePath()
const { cvItems } = useContact()

// Input / Output
const props = withDefaults(defineProps<CustomClosingCtaProps>(), {
  showProjectsLink: false,
})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'contact'): void
}>()

// Data
const CONTACT_EMAIL = 'biddau.stefano99@gmail.com'
</script>

<template>
  <section aria-labelledby="closing-cta-title" class="pb-24">
    <div class="grid items-center overflow-hidden rounded-xl border border-border bg-surface md:grid-cols-[1.6fr_1fr]">
      <div class="flex flex-col items-start p-6 md:p-12">
        <h2 id="closing-cta-title" class="mb-0 text-balance">
          {{ t('pages.home.closingCta.title') }}
        </h2>
        <p class="sb-lead text-ink-muted text-left mt-4 mb-0 max-w-xl">
          {{ t('pages.home.closingCta.text') }}
        </p>
        <div class="mt-8 grid w-fit grid-cols-1 gap-4 sm:flex">
          <BaseButton variant="primary" @click="emit('contact')">
            {{ t('pages.home.contactCard.buttonText') }}
          </BaseButton>
          <BaseMenu
            icon="solar:download-minimalistic-bold-duotone"
            :items="cvItems"
            :label="t('pages.home.cvCard.buttonText')"
            placement="bottom-start"
          />
        </div>
        <p class="sb-body text-ink-muted text-left mt-6 mb-0">
          {{ t('pages.home.closingCta.emailPrefix') }}
          <a
            class="block w-fit hyphens-none text-primary-ink underline underline-offset-4 rounded-sm hover:text-primary-ink-hover sb-transition sb-focus sm:inline"
            :href="`mailto:${CONTACT_EMAIL}`"
          >{{ CONTACT_EMAIL.split('@')[0] }}<wbr />@{{ CONTACT_EMAIL.split('@')[1] }}</a>
        </p>
        <NuxtLink
          v-if="props.showProjectsLink"
          class="inline-flex items-center min-h-11 gap-2 mt-6 sb-label uppercase text-ink-muted hover:text-ink underline-offset-4 hover:underline sb-transition sb-focus rounded-sm"
          :to="localePath('my-projects')"
        >
          {{ t('pages.home.closingCta.projectsLink') }}
          <Icon aria-hidden="true" class="size-4" name="solar:arrow-right-linear" />
        </NuxtLink>
      </div>
      <div class="hidden md:flex justify-center self-end pt-8">
        <NuxtImg
          alt=""
          class="w-56 lg:w-64 h-auto"
          :height="1536"
          loading="lazy"
          provider="none"
          src="/images/3d-avatar/avatar-pose-2.webp"
          :width="1024"
        />
      </div>
    </div>
  </section>
</template>
