export function Checkout() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="space-y-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Billing Information</h2>
            <p className="text-base-content/70">Checkout form will be implemented here</p>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Order Summary</h2>
            <p className="text-base-content/70">Order summary will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
