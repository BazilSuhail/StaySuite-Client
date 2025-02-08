<template>
  <div
    class="flex flex-col md:flex-row mb-[120px] mt-[70px] sm:mt-[90px] md:mt-[120px] justify-between max-w-6xl xl:max-w-[1100px] mx-auto p-4 space-y-6 md:space-y-0 md:space-x-6">

    <div v-if="error" class="text-red-500 text-center">
      <p>An error occurred: {{ error }}</p>
    </div>
    <div v-else class="grid lg:grid-cols-7">
      <!-- Left Column (Booking Form) -->
      <div class="flex-1 space-y-6 lg:col-span-4">

        <div class="border rounded-lg p-4 space-y-2 bg-gray-50">
          <h2 class="text-lg font-semibold">Request to book</h2>
          <p class="text-pink-600 flex items-center space-x-2">
            <Icon name="fa:shield" class="text-pink-600" />
            <span>This is a rare find, it is usually booked.</span>
          </p>
        </div>

        <!-- Calendar Section -->
       <div class="bg-gray-50 border rounded-lg py-[15px] xl:py-[25px] flex justify-center items-center">
        <div class="xl:scale-y-[1.1] scale-x-[1.1] xl:scale-x-[1.2]">
          <VDatePicker v-model="dateRange" v-model.range="dateRange" :disabled-dates="blockedDates" :allowed-dates="(date) => {
            return (
              !dateRange.value.start ||
              new Date(date) > new Date(dateRange.value.start)
            );
          }" />
        </div>
       </div>

        <!-- Selected Dates Section -->
        <div class="space-y-4 ">
          <div class="p-[15px] bg-gray-50 border border-gray-300 rounded-lg">
            <div class="flex justify-between items-center border-b pb-2">
              <p class="text-sm text-gray-500">Date</p>
              <Icon name="fa:edit" class="text-gray-500 cursor-pointer" />
            </div>
            <div>
              <div
                class="flex items-center font-[600] text-rose-800 px-[8px] border-b-[3px] border-gray-200 pb-[7px] justify-between">
                <p>Check-In</p>
                <p>Check-Out</p>
              </div>
              <div class="flex mt-[15px] items-center font-[600] text-gray-900 px-[8px] pb-[7px] justify-between">
                <p v-if="dateRange.start">{{ dateRange.start.toDateString() }}</p>
                <p v-if="dateRange.end">{{ dateRange.end.toDateString() }}</p>
              </div>
            </div>
          </div>

          <!-- Guest Inputs -->
          <div class="space-y-4">
            <div class="border rounded-lg p-4 space-y-2">
              <label class="text-sm text-gray-500">Enter Number of Adults:</label>
              <input type="number" placeholder="Enter Number of Adults" v-model="guests.adults"
                class="w-full border rounded-md p-2" />
              <label class="text-sm text-gray-500">Enter Number of Children:</label>
              <input type="number" placeholder="Enter Number of children" v-model="guests.children"
                class="w-full border rounded-md p-2" />
              <label class="text-sm text-gray-500">Enter Number of Infants:</label>
              <input type="number" placeholder="Enter Number of Infants" v-model="guests.infants"
                class="w-full border rounded-md p-2" />
            </div>
          </div>

          <!-- Price Details Section -->
          <div class="border rounded-lg p-4 space-y-2 bg-gray-50">
            <h3 class="text-lg font-semibold">Price details</h3>
            <div class="flex justify-between">
              <p>${{ listingPrice }} x {{ calculateNights() }} nights</p>
              <p>${{ listingPrice * calculateNights() }}</p>
            </div>
            <div class="flex justify-between text-green-600">
              <p>Weekly stay discount</p>
              <p>-$15.08</p>
            </div>
            <div class="flex justify-between">
              <p>Cleaning fee</p>
              <p>$29.16</p>
            </div>
            <div class="flex justify-between">
              <p>Airbnb service fee</p>
              <p>$150.00</p>
            </div>
            <hr />
            <div class="flex justify-between font-semibold">
              <p>Total (USD)</p>
              <p>${{ computedTotalAmount.toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Special Requests Section -->
        <div class="space-y-4">
          <div class="border rounded-lg p-4 space-y-2">
            <label class="text-sm text-gray-500">Special Requests</label>
            <textarea placeholder="Enter Your Request ..." v-model="specialRequests"
              class="w-full border focus:border-none no-scrollbar rounded-md px-2 pt-2 pb-[150px]" />
          </div>
          <button @click="handleBooking" :disabled="!dateRange.start || !dateRange.end || !guests.adults" 
            :class="(dateRange.start && dateRange.end && guests.adults) ? 'w-full rounded-md py-2 text-white bg-gradient-to-r text-[18px] from-pink-700 to-pink-900' : 'bg-rose-400 w-full text-red-200 rounded-md py-2'">
            <span class="text-[17px] font-[600]">Continue</span>
          </button>
        </div>
      </div>

      <!-- Right Column (Listing Details) -->
      <div class="lg:col-span-3 lg:px-[18px] lg:mt-0 mt-[25px]">
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600"></div>
        </div>

        <div v-else-if="listingDetails" class="space-y-6">
          <!-- Listing Details -->
          <div class="border rounded-lg p-4 bg-gray-50">
            <div class="flex items-center">
              <img :src="listingDetails.images.coverPicture" :alt="listingDetails.name" class="w-[75px] h-[75px] rounded-lg mr-[15px]" />
              <div class="space-y-2">
                <h3 class="text-[16px] font-semibold">{{ listingDetails.name }}</h3>
                <div class="flex items-center">
                  <Icon name="fa-solid:star" class="text-yellow-500 text-[14px]" />
                  <p class="font-[600] ml-[5px] text-gray-600 text-[14px]">{{ listingDetails.rating || '' }}</p>

                  <Icon name="material-symbols-light:shield" class="text-gray-300 ml-[8px] mr-[4px] text-[19px]" /> 
                  <p class="text-[13px] mb-[2px] text-gray-600 font-[600]">{{ listingDetails.property_type }}</p>
                </div>
                <div class="text-sm font-[600] text-gray-500">{{ listingDetails.address.suburb }}, {{ listingDetails.address.country }}</div>
              </div>
            </div>
          </div>

          <!-- Price Details -->
          <div class="border rounded-lg p-4 space-y-2 bg-gray-50">
            <h3 class="text-lg font-semibold">Price details</h3>
            <div class="flex justify-between">
              <p>${{ listingDetails.price }} x {{ calculateNights() }} nights</p>
              <p>${{ listingDetails.price * calculateNights() }}</p>
            </div>
            <div class="flex justify-between text-green-600">
              <p>Weekly stay discount</p>
              <p>-$113.28</p>
            </div>
            <div class="flex justify-between">
              <p>Cleaning fee</p>
              <p>$29.16</p>
            </div>
            <div class="flex justify-between">
              <p>Airbnb service fee</p>
              <p>$160.03</p>
            </div>
            <hr />
            <div class="flex justify-between font-semibold">
              <p>Total (USD)</p>
              <p>${{ (listingDetails.price * calculateNights()) + 160 + 29 - 113 }}</p>
            </div>
          </div> 
          </div> 
        </div> 

    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/store/auth.js';

const { listingId, hostId } = useRoute().params;
const router = useRouter();
const { showToast } = useAuthStore();

const listingDetails = ref(null);
const listingPrice = ref(20);
const dateRange = ref({ start: null, end: null });
const guests = ref({ adults: 1, children: 0, infants: 0 });
const specialRequests = ref('');
const blockedDates = ref([]);
const loading = ref(true);
const error = ref(null);

const calculateNights = () => {
  if (!dateRange.value.start || !dateRange.value.end) return 0;
  const start = new Date(dateRange.value.start);
  const end = new Date(dateRange.value.end);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const isDateValid = computed(() => {
  return (
    dateRange.value.start &&
    dateRange.value.end &&
    new Date(dateRange.value.end) > new Date(dateRange.value.start)
  );
});

const fetchListingDetails = async () => {
  loading.value = true;
  error.value = null;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listing-details/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    listingDetails.value = response.data.listing;
    listingPrice.value = response.data.listing.price;
  } catch (err) {
    error.value = 'Failed to fetch listing details. Please try again later.';
    console.error('Error fetching listing details:', err);
  } finally {
    loading.value = false;
  }
};

const fetchBlockedDates = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/get-reserved-bookings/${listingId}`);
    blockedDates.value = response.data.blockedDates.map((date) => new Date(date));
  } catch (err) {
    console.error('Error fetching blocked dates:', err);
    error.value = 'Failed to load blocked dates. Please try again later.';
  }
};

const computedTotalAmount = computed(() => {
  const nights = calculateNights();
  return listingPrice.value * nights + 29.16 + 150.00 - 15.00;
});

const handleBooking = async () => {
  if (!isDateValid.value || !guests.value.adults) {
    alert('Please complete all fields with valid data.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/create-booking`,
      {
        listingId,
        checkIn: dateRange.value.start,
        checkOut: dateRange.value.end,
        guests: guests.value,
        specialRequests: specialRequests.value,
        totalAmount: computedTotalAmount.value,
        hostId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    showToast('Booking successful!');
    router.push('/guest/reserved-bookings');
  } catch (err) {
    console.error('Booking error:', err);
    showToast('Booking failed, please try again later.');
  }
};

onMounted(() => {
  fetchListingDetails();
  fetchBlockedDates();
});
</script>