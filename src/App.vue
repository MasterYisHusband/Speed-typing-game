<script setup lang="ts">
import { ref } from 'vue'

const text: string = 'Hello'

const userInput = ref('')
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

  <input v-model="userInput" />
  <p>{{ userInput }}</p>
</template>

<style>
.correct {
  color: green;
}

.wrong {
  color: red;
}
</style>
