// 执行类型转中文名
import { DatasetKV } from "@/api/dataset";

// 状态类型转中文名
export const Status2CnName = {
  0: "已创建",
  2: "运行中",
  3: "已完成",
  4: "正在停止",
  5: "已停止",
  7: "正在删除",
  8: "元数据已删除成"
};

// 操作来源
export enum OpSource {
  Web = "Web"
}

// 数据集表单类型
export interface DatasetData {
  datasetId: number; // 数据集id
  datasetName: string; // 数据集名
  remark: string; // 备注

  status: number; // 状态
  opRemark?: string; // 操作备注
}
