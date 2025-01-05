<template>
    <div v-if="error" class="text-center text-red-500 mt-10">{{ error }}</div>

    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg overflow-y-auto no-scrollbar lg:overflow-y-hidden h-[90vh] w-full max-w-4xl mx-4 md:mx-auto shadow-lg"
            v-motion="{
                initial: { y: 900, opacity: 0, scale: 0 },
                enter: { y: 0, opacity: 1, scale: 1 },
                transition:{
                    duration: 2500,
                    easing: 'easeInOutCubic' 
                }
            }">
            <div class="flex justify-between items-center border-b p-4">
                <h2 class="text-lg font-semibold">Guest Reviews</h2>
                <button @click="
                ">
                    <Icon name="fa-solid:times" class="text-xl text-gray-500 hover:text-gray-800" />
                </button>
            </div>

            <div class="grid lg:grid-cols-5 grid-cols-1 p-4">
                <div class="lg:col-span-2">
                    <div class="flex items-center justify-center mb-[25px]">
                        <img src="/assets/leftWing.png" alt="img1" class="w-[75px] mt-[28px]" />
                        <p class="text-[65px] ml-[12px] mr-[-5px] font-[600]">{{ ratingReviews.averageRating }}</p>
                        <img src="/assets/rightWing.png" alt="img1" class="w-[75px] mt-[28px]" />
                    </div>
                    <div
                        class="md:scale-[1] scale-[0.8] flex items-center justify-center w-[130px] py-[2px] border border-gray-500 rounded-lg">
                        <Icon name="gi-angel-wings" />
                        <span class="ml-[8px] text-[15px]">Guest favorite</span>
                    </div>
                    <p class="mt-[15px] text-[13px] text-gray-600">
                        One of the most loved homes on Airbnb based on ratings, reviews, and reliability
                    </p>
                </div>

                <div class="lg:col-span-3 mt-[15px]">
                    <h3 class="text-lg font-medium mb-4">{{ ratingReviews.arraySize }} Reviews</h3>
                    <div class="overflow-y-auto mb-[75px] no-scrollbar max-h-[520px]">
                        <template v-if="!loading">
                            <template v-if="reviews.length === 0">
                                <div
                                    class="w-full flex flex-col scale-[0.4] lg:mt-[-15px] mt-[-80px] mx-auto contrast justify-center items-center">
                                    <img src="/assets/noComments.webp" alt="" class="grayscale contrast-75" />
                                    <p class="text-gray-400 font-[600] text-[32px]">No Review Made Till Now</p>
                                </div>
                            </template>

                            <template v-for="(review, index) in reviews" :key="index">
                                <div class="mb-6 p-4 bg-white">
                                    <div class="mb-[8px] flex items-center">
                                        <img :src="`/Avatars/${review.user.profilePicture}.jpg`" alt="No Profile Avatar"
                                            class="w-10 h-10 rounded-full mr-4 border border-gray-300 shadow-md" />
                                        <div>
                                            <h4 class="text-[16px] font-medium">{{ review.user?.username || 'Anonymous'
                                                }}</h4>
                                            <p class="text-gray-500 text-[12px] font-[500]">
                                                {{ review.user?.location.city || '' }}, {{ review.user?.location.country
                                                    || '' }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex my-[4px] items-center">
                                        <div class="flex">
                                            <Icon name="ant-design:star-filled"
                                                v-for="index in Math.floor(review.rating)" :key="'full-' + index"
                                                size="15" class="text-yellow-500" />
                                            <Icon name="fa:star-half-alt" v-if="review.rating % 1 >= 0.5" size="15"
                                                class="text-yellow-500" />
                                            <Icon name="ant-design:star-filled"
                                                v-for="index in 5 - Math.floor(review.rating) - (review.rating % 1 >= 0.5 ? 1 : 0)"
                                                :key="'empty-' + index" size="15" class="text-gray-300" />
                                        </div>
                                        <p class="text-sm ml-[15px] mb-[3px] text-gray-500">
                                            {{ timeSince(review.date) }}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="mt-2 text-gray-700">{{ review.review }}</p>
                                    </div>
                                </div>
                            </template>

                            <div v-if="currentPage < totalPages && !loading" class="mt-6">
                                <button @click="handleShowMore"
                                    class="px-4 py-[6px] text-[13px] bg-rose-600 text-white rounded-md hover:bg-rose-900">
                                    Show More
                                </button>
                            </div>
                        </template>

                        <template v-else>
                            <p>loading ........</p>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
    listingId: {
        type: String,
        required: true,
    },
    ratingReviews: {
        type: Object,
        required: true,
    },
    onClose: {
        type: Function,
        required: true,
    },
});

console.log("Received Listing ID:", props.ratingReviews)

const reviews = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const loading = ref(true);
const error = ref('');

const fetchReviews = async (page) => {
    try {
        loading.value = true;
        console.log(props.listingId)
        const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/listing-rating/get-reviews/${props.listingId}`,
            { params: { page, limit: 5 } }
        );

        if (page === 1) {
            reviews.value = response.data.reviews;
        } else {
            reviews.value = [...reviews.value, ...response.data.reviews];
        }

        currentPage.value = response.data.currentPage;
        totalPages.value = response.data.totalPages;
    } catch (err) {
        error.value = 'Failed to fetch reviews. Please try again.';
        console.error('Error fetching reviews:', err.response?.data || err.message);
    } finally {
        loading.value = false;
    }
};

const handleShowMore = () => {
    if (currentPage.value < totalPages.value) {
        fetchReviews(currentPage.value + 1);
    }
};

const timeSince = (date) => {
    const reviewDate = new Date(date);
    const now = new Date();
    const timeDiff = now - reviewDate;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years >= 1) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months >= 1) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        return days === 0 ? 'Today' : `${days} day${days > 1 ? 's' : ''} ago`;
    }
};

onMounted(() => {
    fetchReviews(1);
});
</script>

<style scoped>
/* You can add scoped styles here */
</style>