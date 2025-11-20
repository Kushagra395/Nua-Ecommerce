import { Link, useLocation } from "react-router-dom"
import { CheckCircle } from "lucide-react"

export function OrderConfirmationPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const orderId = params.get("orderId")

  return (
    <div className="py-12 flex justify-center">
      <div className="max-w-2xl w-full bg-base-200 shadow-lg p-10 rounded-xl">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500" size={70} />
        </div>

        <h1 className="text-3xl font-bold text-center mb-3">Order Placed Successfully!</h1>
        <p className="text-center text-base-content/70 mb-6">
          Thank you for shopping with us. Your order has been confirmed.
        </p>

        {/* Order Details */}
        <div className="bg-base-100 p-6 rounded-lg border border-base-300 mb 8">
          <h2 className="text-xl font-bold mb-3">Order Details</h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Order ID:</span>{" "}
              <span className="text-primary font-medium">{orderId || "N/A"}</span>
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-green-600 font-semibold">Confirmed</span>
            </p>
            <p>
              <span className="font-semibold">Estimated Delivery:</span>{" "}
              4–6 Business Days
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Order Status</h2>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              <span className="font-medium">Order Confirmed</span>
            </div>
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <span>Order Packed</span>
            </div>
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <span>Shipped</span>
            </div>
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
      

          <Link
            to="/"
            className="btn btn-primary px-6"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
