import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/appStore'
import ProgressBar from '../components/ui/ProgressBar'
import { getBadgesFor } from '../utils/badges'

export default function ProfilePage() {
  const { studentId } = useParams()
  const me = useAppStore((s) => s.students[studentId ?? 'me'])
  const progress = Math.min(100, me ? (me.xp % 100) : 0)
  const badges = me ? getBadgesFor(me) : []
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-green-400 flex items-center justify-center text-3xl">🙂</div>
        <div>
          <div className="text-xl font-extrabold">{me?.name ?? `Estudiante #${studentId}`}</div>
          <div className="text-sm text-gray-500">XP: {me?.xp ?? 0} • Racha: {me?.streak ?? 0} 🔥 • Tareas: {me?.tasksCompleted ?? 0}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 card-shadow">
        <div className="mb-2 font-semibold">Progreso al siguiente nivel</div>
        <ProgressBar value={progress} color="green" />
      </div>

      <div className="bg-white rounded-2xl p-4 card-shadow">
        <div className="mb-3 font-semibold">Insignias</div>
        <div className="flex flex-wrap gap-3">
          {badges.map((b, i) => (
            <motion.div key={b.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }} className={`px-3 py-2 rounded-full ${b.earned ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-500'} font-bold flex items-center gap-2`}>
              <span>{b.emoji}</span>
              <span>{b.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

