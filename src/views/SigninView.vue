<template>
  <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>Create an account</h1>
      <form @submit.prevent="create" class="l-form">
        <input type="username" class="input-l" placeholder="Username" v-model="username" />
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input
          type="password"
          class="input-l"
          placeholder="Password (8 characters, uppercase, lowercase, number)"
          v-model="password"
        />
        <input
          type="password"
          class="input-l"
          placeholder="Confirm Password"
          v-model="confirmPassword"
        />
        <button class="btn-f" type="submit">Sign up</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="login">Login</button>
        <span @click="goHome()" class="reverse">Go back home</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const authStore = useAuthStore()
const confirmPassword = ref('')
const phoneNumber = ref('')
const router = useRouter()
const password = ref('')
const toast = useToast()
const username = ref('')
const email = ref('')

const reset = () => {
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  username.value = ''
}

const create = async () => {

    try {

      if (password.value !== confirmPassword.value) {
        toast.error('Passwords do not match');
        reset();
        return;
      }

      if (email.value === '' || username.value === '' || password.value === '') {
      toast.error('Please enter all the required fields');
      reset();
      return;
    }

      const response = await axios.post(`${SERVER_HOST}/auth/register`, {
        email: email.value,
        password: password.value,
        username: username.value,
        
      })
      const { token, _id: customerId } = response.data;

      localStorage.setItem('username', email.value)
      localStorage.setItem('customerId', customerId)
      authStore.updateToken(JSON.stringify(token))
      router.push({ name: 'Home' })
      toast.success('Account created successfully')
    } catch (error) {
     console.log(error)
    if (error.response || error.response.data || error.response.data.message) {
      toast.error(error.response.data);
    } else if (error.response || error.response.data || error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error('An error occurred while processing your request');
    }
  }
    }



const login = () => {
  router.push({ name: 'Login' })
}

const goHome = () => {
  router.push({ name: 'Home' })
}
</script>

<style>
@import '@/style/auth.css';
.error-message {
  color: red;
}
</style>
