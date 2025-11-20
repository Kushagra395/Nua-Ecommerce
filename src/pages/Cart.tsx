
export function Cart() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-base-200 rounded-lg p-8 text-center">
        <p className="text-base-content/70 mb-4">Your cart is empty</p>
        <button className="btn btn-primary">Continue Shopping</button>
      </div>
    </div>
  )
}
