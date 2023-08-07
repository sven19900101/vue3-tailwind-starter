import { defineStore } from "pinia";
import { getOrderState, getAssociateType } from "@/api/orders";
export const useOrderStore = defineStore("order", {
  state: () => ({
    remainTime: 5,
    totalLucyTime: 5,
  }),
  actions: {
    setRemainTime(value: number) {
      this.remainTime = value;
    },
  },
  persist: [
    {
      paths: ["remainTime"],
      storage: localStorage,
    },
  ],
});
