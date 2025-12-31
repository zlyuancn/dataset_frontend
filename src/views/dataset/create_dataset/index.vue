<script setup lang="ts">
import { ruleFormRef } from "../compoents/DatasetInfoFrom/rule";
import { reactive, ref } from "vue";
import { message } from "@/utils/message";
import router from "@/router";
import { useRoute } from "vue-router";
import { getToken } from "@/utils/auth";

import iconCheck from "~icons/ep/check";
import iconBack from "~icons/ep/back";
import {
  DatasetFormData,
  DatasetInfoA2DatasetFormData,
  genDatasetFormInitData
} from "../compoents/DatasetInfoFrom/data";
import {
  DatasetAdminAddDatasetReq,
  DatasetAdminUpdateDatasetReq,
  DatasetDatasetInfoA,
  DatasetQueryDatasetInfoReq
} from "@/api/dataset";
import { datasetClient } from "@/api/dataset_client";
import iconVideoPlay from "~icons/ep/video-play";

import { OpSource } from "@/views/dataset/utils/types";
import { datasetListQueryArgs } from "@/views/dataset/dataset_list/data";
import DatasetInfoFrom from "@/views/dataset/compoents/DatasetInfoFrom/index.vue";

// 注册业务/修改业务
defineOptions({
  name: "CreateDataset"
});

const user = getToken();
const route = useRoute();

const isLoading = ref(false);
const formData = reactive<DatasetFormData>(genDatasetFormInitData());

// 新增
const submitCreate = async (createAndProcess: boolean = false) => {
  if (!ruleFormRef.value) return;
  isLoading.value = true;
  try {
    await ruleFormRef.value.validate();
    console.log("submit!", formData);
  } catch (error) {
    console.log("error submit!", error);
    isLoading.value = false;
    return;
  }

  const req: DatasetAdminAddDatasetReq = {
    datasetName: formData.datasetName,
    remark: formData.remark,

    datasetExtend: formData.datasetExtend,

    op: {
      opSource: OpSource.Web,
      opUserid: user.username,
      opUserName: user.nickname,
      opRemark: formData.opRemark
    },

    startProcessNow: createAndProcess
  };
  req.datasetExtend.dataProcess.rateLimit = String(formData.rateLimit);
  console.log("submit!", formData);

  await datasetClient
    .datasetServiceAdminAddDataset(req)
    .then(result => {
      console.log(result);
      message("创建成功", { type: "success" });
      if (createAndProcess) {
        Object.assign(datasetListQueryArgs, { status: "2" });
      } else {
        Object.assign(datasetListQueryArgs, { status: "1" });
      }
      router.back();
    })
    .catch(err => {
      console.log(err);
      const errMsg = err?.response?.data?.message ?? err;
      message("创建失败\n" + errMsg, { type: "error" });
    });
  isLoading.value = false;
};
// 修改
const submitChange = async () => {
  if (!ruleFormRef.value) return;
  isLoading.value = true;
  try {
    await ruleFormRef.value.validate();
    console.log("submit!", formData);
  } catch (error) {
    console.log("error submit!", error);
    isLoading.value = false;
    return;
  }

  const req: DatasetAdminUpdateDatasetReq = {
    datasetId: String(formData.datasetId),
    datasetName: formData.datasetName,
    remark: formData.remark,

    datasetExtend: formData.datasetExtend,

    op: {
      opSource: OpSource.Web,
      opUserid: user.username,
      opUserName: user.nickname,
      opRemark: formData.opRemark
    }
  };
  req.datasetExtend.dataProcess.rateLimit = String(formData.rateLimit);
  console.log("submit!", formData);

  await datasetClient
    .datasetServiceAdminUpdateDataset(req)
    .then(result => {
      console.log(result);
      message("修改成功", { type: "success" });
      router.back();
    })
    .catch(err => {
      console.log(err);
      const errMsg = err?.response?.data?.message ?? err;
      message("修改失败\n" + errMsg, { type: "error" });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

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
        allowEditDataExtend.value = (line.status || 0) == 0;
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

// 对于查看数据, 使用服务端的数据填充
const isChange: boolean = route.name == "ChangeDataset";
if (isChange) viewPageInit();
const allowEditDataExtend = ref(true); // 数据扩展是否允许修改
const datasetData = ref<DatasetDatasetInfoA>({}); // 数据集数据
</script>

<template>
  <div>
    <DatasetInfoFrom
      :allowEditDataExtend="allowEditDataExtend"
      v-model="formData"
    />

    <div>
      <el-button
        type="primary"
        :loading="isLoading"
        :disabled="isLoading"
        @click="submitCreate(false)"
        v-if="!isChange"
        >添加</el-button
      >
      <el-button
        type="success"
        :loading="isLoading"
        :disabled="isLoading"
        @click="submitCreate(true)"
        v-if="!isChange"
        :icon="iconVideoPlay"
        >添加并分析数据</el-button
      >
      <el-button
        type="primary"
        :loading="isLoading"
        :disabled="isLoading"
        @click="submitChange"
        v-if="isChange"
        :icon="iconCheck"
        >修改</el-button
      >
      <el-button @click="router.back()" :icon="iconBack">取消</el-button>
    </div>
  </div>
</template>
