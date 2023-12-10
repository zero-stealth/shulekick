<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import IconChevronLeft from '@/icons/IconChevronLeft.vue'
import IconChevronRight from '@/icons/IconChevronRight.vue'

const productData = ref([])
const nextClicked = ref(false)
const serverHost = import.meta.env.VITE_SERVER_HOST

const getProductData = async () => {
  try {
    const response = await axios.get(`${serverHost}/products`)
    productData.value = response.data
  } catch (err) {
    // console.log(err)
  }
}



let currentIndex = ref(0)

const showPrevious = () => {
  currentIndex.value = (currentIndex.value - 1 + productData.value.length) % productData.value.length
  nextClicked.value = false
}

const showNext = () => {
  currentIndex.value = (currentIndex.value + 1) % productData.value.length
  nextClicked.value = true
}

onMounted(() => {
  getProductData()
  currentIndex.value = 0
})
</script>

<template>
  <div class="product-component" v-if="productData.length > 0">
    <div class="product-btn">
      <button @click="showPrevious" class="arrow-button" :disabled="currentIndex === 0">
        <IconChevronLeft class="icon-product-section" />
      </button>
      <button @click="showNext" class="arrow-button" :disabled="currentIndex >= productData.length">
        <IconChevronRight class="icon-product-section" />
      </button>
    </div>
    <div class="product-container">
      <div class="product-wrapper" :style="{ transform: `translateX(-${currentIndex * 310}px)` }">
        <template v-for="product in productData" :key="product.id">
          <ProductCard
            :ShoeName="product.name"
            :Size="product.size"
            :Image="product.image"
            :Price="product.price"
            :ProductId="product._id"
          />
        </template>
      </div>
    </div>
  </div>
  <div class="product-empty" v-else>
    <p>No products added</p>
  </div>

</template>
<style scoped>
@import '@/style/product.css';
</style>
