<template>
  <section class="py-20 md:py-28 px-4 bg-gradient-to-b from-white via-rose-50/20 to-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-rose-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>

    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16"
      >
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Properties</span>
          </h2>
          <p class="text-xl text-gray-600">
            Handpicked destinations for unforgettable experiences
          </p>
        </div>
        <button
          v-motion
          :initial="{ opacity: 0, x: 20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
          class="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 w-fit whitespace-nowrap"
        >
          View All
          <Icon name="fa6-solid:arrow-right" class="text-[16px]" />
        </button>
      </div>

      <!-- Featured Properties Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(property, index) in featuredProperties"
          :key="index"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 100 } }"
          class="group cursor-pointer"
        >
          <div class="bg-white border-2 border-rose-100 rounded-2xl overflow-hidden hover:border-rose-300 hover:shadow-2xl transition-all duration-300">
            <!-- Image Container -->
            <div class="relative overflow-hidden h-64 sm:h-80 bg-gradient-to-br from-rose-100 to-pink-100">
              <div class="w-full h-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center">
                <Icon :name="property.icon" class="text-8xl text-white opacity-40" />
              </div>
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <!-- Badge -->
              <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-rose-600 flex items-center gap-1 shadow-lg">
                <Icon name="fa6-solid:star" class="text-yellow-400 text-[14px]" />
                {{ property.rating }}
              </div>

              <!-- Price Badge -->
              <div class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-gray-900 text-lg">
                ${{ property.price }}<span class="text-sm font-normal text-gray-600">/night</span>
              </div>
            </div>

            <!-- Info -->
            <div class="p-6">
              <!-- Property Type -->
              <div class="flex items-center gap-2 mb-3">
                <div class="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                  {{ property.type }}
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {{ property.name }}
              </h3>

              <!-- Location -->
              <p class="text-gray-600 text-sm mb-4 flex items-center gap-1">
                <Icon name="fa6-solid:location-dot" class="text-rose-600 text-[12px]" />
                {{ property.location }}
              </p>

              <!-- Amenities -->
              <div class="flex flex-wrap gap-2 pt-4 border-t border-rose-100">
                <div v-for="amenity in property.amenities.slice(0, 3)" :key="amenity" class="text-xs text-gray-600 flex items-center gap-1">
                  <Icon name="fa6-solid:check" class="text-rose-500" />
                  {{ amenity }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const featuredProperties = [
  {
    icon: 'fa6-solid:villa',
    name: 'Modern Beachfront Villa',
    location: 'Bali, Indonesia',
    type: 'Villa',
    price: 285,
    rating: '4.9',
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Air Conditioning', 'Parking']
  },
  {
    icon: 'fa6-solid:building',
    name: 'Luxury Downtown Apartment',
    location: 'New York, USA',
    type: 'Apartment',
    price: 380,
    rating: '4.8',
    amenities: ['WiFi', 'Gym', 'Workspace', 'Elevator', 'Concierge']
  },
  {
    icon: 'fa6-solid:tent',
    name: 'Cozy Mountain Cabin',
    location: 'Colorado, USA',
    type: 'Cabin',
    price: 145,
    rating: '4.7',
    amenities: ['Fireplace', 'Hiking', 'Kitchen', 'Deck', 'Hot Tub']
  },
  {
    icon: 'fa6-solid:house',
    name: 'Charming Colonial House',
    location: 'Boston, USA',
    type: 'House',
    price: 220,
    rating: '4.9',
    amenities: ['Garden', 'Washer', 'Dryer', 'Parking', 'Workspace']
  },
  {
    icon: 'fa6-solid:landmarks',
    name: 'Historic Parisian Loft',
    location: 'Paris, France',
    type: 'Loft',
    price: 310,
    rating: '4.8',
    amenities: ['WiFi', 'Balcony', 'Air Conditioning', 'Washer', 'Workspace']
  },
  {
    icon: 'fa6-solid:water',
    name: 'Riverfront Studio',
    location: 'Amsterdam, Netherlands',
    type: 'Studio',
    price: 175,
    rating: '4.7',
    amenities: ['WiFi', 'Canal View', 'Kitchen', 'Garden Access', 'Bike']
  }
];
</script>
