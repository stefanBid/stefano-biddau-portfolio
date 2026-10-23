// composables/data/useGithubStats.ts

export default async function useGithubStats(): Promise<{ stats: ComputedRef<GithubStats | null> }> {
  const { data } = await useFetch('/api/github-stats.json', { key: 'github-stats' })

  // State
  const stats = computed<GithubStats | null>(() => data.value?.stats ?? null)

  return {
    stats,
  }
}
