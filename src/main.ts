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
import "@animxyz/core";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia().use(piniaPluginPersistedstate);
import router from "./router/route";
createApp(App).use(router).use(pinia).use(VueAnimXyz).mount("#app");
