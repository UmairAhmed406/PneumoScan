import { Link, useLocation } from 'react-router-dom'
import { Activity, Home, Microscope, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/analyze', label: 'Analyze', icon: Activity },
    { path: '/research', label: 'Research', icon: Microscope },
    { path: '/about', label: 'About', icon: Info },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">PneumoScan</span>
            </Link>

            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Layout
