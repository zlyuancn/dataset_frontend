import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
export const ruleFormRef = ref<FormInstance>();
export const rules = reactive<FormRules>({
  datasetName: [{ required: true, message: "必填项", trigger: "blur" }],
  "datasetExtend.dataProcess.dataSource": [
    { required: true, message: "必填项", trigger: "blur" }
  ],
  "datasetExtend.dataProcess.uriFile.method": [
    { required: true, message: "必填项", trigger: "blur" }
  ],
  "datasetExtend.chunkProcess.storeType": [
    { required: true, message: "必填项", trigger: "blur" }
  ],
  "datasetExtend.dataProcess.uriFile.uri": [
    { required: true, message: "必填项", trigger: "blur" }
  ],
  "datasetExtend.valueProcess.delim": [
    { required: true, message: "必填项", trigger: "blur" }
  ],
});
