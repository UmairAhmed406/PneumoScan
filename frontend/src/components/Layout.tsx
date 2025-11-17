import { Link, useLocation } from 'react-router-dom'
import { Activity, Home, Microscope, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

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
      <footer className="border-t bg-muted/50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">PneumoScan</span>
            </div>

            <div className="max-w-2xl mx-auto p-4 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-sm font-semibold text-destructive mb-2">
                ⚠️ MEDICAL DISCLAIMER
              </p>
              <p className="text-xs text-muted-foreground">
                This tool is for educational and research purposes only. It is NOT a medical device and should NEVER be used for clinical diagnosis. Always consult qualified healthcare professionals for medical advice.
              </p>
            </div>

            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <a
                href="https://github.com/UmairAhmed406/PneumoScan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <Link to="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/research" className="hover:text-primary transition-colors">
                Research
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              © 2024 PneumoScan. Open Source under MIT License.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
