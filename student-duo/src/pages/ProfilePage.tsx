import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const { studentId } = useParams()
  const progress = 68
  const badges = [
    { id: 'b1', name: 'Constante', color: 'bg-green-400', emoji: '🌟' },
    { id: 'b2', name: 'Puntual', color: 'bg-blue-400', emoji: '⏰' },
    { id: 'b3', name: 'Colaborador', color: 'bg-yellow-400', emoji: '🤝' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-green-400 flex items-center justify-center text-3xl">🙂</div>
        <div>
          <div className="text-xl font-extrabold">Estudiante #{studentId}</div>
          <div className="text-sm text-gray-500">Ingeniería de Software</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 card-shadow">
        <div className="mb-2 font-semibold">Progreso de participación</div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 card-shadow">
        <div className="mb-3 font-semibold">Insignias</div>
        <div className="flex flex-wrap gap-3">
          {badges.map((b, i) => (
            <motion.div key={b.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }} className={`px-3 py-2 rounded-full ${b.color} text-white font-bold flex items-center gap-2`}>
              <span>{b.emoji}</span>
              <span>{b.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

