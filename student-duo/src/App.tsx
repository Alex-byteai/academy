import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  const { pathname } = useLocation()
  const showNavbar = pathname !== '/'
  return (
    <div className="min-h-screen app-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showNavbar && <Navbar />}
        <Outlet />
      </div>
    </div>
  )
}
