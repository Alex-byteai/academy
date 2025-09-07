import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProjectModal from '../components/forms/ProjectModal'
import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import FocusTimer from '../components/FocusTimer'

export default function DashboardPage() {
  const projects = useAppStore((s) => s.projects)
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-6">
      <FocusTimer />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Tus proyectos</h2>
        <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold">+ Nuevo</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(projects).map((p, i) => (
          <motion.div key={p.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }} className="card-shadow rounded-2xl bg-white p-5 hover:shadow-lg transition">
            <Link to={`/project/${p.id}`} className="block">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 ${p.color} rounded-full flex items-center justify-center text-2xl`}>{p.emoji}</div>
                <div>
                  <div className="font-extrabold">{p.name}</div>
                  <div className="text-sm text-gray-500">Tareas: {Object.values(useAppStore.getState().tasks).filter(t => t.projectId===p.id).length}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <ProjectModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

