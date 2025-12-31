<script setup lang="ts">
import CollapsibleBox from "@/components/CollapsibleBox/index.vue";
import { ref } from "vue";
import { datasetClient, DatasetQuerySyslogReq } from "@/api/dataset_client";
import { message } from "@/utils/message";

// 使用类型声明方式定义 props
const props = defineProps<{
  datasetId?: string;
}>();

const columns = [
  { key: "id", title: "ID", width: 100 },
  { key: "name", title: "Name", width: 200 },
  { key: "createdAt", title: "Created At", width: 200 }
];

// 响应式状态
const tableData = ref([]);
const nextCursor = ref('0'); // 初始为 0 ，表示第一页
const isLoading = ref(false);
const hasMore = ref(true); // 是否还有更多数据
const error = ref(false);

// 根据 cursor 获取下一批数据
async function fetchWithCursor() {
  error.value = '正在查询';
  if (props.datasetId ?? 0 < 1) {
    error.value = 'datasetId is 0'
    return;
  }

  error.value = false;
  isLoading.value = true;
  await datasetClient.datasetServiceQuerySyslog({
    datasetId: props.datasetId,
    nextCursor: nextCursor.value,
    pageSize: 20,
  })
    .then(result => {
      console.log(result, result?.data);
      nextCursor.value = result?.data?.nextCursor ?? '0';
      hasMore.value = nextCursor.value != '0';
    })
    .catch(err => {
      console.log(err);
      const errMsg = err?.response?.data?.message ?? err;
      message("查询syslog失败\n" + errMsg, { type: "error" });
    });
  isLoading.value = false;
}

// 加载更多（滚动触发）
async function handleLoadMore() {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;
  error.value = false;

  try {
    const res = await fetchWithCursor(nextCursor.value);
    tableData.value = [...tableData.value, ...res.data]; // 关键：合并新数据
    nextCursor.value = res.nextCursor;
    hasMore.value = !!res.nextCursor;
  } catch (err) {
    error.value = true;
    console.error("Failed to load more:", err);
    // 可选：显示重试按钮
  } finally {
    isLoading.value = false;
  }
}

// 初始化
fetchWithCursor();
</script>

<template>
  <CollapsibleBox label="syslog" hide-btn>
    <el-table-v2
      :columns="columns"
      :data="tableData"
      :width="800"
      :height="500"
      :row-height="60"
      :on-end-reached="handleLoadMore"
      :on-end-reached-threshold="200"
      v-if="!error"
    />
    <div v-else>加载失败，请重试</div>
  </CollapsibleBox>
</template>
