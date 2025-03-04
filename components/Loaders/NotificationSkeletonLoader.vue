<template>
  <div class="flex flex-col space-y-[15px]">
    <div v-for="index in 5" :key="index" class="flex flex-col">
      <!-- Header skeleton -->
      <div class="flex items-center mb-[10px]">
        <div class="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-rose-200 animate-pulse-fast"></div>
        <div class="ml-[15px] flex-1">
          <div class="h-[20px] bg-rose-200 rounded-lg w-3/4 animate-pulse-fast"></div>
        </div>
      </div>

      <!-- Content skeleton -->
      <div class="ml-[49px] flex flex-col space-y-[8px]">
        <div class="h-[16px] bg-rose-200 rounded-lg w-full animate-pulse-fast"></div>
        <div class="h-[16px] bg-rose-200 rounded-lg w-5/6 animate-pulse-fast"></div>
        <div class="h-[14px] bg-rose-200 rounded-lg w-1/3 animate-pulse-fast mt-[8px]"></div>
      </div>

      <!-- Border -->
      <div class="h-[1px] bg-rose-100 my-[15px]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationSkeletonLoader',
};
</script>
