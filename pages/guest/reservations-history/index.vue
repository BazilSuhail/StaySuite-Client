<template>
  <div class="bg-gray-100 pt-[115px] p-6 min-h-screen justify-center items-center">
    <div class="max-w-[1150px] mx-auto">
      <h3 class="text-[24px] mb-[15px] text-rose-600 font-[700]">Visited Places</h3>
      <div class="h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]"></div>

      <!-- Display loading or error states -->
      <div v-if="loading" class="flex justify-center items-center">
        loader
      </div>

      <div v-else-if="error || bookings.length === 0"
        class="min-h-screen w-full flex flex-col justify-center items-center mix-blend-multiply mt-[-150px]">
        <img src="/assets/noReservations.webp" alt="No Reservations" class="scale-[0.4]" />
        <p class="text-rose-800 font-[400] text-[15px] text-center mt-[-45px] md:mt-[-100px]">
          You haven't visited any place, make a Booking <br />
          <NuxtLink to="/" class="text-rose-600 underline font-[600]">Start Exploring</NuxtLink>
        </p>
      </div>

      <!-- Show bookings -->
      <div v-else class="grid gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="booking in bookings" :key="booking._id" @click="goToListing(booking.listingId)"
          class="overflow-hidden mx-auto w-full px-[8px] cursor-pointer bg-white border rounded-xl hover:shadow-md transition duration-200">
          <img :src="booking.listingImage || 'https://via.placeholder.com/300'" alt="Booking" loading="lazy"
            class="m-2 h-[220px] w-[95%]" />
          <h2 class="font-semibold ml-[10px] text-lg">
            {{ booking.listingSuburb.substring(0, 8) }}, {{ booking.listingCountry.substring(0, 8) }}
          </h2>
          <div class="ml-[53px] md:mt-[15px]">
            <div class="flex items-center space-x-2">
              <!-- Using Font Awesome Icon with Nuxt Icon -->
              <Icon name="fa:calendar" class="text-rose-800" />
              <p class="text-[13px] font-[600] text-gray-500">Check-In</p>
              <p class="font-[600] text-[14px] text-green-700">{{ new Date(booking.checkIn).toDateString() }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="fa:calendar" class="text-rose-800" />
              <p class="text-[13px] font-[600] text-gray-500">Check-Out</p>
              <p class="font-[600] text-[14px] text-rose-800">{{ new Date(booking.checkOut).toDateString() }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="fa:user" class="text-rose-800" />
              <p class="text-[13px] font-[600] text-gray-500">Guests:</p>
              <p class="font-[600] text-[13px] text-rose-800">{{ booking.guests.adults + booking.guests.children +
                booking.guests.infants }}</p>
            </div>
            <div class="flex mb-[8px] items-center space-x-2">
              <Icon name="fa:user" class="text-rose-800" />
              <p class="text-[13px] font-[600] text-gray-500">Total Bill:</p>
              <p class="font-[600] text-[13px] text-rose-800">{{ booking.totalAmount || '100' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bookings: [],
      error: '',
      loading: true,
      hydrated: false, // Track hydration state
    };
  },
  methods: {
    async fetchBookings() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Authentication token not found.");

        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/reservations-history`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.bookings = response.data.bookings || [];
      } catch (err) {
        this.error = 'Failed to fetch bookings. Please try again.';
        console.error('Error fetching bookings:', err.response?.data || err.message);
      } finally {
        this.loading = false;
      }
    },

    goToListing(listingId) {
      this.$router.push(`/listing/${listingId}`);
    },
  },
  async mounted() {
    this.hydrated = true; // Ensures client-side consistency
    await this.fetchBookings();
  }
};
</script>