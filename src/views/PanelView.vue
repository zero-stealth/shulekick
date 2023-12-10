<template>
  <div class="panel-container">
    <div class="panel-bar" :class="[isOpen ? 'close-dash' : '']">
      <div class="panel-nav">
        <div>
          <div class="pan-arrow-container" @click="goBack()">
            <span>Go home</span>
            <IconHome class="pan-arrow" />
          </div>
          <div class="panel-img" :style="{ backgroundImage: `url(${logo})` }"></div>
        </div>
        <div class="panel-btn-container">
          <button @click="setActivePage(UserManagement)" :class="getButtonClass(UserManagement)">
            <IconGroup class="icon-panel" />
            <span>User Management</span>
          </button>
          <button @click="setActivePage(ItemManagement)" :class="getButtonClass(ItemManagement)">
            <IconFolder class="icon-panel" />
            <span>Items Management</span>
          </button>
          <button @click="setActivePage(PostProduct)" :class="getButtonClass(PostProduct)">
            <IconProduct class="icon-panel" />
            <span> Post Product</span>
          </button>
        </div>
      </div>
      <button @click="logout" :class="getButtonClass(logout)">
        <IconLogout class="icon-panel" />
        <span>Logout </span>
      </button>
    </div>
    <div class="panel-main">
      <component :is="activePage" />
      <div class="float-menu" @click="showMenu">
        <IconDash class="float-m-icon" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, shallowRef } from 'vue'
import IconProduct from '@/icons/IconProduct.vue'
import IconLogout from '@/icons/IconLogout.vue'
import IconFolder from '@/icons/IconFolder.vue'
import IconGroup from '@/icons/IconGroup.vue'
import { useAuthStore } from '@/stores/auth'
import IconDash from '@/icons/IconDash.vue'
import IconHome from '@/icons/IconHome.vue'
import logo from '@/assets/logo.png'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const username = ref('admin')
const router = useRouter()
const isOpen = ref(false)

watchEffect(() => {
  username.value = localStorage.getItem('username')
})

const showMenu = () => {
  isOpen.value = !isOpen.value
}

const goBack = () => {
  router.push({ name: 'Home' })
}
// pages
import UserManagement from '@/components/UserManagement.vue'
import ItemManagement from '@/components/ItemManagement.vue'
import PostProduct from '@/components/PostProduct.vue'

const activePage = shallowRef(UserManagement)

const setActivePage = (page) => {
  activePage.value = page
}

const getButtonClass = (page) => {
  return ['panel-btn', activePage.value === page ? 'active-cp' : 'inactive-cp']
}

const logout = () => {
  authStore.removeToken()
}
</script>
<style>
@import '@/style/panel.css';
</style>
