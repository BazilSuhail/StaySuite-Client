<template>
  <div class="bg-gray-50 pt-[120px] min-h-screen pb-[65px] justify-center items-center">
    <div class="max-w-[950px] mx-auto px-6">
      <h3 class="text-[24px] text-rose-600 font-[700] text-start">My Reserved bookings</h3>
      <div class="h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]"></div>

      <div v-if="loading">
        loading
      </div>

      <div v-else-if="error || bookings.length === 0"> 
        <div class="min-h-screen w-full flex flex-col justify-center items-center mix-blend-multiply mt-[-150px]">
          <img src="/assets/noReservations.webp" alt="No Reservations" class="scale-[0.4]" />
          <p class="text-rose-800 font-[400] text-[15px] text-center mt-[-45px] md:mt-[-100px]">
            You haven't visited any place, make a Booking <br />
            <NuxtLink to="/" class="text-rose-600 underline font-[600]">Start Exploring</NuxtLink>
          </p>
        </div>
      </div>

      <div v-else class="flex flex-col space-y-[15px]">
        <div v-for="booking in bookings" :key="booking._id"
          class="bg-white rounded-xl flex md:flex-row flex-col justify-between border py-4 px-6 md:px-[45px] lg:px-[55px] hover:bg-gray-100 hover:border-[2px] hover:border-gray-300 transition duration-300 ease-in-out">
          <div class='md:border-b-0 border-b-[2px] border-rose-600 pb-[12px] md:pb-0 flex items-center'>
            <div
              class='w-[45px] h-[45px] rounded-full flex items-center justify-center text-[28px] text-rose-100 bg-rose-600'>
              <Icon name="fa:bookmark" />
            </div>
            <p class='font-[600] text-[18px] ml-[8px] text-rose-800'>
              {{ booking.listing.name.length > 25 ? `${booking.listing.name.slice(0, 25)}...` : booking.listing.name }}
            </p>
          </div>

          <div class='hidden md:flex items-center'>
            <div class='flex flex-col items-center justify-center'>
              <p class='text-[13px] font-[600] text-gray-500 '>Check-In</p>
              <p class='font-[600] text-[14px] text-rose-800'>{{ new Date(booking.checkIn).toDateString() }}</p>
            </div>

            <div class='ml-[20px] xl:ml-[50px] flex flex-col items-center justify-center'>
              <p class='text-[13px] font-[600] text-gray-500 '>Check Out</p>
              <p class='font-[600] text-[14px] text-rose-800'>{{ new Date(booking.checkOut).toDateString() }}</p>
            </div>
          </div>

          <div class='md:hidden mt-[15px] flex justify-between items-center'>
            <div class='flex flex-col'>
              <p class='text-[16px] font-[600] text-gray-500 '>Status</p>
              <p class='font-[600] px-[12px] py-[2px] mt-[5px] text-white rounded-[30px] text-[12px]' :class="{
                'bg-green-800': booking.status === 'paid',
                'bg-yellow-600': booking.status === 'pending',
                'bg-blue-800': booking.status === 'confirmed',
                'bg-red-800': booking.status === 'canceled'
              }">
                {{ booking.status }}
              </p>
            </div>

            <button @click="openModal(booking)"
              class="mt-[15px] bg-gradient-to-r from-rose-600 to-rose-900 hover:bg-rose-600 text-white rounded-[18px] px-[15px] py-[8px] text-[13px]">
              View Details
            </button>
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
      selectedBooking: null,
      showModal: false
    };
  },
  mounted() {
    this.fetchBookings();
  },
  methods: {
    async fetchBookings() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/air-bnb/reservation/made-reservations`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.bookings = response.data.bookings;
      } catch (err) {
        this.error = 'Failed to fetch bookings. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async finalizeBooking() {
      try {
        const token = localStorage.getItem('token');
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/air-bnb/reservation/finalize-booking`, {
          bookingId: this.selectedBooking._id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        alert('Thank you for choosing us...');
        this.showModal = false;
        this.selectedBooking = null;
      } catch (err) {
        alert('Failed to finalize booking. Please try again.');
      }
    },

    openModal(booking) {
      this.selectedBooking = booking;
      this.showModal = true;
    },

    closeModal() {
      this.selectedBooking = null;
      this.showModal = false;
    }
  }
};
</script>