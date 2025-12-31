<script setup lang="ts">
// 数据集信息
import DatasetInfoFrom from "@/views/dataset/compoents/DatasetInfoFrom/index.vue";
import TestGetValue from "./TestGetValue.vue";
import SysLog from "./SysLog.vue";
import { reactive, ref } from "vue";
import {
  DatasetFormData,
  DatasetInfoA2DatasetFormData,
  genDatasetFormInitData
} from "@/views/dataset/compoents/DatasetInfoFrom/data";
import { DatasetDatasetInfoA, DatasetQueryDatasetInfoReq } from "@/api/dataset";
import { datasetClient } from "@/api/dataset_client";
import { message } from "@/utils/message";
import { useRoute } from "vue-router";
import router from "@/router";
import iconBack from "~icons/ep/back";

defineOptions({
  name: "DatasetInfo"
});

const route = useRoute();

const isLoading = ref(false);
const formData = reactive<DatasetFormData>(genDatasetFormInitData());

// 对于查看页面, 从服务端加载相关数据
function viewPageInit() {
  formData.datasetId = Number(route.query["datasetId"]);
  // 查询业务信息
  const req: DatasetQueryDatasetInfoReq = {
    datasetId: String(route.query["datasetId"])
  };
  isLoading.value = true;
  datasetClient
    .datasetServiceQueryDatasetInfo(req)
    .then(result => {
      console.log("query dataset result", result);
      const line = result?.data?.line;
      if (!line) {
        message("查询数据失败\n无法获取到 line", { type: "error" });
      } else {
        console.log("query dataset line result", line);
        DatasetInfoA2DatasetFormData(formData, line);
        datasetData.value = line;
        console.info("query biz update formData", formData);
      }
      isLoading.value = false;
    })
    .catch(err => {
      const errMsg = err?.response?.data?.message ?? err;
      message("查询数据失败\n" + errMsg, { type: "error" });
    });
}

viewPageInit();
const datasetData = ref<DatasetDatasetInfoA>({}); // 数据集数据
</script>

<template>
  <div>
    <DatasetInfoFrom disable v-model="formData" />

    <el-button @click="router.back()" :icon="iconBack">取消</el-button>

    <TestGetValue v-if="datasetData?.status == 3" :datasetData="datasetData" />
    <SysLog :datasetId="datasetData?.datasetId" />

    <el-button @click="router.back()" :icon="iconBack">取消</el-button>

  </div>
</template>
