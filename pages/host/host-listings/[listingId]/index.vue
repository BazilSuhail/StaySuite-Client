<template>
  <!-- Loader -->

  <div v-if="isLoading" class="flex items-center justify-center h-screen">
    <div class="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
  </div>

  <div v-else class="bg-gray-50 flex px-4 flex-col justify-center pt-[110px] xl:px-[250px] min-h-screen items-center">
    <div class="p-6 w-full bg-white border rounded-lg shadow-md">
      <h3 class="text-[20px] lg:text-[24px] mb-[8px] text-rose-600 font-[700] text-center">
        Edit Property Details Listing
      </h3>
      <div class="w-full h-[1.5px] bg-rose-400 rounded-xl"></div>
      <form @submit.prevent="handleSubmit" class="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- First Column -->
        <div class="space-y-4 md:col-span-1 col-span-3">
          <div class="pt-[18px]">
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:home" class="mr-2" />
              Name
            </label>
            <input type="text" v-model="formData.name" required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:image" class="mr-2" />
              Summary
            </label>
            <textarea v-model="formData.summary" required
              class="w-full h-[120px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:home" class="mr-2" />
              Property Type
            </label>
            <input type="text" v-model="formData.property_type" required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <!-- Second Column -->
        <div class="space-y-4 md:col-span-1 col-span-3">
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="ic:baseline-attach-money" class="mr-2" />
              Category
            </label>
            <div @click="isModalOpen = true"
              class="mt-[8px] mb-[27px] bg-gradient-to-r text-[14px] text-center w-[95px] from-rose-600 to-rose-900 text-white py-[3px] rounded-[28px]">
              {{ formData.category || "Select a category" }}
            </div>
          </div>
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="ic:baseline-attach-money" class="mr-2" />
              Price
            </label>
            <input type="number" v-model="formData.price" required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:bed" class="mr-2" />
              Bedrooms
            </label>
            <input type="number" v-model="formData.bedrooms" required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:bath" class="mr-2" />
              Bathrooms
            </label>
            <input type="number" v-model="formData.bathrooms" required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <!-- Third Column -->
        <div class="space-y-4 md:col-span-1 col-span-3">
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:location-arrow" class="mr-2" />
              Max Accommodation
            </label>
            <input type="text" v-model="formData.maxGuests" required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:location-arrow" class="mr-2" />
              Street
            </label>
            <input type="text" v-model="formData.address.street" required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:location-arrow" class="mr-2" />
              Suburb
            </label>
            <input type="text" v-model="formData.address.suburb" required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:location-arrow" class="mr-2" />
              Country
            </label>
            <input type="text" v-model="formData.address.country" required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <!-- Amenities -->
        <div class="col-span-3 space-y-4">
          <label class="text-gray-600 mb-1 flex items-center">
            <Icon name="fa:plus-circle" class="mr-2" />
            Amenities
          </label>
          <div v-for="(amenity, index) in formData.amenities" :key="index" class="flex items-center space-x-2 mb-2">
            <input type="text" v-model="formData.amenities[index]"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button @click="removeAmenity(index)" type="button" class="text-red-500 hover:text-red-700">
              <Icon name="ic:baseline-delete-outline" />
            </button>
          </div>
          <button @click="addAmenity" type="button"
            class="bg-green-700 flex items-center mt-[15px] text-[14px] text-white px-3 py-1 rounded-xl hover:bg-green-600">
            <Icon name="fa:plus-circle" class="mr-2" />
            Add Amenity
          </button>
        </div>

        <div class="col-span-3 space-y-4">
          <!-- Place Picture URL -->
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:image" class="mr-2" />
              Place Picture URL
            </label>
            <input type="text" v-model="formData.images.placePicture"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <!-- Cover Picture URL -->
          <div>
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:image" class="mr-2" />
              Cover Picture URL
            </label>
            <input type="text" v-model="formData.images.coverPicture"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <!-- Additional Pictures -->
          <p class="mt-[25px]"></p>
          <label class="text-gray-600 mb-1 flex items-center">
            <Icon name="fa:image" class="mr-2" />
            Place Other Images
          </label>
          <div v-for="(url, index) in formData.images.additionalPictures" :key="index" class="space-y-2">
            <input type="text" v-model="formData.images.additionalPictures[index]" placeholder="Enter image URL"
              class="w-full p-2 border rounded placeholder:text-[14px]" />
          </div>

         

          <!-- Image Previews -->
          <aside class="col-span-3 space-y-4 space-x-[35px]">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Image Preview</h3>
            <div class="md:flex">
              <!-- Preview of Place Picture -->
              <div v-if="formData.images.placePicture" class="mb-4">
                <label class="block text-gray-600 mb-1">Place Picture Preview</label>
                <img :src="formData.images.placePicture" alt="Place Picture"
                  class="w-[250px] md:w-[150px] h-[160px] md:h-[100px] object-cover rounded-md" />
              </div>

              <!-- Preview of Cover Picture -->
              <div v-if="formData.images.coverPicture" class="mb-4 md:ml-[45px]">
                <label class="block text-gray-600 mb-1">Cover Picture Preview</label>
                <img :src="formData.images.coverPicture" alt="Cover Picture"
                  class="w-[250px] md:w-[150px] h-[160px] md:h-[100px] object-cover rounded-md" />
              </div>
            </div>
 
            <!-- Preview of Additional Pictures -->
<div class="grid grid-cols-1 md:grid-cols-3">
  <template v-if="formData.images && formData.images.additionalPictures && formData.images.additionalPictures.length">
    <div v-for="(url, index) in formData.images.additionalPictures" :key="index" class="mb-4">
      <label class="block text-gray-600 mb-1">Property Image {{ index + 1 }}'s Preview</label>
      <img :src="url" alt="Connection Error"
        class="w-[250px] md:w-[150px] h-[160px] md:h-[100px] object-cover rounded-md" />
    </div>
  </template>
</div>

          </aside>
        </div>

        <!-- Save Changes -->
        <div class="col-span-3 space-y-4">
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isModalOpen = ref(false);
    const isLoading = ref(true);
    const formData = ref({
      name: '',
      summary: '',
      property_type: '',
      bedrooms: 0,
      bathrooms: 0,
      price: 0,
      maxGuests: '',
      address: { street: '', suburb: '', country: '' },
      amenities: [],
      category: '',
      images: {
    additionalPictures: [], // Ensures an empty array exists
  },
    });

    const fetchListingDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings/${route.params.listingId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        //console.log(data.listing);
        Object.assign(formData.value, data.listing);
      } 
      catch (error) {
        console.error('Error fetching listing:', error);
      } 
      finally {
        isLoading.value = false; // Stop the loader once data is fetched
      }
    };

    const addAmenity = () => {
      formData.value.amenities.push('');
    };

    const removeAmenity = (index) => {
      formData.value.amenities.splice(index, 1);
    };

    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/update-listing/${route.params.listingId}`,
          formData.value,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('Listing updated successfully!');
        router.push('/host/host-listings');
      } 
      catch (error) {
        console.error('Error updating listing:', error);
      }
    };

    onMounted(fetchListingDetails);
    return { formData, isModalOpen, isLoading, addAmenity, removeAmenity, handleSubmit };
  },

};
</script>
