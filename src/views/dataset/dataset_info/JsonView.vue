<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  raw?: string | null;
}>();

const isValidJson = computed(() => {
  if (!props.raw || typeof props.raw !== "string") return false;
  try {
    JSON.parse(props.raw);
    return true;
  } catch {
    return false;
  }
});

const error = ref(false);
const formattedJson = computed(() => {
  if (!isValidJson.value) return props.raw;
  try {
    const parsed = JSON.parse(props.raw!);
    return JSON.stringify(parsed, null, 2); // 2 空格缩进
  } catch (err) {
    error.value = true;
    return props.raw;
  }
});
</script>

<template>
  <pre
    class="json-view"
    v-if="isValidJson && !error"
    @wheel.stop
  >
    <code>{{ formattedJson }}</code>
  </pre>
  <span v-else class="json-fallback">{{ raw }}</span>
</template>

<style scoped>
.json-view {
  margin: 0;
  font-family: "Courier New", monospace;
  font-size: 12px;
  background-color: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 300px;
  overflow: auto;
  color: #333;
  touch-action: auto;
}
.json-fallback {
  font-family: monospace;
  font-size: 12px;
  color: #666;
}
</style>
