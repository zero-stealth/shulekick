<template>
  <div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <div class="form-group">
          <label for="ProductName">Product Name:</label>
          <input
            v-model="ProductName"
            type="text"
            class="form-g-input"
            placeholder="shoe"
            id="ProductName"
          />
        </div>
        <div class="form-group">
          <label for="ProductImage">Product Image:</label>
          <input
            @change="handleProductImage"
            type="file"
            class="form-g-input"
            id="ProductImage"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="ProductSize">Product size:</label>
          <input
            v-model="ProductSize"
            type="text"
            class="form-g-input"
            placeholder="4"
            id="ProductSize"
          />
        </div>
        <div class="form-group">
          <label for="Productcategory">Product category:</label>
          <select v-model="Productcategory" class="form-g-input" id="category">
            <option disabled value="">Product for</option>
            <option value="Girls">Girls</option>
            <option value="Boys">Boys</option>
          </select>
        </div>
        <div class="form-group">
          <label for="ProductPrice">Product Price:</label>
          <input
            v-model="ProductPrice"
            type="text"
            class="form-g-input"
            placeholder="10000"
            id="ProductPrice"
          />
        </div>
        <button type="submit" class="btn-f-f">Post</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useProductStore } from '@/stores/product'

const toast = useToast()
const ProductSize = ref('')
const ProductName = ref('')
const ProductPrice = ref('')
const ProductImage = ref(null)
const Productcategory = ref('')
const ProductStore = useProductStore()

const reset = () => {
  ProductName.value = ''
  Productcategory.value = ''
  ProductPrice.value = ''
  ProductSize.value = ''
  ProductImage.value = null
}

function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handleProductImage(event) {
  handleFileUpload(event, ProductImage)
}
const serverHost = import.meta.env.VITE_SERVER_HOST
async function handleSubmit() {
  if (
    ProductStore.productId &&
    (ProductName.value.trim() !== '' ||
      Productcategory.value.trim() !== '' ||
      ProductImage.value !== null ||
      ProductPrice.value.trim() !== '' ||
      ProductSize.value.trim() !== '')
  ) {
    const user = JSON.parse(localStorage.getItem('token'))
    try {
      const formData = new FormData()

      if (ProductName.value.trim() !== '') formData.append('name', ProductName.value)
      if (ProductSize.value.trim() !== '') formData.append('size', ProductSize.value)
      if (ProductImage.value !== null) formData.append('image', ProductImage.value)
      if (ProductPrice.value.trim() !== '') formData.append('price', ProductPrice.value)
      if (Productcategory.value.trim() !== '') formData.append('description', Productcategory.value)

      const response = await axios.put(
        `${serverHost}/products/update/${ProductStore.productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user}`
          }
        }
      )
      toast.success('Product updated')
      reset()
    } catch (error) {
      console.log(error)
      if (error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.response.data.error)
      }
    }
  } else {
    toast.error('No empty fields allowed')
  }
}
</script>
<style>
@import '@/style/games.css';
</style>
