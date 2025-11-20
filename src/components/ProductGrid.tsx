import { ProductCard } from './ProductCard'
import type { Product } from '@/api/types'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">No products found</p>
      </div>
    )
  }

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      role="grid"
      aria-label="Product listing"
    >
      {products.map((product) => (
        <div key={product.id} role="gridcell">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
