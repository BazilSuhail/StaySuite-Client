<template>
  <section class="bg-white py-20 md:py-32 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Trending <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Destinations</span>
        </h2>
        <p class="text-xl text-gray-600">Discover the most popular properties worldwide</p>
      </div>

      <!-- Image Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <!-- Gallery Items -->
        <div
          v-for="(destination, index) in destinations"
          :key="index"
          :class="[
            'group relative overflow-hidden rounded-2xl cursor-pointer',
            index === 0 ? 'md:col-span-2 md:row-span-2' : ''
          ]"
          :style="index === 0 ? 'height: 510px' : 'height: 250px'"
        >
          <!-- Skeleton Loader (visible while loading) -->
          <div
            v-if="!destination.loaded"
            class="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse"
          ></div>

          <!-- Image (hidden until loaded) -->
          <img
            v-show="destination.loaded"
            :src="destination.image"
            :alt="destination.name"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            @load="destination.loaded = true"
            @error="destination.loaded = true"
          />

          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <!-- Content -->
          <div
            v-if="destination.loaded"
            class="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <h3 class="text-2xl font-bold text-white mb-2">{{ destination.name }}</h3>
            <p class="text-white/80 text-sm">{{ destination.properties }} properties</p>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-t border-rose-100 border-b">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center"
        >
          <div class="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
            {{ stat.value }}
          </div>
          <p class="text-gray-600 text-lg">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { AIRBNB_IMAGES } from '@/assets/images';

const destinations = ref([
  {
    name: 'Bali, Indonesia',
    properties: '2,450',
    image: AIRBNB_IMAGES[9],
    loaded: false
  },
  {
    name: 'Paris, France',
    properties: '3,890',
    image: AIRBNB_IMAGES[2],
    loaded: false
  },
  {
    name: 'Tokyo, Japan',
    properties: '2,180',
    image: AIRBNB_IMAGES[11],
    loaded: false
  },
  {
    name: 'New York, USA',
    properties: '4,560',
    image: AIRBNB_IMAGES[12],
    loaded: false
  },
  {
    name: 'Barcelona, Spain',
    properties: '1,980',
    image: AIRBNB_IMAGES[13],
    loaded: false
  },
  {
    name: 'Amsterdam, Netherlands',
    properties: '1,450',
    image: AIRBNB_IMAGES[14],
    loaded: false
  },
  {
    name: 'Dubai, UAE',
    properties: '3,210',
    image: AIRBNB_IMAGES[15],
    loaded: false
  },
  {
    name: 'London, UK',
    properties: '3,890',
    image: AIRBNB_IMAGES[12],
    loaded: false
  },
  {
    name: 'London, UK',
    properties: '3,890',
    image: AIRBNB_IMAGES[4],
    loaded: false
  },
]);

// Track if all images are loaded
const allImagesLoaded = computed(() => {
  return destinations.value.every(dest => dest.loaded);
});

const stats = [
  {
    value: '200K+',
    label: 'Happy Guests'
  },
  {
    value: '50K+',
    label: 'Active Properties'
  },
  {
    value: '150+',
    label: 'Countries'
  }
];
</script>

<style scoped>
</style>
