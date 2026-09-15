<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()
</script>

<template>
  <div v-if="show" class="easter-egg">
    <iframe
      width="800"
      height="450"
      src="//www.youtube.com/embed/JaeOZaVsXwU?autoplay=1&controls=0&rel=0"
      title="Easter Egg"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.easter-egg {
  position: fixed;
  top: 30%;
  right: 5%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
}

.easter-egg iframe {
  border: none;
}
</style>
