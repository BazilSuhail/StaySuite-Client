<template>
    <div class="lg:w-[750px] w-[350px] md:w-[450px]">
      <h2 class="text-[18px] lg:text-xl text-rose-600 font-semibold mb-6">Upload Additional Images</h2>
      <div v-for="(image, index) in additionalImages" :key="index" class="mb-4 flex">
        <label class="block text-gray-700 font-medium mb-2">Image {{ index + 1 }}:</label>
        <input
          type="file"
          accept="image/*"
          @change="updateImage(index, $event.target.files[0])"
          class="ml-[15px] file:bg-rose-800 file:my-[2px] file:text-red-100 file:text-[13px] file:rounded-xl file:px-[15px] file:mr-[15px]"
        />
        <span v-if="image" class="ml-[10px] text-gray-700">Selected</span>
      </div>
      <button
        @click="setCurrentStep(8)"
        class="bg-gray-600 text-white mr-[10px] mt-[55px] px-[25px] py-[5px] rounded-lg"
      >
        Back
      </button>
      <button
        @click="submitFiles"
        class="bg-green-600 text-white mr-[10px] mt-auto ml-auto px-[25px] py-[5px] rounded-lg"
      >
        Submit
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      additionalImages: Array, // Expecting additionalImages from the parent
      setFormData: Function, // To update parent form data
      handleFileSubmit: Function, // Handle file submission
      setCurrentStep: Function, // Change the current step
    },
    methods: {
      updateImage(index, file) {
        // Emit the update to the parent to update the additionalImages array
        this.$emit("update:additionalImages", [
          ...this.additionalImages.slice(0, index),
          file,
          ...this.additionalImages.slice(index + 1),
        ]);
      },
      submitFiles() {
        // Check if at least one image is selected
        if (this.additionalImages.every((img) => img === null)) {
          alert("Please select at least one image!");
          return;
        }
  
        // Update the parent with the additional images
        this.setFormData((prev) => ({
          ...prev,
          additionalImages: this.additionalImages,
        }));
        this.handleFileSubmit();
      },
    },
  };
  </script>
  