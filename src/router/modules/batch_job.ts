export default {
  path: "/Dataset",
  redirect: "/Dataset/DatasetList",
  meta: {
    title: "数据集"
  },
  children: [
    {
      path: "/Dataset/DatasetList",
      name: "DatasetList",
      component: () => import("@/views/dataset/dataset_list/index.vue"),
      meta: {
        title: "数据集列表"
      }
    }
  ]
} as RouteConfigsTable;
