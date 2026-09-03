<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <button @click="selectedDifficulty = 'easy'">Easy</button>
  <button @click="selectedDifficulty = 'medium'">Medium</button>
  <button @click="selectedDifficulty = 'difficult'">Difficult</button>
</template>
