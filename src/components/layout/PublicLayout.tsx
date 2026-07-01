import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, Home, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { DeveloperCredit } from '../ui/DeveloperCredit';
import { SITE } from '../../config/site';

interface PublicNavbarProps {
  variant?: 'light' | 'dark';
}

export function PublicNavbar({ variant = 'light' }: PublicNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isDark = variant === 'dark';

  const linkClass = (active: boolean) =>
    `px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
      active
        ? isDark
          ? 'bg-white/15 text-white'
          : 'bg-primary-50 text-primary-700'
        : isDark
          ? 'text-white/80 hover:bg-white/10 hover:text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/#how-it-works', label: 'How It Works', icon: null, isAnchor: true },
    { to: '/login', label: 'Login', icon: LogIn, matchTab: false },
    { to: '/login?tab=register', label: 'Register', icon: UserPlus, matchTab: true },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b ${
        isDark
          ? 'border-white/10 bg-slate-900/80 backdrop-blur-xl'
          : 'border-gray-200/80 bg-white/90 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg shadow-primary-600/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="text-white" size={20} />
            </div>
            <div className="min-w-0 hidden sm:block">
              <p className={`text-sm font-bold leading-tight truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                School Scheduling
              </p>
              <p className={`text-[10px] font-medium ${isDark ? 'text-primary-300' : 'text-primary-600'}`}>
                Academic Management
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a key={link.label} href={link.to} className={linkClass(false)}>
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={linkClass(
                    link.matchTab
                      ? location.pathname === '/login' && location.search.includes('tab=register')
                      : location.pathname === link.to && !location.search.includes('tab=register')
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2.5 rounded-xl transition-colors ${
              isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav className={`md:hidden pb-4 space-y-1 animate-fade-in border-t pt-3 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block ${linkClass(false)}`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block ${linkClass(
                    link.matchTab
                      ? location.pathname === '/login' && location.search.includes('tab=register')
                      : location.pathname === link.to && !location.search.includes('tab=register')
                  )}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export function PublicFooter({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const isDark = variant === 'dark';

  return (
    <footer
      className={`border-t ${
        isDark ? 'border-white/10 bg-slate-950 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} className={isDark ? 'text-primary-400' : 'text-primary-600'} />
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {SITE.name}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link to="/" className="hover:text-primary-600 transition-colors font-medium">Home</Link>
            <a href="/#how-it-works" className="hover:text-primary-600 transition-colors font-medium">How It Works</a>
            <Link to="/login" className="hover:text-primary-600 transition-colors font-medium">Login</Link>
            <Link to="/login?tab=register" className="hover:text-primary-600 transition-colors font-medium">Register</Link>
          </div>
        </div>
        <DeveloperCredit variant={isDark ? 'footer-dark' : 'footer'} className="mt-6" />
      </div>
    </footer>
  );
}

interface PublicLayoutProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

export function PublicLayout({ children, variant = 'light', className = '' }: PublicLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <PublicNavbar variant={variant} />
      <main className="flex-1">{children}</main>
      <PublicFooter variant={variant} />
    </div>
  );
}
