<template>
    <div>
      <h2 class="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Enter Property's Address:</h2>
      <label>Street</label>
      <input
        type="text"
        name="address.street"
        v-model="formData.address.street"
        @input="handleChange"
        class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
      />
      <label>Suburb</label>
      <input
        type="text"
        name="address.suburb"
        v-model="formData.address.suburb"
        @input="handleChange"
        class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
      />
      <label>Country</label>
      <input
        type="text"
        name="address.country"
        v-model="formData.address.country"
        @input="handleChange"
        class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
      />
      <button
        @click="setCurrentStep(2)"
        class="bg-gray-600 text-white mr-[10px] mt-auto ml-auto px-[25px] py-[5px] rounded-lg"
      >
        Back
      </button>
      <button
        @click="setCurrentStep(4)"
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
  