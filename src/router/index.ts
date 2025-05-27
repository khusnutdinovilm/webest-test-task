import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "layouts/main-layout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "tender-list-page",
          component: () => import("pages/tender-list-page.vue"),
        },
        {
          path: "/:tender_id",
          name: "tender-detail-page",
          component: () => import("pages/tender-detail-page.vue"),
        },
      ],
    },
  ],
});

export default router;
