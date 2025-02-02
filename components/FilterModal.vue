<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[999]">
    <div class="bg-white rounded-lg w-[95%] sm:w-11/12 max-w-[550px] sm:pb-6 pb-[150px] sm:mb-[-100px] mb-[-180px] px-6 pt-6 shadow-lg"
      v-motion="{
        initial: { y: 900 },
        enter: {
          y: 0,
          transition: {
            type: 'tween',
            duration: 500,
            ease: 'easeInOut',
          },
        },
      }"> 
        <div class="flex justify-between items-center border-b pb-4">
          <h2 class="text-lg font-semibold">Filters</h2>
          <button @click="closeModal" class="text-gray-500 mt-[-15px] hover:text-black text-[28px]">&times;</button>
        </div>

        <div class="mt-4">
          <div class="mb-[10px] pl-[6px] flex items-center border-[2px] border-gray-300 py-[4px] rounded-[12px]">
            <input type="text" placeholder="Search by title" v-model="title"
              class="outline-none pl-[5px] text-[14px] w-full" />
          </div>

          <div class="mb-6 grid grid-cols-2 gap-2">
            <input type="text" placeholder="Enter Country Name" v-model="country"
              class="pl-[10px] pr-2 py-[4px] text-[13px] outline-none border-[2px] border-gray-300 rounded-[12px]" />
            <input type="text" placeholder="Enter Suburb of Country (optional*)" v-model="suburb"
              class="pl-[10px] pr-2 py-[4px] text-[13px] outline-none border-[2px] border-gray-300 rounded-[12px]" />
          </div>

          <div class="mb-[65px] md:mb-[45px]">
            <h3 class="font-medium">Price Range</h3>
            <p class="text-[12px] mb-[15px] text-gray-500">Nightly prices before fees and taxes</p>
            <div class="xl:pl-[12px] flex overflow-hidden rotate-180 scale-x-[-1] w-full mb-2">
              <div v-for="(randomHeight, index) in heights" :key="index"
                :class="`w-full ${isInRange(index) ? 'bg-pink-500' : 'bg-gray-300'}`"
                :style="{ flex: '0 0 auto', width: '6.5px', marginRight: '1px', height: `${randomHeight}px` }"></div>
            </div>
            <div class="flex justify-between mt-2">
              <span>${{ minPrice }}</span>
              <span>${{ maxPrice }}+</span>
            </div>
            <div class="relative mt-2 mb-[15px]">
              <div class="absolute inset-0 bg-gray-300 h-1 rounded-full"></div>
              <div class="absolute bg-pink-500 h-1 rounded-full"
                :style="{ left: `${((minPrice - 10) / 240) * 100}%`, right: `${100 - ((maxPrice - 10) / 240) * 100}%` }">
              </div>
              <input type="range"
                class="absolute w-full slider-thumb text-rose-700 appearance-none bg-transparent z-10 pointer-events-auto"
                min="10" max="250" v-model.number="minPrice" />
              <input type="range"
                class="absolute w-full slider-thumb2 appearance-none bg-transparent mt-[15px] z-10 pointer-events-auto"
                min="10" max="250" v-model.number="maxPrice" />
            </div>
          </div>

          <div class="pt-[15px] mb-6 border-t-[2px] border-gray-300 border-b-[2px] pb-[28px]">
            <h3 class="font-medium">Beds and Bathrooms</h3>
            <div class="flex justify-between items-center mt-2">
              <span>Beds</span>
              <div class="flex items-center">
                <button
                  class="w-[25px] h-[25px] text-[19px] border rounded-full shadow-md text-gray-700 hover:text-black"
                  @click="beds = Math.max(0, beds - 1)">
                  <p class="mt-[-4px]">-</p>
                </button>
                <span class="px-4">{{ beds }}</span>
                <button
                  class="w-[25px] h-[25px] text-[19px] border rounded-full shadow-md text-gray-700 hover:text-black"
                  @click="beds++">
                  <p class="mt-[-4px]">+</p>
                </button>
              </div>
            </div>

            <div class="flex justify-between items-center mt-2">
              <span>Bathrooms</span>
              <div class="flex items-center">
                <button
                  class="w-[25px] h-[25px] text-[19px] border rounded-full shadow-md text-gray-700 hover:text-black"
                  @click="bathrooms = Math.max(0, bathrooms - 1)">
                  <p class="mt-[-4px]">-</p>
                </button>
                <span class="px-4">{{ bathrooms }}</span>
                <button
                  class="w-[25px] h-[25px] text-[19px] pt-[-15px] border rounded-full shadow-md text-gray-700 hover:text-black"
                  @click="bathrooms++">
                  <p class="mt-[-4px]">+</p>
                </button>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <div @click="isCategoryModalOpen = true" class="flex items-center mb-[20px]">
              <div class="text-[17px] text-rose-800 font-[600]">Selected Category:</div>
              <div
                class="bg-gradient-to-r text-[12px] ml-[20px] from-rose-600 to-rose-900 text-white px-[15px] py-[3px] rounded-lg">
                {{ category || 'Select a category' }}
              </div>
            </div>
          </div>

          <div v-if="isCategoryModalOpen"
            class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div
              class="bg-white w-[85vw] md:max-w-3xl h-[60vh] overflow-y-auto flex flex-col  no-scrollbar p-6 rounded-lg">
              <button @click="isCategoryModalOpen = false"
                class="text-[28px] ml-auto text-gray-700 hover:text-gray-400">
                <Icon name="close-circle" />
              </button>

              <h3 class="text-[14px] scale-x-[0.8] sm:mt-[-20px] font-[600] text-center text-rose-600 mb-4">Select
                Category</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="category in categories" :key="category.name"
                  class="flex items-center px-4 py-[4px] border rounded-lg shadow-md cursor-pointer hover:bg-rose-100"
                  @click="handleCategoryClick(category.name)">
                  <Icon :name="category.icon" class="text-[15px] text-rose-600 mb-[3px] mr-[8px]" />
                  <span class="text-center whitespace-nowrap text-[17px] text-gray-700">{{ category.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center mt-6 mb-[18px]">
          <button class="text-gray-700 underline hover:text-black" @click="resetFilters">Clear all</button>
          <button
            class="bg-rose-700 flex items-center text-white font-[600] px-[15px] py-[3px] rounded-[20px] hover:bg-rose-900 duration-200"
            @click="logValues">
            <Icon name="material-symbols:search" class="text-[17px] mt-[3px] mr-[3px]" />
            <span class="text-[14px]">Search</span>
          </button>
        </div>
    
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

export default {
  props: {
    onClose: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const title = ref("");
    const suburb = ref("");
    const country = ref("");
    const minPrice = ref(20);
    const maxPrice = ref(250);
    const beds = ref(0);
    const bathrooms = ref(0);
    const category = ref("Apartment");
    const isCategoryModalOpen = ref(false);
    const heights = ref([]);

    const categories = [
      { name: "Apartment", icon: "home" },
      { name: "Villa", icon: "villa" },
    ];
    const toggleClose = () => {
      emit("update:onClose", !props.onClose); // Emit an event to toggle the onClose value
    };
    onMounted(() => {
      heights.value = Array.from({ length: 50 }, () => Math.floor(Math.random() * (80 - 10 + 1)) + 10);
    });

    const handleCategoryClick = (selectedCategory) => {
      category.value = selectedCategory;
      isCategoryModalOpen.value = false;
    };

    const resetFilters = () => {
      title.value = "";
      suburb.value = "";
      country.value = "";
      minPrice.value = 10;
      maxPrice.value = 130;
      category.value = "Apartment";
      beds.value = "Any";
      bathrooms.value = "Any";
    };

    const logValues = () => {

      const searchFilters = {
        title: title.value,
        suburb: suburb.value,
        country: country.value,
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
        beds: beds.value,
        bathrooms: bathrooms.value,
        category: category.value,
      };
      console.log(searchFilters)
      useAuthStore().setSearchFilters(searchFilters);

      router.push("/listing/search-listing");
      toggleClose()
      
    };

    const closeModal = () => {
      toggleClose()
    };

    const isInRange = (index) => {
      const stepValue = 10 + index * 5;
      return stepValue >= minPrice.value && stepValue <= maxPrice.value;
    };

    return {
      title,
      suburb,
      country,
      minPrice,
      maxPrice,
      beds,
      bathrooms,
      category,
      isCategoryModalOpen,
      heights,
      categories,
      handleCategoryClick,
      resetFilters,
      logValues,
      closeModal,
      isInRange,
    };
  },
};
</script>