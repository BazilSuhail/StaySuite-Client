<template>
    <div class="w-full">
      <div class="bg-white border-t-[3px] border-gray-300 mt-[25px] pt-[15px]">
        <h2 class="text-xl font-semibold mb-4">Add a Review</h2>
        <p v-if="error" class="text-red-500">{{ error }}</p>
  
        <div v-if="success" class="fixed top-5 right-5">
          <motion-div
            class="bg-green-500 text-white px-4 py-2 rounded shadow-lg"
            :initial="{ x: '20%' }"
            :animate="{ x: 0 }"
            :exit="{ x: '10%' }"
            :transition="{ type: 'spring', stiffness: 120 }"
          >
            {{ success }}
          </motion-div>
        </div>
  
        <form @submit.prevent="handleSubmit">
          <div class="flex items-center mb-4">
            <label class="mr-[10px] text-xl font-semibold">Rating:</label>
            <div>
              <Icon
                v-for="index in 5"
                :key="index"
                name="fa-star"
                :class="[
                  'cursor-pointer',
                  index <= rating ? 'text-yellow-500' : 'text-gray-300'
                ]"
                @click="handleStarClick(index)"
              />
            </div>
          </div>
  
          <div class="mb-4">
            <label for="review" class="block text-sm font-medium text-gray-700">Review:</label>
            <textarea
              id="review"
              class="border rounded-md w-full p-2"
              rows="4"
              v-model="review"
            ></textarea>
          </div>
  
          <div class="flex justify-end">
            <button
              type="button"
              class="text-[14px] mr-2 px-4 py-[4px] bg-gray-100 text-red-700 rounded-md"
              @click="resetForm"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="text-[14px] mr-4 px-4 py-[4px] bg-rose-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import axios from 'axios'; 
  
  const props = defineProps({
    listingId: {
      type: String,
      required: true,
    },
  });
  
  const rating = ref(3);
  const review = ref('');
  const error = ref('');
  const success = ref('');
  
  watch(success, (newSuccess) => {
    if (newSuccess) {
      useTimeoutFn(() => {
        success.value = '';
      }, 2000);
    }
  });
  
  const handleSubmit = async () => {
    error.value = '';
    success.value = '';
  
    if (!rating.value || rating.value < 1 || rating.value > 5) {
      error.value = 'Rating must be between 1 and 5.';
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/listing-rating/add-review`,
        { listingId: props.listingId, rating: rating.value, review: review.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      success.value = 'Review submitted successfully!';
      rating.value = 3;
      review.value = '';
    } catch (err) {
      console.error('Error submitting review:', err.response?.data || err.message);
      error.value = 'Failed to submit review. Please try again.';
    }
  };
  
  const handleStarClick = (index) => {
    rating.value = index;
  };
  
  const resetForm = () => {
    review.value = '';
    rating.value = 3;
  };
  </script>
  
  <style scoped>
  /* Add any necessary custom styles here */
  </style>
  