import { createApp } from "vue";
import "./index.css";
import "@vant/touch-emulator";
// Toast
import "vant/es/toast/style";
// Dialog
import "vant/es/dialog/style";
// Notify
import "vant/es/notify/style";
// ImagePreview
import "vant/es/image-preview/style";
// import "amfe-flexible/index.js";
import VueAnimXyz from "@animxyz/vue3";
import { $t, i18n } from "@/i18n";
import "@animxyz/core";
import App from "./App.vue";
import pinia from "@/store/index";
import router from "./router/route";
import "@/router/permission";
export const app = createApp(App);
app.use(router).use(pinia).use(VueAnimXyz);
app.use(i18n);
app.config.globalProperties.$t = $t;
app.mount("#app");
console.log(import.meta.env.VITE_APP_UPLOAD_URL);