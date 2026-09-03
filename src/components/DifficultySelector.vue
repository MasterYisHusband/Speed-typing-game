<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', difficulty: string): void
}>()
</script>

<template>
  <button @click="emit('update:modelValue', 'easy')">Easy</button>
  <button @click="emit('update:modelValue', 'medium')">Medium</button>
  <button @click="emit('update:modelValue', 'difficult')">Difficult</button>
</template>
