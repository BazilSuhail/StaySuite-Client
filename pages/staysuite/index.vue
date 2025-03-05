<template>
  <div class="min-h-screen mt-[75px] md:mt-[85px] bg-gradient-to-br from-white via-rose-50/30 to-pink-50/40">
    <!-- Category Selection -->
    <CategoryList
      :selectedCategory="category"
      @update:category="updateCategory"
    />

    <!-- Header Section -->
    <div v-if="listings.length > 0 && !loading" class="px-4 xl:px-[75px] py-[20px] border-b border-rose-100">
      <div class="flex items-center gap-2">
        <Icon name="fa6-solid:house-chimney" class="text-rose-600 text-[24px]" />
        <h2 class="text-[20px] md:text-[24px] font-[700] text-gray-800">
          Explore Stays
        </h2>
        <span class="text-[13px] font-[600] text-gray-500 ml-auto">{{ listings.length }} properties available</span>
      </div>
    </div>

    <!-- Listings Loading -->
    <div v-if="loading" class="px-4 xl:px-[75px] py-[20px]">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[18px]">
        <ListingsLoader/>
        <ListingsLoader/>
        <ListingsLoader/>
        <ListingsLoader/>
        <ListingsLoader/>
      </div>
    </div>

    <!-- Listings Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[18px] xl:px-[75px] pb-[45px] px-4 py-[20px]"
    >
      <div
        v-for="listing in listings"
        :key="listing._id"
        @click="navigateToListing(listing._id)"
        class="group overflow-hidden cursor-pointer rounded-[16px] bg-white border border-rose-100 hover:border-rose-300 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
      >
        <!-- Image Container with Overlay -->
        <div class="relative overflow-hidden h-[260px] sm:h-[240px] lg:h-[200px] xl:h-[220px] bg-gray-100">
          <img
            :src="listing.images.placePicture || 'https://via.placeholder.com/300'"
            :alt="listing.name"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <!-- Favorite Button -->
          <button 
            @click.stop="toggleFavorite(listing._id)"
            class="absolute top-3 right-3 w-[36px] h-[36px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
            <Icon name="fa6-solid:heart" class="text-[16px]" :class="isFavored(listing._id) ? 'text-rose-600' : 'text-gray-400'" />
          </button>

          <!-- Rating Badge -->
          <div v-if="listing.rating > 0" class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-[10px] py-[5px] rounded-full flex items-center gap-1 shadow-lg">
            <Icon name="fa-solid:star" class="text-yellow-400 text-[13px]" />
            <span class="text-[12px] font-[700] text-gray-900">{{ listing.rating }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-[14px] h-[140px] sm:h-[150px] flex flex-col justify-between">
          
          <!-- Property Type and Location Row -->
          <div>
            <div class="flex items-center justify-between mb-[8px]">
              <p class="text-rose-600 font-[700] text-[11px] uppercase tracking-wide flex items-center gap-1">
                <Icon name="fa6-solid:door-open" class="text-[12px]" />
                {{ listing.property_type }}
              </p>
              <div class="bg-gradient-to-r from-rose-600/10 to-rose-700/10 text-rose-700 px-[8px] py-[3px] rounded-full text-[10px] font-[700] flex items-center gap-1 border border-rose-200">
                <Icon :name="getCategoryIcon(listing.category)" class="text-[11px]" />
                {{ listing.category.substring(0, 8) }}
              </div>
            </div>
            
            <h2 class="font-[700] text-[14px] text-gray-900 line-clamp-2 mb-[8px]">
              {{ listing.name }}
            </h2>

            <!-- Location with slicing -->
            <p class="text-gray-600 text-[12px] font-[500] flex items-center gap-1">
              <Icon name="fa6-solid:location-dot" class="text-rose-500 text-[11px] flex-shrink-0" />
              <span class="truncate">{{ truncateLocation(listing.address.suburb + ', ' + listing.address.country, 30) }}</span>
            </p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline justify-between pt-[8px] border-t border-rose-100">
            <div>
              <span class="text-[16px] font-[800] text-gray-900">${{ listing.price }}</span>
              <span class="text-gray-500 text-[11px] font-[500]">/night</span>
            </div>
            <Icon name="fa6-solid:arrow-right" class="text-rose-600 text-[13px] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>

    <!-- No Listings Found -->
    <div
      v-if="listings.length === 0 && !loading"
      class="mt-[100px] mb-[100px] w-full flex flex-col justify-center items-center"
    >
      <div class="mb-[30px]">
        <div class="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mx-auto mb-[20px] shadow-lg">
          <Icon name="fa6-solid:search" class="text-rose-600 text-[48px]" />
        </div>
      </div>
      <h3 class="text-[24px] font-[700] text-gray-800 mb-[8px]">No listings found</h3>
      <p class="text-gray-500 text-[14px] mb-[24px] text-center">
        Try adjusting your filters or explore other categories
      </p>
      <button
        @click="category = 'All'; updateCategory('All')"
        class="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-red-700 text-white font-[600] px-[24px] py-[12px] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <Icon name="fa6-solid:redo" class="text-[14px]" />
        Reset Filters
      </button>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && !loading" class="flex justify-center py-[30px]">
      <button
        @click="loadMore"
        class="border-2 border-rose-600 text-rose-600 hover:bg-rose-50 font-[700] py-[12px] px-[32px] rounded-full transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
        :disabled="loading"
      >
        <Icon name="fa6-solid:arrow-down" class="text-[14px]" />
        {{ loading ? 'Loading...' : 'Show More Stays' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CategoryList from '@/components/CategoryList.vue';   
import ListingsLoader from '@/components/Loaders/ListingsLoader.vue'; 
 
useHead({
  title: 'StaySuite - Explore Stays', 
});

const router = useRouter();

const listings = ref([]);
const currentPage = ref(1);
const hasMore = ref(true);
const loading = ref(false);
const category = ref('All');
const favorites = ref([]);

const getCategoryIcon = (categoryName) => {
  const iconMap = {
    'Entire Place': 'fa6-solid:house',
    'Private Room': 'fa6-solid:door-open',
    'Shared Room': 'fa6-solid:users',
    'Apartment': 'fa6-solid:building',
    'Villa': 'fa6-solid:tree',
    'Cottage': 'fa6-solid:hippo',
    'Beach': 'fa6-solid:water',
    'Mountains': 'fa6-solid:mountain',
    'City': 'fa6-solid:city',
  };
  return iconMap[categoryName] || 'fa6-solid:star';
};

const truncateLocation = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const isFavored = (listingId) => {
  return favorites.value.includes(listingId);
};

const toggleFavorite = (listingId) => {
  const index = favorites.value.indexOf(listingId);
  if (index > -1) {
    favorites.value.splice(index, 1);
  } else {
    favorites.value.push(listingId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
};

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
  const saved = localStorage.getItem('favorites');
  if (saved) {
    favorites.value = JSON.parse(saved);
  }
  fetchListings(currentPage.value, category.value);
});
</script>