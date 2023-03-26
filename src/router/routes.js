const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "index",
        component: () => import("@/pages/IndexPage.vue"),
      },
      {
        path: "/serviceReceiver",
        name: "serviceReceiver",
        component: () => import("@/pages/ServiceReceiver/ServiceReceiver.vue"),
      },
      {
        path: "/:catchAll(.*)*",
        component: () => import("@/pages/ErrorNotFound.vue"),
      },
    ],
  },
];

export default routes;
