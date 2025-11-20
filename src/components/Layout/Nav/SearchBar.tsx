import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSubmit: (query: string) => void
}

export function SearchBar({ onSubmit }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(searchValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <label htmlFor="search-input" className="sr-only">
        Search for products, brands and more
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Search for products, brands and more"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-2.5 pl-10 bg-gray-100 rounded-full text-sm text-gray-900 placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-pink-200 ${
          isFocused ? 'bg-gray-50' : 'bg-gray-100'
        }`}
        aria-label="Search products"
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        size={18}
      />
    </form>
  )
}
