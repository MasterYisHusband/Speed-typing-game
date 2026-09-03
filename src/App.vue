<script setup lang="ts">
import DifficultySelector from './components/DifficultySelector.vue'
import CharacterDisplay from './components/CharacterDisplay.vue'
import TimerDisplay from './components/TimerDisplay.vue'
import { useTypingGame } from './components/composables/useTypingGame.ts'

const {
  currentWord,
  userInput,
  isRunning,
  history,
  selectedDifficulty,
  checkWord,
  timeLeft,
  startGame,
  endGame,
} = useTypingGame()
</script>

<template>
  <div class="game">
    <p>{{ currentWord }}</p>

    <CharacterDisplay :current-word="currentWord" :user-input="userInput"></CharacterDisplay>

    <input v-model="userInput" @input="checkWord" :disabled="!isRunning" />

    <button @click="startGame">START</button>
    <button @click="endGame" :disabled="!isRunning">STOP</button>

    <TimerDisplay :time-left="timeLeft"></TimerDisplay>

    <div>
      <p v-for="(character, index) in history">Round {{ index + 1 }}: {{ character }} WPM</p>
    </div>

    <DifficultySelector v-model="selectedDifficulty"></DifficultySelector>
  </div>
</template>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
