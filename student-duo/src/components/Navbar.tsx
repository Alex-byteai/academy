import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-green-500 text-white flex items-center justify-center font-extrabold">S</div>
          <span className="font-extrabold">StudentDuo</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <NavLink to="/dashboard" className={({ isActive }) => `px-3 py-1.5 rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}>Dashboard</NavLink>
          <NavLink to="/group/g1" className={({ isActive }) => `px-3 py-1.5 rounded-full ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>Grupo</NavLink>
          <NavLink to="/profile/me" className={({ isActive }) => `px-3 py-1.5 rounded-full ${isActive ? 'bg-amber-100 text-amber-700' : 'hover:bg-gray-100'}`}>Perfil</NavLink>
        </nav>
      </div>
    </div>
  )
}

