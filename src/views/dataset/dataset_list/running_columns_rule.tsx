import { Columns } from "element-plus";
import { formatTimestamp } from "@/utils/time";

import { h, ref } from "vue";
import OptionButton from "./OptionButton.vue";
import { Status2CnName } from "@/views/dataset/utils/types";

export const runningColumnsRule: Columns<any> = [
  { key: "datasetId", dataKey: "datasetId", title: "数据集id", width: 100 },
  {
    key: "datasetName",
    dataKey: "datasetName",
    title: "数据集名",
    width: 200
  },
  {
    key: "valueTotal",
    dataKey: "valueTotal",
    title: "value总数",
    width: 100
  },
  {
    key: "delim",
    dataKey: "delim",
    title: "分隔符",
    width: 100,
    cellRenderer: ({ cellData: v }) => <el-tag type="primary">{ v }</el-tag>
  },
  {
    key: "progress",
    title: "已处理数据量",
    width: 300,
    cellRenderer: v => {
      let p = 0;
      if (v?.rowData?.chunkTotal > 0) {
        p = Math.floor(
          ((v?.rowData?.chunkProcessedCount ?? 0) * 100) /
          v?.rowData?.chunkTotal
        );
      }
      if (p > 100) p = 100;
      let status = undefined;
      switch (v?.rowData?.status ?? 0) {
        case 3:
          status = "success";
          break;
        case 1:
        case 4:
        case 5:
        case 7:
          status = "warning";
          break;
      }
      return (
        <div class="flex items-center gap-2">
          <el-Progress
            stroke-width={10}
            status={status}
            percentage={p}
            style={"width: 300px"}
          />
        </div>
      );
    }
  },
  {
    key: "processDataTotal",
    title: "数据量",
    width: 150,
    cellRenderer: v => {
      let total = v?.rowData?.chunkTotal || "未知";
      return (
        <span style="font-weight: bold;">
          {v?.rowData?.chunkProcessedCount ?? 0} / {total}
        </span>
      );
    }
  },
  {
    key: "status",
    title: "任务状态",
    width: 150,
    cellRenderer: v => {
      let style = "font-weight: bold;";
      switch (v?.rowData?.status ?? 0) {
        case 3:
          style = "color: darkgreen; font-weight: bold;";
          break;
        case 1:
        case 4:
        case 5:
        case 6:
          style = "color: #f17619; font-weight: bold;";
          break;
      }
      return (
        <div>
          <span style={style}>{Status2CnName[v?.rowData?.status ?? 0]}</span>
          <br />
          <span>{v?.rowData?.statusInfo}</span>
        </div>
      );
    }
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
