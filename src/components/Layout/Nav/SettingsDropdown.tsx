import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center gap-1 p-1 hover:text-pink-600 dark:hover:text-pink-400 transition-colors group"
        aria-label="Settings menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Settings className="w-5 h-5 text-gray-800 dark:text-gray-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
        <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Settings</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-3 w-56 z-50">
          {/* Theme Toggle */}
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
            <button
              onClick={toggleTheme}
              role="switch"
              aria-checked={theme === 'dark'}
              aria-label="Toggle theme"
              className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full w-12 h-6 p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 dark:focus:ring-pink-400"
              style={{
                backgroundColor: theme === 'dark' ? '#ec4899' : '#e5e7eb',
              }}
            >
              <div
                className="flex items-center justify-center w-5 h-5 bg-white rounded-full shadow transition-transform"
                style={{
                  transform: theme === 'dark' ? 'translateX(24px)' : 'translateX(0)',
                }}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-gray-800" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-500" />
                )}
              </div>
            </button>
          </div>

          {/* Auth Links */}
          <Link
            to="/signin"
            onClick={() => setIsOpen(false)}
            className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  )
}
