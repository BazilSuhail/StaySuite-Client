<template>
  <div :class="['mt-[85px] min-h-screen md:mt-[95px]']"> 
    <div v-if="loading">
      <Homeloader />
    </div>

    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4 xl:px-[75px] pb-[45px] px-4">
        <div
          v-for="listing in listings"
          :key="listing._id"
          @click="navigate(`/listing/${listing._id}`)"
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
                {{ listing.address.suburb.substring(0, 8) }}, {{ listing.address.country.substring(0, 8) }}
              </h2>
              <p v-if="listing.rating > 0" class="flex items-center">
                {{ listing.rating }}
                <FaStar size="18" class="text-yellow-500" />
              </p>
            </div>
            <p class="text-rose-600 font-[700] text-[12px]">{{ listing.property_type }}</p>
            <p class="text-gray-500">{{ listing.category }}</p>
            <p class="font-bold text-[14px] mt-[6px]">${{ listing.price }} / night</p>
          </div>
        </div>
      </div>

      <div v-if="listings.length === 0" class="mt-[150px] w-full flex flex-col mx-auto contrast justify-center items-center">
        <img class="mix-blend-multiply z-10 scale-[0.8]" :src="noResults" alt="No Results" />
        <p class="text-gray-400 bg-white z-30 pt-[18px] mt-[-70px] px-[55px] font-[600] text-[15px]">No listings found</p>
      </div>
    </div>

    <div v-if="hasMore" class="text-center mt-6">
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

<script>
import { ref, reactive, onMounted, watch } from 'vue';
import axios from 'axios';
//import SearchBar from './SearchBar.vue';
//import HorizontalScrollList from './HorizontalScrollList.vue';
//import Homeloader from './Homeloader.vue';
import noResults from '../../assets/PhotosAssets/noResults.webp';
import { useRouter } from 'vue-router';

export default {
  components: {
    SearchBar,
    HorizontalScrollList,
    Homeloader,
  },
  setup() {
    const router = useRouter();
    const listings = ref([]);
    const loading = ref(false);
    const hasMore = ref(true);
    const error = ref('');
    const currentPage = ref(1);
    const category = ref('All');
    const searchParams = ref(null);

    const fetchListings = async (page, category) => {
      loading.value = true;
      try {
        let url = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings`;
        const params = { page, limit: 10, category };

        if (searchParams.value) {
          const tempLocation = searchParams.value.location || 'invalid';
          url = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listing-searched/${searchParams.value.guests}/${tempLocation}`;
        }

        const response = await axios.get(url, { params });
        const newListings = response.data.listings;

        if (page === 1) {
          listings.value = newListings;
        } else {
          listings.value = [...listings.value, ...newListings];
        }
        hasMore.value = page < response.data.totalPages;
      } catch (err) {
        error.value = 'Failed to fetch listings. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchListings(currentPage.value, category.value);
    });

    watch([category, searchParams], ([newCategory, newSearchParams]) => {
      currentPage.value = 1;
      fetchListings(1, newCategory, newSearchParams);
    });

    const handleSearch = (location, guests) => {
      searchParams.value = { location, guests };
      currentPage.value = 1;
      fetchListings(1, category.value);
    };

    const loadMore = () => {
      if (hasMore.value && !searchParams.value) {
        currentPage.value += 1;
        fetchListings(currentPage.value, category.value);
      }
    };

    const navigate = (path) => {
      router.push(path);
    };

    return {
      listings,
      loading,
      hasMore,
      error,
      currentPage,
      category,
      searchParams,
      fetchListings,
      handleSearch,
      loadMore,
      navigate,
      noResults,
    };
  },
};
</script>

<style>
/* Add your styles if needed */
</style>
