import { useAuthStore } from '../store/auth';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const authStore = useAuthStore();
    authStore.initialize(); // Initialize the store in the client environment
  }
});
