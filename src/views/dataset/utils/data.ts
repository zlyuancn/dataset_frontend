import { reactive } from "vue";

const initDatasetListQueryArgs = {
  pageSize: 15,
  datasetId: 0,
  status: 0,
  rangeTime: [],
  nextCursor: 0,
  opUser: ""
};

// 数据集列表查询参数
export const datasetListQueryArgs = reactive(
  Object.assign({}, initDatasetListQueryArgs)
);

// 重置查询参数
export const resetDatasetListQueryArgs = () =>
  Object.assign(datasetListQueryArgs, initDatasetListQueryArgs);

export const datasetListQueryStatusArgsTransform = {
  0: [0],
}
