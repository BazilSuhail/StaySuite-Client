<template>
  <section class="pb-20 md:pb-40 px-4">
    <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">
      Trending <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Properties</span>
    </h2>

    <div class="w-full max-w-6xl mx-auto">
      <!-- Main Carousel -->
      <div class="relative overflow-hidden rounded-3xl h-[400px] md:h-[500px]">
        <img
          :src="properties[currentIndex].url"
          :alt="properties[currentIndex].title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col items-end justify-end p-8">
          <div class="text-white max-w-md">
            <h3 class="text-4xl font-bold mb-2">{{ properties[currentIndex].title }}</h3>
            <p class="text-lg text-white/90 mb-4">{{ properties[currentIndex].location }}</p>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1">
                <Icon name="fa6-solid:star" class="text-yellow-400" />
                <span class="font-semibold">{{ properties[currentIndex].rating }}</span>
              </div>
              <span class="text-2xl font-bold text-rose-400">${{ properties[currentIndex].price }}<span class="text-lg text-white/80">/night</span></span>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors"
          @click="previousProperty"
        >
          <Icon name="fa6-solid:chevron-left" class="text-2xl" />
        </button>
        <button
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors"
          @click="nextProperty"
        >
          <Icon name="fa6-solid:chevron-right" class="text-2xl" />
        </button>

        <!-- Indicators -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <button
            v-for="(property, index) in properties"
            :key="property.id"
            class="h-2 rounded-full transition-all duration-300"
            :class="currentIndex === index ? 'w-8 bg-rose-600' : 'w-2 bg-white/50 hover:bg-white/70'"
            @click="currentIndex = index"
          />
        </div>
      </div>

      <!-- Thumbnail Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div
          v-for="(property, index) in properties"
          :key="property.id"
          class="relative overflow-hidden rounded-xl cursor-pointer group h-32 md:h-40"
          :class="{ 'ring-4 ring-rose-600': currentIndex === index }"
          @click="currentIndex = index"
        >
          <img
            :src="property.url"
            :alt="property.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
            <h4 class="text-white text-sm font-semibold truncate">{{ property.title }}</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { AIRBNB_IMAGES } from '@/assets/images';

const currentIndex = ref(0);
const carouselRef = ref(null);

const properties = [
  {
    id: 1,
    url: AIRBNB_IMAGES[8],
    title: 'Luxury Penthouse',
    location: 'New York, USA',
    rating: '4.95',
    price: '450',
  },
  {
    id: 2,
    url: AIRBNB_IMAGES[9],
    title: 'Beach Villa',
    location: 'Bali, Indonesia',
    rating: '4.89',
    price: '280',
  },
  {
    id: 3,
    url: AIRBNB_IMAGES[10],
    title: 'Modern Apartment',
    location: 'Tokyo, Japan',
    rating: '4.92',
    price: '320',
  },
  {
    id: 4,
    url: AIRBNB_IMAGES[11],
    title: 'Countryside Estate',
    location: 'Tuscany, Italy',
    rating: '4.98',
    price: '350',
  },
];

const nextProperty = () => {
  currentIndex.value = (currentIndex.value + 1) % properties.length;
};

const previousProperty = () => {
  currentIndex.value = (currentIndex.value - 1 + properties.length) % properties.length;
};
</script>
