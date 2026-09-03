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
    <div class="game-area">
      <p>{{ currentWord }}</p>

      <CharacterDisplay :current-word="currentWord" :user-input="userInput"></CharacterDisplay>

      <input v-model="userInput" @input="checkWord" :disabled="!isRunning" />

      <button @click="startGame">START</button>
      <button @click="endGame" :disabled="!isRunning">STOP</button>
    </div>
    <div class="stats">
      <TimerDisplay :time-left="timeLeft"></TimerDisplay>

      <div>
        <p v-for="(character, index) in history">Round {{ index + 1 }}: {{ character }} WPM</p>
      </div>
    </div>
    <div class="difficulty">
      <DifficultySelector v-model="selectedDifficulty"></DifficultySelector>
    </div>
  </div>
</template>

<style scoped>
.game {
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
  width: 100%;
  background-color: lightblue;
}
</style>
