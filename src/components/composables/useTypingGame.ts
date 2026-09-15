import { ref, computed, watch, nextTick } from 'vue'
import { useGameContent } from './useGameContent'
import { useTypingStats } from './useTypingStats'
import { useGameTimer } from './useGameTimer'
import { useKonamiCode } from './useKonamiCode'
import { useHighscore } from './useHighscore'
import { useGameSession } from './useGameSession'
import { useGameSettings } from './useGameSettings'
import { useTypingFeedback } from './useTypingFeedback'

export function useTypingGame() {
  const { selectedDifficulty, selectedMode, testDuration, difficultyselected } = useGameSettings()
  const { currentWord, getRandomContent } = useGameContent(selectedDifficulty, selectedMode)
  getRandomContent()
  const { accuracy, resetStats, history, clearHistory, recordCharacters, recordWord, finishStats } =
    useTypingStats()
  const { highscore, updateHighscore, loadCurrentHighscore } = useHighscore()
  const userInput = ref('')
  const { isRunning, showGameOver, showGameOverScreen } = useGameSession()
  const { showEasterEgg } = useKonamiCode()
  const streak = ref(0)
  const { correctFeedback, shakeFeedback, showCorrectFeedback, showShakeFeedback } =
    useTypingFeedback()
  const lastInputLength = ref(0)

  function checkWord() {
    const input = userInput.value
    if (input.length > lastInputLength.value) {
      const index = input.length - 1
      const typedCharacter = input[index]
      const correctCharacter = currentWord.value[index]
      const isCorrect = typedCharacter === correctCharacter
      recordCharacters(isCorrect)
      if (!isCorrect) {
        streak.value = 0
        showShakeFeedback()
      }

      if (currentWord.value === userInput.value) {
        recordWord()
        streak.value++
        updateHighscore(selectedMode.value, selectedDifficulty.value, streak.value)
        showCorrectFeedback()
        getRandomContent()
        userInput.value = ''
        lastInputLength.value = 0
        return
      }
    }
    lastInputLength.value = input.length
  }

  const { countdown, timeLeft, startCountdown, startTimer, stopTimer } = useGameTimer(testDuration)

  function finishGame(elapsedTime: number) {
    finishStats(elapsedTime)
    timeLeft.value = testDuration.value
    userInput.value = ''
    lastInputLength.value = 0
  }

  function startGame() {
    if (isRunning.value) {
      return
    }

    resetStats()
    streak.value = 0
    timeLeft.value = testDuration.value
    lastInputLength.value = 0

    startCountdown(async () => {
      isRunning.value = true

      startTimer(() => {
        isRunning.value = false
        showGameOverScreen()
        finishGame(testDuration.value)
      })
    })
  }

  function updateGameSettings() {
    if (!isRunning.value) {
      timeLeft.value = testDuration.value
      clearHistory()
      loadCurrentHighscore(selectedMode.value, selectedDifficulty.value)
      getRandomContent()
    }
  }

  watch(selectedDifficulty, updateGameSettings)

  watch(selectedMode, () => {
    if (!isRunning.value) {
      loadCurrentHighscore(selectedMode.value, selectedDifficulty.value)
      getRandomContent()
    }
  })

  function endGame() {
    stopTimer()
    isRunning.value = false

    const elapsedTime = testDuration.value - timeLeft.value

    finishGame(elapsedTime)

    getRandomContent()
  }

  loadCurrentHighscore(selectedMode.value, selectedDifficulty.value)

  const fireSize = computed(() => {
    if (streak.value >= 10) {
      return 'fill'
    } else if (streak.value >= 5) {
      return 'bold'
    } else {
      return 'light'
    }
  })

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
    countdown,
    highscore,
    fireSize,
    selectedMode,
    showEasterEgg,
    showGameOver,
  }
}
