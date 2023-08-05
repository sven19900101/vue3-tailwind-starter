import { defineStore } from "pinia";
import { getOrderState, getAssociateType } from "@/api/orders";
export const useOrderStore = defineStore("order", {
  state: () => ({
    orderState: [],
    associateType: [],
  }),
  actions: {
    getOrderState() {
      getOrderState().then((res) => {
        this.orderState = res.data;
      });
    },
    getAssociateType() {
      getAssociateType().then((res) => {
        this.associateType = res.data;
      });
    },
  },
  persist: [
    {
      paths: ["orderState", "associateType"],
      storage: sessionStorage,
    },
  ],
});
