import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueCal', VueCal);
});
