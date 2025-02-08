<template>
  <div class="w-full z-[30] px-[25px] xl:px-[55px] overflow-x-hidden flex justify-center items-center flex-col">
    <div class="w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4 pb-[45px]">
        <div
          v-for="index in 15"
          :key="index"
          class="h-[290px] lg:h-[230px] xl:h-[240px] w-full md:w-[95%] bg-gray-200 rounded-xl animate-pulse-fast"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListingsLoader",
};
</script>
 
