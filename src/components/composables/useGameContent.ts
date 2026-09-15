import { ref, type Ref } from 'vue'

type Difficulty = 'easy' | 'medium' | 'difficult'
type Mode = 'word' | 'text'

export function useGameContent(selectedDifficulty: Ref<Difficulty>, selectedMode: Ref<Mode>) {
  const currentWord = ref('')

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

  return {
    currentWord,
    getRandomContent,
  }
}
