<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', difficulty: string): void
}>()

function changeDifficulty(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <select :value="props.modelValue" @change="changeDifficulty">
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="difficult">Difficult</option>
  </select>
</template>

<style scoped>
select {
  width: 250px;
  height: 45px;
  font-size: 18px;
  padding: 0 10px;
}
</style>
