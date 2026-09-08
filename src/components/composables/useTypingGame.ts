import { isPropertyAccessOrQualifiedName } from 'typescript'
import { ref, computed, watch } from 'vue'
import { compileScript } from 'vue/compiler-sfc'

export function useTypingGame() {
  const currentWord = ref('')
  const userInput = ref('')
  const wordsTyped = ref(0)
  const wpm = ref(0)
  const accuracy = ref(0)
  const timer = ref()
  const isRunning = ref(false)
  const history = ref<{ wpm: number; accuracy: number }[]>([])
  const selectedDifficulty = ref('easy')
  const correctCharacters = ref(0)
  const totalCharacters = ref(0)

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
    const input = userInput.value
    if (input.length > totalCharacters.value % currentWord.value.length) {
      const index = input.length - 1
      const typedCharacter = input[index]
      const correctCharacter = currentWord.value[index]
      totalCharacters.value++
      if (typedCharacter === correctCharacter) {
        correctCharacters.value++
      }
    }
    if (currentWord.value === userInput.value) {
      wordsTyped.value++
      getRandomWord()
      userInput.value = ''
    }
    updateAccuracy()
  }

  function updateAccuracy() {
    if (totalCharacters.value === 0) {
      accuracy.value = 0
      return
    }
    accuracy.value = Math.round((correctCharacters.value / totalCharacters.value) * 100)
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
    accuracy.value = 0
    correctCharacters.value = 0
    totalCharacters.value = 0
    isRunning.value = true
    timeLeft.value = testDuration.value

    timer.value = setInterval(() => {
      timeLeft.value--
      if (timeLeft.value === 0) {
        clearInterval(timer.value)
        isRunning.value = false
        wpm.value = Math.ceil(wordsTyped.value / (testDuration.value / 60))

        updateAccuracy()

        history.value.push({ wpm: wpm.value, accuracy: accuracy.value })
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

  const difficultyselected = computed(() => {
    if (selectedDifficulty.value === 'easy') {
      return '--easy-difficulty'
    } else if (selectedDifficulty.value === 'medium') {
      return '--medium-difficulty'
    } else {
      return '--difficult-difficulty'
    }
  })

  function endGame() {
    clearInterval(timer.value)
    isRunning.value = false
    const elapsedTime = testDuration.value - timeLeft.value
    if (elapsedTime > 0) {
      wpm.value = Math.ceil(wordsTyped.value / (elapsedTime / 60))
    } else {
      wpm.value = 0
    }
    updateAccuracy()

    history.value.push({ wpm: wpm.value, accuracy: accuracy.value })
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
    accuracy,
    difficultyselected,
  }
}
