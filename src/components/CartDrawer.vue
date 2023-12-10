<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import IconCart from '@/icons/IconCart.vue'
import IconArrow from '@/icons/IconArrow.vue'
import { useDrawerStore } from '@/stores/drawer'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const drawerStore = useDrawerStore()

defineProps(['subtotal', 'delivery'])

const pay = () => {
  if (!authStore.token) {
    router.push({ name: 'Login' })
    toast.error('login to procceed')
  } else {
    router.push({ name: 'Payment' })
    drawerStore.toggleDrawer()
  }
}
</script>
<template>
  <div class="cart-component" :class="drawerStore.IsOpen ? 'slideIn' : 'slideOut'">
    <div class="cart-header-wrapper">
      <div class="cart-header">
        <IconArrow class="icon-exit" @click="drawerStore.toggleDrawer" />
        <h1>my cart</h1>
        <IconCart class="icon-cart" />
      </div>
    </div>
    <div class="cart-content">
      <slot></slot>
    </div>
    <div class="checkout-container">
      <div class="checkinfo">
        <h4>Delivery Fee Per Item:</h4>
        <span>Ksh {{ delivery }}</span>
      </div>
      <div class="checkinfo">
        <h4>Subtotal:</h4>
        <span>Ksh {{ subtotal }}</span>
      </div>
      <div class="checkinfo">
        <h1>Total:</h1>
        <h1>Ksh {{ subtotal }}</h1>
      </div>
      <div class="checkout-btn-contain">
        <button class="checkout-btn" @click="pay()">checkout >></button>
        <span @click="drawerStore.toggleDrawer">continue shopping</span>
      </div>
    </div>
  </div>
</template>
<style>
@import '@/style/cartdrawer.css';
</style>
