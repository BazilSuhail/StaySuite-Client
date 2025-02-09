<template>
  <main class="h-screen w-full pt-[75px] flex justify-center items-center bg-gray-100">
    <div class="flex flex-col w-[90%] md:w-[500px] md:scale-[1] scale-[0.9]">
      <!-- Logo Section -->
      <div class="scale-[1.2] flex mx-auto">
        <img src="/logo.svg" alt="Connection Failed" class="w-[34px] h-[30px] mt-[4px]" />
        <div class="text-rose-600 ml-[4px] md:text-[25px] text-[25px] font-[700]">
          Air<span class="text-red-400">BnB</span>
        </div>
      </div>
      <p class="text-[15px] mb-[15px] text-center mt-[8px] text-gray-500 font-[400]">
        Stay, Host, Explore. To start your adventure <span class="text-rose-700 font-[600]">Register Now !!</span>
      </p>

      <!-- Form Section -->
      <div class="py-[35px] px-[25px] flex flex-col bg-white rounded-xl">
        <form @submit="handleSubmit" class="lg:px-[15px]">
          <div class="flex mb-[8px] justify-center space-x-4">
            <label
              :class="['flex items-center w-[50%] text-rose-600 space-x-2 p-2 border-2 rounded-lg cursor-pointer', formData.role === 'Guest' ? 'border-rose-600 bg-rose-100' : 'border-gray-300']"
              @click="handleRoleChange('Guest')">
              <Icon name="lucide:user" class="w-5 h-5" />
              <span class="text-rose-950 text-[17px]">Guest</span>
            </label>
            <label
              :class="['flex items-center w-[50%] text-rose-600 space-x-2 p-2 border-2 rounded-lg cursor-pointer', formData.role === 'Host' ? 'border-rose-600 bg-rose-100' : 'border-gray-300']"
              @click="handleRoleChange('Host')">
              <Icon name="lucide:user" class="w-5 h-5" />
              <span class="text-rose-950 text-[17px]">Host</span>
            </label>
          </div>

          <!-- Name Input -->
          <div class="relative mt-[25px] mb-6 flex items-center">
            <div class="bg-rose-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
              <Icon name="lucide:user" class="text-gray-50 w-6 h-6" />
            </div>
            <div class="flex-1">
              <label for="fullName" :class="[
                'absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300',
                focusField === 'fullName' || formData.fullName ? '-top-5 text-sm' : 'top-2'
              ]">
                Name
              </label>
              <input type="text" id="fullName" name="fullName" v-model="formData.fullName"
                @focus="handleFocus('fullName')" @blur="handleBlur"
                class="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-rose-800 focus:outline-none"
                required />
            </div>
          </div>

          <!-- Email Input -->
          <div class="relative mt-4 mb-6 flex items-center">
            <div class="bg-rose-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
              <Icon name="lucide:mail" class="text-gray-50 w-6 h-6" />
            </div>
            <div class="flex-1">
              <label for="email" :class="[
                'absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300',
                focusField === 'email' || formData.email ? '-top-5 text-sm' : 'top-2'
              ]">
                Email
              </label>
              <input type="email" id="email" name="email" v-model="formData.email" @focus="handleFocus('email')"
                @blur="handleBlur"
                class="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-rose-800 focus:outline-none"
                required />
            </div>
          </div>

          <!-- Password Input -->
          <div class="relative mt-4 mb-6 flex items-center">
            <div class="bg-rose-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
              <Icon name="lucide:lock" class="text-gray-50 w-6 h-6" />
            </div>
            <div class="flex-1">
              <label for="password" :class="[
                'absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300',
                focusField === 'password' || formData.password ? '-top-5 text-sm' : 'top-2'
              ]">
                Password
              </label>
              <input type="password" id="password" name="password" v-model="formData.password"
                @focus="handleFocus('password')" @blur="handleBlur"
                class="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-rose-800 focus:outline-none"
                required />
            </div>
          </div>

          <button type="submit"
            class="hover:text-blue-100 hover:bg-blue-950 w-full my-[15px] bg-gradient-to-r from-pink-800 via-rose-700 to-pink-800 rounded-lg text-white font-[500] py-[12px] transition duration-300">
            Sign Up
          </button>
        </form>

        <div class="w-full flex px-[12px] md:px-[19px] items-center space-x-2">
          <div class="w-[47%] h-[2px] bg-[#c5c5c5]"></div>
          <p class="text-gray-500 w-[4%] text-[14px]">OR</p>
          <div class="w-[47%] h-[2px] bg-[#c5c5c5]"></div>
        </div>

        <p class="mx-auto cursor-pointer mt-[18px] text-gray-500 font-medium">
          Already Have An Account?
          <span @click="navigateToSignIn" class="text-rose-700 ml-[8px] underline">Sign In</span>
        </p>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const { showToast } = useAuthStore()

const focusField = ref('')
const loading = ref(false)
const formData = ref({
  fullName: '',
  email: '',
  password: '',
  role: 'Guest',
})

const handleFocus = (field) => {
  focusField.value = field
}

const handleBlur = () => {
  focusField.value = ''
}

const handleRoleChange = (role) => {
  formData.value.role = role
}

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    loading.value = true
    await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/auth/register`,
      formData.value
    )
    showToast('Registration successful! 😇')
    router.push('/signIn')
  } catch (error) {
    loading.value = false
    showToast('Registration failed! ' + (error.response?.data?.error || error.message))
  }
}

const navigateToSignIn = () => {
  router.push('/authentication/signIn')
}
</script>