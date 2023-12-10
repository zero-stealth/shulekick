<template>
  <div class="navigation-section">
    <IconArrow class="icon-back" @click="goback" />
  </div>
</template>
<script setup>
import IconArrow from '@/icons/IconArrow.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goback = () => {
  router.go(-1)
}
</script>
<style>
@import '@/style/navigation.css';
</style>
