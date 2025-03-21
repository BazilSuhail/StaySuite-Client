<template>
  <section class="bg-white pb-20  px-4">
    <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">
      Why Choose <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">StaySuite</span>
    </h2>

    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left: Tabs & Content -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 600 } }"
          class="space-y-6"
        >
          <div
            v-for="(tab, index) in tabs"
            :key="tab.id"
            class="cursor-pointer"
          >
            <button
              class="w-full text-left p-6 rounded-xl transition-all duration-300 flex items-start gap-4"
              :class="
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              "
              @click="activeTab = tab.id"
            >
              <Icon :name="tab.icon" class="text-3xl flex-shrink-0 mt-1" />
              <div class="flex-1">
                <h3 class="text-lg font-bold mb-2">{{ tab.title }}</h3>
                <p
                  class="transition-opacity duration-300 text-sm"
                  :class="activeTab === tab.id ? 'opacity-100' : 'opacity-60 md:hidden'"
                >
                  {{ tab.description }}
                </p>
              </div>
            </button>
          </div>
        </div>

        <!-- Right: Image -->
        <div class="relative rounded-2xl overflow-hidden h-96 md:h-full md:sticky md:top-20">
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-500"
            leave-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-105"
            leave-to-class="scale-105"
          >
            <div :key="activeTab" class="w-full h-full">
              <img
                :src="currentTabData.imageUrl"
                :alt="currentTabData.title"
                class="w-full h-[550px] object-cove rounded-2xlr"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </Transition>
        </div>
      </div>

      <!-- Additional Info under tabs (desktop) -->
      <div class="hidden md:block mt-8 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
        <p class="text-gray-700 leading-relaxed">{{ currentTabData.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { AIRBNB_IMAGES } from '@/assets/images';

const activeTab = ref('features');

const tabs = [
  {
    id: 'features',
    title: 'Premium Features',
    icon: 'fa6-solid:star',
    description:
      'Every property on StaySuite is carefully curated to meet our high standards. We feature modern amenities, luxury finishes, and unique spaces that go beyond typical rentals. From smart home technology to premium linens, experience the difference quality makes.',
    imageUrl: AIRBNB_IMAGES[12],
  },
  {
    id: 'safety',
    title: 'Safety & Trust',
    icon: 'fa6-solid:shield-halved',
    description:
      'Your safety is our priority. All hosts are verified with ID checks, secure payment processing with fraud protection, and 24/7 customer support. Plus, every property has been personally inspected to ensure it meets our safety standards. Book with confidence.',
    imageUrl: AIRBNB_IMAGES[13],
  },
  {
    id: 'reviews',
    title: 'Verified Reviews',
    icon: 'fa6-solid:certificate',
    description:
      'Real feedback from real guests. Our transparent review system ensures you see honest experiences from previous visitors. Every review is verified to come from actual stays, helping you make informed decisions about your next getaway.',
    imageUrl: AIRBNB_IMAGES[14],
  },
  {
    id: 'support',
    title: '24/7 Support',
    icon: 'fa6-solid:headset',
    description:
      'Need help? Our dedicated support team is available around the clock via chat, email, and phone. Whether it\'s booking questions, special requests, or unexpected issues, we\'re here to make your stay perfect. No question is too small.',
    imageUrl: AIRBNB_IMAGES[15],
  },
];

const currentTabData = computed(() => {
  return tabs.find((tab) => tab.id === activeTab.value) || tabs[0];
});
</script>
