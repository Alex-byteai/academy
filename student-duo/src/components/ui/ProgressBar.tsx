import { motion } from 'framer-motion'

type Props = { value: number; color?: 'green' | 'blue' | 'yellow' }

export default function ProgressBar({ value, color = 'green' }: Props) {
  const bar = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-amber-500',
  }[color]
  return (
    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, Math.max(0, value))}%` }} className={`h-full ${bar}`} />
    </div>
  )
}

