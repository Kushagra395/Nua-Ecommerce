export function OrderConfirmation() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-primary mb-2">Order Confirmed!</h1>
        <p className="text-base-content/70">Thank you for your purchase</p>
      </div>
      <div className="card bg-base-200 mb-6">
        <div className="card-body">
          <p className="text-sm text-base-content/70">Order ID: #12345</p>
          <p className="text-sm text-base-content/70">Estimated Delivery: 3-5 business days</p>
        </div>
      </div>
      <button className="btn btn-primary">Continue Shopping</button>
    </div>
  )
}
