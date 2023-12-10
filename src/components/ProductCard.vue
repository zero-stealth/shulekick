<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDrawerStore } from '@/stores/drawer'

const toast = useToast()
const router = useRouter()
const drawerStore = useDrawerStore()
const serverHost = import.meta.env.VITE_SERVER_HOST
const random = Math.floor(Math.random() * 1000)
const customerId = ref(localStorage.getItem('customerId') || null)
const props = defineProps(['ShoeName', 'ProductId', 'Size', 'Price', 'Image'])
const totalPrice = computed(() => parseFloat(props.Price) + random)

const addToCart = async (id, name) => {
  if (customerId.value !== null) {
    try {
      const payload = {
        customerId: customerId.value,
        productId: id,
        quantity: 1
      }

      const response = await axios.post(`${serverHost}/cart/add`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      toast.success(` ${name} added to cart successfully`)
    } catch (err) {
      toast.error(err.response.data.error)
    }
  } else {
    toast.error('Login to add to cart')
  }
}

const off = computed(() => {
  const discount = totalPrice.value - parseFloat(props.Price)
  const percentageOff = (discount / totalPrice.value) * 100
  return Math.round(percentageOff)
})

const buyNow = (id) => {
  router.push({ name: 'Payment' })
  localStorage.setItem('productId', id)
}
</script>
<template>
  <div class="product-card">
    <div class="product-card-img-section">
      <div class="product-card-offer">
        {{ `${off} %` }}
      </div>
      <img :src="props.Image" :alt="props.ShoeName" class="product-card-image" />
      <div class="product-card-hidden">
        <button class="product-card-hidden-btn" @click="addToCart(props.ProductId, props.ShoeName)">
          add to cart
        </button>
        <button class="product-card-hidden-btn hidden-btn-active" @click="buyNow(props.ProductId)">
          buy now
        </button>
      </div>
    </div>
    <div class="product-card-info">
      <div class="product-card-inner-info">
        <h1>{{ props.ShoeName }}</h1>
        <span>size no: {{ props.Size }}</span>
      </div>
      <div class="product-card-inner-infob">
        <h3>
          <span>{{ totalPrice }} ksh</span> {{ props.Price }} Ksh
        </h3>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '@/style/productCard.css';
</style>
