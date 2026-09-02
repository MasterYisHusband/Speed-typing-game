<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const selectedDifficulty = ref('easy')

const currentWord = ref('')

const userInput = ref('')

const wordsTyped = ref(0)

const wpm = ref(0)

const isRunning = ref(false)

const history = ref<number[]>([])

async function getRandomWord() {
  const response = await fetch('https://random-word-api.herokuapp.com/word')
  const data = await response.json()
  currentWord.value = data[0]
}
getRandomWord()

function checkWord() {
  if (currentWord.value === userInput.value) {
    wordsTyped.value++
    getRandomWord()
    userInput.value = ''
  }
}

function startGame() {
  if (isRunning.value === true) {
    return
  }
  wpm.value = 0
  wordsTyped.value = 0
  isRunning.value = true
  timeLeft.value = testDuration.value

  const timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value === 0) {
      clearInterval(timer)
      isRunning.value = false
      wpm.value = wordsTyped.value / (testDuration.value / 60)
      history.value.push(wpm.value)
      timeLeft.value = testDuration.value
      userInput.value = ''
    }
  }, 1000)
}

const testDuration = computed(() => {
  if (selectedDifficulty.value === 'easy') {
    return 180
  } else if (selectedDifficulty.value === 'medium') {
    return 120
  } else {
    return 60
  }
})

const timeLeft = ref(testDuration.value)
</script>

<!-- Template -->
<template>
  <p>{{ currentWord }}</p>

  <div v-for="(character, index) in currentWord.split('')">
    <span
      :class="{
        correct: currentWord[index] === userInput[index],
        wrong: userInput[index] !== undefined && currentWord[index] !== userInput[index],
      }"
      >{{ character }}</span
    >
  </div>

  <input v-model="userInput" @input="checkWord" :disabled="!isRunning" />

  <button @click="startGame">START</button>
  <div>
    {{ timeLeft }}
  </div>

  <div>
    <p v-for="(character, index) in history">Round {{ index + 1 }}: {{ character }} WPM</p>
  </div>

  <button @click="selectedDifficulty = 'easy'">Easy</button>
  <button @click="selectedDifficulty = 'medium'">Medium</button>
  <button @click="selectedDifficulty = 'difficult'">Difficult</button>
</template>

<!-- CSS -->
<style>
.correct {
  color: green;
}

.wrong {
  color: red;
}
</style>
