import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <div className="text-9xl">🧭</div>
      <h2 className="text-2xl font-extrabold mt-4">Página no encontrada</h2>
      <p className="text-gray-500">Volvamos al inicio</p>
      <Link to="/" className="inline-block mt-4 px-5 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold">Inicio</Link>
    </div>
  )
}

