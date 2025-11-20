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
      <div className="py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-base-content/60 mb-8">Add some products to get started!</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-base-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 p-6 bg-base-300 font-semibold">
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
                  className="p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
                >
                  {/* Product */}
                  <Link
                    to={`/product/${item.id}`}
                    className="flex gap-4 md:col-span-1 hover:opacity-70 transition"
                  >
                    <div className="w-16 h-16 bg-base-100 rounded flex-shrink-0 flex items-center justify-center">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-base-content/60">{item.category}</p>
                    </div>
                  </Link>

                  {/* Unit Price */}
                  <div className="text-center md:col-span-1">
                    <p className="md:hidden text-xs text-base-content/60">Unit Price</p>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity */}
                  <div className="text-center md:col-span-1">
                    <p className="md:hidden text-xs text-base-content/60">Quantity</p>
                    <div className="flex items-center justify-center gap-2 border border-base-300 rounded w-fit mx-auto">
                      <button
                        onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                        className="btn btn-ghost btn-xs"
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
                        className="w-12 text-center text-sm focus:outline-none bg-transparent"
                        aria-label="Product quantity"
                      />
                      <button
                        onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                        className="btn btn-ghost btn-xs"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right md:col-span-1">
                    <p className="md:hidden text-xs text-base-content/60">Subtotal</p>
                    <p className="font-bold text-primary">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove */}
                  <div className="text-center md:col-span-1">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn btn-ghost btn-sm text-error"
                      aria-label={`Remove ${item.title} from cart`}
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
          <div className="bg-base-200 rounded-lg p-6 sticky top-24 space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="space-y-2 border-t border-base-300 pt-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-base-300 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  ${(total + total * 0.1).toFixed(2)}
                </span>
              </div>
            </div>

            <Link to="/checkout" className="w-full block">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>

            <Link to="/" className="w-full block">
              <button className="btn btn-ghost w-full">Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
