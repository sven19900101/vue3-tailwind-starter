import router from "./route";
import { useUserStore } from "@/store/user";
const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (userStore.token) {
    // to.meta.title && useSettingsStore().setTitle(to.meta.title);
    /* has token*/
    if (to.path === "/login") {
      next({ path: "/" });
    }
    next();
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      userStore.logOut();
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
    }
  }
});

router.afterEach((to, from) => {});
