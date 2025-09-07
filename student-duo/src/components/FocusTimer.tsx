import { useEffect, useRef, useState } from 'react'
import Button from './ui/Button'
import { useAppStore } from '../store/appStore'
import { celebrateSmallWin } from '../utils/confetti'

function format(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const addXP = useAppStore((s) => s.addXP)

  useEffect(() => {
    if (!running) return
    intervalRef.current = window.setInterval(() => setSeconds((v) => v - 1), 1000)
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current) }
  }, [running])

  useEffect(() => {
    if (seconds <= 0 && running) {
      setRunning(false)
      setSeconds(5 * 60)
      addXP('me', 20)
      celebrateSmallWin()
    }
  }, [seconds, running, addXP])

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow flex items-center justify-between gap-4">
      <div>
        <div className="text-sm text-gray-500">Enfoque</div>
        <div className="text-3xl font-extrabold tabular-nums">{format(seconds)}</div>
      </div>
      <div className="flex items-center gap-2">
        {!running ? (
          <Button onClick={() => setRunning(true)}>Iniciar</Button>
        ) : (
          <Button variant="yellow" onClick={() => setRunning(false)}>Pausar</Button>
        )}
        <Button variant="gray" onClick={() => setSeconds(25 * 60)}>Reset</Button>
      </div>
    </div>
  )
}

