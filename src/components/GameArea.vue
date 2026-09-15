<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import CharacterDisplay from './CharacterDisplay.vue'
import { PhFire } from '@phosphor-icons/vue'
import ProgressBar from './ProgressBar.vue'

const props = defineProps<{
  currentWord: string
  userInput: string
  isRunning: boolean
  shakeFeedback: boolean
  correctFeedback: boolean
  countdown: number
  streak: number
  progress: number
  fireSize: 'light' | 'bold' | 'fill'
}>()

console.log('GameArea props:', props)

const inputElement = ref<HTMLInputElement | null>(null)

watch(
  () => props.isRunning,
  async (isRunning) => {
    if (isRunning) {
      await nextTick()
      inputElement.value?.focus()
    }
  },
)

const emit = defineEmits<{
  input: [value: string]
  start: []
  end: []
}>()
</script>

<template>
  <div class="game-area">
    <div class="word-display" :class="{ shake: shakeFeedback }">
      <CharacterDisplay :current-word="currentWord" :user-input="userInput" />

      <div v-if="correctFeedback" class="correct-feedback">✓</div>
    </div>

    <input
      ref="inputElement"
      :value="userInput"
      @input="emit('input', ($event.target as HTMLInputElement).value)"
      :disabled="!isRunning"
    />
    <div class="buttons">
      <button @click="emit('start')">START</button>
      <button @click="emit('end')" :disabled="!isRunning">STOP</button>
      <div v-if="countdown > 0" class="countdown">{{ countdown }}</div>
    </div>
    <div class="streak">
      <PhFire class="icon" :size="30" :weight="fireSize" />
      {{ streak }}
    </div>
    <p>DEBUG: {{ progress }}</p>
    <ProgressBar :progress="progress" />
  </div>
</template>

<style scoped>
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

.word-display {
  display: flex;
  align-items: center;
  gap: 40px;
  position: relative;
}

.correct-feedback {
  animation: correct-pop 1000ms;
  color: var(--correct-word);
  font-weight: bold;
  position: absolute;
  right: -30px;
}

.streak {
  font-size: 25px;
}

.icon {
  color: orange;
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
</style>
