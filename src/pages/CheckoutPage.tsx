import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal, cartActions } from '@/stores/cartSlice'
import { checkoutSchema, CheckoutFormData } from '@/utils/validation'
import { saveOrder } from '@/utils/orderStorage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      alert('Your cart is empty')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate API call with 1.2s delay
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Create order object
      const orderId = `ORD-${Date.now()}`
      const order = {
        id: orderId,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          qty: item.qty,
          price: item.price,
        })),
        total: total + total * 0.1, // Including 10% tax
        shippingInfo: data,
        createdAt: new Date().toISOString(),
      }

      // Save order to localStorage
      saveOrder(order)

      // Clear cart
      dispatch(cartActions.clearCart())

      // Redirect to order confirmation
      navigate(`/order-confirmation?orderId=${orderId}`)
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-base-content/60 mb-8">Add items to your cart before checking out.</p>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-base-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Full Name *</span>
                  </label>
                  <Input
                    {...register('fullName')}
                    placeholder="John Doe"
                    className="w-full"
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && (
                    <p className="text-error text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Email *</span>
                  </label>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-error text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Phone *</span>
                  </label>
                  <Input
                    {...register('phone')}
                    placeholder="1234567890"
                    className="w-full"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-error text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Address Line 1 *</span>
                  </label>
                  <Input
                    {...register('addressLine1')}
                    placeholder="123 Main Street"
                    className="w-full"
                    aria-invalid={!!errors.addressLine1}
                  />
                  {errors.addressLine1 && (
                    <p className="text-error text-sm mt-1">{errors.addressLine1.message}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">City *</span>
                  </label>
                  <Input
                    {...register('city')}
                    placeholder="New York"
                    className="w-full"
                    aria-invalid={!!errors.city}
                  />
                  {errors.city && (
                    <p className="text-error text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">State *</span>
                  </label>
                  <Input
                    {...register('state')}
                    placeholder="NY"
                    className="w-full"
                    aria-invalid={!!errors.state}
                  />
                  {errors.state && (
                    <p className="text-error text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Pincode *</span>
                  </label>
                  <Input
                    {...register('pincode')}
                    placeholder="10001"
                    className="w-full"
                    aria-invalid={!!errors.pincode}
                  />
                  {errors.pincode && (
                    <p className="text-error text-sm mt-1">{errors.pincode.message}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Country *</span>
                  </label>
                  <Input
                    {...register('country')}
                    placeholder="United States"
                    className="w-full"
                    aria-invalid={!!errors.country}
                  />
                  {errors.country && (
                    <p className="text-error text-sm mt-1">{errors.country.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-base-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm pb-4 border-b border-base-300">
                  <div>
                    <p className="font-semibold line-clamp-1">{item.title}</p>
                    <p className="text-base-content/60">Qty: {item.qty}</p>
                  </div>
                  <p className="font-bold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
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
                <span>Tax (10%):</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-base-300 mt-4 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${(total + total * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
