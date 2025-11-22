import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

interface Category {
  slug: string
  title: string
  icon: string
}

const CATEGORIES: Category[] = [
  { slug: 'all', title: 'All Collections', icon: '🏪' },
  { slug: 'mens-wear', title: "Men's Wear", icon: '👕' },
  { slug: 'womens-wear', title: "Women's Wear", icon: '👗' },
  { slug: 'jewellery', title: 'Jewellery', icon: '💍' },
  { slug: 'electronics', title: 'Electronics', icon: '📱' },
  { slug: 'backpacks-bags', title: 'Backpacks & Bags', icon: '🎒' },
]

export function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-1 text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
        aria-label="All Categories"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        All Categories
        <ChevronDown size={16} className={`transition-transform text-gray-800 dark:text-gray-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-3 px-3 w-64 z-50"
          onMouseLeave={() => setIsOpen(false)}
          role="menu"
        >
          <div className="space-y-1">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                role="menuitem"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
