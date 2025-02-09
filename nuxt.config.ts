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
  app: {
    head: {
      title: 'StaySuite',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'StaySuite is a property rental platform similar offering key features such as user authentication, booking management, saving travelling history and favurite listings for guests while enabling host to manange listings via dashboard and seamlessly handle reservations made on there listings.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, // Set the favicon here
      ],
    },
  },
});
