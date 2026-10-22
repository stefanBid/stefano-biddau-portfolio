<script setup lang="ts">
interface TheFooterProps {
  quickLinks?: Array<RouteItem>
  phone?: string
  email?: string
  githubUrl?: string
  linkedinUrl?: string
  instagramUrl?: string
}

// Dependencies
const { t } = useI18n()
const localePath = useLocalePath()

// Input / Output
const props = withDefaults(defineProps<TheFooterProps>(), {
  quickLinks: () => [],
  phone: undefined,
  email: undefined,
  githubUrl: undefined,
  linkedinUrl: undefined,
  instagramUrl: undefined,
})
</script>

<template>
  <footer class="border-t border-border bg-bg/95 text-ink mt-16 px-6 md:px-10">
    <div
      class="max-w-350 mx-auto grid gap-8 md:gap-10
             grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1.8fr)] items-start py-10 md:py-12"
    >
      <!-- 1) Logo + descrizione -->
      <section class="space-y-4">
        <NuxtLink
          class="inline-flex items-center gap-2 sb-transition sb-focus rounded-sm hover:opacity-90"
          :to="props.quickLinks[0]?.path || '/'"
        >
          <NuxtImg
            alt="Logo"
            class="object-contain size-7 sm:size-8 md:size-9"
            src="/images/logo.webp"
          />
          <span class="sb-h3">
            Stefano Biddau
          </span>
        </NuxtLink>

        <p class="sb-overline normal-case! text-ink-muted max-w-md">
          {{ t('footer.tagline') }}
        </p>
      </section>

      <!-- 2) Link veloci -->
      <section class="space-y-3">
        <h2 class="sb-label uppercase text-ink-muted tracking-[0.22em]">
          {{ t('footer.routeSection') }}
        </h2>

        <nav class="flex flex-col gap-2">
          <template v-if="props.quickLinks.length">
            <template v-for="link in props.quickLinks" :key="link.path">
              <NuxtLink
                v-if="!link.disabled"
                class="w-fit sb-overline normal-case! text-ink/80 hover:text-ink sb-transition sb-focus rounded-sm"
                :to="link.path"
              >
                {{ link.name }}
              </NuxtLink>
              <span
                v-else
                class="sb-overline normal-case! text-ink/40 cursor-not-allowed"
              >
                {{ link.name }}
              </span>
            </template>
          </template>
          <p
            v-else
            class="sb-small italic text-ink-muted/70"
          >
            {{ t('footer.routeFallback') }}
          </p>
        </nav>
      </section>

      <!-- 3) Contact + Social -->
      <section class="space-y-4">
        <h2 class="sb-label uppercase text-ink-muted tracking-[0.22em]">
          {{ t('footer.contactSection') }}
        </h2>

        <div class="space-y-2">
          <span
            v-if="props.email"
            class="sb-overline normal-case! text-ink/85 flex items-center"
          >
            <Icon class="size-4.5 inline-block mr-1.5 text-ink-muted" name="solar:letter-opened-bold-duotone" />
            <a
              class="underline underline-offset-4 hover:text-primary sb-transition sb-focus rounded-sm"
              :href="`mailto:${props.email}`"
            >
              {{ props.email }}
            </a>
          </span>

          <span
            v-if="props.phone"
            class="sb-overline normal-case! text-ink/85 flex items-center"
          >
            <Icon class="size-4.5 inline-block mr-1.5 text-ink-muted" name="solar:smartphone-2-bold-duotone" />
            <a
              class="underline underline-offset-4 hover:text-primary sb-transition sb-focus rounded-sm"
              :href="`tel:${props.phone}`"
            >
              {{ props.phone }}
            </a>
          </span>
        </div>

        <!-- Social badges -->
        <div class="flex flex-wrap items-center gap-3 mt-2">
          <BaseChip
            v-if="props.githubUrl"
            icon="mdi:github"
            :linkable="{
              href: props.githubUrl,
              target: '_blank',
              rel: 'me noopener noreferrer',
            }"
            text="GitHub"
            variant="secondary"
          />

          <BaseChip
            v-if="props.linkedinUrl"
            icon="mdi:linkedin"
            :linkable="{
              href: props.linkedinUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
            }"
            text="LinkedIn"
            variant="secondary"
          />

          <BaseChip
            v-if="props.instagramUrl"
            icon="mdi:instagram"
            :linkable="{
              href: props.instagramUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
            }"
            text="Instagram"
            variant="secondary"
          />
        </div>
      </section>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-border bg-bg/98">
      <div
        class="max-w-350 mx-auto px-6 md:px-10 py-4 flex flex-col lg:flex-row items-center justify-between gap-2"
      >
        <!-- Left side: credit + made with -->
        <div class="flex flex-col flex-1 items-center lg:items-start gap-1 text-ink-muted text-center lg:text-left [&>p]:mb-0">
          <p class="sb-small italic">
            {{ t('footer.creditSection', { year: new Date().getFullYear() }) }}
          </p>

          <p class="sb-small italic text-ink-muted/80">
            {{ t('footer.madeWith') }}
          </p>
        </div>

        <!-- Right side: legal links -->
        <div class="flex flex-1 items-center justify-center lg:justify-end gap-4 sb-small italic text-ink-muted/80 not-italic text-center lg:text-right">
          <!-- Privacy -->
          <NuxtLink
            class="hover:text-primary underline underline-offset-4 sb-focus rounded-sm w-fit sb-transition"
            :to="localePath('privacy-policy')"
          >
            {{ t('nav.privacy-policy') }}
          </NuxtLink>

          <!-- Separator -->
          <span class="sb-small italic not-italic opacity-40 select-none">|</span>

          <!-- Terms -->
          <NuxtLink
            class="hover:text-primary underline underline-offset-4 sb-focus rounded-sm w-fit sb-transition"
            :to="localePath('terms-and-conditions')"
          >
            {{ t('nav.terms-and-conditions') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
