import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePaidStore = defineStore('paid', () => {
  const isPaid = ref(false);

  function updatePaid(paid) {
    isPaid.value = paid;
  }

  return { isPaid, updatePaid };
});
