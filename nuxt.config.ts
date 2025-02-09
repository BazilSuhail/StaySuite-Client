export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', 
  modules: [
    '@nuxt/icon',
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    '@samk-dev/nuxt-vcalendar',
  ],
  devtools: { enabled: false },
  css: [
    '@/assets/global.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    '~/plugins/pinia.js',
  ],
});
