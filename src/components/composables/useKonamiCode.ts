import { ref, onMounted, onUnmounted } from 'vue'

export function useKonamiCode() {
  const showEasterEgg = ref(false)

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

  onMounted(() => {
    window.addEventListener('keydown', checkKonamiCode)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', checkKonamiCode)
  })

  return {
    showEasterEgg,
  }
}
