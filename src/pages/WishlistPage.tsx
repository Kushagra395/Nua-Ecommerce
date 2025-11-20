"use client"

import { useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { Heart, Trash2 } from "lucide-react"
import { ProductGrid } from "@/components/ProductGrid"
import { Button } from "@/components/ui/button"
import { selectWishlistItems, wishlistActions } from "@/stores/wishlistSlice"

export function WishlistPage() {
  const wishlistItems = useSelector(selectWishlistItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const itemCount = wishlistItems.length
  const headline = useMemo(
    () => (itemCount === 0 ? "Your wishlist is empty" : `Wishlist · ${itemCount} item${itemCount > 1 ? "s" : ""}`),
    [itemCount],
  )

  if (itemCount === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-50 text-pink-500">
          <Heart size={28} className="fill-pink-500" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is feeling lonely</h1>
          <p className="text-gray-500 max-w-md">
            Tap the heart icon on any product to save it here for quick access later.
          </p>
        </div>
        <Button onClick={() => navigate("/")} className="bg-pink-500 hover:bg-pink-600">
          Browse products
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-pink-500">Wishlist</p>
            <h1 className="text-3xl font-bold text-gray-900">{headline}</h1>
            <p className="text-sm text-gray-500">
              Keep track of the products you love. Move them to your bag whenever you’re ready.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => dispatch(wishlistActions.clearWishlist())} className="gap-2 text-gray-600">
              <Trash2 size={16} />
              Clear wishlist
            </Button>
            <Button onClick={() => navigate("/cart")} className="bg-pink-500 hover:bg-pink-600">
              Go to bag
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <ProductGrid products={wishlistItems} />
        </div>
      </div>
    </div>
  )
}