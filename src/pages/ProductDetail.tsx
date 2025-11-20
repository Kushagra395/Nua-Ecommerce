import { useParams } from 'react-router-dom'

export function ProductDetail() {
  const { id } = useParams()
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Product {id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-base-200 rounded-lg h-96 flex items-center justify-center">
          <p className="text-base-content/70">Product image placeholder</p>
        </div>
        <div>
          <p className="text-xl text-primary font-bold mb-4">$99.99</p>
          <p className="text-base-content/70 mb-6">
            This is a detailed product description that would include all the specifications and benefits of the product.
          </p>
          <button className="btn btn-primary btn-lg mb-4">Add to Cart</button>
          <button className="btn btn-ghost btn-lg">Add to Wishlist</button>
        </div>
      </div>
    </div>
  )
}
