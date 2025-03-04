<template>
  <div v-if="isOpen" class="fixed inset-0 z-[1000]">
    <!-- Dark Overlay -->
    <div @click="closePanel" class="fixed inset-0 bg-black bg-opacity-40 transition-opacity"></div>

    <!-- Sidebar Panel -->
    <div
      class="fixed right-0 top-0 h-full bg-white shadow-2xl w-full sm:w-[400px] md:w-[500px] overflow-y-auto rounded-l-xl no-scrollbar"
      v-motion="{
        initial: { x: 500, opacity: 0 },
        enter: {
          x: 0,
          opacity: 1,
          transition: {
            type: 'tween',
            duration: 300,
            ease: 'easeOut',
          },
        },
        leave: {
          x: 500,
          opacity: 0,
          transition: {
            type: 'tween',
            duration: 300,
            ease: 'easeIn',
          },
        },
      }">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b-[2px] border-rose-200 px-[20px] py-[15px] flex items-center justify-between">
        <div class="flex items-center text-rose-600">
          <Icon name="fa:bell" class="mr-[8px] text-[20px] mt-[3px]" />
          <h3 class="text-[20px] font-[700] text-rose-800">Notifications</h3>
        </div>
        <button @click="closePanel" class="text-gray-400 hover:text-gray-600 text-[28px] font-bold leading-none">
          ×
        </button>
      </div>

      <!-- Content -->
      <div class="px-[15px] py-[20px]">
        <!-- Loading State -->
        <div v-if="isLoadingNotifications" class="flex justify-center items-center py-[40px]">
          <NotificationSkeletonLoader />
        </div>

        <div v-else class="flex flex-col space-y-[25px]">
          <!-- No Notifications Message -->
          <div
            v-if="userNotifications.length === 0 && notifications.length === 0"
            class="flex flex-col justify-center items-center py-[60px]">
            <img src="/assets/notifications.webp" alt="No Notifications" class="scale-[0.4]" />
            <p class="text-gray-500 mt-[10px] text-sm font-medium">No new notifications</p>
          </div>

          <!-- Guest Notifications -->
          <div v-if="userRole === 'Guest'" class="space-y-[20px]">
            <!-- New Notifications Section -->
            <div v-if="notifications.length > 0">
              <div class="flex items-center gap-[8px] mb-[12px] px-[10px]">
                <div class="w-[8px] h-[8px] rounded-full bg-rose-600"></div>
                <h4 class="text-[12px] uppercase font-[700] text-rose-600 tracking-wider">New Notifications</h4>
              </div>
              <div class="space-y-[12px]">
                <div
                  v-for="(notification, index) in notifications"
                  :key="`notification-${index}`"
                  class="border-l-[4px] border-rose-600 bg-rose-50 rounded-r-[12px] px-[12px] py-[14px] flex flex-col hover:bg-rose-100 transition-colors duration-200 shadow-sm">
                  <div class="flex items-start justify-between gap-[10px]">
                    <div class="flex items-center gap-[10px] flex-1">
                      <div
                        class="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[20px] bg-rose-200 text-rose-700 flex-shrink-0">
                        <Icon name="material-symbols-light:calendar-add-on-outline" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="text-[14px] font-[700] text-rose-800 line-clamp-1">
                          {{ notification.title }}
                        </h3>
                        <p class="text-[12px] text-gray-600 mt-[2px]">
                          {{ notification.address }}
                        </p>
                      </div>
                    </div>
                    <span
                      :class="`px-[8px] py-[4px] text-white rounded-full text-[10px] font-[600] whitespace-nowrap flex-shrink-0 ${getStatusClass(notification.UpdatedStatus)}`">
                      {{ notification.UpdatedStatus }}
                    </span>
                  </div>

                  <div class="mt-[10px] ml-[46px]">
                    <p class="text-[12px] text-gray-700 leading-relaxed">
                      <span class="font-[600]">{{ notification.checkInOut }}</span>
                      has been
                      <span :class="`font-[700] ${getStatusTextClass(notification.UpdatedStatus)}`">
                        {{ notification.UpdatedStatus }}
                      </span>
                      by <span class="font-[600] text-gray-800">{{ notification.host }}</span>
                    </p>
                  </div>

                  <button
                    @click="goToListing(notification.listingId)"
                    class="mt-[10px] ml-[46px] text-rose-600 hover:text-rose-700 text-[12px] font-[600] underline underline-offset-2 transition-colors">
                    View Listing →
                  </button>
                </div>
              </div>
            </div>

            <!-- Read Notifications Section -->
            <div v-if="userNotifications.length > 0">
              <div class="flex items-center gap-[8px] mb-[12px] px-[10px]">
                <div class="w-[8px] h-[8px] rounded-full bg-gray-400"></div>
                <h4 class="text-[12px] uppercase font-[700] text-gray-600 tracking-wider">Earlier</h4>
              </div>
              <div class="space-y-[12px]">
                <div
                  v-for="(notification, index) in userNotifications"
                  :key="`user-notification-${index}`"
                  class="border-l-[4px] border-gray-300 bg-white rounded-r-[12px] px-[12px] py-[14px] flex flex-col hover:bg-gray-50 transition-colors duration-200 border-[1px] border-l-4 border-gray-200">
                  <div class="flex items-start justify-between gap-[10px]">
                    <div class="flex items-center gap-[10px] flex-1">
                      <div
                        class="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[20px] bg-gray-200 text-gray-700 flex-shrink-0">
                        <Icon name="material-symbols-light:calendar-add-on-outline" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="text-[14px] font-[700] text-gray-800 line-clamp-1">
                          {{ notification.title }}
                        </h3>
                        <p class="text-[12px] text-gray-500 mt-[2px]">
                          {{ notification.address }}
                        </p>
                      </div>
                    </div>
                    <span
                      :class="`px-[8px] py-[4px] text-white rounded-full text-[10px] font-[600] whitespace-nowrap flex-shrink-0 ${getStatusClass(notification.UpdatedStatus)}`">
                      {{ notification.UpdatedStatus }}
                    </span>
                  </div>

                  <div class="mt-[10px] ml-[46px]">
                    <p class="text-[12px] text-gray-600 leading-relaxed">
                      <span class="font-[600]">{{ notification.checkInOut }}</span>
                      has been
                      <span :class="`font-[700] ${getStatusTextClass(notification.UpdatedStatus)}`">
                        {{ notification.UpdatedStatus }}
                      </span>
                      by <span class="font-[600]">{{ notification.host }}</span>
                    </p>
                  </div>

                  <button
                    @click="goToListing(notification.listingId)"
                    class="mt-[10px] ml-[46px] text-gray-600 hover:text-gray-700 text-[12px] font-[600] underline underline-offset-2 transition-colors">
                    View Listing →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Host Notifications -->
          <div v-if="userRole === 'Host'" class="space-y-[20px]">
            <!-- New Bookings Section -->
            <div v-if="notifications.length > 0">
              <div class="flex items-center gap-[8px] mb-[12px] px-[10px]">
                <div class="w-[8px] h-[8px] rounded-full bg-rose-600"></div>
                <h4 class="text-[12px] uppercase font-[700] text-rose-600 tracking-wider">New Bookings</h4>
              </div>
              <div class="space-y-[12px]">
                <div
                  v-for="(notification, index) in notifications"
                  :key="`booking-${index}`"
                  class="border-l-[4px] border-rose-600 bg-rose-50 rounded-r-[12px] px-[12px] py-[14px] flex flex-col hover:bg-rose-100 transition-colors duration-200 shadow-sm">
                  <div class="flex items-start justify-between gap-[10px]">
                    <div class="flex items-center gap-[10px] flex-1">
                      <div
                        class="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[20px] bg-rose-200 text-rose-700 flex-shrink-0">
                        <Icon name="ic:outline-bookmark-add" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="text-[14px] font-[700] text-rose-800">
                          New Booking
                        </h3>
                        <button
                          @click="navigateTo(`/listing/${notification.listing_Id}`)"
                          class="text-[12px] text-rose-600 hover:text-rose-700 font-[600] underline underline-offset-1 mt-[2px] transition-colors">
                          {{ notification.location }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="mt-[10px] ml-[46px] space-y-[8px]">
                    <div>
                      <p class="text-[11px] font-[600] text-gray-600 uppercase tracking-wide">Special Requests</p>
                      <p class="text-[12px] text-gray-700 mt-[4px] leading-relaxed">
                        {{ notification.details || 'No special requests' }}
                      </p>
                    </div>
                  </div>

                  <button
                    @click="fetchBookingDetails(notification.bookingId)"
                    class="mt-[10px] ml-[46px] text-rose-600 hover:text-rose-700 text-[12px] font-[600] underline underline-offset-2 transition-colors">
                    View Booking Details →
                  </button>
                </div>
              </div>
            </div>

            <!-- Past Bookings Section -->
            <div v-if="userNotifications.length > 0">
              <div class="flex items-center gap-[8px] mb-[12px] px-[10px]">
                <div class="w-[8px] h-[8px] rounded-full bg-gray-400"></div>
                <h4 class="text-[12px] uppercase font-[700] text-gray-600 tracking-wider">Earlier Bookings</h4>
              </div>
              <div class="space-y-[12px]">
                <div
                  v-for="(notification, index) in userNotifications"
                  :key="`user-booking-${index}`"
                  class="border-l-[4px] border-gray-300 bg-white rounded-r-[12px] px-[12px] py-[14px] flex flex-col hover:bg-gray-50 transition-colors duration-200 border-[1px] border-l-4 border-gray-200">
                  <div class="flex items-start justify-between gap-[10px]">
                    <div class="flex items-center gap-[10px] flex-1">
                      <div
                        class="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[20px] bg-gray-200 text-gray-700 flex-shrink-0">
                        <Icon name="ic:baseline-collections-bookmark" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="text-[14px] font-[700] text-gray-800">
                          Booking
                        </h3>
                        <button
                          @click="navigateTo(`/listing/${notification.listing_Id}`)"
                          class="text-[12px] text-gray-600 hover:text-gray-700 font-[600] underline underline-offset-1 mt-[2px] transition-colors">
                          {{ notification.location }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="mt-[10px] ml-[46px] space-y-[8px]">
                    <div>
                      <p class="text-[11px] font-[600] text-gray-500 uppercase tracking-wide">Special Requests</p>
                      <p class="text-[12px] text-gray-600 mt-[4px] leading-relaxed">
                        {{ notification.details || 'No special requests' }}
                      </p>
                    </div>
                  </div>

                  <button
                    @click="fetchBookingDetails(notification.bookingId)"
                    class="mt-[10px] ml-[46px] text-gray-600 hover:text-gray-700 text-[12px] font-[600] underline underline-offset-2 transition-colors">
                    View Booking Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Details Modal (Host Only) -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-[15px] z-[1100]">
      <div
        class="bg-white rounded-lg p-6 shadow-lg lg:w-[600px] sm:w-[450px] w-[100%] relative"
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
        <button @click="closeModal" class="absolute top-4 right-4 scale-x-[1.3] text-gray-400 hover:text-gray-600">
          X
        </button>

        <div class="flex justify-center items-center font-semibold mb-4 text-center">
          <p
            class="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[28px] text-white bg-rose-600">
            <Icon name="ic:baseline-collections-bookmark" class="text-[17px]" />
          </p>
          <p class="ml-[10px] text-rose-600 text-[22px] font-[700]">Booking Details</p>
        </div>

        <div class="space-y-4">
          <div class="border-b-[2px] border-rose-200 pb-[12px] flex justify-between items-start gap-[12px]">
            <div class="flex-1">
              <p class="text-gray-600 text-[11px] uppercase tracking-wide font-[600] mb-[4px]">Property</p>
              <p class="text-[13px] text-rose-800 font-[700]">{{ bookingDetails?.listing?.name || 'No title found' }}</p>
            </div>

            <NuxtLink
              :to="`/listing/${bookingDetails?.listing?._id}`"
              class="text-rose-600 hover:text-rose-700 text-[12px] font-[600] cursor-pointer flex items-center gap-1 transition-colors whitespace-nowrap"
              @click="closeModal">
              View
              <Icon name="lucide:arrow-right" class="text-[13px]" />
            </NuxtLink>
          </div>

          <div>
            <p class="text-gray-600 text-[11px] uppercase tracking-wide font-[600] mb-[6px]">Property Type</p>
            <p class="text-[13px] text-gray-700 font-[500]">{{ bookingDetails?.listing?.property_type || 'N/A' }}</p>
          </div>

          <div class="bg-gradient-to-r from-rose-50 to-pink-50 p-[14px] rounded-[10px] space-y-[10px]">
            <p class="text-gray-700 text-[13px] font-[600] flex items-center gap-2">
              <label
                class="w-[28px] h-[28px] text-[16px] bg-rose-600 flex justify-center items-center rounded-full text-white flex-shrink-0">
                <Icon name="fa:calendar" class="text-[12px]" />
              </label>
              <span>
                Check-In
                <span class="ml-[4px] font-[700] text-green-700">{{ new Date(bookingDetails?.booking?.checkIn).toDateString() }}</span>
              </span>
            </p>
            <p class="text-gray-700 text-[13px] font-[600] flex items-center gap-2">
              <label
                class="w-[28px] h-[28px] text-[16px] bg-rose-600 flex justify-center items-center rounded-full text-white flex-shrink-0">
                <Icon name="fa:calendar" class="text-[12px]" />
              </label>
              <span>
                Check-Out
                <span class="ml-[4px] font-[700] text-red-600">{{ new Date(bookingDetails?.booking?.checkOut).toDateString() }}</span>
              </span>
            </p>
          </div>

          <div class="bg-blue-50 p-[14px] rounded-[10px]">
            <p class="text-gray-600 text-[11px] uppercase tracking-wide font-[600] mb-[8px] flex items-center gap-2">
              <label
                class="w-[24px] h-[24px] text-[14px] bg-blue-600 flex justify-center items-center rounded-full text-white flex-shrink-0">
                <Icon name="fa:user" class="text-[12px]" />
              </label>
              Guests
            </p>
            <ul class="space-y-[6px] ml-[32px]">
              <li class="text-[12px] text-gray-700">
                <span class="font-[600]">Adults:</span>
                <span class="ml-[8px] font-[700] text-rose-800">{{ bookingDetails?.booking?.guests?.adults || '0' }}</span>
              </li>
              <li class="text-[12px] text-gray-700">
                <span class="font-[600]">Children:</span>
                <span class="ml-[8px] font-[700] text-rose-800">{{ bookingDetails?.booking?.guests?.children || '0' }}</span>
              </li>
              <li class="text-[12px] text-gray-700">
                <span class="font-[600]">Infants:</span>
                <span class="ml-[8px] font-[700] text-rose-800">{{ bookingDetails?.booking?.guests?.infants || '0' }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-green-50 p-[14px] rounded-[10px] border-[1px] border-green-200">
            <p class="text-[11px] uppercase tracking-wide font-[600] text-gray-600 mb-[4px]">Total Amount</p>
            <p class="text-[24px] font-[700] text-green-700">
              ${{ bookingDetails?.booking?.totalAmount?.toFixed(2) || '0.00' }}
            </p>
          </div>

          <div class="bg-gray-50 p-[14px] rounded-[10px] border-[1px] border-gray-200">
            <p class="text-[11px] uppercase tracking-wide font-[600] text-gray-600 mb-[6px]">Special Requests</p>
            <p class="text-[13px] text-gray-700 leading-relaxed">
              {{ bookingDetails?.booking?.specialRequests || 'No special requests made' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useAuthStore } from '../store/auth';
import axios from 'axios';
import NotificationSkeletonLoader from '@/components/Loaders/NotificationSkeletonLoader.vue';

export default {
  name: 'NotificationPanel',
  components: {
    NotificationSkeletonLoader,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  data() {
    return {
      isModalOpen: false,
      bookingDetails: null,
      isLoadingNotifications: false,
    };
  },
  setup(props) {
    const authStore = useAuthStore();
    const notifications = computed(() => authStore.notifications);
    const userNotifications = computed(() => authStore.userNotifications);
    const userRole = computed(() => authStore.userRole);

    return {
      notifications,
      userNotifications,
      userRole,
      authStore,
    };
  },
  watch: {
    isOpen: {
      immediate: true,
      async handler(newVal) {
        if (newVal) {
          // Fetch notifications when panel opens
          await this.loadNotifications();
        }
      },
    },
  },
  methods: {
    async loadNotifications() {
      if (this.isLoadingNotifications) return; // Prevent multiple simultaneous requests

      // Show loader if no notifications exist yet
      if (this.authStore.notifications.length === 0 && this.authStore.userNotifications.length === 0) {
        this.isLoadingNotifications = true;
      }

      try {
        const token = localStorage.getItem('token');
        if (token) {
          await this.authStore.fetchUserNotifications(token);
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        this.isLoadingNotifications = false;
      }
    },
    closePanel() {
      this.$emit('close');
    },
    goToListing(listingId) {
      this.$router.push(`/listing/${listingId}`);
      this.closePanel();
    },
    navigateTo(path) {
      this.$router.push(path);
      this.closePanel();
    },
    async fetchBookingDetails(bookingId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/booking-details/${bookingId}`
        );
        this.bookingDetails = response.data;
        this.isModalOpen = true;
      } catch (error) {
        console.error('Error fetching booking details', error);
        alert('Failed to fetch booking details');
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.bookingDetails = null;
    },
    getStatusClass(status) {
      switch (status) {
        case 'approved':
          return 'bg-emerald-600';
        case 'pending':
          return 'bg-rose-600';
        case 'rejected':
          return 'bg-red-600';
        default:
          return 'bg-rose-600';
      }
    },
    getStatusTextClass(status) {
      switch (status) {
        case 'approved':
          return 'text-emerald-700';
        case 'pending':
          return 'text-rose-700';
        case 'rejected':
          return 'text-red-700';
        default:
          return 'text-rose-700';
      }
    },
  },
};
</script>
