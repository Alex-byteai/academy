import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const sampleProjects = [
  { id: 'p1', name: 'Proyecto Matemáticas', color: 'bg-green-400', emoji: '📘' },
  { id: 'p2', name: 'Trabajo Historia', color: 'bg-blue-400', emoji: '📜' },
  { id: 'p3', name: 'Laboratorio Física', color: 'bg-yellow-400', emoji: '🧪' },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold">Tus proyectos</h2>
        <button className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold">+ Nuevo</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProjects.map((p, i) => (
          <motion.div key={p.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }} className="card-shadow rounded-2xl bg-white p-5 hover:shadow-lg transition">
            <Link to={`/project/${p.id}`} className="block">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 ${p.color} rounded-full flex items-center justify-center text-2xl`}>{p.emoji}</div>
                <div>
                  <div className="font-extrabold">{p.name}</div>
                  <div className="text-sm text-gray-500">12 tareas • 3 miembros</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

