import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    logOut() {
      return new Promise((resolve, reject) => {
        // const router = useRouter();
        this.token = "";
        resolve("");
      });
    },
  },
  persist: [
    {
      paths: ["token"],
      storage: localStorage,
    },
  ],
});
