<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  progress: number
}>()

const color = computed(() => {
  if (props.progress < 50) return '#4caf50'
  if (props.progress < 80) return '#ffc107'
  return '#f44336'
})
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar-fill" :style="{ width: progress + '%', backgroundColor: color }"></div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 400px;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  transition:
    width 1s linear,
    background-color 0.3s ease;
}
</style>
