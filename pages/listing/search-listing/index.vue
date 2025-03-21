<template>
    <div class="min-h-screen mt-[75px] md:mt-[85px] bg-gradient-to-br from-white via-rose-50/30 to-pink-50/40">
        <!-- Header Section -->
        <div v-if="results.length > 0" class="px-4 xl:px-[75px] py-[20px] border-b border-rose-100">
            <div class="flex items-center gap-2">
                <Icon name="fa6-solid:sliders" class="text-rose-600 text-[20px]" />
                <h2 class="text-[16px] md:text-[20px] font-[600] text-gray-800">
                    Filtered Results
                </h2>
                <span class="text-[13px] font-[600] text-gray-500 ml-auto">{{ results.length }} properties found</span>
            </div>
        </div>

        <!-- No Results Found -->
        <div
            v-if="results.length === 0"
            class="mt-[100px] mb-[100px] w-full flex flex-col justify-center items-center"
        >
            <div class="mb-[30px]">
                <div class="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mx-auto mb-[20px] shadow-lg">
                    <Icon name="fa6-solid:filter" class="text-rose-600 text-[48px]" />
                </div>
            </div>
            <h3 class="text-[24px] font-[700] text-gray-800 mb-[8px]">No results found</h3>
            <p class="text-gray-500 text-[14px] mb-[24px] text-center">
                No listings match your current filters. Try adjusting your search criteria.
            </p>
            <router-link
                to="/listing/search-listing"
                class="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-red-700 text-white font-[600] px-[24px] py-[12px] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
                <Icon name="fa6-solid:arrow-left" class="text-[14px]" />
                Back to Listings
            </router-link>
        </div>

        <!-- Listings Grid -->
        <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[18px] xl:px-[75px] pb-[45px] px-4 py-[20px]"
        >
            <div
                v-for="listing in results"
                :key="listing._id"
                @click="goToListing(listing._id)"
                class="group overflow-hidden cursor-pointer rounded-[16px] bg-white border border-rose-100 hover:border-rose-300 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
                <!-- Image Container with Overlay -->
                <div class="relative overflow-hidden h-[260px] sm:h-[240px] lg:h-[200px] xl:h-[220px] bg-gray-100">
                    <img
                        :src="listing.images.placePicture || 'https://via.placeholder.com/300'"
                        :alt="listing.name"
                        loading="lazy"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <!-- Favorite Button -->
                    <button 
                        @click.stop="toggleFavorite(listing._id)"
                        class="absolute top-3 right-3 w-[36px] h-[36px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
                        <Icon name="fa6-solid:heart" class="text-[16px]" :class="isFavored(listing._id) ? 'text-rose-600' : 'text-gray-400'" />
                    </button>

                    <!-- Rating Badge -->
                    <div v-if="listing.rating > 0" class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-[10px] py-[5px] rounded-full flex items-center gap-1 shadow-lg">
                        <Icon name="fa-solid:star" class="text-yellow-400 text-[13px]" />
                        <span class="text-[12px] font-[700] text-gray-900">{{ listing.rating }}</span>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-[14px] h-[140px] sm:h-[150px] flex flex-col justify-between">
                    
                    <!-- Property Type and Location Row -->
                    <div>
                        <div class="flex items-center justify-between mb-[8px]">
                            <p class="text-rose-600 font-[700] text-[11px] uppercase tracking-wide flex items-center gap-1">
                                <Icon name="fa6-solid:door-open" class="text-[12px]" />
                                {{ listing.property_type || listing.type }}
                            </p>
                            <div class="bg-gradient-to-r from-rose-600/10 to-rose-700/10 text-rose-700 px-[8px] py-[3px] rounded-full text-[10px] font-[700] flex items-center gap-1 border border-rose-200">
                                <Icon name="fa6-solid:tag" class="text-[11px]" />
                                {{ listing.category.substring(0, 8) }}
                            </div>
                        </div>
                        
                        <h2 class="font-[700] text-[14px] text-gray-900 line-clamp-2 mb-[8px]">
                            {{ listing.name }}
                        </h2>

                        <!-- Location -->
                        <p class="text-gray-600 text-[12px] font-[500] flex items-center gap-1">
                            <Icon name="fa6-solid:location-dot" class="text-rose-500 text-[11px] flex-shrink-0" />
                            <span class="truncate">{{ listing.address.suburb }}, {{ listing.address.country }}</span>
                        </p>
                    </div>

                    <!-- Price -->
                    <div class="flex items-baseline justify-between pt-[8px] border-t border-rose-100">
                        <div>
                            <span class="text-[16px] font-[800] text-gray-900">${{ listing.price }}</span>
                            <span class="text-gray-500 text-[11px] font-[500]">/night</span>
                        </div>
                        <Icon name="fa6-solid:arrow-right" class="text-rose-600 text-[13px] group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth.js";

export default {
    data() {
        return {
            results: [],
            favorites: [],
        };
    },
    setup() {
        const auth = useAuthStore();
        const router = useRouter();
        return { auth, router };
    },
    mounted() {
        this.loadFavorites();
        this.fetchListings();
    },
    methods: {
        async fetchListings() {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/filtered-listings`,
                    this.auth.searchfilters
                );
                this.results = response.data;
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        },
        goToListing(listingId) {
            this.router.push(`/listing/${listingId}`);
        },
        loadFavorites() {
            const saved = localStorage.getItem('favorites');
            if (saved) {
                this.favorites = JSON.parse(saved);
            }
        },
        isFavored(listingId) {
            return this.favorites.includes(listingId);
        },
        toggleFavorite(listingId) {
            const index = this.favorites.indexOf(listingId);
            if (index > -1) {
                this.favorites.splice(index, 1);
            } else {
                this.favorites.push(listingId);
            }
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
    },
};
</script>
