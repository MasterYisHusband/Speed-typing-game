<script setup lang="ts">
import TimerDisplay from './TimerDisplay.vue'

type HistoryEntry = {
  wpm: number
  accuracy: number
}

defineProps<{
  timeLeft: number
  selectedDifficulty: string
  difficultyselected: string
  accuracy: number
  highscore: number
  history: HistoryEntry[]
}>()
</script>

<template>
  <div class="stats">
    <h2>Stats</h2>
  </div>
  <div class="timer">
    <h3>Timer:</h3>
    <TimerDisplay :time-left="timeLeft" />
  </div>
  <div class="difficultyselected" :style="{ color: `var(${difficultyselected})` }">
    <h2>{{ selectedDifficulty }}</h2>
  </div>
  <div class="accuracy">
    <h3>Accuracy</h3>
    <span>{{ accuracy }}</span>

    <h3>Highscore</h3>
    <span>{{ highscore }}</span>
  </div>
  <div class="history">
    <div v-for="(round, index) in history" :key="index" class="history-entry">
      <span>Round {{ index + 1 }}</span>
      <span>{{ round.wpm }} WPM</span>
      <span>{{ round.accuracy }}% Accuracy</span>
    </div>
  </div>
</template>

<style scoped>
.stats {
  grid-area: stats;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  background-color: whitesmoke;
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
  color: black;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

  min-height: 0;
  overflow: hidden;
}

.stats h2 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}

.accuracy {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.timer {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  border: 2px solid #333;
  border-radius: 10px;
  text-align: center;
  background-color: white;
}

.difficultyselected h2 {
  display: grid;
  grid-area: inherit;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.history {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-height: 700px;
  overflow-y: auto;
  padding-right: 5px;
}

.history-entry {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid red;
}
</style>
