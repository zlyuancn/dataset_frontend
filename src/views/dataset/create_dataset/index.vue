<script setup lang="ts">
import { rules, ruleFormRef } from "./rule";
import { reactive, ref } from "vue";
import { message } from "@/utils/message";
import router from "@/router";
import { useRoute } from "vue-router";
import { DatasetFormData, OpSource } from "../utils/types";
import { getToken } from "@/utils/auth";

import iconCheck from "~icons/ep/check";
import iconClose from "~icons/ep/close";
import {
  chunkProcessCompressTypeOptions,
  chunkProcessStoreTypeOptions,
  dataProcessDataSourceOptions,
  dataProcessUriFileMethodOptions,
  DatasetInfoA2DatasetFormData,
  datasetListQueryArgs,
  genDatasetFormInitData
} from "@/views/dataset/utils/data";
import {
  DatasetAdminAddDatasetReq,
  DatasetAdminUpdateDatasetReq,
  DatasetQueryDatasetInfoReq
} from "@/api/dataset";
import { datasetClient } from "@/api/dataset_client";
import Headers from "@/views/dataset/components/Headers/index.vue";
import iconVideoPlay from "~icons/ep/video-play";

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
    })
    .finally(() => {
      isLoading.value = false;
    });
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
        console.info("query biz update formData", formData);
      }
      isLoading.value = false;
    })
    .catch(err => {
      const errMsg = err?.response?.data?.message ?? err;
      message("查询数据失败\n" + errMsg, { type: "error" });
    });
}

// 对于修改数据, 使用服务端的数据填充
const isChange: boolean = route.name == "ChangeDataset";
const isView: boolean = route.name == "ViewDataset";
if (isChange || isView) viewPageInit();
</script>

<template>
  <div>
    <el-form
      :model="formData"
      :rules="rules"
      ref="ruleFormRef"
      label-width="auto"
      style="max-width: 1000px"
      :disabled="isView"
    >
      <el-form-item label="数据集名" prop="datasetName">
        <el-input
          clearable
          maxlength="32"
          show-word-limit
          v-model="formData.datasetName"
        />
        <el-text style="color: var(--el-text-color-secondary)"
          >用于展示, 让使用者大概知道这个数据集是什么</el-text
        >
      </el-form-item>
      <el-form-item label="数据集备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2 }"
          :maxlength="1000"
          show-word-limit
          v-model="formData.remark"
        />
      </el-form-item>

      <!--数据处理-->
      <div class="box-frame">
        <span class="box-label">data处理</span>
        <el-form-item
          label="数据源"
          prop="datasetExtend.dataProcess.dataSource"
        >
          <el-select
            v-model="formData.datasetExtend.dataProcess.dataSource"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in dataProcessDataSourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <el-space direction="horizontal" :size="50">
                <span style="float: left">{{ item.label }}</span>
                <span
                  style="
                    float: right;
                    font-size: 13px;
                    color: var(--el-text-color-secondary);
                  "
                >
                  {{ item.desc }}</span
                >
              </el-space>
            </el-option>
          </el-select>
          <el-text
            v-if="
              dataProcessDataSourceOptions[
                formData.datasetExtend.dataProcess.dataSource - 1
              ]?.desc
            "
            style="color: var(--el-text-color-secondary)"
          >
            {{
              dataProcessDataSourceOptions[
                formData.datasetExtend.dataProcess.dataSource - 1
              ]?.desc
            }}</el-text
          >
        </el-form-item>
        <!--数据源-uri文件-->
        <div
          v-if="Number(formData?.datasetExtend?.dataProcess?.dataSource) == 1"
          class="box-frame"
        >
          <span class="box-label">{{
            dataProcessDataSourceOptions[
              formData.datasetExtend.dataProcess.dataSource - 1
            ]?.label
          }}</span>
          <el-space direction="vertical" alignment="normal" size="small">
            <el-space direction="horizontal" size="small">
              <el-form-item
                label="文件地址"
                prop="datasetExtend.dataProcess.uriFile.uri"
              >
                <el-input
                  maxlength="128"
                  show-word-limit
                  v-model="formData.datasetExtend.dataProcess.uriFile.uri"
                  style="width: 600px"
                  clearable
                />
              </el-form-item>
            </el-space>
            <el-form-item label="Headers">
              <Headers
                v-model="formData.datasetExtend.dataProcess.uriFile.headers"
              ></Headers>
            </el-form-item>
            <el-form-item label="不安全的连接">
              <el-switch
                v-model="
                  formData.datasetExtend.dataProcess.uriFile.insecureSkipVerify
                "
                size="large"
                active-text="启用不安全的连接时不会验证https证书"
              />
            </el-form-item>
            <el-form-item label="代理">
              <el-input
                maxlength="128"
                show-word-limit
                v-model="formData.datasetExtend.dataProcess.uriFile.proxy"
                style="width: 800px"
                clearable
              />
              <el-text style="color: var(--el-text-color-secondary)"
                >支持 http, https, socks5, socks5h. 示例: https://127.0.0.1:1080
                https://user:pwd@127.0.0.1:1080</el-text
              >
            </el-form-item>
            <el-form-item
              label="请求方法"
              prop="datasetExtend.dataProcess.uriFile.method"
            >
              <el-select
                v-model="formData.datasetExtend.dataProcess.uriFile.method"
                placeholder="Select"
                style="width: 240px"
              >
                <el-option
                  v-for="item in dataProcessUriFileMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <el-space direction="horizontal" :size="50">
                    <span style="float: left">{{ item.label }}</span>
                  </el-space>
                </el-option>
              </el-select>
            </el-form-item>
          </el-space>
        </div>
      </div>
      <!--chunk持久化-->
      <div class="box-frame">
        <span class="box-label">chunk处理</span>
        <el-form-item
          label="持久化目标"
          prop="datasetExtend.chunkProcess.storeType"
        >
          <el-select
            v-model="formData.datasetExtend.chunkProcess.storeType"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in chunkProcessStoreTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <el-space direction="horizontal" :size="50">
                <span style="float: left">{{ item.label }}</span>
                <span
                  style="
                    float: right;
                    font-size: 13px;
                    color: var(--el-text-color-secondary);
                  "
                >
                  {{ item.desc }}</span
                >
              </el-space>
            </el-option>
          </el-select>
          <el-text
            v-if="
              chunkProcessStoreTypeOptions[
                formData.datasetExtend.chunkProcess.storeType-1
              ]?.desc
            "
            style="color: var(--el-text-color-secondary)"
          >
            {{
              chunkProcessStoreTypeOptions[
                formData.datasetExtend.chunkProcess.storeType-1
              ]?.desc
            }}</el-text
          >
        </el-form-item>
        <el-form-item label="压缩类型">
          <el-select
            v-model="formData.datasetExtend.chunkProcess.compressType"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in chunkProcessCompressTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <el-space direction="horizontal" :size="50">
                <span style="float: left">{{ item.label }}</span>
              </el-space>
            </el-option>
          </el-select>
          <el-text
            v-if="
              chunkProcessCompressTypeOptions[
                formData.datasetExtend.chunkProcess.compressType
              ]?.desc
            "
            style="color: var(--el-text-color-secondary)"
          >
            {{
              chunkProcessCompressTypeOptions[
                formData.datasetExtend.chunkProcess.compressType
              ]?.desc
            }}</el-text
          >
        </el-form-item>
      </div>
      <!--value处理-->
      <div class="box-frame">
        <span class="box-label">value处理</span>
      </div>

      <el-form-item label="操作备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2 }"
          :maxlength="1000"
          show-word-limit
          v-model="formData.opRemark"
        />
      </el-form-item>
    </el-form>

    <div>
      <el-button
        type="primary"
        :loading="isLoading"
        :disabled="isLoading"
        @click="submitCreate(false)"
        v-if="!isChange && !isView"
        >添加</el-button
      >
      <el-button
        type="success"
        :loading="isLoading"
        :disabled="isLoading"
        @click="submitCreate(true)"
        v-if="!isChange && !isView"
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
      <el-button @click="router.back()" :icon="iconClose">取消</el-button>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/box-frame.css");
</style>
