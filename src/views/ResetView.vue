<template>
    <div class="auth-container">
      <div class="form-l-wrapper">
        <h1>Reset password</h1>
        <form @submit.prevent="resetPassword" class="l-form">
          <input
            type="text"
            class="input-l"
            placeholder="code sent to your email"
            v-model="code"
          />    <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
          <input
            type="password"
            class="input-l"
            placeholder="password 8 character (capital,lowercase,number)"
            v-model="password"
          />
          <input
            type="password"
            class="input-l"
            placeholder="confirm Password"
            v-model="confirmPassword"
          />
          <button class="btn-f" type="submit">Reset</button>
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
import { useToast } from 'vue-toastification'
 import { useAuthStore } from '../stores/auth'
 const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
 
 const authStore = useAuthStore()
 const router = useRouter()
 const password = ref('')
const toast = useToast()
 const email = ref('')
 const code = ref('')
 const confirmPassword = ref('')
 
 const reset = () => {
   email.value = ''
   password.value = ''
   code.value = ''
 }
 
 const resetPassword = async () => {
   if (email.value !== '' && password.value !== '' && code.value !== '') {
     try {
       const response = await axios.post(`${SERVER_HOST}/auth/resetPassword`, {
         email: email.value,
         password: password.value,
         resetCode: code.value,
       })
       const token = response.data.token
       authStore.toggleToken(JSON.stringify(token))
       router.push({ name: 'Login' })
       toast.success(response.data.message)
     } catch (error) {
       toast.error(error.response.data.message)
     }
   } else {
     toast.error('Write something')
     reset()
   }
 }
 
 
 const login = () => {
   router.push({ name: 'Login' })
 }
 </script>
 
 <style>
 @import '../style/auth.css';
 </style>