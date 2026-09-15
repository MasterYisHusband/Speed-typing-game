import { ref } from 'vue'

export function useTypingFeedback() {
  const correctFeedback = ref(false)
  const shakeFeedback = ref(false)

  function showCorrectFeedback() {
    correctFeedback.value = true

    setTimeout(() => {
      correctFeedback.value = false
    }, 500)
  }
  function showShakeFeedback() {
    shakeFeedback.value = true

    setTimeout(() => {
      shakeFeedback.value = false
    }, 500)
  }
  return {
    correctFeedback,
    shakeFeedback,
    showCorrectFeedback,
    showShakeFeedback,
  }
}
