<template>
    <div class="bg-white w-full min-h-screen flex justify-center items-center">
      <div>
        <div class="animate-spin">
          <div class="lg:scale-[0.7] scale-[0.65] custom-loader"></div>
        </div>
        <p class="text-[14px] text-rose-700 font-[600]">Loading ...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loader',
  }
  </script>