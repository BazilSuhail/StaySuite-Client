<template>
  <header class="bg-white fixed w-full z-50 top-0">
    <FiltersModal v-if="showFilterModal" @close="toggleFilterModal" />
    <nav class="hidden md:block">
      <div
        :class="`${isHomePath ? 'border-white pt-4' : 'border-b-[3px] border-gray-100 py-4'} mx-auto px-4 sm:px-6 md:px-[15px] lg:px-[35px] xl:px-[75px]`">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img src="/logo.svg" alt="" class="w-[32px] mr-[5px] h-[27px] mt-[2px]" />
            <NuxtLink to="/" class="text-[24px] font-[780] text-red-500">
              airbnb
            </NuxtLink>
          </div>

          <div v-if="!isHomePath" @click="toggleFilterModal"
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
            <NuxtLink to="/" class="block py-2 text-gray-500 font-[600] hover:text-gray-800">
              Stays
            </NuxtLink>
            <NuxtLink to="/authentication/signIn"
              class="pl-[12px] block py-2 text-gray-500 font-[600] hover:text-gray-800">
              Experiences
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-4">
            <span class="text-gray-700 xl:block hidden text-md">Airbnb Your Home</span>
            <NuxtLink v-if="user" :to="userRole === 'Guest' ? '/notifications/guest' : '/notifications/host'"
              class="hidden md:inline-flex items-center space-x-2 hover:text-black">
              <Icon name="ic:baseline-notifications"
                :class="`text-[28px] bg-gray-500 ${userNotifications === 0 ? '' : ' mr-[-20px]'}`" />
              <div v-if="userNotifications !== 0"
                class="text-[12px] font-[600] rounded-full w-[20px] h-[20px] text-white text-center bg-rose-600 mt-[-20px]">
                {{ userNotifications }}
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
                <button @click="handleLogout"
                  class="px-[12px] text-start text-white pb-[2px] bg-rose-500 my-[8px] hover:bg-rose-200 hover:text-rose-700 rounded-lg">
                  Logout
                </button>
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

              <div class="w-full bg-gray-200 h-[2px] my-2"></div>

              <div v-if="user">
                <div v-if="userRole === 'Host'">
                  <NuxtLink to="/host/host-listings" class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Host Listing
                  </NuxtLink>
                  <NuxtLink to="/host-bookings" class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Host Bookings
                  </NuxtLink>
                  <NuxtLink to="/add-listing" class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Add Listing
                  </NuxtLink>
                </div>
                <div v-else>
                  <NuxtLink to="/guest/favourtiteListing"
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
        <div @click="showFilterModal = true"
          class="border-[2px] w-[85%] border-gray-300 rounded-[25px] flex items-center py-[5px] px-3">
          <Icon name="fa:search" class="text-gray-700 mr-5" size="25" />
          <div class="flex-1 text-[14px] text-gray-500">
            <div class="font-medium">Where to?</div>
            <div class="text-[12px] text-gray-400">Anywhere · Any week · Add guests</div>
          </div>
        </div>
        <div class="w-[15%] flex justify-center">
          <p class="border-[2px] p-2 border-gray-500 rounded-full bg-gray-100">
            <Icon name="fa:wrench" @click="toggleMenu" class="text-gray-500" size="20" />
          </p>
        </div>
      </div>

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
              <NuxtLink to="/guest//reserved-bookings" @click="toggleMenu"
                class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Reserved Bookings
              </NuxtLink>
            </div>
          </div>

          <NuxtLink to="/privacy-policy" @click="toggleMenu"
            class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/accessibility" @click="toggleMenu"
            class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            Accessibility
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

      <div
        :class="`fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-between py-2 transition-transform duration-300 ${getNavbarTranslateClasses} ${getNavbarClasses} ${user ? 'px-[40px]' : 'px-[110px]'}`">
        <NuxtLink to="/" :class="`flex flex-col items-center ${isActive('/') ? 'text-rose-600' : 'text-gray-400'}`">
          <Icon name="fa:home" class="mb-[6px]" size="22" />
          <span class="text-xs">Home</span>
        </NuxtLink>

        <div v-if="user">
          <div v-if="userRole === 'Host'">
            <NuxtLink to="/host/host-bookings"
              :class="`flex flex-col items-center ${isActive('/host-bookings') ? 'text-rose-600' : 'text-gray-400'}`">
              <Icon name="io:bookmarks-outline" class="mb-[6px]" size="22" />
              <span class="text-xs">Bookly</span>
            </NuxtLink>
            <NuxtLink to="/host/host-listing"
              :class="`flex flex-col items-center ${isActive('/host-listing') ? 'text-rose-600' : 'text-gray-400'}`">
              <Icon name="md:assessment" class="scale-[1.2] mb-[6px]" size="22" />
              <span class="text-xs">Dashboard</span>
            </NuxtLink>
          </div>
          <div v-else>
            <NuxtLink to="/guest/favouriteListing"
              :class="`flex flex-col items-center ${isActive('/favourite-listings') ? 'text-rose-600' : 'text-gray-400'}`">
              <Icon name="fa:heart" class="mb-[6px]" size="22" />
              <span class="text-xs">Favourites</span>
            </NuxtLink>
            <NuxtLink to="/guest/reserved-bookings"
              :class="`flex flex-col items-center ${isActive('/reserved-bookings') ? 'text-rose-600' : 'text-gray-400'}`">
              <Icon name="fa:bed" class="scale-[1.2] mb-[7px]" size="21" />
              <span class="text-xs">MyBookings</span>
            </NuxtLink>
          </div>
        </div>

        <div v-if="user">
          <NuxtLink :to="userRole === 'Guest' ? '/notifications/guest' : '/notifications/host'"
            :class="`relative flex flex-col items-center ${isActive('/notifications') ? 'text-rose-600' : 'text-gray-400'}`">
            <Icon name="fa:bell" class="mb-[6px] text-[25px]" />

            <div v-if="userNotifications !== 0"
              class="absolute text-[12px] font-[600] rounded-full w-[22px] h-[22px] ml-[20px] text-white text-center bg-rose-800 border-[2px] border-white mt-[-10px]">
              {{ userNotifications }}
            </div>

            <span class="text-xs">Alerts</span>
          </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink to="/authentication/signUp"
            :class="`flex flex-col items-center ${isActive('/signUp') ? 'text-rose-600' : 'text-gray-400'}`">
            <Icon name="fa:bell" class="mb-[6px] text-[25px]" />
            <span class="text-xs">Alerts</span>
          </NuxtLink>
        </div>

        <div>
          <NuxtLink :to="user ? '/authentication/profile' : '/authentication/signIn'"
            :class="`flex flex-col items-center ${isActive(user ? '/profile' : '/signIn') ? 'text-rose-600' : 'text-gray-400'}`">
            <Icon :name="user ? 'fa:user' : 'fa:sign-in'" class="mb-[6px] text-[20px]" />
            <span class="text-xs">{{ user ? 'Profile' : 'JoinUs' }}</span>
          </NuxtLink>
        </div>

      </div>
    </nav>
  </header>
</template>

<script>
import FiltersModal from "./FilterModal.vue";
import { useAuthStore } from "../store/auth.js"
export default {
  setup() {
    const userStore = useAuthStore();
    return {
      user: userStore.user,
      userRole: userStore.userRole,
      userNotifications: userStore.userNotifications
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
      showFilterModal: false,
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
      this.$store.dispatch('auth/logout'); // Vuex logout action
      this.toggleMenu();
      this.$router.push('/signin');
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
      this.showFilterModal = false;
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
