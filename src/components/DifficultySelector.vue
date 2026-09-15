<script setup lang="ts">
type Difficulty = 'easy' | 'medium' | 'difficult'
type Mode = 'word' | 'text'

const props = defineProps<{
  difficulty: Difficulty
  mode: Mode
}>()

const emit = defineEmits<{
  (event: 'update:difficulty', difficulty: Difficulty): void
  (event: 'update:mode', mode: Mode): void
}>()

function changeDifficulty(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:difficulty', target.value as Difficulty)
}

function changeModi(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:mode', target.value as Mode)
}
</script>

<template>
  <div class="selectorContainer">
    <div class="DifficultySelectOrdner">
      <p>Difficulty:</p>
      <select :value="props.difficulty" @change="changeDifficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="difficult">Difficult</option>
      </select>
    </div>
    <div class="ModeSelectOrdner">
      <p>Mode:</p>
      <select :value="props.mode" @change="changeModi">
        <option value="word">Words</option>
        <option value="text">Texts</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.DifficultySelectOrdner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ModeSelectOrdner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selectorContainer {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

select {
  width: 250px;
  height: 45px;
  font-size: 18px;
  padding: 0 10px;
}
</style>
