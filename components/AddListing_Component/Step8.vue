<template>
    <div class="lg:w-[750px] w-[350px] md:w-[450px]">
      <h2 class="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Upload Place and Cover Image</h2>
      <label>Place Picture:</label>
      <br />
      <input
        type="file"
        accept="image/*"
        @change="handleFileChange($event, 'place')"
        class="my-[12px] file:bg-rose-800 file:my-[2px] file:text-red-100 file:text-[15px] file:rounded-xl file:px-[15px] file:mr-[15px]"
      />
      <br />
      <label>Cover Picture:</label>
      <br />
      <input
        type="file"
        accept="image/*"
        @change="handleFileChange($event, 'cover')"
        class="mt-[15px] file:bg-rose-800 file:my-[2px] file:text-red-100 file:text-[15px] file:rounded-xl file:px-[15px] file:mr-[15px]"
      />
      <br />
      <button
        @click="setCurrentStep(5)"
        class="bg-gray-600 text-white mr-[10px] mt-[155px] px-[25px] py-[5px] rounded-lg"
      >
        Back
      </button>
      <button
        @click="saveAndContinue"
        class="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
      >
        Next
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      setFormData: Function,
      setCurrentStep: Function,
    },
    data() {
      return {
        placeImage: null,
        coverImage: null,
      };
    },
    methods: {
      handleFileChange(event, type) {
        const file = event.target.files[0];
        if (type === "place") this.placeImage = file;
        if (type === "cover") this.coverImage = file;
      },
      saveAndContinue() {
        this.setFormData((prev) => ({
          ...prev,
          placeImage: this.placeImage,
          coverImage: this.coverImage,
        }));
        this.setCurrentStep(9);
      },
    },
  };
  </script>
  