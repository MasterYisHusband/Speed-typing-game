<script setup lang="ts">
const props = defineProps<{
  difficulty: string
}>()

const emit = defineEmits<{
  (event: 'difficultyChange', difficulty: string): void
}>()
</script>

<template>
  <button @click="emit('difficultyChange', 'easy')">Easy</button>
  <button @click="emit('difficultyChange', 'medium')">Medium</button>
  <button @click="emit('difficultyChange', 'difficult')">Difficult</button>
</template>
