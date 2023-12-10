<template>
  <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>Create an account</h1>
      <form @submit.prevent="create" class="l-form">
        <input type="username" class="input-l" placeholder="Username" v-model="username" />
        <input type="phoneNumber" class="input-l" placeholder="07XXXXXXXX" v-model="phoneNumber" />
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
const email = ref('')
const username = ref('')

const reset = () => {
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  username.value = ''
  phoneNumber.value = ''
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

    const response = await axios.post(`${SERVER_HOST}/auth/register-admin`, {
      email: email.value,
      password: password.value,
      username: username.value,
      phoneNumber: phoneNumber.value,
    });

    const { token, _id: customerId, isAdmin } = response.data;

    localStorage.setItem('customerId', customerId);
    localStorage.setItem('username', username.value);
    authStore.updateToken(JSON.stringify(token));

    if (isAdmin) {
      authStore.updateAdmin(isAdmin);
      localStorage.setItem('admin', isAdmin);
      router.push({ name: 'Panel' });
      toast.success('Welcome admin');
    } else {
      router.push({ name: 'Home' });
      toast.success('Account created successfully');
    }
  } catch (error) {
    console.error(error);

    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error('An error occurred while processing your request');
    }
  }
};

const login = () => {
  router.push({ name: 'AdminLogin' })
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
