import { createRouter, createWebHistory } from "vue-router";
import { $t } from "@/i18n/index";
const routes = [
  {
    path: "/",
    // redirect: "/lucky",
    name: "index",
    meta: { title: "index" },
    component: () => import("@/views/luckyCanvas/index.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "404",
    meta: { title: "404" },
    component: () => import("@/views/404.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
