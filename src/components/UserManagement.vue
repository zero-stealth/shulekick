<template>
  <div class="account-container">
    <div class="search-section">
      <div class="form-group">
        <input
          v-model="searchAccount"
          type="text"
          class="form-g-input"
          placeholder="Search account by name"
          id="accountName"
        />
      </div>
    </div>
    <div class="acc-m">
      <table>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in filteredAccountData" :key="account.id">
            <td>
              <div class="Account-tbl-img">
                <span>{{ account.email }}</span>
              </div>
            </td>
            <td>
              <div class="Account-delete" @click="deleteAccount(account._id)">
                <IconDelete class="icon-delete" />
              </div>
            </td>
          </tr>
          <tr v-if="accountData.length === 0">
            <td colspan="2">No accounts created!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useToast } from 'vue-toastification'
import IconDelete from '@/icons/IconDelete.vue'
import { ref, watchEffect, onMounted } from 'vue'

const toast = useToast()
const accountData = ref([])
const searchAccount = ref('')
const filteredAccountData = ref([])
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST


const getAccountsData = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('token'))
    const response = await axios.get(`${SERVER_HOST}/auth`, {
      headers: {
        Authorization: `Bearer ${user}`
      }
    })

    accountData.value = response.data
  } catch (err) {
    // console.error(err)
  }
}

watchEffect(() => {
  if (searchAccount.value !== '') {
    const searchValue = searchAccount.value.toUpperCase()
    const filteredAccounts = accountData.value.filter((account) =>
      account.email.toUpperCase().includes(searchValue)
    )
    filteredAccountData.value = filteredAccounts
  } else {
    filteredAccountData.value = accountData.value
  }
})

const deleteAccount = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    await axios.delete(`${SERVER_HOST}/auth/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    await getAccountsData()
    toast.success('Account deleted successfully.')
  } catch (err) {
    console.error(err)
    toast.error('Error deleting account.')
  }

}

onMounted(() => {
  getAccountsData()
})
</script>

<style scoped>
@import '@/style/account.css';
</style>
