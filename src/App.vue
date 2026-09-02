<script setup lang="ts">
import { ref } from 'vue'

const text: string = 'Hallo'

const userInput = ref('')

const wpm = ref(0)

const isRunning = ref(false)

const timeLeft = ref(30)

const history = ref<number[]>([])

function startGame() {
  if (isRunning.value === true) {
    return
  }
  isRunning.value = true

  const timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value === 0) {
      clearInterval(timer)
      isRunning.value = false
      wpm.value = userInput.value.split(' ').length / (30 / 60)
      history.value.push(wpm.value)
      timeLeft.value = 30
      userInput.value = ''
    }
  }, 1000)
}
</script>

<!-- Template -->
<template>
  <div v-for="(character, index) in text.split('')">
    <span
      :class="{
        correct: text[index] === userInput[index],
        wrong: userInput[index] !== undefined && text[index] !== userInput[index],
      }"
      >{{ character }}</span
    >
  </div>

  <input v-model="userInput" :disabled="!isRunning" />

  <button @click="startGame">START</button>
  <div>
    {{ timeLeft }}
  </div>

  <div>
    <p v-for="(character, index) in history">Round {{ index + 1 }}: {{ character }} WPM</p>
  </div>
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
