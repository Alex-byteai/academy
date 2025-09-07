import confetti from 'canvas-confetti'

export function celebrateSmallWin() {
  const end = Date.now() + 400
  const colors = ['#22c55e', '#3b82f6', '#f59e0b']
  const frame = () => {
    confetti({
      particleCount: 18,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.8 },
      colors,
      scalar: 0.9,
    })
    confetti({
      particleCount: 18,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.8 },
      colors,
      scalar: 0.9,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

