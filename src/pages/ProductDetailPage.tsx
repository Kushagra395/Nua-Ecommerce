import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useProduct, useProducts } from '@/hooks'
import { useDispatch } from 'react-redux'
import { cartActions } from '@/stores/cartSlice'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const productId = id ? parseInt(id) : undefined
  const { data: product, isLoading, isError }  = useProduct(productId)
  const { data: products } = useProducts()
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (isLoading) {
    return <div className="py-8 text-center text-gray-900 dark:text-gray-100">Loading product details...</div>
  }

  if (isError || !product) {
    return <div className="py-8 text-center text-red-600 dark:text-red-400">Failed to load product</div>
  }

  //  products from same category
  const relatedProducts = products
    ?.filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5) || []

  const handleAddToCart = () => {
    dispatch(
      cartActions.addItem({
        ...product,
        qty,
      })
    )
    setQty(1)
  }

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">{rating}/5</span>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{product.title} - nua</title>
        <meta name="description" content={product.description.substring(0, 160)} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description.substring(0, 160)} />
        <meta property="og:price:amount" content={product.price.toString()} />
        <meta property="og:price:currency" content="USD" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center min-h-96 border border-gray-200 dark:border-gray-700">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="max-h-96 max-w-full object-contain"
                />
              </div>
              {/* Thumbnail Gallery */}
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{product.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Category: {product.category}</p>
                {product.rating && renderStars(product.rating.rate)}
              </div>

              {/* Price */}
              <div>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">${product.price.toFixed(2)}</p>
                {product.rating && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    ({product.rating.count} reviews)
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
              </div>

              {/*  Add to Cart */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                    min="1"
                    max="5"
                    className="w-12 text-center text-sm font-semibold focus:outline-none bg-transparent text-gray-900 dark:text-white"
                    aria-label="Product quantity"
                  />
                  <button
                    onClick={() => setQty(Math.min(5, qty + 1))}
                    className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md transition-colors"
                  size="lg"
                  aria-label={`Add ${product.title} to cart`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pl-4 md:pl-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">You may also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
                {relatedProducts.map((relProduct) => (
                  <div
                    key={relProduct.id}
                    onClick={() => handleProductClick(relProduct.id)}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 flex-shrink-0 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 group border border-gray-200 dark:border-gray-700"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleProductClick(relProduct.id)}
                    aria-label={`View ${relProduct.title}`}
                  >
                    <div className="bg-gray-100 dark:bg-gray-700 rounded p-2 mb-2 h-32 flex items-center justify-center overflow-hidden">
                      <img
                        src={relProduct.image || "/placeholder.svg"}
                        alt={relProduct.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {relProduct.title}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-bold mt-2">
                      ${relProduct.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
