"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import { Product } from '@/api/types'

interface SearchBarProps {
  onSubmit: (query: string) => void
}

export function SearchBar({ onSubmit }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { data: products = [] } = useProducts()
  const navigate = useNavigate()
  const searchRef = useRef<HTMLDivElement>(null)

  // Filter products based on search value
  const suggestions = useMemo(() => {
    if (!searchValue.trim() || searchValue.length < 2) return []
    
    const query = searchValue.toLowerCase().trim()
    const matched = products
      .filter((product: Product) => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
      .slice(0, 5) // Limit to 5 suggestions
    
    return matched
  }, [searchValue, products])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      setShowSuggestions(false)
      onSubmit(searchValue.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSearchValue('')
    }
  }

  const handleSuggestionClick = (product: Product) => {
    setSearchValue('')
    setShowSuggestions(false)
    navigate(`/product/${product.id}`)
  }

  const handleClear = () => {
    setSearchValue('')
    setShowSuggestions(false)
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="search-input" className="sr-only">
          Search for products, brands and more
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search for products, brands and more"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            setShowSuggestions(e.target.value.trim().length >= 2)
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true)
            if (searchValue.trim().length >= 2) {
              setShowSuggestions(true)
            }
          }}
          onBlur={() => {
            // Delay to allow clicks on suggestions
            setTimeout(() => setIsFocused(false), 200)
          }}
          className={`w-full px-4 py-2.5 pl-10 pr-10 bg-gray-100 rounded-full text-sm text-gray-900 placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-pink-200 ${
            isFocused ? 'bg-gray-50' : 'bg-gray-100'
          }`}
          aria-label="Search products"
          aria-expanded={showSuggestions}
          aria-autocomplete="list"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          size={18}
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {suggestions.map((product: Product) => (
              <button
                key={product.id}
                onClick={() => handleSuggestionClick(product)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-contain rounded border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-pink-600 truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </button>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <button
                onClick={handleSubmit}
                className="w-full text-left px-4 py-2 text-sm text-pink-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                See all results for "{searchValue}"
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {showSuggestions && searchValue.trim().length >= 2 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <p className="text-sm text-gray-500">No products found matching "{searchValue}"</p>
        </div>
      )}
    </div>
  )
}