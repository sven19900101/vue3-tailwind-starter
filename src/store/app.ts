import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
  state: () => ({
    appName: "纵横",
    device: "H5",
    language: "zh",
    currencySymbol: "¥",
  }),
  actions: {
    setAppName(appName: string) {
      this.appName = appName;
    },
    setCurrencySymbol(currencySymbol: string) {
      this.currencySymbol = currencySymbol;
    },
    setDevice(device: string) {
      this.device = device;
    },
    setLanguage(language: string) {
      this.language = language;
    },
  },
  // persist: true,//全部持久化
  persist: [
    {
      paths: ["appName", "language"],
      storage: localStorage, //指定持久化存储storage
    },
    {
      paths: ["device"],
      storage: sessionStorage, //指定持久化存储storage
    },
  ],
});
