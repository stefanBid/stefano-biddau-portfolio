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
  <footer class="border-t border-sb-border bg-sb-main/95 text-sb-contrast mt-16 px-6 md:px-10">
    <div
      class="max-w-[1400px] mx-auto grid gap-8 md:gap-10
             grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1.8fr)] items-start u-sb-soft-transition py-10 md:py-12"
    >
      <!-- 1) Logo + descrizione -->
      <section class="space-y-4">
        <NuxtLink
          class="inline-flex items-center gap-2 u-sb-soft-transition u-sb-focus rounded hover:opacity-90"
          :to="props.quickLinks[0]?.path || '/'"
        >
          <NuxtImg
            alt="Logo"
            class="object-contain size-7 sm:size-8 md:size-9 u-sb-soft-transition"
            src="/images/logo.webp"
          />
          <span class="ty-sb-title">
            Stefano Biddau
          </span>
        </NuxtLink>

        <p class="ty-sb-label normal-case! text-sb-muted max-w-md u-sb-soft-transition">
          {{ t('footer.tagline') }}
        </p>
      </section>

      <!-- 2) Link veloci -->
      <section class="space-y-3">
        <h2 class="ty-sb-label text-sb-muted uppercase tracking-[0.22em] u-sb-soft-transition">
          {{ t('footer.route-section') }}
        </h2>

        <nav class="flex flex-col gap-2">
          <template v-if="props.quickLinks.length">
            <template v-for="link in props.quickLinks" :key="link.path">
              <NuxtLink
                v-if="!link.disabled"
                class="w-fit ty-sb-label normal-case! text-sb-contrast/80 hover:text-sb-contrast u-sb-soft-transition u-sb-focus rounded"
                :to="link.path"
              >
                {{ link.name }}
              </NuxtLink>
              <span
                v-else
                class="ty-sb-label normal-case! text-sb-contrast/40 cursor-not-allowed u-sb-soft-transition"
              >
                {{ link.name }}
              </span>
            </template>
          </template>
          <p
            v-else
            class="ty-sb-caption text-sb-muted/70 u-sb-soft-transition"
          >
            {{ t('footer.route-fallback') }}
          </p>
        </nav>
      </section>

      <!-- 3) Contact + Social -->
      <section class="space-y-4">
        <h2 class="ty-sb-label text-sb-muted uppercase tracking-[0.22em] u-sb-soft-transition">
          {{ t('footer.contact-section') }}
        </h2>

        <div class="space-y-2">
          <span
            v-if="props.email"
            class="ty-sb-label normal-case! text-sb-contrast/85 u-sb-soft-transition flex items-center"
          >
            <Icon class="size-4.5 inline-block mr-1.5 text-sb-muted" name="solar:letter-opened-bold-duotone" />
            <a
              class="underline underline-offset-4 hover:text-sb-accent u-sb-soft-transition u-sb-focus rounded"
              :href="`mailto:${props.email}`"
            >
              {{ props.email }}
            </a>
          </span>

          <span
            v-if="props.phone"
            class="ty-sb-label normal-case! text-sb-contrast/85 u-sb-soft-transition flex items-center"
          >
            <Icon class="size-4.5 inline-block mr-1.5 text-sb-muted" name="solar:smartphone-2-bold-duotone" />
            <a
              class="underline underline-offset-4 hover:text-sb-accent u-sb-soft-transition u-sb-focus rounded"
              :href="`tel:${props.phone}`"
            >
              {{ props.phone }}
            </a>
          </span>
        </div>

        <!-- Social badges -->
        <div class="flex flex-wrap items-center gap-3 mt-2">
          <a
            v-if="props.githubUrl"
            aria-label="Open GitHub profile"
            class="inline-flex items-center gap-2 rounded-xl bg-sb-surface px-3 py-1.5 border border-sb-border u-sb-soft-transition u-sb-focus hover:bg-sb-surface-2"
            :href="props.githubUrl"
            rel="me noopener noreferrer"
            target="_blank"
          >
            <Icon class="size-4 bg-sb-contrast/85 rounded-full" name="logos:github-icon" />
            <span class="ty-sb-caption text-sb-contrast/85">
              GitHub
            </span>
          </a>

          <a
            v-if="props.linkedinUrl"
            aria-label="Open LinkedIn profile"
            class="inline-flex items-center gap-2 rounded-xl bg-sb-surface px-3 py-1.5 border border-sb-border u-sb-soft-transition u-sb-focus hover:bg-sb-surface-2"
            :href="props.linkedinUrl"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon class="size-4" name="logos:linkedin-icon" />
            <span class="ty-sb-caption text-sb-contrast/85">
              LinkedIn
            </span>
          </a>

          <a
            v-if="props.instagramUrl"
            aria-label="Open Instagram profile"
            class="inline-flex items-center gap-2 rounded-xl bg-sb-surface px-3 py-1.5 border border-sb-border u-sb-soft-transition u-sb-focus hover:bg-sb-surface-2"
            :href="props.instagramUrl"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon class="size-4 bg-sb-contrast/85 rounded-xl" name="logos:instagram-icon" />
            <span class="ty-sb-caption text-sb-contrast/85">
              Instagram
            </span>
          </a>
        </div>
      </section>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-sb-border bg-sb-main/98">
      <div
        class="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex flex-col lg:flex-row items-center justify-between gap-2 u-sb-soft-transition"
      >
        <!-- Left side: credit + made with -->
        <div class="flex flex-col flex-1 items-center lg:items-start gap-1 ty-sb-caption text-sb-muted text-center lg:text-left u-sb-soft-transition">
          <p>
            {{ t('footer.credit-section', { year: new Date().getFullYear() }) }}
          </p>

          <p class="text-sb-muted/80">
            {{ t('footer.made-with') }}
          </p>
        </div>

        <!-- Right side: legal links -->
        <div class="flex flex-1 items-center justify-center lg:justify-end gap-4 ty-sb-caption text-sb-muted/80 not-italic text-center lg:text-right u-sb-soft-transition">
          <!-- Privacy -->
          <NuxtLink
            class="hover:text-sb-accent underline underline-offset-4 u-sb-focus rounded w-fit u-sb-soft-transition"
            :to="localePath('privacy-policy')"
          >
            {{ t('nav.privacy-policy') }}
          </NuxtLink>

          <!-- Separator -->
          <span class="opacity-40 select-none">|</span>

          <!-- Terms -->
          <NuxtLink
            class="hover:text-sb-accent underline underline-offset-4 u-sb-focus rounded w-fit u-sb-soft-transition"
            :to="localePath('terms-and-conditions')"
          >
            {{ t('nav.terms-and-conditions') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
