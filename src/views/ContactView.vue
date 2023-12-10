<template>
  <MembershipSection />
  <div class="footer-component">
    <div class="footer-container">
      <div class="footer-wrap">
        <div class="foot-part">
          <img :src="logo" alt="logo" class="footer-logo" />
          <p>Make your <span @click="goAdmin()">child's</span> journey more comfortable.</p>
          <RouterLink :to="{ name: 'Support' }" class="foot-link">Support</RouterLink>
          <div class="social-container">
            <div class="social-link-banner" @click="openWhatsapp">
              <IconWhatsapp class="social-link" />
            </div>
            <div class="social-link-banner" @click="openFacebook">
              <IconFacebook class="social-link" />
            </div>
            <div class="social-link-banner" @click="openTwitter">
              <IconTwitter class="social-link" />
            </div>
          </div>
        </div>
        <div class="foot-part-contain">
          <div class="foot-part">
            <h1>Quick links</h1>
            <RouterLink :to="{ name: 'Home' }" class="foot-link">Home</RouterLink>
            <RouterLink :to="{ name: 'About' }" class="foot-link">About</RouterLink>
            <RouterLink :to="{ name: 'Contact' }" class="foot-link">Contact</RouterLink>
          </div>
          <div class="foot-part">
            <h1>Resource</h1>
            <RouterLink :to="{ name: 'Policy' }" class="foot-link">Policy</RouterLink>
            <RouterLink :to="{ name: 'Disclaimer' }" class="foot-link">Disclaimer</RouterLink>
            <RouterLink :to="{ name: 'Terms' }" class="foot-link">Terms & Condition</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copyright">© 2023 Shukekicks. All rights reserved</div>
  </div>
</template>

<script setup>
import logo from '../assets/logo.png'
import { useRouter } from 'vue-router'
import { onMounted, ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import IconTwitter from '@/icons/IconTwitter.vue'
import IconFacebook from '@/icons/IconFacebook.vue'
import IconWhatsapp from '@/icons/IconWhatsapp.vue'
import MembershipSection from '@/components/MembershipSection.vue'

const route = useRoute()
const router = useRouter()
const routeName = ref('Home')
const phoneNumber = ref('254738911010')

onMounted(() => {
  watchEffect(() => {
    routeName.value = route.hash
  })
})

const goAdmin = () => {
  router.push({ name: 'AdminLogin' })
}

const openWhatsapp = () => {
  window.open(`https://wa.me/${phoneNumber.value}?text=Hi welcome to maher agency`, '_blank')
}
const openFacebook = () => {
  window.open('https://', '_blank')
}

const openTwitter = () => {
  window.open('https://', '_blank')
}
</script>

<style scoped>
@import '@/style/contact.css';
</style>
