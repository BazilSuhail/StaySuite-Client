<template>
    <div>
        <div v-if="loading" class="flex justify-center items-center min-h-screen">
<Loader/>
        </div>

        <div v-else-if="error" class="bg-gray-50 pt-[90px] min-h-screen pb-[65px] flex justify-center items-center">
            <div class="max-w-[950px] mx-auto px-6">
                <h3 class="text-[18px] md:text-[24px] text-rose-600 font-[700]">Your Property Listings</h3>
                <div class="bg-rose-600 mt-[15px] mb-[35px] rounded-xl h-[2px]"></div>
                <div class="flex flex-col space-y-[15px]">
                    <div
                        class="min-h-screen w-full flex flex-col justify-center items-center mix-blend-multiply mt-[-150px]">
                        <img src="/assets/noReservations.webp" alt="No Reservations" class="scale-[0.4]" />
                        <p class="text-rose-800 font-[400] text-[15px] text-center mt-[-45px] md:mt-[-100px]">You haven't made any listings.</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="bg-gray-100 pt-[100px] border-b-[2px] pb-[15px] min-h-screen justify-center items-center">
            <div class="md:px-[25px] px-[15px] xl:px-[150px]">
                <h3 class="text-[18px] md:text-[24px] text-rose-600 font-[700]">Your Property Listings</h3>
                <div class="bg-rose-600 mt-[15px] rounded-xl h-[2px]"></div>

                <div class="mt-[25px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    <div v-for="listing in listings" :key="listing._id"
                        class="border rounded-lg px-[25px] py-8 shadow-sm bg-white relative">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <img :src="listing.images.placePicture" alt="Listing Image" class="h-[50px] border w-[50px] rounded-lg" />
                                <p class="ml-[8px]">
                                    <span class="text-lg font-semibold">{{ listing.name.slice(0, 18) }}{{ listing.name.length > 18 && "..." }}</span><br />
                                    <span class="text-[12px] font-[600] mt-[-4px] text-gray-500">{{ listing.address.suburb }}, {{listing.address.country }}</span>
                                </p>
                            </div>
                            <button @click="handleDeleteClick(listing._id)"
                                class="absolute top-3 right-3 text-red-500 hover:text-red-700">
                                <Icon name="ic:baseline-delete-outline" class="text-[21px] bg-red-700 hover:text-red-300" />
                            </button>
                            <button @click="navigateToEdit(listing._id)"
                                class="absolute top-3 right-9 text-blue-500 hover:text-blue-700">
                                <Icon name="fa:edit" class="text-blue-500 hover:text-blue-700" />
                            </button>
                        </div>
                        <div class="h-[2px] bg-gray-200 w-full rounded-xl mt-[15px]"></div>
                        <p class="text-[12px] break-words mt-[4px] text-gray-500 font-[600]">{{ listing.summary.slice(0, 150) }}
                        </p>
                        <p class="mt-2 text-[14px] text-green-700 font-medium">${{ listing.price }} /night</p>
                    </div>
                </div>

                <div v-if="!listings.length" class="mt-[350px] text-center bg-red-500 text-gray-500">
                    You have no hosted listings.
                </div>

                <div v-if="showModal"
                    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div class="bg-white px-6 py-[15px] rounded-md shadow-md w-96">
                        <h3 class="text-xl text-red-700 font-[600] mb-1">Are you sure?</h3>
                        <p class="mb-8">Are you sure you want to delete this listing?</p>
                        <div class="flex justify-end mt-[20px]">
                            <button @click="handleDeleteConfirm"
                                class="bg-red-500 text-white font-[600] text-[13px] px-4 py-1 rounded-md mr-[8px] hover:bg-red-600">
                                Yes, Delete
                            </button>
                            <button @click="handleDeleteCancel"
                                class="bg-gray-300 text-gray-800 font-[600] text-[13px] px-4 py-1 rounded-md hover:bg-gray-800 hover:text-gray-50">
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
import Loader from '../../../components/Loaders/Loader.vue';
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
    router.push(`/host/host-listings/${listingId}`);
};

onMounted(() => {
    window.scrollTo(0, 0);
    fetchHostedListings();
});
</script>