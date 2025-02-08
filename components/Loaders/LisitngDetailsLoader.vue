<template>
    <div class="w-full overflow-x-hidden xl:px-[160px] pt-[100px] lg:pt-[120px] min-h-screen p-6 bg-white">
      <!-- Top loading bar -->
      <div class="w-[300px] animate-pulse-fast h-12 bg-gray-200  mb-[25px] rounded-[10px]"></div>
  
      <!-- Image grid section -->
      <div class="grid w-full overflow-hidden gap-[6px] grid-cols-5 rounded-[25px]">
        <!-- Main image placeholder -->
        <div class="col-span-5 h-[250px] sm:h-[350px] md:h-[430px] md:col-span-3">
          <div class="col-span-2 h-full animate-pulse-fast bg-gray-200 rounded "></div>
        </div>
  
        <!-- Thumbnail grid placeholders (hidden on mobile) -->
        <div class="hidden h-[430px] col-span-2 md:grid grid-cols-2 grid-rows-2 gap-[6px]">
          <div class="bg-gray-200 rounded animate-pulse-fast"></div>
          <div class="bg-gray-200 rounded animate-pulse-fast"></div>
          <div class="bg-gray-200 rounded animate-pulse-fast"></div>
          <div class="bg-gray-200 rounded animate-pulse-fast"></div>
        </div>
      </div>
  
      <!-- Title placeholder -->
      <div class="h-[55px] mt-[15px] animate-pulse-fast bg-gray-200 rounded-xl"></div>
  
      <!-- Details section -->
      <div class="w-full mt-[18px] grid lg:grid-cols-2">
        <!-- Left column (text placeholders) -->
        <div class="w-full lg:order-1 order-2 space-y-2">
          <div class="h-[35px] animate-pulse-fast  bg-gray-200 rounded lg:w-[90%] lg:ml-[45px]"></div>
          <div class="h-[35px] animate-pulse-fast  bg-gray-200 rounded lg:w-[90%] lg:ml-[45px]"></div>
          <div class="h-[35px] animate-pulse-fast  bg-gray-200 rounded lg:w-[90%] lg:ml-[45px]"></div>
          <div class="h-[35px] animate-pulse-fast  bg-gray-200 rounded lg:w-[90%] lg:ml-[45px]"></div>
          <div class="h-[35px] animate-pulse-fast  bg-gray-200 rounded lg:w-[90%] lg:ml-[45px]"></div>
          <div class="h-[35px] animate-pulse-fast  bg-gray-200 rounded lg:w-[90%] lg:ml-[45px]"></div>
          <div class="h-[35px] animate-pulse-fast  bg-gray-200 rounded lg:w-[90%] lg:ml-[45px]"></div>
        </div>
  
        <!-- Right column (large placeholder) -->
        <div class="bg-gray-200 animate-pulse-fast rounded-[25px] lg:w-[100%] lg:ml-auto mb-[15px] lg:mb-0 h-[310px]"></div>
      </div>
    </div>
  </template>
  
  
<script>
export default {
  name: "LisitngDetailsLoader",
};
</script>
   