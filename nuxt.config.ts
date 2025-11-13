// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@vueuse/nuxt'],
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: true,

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
