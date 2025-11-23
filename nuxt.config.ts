// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@vueuse/nuxt', '@nuxtjs/i18n'],
  devtools: { enabled: true },
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
  sourcemap: {
    client: false,
    server: false,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'netlify',
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  icon: {
    mode: 'css',
    cssLayer: 'base',
  },
  image: {
    provider: process.env.NETLIFY ? 'netlify' : 'ipx',
    providers: {
      cloudinary: {
        name: 'cloudinary',
        options: {
          baseURL: process.env.NUXT_PUBLIC_CLOUDINARY_BASE,
        },
      },
    },
    domains: [
      process.env.NUXT_PUBLIC_STRAPI_MEDIA_BASE || '',
    ],
    quality: 80,
    format: ['webp', 'avif', 'png'],
    screens: { 'sm': 640, 'md': 768, 'lg': 1024, 'xl': 1280, '2xl': 1536 },
  },
})
