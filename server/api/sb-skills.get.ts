// server/api/sb-skills.get.ts

// Proxy endpoint for Strapi skills with filters and pagination.
// Supports:
// - name search (case-insensitive)
// - type filtering (single or multiple)
// - pagination

const DEFAULT_PAGE_SIZE = 12
const DEFAULT_STARTING_PAGE = 1

export default defineEventHandler(async (event) => {
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
  const strapiUrl = `${baseUrl}/api/sb-skills`

  // Filters
  const nameFilter = typeof query.name === 'string' ? query.name : ''

  const rawTypes = query.type
  const types = Array.isArray(rawTypes)
    ? rawTypes
    : typeof rawTypes === 'string' && rawTypes.length > 0
      ? rawTypes.split(',').map(item => item.trim()).filter(Boolean)
      : []

  // Pagination
  const page = Number.parseInt(typeof query.page === 'string' ? query.page : '', 10)
  const pageSize = Number.parseInt(typeof query.pageSize === 'string' ? query.pageSize : '', 10)

  // Flattened params to avoid JSON encoding for Strapi
  const params: Record<string, string | number | string[] | undefined> = {
    'populate': '*',
    'sort': 'name:asc',
    'pagination[page]': Number.isFinite(page) && page > 0 ? page : DEFAULT_STARTING_PAGE,
    'pagination[pageSize]': Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE,
  }

  if (nameFilter) {
    params['filters[name][$containsi]'] = nameFilter
  }

  if (types.length > 0) {
    params['filters[type][$in]'] = types
  }

  // Forward request to Strapi
  const response = await $fetch(strapiUrl, {
    params,
    timeout: 15000,
  })

  return response
})
