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

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      alert('Your cart is empty')
      return
    }

    setIsProcessing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const orderId = `ORD-${Date.now()}`
      const order = {
        id: orderId,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          qty: item.qty,
          price: item.price,
        })),
        total: total + total * 0.1,
        shippingInfo: data,
        createdAt: new Date().toISOString(),
      }

      saveOrder(order)
      dispatch(cartActions.clearCart())
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
      <div className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-base-content/60 mb-6">Add items to your cart before checking out.</p>
        <Button 
          onClick={() => navigate('/')} 
          className="bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="py-10 px-4 md:px-8 lg:px-12">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* FORM SECTION */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* SHIPPING CARD */}
            <div className="bg-base-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-1 font-semibold">Full Name *</label>
                  <Input {...register('fullName')} placeholder="John Doe" />
                  {errors.fullName && <p className="text-error text-sm mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 font-semibold">Email *</label>
                  <Input {...register('email')} type="email" placeholder="john@example.com" />
                  {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone  */}
                <div>
                  <label className="block mb-1 font-semibold">Phone *</label>
                  <Input {...register('phone')} placeholder="9876543210" />
                  {errors.phone && <p className="text-error text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* Address Line 1 */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block mb-1 font-semibold">Address Line 1 *</label>
                  <Input {...register('addressLine1')} placeholder="123 Main Street" />
                  {errors.addressLine1 && <p className="text-error text-sm mt-1">{errors.addressLine1.message}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block mb-1 font-semibold">City *</label>
                  <Input {...register('city')} placeholder="Mumbai" />
                  {errors.city && <p className="text-error text-sm mt-1">{errors.city.message}</p>}
                </div>

                {/* State  */}
                <div>
                  <label className="block mb-1 font-semibold">State *</label>
                  <Input {...register('state')} placeholder="MH" />
                  {errors.state && <p className="text-error text-sm mt-1">{errors.state.message}</p>}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block mb-1 font-semibold">Pincode *</label>
                  <Input {...register('pincode')} placeholder="400001" />
                  {errors.pincode && <p className="text-error text-sm mt-1">{errors.pincode.message}</p>}
                </div>

                {/* Country code */}
                <div>
                  <label className="block mb-1 font-semibold">Country *</label>
                  <Input {...register('country')} placeholder="India" />
                  {errors.country && <p className="text-error text-sm mt-1">{errors.country.message}</p>}
                </div>

              </div>
            </div>

            {/* orderd placed */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </div>

     
        <div>
          <div className="bg-base-200 rounded-xl p-6 shadow-md sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* ITEM LIST  */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2 mb-6">
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

            {/* TOTALS amount  */}
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

            <div className="border-t mt-4 pt-4 border-base-300">
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
