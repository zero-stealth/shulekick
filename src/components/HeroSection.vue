<script setup>
import { ref, onMounted, watch } from 'vue'
import slide1 from '../assets/slide1.png'
import slide2 from '../assets/slide2.png'
import slide3 from '../assets/slide3.png'
import slide4 from '../assets/slide4.png'

const currentSlide = ref(0)

function slide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const slides = ref([
  {
    slide: slide1
  },
  {
    slide: slide2
  },
  {
    slide: slide3
  },
  {
    slide: slide4
  }
])

onMounted(() => {
  startSlideTimer()
})

watch(currentSlide, () => {
  stopSlideTimer()
  startSlideTimer()
})

const slide_interval = 5000
let slideTimer = null

function startSlideTimer() {
  slideTimer = setInterval(slide, slide_interval)
}

function stopSlideTimer() {
  clearInterval(slideTimer)
}
</script>
<template>
  <div class="hero-component" :style="{ backgroundImage: `url(${slides[currentSlide].slide})` }">
   <div class="hero-info">
    <h1>In need of a pair for your child, we got you covered</h1>
    <h4>Get christmass deals at <span>10% off</span></h4>
    <a href="#product"  class="hero-btn">Start shopping now</a>
   </div>
    <div class="r-container">
      <div v-for="(slide, index) in slides" :key="index">
        <div :class="{ 'custom-r': true, 'active-r': currentSlide === index }"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '@/style/hero.css';
</style>
