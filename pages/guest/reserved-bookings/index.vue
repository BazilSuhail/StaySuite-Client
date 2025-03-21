<template>
  <div class="bg-gray-100 pt-[80px] md:pt-[120px] min-h-screen pb-[65px]">
    <div class="max-w-6xl mx-auto px-4 md:px-6">
      <!-- Header Section -->
      <div class="mb-[40px]">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-[35px] h-[35px] rounded-full bg-gradient-to-br from-rose-600 to-rose-800 flex items-center justify-center text-white shadow-lg">
            <Icon name="fa6-solid:bookmark" class="text-[16px]" />
          </div>
          <h1 class="text-[24px] md:text-[32px] font-[700] text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-red-600">
            My Reserved Bookings
          </h1>
        </div>
        <p class="text-gray-600 text-[14px] ml-[58px] font-[500]">{{ bookings.length }} active reservations</p>
        <div class="h-[1px] bg-gradient-to-r from-rose-300 via-pink-300 to-transparent mt-[20px]"></div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>

      <!-- Empty State -->
      <div v-else-if="error || bookings.length === 0"
        class="min-h-[500px] w-full flex flex-col justify-center items-center">
        <div class="mb-[20px] text-center">
          <img src="/assets/noReservations.webp" alt="No Reservations" class="scale-[0.5] mx-auto" />
          <div class="mt-[-30px]">
            <p class="text-gray-600 font-[600] text-[16px] mb-2">No reservations yet</p>
            <p class="text-gray-500 text-[14px] mb-[25px]">Start exploring and make your first booking today</p>
            <NuxtLink to="/"
              class="inline-block bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-red-700 text-white font-[600] px-[28px] py-[12px] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore Stays
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bookings Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-[20px] xl:gap-[28px]">
        <div v-for="booking in bookings.slice().reverse()" :key="booking._id"
          class="group relative bg-white rounded-[16px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-rose-100 hover:border-rose-300">

          <!-- Status Badge -->
          <div class="absolute top-4 right-4 z-10">
            <span
              :class="['text-white text-[11px] font-[700] px-[12px] py-[6px] rounded-full backdrop-blur-sm transition-all', 
                booking.status === 'approved' ? 'bg-emerald-600 shadow-lg shadow-emerald-600/30' : 
                booking.status === 'pending' ? 'bg-amber-600 shadow-lg shadow-amber-600/30' : 
                booking.status === 'confirmed' ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 
                booking.status === 'rejected' ? 'bg-red-600 shadow-lg shadow-red-600/30' : 
                'bg-gray-600 shadow-lg shadow-gray-600/30']">
              {{ booking.status.toUpperCase() }}
            </span>
          </div>

          <!-- Header with Property Info -->
          <div class="bg-gradient-to-br from-rose-600 to-rose-700 p-[24px] pt-[20px] text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 w-[120px] h-[120px] bg-white/10 rounded-full -mr-[40px] -mt-[40px]"></div>
            
            <div class="relative z-10">
              <div class="flex items-start justify-between mb-[12px]">
                <div class="w-[44px] h-[44px] rounded-[12px] bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                  <Icon name="fa6-solid:house-user" class="text-[20px]" />
                </div>
              </div>
              
              <h3 class="text-[18px] font-[700] mb-[8px] line-clamp-2">
                {{ booking.listing.name }}
              </h3>
              <p class="text-white/80 text-[13px] font-[500]">
                <Icon name="fa6-solid:gem" class="mr-[4px]" inline />
                {{ booking.listing.property_type }}
              </p>
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-[24px] space-y-[18px]">
            
            <!-- Dates Container -->
            <div class="grid grid-cols-2 gap-[16px]">
              <div class="bg-emerald-50 rounded-[12px] p-[16px] border border-emerald-200">
                <p class="text-emerald-700 text-[11px] font-[700] uppercase tracking-wide mb-[6px] flex items-center gap-1">
                  <Icon name="fa6-solid:arrow-right-to-bracket" class="text-[13px]" />
                  Check-In
                </p>
                <p class="text-emerald-900 font-[700] text-[15px]">
                  {{ new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                </p>
                <p class="text-emerald-700 text-[12px] font-[500] mt-[2px]">
                  {{ new Date(booking.checkIn).toLocaleDateString('en-US', { weekday: 'short' }) }}
                </p>
              </div>

              <div class="bg-red-50 rounded-[12px] p-[16px] border border-red-200">
                <p class="text-red-700 text-[11px] font-[700] uppercase tracking-wide mb-[6px] flex items-center gap-1">
                  <Icon name="fa6-solid:arrow-right-from-bracket" class="text-[13px]" />
                  Check-Out
                </p>
                <p class="text-red-900 font-[700] text-[15px]">
                  {{ new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                </p>
                <p class="text-red-700 text-[12px] font-[500] mt-[2px]">
                  {{ new Date(booking.checkOut).toLocaleDateString('en-US', { weekday: 'short' }) }}
                </p>
              </div>
            </div>

            <!-- Guests Section -->
            <div class="bg-gradient-to-br from-rose-50 to-pink-50 rounded-[12px] p-[14px] border border-rose-200">
              <p class="text-rose-700 text-[11px] font-[700] uppercase tracking-wide mb-[10px] flex items-center gap-1">
                <Icon name="fa6-solid:users" class="text-[13px]" />
                Guests
              </p>
              <div class="flex gap-[12px]">
                <div class="flex-1 text-center">
                  <p class="text-gray-600 text-[12px] font-[600]">Adults</p>
                  <p class="text-rose-800 font-[700] text-[16px]">{{ booking.guests.adults }}</p>
                </div>
                <div class="w-[1px] bg-rose-300"></div>
                <div class="flex-1 text-center">
                  <p class="text-gray-600 text-[12px] font-[600]">Children</p>
                  <p class="text-rose-800 font-[700] text-[16px]">{{ booking.guests.children }}</p>
                </div>
                <div class="w-[1px] bg-rose-300"></div>
                <div class="flex-1 text-center">
                  <p class="text-gray-600 text-[12px] font-[600]">Infants</p>
                  <p class="text-rose-800 font-[700] text-[16px]">{{ booking.guests.infants }}</p>
                </div>
              </div>
            </div>

            <!-- Amount Section -->
            <div class="bg-gradient-to-r from-rose-600/10 to-red-600/10 rounded-[12px] p-[14px] border border-rose-300 flex items-center justify-between">
              <div>
                <p class="text-gray-700 text-[12px] font-[600] uppercase tracking-wide">Total Amount</p>
              </div>
              <div class="text-right">
                <p class="text-rose-700 font-[700] text-[24px]">${{ booking.totalAmount.toFixed(2) }}</p>
              </div>
            </div>

            <!-- View Details Button -->
            <button @click="openModal(booking)"
              class="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-red-700 text-white font-[600] py-[12px] rounded-[12px] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn">
              <Icon name="fa6-solid:circle-info" class="text-[16px] group-hover/btn:scale-110 transition-transform" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Premium Modal -->
    <div v-if="showModal && selectedBooking" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-[24px] shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto"
        v-motion="{
          initial: { scale: 0.8, opacity: 0, y: 30 },
          enter: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
              type: 'tween',
              duration: 400,
              ease: 'easeOut',
            },
          },
        }">

        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-rose-600 to-rose-700 p-[28px] text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-[150px] h-[150px] bg-white/10 rounded-full -mr-[60px] -mt-[60px]"></div>
          
          <div class="relative z-10 flex items-start justify-between">
            <div>
              <div class="flex items-center gap-3 mb-[12px]">
                <div class="w-[48px] h-[48px] rounded-[14px] bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Icon name="fa6-solid:bookmark" class="text-[22px]" />
                </div>
                <h2 class="text-[24px] font-[800]">Booking Details</h2>
              </div>
            </div>
            <button @click="closeModal" class="text-white hover:bg-white/20 rounded-full p-2 transition-all">
              <Icon name="fa6-solid:xmark" class="text-[20px]" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-[28px] space-y-[20px]">

          <!-- Property Info -->
          <div class="border-b-2 border-rose-200 pb-[20px]">
            <p class="text-rose-700 text-[11px] font-[700] uppercase tracking-wider mb-[8px]">
              <Icon name="fa6-solid:home" class="mr-[4px]" inline />
              Property
            </p>
            <h3 class="text-[20px] font-[700] text-gray-900 mb-[6px]">{{ selectedBooking.listing.name }}</h3>
            <p class="text-gray-600 font-[500] text-[14px] mb-[12px]">{{ selectedBooking.listing.property_type }}</p>
            <NuxtLink :to="`/listing/${selectedBooking.listingId}`"
              class="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-[600] text-[13px] group">
              View Property
              <Icon name="fa6-solid:arrow-right" class="text-[12px] group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>

          <!-- Dates Section -->
          <div class="space-y-[12px]">
            <p class="text-gray-700 text-[12px] font-[700] uppercase tracking-wider text-rose-700">
              <Icon name="fa6-solid:calendar-days" class="mr-[4px]" inline />
              Stay Duration
            </p>
            <div class="grid grid-cols-2 gap-[12px]">
              <div class="bg-emerald-50 rounded-[12px] p-[16px] border border-emerald-200">
                <p class="text-emerald-700 text-[11px] font-[700] uppercase tracking-wide mb-[8px]">Check-In</p>
                <p class="text-emerald-900 font-[700] text-[16px]">{{ new Date(selectedBooking.checkIn).toLocaleDateString() }}</p>
              </div>
              <div class="bg-red-50 rounded-[12px] p-[16px] border border-red-200">
                <p class="text-red-700 text-[11px] font-[700] uppercase tracking-wide mb-[8px]">Check-Out</p>
                <p class="text-red-900 font-[700] text-[16px]">{{ new Date(selectedBooking.checkOut).toLocaleDateString() }}</p>
              </div>
            </div>
          </div>

          <!-- Guests Section -->
          <div class="bg-gradient-to-br from-rose-50 to-pink-50 rounded-[14px] p-[18px] border border-rose-200">
            <p class="text-rose-700 text-[12px] font-[700] uppercase tracking-wider mb-[14px]">
              <Icon name="fa6-solid:people-group" class="mr-[4px]" inline />
              Guests
            </p>
            <div class="grid grid-cols-3 gap-[12px]">
              <div class="text-center">
                <p class="text-gray-600 text-[12px] font-[600] mb-[6px]">Adults</p>
                <p class="text-rose-800 font-[700] text-[24px]">{{ selectedBooking.guests.adults }}</p>
              </div>
              <div class="text-center border-l border-r border-rose-300">
                <p class="text-gray-600 text-[12px] font-[600] mb-[6px]">Children</p>
                <p class="text-rose-800 font-[700] text-[24px]">{{ selectedBooking.guests.children }}</p>
              </div>
              <div class="text-center">
                <p class="text-gray-600 text-[12px] font-[600] mb-[6px]">Infants</p>
                <p class="text-rose-800 font-[700] text-[24px]">{{ selectedBooking.guests.infants }}</p>
              </div>
            </div>
          </div>

          <!-- Amount Section -->
          <div class="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-[14px] p-[18px] border-2 border-emerald-300">
            <p class="text-emerald-700 text-[12px] font-[700] uppercase tracking-wider mb-[8px]">
              <Icon name="fa6-solid:hand-holding-dollar" class="mr-[4px]" inline />
              Total Amount
            </p>
            <p class="text-emerald-900 font-[800] text-[32px]">${{ selectedBooking.totalAmount.toFixed(2) }}</p>
          </div>

          <!-- Special Requests -->
          <div v-if="selectedBooking.specialRequests"
            class="bg-blue-50 rounded-[14px] p-[16px] border border-blue-200">
            <p class="text-blue-700 text-[12px] font-[700] uppercase tracking-wider mb-[8px]">
              <Icon name="fa6-solid:note-sticky" class="mr-[4px]" inline />
              Special Requests
            </p>
            <p class="text-gray-700 text-[13px] leading-relaxed">{{ selectedBooking.specialRequests }}</p>
          </div>

          <!-- Status Badge -->
          <div class="flex items-center justify-between p-[16px] bg-gray-50 rounded-[12px] border border-gray-200">
            <p class="text-gray-700 font-[600] text-[14px]">Booking Status</p>
            <span
              :class="['text-white text-[12px] font-[700] px-[16px] py-[8px] rounded-full', 
                selectedBooking.status === 'approved' ? 'bg-emerald-600' : 
                selectedBooking.status === 'pending' ? 'bg-amber-600' : 
                selectedBooking.status === 'confirmed' ? 'bg-blue-600' : 
                selectedBooking.status === 'rejected' ? 'bg-red-600' : 
                'bg-gray-600']">
              {{ selectedBooking.status.toUpperCase() }}
            </span>
          </div>

          <!-- Finalize Button -->
          <div v-if="selectedBooking.status === 'approved' && new Date(selectedBooking.checkOut) < new Date()"
            class="pt-[8px]">
            <button @click="finalizeBooking"
              class="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-[700] py-[14px] rounded-[12px] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <Icon name="fa6-solid:circle-check" class="text-[18px]" />
              Finalize Booking
            </button>
          </div>

          <!-- Close Button for Modal -->
          <button @click="closeModal"
            class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-[600] py-[12px] rounded-[12px] transition-all duration-300">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Loader from '@/components/Loaders/Loader.vue';

export default {
  components: {
        Loader,
    },
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
      today.setHours(0, 0, 0, 0);
      const checkOut = new Date(checkOutDate);
      checkOut.setHours(0, 0, 0, 0);
      return checkOut < today;
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