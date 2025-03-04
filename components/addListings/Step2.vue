<template>
    <div>
      <h2 class="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Enter Property Details:</h2>
      <label>Max Number Of Guests</label>
      <input
        type="number"
        name="maxGuests"
        v-model="formData.maxGuests"
        @input="handleChange"
        class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
      />
      <label>Bedrooms</label>
      <input
        type="number"
        name="bedrooms"
        v-model="formData.bedrooms"
        @input="handleChange"
        class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
      />
      <label>Bathrooms</label>
      <input
        type="number"
        name="bathrooms"
        v-model="formData.bathrooms"
        @input="handleChange"
        class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
      />
      <label>Price</label>
      <input
        type="number"
        name="price"
        v-model="formData.price"
        @input="handleChange"
        class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
      />
      <button
        @click="setCurrentStep(1)"
        class="bg-gray-600 text-white mr-[10px] mt-auto ml-auto px-[25px] py-[5px] rounded-lg"
      >
        Back
      </button>
      <button
        @click="setCurrentStep(3)"
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
      handleChange: Function,
      setCurrentStep: Function,
    },
  };
  </script>
  