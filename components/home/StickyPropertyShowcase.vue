<template>
  <section class="max-w-7xl mx-auto">
    <!-- Section 1: Hero with Sticky Text -->
    <div class="grid md:grid-cols-2 gap-0 min-h-screen">
      <!-- Sticky Left Content -->
      <div
        v-motion
        :initial="{ opacity: 0, x: -40 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        class="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-br from-white to-rose-50/30 px-8"
      >
        <div>
          <h2 class="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Stay</span>
          </h2>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Browse thousands of unique properties verified by our team. From budget-friendly apartments to luxury villas, find the perfect home for your next adventure.
          </p>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <Icon name="fa6-solid:check-circle" class="text-rose-600 text-2xl flex-shrink-0" />
              <span class="text-gray-700 text-lg">Trusted by 2.5M+ travelers</span>
            </div>
            <div class="flex items-center gap-4">
              <Icon name="fa6-solid:check-circle" class="text-rose-600 text-2xl flex-shrink-0" />
              <span class="text-gray-700 text-lg">500K+ verified listings</span>
            </div>
            <div class="flex items-center gap-4">
              <Icon name="fa6-solid:check-circle" class="text-rose-600 text-2xl flex-shrink-0" />
              <span class="text-gray-700 text-lg">190+ countries covered</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Scrolling Images -->
      <div class="relative hidden md:block">
        <div
          v-for="(image, index) in propertyImages"
          :key="image.id"
          class="sticky top-0 h-screen flex items-center justify-center bg-gray-900 overflow-hidden"
        >
          <img
            :src="image.url"
            :alt="image.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
            <div>
              <h3 class="text-3xl font-bold text-white mb-2">{{ image.title }}</h3>
              <p class="text-white/80 text-lg">{{ image.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: Mobile Layout -->
    <div class="md:hidden px-4 py-16">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="space-y-8"
      >
        <div
          v-for="(image, index) in propertyImages"
          :key="image.id"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 100 } }"
          class="rounded-2xl overflow-hidden h-64 relative group"
        >
          <img
            :src="image.url"
            :alt="image.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
            <div>
              <h3 class="text-xl font-bold text-white">{{ image.title }}</h3>
              <p class="text-sm text-white/80">{{ image.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { AIRBNB_IMAGES } from '@/assets/images';

const hoveredProperty = ref(null);

const propertyImages = [
  {
    id: 1,
    url: AIRBNB_IMAGES[16],
    title: 'Luxury City Penthouse',
    description: 'Modern high-rise living with skyline views',
  },
  {
    id: 2,
    url: AIRBNB_IMAGES[17],
    title: 'Beachfront Villa',
    description: 'Private beach access and ocean breezes',
  },
  {
    id: 3,
    url: AIRBNB_IMAGES[18],
    title: 'Mountain Cottage',
    description: 'Cozy retreat with mountain views',
  },
  {
    id: 4,
    url: AIRBNB_IMAGES[0],
    title: 'Urban Apartment',
    description: 'Contemporary comfort in the city',
  },
];

const popularProperties = [
  {
    id: 1,
    url: AIRBNB_IMAGES[1],
    title: 'New York Luxury',
    description: 'Modern penthouse in Manhattan with stunning skyline views and rooftop access.',
    rating: '4.95',
    reviews: '284',
    price: '450',
  },
  {
    id: 2,
    url: AIRBNB_IMAGES[2],
    title: 'Bali Beach Paradise',
    description: 'Tropical villa with private pool, garden, and steps away from pristine beaches.',
    rating: '4.89',
    reviews: '512',
    price: '280',
  },
  {
    id: 3,
    url: AIRBNB_IMAGES[3],
    title: 'Tokyo Modern',
    description: 'Contemporary apartment in vibrant Shibuya with modern design and amenities.',
    rating: '4.92',
    reviews: '398',
    price: '320',
  },
  {
    id: 4,
    url: AIRBNB_IMAGES[4],
    title: 'Tuscany Escape',
    description: 'Charming countryside villa with vineyards, gardens, and traditional architecture.',
    rating: '4.98',
    reviews: '651',
    price: '350',
  },
];
</script>
