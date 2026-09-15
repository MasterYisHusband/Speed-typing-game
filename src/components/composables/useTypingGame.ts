import { ref, computed, watch, nextTick } from 'vue'
import { useGameContent } from './useGameContent'
import { useTypingStats } from './useTypingStats'

export function useTypingGame() {
  console.log('useTypingGame läuft')
  const selectedDifficulty = ref<'easy' | 'medium' | 'difficult'>('easy')
  const selectedMode = ref<'word' | 'text'>('word')
  const { currentWord, getRandomContent } = useGameContent(selectedDifficulty, selectedMode)
  getRandomContent()
  const {
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
  } = useTypingStats()
  const userInput = ref('')
  const timer = ref()
  const countdownTimer = ref()
  const countdown = ref(0)
  const showGameOver = ref(false)
  const isRunning = ref(false)
  const streak = ref(0)
  const correctFeedback = ref(false)
  const shakeFeedback = ref(false)
  const showEasterEgg = ref(false)
  const typingInput = ref()
  const highscore = ref(0)
  const highscores = ref({
    word: {
      easy: 0,
      medium: 0,
      difficult: 0,
    },
    text: {
      easy: 0,
      medium: 0,
      difficult: 0,
    },
  })

  function checkWord() {
    const input = userInput.value
    if (input.length > totalCharacters.value % currentWord.value.length) {
      const index = input.length - 1
      const typedCharacter = input[index]
      const correctCharacter = currentWord.value[index]
      const isCorrect = typedCharacter === correctCharacter
      recordCharacters(isCorrect)
      if (!isCorrect) {
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
        highscores.value[selectedMode.value][selectedDifficulty.value] = streak.value
        localStorage.setItem('highscores', JSON.stringify(highscores.value))
      }
      correctFeedback.value = true
      setTimeout(() => {
        correctFeedback.value = false
      }, 500)
      getRandomContent()
      userInput.value = ''
    }

    if (
      userInput.value.length === currentWord.value.length &&
      currentWord.value !== userInput.value
    ) {
    }

    updateAccuracy()
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
    resetStats()
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
            showGameOver.value = true
            setTimeout(() => {
              showGameOver.value = false
            }, 4000)

            calculateWpm(testDuration.value)
            updateAccuracy()
            addHistoryEntry()

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
      clearHistory()
      highscore.value = highscores.value[selectedMode.value][selectedDifficulty.value]
      getRandomContent()
    }
  })

  watch(selectedMode, () => {
    if (isRunning.value === false) {
      highscore.value = highscores.value[selectedMode.value][selectedDifficulty.value]
      getRandomContent()
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
    calculateWpm(elapsedTime)
    updateAccuracy()
    addHistoryEntry()
    timeLeft.value = testDuration.value
    userInput.value = ''
    getRandomContent()
  }

  const savedHighscores = localStorage.getItem('highscores')
  if (savedHighscores !== null) {
    highscores.value = JSON.parse(savedHighscores)
  }
  highscore.value = highscores.value[selectedMode.value][selectedDifficulty.value]

  const fireSize = computed(() => {
    if (streak.value >= 10) {
      return 'fill'
    } else if (streak.value >= 5) {
      return 'bold'
    } else {
      return 'light'
    }
  })

  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ]
  let konamiIndex = 0

  function checkKonamiCode(event: KeyboardEvent) {
    if (event.key === konamiCode[konamiIndex]) {
      konamiIndex++

      if (konamiIndex === konamiCode.length) {
        console.log('KONAMI CODE AKTIVIERT')
        showEasterEgg.value = true
        konamiIndex = 0
      }
    } else {
      konamiIndex = 0
    }
  }

  window.addEventListener('keydown', checkKonamiCode)

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
    fireSize,
    selectedMode,
    showEasterEgg,
    showGameOver,
  }
}
