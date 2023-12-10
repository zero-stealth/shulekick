<template>
  <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>{{ title }}</h1>
      <form @submit.prevent="login" class="l-form" v-if="!resetPage">
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Login</button>
        <span @click="forgot">Forgot password</span>
      </form>
      <form @submit.prevent="resetAuth" class="l-form" v-else>
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Request reset</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="create">Create an account</button>
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
const resetPage = ref(false)
const router = useRouter()
const title = ref('login')
const toast = useToast()
const errMsg = ref('')
const email = ref('')
const password = ref('')

const reset = () => {
  password.value = ''
  email.value = ''
}

const login = async () => {
  if (email.value !== '' && password.value !== '') {
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/login-admin`, {
        email: email.value,
        password: password.value
      })

      const token = response.data.token
      const customerId = response.data_id
      const isAdmin = response.data.isAdmin

      localStorage.setItem('email', email.value)
      localStorage.setItem('customerId', customerId)
      authStore.updateToken(JSON.stringify(token))
      if (isAdmin) {
        authStore.updateAdmin(isAdmin)
        localStorage.setItem('admin', isAdmin)
        router.push({ name: 'Panel' })
        toast.success('welcome admin')
      } else {
        router.push({ name: 'Home' })
        toast.success('Account created successfully')
      }
      
    } catch (error) {
      if(error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.response.data.error)
      }
    }
  } else {
    toast.error('Please enter your email and password.')
    reset()
  }
}

const forgot = () => {
  title.value = 'write your email address'
  resetPage.value = !resetPage.value
}

const create = () => {
  router.push({ name: 'AdminSignin' })
}

const resetAuth = async () => {
  if (email.value !== '') {
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/reset`, {
        email: email.value
      })

      router.push({ name: 'Reset' })
      toast.error(response.data.message)
    } catch (error) {
      if(error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.response.data.error)
      }
    }
  } else {
    toast.error('Write your email something')

    reset()
  }
}
</script>

<style>
@import '@/style/auth.css';
</style>
