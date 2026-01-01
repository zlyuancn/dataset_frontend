import { Columns } from "element-plus";
import { formatTimestamp } from "@/utils/time";
import { DatasetSysLogInfo } from "@/api/dataset";

export function createSyslogColumns(
  availableWidth: number,
  expandAllExtend: boolean,
): Columns<DatasetSysLogInfo> {
  const fixedWidth = 200 + 100 + 200; // createTime + logType + remark
  const extendWidth = Math.max(300, availableWidth - fixedWidth); // 最小 300px
  return [
    {
      key: "id",
      dataKey: "id",
      title: "index",
      width: 50
    },
    {
      key: "createTime",
      dataKey: "createTime",
      title: "时间",
      width: 200,
      cellRenderer: ({ cellData: v }) => (
        <span>{formatTimestamp(Number(v) / 1000)}</span>
      )
    },
    {
      key: "logType",
      dataKey: "logType",
      title: "level",
      width: 100,
      cellRenderer: ({ cellData: v }) => {
        if (!v || Number(v) == 0) return <el-tag type="primary">INFO</el-tag>;
        else if (Number(v) == 1) return <el-tag type="warning">INFO</el-tag>;
        else if (Number(v) == 2) return <el-tag type="danger">INFO</el-tag>;
      }
    },
    { key: "remark", dataKey: "remark", title: "备注", width: 300 },
    {
      key: "extend",
      dataKey: "extend",
      title: "扩展数据",
      width: extendWidth,
      cellRenderer: ({ cellData: v }) => {
        if (!v) return <span class="text-gray-400">-</span>;
        if (expandAllExtend) return <span>{v}</span>
        return (
          <span
            title={v} // 鼠标悬停显示完整内容
            style={{
              display: "inline-block",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {v}
          </span>
        );
      }
    }
  ];
}
