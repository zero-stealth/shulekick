<script setup>
import ads from '@/assets/ads1.png'
import ads2 from '@/assets/ads2.png'
import pattern from '@/assets/pattern.png'
</script>

<template>
  <div class="about-container">
    <div class="about-header">
      <h1>New collections available</h1>
      <p>
        Discover our latest collections of shoes that are perfect for any ocassion from back to
        school to formal attire. We have everything you need to help you get through anything
      </p>
    </div>
    <div class="about-advert">
      <div class="about-advert-part1" :style="{ backgroundImage: `url(${ads})` }">
        <div class="about-offer">
          <h2>New</h2>
        </div>
        <div class="about-inner-part1">
          <h1>New quality brands</h1>
          <span>Now available</span>
          <button class="about-btn">Order now</button>
        </div>
      </div>
      <div class="about-advert-part2">
        <div class="about-img-contain" :style="{ backgroundImage: `url(${ads2})` }">
          <h1>School <br />Essentials</h1>
          <span>Move and explore</span>
        </div>
        <div class="about-img-info" :style="{ backgroundImage: `url(${pattern})` }">
          <h1>Get <br />upto 10% discount</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '@/style/about.css';
</style>
