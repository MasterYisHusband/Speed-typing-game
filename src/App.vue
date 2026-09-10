<script setup lang="ts">
import DifficultySelector from './components/DifficultySelector.vue'
import CharacterDisplay from './components/CharacterDisplay.vue'
import TimerDisplay from './components/TimerDisplay.vue'
import { useTypingGame } from './components/composables/useTypingGame.ts'
import { PhFire } from '@phosphor-icons/vue'

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
  accuracy,
  difficultyselected,
  streak,
  correctFeedback,
  shakeFeedback,
  countdown,
  highscore,
  fireSize,
  typingInput,
  selectedMode,
} = useTypingGame()
//CUB Software Placeholder Text API (für Texte)
</script>

<template>
  <div class="game">
    <div class="game-area">
      <div class="word-display" :class="{ shake: shakeFeedback }">
        <CharacterDisplay :current-word="currentWord" :user-input="userInput"></CharacterDisplay>
        <div v-if="correctFeedback" class="correct-feedback">✓</div>
      </div>
      <input ref="typingInput" v-model="userInput" @input="checkWord" :disabled="!isRunning" />
      <div class="buttons">
        <button @click="startGame">START</button>
        <button @click="endGame" :disabled="!isRunning">STOP</button>
        <div v-if="countdown > 0" class="countdown">{{ countdown }}</div>
      </div>
      <div class="streak"><PhFire class="icon" :size="30" :weight="fireSize" /> {{ streak }}</div>
    </div>
    <div class="stats">
      <h2>Stats</h2>
      <div class="timer">
        <h3>Timer:</h3>
        <TimerDisplay :time-left="timeLeft"></TimerDisplay>
      </div>
      <div class="difficultyselected" :style="{ color: `var(${difficultyselected})` }">
        <h2>{{ selectedDifficulty }}</h2>
      </div>
      <div class="accuracy">
        <h3>Accuracy</h3>
        <span>{{ accuracy }}%</span>
        <h3>Highscore</h3>
        <span>{{ highscore }}</span>
      </div>
      <div>
        <div class="history">
          <div v-for="(Round, index) in history" :key="index" class="history-entry">
            <span>Round {{ index + 1 }}</span>
            <span>{{ Round.wpm }} WPM</span>
            <span>{{ Round.accuracy }}% Accuracy</span>
          </div>
        </div>
      </div>
    </div>
    <div class="difficulty">
      <DifficultySelector
        v-model:difficulty="selectedDifficulty"
        v-model:mode="selectedMode"
        @update:mode="console.log('Dings bekommt:', $event)"
      ></DifficultySelector>
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

.countdown {
  font-size: 30px;
  font-weight: bold;
  position: absolute;
  right: -30px;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.difficulty {
  grid-area: difficulty;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
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

.word-display {
  display: flex;
  align-items: center;
  gap: 40px;
  position: relative;
}

@keyframes correct-pop {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.correct-feedback {
  animation: correct-pop 1000ms;
  color: var(--correct-word);
  font-weight: bold;
  position: absolute;
  right: -30px;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-10px);
  }

  40% {
    transform: translateX(10px);
  }

  60% {
    transform: translateX(-10px);
  }

  80% {
    transform: translateX(10px);
  }

  100% {
    transform: translateX(0);
  }
}

.shake {
  animation: shake 500ms;
}

.streak {
  font-size: 25px;
}

.icon {
  color: orange;
}
</style>
