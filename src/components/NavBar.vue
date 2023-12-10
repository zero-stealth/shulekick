<script setup>
import axios from 'axios'
import boy from '@/assets/boy.png'
import girl from '@/assets/girl.png'
import logo from '@/assets/logo.png'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'
import IconCart from '@/icons/IconCart.vue'
import IconMenu from '@/icons/IconMenu.vue'
import IconClose from '@/icons/IconClose.vue'
import IconPhone from '@/icons/IconPhone.vue'
import IconEmail from '@/icons/IconEmail.vue'
import IconLogout from '@/icons/IconLogout.vue'
import { useDrawerStore } from '@/stores/drawer'
import IconSearch from '@/icons/IconSearch.vue'
import IconProfile from '@/icons/IconProfile.vue'
import IconDelete from '../icons/IconDelete.vue'
import IconLocation from '@/icons/IconLocation.vue'
import CartDrawer from '@/components/CartDrawer.vue'
import { ref, onMounted, watchEffect, computed } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'

const customerId = ref(localStorage.getItem('customerId') || '')
const email = ref(localStorage.getItem('email') || '')
const serverHost = import.meta.env.VITE_SERVER_HOST
const activeHoverGirls = ref(false)
const activeHoverBoys = ref(false)
const drawerStore = useDrawerStore()
const authStore = useAuthStore()
const activeMobile = ref(false)
const router = useRouter()
const cartData = ref([])
const route = useRoute()
const delivery = ref(30)
const toast = useToast()
const random = ref('')
const search = ref('')

const toggleMobile = () => {
  activeMobile.value = !activeMobile.value
}

const toggleHover = (category) => {
  watchEffect(() => {
    if (category === 'boys') {
      activeHoverBoys.value = !activeHoverBoys.value
      activeHoverGirls.value = false
    } else if (category === 'girls') {
      activeHoverGirls.value = !activeHoverGirls.value
      activeHoverBoys.value = false
    } else {
      activeHoverBoys.value = false
      activeHoverGirls.value = false
    }
  })
}

const LogOut = () => {
  authStore.removeToken()
}

const getCartData = async (id) => {
  try {
    const response = await axios.get(`${serverHost}/cart/items/${id}`)
    cartData.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const total = computed(() => {
  return cartData.value.reduce((acc, product) => {
    const productPrice = parseFloat(product.price) || 0
    const productQuantity = product.quantity || 1
    const productTotal = productPrice * productQuantity + delivery.value
    return acc + productTotal
  }, 0)
})

const getUserName = (email) => {
  if (email && authStore.token) {
    const username = email.split('@')[0]
    return username
  } else {
    return 'Guest'
  }
}

const deleteItem = async (id, name) => {
  try {
    const response = await axios.delete(`${serverHost}/cart/delete/${id}`, {})
    toast.success(`Cart item ${name} removed`)
    await getCartData(customerId.value)
  } catch (err) {
    toast.error(err.response.data.message)
  }
}

const Login = () => {
  router.push({ name: 'Login' })
}

const getCart = async () =>  {
  drawerStore.toggleDrawer()
  await getCartData(customerId.value)
}

const activeClass = (link) => {
  const style = ref(null)
  watchEffect(() => {
    if (link === route.params.category) {
      style.value = 'active-link'
    } else {
      style.value = ''
    }
  })

  return style.value
}

const goToCategory = (type) => {
  router.push({ name: 'Gender', params: { category: type } })
  activeClass(type)
  toggleHover(type)
}

const goHome = () => {
  router.push({ name: 'Home' })
}

onMounted(() => {
  getCartData(customerId.value)
  random.value = Math.floor(Math.random() * 1000)
})
</script>
<template>
  <div class="top-nav">
    <div class="info-top">
      <IconEmail class="top-icon" />
      <span>shulekicks@gmail.com</span>
    </div>
    <div class="info-top">
      <IconLocation class="top-icon" />
      <span> Ruiru kimbo Centre.</span>
    </div>
    <div class="info-top">
      <IconPhone class="top-icon" />
      <div class="info-top-in">
        <span>+254738911010</span>
        <span>+0112531555</span>
      </div>
    </div>
  </div>
  <div class="nav-container">
    <div class="nav-right">
      <div class="nav-logo" @click="goHome">
        <img :src="logo" alt="logo" class="logo-image" />
      </div>
    </div>
    <div class="nav-link-container">
      <RouterLink :to="{ name: 'Home' }" class="nav-link">Home</RouterLink>
      <div class="nav-spacer-container">
        <div class="nav-spacer" :class="activeClass('Boys')" @click="goToCategory('Boys')">
          <div class="nav-spacer-item">
            <span>Boys</span>
          </div>
          <div class="nav-spacer-hover" :style="{ display: activeHoverBoys ? 'flex' : 'none' }">
            <div class="nav-spacer-hover-info">
              <a href="#shoes"> See all</a>
              <a href="#shoes"> Shoes</a>
              <a href="#shoes"> Back to school offers</a>
            </div>
            <img :src="boy" alt="boy shoes" class="nav-spacer-hover-image" />
          </div>
        </div>
        <div class="nav-spacer" :class="activeClass('Girls')" @click="goToCategory('Girls')">
          <div class="nav-spacer-item">
            <span>Girls</span>
          </div>
          <div class="nav-spacer-hover" :style="{ display: activeHoverGirls ? 'flex' : 'none' }">
            <div class="nav-spacer-hover-info">
              <a href="#shoes"> See all</a>
              <a href="#shoes"> Shoes</a>
              <a href="#shoes"> Back to school</a>
            </div>
            <img :src="girl" alt="girl shoes" class="nav-spacer-hover-image" />
          </div>
        </div>
      </div>
      <RouterLink :to="{ name: 'About' }" class="nav-link">About</RouterLink>
      <RouterLink :to="{ name: 'Contact' }" class="nav-link">Contact</RouterLink>
    </div>
    <div class="nav-left">
      <div class="nav-search">
        <input
          type="text"
          class="nav-search-input"
          placeholder="Search"
          autocomplete="on"
          v-model="search"
        />
        <IconSearch class="nav-search-icon" />
      </div>
      <div class="nav-user">
        <div class="nav-login-container" @click="LogOut" v-if="authStore.token">
          <span>{{ getUserName(email) }}</span>
          <img
            src="https://source.unsplash.com/random/200x200?sig={{ random }}"
            alt="profile"
            class="profile-pic"
          />
        </div>
        <div class="not-login-container" @click="Login" v-else>
          <span>Login</span>
          <IconProfile class="nav-user-icon" />
        </div>
        <div class="nav-cart" @click="getCart()">
          <span v-if="cartData.length">{{ cartData.length }} </span>
          <IconCart class="nav-cart-icon" />
        </div>
      </div>
    </div>
  </div>
  <div class="nav-mobile-container">
    <div class="nav-Menu" @click="toggleMobile">
      <IconMenu class="nav-mobile-icon" v-if="!activeMobile" />
      <IconClose class="nav-mobile-icon" v-else />
    </div>
    <div class="nav-logo" @click="goHome">
      <img :src="logo" alt="logo" class="logo-image" />
    </div>
    <div class="nav-cart" @click="getCart()">
      <span v-if="cartData.length">{{ cartData.length }} </span>
      <IconCart class="nav-cart-icon" />
    </div>
    <div class="nav-link-mobile" v-if="activeMobile">
      <div class="nav-close-mobile" @click="toggleMobile">
        <IconClose class="nav-mobile-icon nav-cart-close-icon" />
      </div>
      <div class="mobile-wrapper-complete">
        <div class="nav-search">
          <input
            type="text"
            class="nav-search-input"
            placeholder="Search"
            autocomplete="on"
            v-model="search"
          />
          <IconSearch class="nav-search-icon" />
        </div>
        <div class="link-mobile-wrapper" @click="toggleMobile">
          <RouterLink :to="{ name: 'Home' }" class="nav-link mobile-link">Home</RouterLink>
          <RouterLink :to="{ name: 'About' }" class="nav-link mobile-link">About</RouterLink>
          <RouterLink :to="{ name: 'Contact' }" class="nav-link mobile-link">Contact</RouterLink>
          <RouterLink
            :to="{ name: 'Gender', params: { category: 'girls' } }"
            class="nav-link mobile-link"
            >Girls</RouterLink
          >
          <RouterLink
            :to="{ name: 'Gender', params: { category: 'boys' } }"
            class="nav-link mobile-link"
            >Boys</RouterLink
          >
        </div>
        <div class="nav-user mobile-user">
          <div class="nav-login-container" v-if="authStore.token">
            <span>{{ getUserName(email) }}</span>
            <img
              src="https://source.unsplash.com/random/200x200?sig={{ random }}"
              alt="profile"
              class="profile-pic"
            />
          </div>
          <div class="not-login-container" @click="LogOut" v-if="authStore.token">
            <span>LogOut</span>
            <IconLogout class="nav-user-icon" />
          </div>
          <div class="not-login-container" @click="Login" v-else>
            <span>Login</span>
            <IconProfile class="nav-user-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <CartDrawer :subtotal="total" :delivery="delivery">
    <div v-if="cartData.length > 0">
      <div v-for="d in cartData" :key="d._id">
        <div class="cart-card-container">
          <div class="cart-card-wrapper">
            <div class="cart-card-image-container">
              <img :src="d.productImage" :alt="d.productName" class="cart-card-image" />
            </div>
            <div class="cart-card-info">
              <h1>{{ d.productName }}</h1>
              <p>Ksh {{ d.price }}</p>
            </div>
          </div>
          <div class="cart-card-icon-delete-wrapper" @click="deleteItem(d._id, d.productName)">
            <IconDelete class="cart-card-icon-delete" />
          </div>
        </div>
      </div>
    </div>
    <div class="empty-cart" v-else>
      <p>Your cart is empty</p>
    </div>
  </CartDrawer>
</template>
<style scoped>
@import '@/style/nav.css';
@import '@/style/cartcard.css';
</style>
