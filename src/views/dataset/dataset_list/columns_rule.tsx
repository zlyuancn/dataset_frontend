import { Columns } from "element-plus";
import { formatTimestamp } from "@/views/dataset/utils/time";

import { h, ref } from "vue";
import OptionButton from "./OptionButton.vue";

export const columnsRule: Columns<any> = [
  { key: "datasetId", dataKey: "datasetId", title: "数据集id", width: 100 },
  {
    key: "datasetName",
    dataKey: "datasetName",
    title: "数据集名",
    width: 200
  },
  {
    key: "createTime",
    dataKey: "createTime",
    title: "创建时间",
    width: 150,
    cellRenderer: ({ cellData: v }) => <span>{formatTimestamp(v)}</span>
  },
  {
    key: "opTime",
    title: "更新时间",
    width: 150,
    cellRenderer: v => <span>{formatTimestamp(v?.rowData?.op?.opTime)}</span>
  },
  {
    key: "opUser",
    title: "操作用户",
    width: 150,
    cellRenderer: v => (
      <span>
        {v?.rowData?.op?.opUserid} ({v?.rowData?.op?.opUserName})
      </span>
    )
  },
  { key: "opRemark", dataKey: "op.opRemark", title: "操作描述", width: 200 },
  {
    key: "operations",
    title: "",
    cellRenderer: v => {
      const updateStatus = status => {
        v.rowData.status = status;
      };
      return h(OptionButton, {
        datasetId: Number(v.rowData.datasetId),
        status: Number(v.rowData.status) ?? 0,
        updateStatus: updateStatus
      });
    },
    width: 300,
    align: "left"
  }
];
