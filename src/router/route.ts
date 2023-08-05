import { createRouter, createWebHistory } from "vue-router";
import { $t } from "@/i18n/index";
const routes = [
  {
    path: "/login",
    name: "login",
    meta: { title: $t("login") },
    component: () => import("@/views/user/login.vue"),
  },
  {
    path: "/",
    redirect: "/grabList",
    name: "index",
    meta: { title: "index" },
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "grabList",
        meta: { title: $t("qdlb") },
        name: "grabList",
        component: () => import("@/views/userOrder/grabOrderList.vue"),
      },
      {
        path: "myOrderlist",
        meta: { title: $t("wddd") },
        name: "myOrderlist",
        component: () => import("@/views/userOrder/myOrderlist.vue"),
      },
    ],
  },
  {
    path: "/certificate",
    name: "certificate",
    meta: { title: $t("scpz") },
    component: () => import("@/views/userOrder/certificate.vue"),
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
