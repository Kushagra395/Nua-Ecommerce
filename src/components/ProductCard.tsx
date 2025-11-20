import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cartActions } from '@/stores/cartSlice'
import type { Product } from '@/api/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleImageClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = () => {
    dispatch(
      cartActions.addItem({
        ...product,
        qty: quantity,
      })
    )
    setQuantity(1)
  }

  const rating = product.rating?.rate || 0
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col overflow-hidden">
      {/* Product Image */}
      <figure
        className="cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-700 relative aspect-square"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
      >
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-4 hover:scale-105 transition-transform"
        />
      </figure>

      {/* Card Body */}
      <div className="flex-grow flex flex-col p-4">
        {/* Title */}
        <h2
          className="text-base line-clamp-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
          onClick={handleImageClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
        >
          {product.title}
        </h2>

        {/* Price */}
        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">${product.price.toFixed(2)}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 mt-2">
          <div className="flex gap-1" aria-label={`Rating: ${product.rating?.rate.toFixed(1)} out of 5 stars`}>
            {stars.map((filled, i) => (
              <Star
                key={i}
                size={16}
                className={filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating?.rate.toFixed(1)} ({product.rating?.count})
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mb-4">
          <label htmlFor={`qty-${product.id}`} className="text-sm font-medium">
            Qty:
          </label>
          <select
            id={`qty-${product.id}`}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-2 py-1 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Quantity selector for ${product.title}`}
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full gap-2 mt-auto"
          aria-label={`Add ${quantity} ${product.title} to cart`}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
