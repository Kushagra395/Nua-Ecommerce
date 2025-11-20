"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ProductGrid } from "@/components/ProductGrid"
import { ProductSkeleton } from "@/components/ProductSkeleton"
import { useProducts } from "@/hooks/useProducts"
import type { Product } from "@/api/types"

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get("q") || ""
  const { data: products = [], isLoading } = useProducts()

  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    
    const searchQuery = query.toLowerCase().trim()
    return products.filter((product: Product) => 
      product.title.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    )
  }, [query, products])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {query ? `Search Results for "${query}"` : "Search Products"}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {query 
              ? `Found ${searchResults.length} ${searchResults.length === 1 ? 'product' : 'products'}`
              : "Enter a search term to find products"
            }
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : query && searchResults.length === 0 ? (
          /* No Results */
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No products found for "{query}"</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Try searching with different keywords</p>
          </div>
        ) : query && searchResults.length > 0 ? (
          /* Results */
          <ProductGrid products={searchResults} />
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Start typing to search for products</p>
          </div>
        )}
      </div>
    </div>
  )
}
