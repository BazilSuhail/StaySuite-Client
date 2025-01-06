<template>
    <div>
      <h2 class="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Place Links Property Images:</h2>
      <div v-for="(url, index) in formData.images.additionalPictures" :key="index">
        <input
          type="text"
          :value="url"
          :placeholder="`Enter image URL for Image ${index + 1}`"
          @input="updatePicture(index, $event.target.value)"
          class="w-full p-2 border rounded mb-2 placeholder:text-[14px]"
        />
      </div>
      <p class="mt-[15px]"></p>
      <button
        v-if="formData.images.additionalPictures.length < 5"
        @click="addPicture"
        class="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
      >
        Add Picture
      </button>
      <button
        @click="setCurrentStep(6)"
        class="bg-gray-600 text-white mr-[10px] mt-auto ml-auto px-[25px] py-[5px] rounded-lg"
      >
        Back
      </button>
      <button
        @click="handleSubmit"
        class="bg-green-800 text-green-50 mr-[10px] mt-auto ml-auto px-[25px] py-[5px] rounded-lg"
      >
        Submit
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      formData: Object,
      setFormData: Function,
      handleSubmit: Function,
      setCurrentStep: Function,
    },
    methods: {
      updatePicture(index, value) {
        const updatedPictures = [...this.formData.images.additionalPictures];
        updatedPictures[index] = value;
        this.setFormData({
          ...this.formData,
          images: { ...this.formData.images, additionalPictures: updatedPictures },
        });
      },
      addPicture() {
        this.setFormData({
          ...this.formData,
          images: {
            ...this.formData.images,
            additionalPictures: [...this.formData.images.additionalPictures, ""],
          },
        });
      },
    },
  };
  </script>
  