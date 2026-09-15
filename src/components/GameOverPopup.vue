<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()
</script>

<template>
  <div v-if="show" class="game-over">
    <div class="game-over-popup">
      <h1>GAME OVER</h1>
      <iframe
        width="800"
        height="450"
        src="//www.youtube.com/embed/JHXxpDQRVxk?autoplay=1&start=3&end=7&controls=0&rel=0"
        title="mmaaAAAaah"
        allow="autoplay; encrypted.media"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.game-over {
  position: fixed;
  top: 30%;
  right: 8%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
}

.game-over-popup {
  background-color: color-mix(in srgb, darkgray 10%, black 90%);
  border: 1px solid red;
  border-radius: 18px;
  padding: 20px;
  color: red;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.game-over-popup h1 {
  font-weight: bold;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.game-over-popup iframe {
  border: none;
}
</style>
