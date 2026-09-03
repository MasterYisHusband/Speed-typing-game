<script setup lang="ts">
const props = defineProps<{
  currentWord: string
  userInput: string
}>()
</script>

<template>
  <div v-for="(character, index) in props.currentWord.split('')">
    <span
      :class="{
        correct: props.currentWord[index] === props.userInput[index],
        wrong:
          props.userInput[index] !== undefined &&
          props.currentWord[index] !== props.userInput[index],
      }"
      >{{ character }}</span
    >
  </div>
</template>

<style scoped>
.correct {
  color: var(--correct-word);
}

.wrong {
  color: var(--wrong-word);
}
</style>
