<template>
  <!-- Backdrop: Mobile + Desktop with blur, animated with vue-motion -->
  <div 
    v-motion="backdropAnimation"
    class="fixed inset-0 z-[999] bg-black bg-opacity-60 backdrop-blur-[5px]"
    @click.self="closeModal">
  </div>

  <!-- Modal: Desktop slides right-to-left, Mobile slides bottom-to-top -->
  <div class="fixed inset-0 z-[1000] pointer-events-none flex md:items-start md:justify-end items-end justify-center md:justify-start">
    <!-- Desktop Modal -->
    <div 
      v-if="isDesktop"
      :class="`bg-white h-full overflow-y-auto no-scrollbar rounded-none w-[500px] px-6 pt-6 shadow-2xl pointer-events-auto`"
      v-motion="desktopAnimation"
    >
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

        <div class="mb-[45px]">
          <h3 class="font-medium">Price Range</h3>
          <p class="text-[12px] mb-[15px] text-gray-500">Nightly prices before fees and taxes</p>
          <div class="xl:pl-[12px] flex overflow-hidden rotate-180 scale-x-[-1] w-full mb-2">
            <div v-for="(randomHeight, index) in heights" :key="index"
              :class="`w-full ${isInRange(index) ? 'bg-pink-500' : 'bg-gray-300'}`"
              :style="{ flex: '0 0 auto', width: `${barWidth}px`, marginRight: '1px', height: `${randomHeight}px` }"></div>
          </div>
          <div class="flex justify-between mt-2">
            <span>${{ minPrice }}</span>
            <span>${{ maxPrice }}+</span>
          </div>
          <div class="relative mt-8">
            <input type="range"
              class="absolute w-full slider-thumb text-rose-700 appearance-none bg-transparent z-20 pointer-events-auto"
              style="top: -15px"
              min="10" max="250" v-model.number="minPrice" />
            <div class="absolute inset-0 bg-gray-300 h-1 rounded-full" style="top: 0"></div>
            <div class="absolute bg-pink-500 h-1 rounded-full"
              :style="{ left: `${((minPrice - 10) / 240) * 100}%`, right: `${100 - ((maxPrice - 10) / 240) * 100}%`, top: 0 }">
            </div>
            <input type="range"
              class="absolute w-full slider-thumb2 appearance-none bg-transparent z-20 pointer-events-auto"
              style="top: 15px"
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
          class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-16 px-2">
          <div
            class="bg-white w-full md:max-w-5xl max-h-[75vh] overflow-y-auto flex flex-col no-scrollbar p-6 rounded-2xl shadow-2xl">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-[20px] font-[700] text-rose-700">Choose Your Property Type</h3>
              <button @click="isCategoryModalOpen = false"
                class="text-[32px] text-gray-400 hover:text-rose-600 transition duration-200">
                <Icon name="close-circle" />
              </button>
            </div>
            
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              <div v-for="category in categories" :key="category.name"
                class="flex flex-col items-center justify-center px-3 py-5 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl shadow-sm cursor-pointer hover:from-rose-50 hover:to-rose-100 hover:border-rose-400 hover:shadow-lg transition duration-300 hover:scale-105"
                @click="handleCategoryClick(category.name)">
                <Icon :name="category.icon" class="text-[28px] text-rose-600 mb-3" />
                <span class="text-center text-[11px] font-[500] text-gray-800 leading-tight">{{ category.name }}</span>
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

    <!-- Mobile Modal -->
    <div 
      v-else
      :class="`bg-white w-[99%] sm:w-11/12 max-w-[550px] sm:pb-6 pb-[150px] sm:mb-[-100px] mb-[-150px] px-6 pt-6 shadow-lg rounded-lg pointer-events-auto`"
      v-motion="mobileAnimation"
    > 
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

          <div class="mb-[65px]">
            <h3 class="font-medium">Price Range</h3>
            <p class="text-[12px] mb-[15px] text-gray-500">Nightly prices before fees and taxes</p>
            <div class="xl:pl-[12px] flex overflow-hidden rotate-180 scale-x-[-1] w-full mb-2">
              <div v-for="(randomHeight, index) in heights" :key="index"
                :class="`w-full ${isInRange(index) ? 'bg-pink-500' : 'bg-gray-300'}`"
                :style="{ flex: '0 0 auto', width: `${barWidth}px`, marginRight: '1px', height: `${randomHeight}px` }"></div>
            </div>
            <div class="flex justify-between mt-2">
              <span>${{ minPrice }}</span>
              <span>${{ maxPrice }}+</span>
            </div>
            <div class="relative mt-8">
              <input type="range"
                class="absolute w-full slider-thumb text-rose-700 appearance-none bg-transparent z-20 pointer-events-auto"
                style="top: -15px"
                min="10" max="250" v-model.number="minPrice" />
              <div class="absolute inset-0 bg-gray-300 h-1 rounded-full" style="top: 0"></div>
              <div class="absolute bg-pink-500 h-1 rounded-full"
                :style="{ left: `${((minPrice - 10) / 240) * 100}%`, right: `${100 - ((maxPrice - 10) / 240) * 100}%`, top: 0 }">
              </div>
              <input type="range"
                class="absolute w-full slider-thumb2 appearance-none bg-transparent z-20 pointer-events-auto"
                style="top: 15px"
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
            class="fixed inset-0 z-50 items-start justify-center pt-16 px-2">
            <div
              class="bg-white w-full md:max-w-5xl max-h-[70vh] overflow-y-auto flex flex-col no-scrollbar p-6 rounded-2xl shadow-2xl">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-[20px] font-[700] text-rose-700">Choose Your Property Type</h3>
                <button @click="isCategoryModalOpen = false"
                  class="text-[32px] text-gray-400 hover:text-rose-600 transition duration-200">
                  <Icon name="close-circle" />
                </button>
              </div>
              
              <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                <div v-for="category in categories" :key="category.name"
                  class="flex flex-col items-center justify-center px-3 py-5 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl shadow-sm cursor-pointer hover:from-rose-50 hover:to-rose-100 hover:border-rose-400 hover:shadow-lg transition duration-300 hover:scale-105"
                  @click="handleCategoryClick(category.name)">
                  <Icon :name="category.icon" class="text-[28px] text-rose-600 mb-3" />
                  <span class="text-center text-[11px] font-[500] text-gray-800 leading-tight">{{ category.name }}</span>
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
import { ref, onMounted, computed } from "vue";
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
    const isDesktop = ref(false);
    const barWidth = ref(6.5);
    const containerWidth = ref(500);

    const categories = [
      { name: 'All', icon: 'fa-solid:border-all' },
      { name: 'Apartment', icon: 'fa-solid:building' },
      { name: 'Mountain', icon: 'fa-solid:mountain' },
      { name: 'Mansions', icon: 'fa-solid:snowflake' },
      { name: 'Hotel', icon: 'fa-solid:hotel' },
      { name: 'Castle', icon: 'mdi:castle' },
      { name: 'House', icon: 'fa-solid:home' },
      { name: 'Villa', icon: 'fa-solid:tree' },
      { name: 'Condo', icon: 'fa-solid:city' },
      { name: 'Cabin', icon: 'fa-solid:fire-alt' },
      { name: 'Beachfront', icon: 'fa-solid:umbrella-beach' },
      { name: 'Campground', icon: 'fa-solid:campground' },
      { name: 'Room', icon: 'fa-solid:bed' },
      { name: 'Warehouse', icon: 'fa-solid:warehouse' },
      { name: 'Boat', icon: 'fa-solid:ship' },
      { name: 'RV', icon: 'fa-solid:caravan' },
      { name: 'Island', icon: 'fa-solid:anchor' },
      { name: 'Eco', icon: 'fa-solid:globe' },
      { name: 'Poolside', icon: 'fa-solid:swimming-pool' },
      { name: 'Pet', icon: 'fa-solid:dog' },
      { name: 'Spa', icon: 'fa-solid:spa' },
    ];

    const toggleClose = () => {
      emit("update:onClose", !props.onClose);
    };

    const checkScreenSize = () => {
      isDesktop.value = window.innerWidth >= 768;
    };

    const backdropAnimation = computed(() => ({
      initial: { opacity: 0 },
      enter: {
        opacity: 1,
        transition: {
          type: 'tween',
          duration: isDesktop.value ? 400 : 500,
          ease: 'easeOut',
        },
      },
    }));

    const desktopAnimation = {
      initial: { x: 600, opacity: 0 },
      enter: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 400,
          ease: 'easeOut',
        },
      },
    };

    const mobileAnimation = {
      initial: { y: 900, opacity: 0 },
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 500,
          ease: 'easeInOut',
        },
      },
    };

    const calculateBars = () => {
      const container = isDesktop.value ? 500 : window.innerWidth - 48;
      containerWidth.value = container;
      const numBars = Math.floor((container - 12) / (barWidth.value + 1));
      heights.value = Array.from({ length: numBars }, () => Math.floor(Math.random() * (80 - 10 + 1)) + 10);
    };

    onMounted(() => {
      calculateBars();
      checkScreenSize();
      window.addEventListener('resize', () => {
        checkScreenSize();
        calculateBars();
      });
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
      console.log(searchFilters);
      useAuthStore().setSearchFilters(searchFilters);

      router.push("/listing/search-listing");
      toggleClose();
    };

    const closeModal = () => {
      toggleClose();
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
      isDesktop,
      desktopAnimation,
      mobileAnimation,
      backdropAnimation,
      barWidth,
      containerWidth,
    };
  },
};
</script>