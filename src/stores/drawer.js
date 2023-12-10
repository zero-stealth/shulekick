import { ref } from "vue";
import { defineStore } from "pinia";

export const useDrawerStore = defineStore("drawer", () => {
  const IsOpen = ref(false);

  const toggleDrawer = () => {
    IsOpen.value = !IsOpen.value;
  };


  return {
    IsOpen,
    toggleDrawer,
  };
});
