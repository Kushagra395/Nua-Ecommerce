import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal, cartActions } from '@/stores/cartSlice'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export function CartPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  const handleUpdateQty = (id: number, qty: number) => {
    if (qty > 0 && qty <= 10) {
      dispatch(cartActions.updateQty({ id, qty }))
    }
  }

  const handleRemove = (id: number) => {
    dispatch(cartActions.removeItem(id))
  }

  if (items.length === 0) {
    return (
      <div className="py-20 px-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-base-content/60">Add some products to get started!</p>

          <Link to="/">
            <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 px-4 md:px-8 lg:px-12">
      <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-200 rounded-xl shadow-sm overflow-hidden">
            
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 bg-base-300 font-semibold text-sm">
              <div>Product</div>
              <div className="text-center">Unit Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Subtotal</div>
              <div className="text-center">Action</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-base-300">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-5 grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
                >
                  {/* Product */}
                  <Link
                    to={`/product/${item.id}`}
                    className="flex gap-4 md:col-span-1 hover:opacity-75 transition"
                  >
                    <div className="w-16 h-16 bg-base-100 rounded-lg flex items-center justify-center shadow-sm">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                      <p className="text-xs text-base-content/60">{item.category}</p>
                    </div>
                  </Link>

                  {/* Unit Price */}
                  <div className="text-center">
                    <p className="md:hidden text-xs text-base-content/60">Unit Price</p>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity */}
                  <div className="text-center">
                    <p className="md:hidden text-xs text-base-content/60">Quantity</p>
                    <div className="flex items-center justify-center gap-2 border border-base-300 rounded-lg px-2 py-1">
                      <button
                        onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                        className="text-lg px-2 text-blue-600 hover:text-blue-800"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          handleUpdateQty(item.id, Math.max(1, parseInt(e.target.value) || 1))
                        }
                        min="1"
                        max="10"
                        className="w-12 text-center text-sm bg-transparent"
                      />
                      <button
                        onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                        className="text-lg px-2 text-blue-600 hover:text-blue-800"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="md:hidden text-xs text-base-content/60">Subtotal</p>
                    <p className="font-bold text-primary">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove */}
                  <div className="text-center">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-base-200 rounded-xl p-6 shadow-md sticky top-24 space-y-5">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="space-y-3 border-t pt-4 border-base-300">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Tax:</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4 border-base-300">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  ${(total + total * 0.1).toFixed(2)}
                </span>
              </div>
            </div>

            <Link to="/checkout" className="w-full block">
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Proceed to Checkout
              </Button>
            </Link>

            <Link to="/" className="w-full block">
              <button className="w-full bg-blue-100 text-blue-700 rounded-lg py-2 hover:bg-blue-200 transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
