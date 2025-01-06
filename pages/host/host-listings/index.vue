<template>
    <div>
        <div v-if="loading" class="flex justify-center items-center min-h-screen">

            laoding
        </div>

        <div v-else-if="error" class="bg-gray-50 pt-[90px] min-h-screen pb-[65px] flex justify-center items-center">
            <div class="max-w-[950px] mx-auto px-6">
                <h3 class="text-[24px] text-rose-600 font-[700] text-center">Your Property Listings</h3>
                <div class="bg-rose-600 mt-[15px] mb-[35px] rounded-xl h-[2px]"></div>
                <div class="flex flex-col space-y-[15px]">
                    <div
                        class="min-h-screen w-full flex flex-col justify-center items-center mix-blend-multiply mt-[-150px]">
                        <img src="/assets/noReservations.webp" alt="No Reservations" class="scale-[0.4]" />
                        <p class="text-rose-800 font-[400] text-[15px] text-center mt-[-45px] md:mt-[-100px]">You
                            haven't made any listings.</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="bg-gray-100 pt-[110px] border-b-[2px] pb-[15px] min-h-screen justify-center items-center">
            <div class="md:px-[25px] px-[15px] xl:px-[150px]">
                <h3 class="text-[24px] text-rose-600 font-[700] text-center">Your Property Listings</h3>
                <div class="bg-rose-600 mt-[15px] mb-[35px] rounded-xl h-[2px]"></div>
                <div class="md:p-0 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    <div v-for="listing in listings" :key="listing._id"
                        class="border rounded-lg px-[25px] py-8 shadow-sm bg-white relative">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <img :src="listing.images.placePicture" alt="Listing Image"
                                    class="h-[50px] w-[50px] rounded-xl" />
                                <p class="ml-[8px]">
                                    <span class="text-lg font-semibold">{{ listing.name.slice(0, 18) }}...</span><br />
                                    <span class="text-[12px] mt-[-4px] text-gray-500">{{ listing.address.suburb }}, {{
                                        listing.address.country }}</span>
                                </p>
                            </div>
                            <button @click="handleDeleteClick(listing._id)"
                                class="absolute top-3 right-3 text-red-500 hover:text-red-700">
                                <Icon name="fa:trash-alt" class="text-red-500 hover:text-red-700" />
                            </button>
                            <button @click="navigateToEdit(listing._id)"
                                class="absolute top-3 right-9 text-blue-500 hover:text-blue-700">
                                <Icon name="fa:edit" class="text-blue-500 hover:text-blue-700" />
                            </button>
                        </div>
                        <p class="text-[14px] break-words mt-[8px] text-gray-700">{{ listing.summary.slice(0, 150) }}
                        </p>
                        <p class="mt-2 text-[14px] text-green-700 font-medium">${{ listing.price }} /night</p>
                    </div>
                </div>

                <div v-if="!listings.length" class="mt-[350px] text-center bg-red-500 text-gray-500">
                    You have no hosted listings.
                </div>

                <div v-if="showModal"
                    class="fixed inset-0 py-[35px] flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div class="bg-white px-6 py-[45px] rounded-xl shadow-md w-96">
                        <h3 class="text-xl font-semibold text-center mb-4">Are you sure?</h3>
                        <p class="text-center mb-4">Are you sure you want to delete this listing?</p>
                        <div class="flex justify-evenly mt-[20px]">
                            <button @click="handleDeleteConfirm"
                                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                                Yes, Delete
                            </button>
                            <button @click="handleDeleteCancel"
                                class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
//  import MyLoader from '~/assets/MyLoader.vue';
//import noReservations from '~/assets/PhotosAssets/noReservations.webp';

const router = useRouter();

const listings = ref([]);
const loading = ref(true);
const error = ref('');
const deleteListingId = ref(null);
const showModal = ref(false);

const fetchHostedListings = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/hosted-listings`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        listings.value = response.data;
    } catch (err) {
        console.error('Error fetching hosted listings:', err);
        error.value = 'Failed to fetch hosted listings.';
    } finally {
        loading.value = false;
    }
};

const handleDeleteClick = (listingId) => {
    deleteListingId.value = listingId;
    showModal.value = true;
};

const handleDeleteConfirm = async () => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/delete-listing/${deleteListingId.value}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        listings.value = listings.value.filter((listing) => listing._id !== deleteListingId.value);
        showModal.value = false;
    } catch (err) {
        console.error('Error deleting listing:', err);
        error.value = 'Failed to delete the listing.';
    }
};

const handleDeleteCancel = () => {
    showModal.value = false;
};

const navigateToEdit = (listingId) => {
    router.push(`/update-listing/${listingId}`);
};

onMounted(() => {
    window.scrollTo(0, 0);
    fetchHostedListings();
});
</script>