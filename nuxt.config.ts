// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@vueuse/nuxt'],
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
    providers: {
      cloudinary: {
        provider: 'cloudinary',
        options: {
          baseURL: 'https://res.cloudinary.com/dsmtyu2iw/image/upload/',
        },
      },
    },
    quality: 80,
    format: ['webp', 'avif', 'png'],
    screens: {
      'sm': 640, 'md': 768, 'lg': 1024, 'xl': 1280, '2xl': 1536,
    },
  },
})
