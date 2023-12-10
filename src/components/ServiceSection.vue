<script setup>
import { shallowRef } from 'vue'
import IconQuality from '../icons/IconQuality.vue'
import IconPayment from '../icons/IconPayment.vue'
import IconSupport from '../icons/IconSupport.vue'
import IconDelivery from '../icons/IconDelivery.vue'

const cardData = shallowRef([
  {
    id: 1,
    icon: IconQuality,
    title: 'Exceptional Quality',
    info: 'Experience the finest quality service that exceeds your expectations. Our commitment to excellence ensures satisfaction in every aspect of your experience.'
  },
  {
    id: 2,
    icon: IconPayment,
    title: 'Secure Payments',
    info: 'Enjoy peace of mind with our secure payment system. We prioritize the security of your transactions, making sure your sensitive information is always protected.'
  },
  {
    id: 3,
    icon: IconSupport,
    title: 'Dedicated 24/7 Support',
    info: 'Our dedicated support team is available around the clock to assist you. Whether you have questions, concerns, or need guidance, we are here for you anytime, day or night.'
  },
  {
    id: 4,
    icon: IconDelivery,
    title: 'Swift and Reliable Delivery',
    info: 'Experience the convenience of fast and reliable delivery. We ensure your orders reach you promptly, so you can enjoy your products without unnecessary delays.'
  }
])
</script>

<template>
  <div class="service-container">
    <div class="service-card" v-for="card in cardData" :key="card.id">
      <component :is="card.icon" class="service-card-icon" />
      <h1>{{ card.title }}</h1>
      <p>{{ card.info }}</p>
    </div>
  </div>
</template>
<style scoped>
@import '@/style/service.css';
</style>
