import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react'
import { selectCartCount } from '@/stores/cartSlice'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const cartCount = useSelector(selectCartCount)
  const navCategories = ['Men', 'Women', 'Kids', 'Home & Living', 'Beauty']

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        {/* Top Bar */}
        <div className="bg-white px-6 py-3 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              Myntra
            </Link>

            {/* Center Navigation Links */}
            <div className="flex items-center gap-8">
              {navCategories.map((category) => (
                <button
                  key={category}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
                >
                  {category}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <Link to="/cart" className="relative inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white px-6 py-3 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands, and more"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Search products"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-900 flex-1 text-center">
            Myntra
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <Link to="/cart" className="relative inline-flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 mb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Search products"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white border-t border-gray-200 mt-2 pt-2 pb-4 -mx-4 px-4 space-y-1">
            {navCategories.map((category) => (
              <button
                key={category}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {category}
              </button>
            ))}
            <button className="block w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Profile
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
