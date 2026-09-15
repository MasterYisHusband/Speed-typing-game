import { ref, type Ref } from 'vue'

export function useGameTimer(testDuration: Ref<number>) {
  const timer = ref()
  const countdownTimer = ref()
  const countdown = ref(0)
  const timeLeft = ref(testDuration.value)

  function startCountdown(onFinished: () => void | Promise<void>) {
    countdown.value = 3

    countdownTimer.value = setInterval(() => {
      countdown.value--

      if (countdown.value === 0) {
        clearInterval(countdownTimer.value)
        onFinished()
      }
    }, 1000)
  }

  function startTimer(onFinished: () => void) {
    timer.value = setInterval(() => {
      timeLeft.value--

      if (timeLeft.value === 0) {
        clearInterval(timer.value)
        onFinished()
      }
    }, 1000)
  }

  function stopTimer() {
    clearInterval(timer.value)
  }

  return {
    timer,
    countdownTimer,
    countdown,
    timeLeft,
    startCountdown,
    startTimer,
    stopTimer,
  }
}
