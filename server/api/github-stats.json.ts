interface GithubUserResponse {
  login: string
  html_url: string
  public_repos: number
  created_at: string
}

interface GithubRepoResponse {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  fork: boolean
  pushed_at: string
}

interface GithubContributionsResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: { totalContributions: number }
      }
    } | null
  }
}

const GITHUB_LOGIN = 'stefanBid'
const TOP_REPOS_COUNT = 3

const _fullYearsSince = (isoDate: string): number => {
  const from = new Date(isoDate)
  const now = new Date()
  const years = now.getUTCFullYear() - from.getUTCFullYear()
  const anniversaryPassed = now.getUTCMonth() > from.getUTCMonth()
    || (now.getUTCMonth() === from.getUTCMonth() && now.getUTCDate() >= from.getUTCDate())
  return anniversaryPassed ? years : years - 1
}

const _fetchContributions = async (headers: Record<string, string>): Promise<number | null> => {
  // GraphQL refuses anonymous requests: without a token the stat is simply left out
  if (!headers.Authorization) {
    return null
  }

  try {
    const response = await $fetch<GithubContributionsResponse>('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: {
        query: 'query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { totalContributions } } } }',
        variables: { login: GITHUB_LOGIN },
      },
    })
    return response.data?.user?.contributionsCollection.contributionCalendar.totalContributions ?? null
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.warn('[github-stats] Contributions unavailable:', error)
    return null
  }
}

// Prerendered to a static file at build time (see routeRules), so GitHub is queried once per deploy
export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig(event)

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'stefanobiddau.com',
  }
  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`
  }

  try {
    const [user, repos, contributionsLastYear] = await Promise.all([
      $fetch<GithubUserResponse>(`https://api.github.com/users/${GITHUB_LOGIN}`, { headers }),
      $fetch<GithubRepoResponse[]>(`https://api.github.com/users/${GITHUB_LOGIN}/repos`, {
        headers,
        query: { per_page: 100, type: 'owner' },
      }),
      _fetchContributions(headers),
    ])

    const ownRepos = repos.filter(repo => !repo.fork)

    const topRepos = [...ownRepos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at))
      .slice(0, TOP_REPOS_COUNT)
      .map(repo => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
      }))

    return {
      stats: {
        login: user.login,
        profileUrl: user.html_url,
        publicRepos: user.public_repos,
        totalStars: ownRepos.reduce((total, repo) => total + repo.stargazers_count, 0),
        yearsOnGithub: _fullYearsSince(user.created_at),
        contributionsLastYear,
        topRepos,
      },
    }
  }
  catch (error) {
    // A GitHub outage or rate limit must not fail the deploy: the home page hides the section instead
    // eslint-disable-next-line no-console
    console.warn('[github-stats] GitHub API unavailable, shipping without GitHub stats:', error)
    return { stats: null }
  }
})
