"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Heart, ShoppingBag, Menu, X } from "lucide-react"
import { selectCartCount } from "@/stores/cartSlice"
import { CategoryDropdown } from "../Layout/Nav/CategoryDropdown"
import { SearchBar } from "../Layout/Nav/SearchBar"
import { MobileDrawer } from "../Layout/Nav/MobileDrawer"
import { SettingsDropdown } from "../Layout/Nav/SettingsDropdown"

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

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isDrawerOpen])

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="hidden sm:block bg-gray-900 dark:bg-gray-950 text-white text-xs py-1.5 text-center">
        Free delivery on orders over $99 | Contact us for support
      </div>

      <div className="max-w-full px-4 md:px-8 py-0">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-8 py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="nua homepage">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 bg-clip-text text-transparent tracking-tight">
              Nua Store
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <CategoryDropdown />

            <Link
              to="/category/mens-wear"
              className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Men
            </Link>
            <Link
              to="/category/womens-wear"
              className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Women
            </Link>
            <Link
              to="/category/jewellery"
              className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Jewellery
            </Link>
            <Link
              to="/category/electronics"
              className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Electronics
            </Link>
            <Link
              to="/category/backpacks-bags"
              className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
              className="flex flex-col items-center gap-1 p-1 hover:text-pink-600 dark:hover:text-pink-400 transition-colors group"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-800 dark:text-gray-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
              <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                Wishlist
              </span>
            </Link>

            {/* Bag/Cart */}
            <Link
              to="/cart"
              className="flex flex-col items-center gap-1 p-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Bag
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between py-2.5 gap-3">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle menu"
            aria-expanded={isDrawerOpen}
          >
            {isDrawerOpen ? (
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex-1 text-center" aria-label="nua homepage">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 bg-clip-text text-transparent tracking-tight">
              Nua Store
            </span>
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Link to="/wishlist" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isDrawerOpen && <MobileDrawer onClose={() => setIsDrawerOpen(false)} onSearch={handleSearchSubmit} />}
      </div>
    </header>
  )
}
