<template>
  <div class="min-h-screen mt-[85px] md:mt-[95px]"> 
    <!-- Category Selection -->
    <CategoryList
      :selectedCategory="category"
      @update:category="updateCategory"
    />

    <!-- Listings -->
    <div v-if="loading" class="text-center mt-8">
      <p>Loading...</p>
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4 xl:px-[75px] pb-[45px] px-4"
    >
      <div
        v-for="listing in listings"
        :key="listing._id"
        @click="navigateToListing(listing._id)"
        class="overflow-hidden mt-[15px] cursor-pointer"
      >
        <img
          :src="listing.images.placePicture || 'https://via.placeholder.com/300'"
          :alt="listing.name"
          loading="lazy"
          class="m-2 h-[290px] lg:h-[230px] xl:h-[240px] w-[95%] border rounded-xl hover:shadow-xl transition duration-200"
        />
        <div class="px-4">
          <div class="w-full flex justify-between">
            <h2 class="font-semibold text-lg">
              {{ listing.address.suburb.substring(0, 8) }},
              {{ listing.address.country.substring(0, 8) }}
            </h2>
            <p
              v-if="listing.rating > 0"
              class="flex items-center"
            >
              {{ listing.rating }}
              <Icon name="fa-solid:star" class="text-yellow-500 text-lg ml-1" />
            </p>
          </div>
          <p class="text-rose-600 font-[700] text-[12px]">
            {{ listing.property_type }}
          </p>
          <p class="text-gray-500">{{ listing.category }}</p>
          <p class="font-bold text-[14px] mt-[6px]">
            ${{ listing.price }} / night
          </p>
        </div>
      </div>
    </div>

    <!-- No Listings Found -->
    <div
      v-if="listings.length === 0 && !loading"
      class="mt-[150px] w-full flex flex-col justify-center items-center"
    >
      <img
        class="mix-blend-multiply z-10 scale-[0.8]"
        src="/assets/noResults.webp"
        alt="No Results"
      />
      <p class="text-gray-400 bg-white z-30 pt-[18px] mt-[-70px] px-[55px] font-[600] text-[15px]">
        No listings found
      </p>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && !loading" class="text-center mt-6">
      <button
        @click="loadMore"
        class="text-rose-500 font-[600] py-2 px-4 rounded hover:bg-text-600 underline mb-[25px] transition"
        :disabled="loading"
      >
        {{ loading ? 'Loading...' : 'Show More' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CategoryList from '@/components/CategoryList.vue';   

const router = useRouter();

const listings = ref([]);
const currentPage = ref(1);
const hasMore = ref(true);
const loading = ref(false);
const category = ref('All');

const fetchListings = async (page, category) => {
  loading.value = true;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings`,
      {
        params: { page, limit: 10, category },
      }
    );
    if (page === 1) {
      listings.value = response.data.listings;
    } else {
      listings.value = [...listings.value, ...response.data.listings];
    }
    hasMore.value = page < response.data.totalPages;
  } catch (error) {
    console.error('Failed to fetch listings:', error);
  } finally {
    loading.value = false;
  }
};

const updateCategory = (newCategory) => {
  category.value = newCategory;
  currentPage.value = 1;
  fetchListings(currentPage.value, category.value);
};

const loadMore = () => {
  if (hasMore.value) {
    currentPage.value++;
    fetchListings(currentPage.value, category.value);
  }
};

const navigateToListing = (id) => {
  router.push(`/listing/${id}`);
};

onMounted(() => {
  fetchListings(currentPage.value, category.value);
});
</script>

<style scoped>
/* Add styles if necessary */
</style>
