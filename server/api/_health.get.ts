// server/api/_health.get.ts

// Health check endpoint for external monitoring.
// It reports:
// - app status (this Nuxt app running on Netlify)
// - Strapi status (via Strapi's /api/health endpoint)

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const now = new Date()

  // ───────────────────────────────── App health ─────────────────────────────────
  const app = {
    status: 'ok' as const,
    uptimeSeconds: process.uptime(),
    timestamp: now.toISOString(),
    nodeEnv: process.env.NODE_ENV ?? 'unknown',
  }

  // ───────────────────────────────── Strapi health ──────────────────────────────
  const strapiUrl = config.public.strapiUrl

  let strapiStatus: 'ok' | 'down' | 'disabled' = 'disabled'
  let strapiLatencyMs: number | null = null
  let strapiError: string | null = null

  if (strapiUrl) {
    strapiStatus = 'down' // default until proven ok

    try {
      const t0 = Date.now()

      // Calls your Strapi health endpoint: GET /api/health
      const result = await $fetch<{ status: string }>(`${strapiUrl}/api/health`, {
        method: 'GET',
        timeout: 3000, // 3 seconds timeout
      })

      strapiLatencyMs = Date.now() - t0
      strapiStatus = result?.status === 'ok' ? 'ok' : 'down'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
      strapiLatencyMs = null
      strapiError = err?.message ?? 'Unknown error'
    }
  }

  // ─────────────────────────────── Overall status ───────────────────────────────
  // "ok"       → app ok AND Strapi ok/disabled
  // "degraded" → app ok BUT Strapi down
  const status
    = app.status === 'ok' && (strapiStatus === 'ok' || strapiStatus === 'disabled')
      ? 'ok'
      : 'degraded'

  return {
    status,
    app,
    strapi: {
      enabled: Boolean(strapiUrl),
      status: strapiStatus,
      latencyMs: strapiLatencyMs,
      error: strapiError,
    },
  }
})
