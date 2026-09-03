import { ref } from 'vue'

export function useTypingGame() {
  const currentWord = ref('')
  const userInput = ref('')
  const wordsTyped = ref(0)
  const wpm = ref(0)
  const timer = ref()
  const isRunning = ref(false)
  const history = ref<number[]>([])
  return {
    currentWord,
    userInput,
    wordsTyped,
    wpm,
    timer,
    isRunning,
    history,
  }
}
