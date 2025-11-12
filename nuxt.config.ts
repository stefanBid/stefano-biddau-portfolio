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
})
