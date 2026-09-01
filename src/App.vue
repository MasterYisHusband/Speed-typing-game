<script setup lang="ts">
import { ref } from 'vue'

const text: string = 'Hello'

const userInput = ref('')

const wpm = ref(0)

const isRunning = ref(false)

const timeLeft = ref(30)

function startGame() {
  isRunning.value = true

  const timer = setInterval(() => {
    timeLeft.value--

    if (timeLeft.value === 0) {
      clearInterval(timer)
      isRunning.value = false
      wpm.value = userInput.value.split(' ').length / 0.5
      timeLeft.value = 30
    }
  }, 1000)
}
</script>

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

  <p>{{ wpm }}</p>
</template>

<style>
.correct {
  color: green;
}

.wrong {
  color: red;
}
</style>
