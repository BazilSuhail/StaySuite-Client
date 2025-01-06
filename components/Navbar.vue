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
            <NuxtLink v-if="user" :to="userRole === 'Guest' ? '/guest_notifications' : '/host_notifications'"
              class="hidden md:inline-flex items-center space-x-2 hover:text-black">
              <Icon name="ic:baseline-notifications"
                :class="`text-xl ${notificationsCount === 0 ? 'text-gray-500' : ' mr-[-20px]'}`" />
              <div v-if="notificationsCount !== 0"
                class="text-[12px] font-[600] rounded-full w-[20px] h-[20px] text-white text-center bg-rose-600 mt-[-20px]">
                {{ notificationsCount }}
              </div>
            </NuxtLink>
            <div @click="toggleMenu"
              class="flex items-center space-x-2 border rounded-full px-3 py-2 hover:shadow-lg transition-shadow">
              <Icon name="material-symbols:menu" class="text-[24px] text-gray-500 sm:block hidden" />
            <div class="w-[28px] h-[28px] bg-gray-400 border-[2px] border-gray-400 flex items-end justify-center rounded-full">
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
                <NuxtLink to="/authentication/profile" class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Profile
                </NuxtLink>
                <button @click="handleLogout"
                  class="px-[12px] text-start text-white pb-[2px] bg-rose-500 my-[8px] hover:bg-rose-200 hover:text-rose-700 rounded-lg">
                  Logout
                </button>
              </div>
              <div v-else>
                <NuxtLink to="/authentication/signUp" class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
                  <NuxtLink to="/host-listing" class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
                  <NuxtLink to="/guest/favoutiteListing"
                    class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Favourites
                  </NuxtLink>
                  <NuxtLink to="/guest/reserved-bookings"
                    class="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Reserved Bookings
                  </NuxtLink>
                  <NuxtLink to="/reserved-bookings-history"
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
  </header>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import FiltersModal from './FilterModal.vue';

export default {
  name: 'Navbar',
  components: {
    FiltersModal
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();

    const user = ref(authStore.user);
    //console.log(user)
    const userRole = ref(authStore.userRole);
    //console.log(userRole)

    const notificationsCount = ref(authStore.notificationsCount);
    const isOpen = ref(false);
    const isHomePath = computed(() => route.path === '/');
    const showFilterModal = ref(false);

    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    const toggleFilterModal = () => {
      showFilterModal.value = !showFilterModal.value;
    };

    const closeFilterModal = () => {
      showFilterModal.value = false;
    };

    const logoutUser = () => {
      authStore.logout();
      router.push('/authentication/signin');
    };

    return {
      user,
      userRole,
      notificationsCount,
      isOpen,
      isHomePath,
      showFilterModal,
      toggleMenu,
      toggleFilterModal,
      closeFilterModal,
      logoutUser,
    };
  },
};
</script>
