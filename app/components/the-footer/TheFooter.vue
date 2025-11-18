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
  <footer class="border-t border-sb-border bg-sb-main/95 text-sb-contrast mt-16">
    <div
      class="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-12 lg:py-14 grid gap-10 md:gap-8 lg:gap-12
             grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1.8fr)] items-start u-sb-soft-transition"
    >
      <!-- 1) Logo + descrizione -->
      <section class="space-y-4">
        <NuxtLink
          class="inline-flex items-center gap-2 u-sb-soft-transition u-sb-focus rounded-xl hover:opacity-90"
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
                class="w-fit ty-sb-label normal-case! text-sb-contrast/80 hover:text-sb-contrast u-sb-soft-transition u-sb-focus rounded-md "
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
              class="underline underline-offset-4 hover:text-sb-accent u-sb-soft-transition u-sb-focus"
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
              class="underline underline-offset-4 hover:text-sb-accent u-sb-soft-transition u-sb-focus"
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
            :href="githubUrl"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon class="size-4" name="mdi:github" />
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
            <Icon class="size-4" name="mdi:linkedin" />
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
            <Icon class="size-4" name="mdi:instagram" />
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
        class="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2"
      >
        <p class="ty-sb-caption text-sb-muted text-center sm:text-left">
          {{ t('footer.credit-section', { year: new Date().getFullYear() }) }}
        </p>
        <p class="ty-sb-caption text-sb-muted/80 text-center sm:text-right">
          {{ t('footer.made-with') }}
        </p>
      </div>
    </div>
  </footer>
</template>
