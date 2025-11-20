"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cartActions } from "@/stores/cartSlice"
import { wishlistActions, selectWishlistItems } from "@/stores/wishlistSlice"
import type { Product } from "@/api/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)
  const isWishlisted = wishlistItems.some((item) => item.id === product.id)

  const handleImageClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = () => {
    dispatch(
      cartActions.addItem({
        ...product,
        qty: quantity,
      }),
    )
    setQuantity(1)
  }

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    if (isWishlisted) {
      dispatch(wishlistActions.removeItem(product.id))
    } else {
      dispatch(wishlistActions.addItem(product))
    }
  }

  const incrementQty = () => setQuantity((prev) => Math.min(prev + 1, 5))
  const decrementQty = () => setQuantity((prev) => Math.max(prev - 1, 1))

  const rating = product.rating?.rate || 0
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating))

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      
      <div
        className="relative aspect-square cursor-pointer overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleImageClick()}
      >
        <button
          type="button"
          onClick={handleWishlistClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleWishlistClick(e as any)
            }
          }}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 hover:scale-110 z-10 ${
            isWishlisted
              ? "border-pink-500 bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
              : "border-gray-300 bg-white text-gray-500 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={isWishlisted ? "fill-current" : ""} size={18} />
        </button>

        <img
          src={product.image || "/placeholder.svg?height=300&width=300&query=product"}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            {product.category}
          </span>
        </div>

        <h2
          className="line-clamp-2 cursor-pointer text-base font-semibold text-gray-900 transition-colors duration-200 hover:text-blue-600 dark:text-gray-50 dark:hover:text-blue-400"
          onClick={handleImageClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleImageClick()}
        >
          {product.title}
        </h2>

        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 dark:bg-gray-700">
            <div className="flex gap-0.5" aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}>
              {stars.map((filled, i) => (
                <Star
                  key={i}
                  size={12}
                  className={filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-700/50">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">QTY</span>
          <div className="flex items-center gap-2">
            <button
              onClick={decrementQty}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all hover:bg-white hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label="Decrease quantity"
              type="button"
            >
              <Minus size={14} />
            </button>
            <span className="w-5 text-center text-xs font-bold text-gray-900 dark:text-white">{quantity}</span>
            <button
              onClick={incrementQty}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all hover:bg-white hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label="Increase quantity"
              type="button"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="mt-auto w-full gap-2 bg-blue-600 text-white shadow-md transition-all hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          aria-label={`Add ${quantity} ${product.title} to cart`}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
