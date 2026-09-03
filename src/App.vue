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
      <CharacterDisplay :current-word="currentWord" :user-input="userInput"></CharacterDisplay>

      <input v-model="userInput" @input="checkWord" :disabled="!isRunning" />

      <button @click="startGame">START</button>
      <button @click="endGame" :disabled="!isRunning">STOP</button>
    </div>
    <div class="stats">
      <TimerDisplay :time-left="timeLeft"></TimerDisplay>

      <div>
        <div class="history">
          <div v-for="(character, index) in history" class="history-entry">
            <span>Round {{ index + 1 }}</span>
            <span>{{ character }} WPM</span>
          </div>
        </div>
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
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 2fr 1fr 120px;
  grid-template-areas:
    'game stats'
    'game stats'
    'difficulty difficulty';
  gap: 20px;
  height: 100vh;
  width: 100%;
}

.game-area {
  grid-area: game;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.game-area input {
  width: 400px;
  height: 45px;
  font-size: 30px;
}

.game-area button {
  padding: 10px 25px;
  font-size: 16px;
}

.stats {
  grid-area: stats;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  background-color: whitesmoke;
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
  color: black;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.difficulty {
  grid-area: difficulty;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
}

.history {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history p {
  padding: 10px 15px;
  border-radius: 8px;
  border: 2px solid red;
}
</style>
