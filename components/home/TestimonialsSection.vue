<template>
  <section class="py-20 md:py-28 px-4 bg-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-1/2 right-0 w-96 h-96 bg-pink-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Title -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Loved by <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Travelers</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Read authentic reviews from our guests
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 100 } }"
          class="group"
        >
          <div class="bg-white border-2 border-rose-100 rounded-2xl p-8 h-full hover:border-rose-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <!-- Rating Stars -->
            <div class="flex items-center gap-1 mb-4">
              <Icon
                v-for="i in 5"
                :key="i"
                name="fa6-solid:star"
                class="text-yellow-400 text-lg"
              />
            </div>

            <!-- Review Text -->
            <p class="text-gray-700 leading-relaxed mb-6 italic">
              "{{ testimonial.review }}"
            </p>

            <!-- Divider -->
            <div class="border-t border-rose-100 my-6"></div>

            <!-- Author Info -->
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                {{ testimonial.initials }}
              </div>
              <div>
                <h4 class="text-gray-900 font-bold">{{ testimonial.name }}</h4>
                <p class="text-gray-500 text-sm">{{ testimonial.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pt-12 border-t-2 border-rose-100">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 400 + index * 100 } }"
          class="text-center"
        >
          <div class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-2">
            {{ stat.value }}
          </div>
          <p class="text-gray-600 text-lg">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    review: "The best platform I've used for booking accommodations. Clean interface, responsive support, and incredible properties!",
    name: 'Sarah Johnson',
    location: 'New York, USA',
    initials: 'SJ',
  },
  {
    review: "Hosting my apartment has been amazing! StaySuite makes property management so easy with their intuitive tools.",
    name: 'Marco Rodriguez',
    location: 'Barcelona, Spain',
    initials: 'MR',
  },
  {
    review: "Found the most beautiful beachfront villa for our family vacation. Exceptional service from booking to checkout!",
    name: 'Emma Wilson',
    location: 'Sydney, Australia',
    initials: 'EW',
  },
  {
    review: "Love the verification system here. It gives me confidence that I'm booking from legitimate hosts with great reviews.",
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    initials: 'YT',
  },
  {
    review: "As a host, the support team has been incredibly helpful. My bookings increased significantly since I joined StaySuite.",
    name: 'David Chen',
    location: 'Vancouver, Canada',
    initials: 'DC',
  },
  {
    review: "Fantastic platform! I've traveled to 5 countries using StaySuite and never had a bad experience. Highly recommend!",
    name: 'Isabella Martinez',
    location: 'Miami, USA',
    initials: 'IM',
  }
];

const stats = [
  { value: '2.5M+', label: 'Happy Guests' },
  { value: '190+', label: 'Countries' },
  { value: '500K+', label: 'Verified Properties' }
];
</script>
