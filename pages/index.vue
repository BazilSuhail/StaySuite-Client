<template>
  <div class="w-full bg-white">

    <div class="relative h-screen  rounded-b-[30px] lg:rounded-b-[80px] w-full overflow-hidden">
        <!-- Background -->
      <div class="absolute inset-0 w-full h-full">
         <Aurora :colorStops="['#ff6ca5', '#ff4d4d', '#fbceb1']" :amplitude="0.5" :speed="0.1" :blend="0.5" />
      </div>
        <!-- Content Overlay -->
        <div class="absolute inset-0  flex flex-col items-center justify-center px-4 z-10">
          <div v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
            class="text-center max-w-4xl">
            <h1 class="text-[42px] sm:text-[90px] font-bold text-gray-900">
              Discover Your
            </h1>
            <h1 class="text-[42px] sm:text-[85px] font-bold text-gray-900 -mt-4 sm:-mt-9">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Perfect Stay</span>
            </h1>

            <p class="text-sm md:text-xl text-gray-700 mb-8 mt-4 leading-relaxed max-w-xl mx-auto">
              Explore thousands of incredible homes and experiences worldwide. Find your next adventure with StaySuite.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-row gap-2 sm:gap-4 justify-center items-center">
              <button v-motion :initial="{ opacity: 0, x: -20 }"
                :enter="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }" @click="navigateToListings"
                class="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-red-700 text-white font-medium py-2 px-4 sm:py-4 sm:px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                <Icon name="fa6-solid:search" class="text-[16px] sm:text-[20px]" />
                <span class="hidden sm:inline">Explore Stays</span>
                <span class="sm:hidden">Explore</span>
              </button>

              <button v-motion :initial="{ opacity: 0, x: 20 }"
                :enter="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }" @click="navigateToHosting"
                class="border-2 border-rose-600 text-rose-600 hover:bg-rose-50 bg-white font-medium py-2 px-4 sm:py-4 sm:px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2 text-sm sm:text-lg">
                <Icon name="fa6-solid:house" class="text-[16px] sm:text-[20px]" />
                Become a Host
              </button>
            </div>
          </div>

        </div>
    </div>

    <!-- Destinations Gallery -->
    <DestinationsGallery />

    <!-- Accordion Gallery -->
    <AccordionGallery />

    <!-- Property Carousel -->
    <PropertyCarousel />

    <!-- Property Tabs -->
    <PropertyTabs />

    <!-- Sticky Property Showcase -->
    <StickyPropertyShowcase />


    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- CTA Section -->
    <CTASection />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

import AnimatedHero from '@/components/home/AnimatedHero.vue';
import TestimonialsSection from '@/components/home/TestimonialsSection.vue';
import CTASection from '@/components/home/CTASection.vue';
import DestinationsGallery from '@/components/home/DestinationsGallery.vue';
import AccordionGallery from '@/components/home/AccordionGallery.vue';
import PropertyCarousel from '@/components/home/PropertyCarousel.vue';
import PropertyTabs from '@/components/home/PropertyTabs.vue';
import StickyPropertyShowcase from '@/components/home/StickyPropertyShowcase.vue';
import Aurora from '../components/home/Aurora.vue';

useHead({
  title: 'StaySuite - Find Your Perfect Stay',
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

const navigateToListings = () => {
  router.push('/staysuite');
};

const navigateToHosting = () => {
  router.push('/authentication/signUp');
};

onMounted(() => {
  const saved = localStorage.getItem('favorites');
  if (saved) {
    favorites.value = JSON.parse(saved);
  }
  fetchListings(currentPage.value, category.value);
});
</script>