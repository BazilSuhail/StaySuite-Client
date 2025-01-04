/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './static/**/*.vue',
    './src/**/*.vue',
    './pages/**/*.vue',
    './app.vue', // Include root app file
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };
      addUtilities(newUtilities, ['responsive']);
    },
  ],
};
