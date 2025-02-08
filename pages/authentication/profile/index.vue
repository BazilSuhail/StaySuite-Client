<template>
    <main v-if="loading" class="text-center min-h-screen  mt-[250px]">
        <span>Loading...</span>
    </main>
    <main v-else-if="error" class="text-center text-red-600">
        <span>{{ error }}</span>
    </main>
    <main v-else className='px-6 sm:pb-0 pb-[70px] min-h-screen bg-gray-100 pt-[110px] lg:pt-[150px]'>
        <div v-if="isEditing" class="lg:flex lg:space-x-8 lg:items-start max-w-5xl mx-auto">
            <!-- Left Section -->
            <div class="lg:w-1/3 mb-6 lg:mb-0">
                <div class="flex justify-between py-6 p-[35px] bg-white rounded-[28px] shadow-sm">
                    <div class="flex flex-col justify-center items-center mb-4">
                        <img :src="`/Avatars/${selectedAvatar || userInfo.profilePicture}.jpg`" alt="Profile Avatar"
                            class="w-24 h-24 rounded-full border border-gray-300 shadow-md" />
                        <button type="button" @click="openAvatarModal"
                            class="bg-blue-900 ml-[10px] text-white px-4 py-[2px] text-[12px] mt-[5px] rounded-md hover:bg-gray-600">
                            Change Avatar
                        </button>
                        <h2 class="text-[25px] font-semibold">{{ userInfo.username }}</h2>
                        <p
                            class="bg-gray-500 text-gray-100 text-center py-[1px] mt-[8px] text-[13px] rounded-[35px] w-[70px]">
                            {{ userInfo.role }}
                        </p>
                    </div>
                    <div class="flex flex-col mr-[25px] items-center justify-center text-gray-500">
                        <p class="text-[18px]">
                            {{ formatDate(userInfo.createdAt) }}
                        </p>
                        <p class="text-rose-700 font-[700]">On AirBnb</p>
                    </div>
                </div>

                <div class="mt-8 p-6 border bg-white rounded-[24px]">
                    <h3 class="text-[17px] font-semibold mb-4">Bazil's confirmed information status</h3>
                    <div class="flex items-center space-x-2 mb-2">
                        <Icon name="fa:check-circle" class="text-green-500" />
                        <p class="text-sm text-gray-600">Phone number: <span class="font-[500]">{{ userInfo.phoneNumber
                            || 'Not Available' }}</span></p>
                    </div>

                    <hr class="my-4" />
                    <div>
                        <h3 class="text-lg font-semibold mb-2">Verify your identity</h3>
                        <p class="text-sm text-gray-500 mb-4">
                            Before you book or host on Airbnb, you must complete this step.
                        </p>
                        <button class="px-4 py-2 lg:pb-[24px] text-white text-sm rounded-md">
                            Verify Now
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Section -->
            <div class="lg:flex-1">
                <div class="bg-white p-6 rounded-[22px] border">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="text-[20px] font-semibold">About {{ userInfo.fullName.split(" ")[0] }}</h3>
                        <button @click="handleSubmit"
                            class="text-sm font-medium border-[2px] text-gray-50 bg-gray-800 px-2 py-[4px] rounded-lg">
                            Done
                        </button>
                    </div>

                </div>

                <div v-if="isAvatarModalOpen"
                    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h2 class="text-xl font-bold mb-4">Select an Avatar</h2>
                        <div class="grid grid-cols-3 lg:grid-cols-4 gap-4">
                            <img v-for="index in 12" :key="index" :src="`/Avatars/${index}.jpg`"
                                :alt="'Avatar ' + index"
                                class="w-24 h-24 rounded-full border border-gray-300 shadow-md cursor-pointer hover:opacity-75"
                                @click="selectAvatar(index)" />
                        </div>
                        <button @click="closeAvatarModal"
                            class="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="lg:flex lg:space-x-8 lg:items-start max-w-5xl mx-auto">
            <!-- Left Section -->
            <div class="lg:w-1/3 mb-6 lg:mb-0">
                <div class="flex justify-between py-6 p-[35px] bg-white rounded-[28px] shadow-sm">
                    <div class="flex flex-col items-center justify-center">
                        <img :src="`/avatars/${selectedAvatar || userInfo.profilePicture}.jpg`" alt="Profile Avatar"
                            class="w-24 h-24 rounded-full border border-gray-300 shadow-md" />
                        <div class="sm:block hidden">
                            <h2 class="text-[25px] font-semibold">{{ userInfo.username }}</h2>
                        <p
                            class="bg-gray-500 text-gray-100 text-center py-[1px] mt-[8px] text-[13px] rounded-[35px] w-[70px]">
                            {{ userInfo.role }}
                        </p>
                        </div>
                    </div>
                    <div class="flex flex-col mr-[25px] items-center justify-center text-gray-500">
                        <div class="sm:hidden flex items-center">
                            <h2 class="text-[25px] font-semibold">{{ userInfo.username }}</h2>
                            <p
                                class="bg-gray-500 ml-[15px] text-gray-100 text-center pb-[1px] text-[12px] rounded-[35px] w-[65px]">
                                {{ userInfo.role }}
                            </p>
                        </div>
                        <p class="text-[15px] sm:text-[18px]">{{ formattedReviewDate }}</p>
                        <p class="text-rose-700 sm:text-[15px] text-[13px] font-[700]">On Airbnb</p>
                    </div>
                </div>

                <div class="mt-8 p-6 border bg-white rounded-[24px]">
                    <h3 class="text-[17px] font-semibold mb-4">
                        {{ userInfo.username }}'s confirmed information status
                    </h3>
                    <div v-if="userInfo.phoneNumber" class="flex items-center space-x-2 mb-2">
                        <Icon name="fa:check-circle" class="text-green-500" />
                        <p class="text-sm text-gray-600">
                            Phone number:
                            <span class="font-[500]">{{ userInfo.phoneNumber }}</span>
                        </p>
                    </div>
                    <div v-else class="flex items-center space-x-2 mb-2">
                        <Icon name="fa:check-circle" class="text-green-500" />
                        <p class="text-sm text-gray-600">Phone number</p>
                    </div>

                    <hr class="my-4" />
                    <div>
                        <h3 class="text-lg font-semibold mb-2">Verify your identity</h3>
                        <p class="text-sm text-gray-500 mb-4">
                            Before you book or host on Airbnb, you must complete this step.
                        </p>
                        <button class="px-4 py-2 lg:pb-[24px] text-white text-sm rounded-md">Verify</button>
                    </div>
                </div>
            </div>

            <!-- Right Section -->
            <div class="lg:flex-1">
                <div class="bg-white p-6 rounded-[22px] border">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-[22px] sm:text-[24px] font-[600]"><span
                                class="text-gray-500 text-[16px] sm:text-[18px]">About</span> {{
                                    userInfo.fullName.split(" ")[0] }}</h3>
                        <button @click="toggleEditing"
                            class="text-[13px] font-medium border-[2px] border-gray-700 text-gray-800 px-2 pb-[2px] rounded-lg">Edit
                            profile</button>
                    </div>

                    <div class="h-[3px] bg-gray-200 w-full mb-[15px]"></div>

                    <p><span class="font-[700] mr-[4px]">Fullname:</span> {{ userInfo.fullName }}</p>
                    <p><span class="font-[700] mr-[4px]">Email:</span> {{ userInfo.email }}</p>
                    <p><span class="font-[700] mr-[4px]">About:</span> {{ userInfo.about }}</p>
                    <p><span class="font-[700] mr-[4px]">Occupation:</span> {{ userInfo.occupation }}</p>
                    <p>
                        <span class="font-[700] mr-[4px]">Location:</span>
                        {{ userInfo.location.city }}, {{ userInfo.location.country }}
                    </p>
                </div>

                <div class="mt-8 bg-white p-6 rounded-[22px] border">
                    <h3 class="text-[17px] font-semibold underline underline-offset-2 mb-[4px]">Ask Me In:</h3>
                    <div class="list-disc list-inside space-y-2">
                        <p v-for="(language, index) in userInfo.languages" :key="index"
                            class="inline-block px-[15px] text-[13px] sm:text-sm mr-[4px] bg-gray-600 text-white rounded-[25px]">
                            {{ language }}
                        </p>
                        <p v-if="!userInfo.languages || userInfo.languages.length === 0" class="text-gray-500">No
                            languages available.</p>
                    </div>

                    <h3 class="text-[17px] mt-[25px] mb-[8px] underline underline-offset-2 font-semibold">Interests</h3>
                    <div class="list-disc list-inside space-y-2">
                        <p v-for="(interest, index) in userInfo.interests" :key="index"
                            class="inline-block px-[15px] text-[13px] sm:text-sm  mr-[4px] bg-gray-200 text-gray-600 rounded-[25px]">
                            {{ interest }}
                        </p>
                        <p v-if="!userInfo.interests || userInfo.interests.length === 0" class="text-gray-500">No
                            interests added.</p>
                    </div>
                    <div class="flex mt-[15px] items-center">
                        <p class="text-rose-900 font-[500] mr-[15px]">Found Me at:</p>
                        <ul v-if="userInfo.socialLinks" class="list-none mt-3 ml-[35px] flex gap-[8px]">
                            <li v-if="userInfo.socialLinks.facebook"
                                class="w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden pt-[3px] bg-blue-700">
                                <NuxtLink :to="userInfo.socialLinks.facebook" target="_blank" rel="noopener noreferrer">
                                    <Icon name="fa:facebook" class="text-[16px]" />
                                </NuxtLink>
                            </li>
                            <li v-if="userInfo.socialLinks.instagram"
                                class="w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden pt-[3px] bg-pink-700">
                                <a :href="userInfo.socialLinks.instagram" target="_blank" rel="noopener noreferrer">
                                    <Icon name="fa:instagram" class="text-[16px]" />
                                </a>
                            </li>
                            <li v-if="userInfo.socialLinks.linkedin"
                                class="w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden pt-[3px] bg-blue-700">
                                <a :href="userInfo.socialLinks.linkedin" target="_blank" rel="noopener noreferrer">
                                    <Icon name="fa6-brands:linkedin-in" class="text-[16px]" />
                                </a>
                            </li>
                        </ul>
                        <p v-else>No Social Links Attached</p>
                    </div>

                </div>
            </div>
        </div>

    </main>

</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            userInfo: null,
            updatedData: {},
            isEditing: false,
            loading: true,
            error: null,

            // Avatar code
            isAvatarModalOpen: false,
            selectedAvatar: null,

            formFields: [
                { name: 'firstName', label: 'First Name', placeholder: 'Enter your first name' },
                { name: 'lastName', label: 'Last Name', placeholder: 'Enter your last name' },
                { name: 'email', label: 'Email', placeholder: 'Enter your email' },
                // Add more form fields as needed
            ],
        };
    },
    computed: {
        formattedReviewDate() {
            if (!this.userInfo || !this.userInfo.createdAt) return "N/A";

            const reviewDate = new Date(this.userInfo.createdAt);
            const now = new Date();
            const timeDiff = now - reviewDate;

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);

            if (years >= 1) {
                return `${years} year${years > 1 ? "s" : ""} ago`;
            } else if (months >= 1) {
                return `${months} month${months > 1 ? "s" : ""} ago`;
            } else {
                return `${days} day${days > 1 ? "s" : ""} ago`;
            }
        },
    },
    methods: {
        async fetchUserProfile() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/user-info`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.userInfo = response.data;
                this.loading = false;
            } catch (err) {
                this.error = 'Error fetching profile data';
                this.loading = false;
            }
        },


        handleChange(e) {
            const { name, value } = e.target;
            if (name === 'city' || name === 'country') {
                this.updatedData = {
                    ...this.updatedData,
                    location: {
                        ...this.userInfo.location,
                        ...this.updatedData.location,
                        [name]: value,
                    },
                };
            } else {
                this.updatedData = {
                    ...this.updatedData,
                    [name]: value,
                };
            }
        },

        handleArrayDelete(attribute, value) {
            this.updatedData = {
                ...this.updatedData,
                [attribute]: (this.updatedData[attribute] || this.userInfo[attribute] || []).filter(item => item !== value),
            };
        },

        openAvatarModal() {
            this.isAvatarModalOpen = true;
        },

        closeAvatarModal() {
            this.isAvatarModalOpen = false;
        },

        selectAvatar(index) {
            this.selectedAvatar = index;
            this.closeAvatarModal();
        },

        async handleSubmit(e) {
            e.preventDefault();
            try {
                const token = localStorage.getItem('token');
                const updatedProfile = {
                    ...this.updatedData,
                    profilePicture: this.selectedAvatar || this.userInfo.profilePicture, // Include avatar in profile update
                };
                const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/update-info`, updatedProfile, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.userInfo = response.data;
                this.isEditing = false;
            } catch (err) {
                this.error = 'Error updating profile data';
            }
        },

        addNewField(attribute) {
            this.updatedData = {
                ...this.updatedData,
                [attribute]: [...(this.updatedData[attribute] || this.userInfo[attribute] || []), ''],
            };
        },

        updateFieldValue(attribute, index, value) {
            const updatedArray = [...(this.updatedData[attribute] || this.userInfo[attribute] || [])];
            updatedArray[index] = value;
            this.updatedData = {
                ...this.updatedData,
                [attribute]: updatedArray,
            };
        },
    },

    mounted() {
        this.fetchUserProfile();
        window.scrollTo(0, 0);
    },
};
</script>
