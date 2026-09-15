<script setup lang="ts">
import DifficultySelector from './DifficultySelector.vue'

defineProps<{
  difficulty: 'easy' | 'medium' | 'difficult'
  mode: 'word' | 'text'
}>()

const emit = defineEmits<{
  'update:difficulty': [value: 'easy' | 'medium' | 'difficult']
  'update:mode': [value: 'word' | 'text']
}>()
</script>

<template>
  <div class="difficulty">
    <DifficultySelector
      :difficulty="difficulty"
      :mode="mode"
      @update:difficulty="emit('update:difficulty', $event)"
      @update:mode="emit('update:mode', $event)"
    />
  </div>
</template>

<style scoped>
.difficulty {
  grid-area: difficulty;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
}
</style>
