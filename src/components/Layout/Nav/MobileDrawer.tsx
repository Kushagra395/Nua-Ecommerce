import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, ChevronRight, Search } from 'lucide-react'
import { SearchBar } from './SearchBar'

interface MobileDrawerProps {
  onClose: () => void
  onSearch: (query: string) => void
}

const CATEGORIES = [
  { slug: 'all', title: 'All Collections' },
  { slug: 'mens-wear', title: "Men's Wear" },
  { slug: 'womens-wear', title: "Women's Wear" },
  { slug: 'jewellery', title: 'Jewellery' },
  { slug: 'electronics', title: 'Electronics' },
  { slug: 'backpacks-bags', title: 'Backpacks & Bags' },
]

const QUICK_LINKS = [
  { title: 'My Account', href: '#' },
  { title: 'My Orders', href: '#' },
  { title: 'My Wishlist', href: '/wishlist' },
  { title: 'Help & Support', href: '#' },
]

export function MobileDrawer({ onClose, onSearch }: MobileDrawerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <SearchBar onSubmit={(query) => {
              onSearch(query)
              onClose()
            }} />
          </div>

          {/* Categories Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setExpandedSection(expandedSection === 'categories' ? null : 'categories')}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">Categories</span>
              <ChevronRight
                size={20}
                className={`transition-transform ${expandedSection === 'categories' ? 'rotate-90' : ''}`}
              />
            </button>

            {expandedSection === 'categories' && (
              <div className="bg-gray-50 space-y-1">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    onClick={onClose}
                    className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                onClick={onClose}
                className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button className="w-full py-2.5 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close menu"
      />
    </div>
  )
}
