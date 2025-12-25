<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'

// 接收 props
const props = defineProps({
  label: {
    type: String,
    default: '配置项'
  },
  modelValue: { // v-model 传入的值. 控制显示和隐藏
    type: Boolean,
    default: true
  },
  hideBtn: { // 控制是否隐藏下拉收起按钮
    type: Boolean,
    default: false
  }
})

// 支持 v-model 控制展开状态
const isExpanded = ref(props.modelValue)

// 监听外部 modelValue 变化
watch(() => props.modelValue, (val) => {
  isExpanded.value = val
})

// 切换展开/收起
const toggleContent = () => {
  if (props.hideBtn) {
    return
  }
  isExpanded.value = !isExpanded.value
  // 同步给父组件
  emit('update:modelValue', isExpanded.value)
}

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="box-frame" :class="{ collapsed: !isExpanded }">
    <!-- 左上角标题区域 -->
    <div class="box-header" @click.stop="toggleContent">
      <span class="box-label">{{ label }}</span>
      <el-icon class="box-toggle" size="14" v-if="!hideBtn">
        <component :is="isExpanded ? ArrowDown : ArrowRight" />
      </el-icon>
    </div>

    <!-- 内容区域 -->
    <div class="box-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@import url("style.css");
</style>
