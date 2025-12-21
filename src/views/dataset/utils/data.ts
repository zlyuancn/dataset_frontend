import { reactive } from "vue";
import { DatasetFormData } from "@/views/dataset/utils/types";
import {
  DatasetChunkProcess,
  DatasetCompressType,
  DatasetDataProcess,
  DatasetDatasetExtend,
  DatasetDatasetInfoA,
  DatasetDataSourceUriFile,
  DatasetKV,
  DatasetValueProcess
} from "@/api/dataset";

const genDatasetListQueryArgsInitData = () => {
  return {
    pageSize: 15,
    datasetId: 0,
    status: "0",
    rangeTime: [],
    nextCursor: 0,
    opUser: ""
  };
};

// 列表查询页中 tab 转 status 参数
export const datasetListQueryStatusArgsTransform = {
  "0": [3], // 可用的
  "1": [0, 5], // 未处理
  "2": [2, 4], // 处理中
  "3": [7] // 删除中
};

// 数据集列表查询参数
export const datasetListQueryArgs = reactive(genDatasetListQueryArgsInitData());

// 重置查询参数
export const resetDatasetListQueryArgs = () =>
  Object.assign(datasetListQueryArgs, genDatasetListQueryArgsInitData());

// 数据集表单初始化数据
export const genDatasetFormInitData = (): DatasetFormData => {
  return <DatasetFormData>{
    datasetId: 0,
    datasetName: "",
    remark: "",
    datasetExtend: <DatasetDatasetExtend>{
      dataProcess: <DatasetDataProcess>{
        dataSource: 1,
        uriFile: <DatasetDataSourceUriFile>{
          uri: "",
          headers: <Array<DatasetKV>>[],
          insecureSkipVerify: false,
          proxy: "",
          method: "GET"
        }
      },
      chunkProcess: <DatasetChunkProcess>{
        storeType: 1,
        compressType: DatasetCompressType.NUMBER_0
      },
      valueProcess: <DatasetValueProcess>{
        delim: ",",
        trimSpace: true,
        trimPrefix: [],
        trimSuffix: [],
        filterSubString: [],
        filterPrefix: [],
        filterSuffix: []
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
  const initData = genDatasetFormInitData()
  Object.assign(formData, <DatasetFormData>{
    datasetId: Number(line.datasetId || 0),
    datasetName: line.datasetName || "",
    remark: line.remark || "",
    datasetExtend: <DatasetDatasetExtend>{
      dataProcess: <DatasetDataProcess>{
        dataSource: line?.datasetExtend?.dataProcess?.dataSource || initData.datasetExtend.dataProcess.dataSource,
        uriFile: <DatasetDataSourceUriFile>{
          uri: line?.datasetExtend?.dataProcess?.uriFile?.uri || initData.datasetExtend.dataProcess.uriFile.uri,
          headers: line?.datasetExtend?.dataProcess?.uriFile?.headers || initData.datasetExtend.dataProcess.uriFile.headers,
          insecureSkipVerify: line?.datasetExtend?.dataProcess?.uriFile?.insecureSkipVerify || initData.datasetExtend.dataProcess.uriFile.insecureSkipVerify,
          proxy: line?.datasetExtend?.dataProcess?.uriFile?.proxy || initData.datasetExtend.dataProcess.uriFile.proxy,
          method: line?.datasetExtend?.dataProcess?.uriFile?.method || initData.datasetExtend.dataProcess.uriFile.method,
        }
      },
      chunkProcess: <DatasetChunkProcess>{
        storeType: line?.datasetExtend?.chunkProcess?.storeType || initData.datasetExtend.chunkProcess.storeType,
        compressType: line?.datasetExtend?.chunkProcess?.compressType || initData.datasetExtend.chunkProcess.compressType
      },
      valueProcess: <DatasetValueProcess>{
        delim: line?.datasetExtend?.valueProcess?.delim || initData.datasetExtend.valueProcess.delim,
        trimSpace: line?.datasetExtend?.valueProcess?.trimSpace || initData.datasetExtend.valueProcess.trimSpace,
        trimPrefix: line?.datasetExtend?.valueProcess?.trimPrefix || initData.datasetExtend.valueProcess.trimPrefix,
        trimSuffix: line?.datasetExtend?.valueProcess?.trimSuffix || initData.datasetExtend.valueProcess.trimSuffix,
        filterSubString: line?.datasetExtend?.valueProcess?.filterSubString || initData.datasetExtend.valueProcess.filterSubString,
        filterPrefix: line?.datasetExtend?.valueProcess?.filterPrefix || initData.datasetExtend.valueProcess.filterPrefix,
        filterSuffix: line?.datasetExtend?.valueProcess?.filterSuffix || initData.datasetExtend.valueProcess.filterSuffix
      }
    },
    opRemark: line?.op?.opRemark || ""
  });
};

// 数据处理-数据源类型选项
export const dataProcessDataSourceOptions = [
  {
    value: 1,
    label: "uri文件",
    desc: "远程文件"
  },
];

// 数据处理-uriFile-请求方法
export const dataProcessUriFileMethodOptions = [
  {
    value: 'GET',
    label: "GET",
  },
  {
    value: 'POST',
    label: "POST",
  },
  {
    value: 'PUT',
    label: "PUT",
  },
  {
    value: 'PATCH',
    label: "PATCH",
  },
  {
    value: 'HEAD',
    label: "HEAD",
  },
  {
    value: 'DELETE',
    label: "DELETE",
  }
];

// chunk处理-chunk持久化目标选项
export const chunkProcessStoreTypeOptions = [
  {
    value: 1,
    label: "Redis String",
    desc: "一个 chunk 存放于Redis的一个string中"
  }
];

// chunk处理-chunk压缩类型选项
export const chunkProcessCompressTypeOptions = [
  {
    value: 0,
    label: "无",
  },
  {
    value: 1,
    label: "Lz4",
    desc: "LZ4是一种无损数据压缩算法,着重于压缩和解压的速度"
  }
];
