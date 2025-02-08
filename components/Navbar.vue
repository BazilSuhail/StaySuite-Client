<template>
  <header class="bg-white fixed w-full z-50 top-0">
    
    <FiltersModal v-if="isFiltersModalOpen" v-model:onClose="isFiltersModalOpen" />

    <nav class="hidden md:block">
      <div
        :class="`${isHomePath ? 'border-white pt-4' : 'border-b-[3px] border-gray-100 py-4'} mx-auto px-4 sm:px-6 md:px-[15px] lg:px-[35px] xl:px-[75px]`">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img src="/logo.svg" alt="" class="w-[32px] mr-[5px] h-[27px] mt-[2px]" />
            <NuxtLink to="/" class="text-[24px] font-[780] text-red-500">
              StaySuite
            </NuxtLink>
          </div>

          <div v-if="!isHomePath" @click="isFiltersModalOpen = true"
            class="hidden cursor-pointer sm:flex items-center border-[2px] xl:mr-[-165px] z-90 rounded-full py-2 px-4 shadow-md">
            <p
              class="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-gray-700">
              Anywhere
            </p>
            <p
              class="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-[15px] text-gray-700">
              Any week
            </p>
            <p class="bg-transparent flex-grow outline-none px-[8px] font-[600] text-[15px] text-gray-500">
              Any Guests
            </p>
            <Icon name="ic:baseline-search" class="bg-red-500 text-white rounded-full p-[5.5px] ml-[6px] text-[28px]" />
          </div>
          <div v-else class="cursor-pointer flex items-center xl:mr-[-165px]">
            <div @click="isFiltersModalOpen = true" class="block py-2 text-gray-500 font-[600] hover:text-gray-800">
              Stays
            </div>
            <NuxtLink to="/authentication/signIn"
              class="pl-[12px] block py-2 text-gray-500 font-[600] hover:text-gray-800">
              Experiences
            </NuxtLink>
          </div>

          <client-only>
            <div class="flex items-center space-x-4">
              <span class="text-gray-700 xl:block hidden text-md">Airbnb Your Home</span>
              <NuxtLink v-if="user" :to="userRole === 'Guest' ? '/notifications/guest' : '/notifications/host'"
                class="hidden md:inline-flex items-center space-x-2 hover:text-black">
                <Icon name="ic:baseline-notifications"
                  :class="`text-[28px] bg-gray-500 ${notificationsCount === 0 ? '' : ' mr-[-20px]'}`" />
                <div v-if="notificationsCount > 0"
                  class="absolute text-[12px] font-[600] rounded-full w-[22px] h-[22px] ml-[20px] text-white text-center bg-rose-800 border-[2px] border-white mt-[-10px]">
                  {{ notificationsCount }}
                </div>
              </NuxtLink>
              <div @click="toggleMenu"
                class="flex items-center space-x-2 border rounded-full px-3 py-2 hover:shadow-lg transition-shadow">
                <Icon name="material-symbols:menu" class="text-[24px] text-gray-500 sm:block hidden" />
                <div
                  class="w-[28px] h-[28px] bg-gray-400 border-[2px] border-gray-400 flex items-end justify-center rounded-full">
                  <Icon name="fa:user" class="text-[22px] mb-[-3px] bg-white" />
                </div>
              </div>
            </div>
          </client-only>
        </div>

        <div v-if="isOpen" class="hidden md:block">
          <div @click="toggleMenu"
            class="flex flex-col absolute right-0 mr-[75px] w-[250px] bg-white rounded-lg border shadow-xl mt-5 p-4">
            <div>
              <div v-if="user">
                <NuxtLink to="/authentication/profile"
                  class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Profile
                </NuxtLink>
                <button @click="handleLogout()"
                  class="px-[12px] text-start text-white pb-[2px] bg-rose-500 my-[8px] hover:bg-rose-200 hover:text-rose-700 rounded-lg">
                  Logout
                </button>

                <div class="w-full bg-gray-200 h-[2px] my-2"></div>
              </div>
              <div v-else>
                <NuxtLink to="/authentication/signUp"
                  class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Sign up
                </NuxtLink>
                <NuxtLink to="/authentication/signIn"
                  class="pl-[12px] block py-2 text-rose-600 font-[600] hover:bg-gray-100 rounded-lg">
                  Log in
                </NuxtLink>
              </div>


              <div v-if="user">
                <div v-if="userRole === 'Host'">
                  <NuxtLink to="/host/host-listings"
                    class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Host Listing
                  </NuxtLink>
                  <NuxtLink to="/host/host-bookings"
                    class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Host Bookings
                  </NuxtLink>
                  <NuxtLink to="/host/add-listing"
                    class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Add Listing
                  </NuxtLink>
                </div>
                <div v-else>
                  <NuxtLink to="/guest/favouriteListing"
                    class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Favourites
                  </NuxtLink>
                  <NuxtLink to="/guest/reserved-bookings"
                    class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Reserved Bookings
                  </NuxtLink>
                  <NuxtLink to="/guest/reservations-history"
                    class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Past Experiences
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <nav class="md:hidden block">
      <div class="flex z-[999] items-center py-[10px] px-[18px] w-screen">
        <div @click="isFiltersModalOpen = true"
          class="border-[2px] w-[85%] border-gray-300 rounded-[25px] flex items-center py-[5px] px-3">
          <Icon name="fa:search" class="text-gray-700 mr-5" size="25" />
          <div class="flex-1 text-[14px] text-gray-500">
            <div class="font-medium">Where to?</div>
            <div class="text-[12px] text-gray-400">Anywhere · Any week · Add guests</div>
          </div>
        </div>
        <div class="w-[15%] flex pl-[15px] justify-center">
          <div class="border-[2px] p-1 w-[45px] h-[45px] border-gray-300 rounded-full bg-gray-100">
            <Icon name="material-symbols:list" @click="toggleMenu" class="text-gray-500 mt-[1px]" size="32" />
          </div>
        </div>
      </div>

      <client-only>
        <div v-if="isOpen" class="sm:hidden">
          <div class="flex flex-col z-10 bg-white rounded-lg shadow-md mt-2 p-4">
            <div v-if="user">
              <div v-if="userRole === 'Host'">
                <NuxtLink to="/host/host-bookings" @click="toggleMenu"
                  class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Host Bookings
                </NuxtLink>
                <NuxtLink to="/host/add-listing" @click="toggleMenu"
                  class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Add Listing
                </NuxtLink>
              </div>
              <div v-else>
                <NuxtLink to="/guest/reservations-history" @click="toggleMenu"
                  class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Bookings History
                </NuxtLink>
                <NuxtLink to="/guest/reserved-bookings" @click="toggleMenu"
                  class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Reserved Bookings
                </NuxtLink>
              </div>
            </div>

            <NuxtLink to="/footer/privacy-policy" @click="toggleMenu"
              class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Privacy Policy
            </NuxtLink>

            <div class="w-full bg-gray-200 h-[2px] my-2"></div>

            <div v-if="user">
              <NuxtLink to="/authentication/profile" @click="toggleMenu"
                class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Profile
              </NuxtLink>
              <button @click="handleLogout"
                class="pl-[12px] text-start block py-2 text-rose-600 hover:bg-rose-400 font-[600] rounded-lg">
                Logout
              </button>
            </div>
            <div v-else>
              <NuxtLink to="/authentication/signUp" @click="toggleMenu"
                class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Sign up
              </NuxtLink>
              <NuxtLink to="/authentication/signIn" @click="toggleMenu"
                class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Log in
              </NuxtLink>
            </div>
          </div>
        </div>
      </client-only>

      <div
        :class="`fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-between py-2 transition-transform duration-300 px-[40px] ${getNavbarTranslateClasses} ${getNavbarClasses} '}`">
        <NuxtLink to="/" :class="`flex flex-col items-center ${isActive('/') ? 'text-rose-600' : 'text-gray-400'}`">
          <Icon name="fa6-solid:house-chimney" class="mb-[6px] text-[24px]" />
          <span class="text-xs">Home</span>
        </NuxtLink>

        <client-only>
          <div v-if="user">
            <div v-if="userRole === 'Host'" class="flex items-center">
              <NuxtLink to="/host/host-bookings"
                :class="`flex flex-col items-center ${isActive('/host/host-bookings') ? 'text-rose-600' : 'text-gray-400'}`">
                <Icon name="fa6-solid:clipboard-question" class="mb-[6px] text-[24px]" />
                <span class="text-xs">Bookly</span>
              </NuxtLink>
            </div>

            <div v-else>
              <NuxtLink to="/guest/favouriteListing"
                :class="`flex flex-col items-center ${isActive('/guest/favouriteListing') ? 'text-rose-600' : 'text-gray-400'}`">
                <Icon name="fa6-solid:heart" class="mb-[6px] text-[24px]" />
                <span class="text-xs">Favourites</span>
              </NuxtLink>
            </div>
          </div>

          <div v-if="user">
            <div v-if="userRole === 'Host'">
              <NuxtLink to="/host/host-listings"
                :class="`flex flex-col items-center ${isActive('/host/host-listings') ? 'text-rose-600' : 'text-gray-400'}`">
                <Icon name="fa6-solid:chalkboard-user" class="mb-[7px] text-[24px]" />
                <span class="text-xs">Dashboard</span>
              </NuxtLink>
            </div>

            <div v-else>
              <NuxtLink to="/guest/reserved-bookings"
                :class="`flex flex-col items-center ${isActive('/guest/reserved-bookings') ? 'text-rose-600' : 'text-gray-400'}`">
                <Icon name="fa6-solid:bed" class="mb-[7px] text-[24px]" />
                <span class="text-xs">MyBookings</span>
              </NuxtLink>
            </div>
          </div>

          <div v-if="user">
            <NuxtLink :to="userRole === 'Guest' ? '/notifications/guest' : '/notifications/host'" :class="`relative flex flex-col items-center ${isActive('/notifications/host') || isActive('/notifications/guest') ? 'text-rose-600' : 'text-gray-400'
              }`">
              <Icon name="fa6-solid:bell" class="mb-[5px] text-[26px]" />

              <div v-if="notificationsCount && notificationsCount.length > 0"
                class="absolute text-[12px] font-[600] rounded-full w-[22px] h-[22px] ml-[20px] text-white text-center bg-rose-800 border-[2px] border-white mt-[-10px]">
                {{ notificationsCount.length }}
              </div>

              <span class="text-xs">Alerts</span>
            </NuxtLink>
          </div>
          <div v-else>
            <NuxtLink to="/authentication/signUp" :class="`flex flex-col items-center ${isActive('/signUp') ? 'text-rose-600' : 'text-gray-400'
              }`">
              <Icon name="fa6-solid:bell" class="mb-[5px] text-[26px]" />
              <span class="text-xs">Alerts</span>
            </NuxtLink>
          </div>

          <div>
            <NuxtLink :to="user ? '/authentication/profile' : '/authentication/signIn'"
              :class="`flex flex-col items-center ${isActive(user ? '/authentication/profile' : '/authentication/signIn') ? 'text-rose-600' : 'text-gray-400'}`">
              <Icon :name="user ? 'fa6-solid:user-large' : 'fa6-solid:user-large'" class="mb-[6px] text-[24px]" />
              <span class="text-xs">{{ user ? 'Profile' : 'JoinUs' }}</span>
            </NuxtLink>
          </div>
        </client-only>

      </div>
    </nav>
  </header>
</template>

<script>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth.js"
import FiltersModal from '@/components/FilterModal.vue';
import { useRouter } from "vue-router";
 

export default {
  components: {
    FiltersModal
  },
  setup() {
    const isFiltersModalOpen = ref(false);
    const userStore = useAuthStore();
    const userStored = storeToRefs(userStore);
    const router = useRouter();
    //console.log("count is " + userStore.notificationsCount)
    return {
      router,
      isFiltersModalOpen,
      user: userStored.user,
      userRole: userStored.userRole,
      notificationsCount: userStore.notificationsCount,
      logout: userStore.logout,
    };
  },
  computed: {
    isHomePath() {
      return this.$route.path === '/';
    },
    getNavbarClasses() {
      if (import.meta.client) {
        return this.scrollPosition > window.innerHeight ? 'bg-[#000000c5]' : 'bg-navbar-color';
      }
      return 'bg-navbar-color';
    },
    getNavbarTranslateClasses() {
      if (import.meta.client) {
        return !this.isScrollingUp && this.scrollPosition > 50 ? 'translate-y-[70px]' : 'translate-y-0';
      }
      return 'translate-y-0';
    },
  },
  data() {
    return {
      isOpen: false,
      showSearchBar: false,
      homePath: true,
      scrollPosition: 0,
      isScrollingUp: true,
      prevScrollPosition: 0,
      //showFilterModal: false,
    };
  },
  watch: {
    $route(newRoute) {
      this.homePath = newRoute.path === '/';
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    isActive(route) {
      return this.$route.path === route;
    },
    handleLogout() {
      //localStorage.removeItem('token');
      this.logout();
      //toggleMenu();
      this.isOpen = false;
      this.router.push('/authentication/signIn');
    },
    handleScroll() {
      if (window.scrollY > 50) {
        this.showSearchBar = true;
      } else {
        this.showSearchBar = false;
      }
    },
    handleScrollDirection() {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > this.prevScrollPosition) {
        this.isScrollingUp = false;
      } else {
        this.isScrollingUp = true;
      }
      this.prevScrollPosition = currentScrollPos;
      this.scrollPosition = currentScrollPos;
    },
    closeFilterModal() {
      this.isFiltersModalOpen = false;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('scroll', this.handleScrollDirection);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('scroll', this.handleScrollDirection);
  },
};
</script>
