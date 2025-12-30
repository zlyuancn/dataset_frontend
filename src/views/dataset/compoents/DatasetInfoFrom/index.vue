<script setup lang="ts">
import { ruleFormRef } from "./rule";
import { rules } from "@/views/dataset/compoents/DatasetInfoFrom/rule";
import {
  chunkProcessCompressTypeOptions,
  chunkProcessStoreTypeOptions,
  dataProcessDataSourceOptions,
  dataProcessUriFileMethodOptions,
  DatasetFormData,
  genDatasetFormInitData
} from "@/views/dataset/compoents/DatasetInfoFrom/data";
import { computed } from "vue";

import Headers from "@/components/Headers/index.vue"
import CollapsibleBox from "@/components/CollapsibleBox/index.vue";
import FileSpeedInput from "@/components/FileSpeedInput/index.vue";
import { ElInputTag } from "element-plus";

const props = defineProps({
  disable: {
    type: Boolean,
    default: false
  },
  allowEditDataExtend: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: Object,
    required: true,
    default: genDatasetFormInitData()
  }
});

const emit = defineEmits(["update:modelValue"]);

// 使用 computed 双向绑定 formData
const formData = computed({
  get() {
    return <DatasetFormData>props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});
</script>

<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="ruleFormRef"
    label-width="auto"
    style="max-width: 1000px"
    :disabled="disable"
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
        :autosize="{ minRows: 3 }"
        :maxlength="1000"
        show-word-limit
        v-model="formData.remark"
      />
    </el-form-item>

    <!--数据处理-->
    <CollapsibleBox label="data处理">
      <el-form-item label="数据源" prop="datasetExtend.dataProcess.dataSource">
        <el-select
          v-model="formData.datasetExtend.dataProcess.dataSource"
          placeholder="Select"
          style="width: 240px"
          :disabled="!allowEditDataExtend"
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
      <CollapsibleBox
        v-if="Number(formData?.datasetExtend?.dataProcess?.dataSource) == 1"
        label="uri文件"
        hide-btn
      >
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
                :disabled="!allowEditDataExtend"
              />
            </el-form-item>
          </el-space>
          <el-form-item label="Headers">
            <Headers
              :disabled="!allowEditDataExtend"
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
              :disabled="!allowEditDataExtend"
            />
          </el-form-item>
          <el-form-item label="代理">
            <el-input
              maxlength="128"
              show-word-limit
              v-model="formData.datasetExtend.dataProcess.uriFile.proxy"
              style="width: 800px"
              clearable
              :disabled="!allowEditDataExtend"
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
              :disabled="!allowEditDataExtend"
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
      </CollapsibleBox>
      <el-form-item label="去除Utf8Bom">
        <el-switch
          v-model="formData.datasetExtend.dataProcess.trimUtf8Bom"
          size="large"
          active-text="去掉Utf8Bom文件头, 在数据处理中通常是有效的"
          :disabled="!allowEditDataExtend"
        />
      </el-form-item>
      <el-form-item label="每秒速率(字节/s)" prop="rate_sec">
        <el-space direction="horizontal" size="large">
          <FileSpeedInput
            v-model="formData.rateLimit"
            :precision="0"
            :disabled="!allowEditDataExtend"
          />
          <el-text style="color: var(--el-text-color-secondary)"
            >数据每秒处理速度, 0表示不限速</el-text
          >
        </el-space>
      </el-form-item>
    </CollapsibleBox>
    <!--chunk持久化-->
    <CollapsibleBox label="chunk处理">
      <el-form-item
        label="持久化目标"
        prop="datasetExtend.chunkProcess.storeType"
      >
        <el-select
          v-model="formData.datasetExtend.chunkProcess.storeType"
          placeholder="Select"
          style="width: 240px"
          :disabled="!allowEditDataExtend"
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
              formData.datasetExtend.chunkProcess.storeType - 1
            ]?.desc
          "
          style="color: var(--el-text-color-secondary)"
        >
          {{
            chunkProcessStoreTypeOptions[
              formData.datasetExtend.chunkProcess.storeType - 1
            ]?.desc
          }}</el-text
        >
      </el-form-item>
      <el-form-item label="压缩类型">
        <el-select
          v-model="formData.datasetExtend.chunkProcess.compressType"
          placeholder="Select"
          style="width: 240px"
          :disabled="!allowEditDataExtend"
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
    </CollapsibleBox>
    <!--value处理-->
    <CollapsibleBox label="value处理">
      <el-form-item label="分隔符" prop="datasetExtend.valueProcess.delim">
        <el-input
          clearable
          maxlength="32"
          show-word-limit
          v-model="formData.datasetExtend.valueProcess.delim"
          style="width: 400px"
          :disabled="!allowEditDataExtend"
        />
        <el-text style="color: var(--el-text-color-secondary)"
          >分隔符用于确定value的边界</el-text
        >
      </el-form-item>
      <el-form-item label="去掉空字符">
        <el-switch
          v-model="formData.datasetExtend.valueProcess.trimSpace"
          size="large"
          active-text="将value前后的空字符去掉, 包括 '\t', '\n', '\v', '\f', '\r', ' ', U+0085 (NEL), U+00A0 (NBSP)"
          :disabled="!allowEditDataExtend"
        />
      </el-form-item>
      <el-form-item label="去掉前缀">
        <el-input-tag
          v-model="formData.datasetExtend.valueProcess.trimPrefix"
          placeholder="输入后按Enter添加"
          :disabled="!allowEditDataExtend"
        />
      </el-form-item>
      <el-form-item label="去掉后缀">
        <el-input-tag
          v-model="formData.datasetExtend.valueProcess.trimSuffix"
          placeholder="输入后按Enter添加"
          :disabled="!allowEditDataExtend"
        />
      </el-form-item>
      <el-form-item label="过滤子字符串">
        <el-input-tag
          v-model="formData.datasetExtend.valueProcess.filterSubString"
          placeholder="输入后按Enter添加"
          :disabled="!allowEditDataExtend"
        />
        <el-text style="color: var(--el-text-color-secondary)"
          >包含该字符串的value会被删除</el-text
        >
      </el-form-item>
      <el-form-item label="过滤字符串前缀">
        <el-input-tag
          v-model="formData.datasetExtend.valueProcess.filterPrefix"
          placeholder="输入后按Enter添加"
          :disabled="!allowEditDataExtend"
        />
        <el-text style="color: var(--el-text-color-secondary)"
          >包含该字符串前缀的value会被删除</el-text
        >
      </el-form-item>
      <el-form-item label="过滤子字符串后缀">
        <el-input-tag
          v-model="formData.datasetExtend.valueProcess.filterSuffix"
          placeholder="输入后按Enter添加"
          :disabled="!allowEditDataExtend"
        />
        <el-text style="color: var(--el-text-color-secondary)"
          >包含该字符串后缀的value会被删除</el-text
        >
      </el-form-item>
    </CollapsibleBox>

    <el-form-item label="操作备注">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3 }"
        :maxlength="1000"
        show-word-limit
        v-model="formData.opRemark"
      />
    </el-form-item>
  </el-form>
</template>
