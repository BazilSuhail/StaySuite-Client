<template>
  <section class="py-20 md:py-28 px-4 bg-gradient-to-r from-rose-600 to-pink-600 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

    <div class="max-w-6xl mx-auto relative z-10">
      <div
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center"
      >
        <!-- Main Heading -->
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Find Your <span class="block">Perfect Stay?</span>
        </h2>

        <!-- Subheading -->
        <p class="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join millions of travelers who've discovered unique stays with StaySuite. Your next adventure awaits!
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
            class="bg-white text-rose-600 hover:bg-rose-50 font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-2 text-lg"
          >
            <Icon name="fa6-solid:search" class="text-[20px]" />
            Explore Stays Now
          </button>

          <button
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
            class="border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-10 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center gap-2 text-lg"
          >
            <Icon name="fa6-solid:house" class="text-[20px]" />
            List Your Property
          </button>
        </div>

        <!-- Trusted by text -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 600, delay: 400 } }"
          class="mt-16 pt-12 border-t border-white/30"
        >
          <p class="text-white/80 text-sm font-medium mb-4">TRUSTED BY</p>
          <div class="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <span class="text-white/70 font-semibold">2.5M+ Travelers</span>
            <span class="text-white/70">•</span>
            <span class="text-white/70 font-semibold">500K+ Properties</span>
            <span class="text-white/70">•</span>
            <span class="text-white/70 font-semibold">190+ Countries</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
