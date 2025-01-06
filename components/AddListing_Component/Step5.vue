<template>
    <div class="container lg:w-[630px] w-[335px] md:w-[450px]">
      <h2 class="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">
        Choose Image Upload Method:
      </h2>
      <div class="flex flex-col items-center justify-center">
        <label
          class="flex items-center w-[325px] py-[25px] my-[25px] px-2 border-2 text-rose-900 font-[500] rounded-lg cursor-pointer"
          :class="{ 'border-rose-600 bg-rose-100': uploadMethod === 'url', 'border-gray-300': uploadMethod !== 'url' }"
          @click="setUploadMethod('url')"
        >
          <Icon name="fa:link" class="text-rose-600 mr-2" />
          <span>Upload Property Info via Image Links</span>
        </label>
        <label
          class="flex items-center w-[325px] py-[25px] px-2 border-2 text-rose-900 font-[500] rounded-lg cursor-pointer"
          :class="{ 'border-rose-600 bg-rose-100': uploadMethod === 'file', 'border-gray-300': uploadMethod !== 'file' }"
          @click="setUploadMethod('file')"
        >
          <Icon name="fa:regular-image" class="text-rose-600 mr-2" />
          <span>Upload Property Info via Image Files</span>
        </label>
      </div>
      <button
        @click="setCurrentStep(4)"
        class="bg-gray-600 mt-[45px] text-white mr-[10px] px-[25px] py-[5px] rounded-lg"
      >
        Back
      </button>
      <button
        @click="setCurrentStep(uploadMethod === 'url' ? 6 : 8)"
        class="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
      >
        Next
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      uploadMethod: String,
      setUploadMethod: Function,
      setCurrentStep: Function,
    },
  };
  </script>
  