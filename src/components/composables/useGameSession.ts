import { ref } from 'vue'

export function useGameSession() {
  const isRunning = ref(false)
  const showGameOver = ref(false)

  function showGameOverScreen() {
    showGameOver.value = true

    setTimeout(() => {
      showGameOver.value = false
    }, 4000)
  }

  return {
    isRunning,
    showGameOver,
    showGameOverScreen,
  }
}
