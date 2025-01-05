<template>
    <div class="max-w-md mx-auto mt-[150px] p-4">
      <h1 class="text-2xl font-semibold text-center mb-6">Finalize Booking</h1>
      <div v-if="!booking" class="text-center text-red-500">
        No booking data found.
      </div>
      <div v-else class="bg-white shadow-lg rounded-lg p-6">
        <p class="text-gray-600">Guest: {{ booking.userID || 'N/A' }}</p>
        <p class="text-gray-600">Listing ID: {{ booking.listingId }}</p>
        <p class="text-gray-600">Check-In: {{ formatDate(booking.checkIn) }}</p>
        <p class="text-gray-600">Check-Out: {{ formatDate(booking.checkOut) }}</p>
        <p class="text-gray-600">Guests: {{ booking.guests }}</p>
        <p class="text-gray-600">Total Amount: ${{ booking.totalAmount }}</p>
        <button
          @click="finalizeBooking"
          class="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Finalize Booking
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const booking = route.query.booking ? JSON.parse(route.query.booking) : null;
  
      const formatDate = (date) => {
        return new Date(date).toDateString();
      };
  
      const finalizeBooking = async () => {
        try {
          const token = localStorage.getItem('token');
          await axios.post(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/finalize-booking`,
            { bookingId: booking._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert('Booking finalized successfully!');
          router.push('/host-bookings');
        } catch (err) {
          console.error('Error finalizing booking:', err.response?.data || err.message);
          alert('Failed to finalize booking. Please try again.');
        }
      };
  
      return {
        booking,
        formatDate,
        finalizeBooking,
      };
    },
  };
  </script>
   