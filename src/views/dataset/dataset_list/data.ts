
// ------ 查询参数 ------

// 查询参数初始化数据
import { reactive } from "vue";

const genDatasetListQueryArgsInitData = () => {
  return {
    page: 1,
    pageSize: 20,
    dataTotal: 0,
    datasetId: "",
    status: "0",
    rangeTime: [],
    nextCursor: 0,
    opUser: ""
  };
};

// 数据集列表查询参数
export const datasetListQueryArgs = reactive(genDatasetListQueryArgsInitData());

// 重置查询参数
export const resetDatasetListQueryArgs = () =>
  Object.assign(datasetListQueryArgs, genDatasetListQueryArgsInitData());

// 列表查询页中 tab 转 status 参数
export const datasetListQueryStatusArgsTransform = {
  "0": [3], // 可用的
  // "1": [0, 5], // 未处理
  "2": [0, 2, 4, 5], // 处理中
  "3": [7] // 删除中
};
