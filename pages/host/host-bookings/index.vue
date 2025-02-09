<template>
  <div v-if="loading">
    <Loader/>
  </div>

  <div v-else class="bg-gray-100 pt-[85px] lg:pt-[115px] px-4 lg:px-6 min-h-screen justify-center items-center">
    <div class="max-w-[1350px] mx-auto">
      <h3 class="text-[18px] md:text-[24px] mb-[15px] text-rose-600 font-[700]">
        Applied Bookings On Your Properties:
      </h3>
      <div class="h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]"></div>

      <div v-if="error">
        <div class="flex flex-col space-y-[15px] min-h-screen justify-center items-center">
          <img src="/assets/noReservations.webp" alt="" class="scale-[0.4]" />
          <p class="text-rose-800 font-[400] text-[15px] text-center">
            No reservations made on any of your listings.
          </p>
        </div>
      </div>

      <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="booking in bookings" :key="booking._id"
          class="bg-white flex flex-col border rounded-lg overflow-hidden pb-4 hover:shadow-md transition duration-300 ease-in-out">
          <div
            class="flex px-4 pt-3 bg-rose-700 items-center md:mb-0 mb-[15px] space-x-2 pb-[8px] border-b-[2px] border-rose-700">
            <div
              class="w-[28px] h-[28px] md:w-[28px] md:h-[28px] rounded-full flex items-center justify-center text-[28px] bg-rose-50 text-rose-600">
              <Icon name="fa:calendar" class="text-[15px]"/>
            </div>
            <div class="flex w-[95%] pb-[4px] justify-between items-center">
              <div class="font-[600] text-[14px] md:text-[18px] text-rose-50">
                <p>{{ booking.listingDetails.name.slice(0, 20) || 'N/A' }}</p>
              </div>
              <NuxtLink :to="`/listing/${booking.listingId}`"
                class="text-rose-50 w-[110px] text-[14px] hover:text-red-300 hover:underline cursor-pointer flex items-center">
                See Listings
                <Icon name="lucide:arrow-right" class="ml-[5px] scale-x-[1.2] text-[17px] mt-[2px]" />
              </NuxtLink>
            </div>
          </div>

          <div class="ml-[53px] md:mt-[15px]">
            <div class="flex items-center space-x-2">
              <Icon name="flowbite:calendar-month-solid" class="text-rose-800 text-[18px]" />
              <p class="text-[13px] font-[600] text-gray-500">Check-In</p>
              <p class="font-[600] text-[14px] text-green-700">{{ new Date(booking.checkIn).toDateString() }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="flowbite:calendar-month-solid" class="text-rose-800 text-[18px]" />
              <p class="text-[13px] font-[600] text-gray-500">Check-Out</p>
              <p class="font-[600] text-[14px] text-rose-800">{{ new Date(booking.checkOut).toDateString() }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="flowbite:home-solid" class="text-rose-800 text-[18px]" />
              <p class="text-[13px] font-[600] text-gray-500">Property Type</p>
              <p class="font-[600] text-[14px] text-rose-800">{{ booking.listingDetails.property_type }}</p>
            </div>
            <div class="flex mt-[8px] items-center space-x-2">
              <Icon name="flowbite:adjustments-vertical-outline" class="text-rose-800 text-[18px]" />
              <p class="text-[14px] font-[600] text-gray-500">Status</p>
              <p
                :class="`${getStatusClass(booking.status)} text-[10px] font-[600] px-[12px] rounded-[15px] pt-[1px] pb-[2px] text-white`">
                {{ booking.status }}
              </p>
            </div>
          </div>

          <p class="mt-[15px] ml-[53px] flex space-x-3 items-center text-rose-600 cursor-pointer underline"
            @click="fetchGuestDetails(booking.userID)">
            <Icon name="material-symbols:phone-in-talk-rounded" class="text-[19px]" />
            <span>User Contact/Info</span>
          </p>

          <div class="mt-5 md:mt-4 ml-auto mr-[8px]">
            <button @click="updateStatus(booking._id, 'rejected')"
              class="px-4 py-[4px] mr-2 bg-red-700 text-[13px] text-white rounded-md hover:bg-red-600">
              Reject
            </button>
            <button @click="updateStatus(booking._id, 'approved')"
              class="px-4 py-[4px] bg-green-700 text-[13px] text-white rounded-md hover:bg-green-600">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Guest Details Modal -->

    <div v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  px-[18px] sm:px-[95px] md:px-[145px] lg:px-[280px] xl:px-0 z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full xl:w-[460px]" v-motion="{
        initial: { y: 900, opacity: 0, scale: 0 },
        enter: {
          y: 0,
          opacity: 1,
          scale: 1,
          transition: {
            type: 'tween',
            duration: 400,
            ease: 'easeOut',
          },
        },
      }">
        <div v-if="modalLoading" class="flex justify-center items-center">
          Loading ...
        </div>
        <div v-else-if="guestDetails" class="relative">
          <button @click="showModal = false"
            class="absolute top-[-5px] right-0 scale-x-[1.4] text-gray-500 hover:text-gray-700"
            aria-label="Close Modal">
            X
          </button>

          <div class="flex items-center pt-[5px] mb-4">
            <div class="rounded-full flex-shrink-0 flex items-center justify-center">
              <Icon name="flowbite:user-circle-solid" class="text-gray-500 text-[50px]" />
            </div>
            <h2 class="text-xl font-semibold ml-4">{{ guestDetails.username }}</h2>
          </div>

          <div class="space-y-[13px]">
            <p class="flex items-center gap-2">
              <label
                class="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600">
                <Icon name="ic:twotone-mark-email-unread" />
              </label>
              {{ guestDetails.email }}
            </p>
            <p class="flex items-center text-[14px] gap-2">
              <label
                class="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600">
                <Icon name="ic:twotone-mark-email-unread" />
              </label>
              {{ guestDetails.phoneNumber || `No Phone number added by ${guestDetails.username}` }}
            </p>
            <p class="flex items-center gap-2">
              <label
                class="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600">
                <Icon name="ic:baseline-edit-location-alt" />
              </label>
              <strong>Lives In:</strong> {{ guestDetails.location.city }}, {{ guestDetails.location.country }}
            </p>
            <p class="flex items-center gap-2">
              <label
                class="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600">
                <Icon name="ic:baseline-contact-page" />
              </label>
              <strong>Bio:</strong> {{ guestDetails.bio }}
            </p>
          </div>

          <div class="mt-4 border-t-[2px] pt-[8px]">
            <p class="flex items-center gap-2">
              <Icon name="material-symbols:person-celebrate" class="text-purple-500  text-[22px]" />
              <strong>Social Links:</strong>
            </p>
            <ul class="list-none mt-3 flex gap-[8px]">
              <li v-if="guestDetails.socialLinks?.facebook"
                class="w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden bg-blue-600">
                <NuxtLink :to="guestDetails.socialLinks.facebook" target="_blank" rel="noopener noreferrer">
                  <Icon name="fa:facebook" class="text-[16px] mt-[6px]" />
                </NuxtLink>
              </li>
              <li v-if="guestDetails.socialLinks?.instagram"
                class="w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden bg-pink-700">
                <NuxtLink :to="guestDetails.socialLinks.instagram" target="_blank" rel="noopener noreferrer">
                  <Icon name="fa:instagram" class="text-[16px] mt-[6px]" />
                </NuxtLink>
              </li>
              <li v-if="guestDetails.socialLinks?.linkedin"
                class="w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden bg-blue-700">
                <NuxtLink :to="guestDetails.socialLinks.linkedin" target="_blank" rel="noopener noreferrer">
                  <Icon name="fa6-brands:linkedin-in" class="text-[16px] mt-[6px]" />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="relative">
          <button @click="closeModal" class="absolute top-[-5px] right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close Modal">
            <Icon name="fa6-solid/xmar" class="text-[18px]" />
          </button>
          <p>No details available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Loader from '@/components/Loaders/Loader.vue';

export default {
  name: 'HostBookings',
  components: {
        Loader,
    },
  setup() {
    const bookings = ref([]);
    const error = ref('');
    const loading = ref(true);
    const showModal = ref(false);
    const guestDetails = ref(null);
    const modalLoading = ref(false);

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/host-listings-bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        bookings.value = response.data;
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to fetch bookings. Please try again.';
        console.error('Error fetching bookings:', err.response?.data || err.message);
      } finally {
        loading.value = false;
      }
    };

    const updateStatus = async (bookingID, status) => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/update-booking-status`,
          { bookingID, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Booking status updated successfully!');
        // Optionally, refetch bookings to update the UI
        fetchBookings();
      } catch (err) {
        console.error('Error updating booking status:', err.response?.data || err.message);
        alert('Failed to update booking status.');
      }
    };

    const fetchGuestDetails = async (userId) => {
      modalLoading.value = true;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/get-reservers-details/${userId}`
        );
        guestDetails.value = response.data;
        showModal.value = true;
      } catch (err) {
        console.error('Error fetching guest details:', err.response?.data || err.message);
        alert('Failed to fetch guest details.');
      } finally {
        modalLoading.value = false;
      }
    };

    onMounted(() => {
      window.scrollTo(0, 0);
      fetchBookings();
    });

    return {
      bookings,
      error,
      loading,
      showModal,
      guestDetails,
      modalLoading,
      fetchGuestDetails,
      updateStatus,
    };
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case "approved":
          return "bg-green-800";
        case "pending":
          return "bg-yellow-600";
        case "rejected":
          return "bg-red-800";
        default:
          return "text-gray-800";
      }
    },
  }
};
</script>