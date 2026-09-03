<script setup lang="ts">
const props = defineProps<{
  currentWord: string
  userInput: string
}>()
</script>

<template>
  <div class="characters">
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
  </div>
</template>

<style scoped>
.characters {
  display: flex;
  gap: 5px;
  font-size: 30px;
}

select {
  width: 250px;
  height: 45px;
  font-size: 18px;
  padding: 0 10px;
}

.correct {
  color: var(--correct-word);
}

.wrong {
  color: var(--wrong-word);
}
</style>
