<script setup>
import axios from 'axios'
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const category = ref(route.params.category)
const serverHost = import.meta.env.VITE_SERVER_HOST

const productData = ref([])
const currentIndex = ref(0)


const getProductData = async () => {
  try {
    const response = await axios.get(`${serverHost}/products`)
    productData.value = response.data.filter((item) => item.description ===  category.value )
  } catch (err) {
    console.error(err)
  }
}


watchEffect(() => {
  category.value = route.params.category
  getProductData()
})




onMounted(() => {
  getProductData()
  currentIndex.value = 0
})
</script>

<template>
  <div class="product-component" v-if="productData.length > 0">
    <div class="product-container">
      <ProductCard
        v-for="product in productData"
        :key="product._id"
        :ShoeName="product.name"
        :Size="product.size"
        :Image="product.image"
        :Price="product.price"
        :ProductId="product._id"
      />
    </div>
  </div>
  <div class="product-empty" v-else>
    <p>No products added</p>
  </div>
</template>

<style scoped>
@import '@/style/gender.css';
</style>
