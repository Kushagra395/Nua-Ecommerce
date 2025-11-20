import { useState, useMemo, useCallback } from 'react'
import { Search, Filter } from 'lucide-react'
import { useProducts, useCategories } from '@/hooks'
import { ProductGrid } from '@/components/ProductGrid'
import { ProductGridSkeleton } from '@/components/ProductSkeleton'
import { ErrorCard } from '@/components/ErrorCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Product } from '@/api/types'

type SortOption = 'popularity' | 'price-low' | 'price-high'

export function ProductListPage() {
  const { data: products = [], isLoading, isError, refetch } = useProducts()
  const { data: categories = [] } = useCategories()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')

  // Debounced search handler
  const debouncedSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(query))
    }

    // Sort
    const sorted = [...filtered]
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'popularity') {
      sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    }

    return sorted
  }, [products, selectedCategory, searchQuery, sortBy])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Products</h1>
        <p className="text-base-content/60">Browse our collection of quality items</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-base-100 rounded-lg p-4 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" size={18} />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="pl-10"
            aria-label="Search products by title"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label htmlFor="category-select" className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex-1">
            <label htmlFor="sort-select" className="block text-sm font-medium mb-2">
              Sort By
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="select select-bordered w-full"
              aria-label="Sort products"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <Button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSortBy('popularity')
              }}
              variant="outline"
              className="w-full md:w-auto"
              aria-label="Reset all filters"
            >
              <Filter size={18} />
              Reset
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-base-content/60">
          Showing {filteredAndSortedProducts.length} of {products.length} products
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <ProductGridSkeleton />
      ) : isError ? (
        <ErrorCard message="Failed to load products. Please try again." onRetry={() => refetch()} />
      ) : (
        <ProductGrid products={filteredAndSortedProducts} />
      )}
    </div>
  )
}
