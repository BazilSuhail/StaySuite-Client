<template>
  <section class="bg-white pb-10 px-4">
    <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">
      Explore Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Properties</span>
    </h2>

    <!-- Gallery Container -->
    <div class="flex justify-center gap-1 md:gap-2 pb-20 pt-8 overflow-x-auto mx-auto rounded-2xl" style="-ms-overflow-style: none; scrollbar-width: none;">
       <div
        v-for="(item, i) in properties"
        :key="item.id"
        class="relative cursor-pointer shrink-0 rounded-2xl overflow-hidden transition-all duration-300"
        :class="selectedIndex === i ? 'w-44 md:w-[330px] lg:w-[500px]' : 'w-4 md:w-24'"
        role="button"
        @mouseenter="selectedIndex = i"
        @click="handleGalleryClick(i)"
      >
        <img
          :src="item.url"
          :alt="item.title"
          class="w-full h-48 md:h-80 object-cover"
        />
        <div
          v-if="selectedIndex === i"
          class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4"
        >
          <div class="text-white">
            <p class="font-bold text-lg">{{ item.title }}</p>
            <p class="text-sm text-white/80">{{ item.guests }} guests</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-white/40 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          @click="isModalOpen = false"
        >
          <div
            class="bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            @click.stop
          >
            <!-- Close Button (Mobile) -->
            <button
              class="md:hidden absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              @click="isModalOpen = false"
            >
              <Icon name="fa6-solid:xmark" class="text-xl" />
            </button>

            <div class="relative h-48 md:h-96 overflow-hidden">
              <img
                :src="properties[selectedIndex].url"
                :alt="properties[selectedIndex].title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4 md:p-6">
              <div
                v-motion
                :initial="{ opacity: 0, scaleY: 0.8 }"
                :enter="{ opacity: 1, scaleY: 1, transition: { duration: 300, delay: 100 } }"
                class="origin-bottom"
              >
                <h3 class="text-lg md:text-2xl font-bold text-gray-900 mb-2">
                  {{ properties[selectedIndex].title }}
                </h3>
                <p class="text-sm md:text-base text-gray-600 mb-4">
                  {{ properties[selectedIndex].description }}
                </p>
                <div class="flex gap-2 flex-wrap">
                  <span
                    v-for="tag in properties[selectedIndex].tags"
                    :key="tag"
                    class="px-2 py-0.5 md:px-3 md:py-1 bg-rose-100 text-rose-600 rounded-full text-xs md:text-sm font-medium"
                  >
                    {{ tag }}
                  </span>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { AIRBNB_IMAGES } from '@/assets/images';

const selectedIndex = ref(0);
const isModalOpen = ref(false);

const properties = [
  {
    id: 1,
    url: AIRBNB_IMAGES[0],
    title: 'Luxury Mountain Retreat',
    description: 'Experience the ultimate mountain escape with panoramic views, modern amenities, and breathtaking sunsets.',
    guests: '6',
    tags: ['Mountain View', 'Modern', 'Luxury', 'WiFi', 'Pool'],
  },
  {
    id: 2,
    url: AIRBNB_IMAGES[1],
    title: 'Beachfront Paradise',
    description: 'Wake up to the sound of waves in this stunning beachfront villa with private beach access and stunning ocean views.',
    guests: '8',
    tags: ['Beach', 'Ocean View', 'Private', 'Luxury', 'WiFi'],
  },
  {
    id: 3,
    url: AIRBNB_IMAGES[2],
    title: 'Modern City Penthouse',
    description: 'Stylish urban living with floor-to-ceiling windows, rooftop access, and views of the city skyline.',
    guests: '4',
    tags: ['City View', 'Modern', 'Rooftop', 'WiFi', 'Gym'],
  },
  {
    id: 4,
    url: AIRBNB_IMAGES[3],
    title: 'Cozy Country Estate',
    description: 'Charming countryside home with gardens, fireplace, and all the comforts for a peaceful retreat.',
    guests: '5',
    tags: ['Garden', 'Fireplace', 'Peaceful', 'WiFi', 'Kitchen'],
  },
  {
    id: 5,
    url: AIRBNB_IMAGES[4],
    title: 'Mediterranean Villa',
    description: 'Stunning villa with traditional architecture, infinity pool, and enchanting gardens overlooking the coast.',
    guests: '10',
    tags: ['Pool', 'Garden', 'Coastal', 'Luxury', 'Chef Kitchen'],
  },
  {
    id: 6,
    url: AIRBNB_IMAGES[5],
    title: 'Urban Loft Apartment',
    description: 'Contemporary loft with exposed brick, high ceilings, and a vibrant neighborhood location.',
    guests: '3',
    tags: ['Loft', 'Urban', 'Modern', 'WiFi', 'Central'],
  },
  {
    id: 7,
    url: AIRBNB_IMAGES[6],
    title: 'Tropical Jungle Escape',
    description: 'Secluded jungle retreat with natural pools, lush vegetation, and an authentic tropical experience.',
    guests: '4',
    tags: ['Jungle', 'Natural', 'Secluded', 'WiFi', 'Adventure'],
  },
  {
    id: 8,
    url: AIRBNB_IMAGES[7],
    title: 'Elegant Historic Manor',
    description: 'Grand estate with period features, ornate gardens, and a touch of old-world charm and elegance.',
    guests: '12',
    tags: ['Historic', 'Elegant', 'Gardens', 'Formal', 'Grand'],
  },
];

const handleGalleryClick = (index) => {
  selectedIndex.value = index;
  isModalOpen.value = true;
};
</script>
