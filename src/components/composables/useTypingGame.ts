import { isPropertyAccessOrQualifiedName } from 'typescript'
import { ref, computed, watch, nextTick } from 'vue'
import { compileScript } from 'vue/compiler-sfc'

export function useTypingGame() {
  const currentWord = ref('')
  const userInput = ref('')
  const wordsTyped = ref(0)
  const wpm = ref(0)
  const accuracy = ref(0)
  const timer = ref()
  const countdownTimer = ref()
  const countdown = ref(0)
  const isRunning = ref(false)
  const history = ref<{ wpm: number; accuracy: number }[]>([])
  const selectedDifficulty = ref('easy')
  const correctCharacters = ref(0)
  const totalCharacters = ref(0)
  const streak = ref(0)
  const correctFeedback = ref(false)
  const shakeFeedback = ref(false)
  const typingInput = ref()
  const highscore = ref(0)

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
      } else {
        streak.value = 0
        shakeFeedback.value = true
        setTimeout(() => {
          shakeFeedback.value = false
        }, 500)
      }
    }
    if (currentWord.value === userInput.value) {
      wordsTyped.value++
      streak.value++
      if (streak.value > highscore.value) {
        highscore.value = streak.value
        localStorage.setItem('highscore', JSON.stringify(highscore.value))
      }
      correctFeedback.value = true
      setTimeout(() => {
        correctFeedback.value = false
      }, 500)
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
    streak.value = 0

    countdown.value = 3
    timeLeft.value = testDuration.value

    countdownTimer.value = setInterval(async () => {
      countdown.value--

      if (countdown.value === 0) {
        clearInterval(countdownTimer.value)
        isRunning.value = true

        await nextTick()
        typingInput.value?.focus()

        timer.value = setInterval(() => {
          timeLeft.value--

          if (timeLeft.value === 0) {
            clearInterval(timer.value)
            isRunning.value = false

            wpm.value = Math.ceil(wordsTyped.value / (testDuration.value / 60))

            updateAccuracy()

            history.value.push({
              wpm: wpm.value,
              accuracy: accuracy.value,
            })

            timeLeft.value = testDuration.value
            userInput.value = ''
          }
        }, 1000)
      }
    }, 1000)
  }
  timeLeft.value = testDuration.value

  watch(selectedDifficulty, () => {
    if (isRunning.value === false) {
      timeLeft.value = testDuration.value
      history.value = []
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

  const savedHighscore = localStorage.getItem('highscore')
  if (savedHighscore !== null) {
    highscore.value = JSON.parse(savedHighscore)
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
    streak,
    correctFeedback,
    shakeFeedback,
    countdownTimer,
    typingInput,
    countdown,
    highscore,
  }
}
