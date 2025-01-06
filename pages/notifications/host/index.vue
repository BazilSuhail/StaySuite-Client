<template>
    <div class="bg-gray-50 pt-[100px] min-h-screen pb-[65px] justify-center items-center">
        <div class="max-w-[950px] mx-auto px-6">
            <div class="flex items-center text-rose-600">
                <Icon name="fa:bell" class="mr-[8px]" />
                <h3 class="text-[24px] font-[700] text-start">Notifications</h3>
            </div>
            <div class="h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]"></div>


            <div v-if="isLoading" class="flex justify-center items-center">
                <p>Loading...</p>
            </div>
            <div v-else-if="userNotifications.length === 0 && notifications.length === 0"
                class="min-h-screen w-full flex justify-center items-center mix-blend-multiply mt-[-250px]">
                <img src="/assets/notifications.webp" alt="" class="scale-[0.55] md:scale-[0.4]" />
            </div>

            <div v-else class="flex flex-col space-y-[15px]">
                <div v-for="(notification, index) in notifications" :key="index"
                    class="border-b-[2px] border-rose-700 lg:px-[20px] py-[15px] flex flex-col">
                    <div class="flex items-center">
                        <div
                            class="w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[23px] bg-rose-800 text-rose-50">
                            <Icon name="ic:outline-bookmark-add" />
                        </div>
                        <h3 class="text-[16px] ml-[12px] text-rose-600 font-[500]">
                            New Booking Created at Your Property In
                            <span @click="navigateTo(`/listing/${notification.listing_Id}`)"
                                class="text-rose-800 text-[17px] cursor-pointer underline underline-offset-1 font-[600]">
                                {{ notification.location }}
                            </span>
                        </h3>
                    </div>
                    <p class="ml-[49px]">
                        <span class="text-rose-500 text-[16px] font-[700]">Special Requests: </span>{{
                        notification.details }}
                    </p>
                    <button @click="fetchBookingDetails(notification.bookingId)"
                        class="ml-[48px] text-rose-700 underline underline-offset-2 font-[500] mt-[4px] text-start">
                        See Booking
                    </button>
                </div>

                <div v-for="(notification, index) in userNotifications" :key="index"
                    class="bg-rose-50 rounded-[25px] lg:px-[20px] py-[15px] flex flex-col">
                    <div class="flex items-center">
                        <div
                            class="w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[22px] bg-rose-200 text-rose-600">
                            <Icon name="ic:baseline-collections-bookmark" />
                        </div>
                        <h3 class="text-[16px] ml-[12px] text-rose-400 font-[500]">
                            Booking Created at Your Property In
                            <span @click="navigateTo(`/listing/${notification.listing_Id}`)"
                                class="text-rose-500 text-[17px] cursor-pointer underline underline-offset-1 font-[600]">
                                {{ notification.location }}
                            </span>
                        </h3>
                    </div>
                    <p class="ml-[49px] text-rose-800">
                        <span class="text-rose-400 text-[16px] font-[600]">Special Requests: </span>{{
                        notification.details }}
                    </p>
                    <button @click="fetchBookingDetails(notification.bookingId)"
                        class="ml-[48px] text-rose-700 underline underline-offset-2 font-[500] mt-[4px] text-start">
                        See Booking
                    </button>
                </div>
            </div>
        </div>

        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 shadow-lg lg:w-[600px] w-[400px] relative">
                <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <Icon name="ic:outline-close" class="text-2xl" />
                </button>

                <div class="flex justify-center items-center font-semibold mb-4 text-center text-gray-800">
                    <p
                        class="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[28px] text-rose-100 bg-rose-600">
                        <Icon name="ic:baseline-collections-bookmark" class="text-xl" />
                    </p>
                    <p class="ml-[10px] text-rose-600 text-[25px]">Booking Details</p>
                </div>

                <div class="space-y-2">
                    <div class="border-b-[2px] border-rose-700 pb-[8px] flex justify-between items-center">
                        <p class="text-gray-700 font-medium">
                            Name: <span class="font-normal">{{ bookingDetails.listing.name || 'No title found' }}</span>
                        </p>
                        <NuxtLink :to="`/listing/${bookingDetails.listing._id}`"
                            class="text-rose-700 hover:text-red-500 cursor-pointer flex items-center">
                            See Listings
                            <Icon name="lucide:arrow-right" class="ml-[4px] text-[17px] mt-[2px]" />
                        </NuxtLink>
                    </div>
                    <p class="text-gray-700 mb-[15px] font-medium">
                        Property Type: <span class="font-normal">{{ bookingDetails.listing.property_type || '' }}</span>
                    </p>
                    <p class="text-gray-700 text-[14px] mt-[15px] font-medium flex items-center gap-2">
                        <label
                            class="w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white">
                            <Icon name="fa:calendar" class="text-[16px]" />
                        </label>
                        Check-In: <span class="font-[600] text-green-700">{{ new
                            Date(bookingDetails.booking.checkIn).toDateString() }}</span>
                    </p>
                    <p class="text-gray-700 text-[14px] font-medium flex items-center gap-2">
                        <label
                            class="w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white">
                            <Icon name="fa:calendar" class="text-[16px]" />
                        </label>
                        Check-Out: <span class="font-[600] text-red-700">{{ new
                            Date(bookingDetails.booking.checkOut).toDateString() }}</span>
                    </p>
                </div>

                <div class="mt-4">
                    <p class="text-gray-700 font-medium mb-1 flex items-center gap-2">
                        <label
                            class="w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white">
                            <Icon name="fa:user" class="text-[19px]" />
                        </label>
                        Guests:
                    </p>
                    <ul class="list-disc list-inside ml-4 text-gray-600">
                        <li>Adults: {{ bookingDetails.booking.guests.adults || 'sd' }}</li>
                        <li>Children: {{ bookingDetails.booking.guests.children || 'sd' }}</li>
                        <li>Infants: {{ bookingDetails.booking.guests.infants || 'sd' }}</li>
                    </ul>
                </div>

                <p class="text-gray-700 font-medium mt-4">
                    Total Amount: <span class="font-bold text-green-500">${{ bookingDetails.booking.totalAmount || 'sd'
                        }}</span>
                </p>

                <p class="text-sm text-gray-500 italic mt-2">
                    Special Requests: {{ bookingDetails.booking.specialRequests || 'No requests made ...' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "../../../store/auth";
import { defineNuxtLink } from "nuxt/app";

export default {
    data() {
        return {
            notifications: [],
            userNotifications: [],
            isModalOpen: false,
            bookingDetails: null,
        };
    },
    setup() {
        const { notifications, userNotifications } = useAuthStore();
        return { notifications, userNotifications };
    },
    methods: {
        async fetchBookingDetails(bookingId) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/booking-details/${bookingId}`);
                this.bookingDetails = response.data;
                this.isModalOpen = true;
            } catch (error) {
                console.error("Error fetching booking details", error);
                alert("Failed to fetch booking details");
            }
        },
        closeModal() {
            this.isModalOpen = false;
            this.bookingDetails = null;
        },
        navigateTo(path) {
            this.$router.push(path);
        },
    },
    mounted() {
        window.scrollTo(0, 0);
    },
};
</script>