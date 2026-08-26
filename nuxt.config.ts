// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // ---------------------------------------------------------------------------
  // Modules
  // ---------------------------------------------------------------------------
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@vueuse/nuxt', '@nuxtjs/i18n', '@nuxt/fonts', '@nuxtjs/color-mode'],

  // ---------------------------------------------------------------------------
  // Environment overrides — merged in based on the actual Nuxt CLI command
  // (`nuxt dev` → $development, `nuxt build`/`generate` → $production), not `process.env.NODE_ENV`
  // ---------------------------------------------------------------------------
  $development: {
    devtools: { enabled: true },
  },
  $production: {
    devtools: { enabled: false },
  },

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------
  ssr: true,

  // ---------------------------------------------------------------------------
  // App & Head
  // ---------------------------------------------------------------------------
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        // Mobile responsiveness
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // Disabled automatic detection of possible phone numbers on IOS devices
        { name: 'format-detection', content: 'telephone=no' },

        // Browser bar color on mobile devices
        { name: 'theme-color', content: '#0f0f20' },

        // Global Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Stefano Biddau' },
        { property: 'og:image', content: 'https://stefanobiddau.com/images/card-logo.jpg' },

        // Global Twitter (not tied to content)
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: 'https://stefanobiddau.com/images/card-logo.jpg' },
      ],
      link: [
        // Global favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  colorMode: {
    classSuffix: '',
    // Fixed, no OS-following and no toggle — this app is always dark (see CLAUDE.md)
    preference: 'dark',
    fallback: 'dark',
  },

  // ---------------------------------------------------------------------------
  // Runtime config & routing
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    public: {
      siteUrl: 'https://stefanobiddau.com',
      emailjsPublicKey: process.env.NUXT_EMAILJS_PUBLIC_KEY,
      emailjsServiceId: process.env.NUXT_EMAILJS_SERVICE_ID,
      emailjsTemplateAdminId: process.env.NUXT_EMAILJS_TEMPLATE_ADMIN_ID,
      emailjsTemplateReplyToId: process.env.NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID,
    },
  },
  routeRules: {
    // EN
    '/': { prerender: true },
    '/about-me': { prerender: true },
    '/my-skills': { prerender: true },
    '/my-projects': { prerender: true },
    '/privacy-policy': { prerender: true },
    '/terms-and-conditions': { prerender: true },

    // IT
    '/it': { prerender: true },
    '/it/about-me': { prerender: true },
    '/it/my-skills': { prerender: true },
    '/it/my-projects': { prerender: true },
    '/it/privacy-policy': { prerender: true },
    '/it/terms-and-conditions': { prerender: true },

    // Dynamic, must run per-request — never prerender
    '/robots.txt': { prerender: false },
  },

  // ---------------------------------------------------------------------------
  // Build & server
  // ---------------------------------------------------------------------------
  sourcemap: {
    client: false,
    server: false,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'netlify',
    // Exclude isomorphic-dompurify from server bundle to avoid jsdom issues
    externals: {
      external: ['isomorphic-dompurify'],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod',
        'typed.js',
        '@emailjs/browser',
        '@floating-ui/vue',
        'isomorphic-dompurify',
      ],
    },
  },
  hooks: {
    'build:before': () => {
      // `build:before` also fires during `nuxt prepare` (the postinstall script,
      // so on every `npm ci`) — guard on Netlify's real production context only,
      // otherwise CI and a fresh `npm install` without a local .env always fail.
      if (process.env.CONTEXT !== 'production') {
        return
      }

      const requiredEnvVars = [
        'NUXT_EMAILJS_PUBLIC_KEY',
        'NUXT_EMAILJS_SERVICE_ID',
        'NUXT_EMAILJS_TEMPLATE_ADMIN_ID',
        'NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID',
      ]

      const missing = requiredEnvVars.filter(key => !process.env[key])

      if (missing.length > 0) {
        throw new Error(`Missing required EmailJS environment variable(s): ${missing.join(', ')}. Set them before building — the contact form depends on them.`)
      }
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  fonts: {
    families: [
      { name: 'Bebas Neue', provider: 'google', weights: [400] },
      { name: 'Space Mono', provider: 'google', weights: [400, 700] },
    ],
  },
  i18n: {
    baseUrl: 'https://stefanobiddau.com',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',

    locales: [
      { code: 'en', iso: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'it', iso: 'it-IT', language: 'it-IT', name: 'Italiano', file: 'it.json' },
    ],
    langDir: 'locales/',
    detectBrowserLanguage: false,
  },
  icon: {
    mode: 'svg',
    serverBundle: 'local',
    fallbackToApi: false,
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 256,
    },
  },
  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp', 'avif', 'png'],
    screens: { 'sm': 640, 'md': 768, 'lg': 1024, 'xl': 1280, '2xl': 1536 },
  },
})
