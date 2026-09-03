<script setup lang="ts">
const props = defineProps<{
  timeLeft: number
}>()
</script>

<template>
  <div>
    {{ props.timeLeft }}
  </div>
</template>
