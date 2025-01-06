<template>
  <div v-if="loading" class="text-center min-h-screen mt-[250px]">
    <span>Loading...</span>
  </div>
  <div v-else-if="error" class="text-center text-red-600">
    <span>{{ error }}</span>
  </div>
  <div v-else class="w-full overflow-x-hidden xl:px-[160px] min-h-screen p-6 bg-white">
    <h2 class="mt-[85px] mb-[20px] text-[22px] md:text-[30px] text-rose-950 font-semibold">{{ listing.name }}</h2>

    <Reviews v-if="showModal" :listingId="listingId" :ratingReviews="ratingReviews" @close="handleCloseReviews" />

    <div v-if="isListingPicturesModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        class="bg-white rounded-lg overflow-y-auto py-[25px] no-scrollbar h-[80vh] w-[95vw] px-[8px] space-y-[8px] flex flex-col md:w-[90vw] mx-4 md:mx-auto shadow-lg"
        initial="{ scale: 0.7, opacity: 1, y: 500 }" animate="{ scale: 1, opacity: 1, y: 0 }"
        transition="duration: 0.5, ease: [0.2, 0.8, 0.2, 1]">
        <button @click="isListingPicturesModalOpen = false">
          <Icon name="mdi-close" class="text-xl ml-auto mb-[15px] mr-[12px] text-gray-500 hover:text-gray-800" />
        </button>
        <div class="h-[210px] sm:h-[350px]">
          <img :src="listing.images.coverPicture" :alt="listing.title" class="w-full rounded-xl h-full object-cover" />
        </div>
        <div class="flex flex-col space-y-[8px]">
          <div v-for="(url, index) in listing.images.additionalPictures.slice(0, 4)" :key="index"
            class="h-[210px] sm:h-[350px]">
            <img :src="url" :alt="'Additional ' + (index + 1)" class="w-full rounded-xl h-full object-cover" />
          </div>
        </div>
      </div>
    </div>

    <div class="relative grid w-full overflow-hidden gap-[6px] grid-cols-5 rounded-[25px]">
      <button @click="isListingPicturesModalOpen = true"
        class="lg:hidden absolute top-[10px] right-[15px] px-[12px] rounded-2xl bg-white text-black">See Photos</button>

      <div class="col-span-5 h-[250px] sm:h-[350px] md:h-[430px] md:col-span-3">
        <img :src="listing.images.coverPicture" :alt="listing.title" class="w-full h-full object-cover" />
      </div>

      <div class="hidden h-[430px] col-span-2 md:grid grid-cols-2 grid-rows-2 gap-[6px]">
        <div v-for="(url, index) in listing.images.additionalPictures.slice(0, 4)" :key="index"
          class="flex items-center justify-center h-full">
          <img :src="url" :alt="'Additional ' + (index + 1)" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <div class="mt-[15px] mx-auto md:p-4 space-y-6 md:space-y-8 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
      <div class="lg:col-span-2 space-y-4">
        <div class="flex md:flex-row flex-col md:justify-between md:items-center space-y-4">
          <div>
            <h2 class="text-2xl font-semibold">{{ listing.property_type || '' }} In {{ listing.address.suburb || '' }},
              {{ listing.address.country || '' }}</h2>
            <p class="text-gray-600">{{ listing.bedrooms }} beds · {{ listing.bathrooms }} Shared bathroom</p>
          </div>
          <FavoriteButton v-if="userRole === 'Guest'" :listingId="listingId"
            :isInitiallyFavorited="isInitiallyFavorited" />
        </div>

        <div
          class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 border shadow-md px-[8px] md:px-[45px] py-[15px] rounded-[28px] space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4">
          <div class="flex border-r-[2px] flex-col items-center justify-center">
            <Icon name="bi:trophy-fill" class="text-[22px] lg:text-[30px]" />
            <div class="mt-[5px] text-[10px] flex md:text-[15px] font-[500]">Guest <div class="ml-[4px]">Favourite</div>
            </div>
          </div>

          <p class="text-[14px] font-[600] border-r-[2px] col-span-2 lg:block hidden text-center">
            One of the most loved homes on Airbnb, according to guests
          </p>

          <div class="flex flex-col items-center border-r-[2px] justify-center">
            <p class="font-semibold text-[15px] mt-[6px] md:text-[18px]">{{ ratingReviews.averageRating }}</p>
            <div class="flex">
              <Icon name="ant-design:star-filled" v-for="index in Math.floor(ratingReviews.averageRating)"
                :key="'full-' + index" size="15" class="text-yellow-500" />
              <Icon name="mdi:star-half" v-if="ratingReviews.averageRating % 1 >= 0.5" size="15"
                class="text-yellow-500" />
              <Icon name="ant-design:star-filled"
                v-for="index in 5 - Math.floor(ratingReviews.averageRating) - (ratingReviews.averageRating % 1 >= 0.5 ? 1 : 0)"
                :key="'empty-' + index" size="15" class="text-gray-300" />
            </div>
          </div>

          <button @click="showModal = true" class="flex flex-col items-center justify-center">
            <span class="text-[20px] md:text-[24px] text-rose-700 font-[600]">{{ ratingReviews.reviewCount }}</span>
            <span class="text-rose-900 mt-[-8px] text-[14px] md:text-[19px] underline">Review</span>
          </button>
        </div>

        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-gray-600"></div>
          <div>
            <p class="font-semibold text-red-700">{{ hostdetails.name }}</p>
            <p class="text-gray-500 text-sm">{{ calculateHostTime() }}</p>
          </div>
        </div>

        <div>
          <div class="flex items-start space-x-2 text-[17px] mb-[32px]">
            <Icon name="fa-solid:medal" class="text-yellow-500 mt-[12px] text-[28px] mr-[15px]" />
            <div>
              <p class="font-semibold">Top 5% of homes</p>
              <p class="text-gray-700">This home is highly ranked based on ratings, reviews, and reliability.</p>
            </div>
          </div>

          <div class="flex items-start space-x-2 text-[17px] mb-[32px]">
            <Icon name="akar-icons:home-alt1" class="text-gray-700 mt-[12px] text-[28px] mr-[15px]" />
            <div>
              <p class="font-semibold">{{ listing.bedrooms || '' }} Bed Room{{ listing.bedrooms > 1 && 's' }}</p>
              <p class="text-gray-700">Your own {{ listing.bedrooms || '' }} bedroom{{ listing.bedrooms > 1 && 's' }} in
                the {{ listing.property_type }}, plus access to shared spaces.</p>
            </div>
          </div>

          <div class="flex items-start space-x-2 text-[17px] mb-[32px]">
            <Icon name="fa-solid:toilet" class="text-gray-700 mt-[12px] text-[28px] mr-[15px]" />
            <div>
              <p class="font-semibold">{{ listing.bathrooms || '' }} Bath Room{{ listing.bathrooms > 1 && 's' }}</p>
              <p class="text-gray-700">Your own {{ listing.bathrooms || '' }} bathroom{{ listing.bathrooms > 1 && 's' }}
                in the {{ listing.property_type }} and access to shared spaces.</p>
            </div>
          </div>

          <div class="flex items-start space-x-2 text-[17px] mb-[32px]">
            <Icon name="fa-solid:door-open" class="text-gray-700 mt-[12px] text-[28px] mr-[15px]" />
            <div>
              <p class="font-semibold">Amenities</p>
              <div class="flex flex-wrap items-center">
                <p v-for="(amenity, index) in listing.amenities" :key="index"
                  class="text-gray-800 mt-[8px] break-words px-[7px] py-[1px] text-[13px] font-[500] border-[2px] border-gray-500 rounded-xl mr-[10px] flex items-center">
                  {{ amenity }}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-semibold text-lg">About this place</h3>
          <p class="text-sm break-words text-gray-600">{{ listing.summary }}</p>
        </div>

        <AddRating v-if="userLoginStatus" :listingId="listingId" />
      </div>

      <div className="space-y-4">
        <div className="border bg-white shadow-lg rounded-lg py-[30px] px-4 border-[#e7e7e7] space-y-[18px]">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold">{{ listing.price }}</p>
            <p className="text-sm text-gray-600 font-[600]">/ night</p>
          </div>

          <div className="border border-[#818181] rounded-lg py-4 w-full">
            <div className="grid grid-cols-2 px-[15px] border-b border-[#818181] pb-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-600">CHECK-IN</p>
                <p className="text-sm font-medium text-gray-800">6/25/2025</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-600">CHECKOUT</p>
                <p className="text-sm font-medium text-gray-800">7/4/2025</p>
              </div>
            </div>
            <div className="px-4 pt-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-600">Max Accomodation</p>
                <p className="text-sm font-medium text-gray-800">{{ listing.maxGuests }} {{ listing.maxGuests > 1 ?
                  'Guests' : 'Guest' }}</p>
              </div>
            </div>
          </div>
          <div>
            <button v-if="userRole === 'Guest'" @click="handleBooking(listingId)"
              class="w-full py-2 bg-gradient-to-r from-pink-600 to-pink-800 text-white font-semibold rounded-lg">
              Reserve
            </button>
            <div v-else>
              <div class="w-full py-2 bg-rose-300 text-center text-rose-100 cursor-pointer font-semibold rounded-lg">
                Reserve
              </div>
              <p @click="navigatetoSignIn()"
                class="text-rose-700 underline font-[500] text-[14px] text-center mt-[8px]">
                Login as a Guest To Reserve a booking
              </p>
            </div>
          </div>

          <p className="text-center text-gray-600 font-[500] text-[15px]">You won't be charged yet</p>

          <div className="space-y-1 text-gray-600 font-[500] underline text-[15px]">
            <div className="flex justify-between">
              <p>${{ listing.price }} x 7 nights</p>
              <p>${{ listing.price * 7 }}</p>
            </div>
            <div className="flex justify-between">
              <p>Cleaning fee</p>
              <p>$29</p>
            </div>
            <div className="flex justify-between">
              <p>Airbnb service fee</p>
              <p>$89</p>
            </div>
          </div>
          <div className='mx-auto h-[2px] bg-gray-300'></div>
          <div className="flex justify-between font-semibold">
            <p>Total before taxes</p>
            <p>${{ (listing.price * 7) + 29 + 89 }}</p>
          </div>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-pink-800 font-semibold">
            {{ listing.bookingsMade > 20 ? 'This is a rare find' : 'Seize this exclusive opportunity now.' }}
          </p>
          <p className="text-sm text-gray-600">{{ listing.bookingsMade || "" }} booking made {{ listing.bookingsMade > 1
            && 's' }} till now</p>
        </div>

      </div>
    </div>

  </div>
</template>


<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import Reviews from '@/components/Reviews.vue';
import AddRating from '@/components/AddRating.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import axios from 'axios';
import { isLoggedIn } from '../../../composables/isLoggedIn.js';

export default {
  name: 'ListingDetails',
  components: {
    Reviews,
    AddRating,
    FavoriteButton,
  },
  setup() {
    const route = useRoute();
    const listingId = route.params.listingId;
    const router = useRouter();
    const authStore = useAuthStore();
    const userRole = authStore.userRole;
    //const { listingId } = route.params;
    const listing = ref(null);
    const hostListingId = ref(null);
    const userLoginStatus = ref(null);
    const hostdetails = ref(null);
    const isInitiallyFavorited = ref(true);
    const loading = ref(true);
    const error = ref(null);
    const ratingerror = ref(null);
    //const showModal = ref(false);
    const isListingPicturesModalOpen = ref(false);
    const ratingReviews = ref([]);

    const showModal = ref(false);

    // Method to handle the Reviews close event
    const handleCloseReviews = () => {
      showModal.value = false;
    }

    const fetchReviewCountAndRating = async () => {
      try {
        //const response = await useAxios(`/air-bnb/listing-rating/rating-review-count/${listingId}`);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/listing-rating/rating-review-count/${listingId}`);
        ratingReviews.value = response.data;
      } catch (err) {
        ratingerror.value = 'Failed to fetch reviews. Please try again.';
        console.error('Error fetching reviews:', err.response?.data || err.message);
      }
    };

    const fetchListingDetails = async () => {
      try {
        const token = userLoginStatus.value ? localStorage.getItem('token') : null;
        //const response = await useAxios(`/air-bnb/home/${userLoginStatus.value ? 'listings' : 'listing-details'}/${listingId}`);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/${userLoginStatus.value ? 'listings' : 'listing-details'}/${listingId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        listing.value = response.data.listing;
        isInitiallyFavorited.value = response.data.isLiked;
        hostdetails.value = response.data.hostDetails;
        hostListingId.value = response.data.listing.hostID.toString();
        //console.log(response.data.listing.hostID)
        //console.log(response.data.listing.category)
        loading.value = false;
      }
      catch (err) {
        error.value = 'Failed to fetch listing details';
        loading.value = false;
        console.error('Error fetching listing details:', err);
      }
    };

    onMounted(() => {
      window.scrollTo(0, 0);
      userLoginStatus.value = isLoggedIn();
      fetchReviewCountAndRating();
    });

    watch(userLoginStatus, () => {
      if (userLoginStatus.value !== null) {
        fetchListingDetails();
      }
    });

    const calculateHostTime = () => {
      const time = Math.floor(Math.random() * 3) + 1;
      return time === 1 ? `Hosted for ${time} year` : `Hosted for ${time} years`;
    };

    const handleBooking = () => {
      router.push(`/guest/make-booking/${hostListingId.value}/${listingId}`); 
    };

    return {
      listing,
      listingId,
      userRole,
      userLoginStatus,
      hostdetails,
      isInitiallyFavorited,
      loading,
      error,
      ratingerror,
      handleCloseReviews, // Expose the new method
      showModal,
      isListingPicturesModalOpen,
      ratingReviews,
      calculateHostTime,
      handleBooking,
    };
  },
};
</script>
