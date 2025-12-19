import { reactive } from "vue";
import { DatasetFormData } from "@/views/dataset/utils/types";
import {
  DatasetChunkProcess,
  DatasetCompressType,
  DatasetDataProcess,
  DatasetDatasetExtend,
  DatasetDatasetInfoA,
  DatasetDataSource,
  DatasetValueProcess
} from "@/api/dataset";

const initDatasetListQueryArgs = {
  pageSize: 15,
  datasetId: 0,
  status: "0",
  rangeTime: [],
  nextCursor: 0,
  opUser: ""
};

// 列表查询页中 tab 转 status 参数
export const datasetListQueryStatusArgsTransform = {
  "0": [3], // 可用的
  "1": [0, 5], // 未处理
  "2": [2, 4], // 处理中
  "3": [7] // 删除中
};

// 数据集表单初始化数据
export const genDatasetFormInitData = function (): DatasetFormData {
  return {
    datasetId: 0,
    datasetName: "",
    remark: "",
    datasetExtend: <DatasetDatasetExtend> {
      dataProcess: <DatasetDataProcess>{
        dataSource: DatasetDataSource.None
      },
      chunkProcess: <DatasetChunkProcess>{
        storeType: 0,
        compressType: DatasetCompressType.None
      },
      valueProcess: <DatasetValueProcess>{
        delim: "",
        trimSpace: true,
        trimPrefix: "",
        trimSuffix: "",
        filterSubString: "",
        filterPrefix: "",
        filterSuffix: ""
      }
    },
    opRemark: ""
  };
};

// 将服务端返回的数据集转为表单数据
export const DatasetInfoA2DatasetFormData = (
  formData: DatasetFormData,
  line: DatasetDatasetInfoA
) => {
  Object.assign(formData, <DatasetFormData>{
    datasetId: Number(line.datasetId),
    datasetName: line.datasetName || "",
    remark: line.remark || "",
    datasetExtend: line?.datasetExtend || genDatasetFormInitData().datasetExtend,
    opRemark: line?.op?.opRemark || ""
  });
};

// 数据集列表查询参数
export const datasetListQueryArgs = reactive(
  Object.assign({}, initDatasetListQueryArgs)
);

// 重置查询参数
export const resetDatasetListQueryArgs = () =>
  Object.assign(datasetListQueryArgs, initDatasetListQueryArgs);
