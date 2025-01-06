<template>
    <div>
      <h2 class="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">
        Place Link for Place and Cover Image:
      </h2>
      <label>Place Picture</label>
      <input
        type="text"
        name="images.placePicture"
        placeholder="Enter image URL for Place Picture"
        v-model="formData.images.placePicture"
        @input="handleChange"
        class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4 placeholder:text-[14px]"
      />
      <label>Cover Picture</label>
      <input
        type="text"
        name="images.coverPicture"
        placeholder="Enter image URL for Cover Picture"
        v-model="formData.images.coverPicture"
        @input="handleChange"
        class="w-full py-2 border-b border-gray-400 focus:outline-none mb-4 placeholder:text-[14px]"
      />
      <button
        @click="setCurrentStep(5)"
        class="bg-gray-600 text-white mr-[10px] mt-auto ml-auto px-[25px] py-[5px] rounded-lg"
      >
        Back
      </button>
      <button
        @click="setCurrentStep(7)"
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
  