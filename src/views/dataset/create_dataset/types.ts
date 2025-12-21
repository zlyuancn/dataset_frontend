
// 数据集表单类型
import { DatasetDatasetExtend } from "@/api/dataset";

export interface DatasetFormData {
  datasetId: number; // 数据集id
  datasetName: string; // 数据集名
  remark: string; // 备注

  datasetExtend: DatasetDatasetExtend;

  opRemark?: string; // 操作备注
}
