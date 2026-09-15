<script setup lang="ts">
import { useTypingGame } from './components/composables/useTypingGame.ts'
import StatsPanel from './components/StatsPanel.vue'
import GameOverPopup from './components/GameOverPopup.vue'
import EasterEgg from './components/EasterEgg.vue'
import GameArea from './components/GameArea.vue'
import GameSettings from './components/GameSettings.vue'

const {
  currentWord,
  userInput,
  isRunning,
  history,
  selectedDifficulty,
  timeLeft,
  startGame,
  endGame,
  accuracy,
  difficultyselected,
  streak,
  correctFeedback,
  shakeFeedback,
  countdown,
  highscore,
  fireSize,
  selectedMode,
  showEasterEgg,
  showGameOver,
  checkWord,
  progress,
} = useTypingGame()

function handleInput(value: string) {
  userInput.value = value
  checkWord()
}

console.log('App progress:', progress)
</script>

<template>
  <div class="game">
    <EasterEgg :show="showEasterEgg" />
    <GameArea
      :current-word="currentWord"
      :user-input="userInput"
      :is-running="isRunning"
      :shake-feedback="shakeFeedback"
      :correct-feedback="correctFeedback"
      :countdown="countdown"
      :streak="streak"
      :fire-size="fireSize"
      :progress="progress"
      @input="handleInput"
      @start="startGame"
      @end="endGame"
    />
    <StatsPanel
      :time-left="timeLeft"
      :selected-difficulty="selectedDifficulty"
      :difficultyselected="difficultyselected"
      :accuracy="accuracy"
      :highscore="highscore"
      :history="history"
    />
    <GameSettings v-model:difficulty="selectedDifficulty" v-model:mode="selectedMode" />
  </div>
  <GameOverPopup :show="showGameOver" />
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
</style>
