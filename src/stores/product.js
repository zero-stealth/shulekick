import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const productId = ref(null);

  const updateId = (id) => {
    productId.value = id;
  };



  return {
    productId,
    updateId,
  };
});
