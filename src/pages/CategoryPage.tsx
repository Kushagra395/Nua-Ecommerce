"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { Sliders } from "lucide-react"
import { ProductGrid } from "@/components/ProductGrid"
import { ProductSkeleton } from "@/components/ProductSkeleton"
import { Sidebar, type FilterState } from "../components/Layout/ProductFilters/Sidebar"
import { categoryMap, type CategorySlug } from "@/utils/categoryMap"
import { getProducts } from "@/api/fakestore"
import type { Product } from "@/api/types"

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()

  const [currentCategory, setCurrentCategory] = useState<CategorySlug>((slug as CategorySlug) || "all")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(12)

  const [filters, setFilters] = useState<FilterState>({
    sortBy: "popularity",
    priceRange: [0, 1000],
    minRating: 0,
    categories: [],
    searchQuery: "",
  })

  useEffect(() => {
    const newCategory = (slug as CategorySlug) || "all"
    setCurrentCategory(newCategory)

   
    setFilters({
      sortBy: "popularity",
      priceRange: [0, 1000],
      minRating: 0,
      categories: [],
      searchQuery: "",
    })

    setDisplayCount(12)
  }, [slug])

  const categoryConfig = currentCategory ? categoryMap[currentCategory] : null

  // Fetch products
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        if (!categoryConfig) {
          setError("Category not found")
          setIsLoading(false)
          return
        }

        let fetchedProducts: Product[] = []

        if (categoryConfig.fetchAll) {
          fetchedProducts = await getProducts()
        } else if (categoryConfig.apiCategory) {
          const response = await fetch(`https://fakestoreapi.com/products/category/${categoryConfig.apiCategory}`)
          fetchedProducts = await response.json()
        } else if (categoryConfig.keywords) {
          const allProducts = await getProducts()
          const keywordRegex = new RegExp(categoryConfig.keywords.join("|"), "i")

          fetchedProducts = allProducts.filter((p) => keywordRegex.test(p.title) || keywordRegex.test(p.description))

          if (fetchedProducts.length === 0 && categoryConfig.fallbackCategory) {
            const response = await fetch(
              `https://fakestoreapi.com/products/category/${categoryConfig.fallbackCategory}`,
            )
            fetchedProducts = await response.json()
          }
        }

        setProducts(fetchedProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [currentCategory])

  // Filters + Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    result = result.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    if (filters.minRating > 0) {
      result = result.filter((p) => (p.rating?.rate || 0) >= filters.minRating)
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return (b.rating?.rate || 0) - (a.rating?.rate || 0)
        default:
          return 0
      }
    })

    return result
  }, [products, filters])

  const displayedProducts = filteredAndSortedProducts.slice(0, displayCount)
  const hasMore = displayedProducts.length < filteredAndSortedProducts.length

  const handleCategoryChange = (newCat: CategorySlug) => {
    setCurrentCategory(newCat)
    setSidebarOpen(false)
    setFilters({
      sortBy: "popularity",
      priceRange: [0, 1000],
      minRating: 0,
      categories: [],
      searchQuery: "",
    })
    setDisplayCount(12)
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setDisplayCount(12)
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="py-8 px-4 md:px-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <a href="/" className="hover:text-gray-900 dark:hover:text-white">
              Home
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-semibold">{categoryConfig?.title}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{categoryConfig?.title}</h1>
        </div>
      </div>

      <section className="py-12 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400 mb-8">
              {error}
            </div>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            <Sliders className="w-4 h-4" />
            Filters
          </button>

          <div className="flex gap-8">
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-[72px] h-fit">
                <Sidebar
                  activeCategory={currentCategory}
                  onCategoryChange={handleCategoryChange}
                  onFiltersChange={handleFiltersChange}
                  currentFilters={filters}
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
              </div>
            </div>

            {sidebarOpen && (
              <div className="lg:hidden">
                <Sidebar
                  activeCategory={currentCategory}
                  onCategoryChange={handleCategoryChange}
                  onFiltersChange={handleFiltersChange}
                  currentFilters={filters}
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              {!error && !isLoading && products.length > 0 && (
                <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredAndSortedProducts.length === 0
                      ? "No products match your filters"
                      : `Showing ${displayedProducts.length} of ${filteredAndSortedProducts.length} products`}
                  </p>
                </div>
              )}

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {Array(8)
                    .fill(null)
                    .map((_, i) => (
                      <ProductSkeleton key={i} />
                    ))}
                </div>
              ) : filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">No items found</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your filters</p>
                </div>
              ) : (
                <>
                  <ProductGrid products={displayedProducts} />

                  {hasMore && (
                    <div className="flex justify-center mt-12">
                      <button
                        onClick={() => setDisplayCount(displayCount + 12)}
                        className="px-8 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
