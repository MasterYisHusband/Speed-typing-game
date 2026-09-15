import { ref } from 'vue'

export function useHighscore() {
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

  function loadHighscores() {
    const savedHighscores = localStorage.getItem('highscores')

    if (savedHighscores !== null) {
      highscores.value = JSON.parse(savedHighscores)
    }
  }
  function saveHighscores() {
    localStorage.setItem('highscores', JSON.stringify(highscores.value))
  }

  function updateHighscore(
    mode: 'word' | 'text',
    difficulty: 'easy' | 'medium' | 'difficult',
    streak: number,
  ) {
    if (streak > highscore.value) highscore.value = streak
    highscores.value[mode][difficulty] = streak
    saveHighscores()
  }

  function loadCurrentHighscore(
    mode: 'word' | 'text',
    difficulty: 'easy' | 'medium' | 'difficult',
  ) {
    highscore.value = highscores.value[mode][difficulty]
  }

  loadHighscores()

  return {
    highscore,
    highscores,
    saveHighscores,
    updateHighscore,
    loadCurrentHighscore,
  }
}
