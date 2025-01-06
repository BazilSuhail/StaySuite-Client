<template>
    <div>
      <button
        @click="toggleFavorite"
        :class="[
          'text-[30px] hover:opacity-80',
          isFavorited ? 'text-yellow-400' : 'text-gray-400'
        ]"
      >
        <Icon name="fa-bookmark" />
      </button>
      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
    listingId: {
      type: String,
      required: true,
    },
    isInitiallyFavorited: {
      type: Boolean,
      default: false,
    },
  });
  
  const isFavorited = ref(props.isInitiallyFavorited);
  //console.log(props.listingId)
  const error = ref('');
  
  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings/${props.listingId}/toggle-favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      isFavorited.value = !isFavorited.value;
    } catch (err) {
      error.value = 'Failed to toggle favorite. Please try again.';
      console.error('Error toggling favorite:', err.response?.data || err.message);
    }
  };
  </script>
   