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
    },
    {
      path: "/Dataset/CreateDataset",
      name: "CreateDataset",
      component: () => import("@/views/dataset/create_dataset/index.vue"),
      meta: {
        title: "添加数据集",
        showLink: false
      }
    },
    {
      path: "/Dataset/ChangeDataset",
      name: "ChangeDataset",
      component: () => import("@/views/dataset/create_dataset/index.vue"),
      meta: {
        title: "修改数据集",
        showLink: false
      }
    },
    {
      path: "/Dataset/ViewDataset",
      name: "ViewDataset",
      component: () => import("@/views/dataset/create_dataset/index.vue"),
      meta: {
        title: "查看数据集",
        showLink: false
      }
    },
  ]
} as RouteConfigsTable;
