<template>
    <div class="bg-white pt-[100px] min-h-screen pb-[65px] justify-center items-center">
      <div class="max-w-[950px] mx-auto px-6">
        <div class="flex items-center text-rose-600">
          <Icon name="fa:bell" size="35" class="mr-[8px]" />
          <h3 class="text-[24px] font-[700] text-start">Notifications</h3>
        </div>
  
        <div class="h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]"></div>
  
        <div class="flex flex-col space-y-[15px]">
          <div
            v-if="userNotifications.length === 0 && notifications.length === 0"
            class="min-h-screen w-full flex justify-center items-center mix-blend-multiply mt-[-250px]"
          >
            <img src="/assets/notifications.webp" alt="No Notifications" class="scale-[0.55] md:scale-[0.4]" />
          </div>
  
          <div
            v-for="(notification, index) in notifications"
            :key="index"
            class="border-b-[2px] border-rose-700 lg:px-[20px] py-[15px] flex flex-col"
          >
            <div class="flex items-center">
              <div
                class="w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[28px] bg-rose-800 text-rose-100"
              >
                <Icon name="fa:calendar-check" />
              </div>
              <h3 class="text-[16px] ml-[5px] text-rose-700 font-[500]">
                {{ notification.title }}
                <span
                  :class="`scale-[0.9] mt-[5px] uppercase font-[600] px-[12px] mx-[8px] pb-[2px] text-white rounded-[30px] text-[13px] ${getStatusClass(notification.UpdatedStatus)}`"
                >
                  {{ notification.UpdatedStatus }}
                </span>
              </h3>
            </div>
  
            <p class="ml-[48px] break-words">
              Your reservation for {{ notification.address }} between {{ notification.checkInOut }} has been
              <span
                :class="`scale-[0.9] mt-[5px] px-[8px] font-[700] underline ${getStatusTextClass(notification.UpdatedStatus)}`"
              >
                {{ notification.UpdatedStatus }}
              </span>
              by Host {{ notification.host }}.
            </p>
            <button
              @click="goToListing(notification.listingId)"
              class="ml-[48px] text-rose-700 underline underline-offset-2 font-[500] mt-[4px] text-start"
            >
              See Listing
            </button>
          </div>
  
          <div
            v-for="(notification, index) in userNotifications"
            :key="index"
            class="bg-rose-50 rounded-[18px] lg:px-[20px] py-[15px] flex flex-col"
          >
            <div class="flex items-center">
              <div
                class="w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[28px] bg-rose-100 text-rose-600"
              >
                <Icon name="fa:calendar-check" />
              </div>
              <h3 class="text-[16px] ml-[5px] text-rose-700 font-[500]">
                {{ notification.title }}
                <span
                  :class="`scale-[0.9] mt-[5px] uppercase font-[600] px-[12px] mx-[8px] pb-[2px] text-white rounded-[30px] text-[11px] ${getStatusClass(notification.UpdatedStatus)}`"
                >
                  {{ notification.UpdatedStatus }}
                </span>
              </h3>
            </div>
  
            <p class="ml-[48px] break-words text-[14px] mb-[8px] text-rose-600">
              Your reservation for {{ notification.address }} between {{ notification.checkInOut }} has been
              <span
                :class="`scale-[0.9] mt-[5px] px-[8px] font-[700] underline ${getStatusTextClass(notification.UpdatedStatus)}`"
              >
                {{ notification.UpdatedStatus }}
              </span>
              by Host {{ notification.host }}.
            </p>
            <button
              @click="goToListing(notification.listingId)"
              class="ml-[48px] text-rose-700 underline underline-offset-2 font-[500] mt-[4px] text-start"
            >
              See Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from "#app";
import { useAuthStore } from "../../../store/auth";
  
  export default {
    data() {
      return {
        notifications: [],
        userNotifications: [],
      };
    },
    setup() {
      const { notifications, userNotifications } = useAuthStore();
      const router = useRouter();
      return { notifications, userNotifications, router };
    },
    mounted() {
      window.scrollTo(0, 0);
    },
    methods: {
      goToListing(listingId) {
        this.router.push(`/listing/${listingId}`);
      },
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
      getStatusTextClass(status) {
        switch (status) {
          case "approved":
            return "text-green-800";
          case "pending":
            return "text-yellow-700";
          case "rejected":
            return "text-red-600";
          default:
            return "text-gray-800";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  