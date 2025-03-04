<template>
    <div class="lg:w-[750px] w-[350px] md:w-[450px]">
      <h2 class="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">
        Enter Customer Rules and Guidelines
      </h2>
      <div v-for="(amenity, index) in formData.amenities" :key="index" class="flex items-center mb-2">
        <input
          type="text"
          :value="amenity"
          @input="(e) => handleAmenityChange(index, e.target.value)"
          class="w-[80%] lg:w-[77%] p-2 border-b border-gray-400"
        />
        <button
          @click="handleAmenityRemove(index)"
          class="text-red-700 text-[15px] lg:text-[22px] mb-[-20px] ml-[15px]"
        >
          <Icon name="ri:delete-bin-line" />
        </button>
      </div>
      <button
        @click="handleAmenityAdd"
        class="bg-green-700 text-[14px] mb-[12px] text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
      >
        Add Amenity
      </button>
      <br />
      <button
        @click="setCurrentStep(3)"
        class="bg-gray-600 text-white mr-[10px] mt-auto ml-auto px-[25px] py-[5px] rounded-lg"
      >
        Back
      </button>
      <button
        @click="setCurrentStep(5)"
        class="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
      >
        Next
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      formData: Object,
      setCurrentStep: Function,
      handleAmenityChange: Function,
      handleAmenityRemove: Function,
      handleAmenityAdd: Function,
    },
  };
  </script>
  