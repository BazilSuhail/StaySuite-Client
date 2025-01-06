<template>
    <div class="bg-gray-50 flex px-4 flex-col justify-center pt-[110px] min-h-screen items-center">
      <div class="max-w-[950px] p-6 bg-white border rounded-lg shadow-md">
        <h3 class="text-[24px] mb-[15px] text-rose-600 font-[700] text-center">
          Edit Property Details Listing
        </h3>
        <form @submit.prevent="handleSubmit" class="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- First Column -->
          <div class="space-y-4 md:col-span-1 col-span-3">
            <div class="pt-[18px]">
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:home" class="mr-2" />
                Name
              </label>
              <input
                type="text"
                v-model="formData.name"
                required
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:image" class="mr-2" />
                Summary
              </label>
              <textarea
                v-model="formData.summary"
                required
                class="w-full h-[120px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:home" class="mr-2" />
                Property Type
              </label>
              <input
                type="text"
                v-model="formData.property_type"
                required
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
          <!-- Second Column -->
          <div class="space-y-4 md:col-span-1 col-span-3">
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:dollar-sign" class="mr-2" />
                Category
              </label>
              <div
                @click="isModalOpen = true"
                class="mt-[8px] mb-[27px] bg-gradient-to-r text-[14px] text-center w-[95px] from-rose-600 to-rose-900 text-white py-[3px] rounded-[28px]"
              >
                {{ formData.category || "Select a category" }}
              </div>
            </div>
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:dollar-sign" class="mr-2" />
                Price
              </label>
              <input
                type="number"
                v-model="formData.price"
                required
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:bed" class="mr-2" />
                Bedrooms
              </label>
              <input
                type="number"
                v-model="formData.bedrooms"
                required
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:bath" class="mr-2" />
                Bathrooms
              </label>
              <input
                type="number"
                v-model="formData.bathrooms"
                required
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
          <!-- Third Column -->
          <div class="space-y-4 md:col-span-1 col-span-3">
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:location-arrow" class="mr-2" />
                Max Accommodation
              </label>
              <input
                type="text"
                v-model="formData.maxGuests"
                required
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:location-arrow" class="mr-2" />
                Street
              </label>
              <input
                type="text"
                v-model="formData.address.street"
                required
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:location-arrow" class="mr-2" />
                Suburb
              </label>
              <input
                type="text"
                v-model="formData.address.suburb"
                required
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-gray-600 mb-1 flex items-center">
                <Icon name="fa:location-arrow" class="mr-2" />
                Country
              </label>
              <input
                type="text"
                v-model="formData.address.country"
                required
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
          <!-- Amenities -->
          <div class="col-span-3 space-y-4">
            <label class="text-gray-600 mb-1 flex items-center">
              <Icon name="fa:plus-circle" class="mr-2" />
              Amenities
            </label>
            <div v-for="(amenity, index) in formData.amenities" :key="index" class="flex items-center space-x-2 mb-2">
              <input
                type="text"
                v-model="formData.amenities[index]"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button @click="removeAmenity(index)" type="button" class="text-red-500 hover:text-red-700">
                <Icon name="fa:trash-alt" />
              </button>
            </div>
            <button @click="addAmenity" type="button" class="bg-green-700 flex items-center mt-[15px] text-white px-3 py-1 rounded-xl hover:bg-green-600">
              <Icon name="fa:plus-circle" class="mr-2" />
              Add Amenity
            </button>
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
      });
  
      const fetchListingDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/listing/${route.params.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Object.assign(formData.value, data);
        } catch (error) {
          console.error('Error fetching listing:', error);
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
            `${import.meta.env.VITE_API_URL}/listing/update/${route.params.id}`,
            formData.value,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          alert('Listing updated successfully!');
          router.push('/listings');
        } catch (error) {
          console.error('Error updating listing:', error);
        }
      };
  
      onMounted(fetchListingDetails);
  
      return { formData, isModalOpen, addAmenity, removeAmenity, handleSubmit };
    },
  };
  </script>
  