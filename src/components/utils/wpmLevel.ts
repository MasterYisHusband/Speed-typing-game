export function getWpmLevel(wpm: number): string {
  if (wpm < 20) return 'Beginner'
  if (wpm < 40) return 'Beginner / Casual'
  if (wpm < 60) return 'Average'
  if (wpm < 80) return 'Productive / Office Work'
  return 'Professional / Advanced'
}
