<template>
  <div class="file-speed-input">
    <el-input-number
      v-model="inputValue"
      :min="0"
      :precision="precision"
      :controls="false"
      @change="handleInputChange"
      style="width: 160px"
      :disabled="disabled"
    />
    <el-select
      v-model="selectedUnit"
      @change="handleUnitChange"
      style="width: 100px; margin-left: 8px"
      :disabled="disabled"
    >
      <el-option
        v-for="unit in units"
        :key="unit.value"
        :label="unit.label"
        :value="unit.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const units = [
  { label: "B/s", value: "B" },
  { label: "KB/s", value: "KB" },
  { label: "MB/s", value: "MB" },
  { label: "GB/s", value: "GB" }
];

const unitFactors = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024
};

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  precision: {
    type: Number,
    default: 0,
    validator: value => Number.isInteger(value) && value >= 0
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(0);
const selectedUnit = ref("KB");

// 初始化反显（仅用于展示，不影响 emit）
watch(
  () => props.modelValue,
  () => {
    const bytes = props.modelValue;
    let unit = "B";
    let value = bytes;

    if (bytes >= unitFactors.GB && bytes % unitFactors.GB === 0) {
      unit = "GB";
      value = bytes / unitFactors.GB;
    } else if (bytes >= unitFactors.MB && bytes % unitFactors.MB === 0) {
      unit = "MB";
      value = bytes / unitFactors.MB;
    } else if (bytes >= unitFactors.KB && bytes % unitFactors.KB === 0) {
      unit = "KB";
      value = bytes / unitFactors.KB;
    }

    inputValue.value = parseFloat(value.toFixed(props.precision));
    selectedUnit.value = unit;
  },
  { immediate: true }
);

// 用户修改数值（完成输入后）
const handleInputChange = val => {
  const bytes = val * (unitFactors[selectedUnit.value] || 1);
  emit("update:modelValue", Math.round(bytes));
};

// 用户切换单位
const handleUnitChange = newUnit => {
  const bytes = inputValue.value * (unitFactors[newUnit] || 1);
  emit("update:modelValue", Math.round(bytes));
};
</script>
