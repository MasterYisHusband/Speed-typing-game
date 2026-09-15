import { ref } from 'vue'

export function useTypingStats() {
  const wordsTyped = ref(0)
  const wpm = ref(0)
  const accuracy = ref(0)
  const correctCharacters = ref(0)
  const totalCharacters = ref(0)
  const history = ref<{ wpm: number; accuracy: number }[]>([])

  function updateAccuracy() {
    if (totalCharacters.value === 0) {
      accuracy.value = 0
      return
    }
    accuracy.value = Math.round((correctCharacters.value / totalCharacters.value) * 100)
  }

  function calculateWpm(elapsedTime: number) {
    if (elapsedTime <= 0) {
      wpm.value = 0
      return
    }
    wpm.value = Math.ceil(wordsTyped.value / (elapsedTime / 60))
  }

  function resetStats() {
    wordsTyped.value = 0
    wpm.value = 0
    accuracy.value = 0
    correctCharacters.value = 0
    totalCharacters.value = 0
  }

  function addHistoryEntry() {
    history.value.push({
      wpm: wpm.value,
      accuracy: accuracy.value,
    })
  }

  function clearHistory() {
    history.value = []
  }

  function recordCharacters(isCorrect: boolean) {
    totalCharacters.value++

    if (isCorrect) {
      correctCharacters.value++
    }
  }

  function recordWord() {
    wordsTyped.value++
  }

  return {
    wordsTyped,
    wpm,
    accuracy,
    correctCharacters,
    totalCharacters,
    updateAccuracy,
    calculateWpm,
    resetStats,
    history,
    addHistoryEntry,
    clearHistory,
    recordCharacters,
    recordWord,
  }
}
