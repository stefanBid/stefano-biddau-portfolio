// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@vueuse/nuxt', '@nuxtjs/i18n'],
  ssr: true,
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  app: {
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
        { property: 'og:image', content: 'https://www.stefanobiddau.com/images/card-logo.jpg' },

        // Global Twitter (not tied to content)
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: 'https://www.stefanobiddau.com/images/card-logo.jpg' },
      ],
      link: [
        // Global favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  css: ['./app/assets/css/main.css'],
  runtimeConfig: {
    public: {
      emailjsPublicKey: process.env.NUXT_EMAILJS_PUBLIC_KEY,
      emailjsServiceId: process.env.NUXT_EMAILJS_SERVICE_ID,
      emailjsTemplateAdminId: process.env.NUXT_EMAILJS_TEMPLATE_ADMIN_ID,
      emailjsTemplateReplyToId: process.env.NUXT_EMAILJS_TEMPLATE_REPLY_TO_ID,
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL,
    },
  },

  routeRules: {
    // EN
    '/': { prerender: true },
    '/about-me': { prerender: true },
    '/privacy-policy': { prerender: true },
    '/terms-and-conditions': { prerender: true },

    // IT
    '/it': { prerender: true },
    '/it/about-me': { prerender: true },
    '/it/privacy-policy': { prerender: true },
    '/it/terms-and-conditions': { prerender: true },
  },
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
  },
  eslint: {
    config: {
      stylistic: true,

    },
  },
  i18n: {
    baseUrl: 'https://www.stefanobiddau.com',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',

    locales: [
      { code: 'en', iso: 'en-US', language: 'en-US', name: 'English', file: 'en.json' },
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
    provider: process.env.NETLIFY ? 'ipx' : 'ipx',
    providers: {
      cloudinary: {
        name: 'cloudinary',
        options: {
          baseURL: process.env.NUXT_PUBLIC_CLOUDINARY_BASE,
        },
      },
    },
    domains: [
      process.env.NUXT_PUBLIC_STRAPI_URL || '',
    ],
    quality: 80,
    format: ['webp', 'avif', 'png'],
    screens: { 'sm': 640, 'md': 768, 'lg': 1024, 'xl': 1280, '2xl': 1536 },
  },
})
