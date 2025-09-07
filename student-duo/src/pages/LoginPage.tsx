import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('sd_user')
    if (storedUser) navigate('/dashboard')
  }, [navigate])

  const handleLogin = () => {
    localStorage.setItem('sd_user', JSON.stringify({ id: 'me', name: 'Estudiante', avatarColor: '#22c55e' }))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }} className="mb-6">
          <div className="mx-auto h-24 w-24 rounded-full bg-green-400/90 flex items-center justify-center card-shadow">
            <span className="text-5xl">🟢</span>
          </div>
        </motion.div>
        <h1 className="text-3xl font-extrabold text-gray-800">StudentDuo</h1>
        <p className="text-gray-600 mt-2">Organiza tus tareas y colabora con tu grupo</p>
        <div className="mt-6 space-y-3">
          <button onClick={handleLogin} className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] w-72">Entrar con un toque</button>
          <div className="text-sm text-gray-500">o</div>
          <Link to="#" className="inline-block px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold transition-transform hover:scale-[1.02] w-72 text-center">Crear cuenta</Link>
        </div>
      </div>
    </div>
  )
}

