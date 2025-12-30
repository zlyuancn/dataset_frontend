<script setup lang="ts">
// 业务列表
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  DatasetDatasetInfoByListA,
  DatasetDatasetStateInfo,
  DatasetQueryDatasetListReq,
  DatasetQueryDatasetListRsp,
  DatasetQueryDatasetStatusInfoReq
} from "@/api/dataset";
import { datasetClient } from "@/api/dataset_client";
import { columnsRule } from "./columns_rule";
import { runningColumnsRule } from "./running_columns_rule";
import { Loading } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import {
  datasetListQueryArgs,
  datasetListQueryStatusArgsTransform,
  resetDatasetListQueryArgs
} from "./data";
import { date2Timestamp } from "@/utils/time";
import iconSearch from "~icons/ep/search";
import iconAdd from "~icons/ep/document-add";
import { ElAutoResizer } from "element-plus";

// 数据集列表
defineOptions({
  name: "DatasetList"
});

const isLoading = ref(false);
const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59)
]);

const queryDataIsChange = ref(true);
watch(datasetListQueryArgs, newV => {
  queryDataIsChange.value = true;
});
watch(
  () => datasetListQueryArgs.rangeTime,
  newV => {
    queryDataIsChange.value = true;
    submitQuery();
  }
);

const router = useRouter();

function resetQuery(): void {
  resetDatasetListQueryArgs();
  submitQuery();
}
function forceQuery(): void {
  queryDataIsChange.value = true;
  submitQuery();
}
const submitQuery = () => {
  if (!queryDataIsChange.value) {
    return;
  }
  queryDataIsChange.value = false;

  isLoading.value = true;
  const req: DatasetQueryDatasetListReq = {
    page: datasetListQueryArgs.page,
    pageSize: datasetListQueryArgs.pageSize,
    datasetId: String(datasetListQueryArgs.datasetId || "0"),
    status: datasetListQueryStatusArgsTransform[datasetListQueryArgs.status],
    opUser: datasetListQueryArgs.opUser
  };
  if (datasetListQueryArgs?.rangeTime.length == 2) {
    req.startTime = String(date2Timestamp(datasetListQueryArgs.rangeTime[0]));
    req.endTime = String(date2Timestamp(datasetListQueryArgs.rangeTime[1]));
  }

  datasetClient
    .datasetServiceQueryDatasetList(req)
    .then(res => {
      processApiData(res.data);
    })
    .catch(err => {
      const errMsg = err?.response?.data?.message ?? err;
      data.value = [];
      message("数据获取失败\n" + errMsg, { type: "error" });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const data = ref<Array<DatasetDatasetInfoByListA>>([]);

// 数据处理
function processApiData(r: DatasetQueryDatasetListRsp) {
  data.value = r.lines ?? [];
  if (datasetListQueryArgs.page == 1) {
    datasetListQueryArgs.dataTotal = r.total ?? 0;
  }

  // 对于非完成状态的立即查询一次数据状态
  isReloadAll = true;
}

// 状态变更
function statusChange() {
  submitQuery();
}

// 立即刷新
submitQuery();

function createDataset() {
  router.push({
    name: "CreateDataset"
  });
}

let timer = null;
// 定时任务
onMounted(() => {
  // 创建定时任务（每1秒执行一次）
  timer = setInterval(() => {
    reloadRunningDataset();
  }, 2000);
});

onBeforeUnmount(() => {
  // 清除定时器
  clearInterval(timer);
});

// 重新加载处理中的数据集
let isReloadRunningDataset = false;
let isReloadAll = false;
const reloadRunningDataset = () => {
  if (isReloadRunningDataset) {
    return;
  }
  isReloadRunningDataset = true;

  const d2 = data.value.filter(v => {
    let status = Number(v.status || 0);
    return (isReloadAll && status != 0 && status != 3) || status == 2 || status == 4 || status == 7;
  });
  isReloadAll = false
  const ids = d2.map(v => v.datasetId);
  if (ids.length == 0) {
    isReloadRunningDataset = false;
    return;
  }

  const req = <DatasetQueryDatasetStatusInfoReq>{
    datasetIds: ids
  };
  datasetClient
    .datasetServiceQueryDatasetStatusInfo(req, { closeNProgress: true })
    .then(res => {
      // 创造map
      let mm = <Array<DatasetDatasetStateInfo>>{};
      res.data?.datasetStateInfos?.map(v => {
        mm[v.datasetId] = v;
      });

      // 更新数据
      data.value = data.value.map(v => {
        let nv = mm[v.datasetId];
        return nv ? Object.assign(v, nv) : v;
      });
    })
    .finally(() => {
      isReloadRunningDataset = false;
    });
};

// 数据集搜索
let searchDebounceTimer = null // 防抖定时器
const searchDatasetOptions = ref([]) // 选项
const searchDatasetLoading = ref(false)
const handleSearchDataset = (query) => {
  // 清除上一次的定时器
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }

  // 如果输入为空，清空选项
  if (!query.trim()) {
    searchDatasetOptions.value = []
    return
  }

  // 设置新的防抖定时器（1秒后执行）
  searchDebounceTimer = setTimeout(async () => {
    searchDatasetLoading.value = true
    datasetClient.datasetServiceSearchDatasetName({
      datasetName: query.trim(),
      pageSize: 10,
    }, { closeNProgress: true })
      .then(res => {
        searchDatasetOptions.value = res?.data?.lines;
      })
      .finally(()=>{
        searchDatasetLoading.value = false
      })
  }, 500) // 毫秒 防抖
}
</script>

<template>
  <div>
    <div
      class="common-layout flex-1 flex flex-col"
      style="height: calc(100vh - 100px)"
    >
      <div
        v-if="isLoading"
        class="el-loading-mask"
        style="display: flex; align-items: center; justify-content: center"
      >
        <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
          <Loading />
        </el-icon>
      </div>
      <div>
        <el-button type="primary" @click="createDataset" :icon="iconAdd"
          >新增数据集</el-button
        >
      </div>
      <el-divider />
      <!-- 让布局容器充满可用空间 -->
      <el-container class="flex-1 flex flex-col">
        <el-header>
          <el-space direction="horizontal" size="large">
            <el-radio-group
              v-model="datasetListQueryArgs.status"
              @change="statusChange"
              size="large"
            >
              <el-radio-button label="可用的" value="0" />
              <!--              <el-radio-button label="未处理" value="1" />-->
              <el-radio-button label="处理中" value="2" />
              <el-radio-button label="删除中" value="3" />
            </el-radio-group>

            <el-select
              v-model="datasetListQueryArgs.datasetId"
              filterable
              clearable
              remote
              placeholder="数据集搜索, 输入前缀"
              style="width: 300px"
              :loading="searchDatasetLoading"
              :remote-method="handleSearchDataset"
              @change="submitQuery"
            >
              <el-option
                v-for="item in searchDatasetOptions"
                :key="item.datasetId"
                :value="item.datasetId"
                :label="`${item.datasetId} - ${item.datasetName}`"
              />
            </el-select>
            <el-input
              v-model="datasetListQueryArgs.opUser"
              style="max-width: 250px"
              @blur="submitQuery"
            >
              <template #prepend>操作用户</template>
            </el-input>
            <el-date-picker
              v-model="datasetListQueryArgs.rangeTime"
              type="daterange"
              unlink-panels
              range-separator="To"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="defaultTime"
            />
          </el-space>
          <el-button type="primary" @click="forceQuery" :icon="iconSearch"
            >搜索</el-button
          >
          <el-button type="default" @click="resetQuery">重置</el-button>
        </el-header>
        <!-- 容器使用flex布局 -->
        <el-main class="flex-1 overflow-hidden p-0">
          <!-- 主内容区占据剩余空间，去除默认padding -->
          <div class="h-full w-full">
            <!-- 内部容器充满父元素 -->
            <el-auto-resizer class="h-full">
              <!-- 自动调整大小组件充满高度 -->
              <template #default="{ height, width }">
                <el-table-v2
                  :columns="columnsRule"
                  :data="data"
                  :width="width"
                  :height="height"
                  fixed
                  v-if="datasetListQueryArgs.status == '0'"
                />
                <el-table-v2
                  :columns="runningColumnsRule"
                  :data="data"
                  :width="width"
                  :height="height"
                  fixed
                  v-if="datasetListQueryArgs.status != '0'"
                />
              </template>
            </el-auto-resizer>
          </div>
        </el-main>
        <el-footer class="py-3">
          <!-- 底部区域保持固定高度 -->
          <el-pagination
            v-model:current-page="datasetListQueryArgs.page"
            v-model:page-size="datasetListQueryArgs.pageSize"
            background
            layout="total, prev, pager, next, sizes, jumper"
            :page-sizes="[20, 50, 100]"
            @size-change="submitQuery"
            @current-change="submitQuery"
            :total="datasetListQueryArgs.dataTotal"
            :disabled="isLoading"
          />
        </el-footer>
      </el-container>
    </div>
  </div>
</template>
