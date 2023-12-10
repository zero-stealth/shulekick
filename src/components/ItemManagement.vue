<template>
  <div class="game-container">
    <div class="game-game-p">
      <div class="game-cf">
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-if="ProductData.length === 0">
              <tr>
                <td colspan="5">No Product Found</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="data in ProductData" :key="data._id">
                <td>
                  <div class="Account-tbl-img">
                    <img :src="data.image" alt="Account-p" class="Account-pi" />
                  </div>
                </td>
                <td><span>{{ data.name }}</span></td>
                <td><span>{{ data.description }}</span></td>
                <td><span>{{ data.price }}</span></td>
                <td>
                  <div class="Account-delete" @click="editProduct(data._id)">
                    <IconFile class="icon-file" />
                  </div>
                </td>
                <td>
                  <div class="Account-delete" @click="deleteProduct(data._id)">
                    <IconDelete class="icon-delete" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div class="game-edit" :class="[isGameOpen ? 'showEdit' : 'closeEdit']">
      <div class="mobile-exit">
        <IconExit class="icon-exit" @click="showEdit()" />
      </div>
      <div class="game-main-p">
        <component  :is="EditProduct" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue'
import IconExit from '@/icons/IconExit.vue'
import IconFile from '@/icons/IconFile.vue'
import IconDelete from '@/icons/IconDelete.vue'
import { useProductStore } from '@/stores/product'
import EditProduct from '../components/EditProduct.vue'

const dataId = ref('')
const toast = useToast()
const ProductData = ref([])
const isGameOpen = ref(false)
const ProductStore = useProductStore()
const serverHost = import.meta.env.VITE_SERVER_HOST

const getProduct = async () => {
  try {
    const response = await axios.get(`${serverHost}/products`)
    ProductData.value = response.data
  } catch (err) {
    // console.log(err)
  }
}

const showEdit = () => {
  isGameOpen.value = !isGameOpen.value
}

const editProduct = (id) => {
  dataId.value = id
  ProductStore.updateId(id)
  isGameOpen.value = !isGameOpen.value

}


onMounted(() => {
  getProduct()
})

const deleteProduct = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    await axios.delete(`${serverHost}/products/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    await getProduct()
    toast.success('Product Deleted')
  } catch (err) {
    console.log(err)
    toast.error(err.response.data.message)
  }
}
</script>

<style>
@import '@/style/management.css';
</style>
