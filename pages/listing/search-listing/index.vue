<template>
    <div class="min-h-screen bg-gray-50 lg:[pt-[150px] pt-[100px] xl:px-[75px] px-4">
      <h2 class="text-[20px] pl-[5px] lg:text-[18px] font-[700] mb-[8px] text-rose-500">
        Filtered Listings
      </h2>
      <div class="w-[98%] mx-auto bg-rose-300 rounded-xl h-[1.5px]"></div>
  
      <div v-if="results.length === 0" class="mt-[150px] w-full flex flex-col mx-auto contrast justify-center items-center">
        <img class="mix-blend-multiply z-10 scale-[0.8]" src="/assets/noResults.webp" alt="No Results" />
        <p class="text-gray-400 bg-gray-50 z-30 pt-[18px] mt-[-70px] font-[600] text-[15px]">
          No results found for your filter
        </p>
      </div>
  
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
        <div
          v-for="listing in results"
          :key="listing._id"
          @click="goToListing(listing._id)"
          class="overflow-hidden border rounded-xl bg-white cursor-pointer"
        >
          <img
            :src="listing.images.placePicture || 'https://via.placeholder.com/300'"
            :alt="listing.name"
            loading="lazy"
            class="m-2 h-[290px] lg:h-[230px] xl:h-[240px] w-[95%] border rounded-xl hover:shadow-xl transition duration-200"
          />
          <div class="px-4 pb-3">
            <h2 class="font-semibold text-lg">{{ listing.address.suburb }}, {{ listing.address.country }}</h2>
            <p class="text-gray-500">{{ listing.type }}</p>
            <p class="text-rose-600 underline font-[600]">{{ listing.category }}</p>
            <p class="text-gray-500 text-[14px]">
              Bookings Made: <span class="font-[600]">{{ listing.bookingsMade }}</span>
            </p>
            <p class="font-bold text-lg">${{ listing.price }} / night</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
import { useRouter } from "vue-router";
  import { useAuthStore } from "@/store/auth.js"; 
  
  export default {
    data() {
      return {
        results: [],
      };
    },
    setup() {
      const auth = useAuthStore();
      const router = useRouter();
      return { auth, router };
    },
    mounted() {
      this.fetchListings();
    },
    methods: {
      async fetchListings() {
        try {
          console.log("query")
            console.log(this.auth.searchfilters)
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/filtered-listings`,
            this.auth.searchfilters
          );
          this.results = response.data;
          console.log("resulsy")
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching listings:", error);
        }
      },
      goToListing(listingId) {
        this.router.push(`/listing/${listingId}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here if necessary */
  </style>
  