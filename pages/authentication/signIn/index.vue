<template>
    <main class="h-screen w-full pt-[75px] flex justify-center items-center bg-gray-100">
      <div class="flex flex-col w-[90%] md:w-[500px] md:scale-[1] scale-[0.9]">
        <div class="scale-[1.2] flex mx-auto">
          <img
            src="/logo.svg"
            alt="Connection Failed"
            class="w-[34px] h-[31px] mt-[4px]"
          />
          <div class="text-rose-600 ml-[4px] md:text-[25px] text-[25px] font-[700]">
            Air<span class="text-red-400">BnB</span>
          </div>
        </div>
        <p class="text-[15px] mb-[15px] text-center mt-[8px] text-gray-500 font-[400]">
          Stay, Host, Explore !! Your Next Adventure Starts Here.
        </p>
  
        <div class="py-[35px] px-[25px] flex flex-col bg-white rounded-xl">
          <form @submit.prevent="handleSubmit" class="lg:px-[15px]">
            <div class="relative mt-4 mb-6 flex items-center">
              <div class="bg-rose-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                <Icon name="bi:envelope" class="text-gray-50 text-[22px]" />
              </div>
              <div class="flex-1">
                <label
                  for="email"
                  :class="[
        'absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300',
        focusField === 'email' || formData.email ? '-top-5 text-sm' : 'top-2'
      ]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="formData.email"
                  @focus="handleFocus('email')"
                  @blur="handleBlur"
                  class="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-rose-800 focus:outline-none"
                  required
                />
              </div>
            </div>
  
            <div class="relative mt-4 mb-6 flex items-center">
              <div class="bg-rose-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                <Icon name="bi:lock" class="text-gray-50 text-[22px]" />
              </div>
              <div class="flex-1">
                <label
                  for="password"
                  :class="[
        'absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300',
        focusField === 'password' || formData.password ? '-top-5 text-sm' : 'top-2'
      ]"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  v-model="formData.password"
                  @focus="handleFocus('password')"
                  @blur="handleBlur"
                  class="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-rose-800 focus:outline-none"
                  required
                />
              </div>
            </div>
  
            <button
              type="submit"
              class="hover:text-blue-100 hover:bg-blue-950 w-full my-[15px] bg-gradient-to-r from-pink-800 via-rose-700 to-pink-800 rounded-lg text-white font-[500] py-[12px] transition duration-300"
            >
              Sign In
            </button>
          </form>
  
          <div class="w-full flex px-[12px] md:px-[19px] items-center space-x-2">
            <div class="w-[47%] h-[2px] bg-[#c5c5c5]"></div>
            <p class="text-gray-500 w-[4%] text-[14px]">OR</p>
            <div class="w-[47%] h-[2px] bg-[#c5c5c5]"></div>
          </div>
  
          <p class="mx-auto cursor-pointer mt-[18px] text-gray-500 font-medium">
            Don't Have An Account?
            <span @click="navigateToSignUp" class="text-rose-700 ml-[8px] underline"
              >Sign Up</span
            >
          </p>
        </div>
      </div>
    </main>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useAuthStore } from '@/store/auth'; 
  
  const { login, showToast } = useAuthStore();
  const router = useRouter();
  
  const focusField = ref('');
  const formData = ref({ email: '', password: '' });
  const loading = ref(false);
  
  onMounted(() => {
    window.scrollTo(0, 0);
  });
  
  const handleFocus = (field) => {
    focusField.value = field;
  };
  
  const handleBlur = () => {
    focusField.value = '';
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    loading.value = true;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/auth/login`,
        formData.value
      );
  
      login(response.data.token);
      showToast('Login successful! Navigating to profile.');
      router.push('/authentication/profile');
    } catch (error) {
      loading.value = false;
      showToast('Login failed, No Account Found 😢');
    }
  };
  
  const navigateToSignUp = () => {
    router.push('/authentication/signUp');
  };
  </script>
  