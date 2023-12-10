<script setup>
const props = defineProps(['ShoeName', 'Size', 'Price', 'Image'])
</script>

<template>
  <div class="cart-card-container">
    <div class="cart-card-wrapper">
      <div class="cart-card-image-container">
        <img :src="props.Image" :alt="props.ShoeName" class="cart-card-image" />
      </div>
      <div class="cart-card-info">
        <h1>{{ props.ShoeName }}</h1>
        <p>
          Ksh {{ props.Price }}
        </p>
      </div>
    </div>  
  </div>
</template>

<style scoped>
@import '@/style/cartcard.css';
</style>
