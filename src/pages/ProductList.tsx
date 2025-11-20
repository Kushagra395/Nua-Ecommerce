export function ProductList() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="card bg-base-200 shadow">
            <div className="card-body">
              <h2 className="card-title">Product {item}</h2>
              <p className="text-base-content/70">Product description placeholder</p>
              <div className="card-actions justify-between items-center">
                <span className="text-lg font-bold text-primary">${(item * 29.99).toFixed(2)}</span>
                <button className="btn btn-primary btn-sm">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
