"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { PriceSlider } from "./PriceSlider"
import type { CategorySlug } from "@/utils/categoryMap"

interface SidebarProps {
  activeCategory: CategorySlug
  onCategoryChange: (slug: CategorySlug) => void
  onFiltersChange: (filters: FilterState) => void
  currentFilters: FilterState
  isOpen: boolean
  onClose: () => void
}

export interface FilterState {
  sortBy: string
  priceRange: [number, number]
  minRating: number
  categories: string[]
  searchQuery: string
}

export function Sidebar({
  activeCategory,
  onCategoryChange,
  onFiltersChange,
  currentFilters,
  isOpen,
  onClose,
}: SidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters)

  useEffect(() => {
    setLocalFilters(currentFilters)
  }, [currentFilters])

  const handleSortChange = (value: string) => {
    const updated = { ...localFilters, sortBy: value }
    setLocalFilters(updated)
    onFiltersChange(updated)
  }

  const handleRatingChange = (rating: number) => {
    const updated = { ...localFilters, minRating: localFilters.minRating === rating ? 0 : rating }
    setLocalFilters(updated)
    onFiltersChange(updated)
  }

  const handleSearchChange = (query: string) => {
    const updated = { ...localFilters, searchQuery: query }
    setLocalFilters(updated)
    onFiltersChange(updated)
  }

  const handleCategoryChange = (slug: CategorySlug) => {
    onCategoryChange(slug)
  }

  const handleClearFilters = () => {
    const cleared: FilterState = {
      sortBy: "popularity",
      priceRange: [0, 1000],
      minRating: 0,
      categories: [],
      searchQuery: "",
    }
    setLocalFilters(cleared)
    onFiltersChange(cleared)
  }

  const collectionShortcuts = [
    { slug: "all" as CategorySlug, title: "All Collections" },
    { slug: "mens-wear" as CategorySlug, title: "Men" },
    { slug: "womens-wear" as CategorySlug, title: "Women" },
    { slug: "jewellery" as CategorySlug, title: "Jewellery" },
    { slug: "electronics" as CategorySlug, title: "Electronics" },
    { slug: "backpacks-bags" as CategorySlug, title: "Backpacks" },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-sm z-50 transform transition-transform duration-300 lg:translate-x-0 lg:shadow-none overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Filters and sorting"
      >
        {/* Header with Close Button (Mobile) */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Collections */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Collections</h3>
            <div className="flex flex-wrap gap-2">
              {collectionShortcuts.map((col) => (
                <button
                  key={col.slug}
                  onClick={() => handleCategoryChange(col.slug)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === col.slug
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-pressed={activeCategory === col.slug}
                >
                  {col.title}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

          {/* Search */}
          <div>
            <label htmlFor="search" className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2 block">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              value={localFilters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              aria-label="Search products"
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

          {/* Sort By */}
          <div>
            <label htmlFor="sort" className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2 block">
              Sort By
            </label>
            <select
              id="sort"
              value={localFilters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white pr-8"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
              }}
              aria-label="Sort products"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

          {/* Price Range */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Price Range</h4>
            <div className="space-y-3">
              <PriceSlider
                minPrice={localFilters.priceRange[0]}
                maxPrice={localFilters.priceRange[1]}
                minBound={0}
                maxBound={1000}
                onChange={(min, max) => {
                  const updated = { ...localFilters, priceRange: [min, max] as [number, number] }
                  setLocalFilters(updated)
                  onFiltersChange(updated)
                }}
              />
              <div className="text-xs text-gray-500">
                Applied: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

          {/* Rating Filter */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2].map((rating) => (
                <label key={rating} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="rating"
                    checked={localFilters.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 text-blue-600 accent-blue-600"
                    aria-label={`${rating} stars and up`}
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{rating}★ & up</span>
                </label>
              ))}
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={localFilters.minRating === 0}
                  onChange={() => handleRatingChange(0)}
                  className="w-4 h-4 text-blue-600 accent-blue-600"
                  aria-label="All ratings"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">All Ratings</span>
              </label>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

          {/* Clear Filters */}
          <button
            onClick={handleClearFilters}
            className="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
        </div>
      </aside>
    </>
  )
}
