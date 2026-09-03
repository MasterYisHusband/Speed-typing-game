import { ref, computed, watch } from 'vue'

export function useTypingGame() {
  const currentWord = ref('')
  const userInput = ref('')
  const wordsTyped = ref(0)
  const wpm = ref(0)
  const timer = ref()
  const isRunning = ref(false)
  const history = ref<number[]>([])
  const selectedDifficulty = ref('easy')

  async function getRandomWord() {
    let wordLength = 5

    if (selectedDifficulty.value === 'medium') {
      wordLength = 7
    }

    if (selectedDifficulty.value === 'difficult') {
      wordLength = 10
    }

    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}`)
    const data = await response.json()
    currentWord.value = data[0]
  }
  getRandomWord()

  function checkWord() {
    if (currentWord.value === userInput.value) {
      wordsTyped.value++
      getRandomWord()
      userInput.value = ''
    }
  }

  const testDuration = computed(() => {
    if (selectedDifficulty.value === 'easy') {
      return 180
    } else if (selectedDifficulty.value === 'medium') {
      return 120
    } else {
      return 60
    }
  })

  const timeLeft = ref(testDuration.value)

  function startGame() {
    if (isRunning.value === true) {
      return
    }
    wpm.value = 0
    wordsTyped.value = 0
    isRunning.value = true
    timeLeft.value = testDuration.value

    timer.value = setInterval(() => {
      timeLeft.value--
      if (timeLeft.value === 0) {
        clearInterval(timer.value)
        isRunning.value = false
        wpm.value = Math.ceil(wordsTyped.value / (testDuration.value / 60))
        history.value.push(wpm.value)
        timeLeft.value = testDuration.value
        userInput.value = ''
      }
    }, 1000)
  }

  watch(selectedDifficulty, () => {
    if (isRunning.value === false) {
      timeLeft.value = testDuration.value
      getRandomWord()
    }
  })

  function endGame() {
    clearInterval(timer.value)
    isRunning.value = false
    wpm.value = Math.ceil(wordsTyped.value / ((testDuration.value - timeLeft.value) / 60))
    history.value.push(wpm.value)
    timeLeft.value = testDuration.value
    userInput.value = ''
    getRandomWord()
  }

  return {
    currentWord,
    userInput,
    isRunning,
    history,
    selectedDifficulty,
    checkWord,
    timeLeft,
    startGame,
    endGame,
  }
}
