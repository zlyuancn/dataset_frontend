<script setup lang="ts">
import CollapsibleBox from "@/components/CollapsibleBox/index.vue";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { datasetClient, DatasetSysLogInfo } from "@/api/dataset_client";
import { message } from "@/utils/message";
import { createSyslogColumns } from "./syslog_columns_rule";

// 使用类型声明方式定义 props
const props = defineProps<{
  datasetId?: string;
}>();

// 响应式状态
const isLoading = ref(false);
const error = ref("");
const nextCursor = ref("0"); // 初始为 0 ，表示第一页
const hasMore = ref(true); // 是否还有更多数据
const tableData = ref<Array<DatasetSysLogInfo>>([]); // 数据

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
  await datasetClient
    .datasetServiceQuerySyslog({
      datasetId: props.datasetId,
      nextCursor: nextCursor.value,
      pageSize: 20
    })
    .then(result => {
      console.log(result, result?.data);
      tableData.value.push(...(result?.data?.lines || [])); // 数据合并
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

// 初始化
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

// 表格宽度自适应
const tableContainerRef = ref<HTMLDivElement | null>(null);
const tableWidth = ref(800); // 默认 宽度
function updateTableWidth() {
  if (tableContainerRef.value) {
    // 获取父容器的 content width（不含 padding）
    tableWidth.value = Math.min(tableContainerRef.value.clientWidth, 1800);
  }
}
onMounted(() => {
  updateTableWidth();
  window.addEventListener("resize", updateTableWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateTableWidth);
});
const syslogColumnsRule = computed(() => {
  return createSyslogColumns(tableWidth.value);
});
</script>

<template>
  <CollapsibleBox label="syslog" hide-btn>
    <!-- 包裹一个 div 用于测量宽度 -->
    <div ref="tableContainerRef" style="width: 100%; overflow: auto">
      <el-table-v2
        :columns="syslogColumnsRule"
        :data="tableData"
        :width="tableWidth"
        :height="500"
        :row-height="60"
        @end-reached="loadNextData"
        v-if="error == ''"
      />
      <div v-else>
        <span>加载失败，请重试</span>
        <el-button type="primary" size="small" @click="loadNextData"
          >重试</el-button
        >
      </div>
    </div>
  </CollapsibleBox>
</template>
