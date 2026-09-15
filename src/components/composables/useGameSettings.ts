import { ref, computed } from 'vue'

type Difficulty = 'easy' | 'medium' | 'difficult'
type Mode = 'word' | 'text'

export function useGameSettings() {
  const selectedDifficulty = ref<Difficulty>('easy')
  const selectedMode = ref<Mode>('word')

  const testDuration = computed(() => {
    if (selectedDifficulty.value === 'easy') {
      return 180
    } else if (selectedDifficulty.value === 'medium') {
      return 120
    } else {
      return 60
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

  return {
    selectedDifficulty,
    selectedMode,
    testDuration,
    difficultyselected,
  }
}
