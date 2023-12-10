<script setup>
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import HeroSection from '@/components/HeroSection.vue'
import Service from '@/components/ServiceSection.vue'
import ProductSection from '@/components/ProductSection.vue'
import Testimonials from '@/components/TestimonialSection.vue'
</script>
<template>
  <div class="home-container">
    <HeroSection />
    <AboutView />
    <ProductSection id="product" />
    <Service />
    <Testimonials />
    <ContactView />
  </div>
</template>
<style scoped>
@import '@/style/home.css';
</style>
