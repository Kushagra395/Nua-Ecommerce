import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, LogOut } from 'lucide-react'
import { selectCartCount } from '@/stores/cartSlice'
import { CategoryDropdown } from '../Layout/Nav/CategoryDropdown'
import { SearchBar } from '../Layout/Nav/SearchBar'
import { MobileDrawer } from '../Layout/Nav/MobileDrawer'
import { SettingsDropdown } from '../Layout/Nav/SettingsDropdown'

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const cartCount = useSelector(selectCartCount)
  const profileRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="hidden sm:block bg-gray-900 text-white text-xs py-1.5 text-center">
        Free delivery on orders over ₹499 | Contact us for support
      </div>

      <div className="max-w-full px-4 md:px-8 py-0">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-8 py-3">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-pink-600 whitespace-nowrap flex-shrink-0">
            m
          </Link>

          <nav className="flex items-center gap-6">
            <CategoryDropdown />
            
            <Link
              to="/category/mens-wear"
              className="text-xs font-semibold text-gray-800 uppercase tracking-wide hover:text-pink-600 transition-colors"
            >
              Men
            </Link>
            <Link
              to="/category/womens-wear"
              className="text-xs font-semibold text-gray-800 uppercase tracking-wide hover:text-pink-600 transition-colors"
            >
              Women
            </Link>
            <Link
              to="/category/jewellery"
              className="text-xs font-semibold text-gray-800 uppercase tracking-wide hover:text-pink-600 transition-colors"
            >
              Jewellery
            </Link>
            <Link
              to="/category/electronics"
              className="text-xs font-semibold text-gray-800 uppercase tracking-wide hover:text-pink-600 transition-colors"
            >
              Electronics
            </Link>
            <Link
              to="/category/backpacks-bags"
              className="text-xs font-semibold text-gray-800 uppercase tracking-wide hover:text-pink-600 transition-colors"
            >
              Backpacks
            </Link>
          </nav>

          {/* Search Bar - grows to fill available space */}
          <div className="flex-1 max-w-md">
            <SearchBar onSubmit={handleSearchSubmit} />
          </div>

          {/* Right Section - Settings, Wishlist, Bag */}
          <div className="flex items-center gap-8">
            <SettingsDropdown />

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex flex-col items-center gap-1 p-1 hover:text-pink-600 transition-colors group"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-800 group-hover:text-pink-600 transition-colors" />
              <span className="text-xs text-gray-700 group-hover:text-pink-600 transition-colors">Wishlist</span>
            </Link>

            {/* Bag/Cart */}
            <Link
              to="/cart"
              className="flex flex-col items-center gap-1 p-1 hover:text-pink-600 transition-colors relative group"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-800 group-hover:text-pink-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-700 group-hover:text-pink-600 transition-colors">Bag</span>
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between py-3 gap-2">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isDrawerOpen}
          >
            {isDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-pink-600">
            m
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-gray-700" />
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <MobileDrawer
            onClose={() => setIsDrawerOpen(false)}
            onSearch={handleSearchSubmit}
          />
        )}
      </div>
    </header>
  )
}
