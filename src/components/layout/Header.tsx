import { Link, useLocation } from 'react-router-dom'
import { Radar, History, Home } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-lg no-underline">
          <Radar className="w-6 h-6" />
          Innovatieradar
        </Link>
        {!isHome && (
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary no-underline transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary no-underline transition-colors"
            >
              <History className="w-4 h-4" />
              Geschiedenis
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
