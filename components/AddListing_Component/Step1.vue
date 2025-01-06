<template>
    <div>
      <h2 class="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">
        Enter Property's Info:
      </h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          v-model="formData.name"
          @input="handleChange"
          class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Description</label>
        <textarea
          name="summary"
          placeholder="Write a short Description about your property ..."
          v-model="formData.summary"
          @input="handleChange"
          class="w-full py-2 placeholder:text-[14px] appearance-none border-b border-gray-400 focus:outline-none mb-4"
        ></textarea>
        <label>Property Type</label>
        <input
          type="text"
          name="property_type"
          v-model="formData.property_type"
          @input="handleChange"
          class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <div @click="isModalOpen = true" class="flex items-center mb-[20px] cursor-pointer">
          <div class="text-[17px] text-rose-800 font-[600]">Selected Category:</div>
          <div class="bg-gradient-to-r text-[12px] ml-[20px] from-rose-600 to-rose-900 text-white px-[15px] py-[3px] rounded-lg">
            {{ formData.category || 'Select a category' }}
          </div>
        </div>
      </div>
  
      <!-- Modal for Categories -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white w-[85vw] md:max-w-3xl h-[70vh] overflow-y-auto flex flex-col no-scrollbar p-6 rounded-lg">
          <button @click="isModalOpen = false" class="text-[28px] ml-auto text-gray-700 hover:text-gray-400">
            <Icon name="fa:times" />
          </button>
          <h3 class="text-xl sm:mt-[-20px] font-semibold text-center mb-4">Choose a Category</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div
              v-for="category in categories"
              :key="category.name"
              class="flex items-center p-4 border rounded-lg shadow-md cursor-pointer hover:bg-rose-100"
              @click="handleCategoryClick(category.name)"
            >
              <Icon :name="category.icon" class="text-[20px] text-rose-600 mb-[3px] mr-[8px]" />
              <span class="text-center whitespace-nowrap text-gray-700">{{ category.name }}</span>
            </div>
          </div>
        </div>
      </div>
  
      <button
        @click="setCurrentStep(2)"
        class="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
      >
        Next
      </button>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    props: {
      formData: Object,
      handleChange: Function,
      setCurrentStep: Function,
      categories: Array,
    },
    setup() {
      const isModalOpen = ref(false);
  
      const handleCategoryClick = (category) => {
        this.handleChange({ target: { name: "category", value: category } });
        isModalOpen.value = false;
      };
  
      return { isModalOpen, handleCategoryClick };
    },
  };
  </script>
  