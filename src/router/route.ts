import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    meta: { title: "home" },
    component: () => import("@/views/home.vue"),
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
