<template>
    <div class="bg-gray-100 pt-[90px] md:pt-[120px] p-6 min-h-screen justify-center items-center">
      <div class="max-w-[1150px] mx-auto">
        <Icons name="material-symbols-light:bookmark-check-sharp" class="text-rose-600 "/>
        <h3 class="text-[20px] sm:text-[24px] mb-[15px] text-rose-600 font-[700]">Favourite Listings</h3>
        <div class="h-[2px] md:h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]"></div>
  
        <div v-if="error" class="flex flex-col justify-center items-center mix-blend-multiply">
          <img src="/assets/noFavourites.webp" alt="No Favourites" class="scale-[0.6] md:scale-[0.7] opacity-70" />
          <p class="text-center mt-[-65px] font-[600] text-rose-700 mx-auto">You Have no favourite Listings</p>
        </div>
  
        <div v-else>
          <div class="grid gap-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="listing in listings"
              :key="listing._id"
              @click="navigateToListing(listing._id)"
              class="overflow-hidden w-full cursor-pointer bg-white border rounded-xl hover:shadow-md transition duration-200"
            >
              <img
                :src="listing.images.coverPicture || 'https://via.placeholder.com/300'"
                :alt="listing.name"
                loading="lazy"
                class="h-[220px] sm:h-[280px] md:h-[220px] w-[100%]"
              />
              <div class="p-4">
                <h2 class="font-semibold text-lg">{{ listing.name }}</h2>
                <p class="text-gray-500">{{ listing.property_type }}</p>
                <p class="text-gray-700">Bedrooms: {{ listing.bedrooms }}</p>
                <p class="font-bold text-lg">${{ listing.price }} / night</p>
              </div>
            </div>
          </div>
  
          <div v-if="currentPage < totalPages" class="text-center mt-6">
            <button
              @click="handleShowMore"
              :disabled="loading"
              class="bg-rose-600 font-[600] text-white px-4 hover:bg-rose-900 transition duration-300"
            >
              {{ loading ? 'Loading...' : 'Show More' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios'; 
  
  export default {
    setup() {
      const listings = ref([]);
      const currentPage = ref(1);
      const totalPages = ref(0);
      const loading = ref(false);
      const error = ref('');
  
      const fetchListings = async () => {
        try {
          loading.value = true;
          error.value = '';
          const token = localStorage.getItem('token');
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/guest-favourites?page=${currentPage.value}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
  
          if (currentPage.value === 1) {
            listings.value = response.data.listings;
          } else {
            listings.value = [...listings.value, ...response.data.listings];
          }
  
          totalPages.value = response.data.totalPages;
        } catch (err) {
          error.value = 'Failed to fetch favorite listings. Please try again.';
          console.error(err.response?.data || err.message);
        } finally {
          loading.value = false;
        }
      };
  
      const handleShowMore = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
          fetchListings();
        }
      };
  
      const navigateToListing = (id) => {
        // Use Nuxt navigateTo for programmatic navigation
        navigateTo(`/listing/${id}`);
      };
  
      onMounted(() => {
        window.scrollTo(0, 0);
        fetchListings();
      });
  
      return {
        listings,
        currentPage,
        totalPages,
        loading,
        error, 
        handleShowMore,
        navigateToListing,
      };
    },
  };
  </script>
   