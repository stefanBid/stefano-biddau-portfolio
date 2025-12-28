// server/api/sb-projects.get.ts

// This endpoint acts as a proxy between your Nuxt app and Strapi.
// It also applies server-side caching via cachedEventHandler,
// which improves performance and reduces the number of calls to Strapi.

export default cachedEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const baseUrl = config.public.strapiUrl

  if (!baseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'STRAPI_URL_NOT_CONFIGURED',
    })
  }

  // Build Strapi API URL
  const strapiUrl = `${baseUrl}/api/sb-projects`

  // Determine locale
  const locale = typeof query.locale === 'string' ? query.locale : 'en'

  // Forward request to Strapi
  const response = await $fetch(strapiUrl, {
    params: {
      'locale': locale,
      'sort': 'createdAt:asc',
      'populate': '*',
      'pagination[pageSize]': 100, // Explicitly fetch all projects (adjust based on your needs)
    },
    timeout: 15000,
  })

  return response
}, {
  // Cache the response server-side for 6 hours.
  // Netlify Functions + Nitro will keep this cached as long as the function stays warm.
  maxAge: 60 * 60 * 6, // 6 hours

  // Serve stale data while revalidating in background.
  swr: true,

  // Generate cache key based on locale to avoid mixing different languages
  getKey: (event) => {
    const query = getQuery(event)
    const locale = typeof query.locale === 'string' ? query.locale : 'en'
    return `sb-projects-${locale}`
  },
})
