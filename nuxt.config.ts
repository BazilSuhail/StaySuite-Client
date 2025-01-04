// https://nuxt.com/docs/api/configuration/nuxt-config
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', 
  modules: ['@nuxt/icon','@vueuse/motion/nuxt'],
  devtools: { enabled: false },
  css: [
    '@/assets/global.css', // Add Tailwind CSS file
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});