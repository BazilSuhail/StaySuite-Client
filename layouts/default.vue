<script setup>
import { useAuthStore } from '../store/auth';
import Navbar from '../components/Navbar.vue';
import { onMounted } from 'vue';
import Footer from '../components/Footer.vue';

const authStore = useAuthStore();

// Ensure initialization happens only on client-side
onMounted(() => {
  authStore.initialize();
});
</script>

<template>
  <div>
    <Navbar />
    <div>
      <slot />
    </div>
    <Footer />

  </div>
</template>
