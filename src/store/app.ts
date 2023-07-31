import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    appName: "综合",
    device: "H5",
  }),
  actions: {
    setAppName(appName: string) {
      this.appName = appName;
    },
    setDevice(device: string) {
      this.device = device;
    },
  },
  // persist: true,//全部持久化
  persist: [
    {
      paths: ["appName"],
      storage: localStorage, //指定持久化存储storage
    },
    {
      paths: ["device"],
      storage: sessionStorage, //指定持久化存储storage
    },
  ],
});
