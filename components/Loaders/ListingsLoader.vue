<template>
  <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[18px]">
    <div
      v-for="index in 5"
      :key="index"
      class="rounded-[16px] bg-white border border-rose-100 shadow-md overflow-hidden"
    >
      <!-- Image Skeleton -->
      <div class="h-[260px] sm:h-[240px] lg:h-[200px] xl:h-[220px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
      </div>

      <!-- Content Skeleton -->
      <div class="p-[14px] space-y-[10px]">
        
        <!-- Property Type & Category Row -->
        <div class="flex items-center justify-between gap-2">
          <div class="h-[16px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-[80px] animate-pulse"></div>
          <div class="h-[20px] bg-gradient-to-r from-rose-100 via-rose-50 to-rose-100 rounded-full w-[70px] animate-pulse border border-rose-200"></div>
        </div>

        <!-- Title Lines -->
        <div class="space-y-[6px]">
          <div class="h-[14px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-[95%] animate-pulse"></div>
          <div class="h-[14px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-[80%] animate-pulse"></div>
        </div>

        <!-- Location Line -->
        <div class="h-[14px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-[85%] animate-pulse"></div>

        <!-- Price Row -->
        <div class="flex items-center justify-between pt-[6px] border-t border-rose-100">
          <div class="h-[18px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-[50px] animate-pulse"></div>
          <div class="h-[14px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-[16px] animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListingsLoader",
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
