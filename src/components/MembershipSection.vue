<script setup>
import background from '../assets/background.jpeg'
import { useRouter } from 'vue-router'

const router = useRouter()

const join = () => {
  router.push({ name: 'Login' })
}
</script>
<template>
  <div
    class="membership-container"
    :style="{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`
    }"
  >
    <h1>Get discount for membership</h1>
    <p>Join us today and get 10% discount</p>
    <button class="membership-btn" @click="join()">Join Now</button>
  </div>
</template>

<style scoped>
@import '../style/membership.css';
</style>
