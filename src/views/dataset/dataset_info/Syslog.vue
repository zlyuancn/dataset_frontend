<script setup lang="tsx">
import CollapsibleBox from "@/components/CollapsibleBox/index.vue";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import {
  datasetClient,
  DatasetQuerySyslogReq,
  DatasetSysLogInfo
} from "@/api/dataset_client";
import { message } from "@/utils/message";
import { createSyslogColumns } from "./syslog_columns_rule";
import JsonView from "./JsonView.vue";
import type { TableV2Instance } from "element-plus";
import { date2Timestamp } from "@/utils/time";

// 使用类型声明方式定义 props
const props = defineProps<{
  datasetId?: string;
}>();

// 响应式状态
const isLoading = ref(false);
const error = ref("");
const nextCursor = ref("0"); // 初始为 0 ，表示第一页
const hasMore = ref(true); // 是否还有更多数据
const tableData = ref<(DatasetSysLogInfo & { children?: any[] })[]>([]); // 数据

// 根据 cursor 获取下一批数据
async function loadNextData() {
  console.info("Load NextData");
  if (isLoading.value || !hasMore.value) return;
  console.info("Load NextData 2", props);

  if (Number(props.datasetId ?? 0) < 1) {
    error.value = "datasetId is 0";
    return;
  }

  isLoading.value = true;
  let req: DatasetQuerySyslogReq = {
    datasetId: props.datasetId,
    nextCursor: nextCursor.value,
    pageSize: 20
  };
  if (rangeTime.value?.length == 2) {
    req.startTime = String(date2Timestamp(rangeTime.value[0]) * 1000);
    req.endTime = String(date2Timestamp(rangeTime.value[1]) * 1000);
  }
  await datasetClient
    .datasetServiceQuerySyslog(req)
    .then(result => {
      const offset = tableData.value?.length ?? 0; // 为数据虚拟id的偏移值
      let lines = result?.data?.lines;
      lines?.map((line, index) => {
        line.id = index + offset; // 为数据虚拟id
        // 如果有扩展数据则附加 children 用于展开
        if (line.extend) {
          line.children = [{ extendExtend: line.extend }];
        }
        return line;
      });
      // tableData.value.push(...(lines || [])); // 数据合并
      tableData.value = [...tableData.value, ...(lines || [])]; // 数据合并
      nextCursor.value = result?.data?.nextCursor ?? "0";
      hasMore.value = nextCursor.value != "0";
      error.value = "";
    })
    .catch(err => {
      console.log(err);
      const errMsg = err?.response?.data?.message ?? err;
      message("查询syslog失败\n" + errMsg, { type: "error" });
    });
  isLoading.value = false;
}

// 初始化后立即加载第一批数据
watch(
  () => props.datasetId,
  newId => {
    console.log(newId);
    if (newId && newId !== "") {
      // 重置状态, 避免旧数据残留
      tableData.value = [];
      nextCursor.value = "0";
      hasMore.value = true;
      error.value = "";
      // 确保 DOM 更新后再加载（可选，但更稳妥）
      nextTick(() => {
        loadNextData();
      });
    }
  },
  { immediate: true } // 立即执行一次，用于处理初始就有 datasetId 的情况
);

// ----- 表格宽度自适应 -----
const tableContainerRef = ref<HTMLDivElement | null>(null);
const tableWidth = ref(800); // 默认 宽度
function updateTableWidth() {
  if (tableContainerRef.value) {
    // 获取父容器的 content width（不含 padding）
    const rect = tableContainerRef.value.getBoundingClientRect();
    const w = Math.floor(rect.width); // 取整避免小数问题
    console.log("[DEBUG] Table container width (getBoundingClientRect):", w);
    tableWidth.value = Math.max(800, Math.min(w, 1800));
  }
}
let resizeObserver: ResizeObserver | null = null;
onMounted(() => {
  updateTableWidth();
  if (tableContainerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateTableWidth();
    });
    resizeObserver.observe(tableContainerRef.value);
  }
});
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
const syslogColumnsRule = computed(() => {
  return createSyslogColumns(tableWidth.value, expandAllExtend.value);
});

// ----- 点击 extend 显示更友好的 json 组件 -----
const Row = ({ cells, rowData }: { cells: any; rowData: any }) => {
  if (rowData?.extendExtend) {
    return (
      <div class="json-expand-panel">
        <JsonView raw={rowData.extendExtend} />
      </div>
    );
  }
  // 否则是普通行
  return (
    <div
      style={{
        minHeight: "40px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center"
      }}
    >
      {cells}
    </div>
  );
};
Row.inheritAttrs = false;
const expandAllExtend = ref(false);
watch(
  () => expandAllExtend.value,
  () => {
    tableKey.value += 1;
  }
);

// 选择器
async function refFilter() {
  tableData.value = [];
  nextCursor.value = "0";
  hasMore.value = true;
  error.value = "";

  // 重置滚动
  tableKey.value += 1;

  // 加载数据
  loadNextData();
}
const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59)
]);
const rangeTime = ref([]);

// ----- 修复滚动 -----
const tableKey = ref(0); // 初始 key
</script>

<template>
  <CollapsibleBox label="syslog" hide-btn>
    <el-date-picker
      v-model="rangeTime"
      type="datetimerange"
      unlink-panels
      range-separator="To"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="defaultTime"
      @change="refFilter"
    />
    <el-switch v-model="expandAllExtend" active-text="extend"></el-switch>
    <el-button type="primary" @click="refFilter">查询</el-button>
    <!-- 这个 div 用于测量宽度 -->
    <div
      ref="tableContainerRef"
      style="width: 100%; min-width: 0; box-sizing: border-box"
    >
      <el-table-v2
        :key="tableKey"
        :columns="syslogColumnsRule"
        :data="tableData"
        :width="tableWidth"
        :height="800"
        @end-reached="loadNextData"
        v-if="error === ''"
        :estimated-row-height="300"
        :expand-column-key="'extend'"
      >
        <template #row="props">
          <Row v-bind="props" />
        </template>
      </el-table-v2>
      <div v-else>
        <span>加载失败，请重试</span>
        <el-button type="primary" size="small" @click="loadNextData"
          >重试</el-button
        >
      </div>
    </div>
  </CollapsibleBox>
</template>
