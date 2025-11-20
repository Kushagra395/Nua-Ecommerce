import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal, cartActions } from '@/stores/cartSlice'
import { Button } from '@/components/ui/button'
import { X, Trash2 } from 'lucide-react'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  const handleUpdateQty = (id: number, qty: number) => {
    if (qty > 0) {
      dispatch(cartActions.updateQty({ id, qty: Math.min(qty, 10) }))
    }
  }

  const handleRemove = (id: number) => {
    dispatch(cartActions.removeItem(id))
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-40 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close cart sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <Link
                    to={`/product/${item.id}`}
                    className="font-semibold text-sm hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-2"
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded">
                      <button
                        onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                        className="inline-flex items-center justify-center px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button
                        onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                        className="inline-flex items-center justify-center px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="inline-flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-600 dark:text-red-400 transition-colors"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 dark:border-gray-700 p-6 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <Link to="/checkout" onClick={onClose}>
              <Button
                className="w-full"
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Link>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
