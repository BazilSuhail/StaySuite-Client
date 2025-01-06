export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', 
  modules: [
    '@nuxt/icon',
    '@vueuse/motion/nuxt',
    '@pinia/nuxt'
  ],
  devtools: { enabled: false },
  css: [
    '@/assets/global.css', // Add your global CSS file
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    '~/plugins/pinia.js', // Include Pinia plugin
  ],
});
