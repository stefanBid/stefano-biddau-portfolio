<script setup lang="ts">
interface CustomGithubStatsProps {
  stats: GithubStats
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = defineProps<CustomGithubStatsProps>()

// Data
const statRows = computed(() => [
  props.stats.contributionsLastYear !== null && { key: 'contributions', value: props.stats.contributionsLastYear },
  { key: 'publicRepos', value: props.stats.publicRepos },
  { key: 'stars', value: props.stats.totalStars },
  { key: 'years', value: props.stats.yearsOnGithub },
].filter(row => row !== false))
</script>

<template>
  <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
    <div>
      <h3 class="sb-label uppercase text-ink-muted mb-3">
        {{ t('pages.home.github.statsTitle') }}
      </h3>
      <dl class="m-0 border-t border-border md:grid md:grid-cols-4 md:gap-x-6 md:border-t-0 lg:grid-cols-2">
        <div
          v-for="row in statRows"
          :key="row.key"
          class="flex items-baseline justify-between gap-6 py-4 border-b border-border md:flex-col-reverse md:items-start md:justify-end md:gap-1 md:py-5 md:border-t md:border-b-0"
        >
          <dt class="sb-body text-ink">
            {{ t(`pages.home.github.stats.${row.key}`) }}
          </dt>
          <dd class="sb-h3 m-0" :class="row.key === 'contributions' ? 'text-primary-ink' : 'text-ink'">
            <BaseCountUp :value="row.value" />
          </dd>
        </div>
      </dl>
    </div>

    <div v-if="props.stats.topRepos.length">
      <h3 class="sb-label uppercase text-ink-muted mb-3">
        {{ t('pages.home.github.reposTitle') }}
      </h3>
      <ul class="m-0 p-0 list-none border-t border-border">
        <li
          v-for="repo in props.stats.topRepos"
          :key="repo.name"
          class="border-b border-border"
        >
          <a
            class="group flex flex-col gap-1 py-4 md:py-5 text-left hyphens-none rounded-sm sb-transition sb-focus"
            :href="repo.url"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span class="flex items-center justify-between gap-4">
              <span class="inline-flex min-w-0 items-center gap-2 sb-body-strong text-ink group-hover:text-primary-ink sb-transition">
                <span class="truncate">{{ repo.name }}</span>
                <Icon
                  aria-hidden="true"
                  class="size-4 shrink-0"
                  name="solar:arrow-right-up-linear"
                />
                <span class="sr-only">({{ t('a11y.newTab') }})</span>
              </span>
              <span class="inline-flex shrink-0 items-center gap-1 sb-small text-ink-muted tabular-nums">
                <Icon
                  aria-hidden="true"
                  class="size-4 text-primary-ink"
                  name="solar:star-bold-duotone"
                />
                <span aria-hidden="true">{{ repo.stars }}</span>
                <span class="sr-only">{{ t('pages.home.github.starsCount', repo.stars) }}</span>
              </span>
            </span>
            <span v-if="repo.description" class="sb-small text-ink-muted line-clamp-2">
              {{ repo.description }}
            </span>
            <span v-if="repo.language" class="sb-small text-ink-muted">
              {{ repo.language }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
