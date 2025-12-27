<script setup lang="ts">
import { ref } from "vue";
import { DatasetDatasetInfoA } from "@/api/dataset/index.js";
import CollapsibleBox from "@/components/CollapsibleBox/index.vue";
import { datasetClient } from "@/api/dataset_client";
import { message } from "@/utils/message";
import { datasetListQueryArgs } from "@/views/dataset/dataset_list/data";
import router from "@/router";

// 使用类型声明方式定义 props
const props = defineProps<{
  datasetData?: DatasetDatasetInfoA;
}>();

// 查询valueSn
const isLoading = ref(false);
const valueSn = ref(0);
const valueSnResult = ref("");
const debugData = ref({})
async function submitQueryValue(): void {
  isLoading.value = true;
  await datasetClient
    .datasetServiceQueryDatasetData({
      datasetId: String(props.datasetData.datasetId),
      valueSn: String(valueSn.value)
    })
    .then(result => {
      console.log(result, result?.data);
      message("查询成功", { type: "success" });
      let d = {
        datasetId: result?.data?.datasetId,
        chunkSn: result?.data?.chunkSn || 0,
        valueSn: result?.data?.valueSn || 0,
      }
      debugData.value = JSON.stringify(d || {}, null, 2)
      console.info(debugData.value)
      valueSnResult.value = result?.data?.value;
    })
    .catch(err => {
      console.log(err);
      const errMsg = err?.response?.data?.message ?? err;
      message("查询失败\n" + errMsg, { type: "error" });
    });
  isLoading.value = false;
}
</script>

<template>
  <CollapsibleBox label="工具" hide-btn>
    {{ datasetData.datasetId }}
    <el-form-item label="valueSn">
      <el-input-number
        :min="0"
        :max="datasetData?.valueTotal - 1"
        v-model="valueSn"
        style="width: 300px"
      />
      <el-button
        type="primary"
        @click="submitQueryValue"
        :loading="isLoading"
        :disabled="isLoading"
        >查询</el-button
      >
    </el-form-item>
    <el-form-item label="valueSn结果">
      <el-input
        v-model="valueSnResult"
        type="textarea"
        :autosize="{ minRows: 3 }"
      />
    </el-form-item>
  </CollapsibleBox>
</template>
