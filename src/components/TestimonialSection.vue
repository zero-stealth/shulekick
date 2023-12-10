<script setup>
import profile1 from '@/assets/profile1.jpeg'
import profile2 from '@/assets/profile2.jpeg'
import profile3 from '@/assets/profile3.jpeg'
import profile4 from '@/assets/profile4.jpeg'
import profile5 from '@/assets/profile5.jpeg'
</script>
<template>
  <div class="testimonial-container">
    <div class="testimonial-header">
      <span>Testimonials</span>
      <h1>What's our clients say</h1>
    </div>
    <div class="testimonial-inner">
      <div class="testimonial-top">
        <div class="testimonial-top-l">
          <img :src="profile3" alt="testimonial" class="profile-testimonial" />
        </div>
        <div class="testimonial-top-r">
          <img :src="profile2" alt="testimonial" class="profile-testimonial" />
        </div>
      </div>
      <div class="testimonial-center">
        <div class="center-testimonial">
          <img :src="profile1" alt="testimonial" class="profile-testimonial center-profile" />
        </div>
        <p>Amazing and quality products</p>
        <span>~ Collins</span>
      </div>
      <div class="testimonial-top">
        <div class="testimonial-top-l">
          <img :src="profile4" alt="testimonial" class="profile-testimonial" />
        </div>
        <div class="testimonial-top-r">
          <img :src="profile5" alt="testimonial" class="profile-testimonial" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '@/style/testimonial.css';
</style>
