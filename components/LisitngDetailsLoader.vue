<template>
    <div class="w-full overflow-x-hidden xl:px-[160px] pt-[100px] lg:pt-[120px] min-h-screen p-6 bg-white">
      <div class="w-full h-6 bg-gray-200 animate-pulse-fast mb-[25px] rounded"></div>
  
      <div class="grid w-full overflow-hidden gap-[6px] grid-cols-5 rounded-[25px]">
        <div class="col-span-5 h-[250px] sm:h-[350px] md:h-[430px] md:col-span-3">
          <div class="col-span-2 h-full bg-gray-200 rounded animate-pulse-fast"></div>
        </div>
  
        <div class="hidden h-[430px] col-span-2 md:grid grid-cols-2 grid-rows-2 gap-[6px]">
          <div class="bg-gray-200 rounded animate-pulse-fast"></div>
          <div class="bg-gray-200 rounded animate-pulse-fast"></div>
          <div class="bg-gray-200 rounded animate-pulse-fast"></div>
          <div class="bg-gray-200 rounded animate-pulse-fast"></div>
        </div>
      </div>
  
      <div class="h-[55px] mt-[15px] animate-pulse-fast bg-gray-200 rounded-xl"></div>
      <div class="w-full mt-[18px] grid lg:grid-cols-2">
        <div class="w-full lg:order-1 order-2 space-y-2">
          <div v-for="i in 7" :key="'loader-' + i" class="h-[35px] animate-pulse-fast bg-gray-200 rounded lg:w-[85%] lg:ml-[45px]"></div>
        </div>
        <div class="bg-gray-200 animate-pulse-fast rounded-[25px] lg:w-[75%] lg:ml-auto mb-[15px] lg:mb-0 h-[310px]"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ListingDetailsLoader'
  }
  </script>
  
  <style scoped>
  /* You can add specific styles here if needed */
  </style>
  