<template>
    <header class="bg-white fixed w-full z-50 top-0">
      <FiltersModal v-if="showFilterModal" @close="closeFilterModal" />
      <nav class="hidden md:block">
        <div
          :class="`${isHomePath ? 'border-white pt-4' : 'border-b-[3px] border-gray-100 py-4'} mx-auto px-4 sm:px-6 md:px-[15px] lg:px-[35px] xl:px-[75px]`"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img src="@/assets/logo.svg" alt="" class="w-[32px] mr-[5px] h-[27px] mt-[2px]" />
              <NuxtLink to="/" class="text-[24px] font-[780] text-red-500">
                airbnb
              </NuxtLink>
            </div>
  
            <div
              v-if="!isHomePath"
              @click="openFilterModal"
              class="hidden cursor-pointer sm:flex items-center border-[2px] xl:mr-[-165px] z-90 rounded-full py-2 px-4 shadow-md"
            >
              <p class="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-gray-700">
                Anywhere
              </p>
              <p class="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-[15px] text-gray-700">
                Any week
              </p>
              <p class="bg-transparent flex-grow outline-none px-[8px] font-[600] text-[15px] text-gray-500">
                Any Guests
              </p>
              <AiOutlineSearch class="bg-red-500 text-white rounded-full p-[5.5px] ml-[6px] text-[28px]" />
            </div>
  
            <v-motion
              v-else
              :initial="{ opacity: 1, y: 0 }"
              :enter="{ opacity: 1, y: 0 }"
              :leave="{ opacity: 0, y: -120 }"
              class="hidden cursor-pointer sm:flex xl:mr-[-165px] bg-white z-90 space-x-6"
            >
              <div @click="openFilterModal" class="text-gray-600 hover:text-black font-medium">
                Explore
              </div>
              <NuxtLink
                v-if="user && userRole === 'Guest'"
                to="/reserved-bookings-history"
                class="text-gray-600 hover:text-black font-medium"
              >
                Experiences
              </NuxtLink>
              <div
                v-else
                @click="openFilterModal"
                class="text-gray-600 hover:text-black font-medium"
              >
                Experiences
              </div>
            </v-motion>
  
            <div class="flex items-center space-x-4">
              <span class="text-gray-700 xl:block hidden text-md">Airbnb Your Home</span>
              <NuxtLink
                v-if="user"
                :to="userRole === 'Guest' ? '/guest_notifications' : '/host_notifications'"
                class="hidden md:inline-flex items-center space-x-2 hover:text-black"
              >
                <FaBell :class="`text-xl ${notificationsCount === 0 ? 'text-gray-500' : ' mr-[-20px]'}`" />
                <div
                  v-if="notificationsCount !== 0"
                  class="text-[12px] font-[600] rounded-full w-[20px] h-[20px] text-white text-center bg-rose-600 mt-[-20px]"
                >
                  {{ notificationsCount }}
                </div>
              </NuxtLink>
              <div
                @click="toggleMenu"
                class="flex items-center space-x-2 border rounded-full px-3 py-2 hover:shadow-lg transition-shadow"
              >
                <GiHamburgerMenu class="text-xl text-gray-500 sm:block hidden" />
                <div class="sm:hidden">
                  <button>
                    <component :is="isOpen ? FaTimes : FaBars" class="text-xl" />
                  </button>
                </div>
                <FaUserCircle class="text-3xl text-gray-500" />
              </div>
            </div>
          </div>
  
          <div v-if="isOpen" class="hidden md:block">
            <v-motion
              @click="toggleMenu"
              :initial="{ opacity: 0, x: 500 }"
              :enter="{ opacity: 1, x: 0 }"
              transition="{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }"
              class="flex flex-col absolute right-0 mr-[75px] w-[250px] bg-white rounded-lg border shadow-xl mt-5 p-4"
            >
              <div v-if="user">
                <NuxtLink to="/profile" class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Profile
                </NuxtLink>
                <button
                  @click="logoutUser"
                  class="pl-[12px] text-start text-white py-[3px] bg-rose-500 my-[8px] hover:bg-rose-200 hover:text-rose-700 rounded-lg"
                >
                  Logout
                </button>
              </div>
              <div v-else>
                <NuxtLink to="/signUp" class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Sign up
                </NuxtLink>
                <NuxtLink to="/signIn" class="pl-[12px] block py-2 text-rose-600 font-[600] hover:bg-gray-100 rounded-lg">
                  Log in
                </NuxtLink>
              </div>
            </v-motion>
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth';
  import FiltersModal from '@/components/Home/FilterModal.vue';
  import { AiOutlineSearch, FaBell, FaTimes, FaBars, FaUserCircle, GiHamburgerMenu } from 'vue-icons';
  
  export default {
    name: 'Navbar',
    components: {
      FiltersModal,
      AiOutlineSearch,
      FaBell,
      FaTimes,
      FaBars,
      FaUserCircle,
      GiHamburgerMenu,
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const authStore = useAuthStore();
  
      const user = ref(authStore.user);
      const userRole = ref(authStore.role);
      const notificationsCount = ref(0);
      const isOpen = ref(false);
      const isHomePath = computed(() => route.path === '/');
      const showFilterModal = ref(false);
  
      const toggleMenu = () => {
        isOpen.value = !isOpen.value;
      };
  
      const openFilterModal = () => {
        showFilterModal.value = true;
      };
  
      const closeFilterModal = () => {
        showFilterModal.value = false;
      };
  
      const logoutUser = () => {
        authStore.logout();
        router.push('/signin');
      };
  
      return {
        user,
        userRole,
        notificationsCount,
        isOpen,
        isHomePath,
        showFilterModal,
        toggleMenu,
        openFilterModal,
        closeFilterModal,
        logoutUser,
      };
    },
  };
  </script>
  