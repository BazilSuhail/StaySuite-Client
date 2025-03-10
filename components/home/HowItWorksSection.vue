<template>
  <section class="py-20 md:py-28 px-4 bg-gradient-to-b from-white via-rose-50/20 to-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-20"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          How It <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Works</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Get started in just a few simple steps
        </p>
      </div>

      <!-- Steps Container -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <!-- Connecting Line (desktop only) -->
        <div class="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-rose-200 via-pink-300 to-rose-200"></div>

        <!-- Step Cards -->
        <div
          v-for="(step, index) in steps"
          :key="index"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 120 } }"
          class="relative"
        >
          <!-- Step Card -->
          <div class="bg-white rounded-2xl p-8 border-2 border-rose-100 hover:border-rose-300 transition-all duration-300 h-full relative z-10">
            <!-- Step Number Circle -->
            <div class="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-rose-600 to-pink-600 text-white font-bold text-xl shadow-lg">
              {{ index + 1 }}
            </div>

            <!-- Content -->
            <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ step.title }}</h3>
            <p class="text-gray-600 leading-relaxed mb-6">{{ step.description }}</p>

            <!-- Icon -->
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-rose-50 ml-auto">
              <Icon :name="step.icon" class="text-2xl text-rose-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 } }"
        class="text-center mt-16"
      >
        <button class="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 text-lg">
          <Icon name="fa6-solid:play" class="text-[16px]" />
          Watch Tutorial
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    icon: 'fa6-solid:magnifying-glass',
    title: 'Search & Explore',
    description: 'Browse through thousands of unique properties and find your perfect stay.'
  },
  {
    icon: 'fa6-solid:credit-card',
    title: 'Book & Pay',
    description: 'Choose your dates and complete secure payment in just a few clicks.'
  },
  {
    icon: 'fa6-solid:key',
    title: 'Receive Details',
    description: 'Get instant confirmation and detailed check-in instructions from your host.'
  },
  {
    icon: 'fa6-solid:smile',
    title: 'Enjoy & Review',
    description: 'Have an amazing stay and share your experience with future travelers.'
  }
];
</script>
