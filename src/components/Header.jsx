import React, { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Apply/remove 'dark' class on <html>
  useEffect(() => {
    const root = window.document.documentElement
    if (darkMode) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [darkMode])

  return (
    <header className="w-full bg-gray-900 dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center invert">
            <img
              src={logo}
              alt="IMCN Logo"
              className="h-auto w-auto rounded-lg object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <MobileNavigation closeMenu={() => setIsMenuOpen(false)} />
        )}
      </div>
    </header>
  )
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/team', label: 'Team' },
  { to: '/publications', label: 'Publications' },
  { to: '/code-and-data', label: 'Code & Data' },
  { to: '/app', label: 'App' },
  { to: '/contact', label: 'Contact' },
  { to: '/spring-school', label: 'Spring School' },
]

const Navigation = () => (
  <nav
    className="hidden md:flex items-center space-x-3 ml-12"
    role="navigation"
    aria-label="Primary"
  >
    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-medium transition-colors ${
            isActive
              ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-400'
              : 'text-white dark:text-gray-200 hover:text-gray-600 hover:bg-white dark:hover:text-gray-300 dark:hover:bg-gray-700'
          }`
        }
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
)

const MobileNavigation = ({ closeMenu }) => (
  <div
    id="mobile-nav"
    className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 w-full"
    role="navigation"
    aria-label="Mobile"
  >
    <nav className="flex flex-col space-y-4 px-2">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={closeMenu}
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-2 rounded"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  </div>
)

export default Header
