<template>
  <section class="py-20 md:py-28 px-4 bg-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-rose-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-pink-50 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Title -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Choose <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">StaySuite</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover what makes us the world's trusted platform for unique stays
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 100 } }"
          class="group"
        >
          <div class="bg-white border-2 border-rose-100 rounded-2xl p-8 h-full hover:border-rose-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <!-- Icon -->
            <div class="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 group-hover:from-rose-200 group-hover:to-pink-200 transition-colors duration-300">
              <Icon :name="feature.icon" class="text-3xl text-rose-600" />
            </div>

            <!-- Content -->
            <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- Arrow -->
            <div class="mt-6 flex items-center gap-2 text-rose-600 font-semibold group-hover:gap-3 transition-all duration-300">
              Learn more
              <Icon name="fa6-solid:arrow-right" class="text-lg group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: 'fa6-solid:shield-check',
    title: 'Secure & Safe',
    description: 'Your security is our priority. All transactions are encrypted and verified by our trusted payment partners.'
  },
  {
    icon: 'fa6-solid:globe',
    title: 'Global Community',
    description: 'Connect with travelers and hosts from over 190 countries worldwide. Share experiences and make lasting connections.'
  },
  {
    icon: 'fa6-solid:star',
    title: 'Verified Reviews',
    description: 'Read authentic reviews from real guests. Our verification system ensures trustworthy feedback from verified travelers.'
  },
  {
    icon: 'fa6-solid:headset',
    title: '24/7 Support',
    description: 'Our support team is always ready to help. Get assistance anytime through chat, email, or phone call.'
  },
  {
    icon: 'fa6-solid:handshake',
    title: 'Fair Pricing',
    description: 'Transparent pricing with no hidden fees. What you see is what you pay, with flexible cancellation options.'
  },
  {
    icon: 'fa6-solid:bolt',
    title: 'Fast & Easy',
    description: 'Book in minutes with our simple and intuitive interface. Instant confirmation and seamless check-in process.'
  }
];
</script>
