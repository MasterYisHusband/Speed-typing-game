import { ref, computed, watch, nextTick } from 'vue'

export function useTypingGame() {
  console.log('useTypingGame läuft')
  const currentWord = ref('')
  const userInput = ref('')
  const wordsTyped = ref(0)
  const wpm = ref(0)
  const accuracy = ref(0)
  const timer = ref()
  const countdownTimer = ref()
  const countdown = ref(0)
  const showGameOver = ref(false)
  const isRunning = ref(false)
  const history = ref<{ wpm: number; accuracy: number }[]>([])
  const selectedDifficulty = ref<'easy' | 'medium' | 'difficult'>('easy')
  const selectedMode = ref<'word' | 'text'>('word')
  const correctCharacters = ref(0)
  const totalCharacters = ref(0)
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

  const wrongLetterSound = new Audio('public/sounds/wrong.mp3')
  const wrongWordSound = new Audio('public/sounds/wrong.mp3')

  async function getRandomWord() {
    console.log('getRandomWord läuft')
    let wordLength = 5

    if (selectedDifficulty.value === 'medium') {
      wordLength = 7
    }

    if (selectedDifficulty.value === 'difficult') {
      wordLength = 10
    }
    console.log('vor fetch')
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}`)
    const data = await response.json()
    currentWord.value = data[0]
    console.log(currentWord.value)
  }

  async function getRandomText() {
    let minlength = 20
    let maxlength = 50

    if (selectedDifficulty.value === 'medium') {
      minlength = 70
      maxlength = 110
    }

    if (selectedDifficulty.value === 'difficult') {
      minlength = 130
      maxlength = 180
    }

    let data

    do {
      const res = await fetch('https://dummyjson.com/quotes/random')
      data = await res.json()
    } while (data.quote.length < minlength || data.quote.length > maxlength)

    currentWord.value = data.quote
  }

  async function getRandomContent() {
    console.log('getRandomContent läuft')
    console.log('aktueller Mode:', selectedMode.value)
    if (selectedMode.value === 'word') {
      getRandomWord()
    } else {
      getRandomText()
    }
  }
  getRandomContent()

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
        wrongLetterSound.play()
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
      wrongWordSound.play()
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
            showGameOver.value = true
            setTimeout(() => {
              showGameOver.value = false
            }, 4000)

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
    if (elapsedTime > 0) {
      wpm.value = Math.ceil(wordsTyped.value / (elapsedTime / 60))
    } else {
      wpm.value = 0
    }
    updateAccuracy()

    history.value.push({ wpm: wpm.value, accuracy: accuracy.value })
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
