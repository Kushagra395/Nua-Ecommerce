import { Link } from 'react-router-dom'

export function OrderConfirmationPage() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Order Confirmation</h1>
      {/* 
        Expected content:
        - Order success message
        - Order number and confirmation details
        - Order timeline/status tracking
        - Shipping information
        - Invoice/receipt download
        - Continue shopping button
      */}
      <div className="bg-base-200 rounded-lg p-8 text-center">
        <p className="text-lg text-base-content/70">Order confirmation content will be implemented here</p>
        <Link to="/" className="btn btn-primary mt-6">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
