<template>
    <section class="py-[15px] border-t-[2px] border-gray-200 bg-white sm:pt-16 lg:pt-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 xl:mx-[60px]">
        <div class="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <!-- Logo and Description -->
          <div class="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <h2 class="text-[24px] font-[600] text-rose-700">StaySuite</h2>
  
            <p class="text-base leading-relaxed text-gray-600 mt-2">
                Find your perfect rental or list your property effortlessly. We connect guests with unique stays and help owners manage bookings seamlessly. Simplify your rental experience today.
            </p>
  
            <!-- Social Media Links -->
            <ul class="flex items-center space-x-3 mt-9">
              <li v-for="social in socialLinks" :key="social.name">
                <a :href="social.url" :title="social.name" class="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                  <component :is="social.icon" class="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
  
          <!-- Company Links -->
          <div>
            <p class="text-sm font-semibold tracking-widest text-gray-400 uppercase">Company</p>
            <ul class="mt-6 space-y-4">
              <li v-for="link in companyLinks" :key="link.text">
                <NuxtLink :to="link.url" class="flex text-base text-black transition-all duration-200 hover:text-rose-600 focus:text-rose-600">
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
  
          <!-- Help Links -->
          <div>
            <p class="text-sm font-semibold tracking-widest text-gray-400 uppercase">Help</p>
            <ul class="mt-6 space-y-4">
              <li v-for="link in helpLinks" :key="link.text">
                <NuxtLink :to="link.url" class="flex text-base text-black transition-all duration-200 hover:text-rose-600 focus:text-rose-600">
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
  
          <!-- Newsletter Form -->
          <div class="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p class="text-sm font-semibold tracking-widest text-gray-400 uppercase">Subscribe to newsletter</p>
            <form @submit.prevent="subscribe" class="mt-6">
              <div>
                <label for="email" class="sr-only">Email</label>
                <input v-model="email" type="email" id="email" placeholder="Enter your email" class="block w-full px-4 py-[4px] text-black placeholder-gray-500 transition-all duration-200 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
              </div>
              <button type="submit" class="inline-flex items-center justify-center px-6 py-1 mt-3 font-semibold text-white transition-all text-[14px] duration-200 bg-rose-600 rounded-lg hover:bg-rose-700 focus:bg-rose-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        <hr class="my-[25px] border-gray-200" />
  
        <!-- Copyright -->
        <p class="text-sm text-center text-gray-600">© Copyright {{ currentYear }}, All Rights Reserved by Postcraft</p>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Dynamic year
  const currentYear = new Date().getFullYear();
  
  // Social media links
  const socialLinks = [
    { name: 'Twitter', url: 'https://www.airbnb.com/', icon: 'TwitterIcon' },
    { name: 'Facebook', url: 'https://www.airbnb.com/', icon: 'FacebookIcon' },
    { name: 'Instagram', url: 'https://www.airbnb.com/', icon: 'InstagramIcon' },
    { name: 'GitHub', url: 'https://www.airbnb.com/', icon: 'GitHubIcon' },
  ];
  
  // Company links
  const companyLinks = [
    { text: 'About', url: '/footer/privacy-policy' },
    { text: 'Features', url: '/footer/privacy-policy' },
    { text: 'Works', url: '/footer/privacy-policy' },
    { text: 'Career', url: '/footer/privacy-policy' },
  ];
  
  // Help links
  const helpLinks = [
    { text: 'Customer Support', url: '/footer/privacy-policy' },
    { text: 'Delivery Details', url: '/footer/privacy-policy' },
    { text: 'Terms & Conditions', url: '/footer/privacy-policy' },
    { text: 'Privacy Policy', url: '/footer/privacy-policy' },
  ];
  
  // Newsletter email
  const email = ref('');
  
  // Newsletter subscription handler
  const subscribe = () => {
    console.log('Subscribed with email:', email.value);
    // Add your subscription logic here
  };
  </script>