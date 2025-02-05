<template>
  <div class="bg-gray-50 pt-[120px] min-h-screen pb-[65px] justify-center items-center">
    <div class="max-w-[950px] mx-auto px-6">
      <h3 class="text-[24px] text-rose-600 font-[700] text-start">My Reserved bookings</h3>
      <div class="h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]"></div>

      <div v-if="loading">
        loading
      </div>

      <div v-else>
        <div v-if="error || bookings.length === 0"
          class="min-h-screen w-full flex flex-col justify-center items-center mix-blend-multiply mt-[-150px]">
          <img src="/assets/noReservations.webp" alt="No Reservations" class="scale-[0.4]" />
          <p class="text-rose-800 font-[400] text-[15px] text-center mt-[-45px] md:mt-[-100px]">
            You haven't visited any place, make a Booking <br />
            <NuxtLink to="/" class="text-rose-600 underline font-[600]">Start Exploring</NuxtLink>
          </p>
        </div>

        <div v-else>
          <div class="flex flex-col space-y-[15px]">
            <div v-for="booking in bookings.slice().reverse()" :key="booking._id"
              class="bg-white rounded-xl flex md:flex-row flex-col justify-between border py-4 px-6 md:px-[45px] lg:px-[55px] hover:bg-gray-100 hover:border-[2px] hover:border-gray-300 transition duration-300 ease-in-out">
              <div class="md:border-b-0 border-b-[2px] border-rose-600 pb-[12px] md:pb-0 flex items-center">
                <div class="w-[40px] h-[40px] rounded-full flex items-center justify-center text-rose-100 bg-rose-600">
                  <Icon name="fa:book" class="text-[20px]" />
                </div>
                <p class="font-[600] text-[16px] ml-[8px] text-rose-800">
                  {{ booking.listing.name.length > 10 ? `${booking.listing.name.slice(0, 15)}...` : booking.listing.name }}
                </p>
              </div>

              <div class="hidden md:flex items-center">
                <div class="flex flex-col items-center justify-center">
                  <p class="text-[13px] font-[600] text-gray-500">Check-In</p>
                  <p class="font-[600] text-[14px] text-rose-800">{{ new Date(booking.checkIn).toDateString() }}</p>
                </div>

                <div class="ml-[20px] xl:ml-[50px] flex flex-col items-center justify-center">
                  <p class="text-[13px] font-[600] text-gray-500">Check Out</p>
                  <p class="font-[600] text-[14px] text-rose-800">{{ new Date(booking.checkOut).toDateString() }}</p>
                </div>
              </div>

              <div class="md:hidden justify-between mt-[15px] flex items-center">
                <div class="flex flex-col md:items-center justify-center">
                  <p class="text-[13px] font-[600] text-gray-500">Check-In</p>
                  <p class="font-[600] text-[14px] text-rose-800">{{ new Date(booking.checkIn).toDateString() }}</p>
                </div>

                <div class="ml-[20px] xl:ml-[50px] flex flex-col md:items-center justify-center">
                  <p class="text-[13px] font-[600] text-gray-500">Check Out</p>
                  <p class="font-[600] text-[14px] text-rose-800">{{ new Date(booking.checkOut).toDateString() }}</p>
                </div>
              </div>

              <div class="hidden md:flex items-center">
                <div class="flex flex-col items-center justify-center">
                  <p class="text-[13px] font-[600] text-gray-500">Status</p>
                  <p
                    :class="['font-[600] px-[12px] py-[2px] mt-[5px] text-white rounded-[30px] text-[12px]', booking.status === 'approved' ? 'bg-green-800' : booking.status === 'pending' ? 'bg-yellow-600' : booking.status === 'confirmed' ? 'bg-blue-800' : booking.status === 'rejected' ? 'bg-red-800' : booking.status === 'completed' ? 'text-gray-800' : '']">
                    {{ booking.status }}
                  </p>
                </div>
                <div>
                  <button @click="openModal(booking)"
                    class="ml-[20px] mt-[12px] bg-gradient-to-r from-rose-600 to-rose-900 hover:bg-rose-600 text-white rounded-[25px] px-[10px] py-[4px] text-[13px]">
                    View Details
                  </button>
                </div>
              </div>

              <div class="md:hidden mt-[15px] flex justify-between items-center">
                <div class="flex flex-col">
                  <p class="text-[16px] font-[600] text-gray-500">Status</p>
                  <p
                    :class="['font-[600] px-[12px] py-[2px] mt-[5px] text-white rounded-[30px] text-[12px]', booking.status === 'approved' ? 'bg-green-800' : booking.status === 'pending' ? 'bg-yellow-600' : booking.status === 'confirmed' ? 'bg-blue-800' : booking.status === 'rejected' ? 'bg-red-800' : booking.status === 'completed' ? 'text-gray-800' : '']">
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

      <!-- Modal -->
      <div v-if="showModal && selectedBooking"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center px-[18px] sm:px-[95px] md:px-[145px] lg:px-[280px] xl:px-0 justify-center z-50">
        <div class="bg-white rounded-lg p-6 shadow-lg xl:w-[480px] w-full relative"
        v-motion="{
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
          <button @click="closeModal" class="absolute top-4 right-5 text-gray-500 scale-x-[1.4] text-[18px] font-[600] hover:text-gray-700"
            aria-label="Close Modal">
            X
          </button>

          <div class="flex justify-center items-center font-semibold mb-4 text-center text-gray-800">
            <div
              class="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600">
              <Icon name="fa:book" />
            </div>
            <p class="ml-[10px] text-rose-600 text-[21px]">Booking Details</p>
          </div>

          <div class="space-y-2">

            <div class="border-b-[2px] w-full border-rose-700 pb-[8px] flex sm:flex-row flex-col space-y-[5px] justify-between sm:items-center">
              <p class="text-gray-700 font-medium w-[calc(100%-105px)] overflow-hidden">
                Name: <span class="font-normal">{{ selectedBooking.listing.name.length > 25 ?
                  `${selectedBooking.listing.name.slice(0, 25)}...` : selectedBooking.listing.name }}</span>
              </p>
              <NuxtLink :to="`/listing/${selectedBooking.listingId}`"
                class="w-[105px] overflow-hidden text-rose-700 hover:text-red-500 cursor-pointer flex items-center">
                See Listings
                <Icon name="lucide:arrow-right" class="ml-[4px] text-[17px] mt-[2px]" />
              </NuxtLink>
            </div>

            <div class="text-gray-700 mb-[15px] font-medium">
              Property Type: <span class="font-normal">{{ selectedBooking.listing.property_type }}</span>
            </div>
            <div class="text-gray-700  text-[14px] mt-[15px] font-medium flex items-center gap-2">
              <div
                class="w-[28px] h-[28px] bg-rose-600  text-[15px] text-white flex justify-center items-center rounded-full">
                <Icon name="fa:calendar" />
              </div>
              Check-In: <span class="font-[600] text-green-700">{{ new Date(selectedBooking.checkIn).toDateString()
                }}</span>
            </div>
            <div class="text-gray-700 font-medium text-[14px] flex items-center gap-2">
              <div
                class="w-[28px] h-[28px] text-[15px] bg-rose-600 text-white flex justify-center items-center rounded-full">
                <Icon name="fa:calendar" />
              </div>
              Check-Out: <span class="font-[600] text-red-700">{{ new Date(selectedBooking.checkOut).toDateString()
                }}</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <label
                className='w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white'>
                <Icon name="fa:users" class="pl-[5px]" />
              </label>
              Guests:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-600">
              <li>Adults: {{ selectedBooking.guests.adults }}</li>
              <li>Children: {{ selectedBooking.guests.children }}</li>
              <li>Infants: {{ selectedBooking.guests.infants }}</li>
            </ul>
          </div>

          <p className="text-gray-700 font-medium mt-4">
            Total Amount: <span className="font-bold text-green-500">${{ selectedBooking.totalAmount }}</span>
          </p>

          <div v-if="selectedBooking.specialRequests">
            <p className="text-sm text-gray-500 italic mt-2">
              Special Requests: {{ selectedBooking.specialRequests }}
            </p>
          </div>

          <div v-if="selectedBooking.status === 'approved' && new Date(selectedBooking.checkOut) < new Date()">
  <button @click="finalizeBooking" class="px-4 ml-auto mt-[15px] pt-[1px] pb-[2px] text-[14px] bg-red-600 text-white rounded-lg hover:bg-red-600">
    Finalize Booking
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

    isCheckoutAfterToday(checkOutDate) {
    const today = new Date();
    // Set the time to 00:00:00 so we only compare the date part
    today.setHours(0, 0, 0, 0);
    
    const checkOut = new Date(checkOutDate);
    checkOut.setHours(0, 0, 0, 0); // Normalize the checkout date to exclude time part
console.log(checkOut)
console.log(today)
    return checkOut < today; // Returns true if checkOut is later than today
  },

    async fetchBookings() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/made-reservations`, {
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
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/finalize-booking`, {
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