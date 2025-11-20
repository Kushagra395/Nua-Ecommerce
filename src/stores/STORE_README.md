# Redux Cart Store Documentation

## Overview
The cart store manages e-commerce cart state using Redux Toolkit with localStorage persistence.

## Features
- Add items to cart (auto-increments qty if already exists)
- Remove items by ID
- Update quantity (constrained to 1-10)
- Clear entire cart
- Calculate total automatically
- Persist to localStorage
- Hydrate on app initialization

## Usage Example

### Adding an Item
\`\`\`typescript
import { useDispatch } from 'react-redux'
import { cartActions } from '@/stores/cartSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  
  const handleAddToCart = () => {
    dispatch(cartActions.addItem({
      ...product,
      qty: 1
    }))
  }
  
  return <button onClick={handleAddToCart}>Add to Cart</button>
}
\`\`\`

### Updating Quantity
\`\`\`typescript
dispatch(cartActions.updateQty({ id: 123, qty: 3 }))
\`\`\`

### Removing an Item
\`\`\`typescript
dispatch(cartActions.removeItem(123))
\`\`\`

### Clearing Cart
\`\`\`typescript
dispatch(cartActions.clearCart())
\`\`\`

### Using Selectors
\`\`\`typescript
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal, selectCartCount } from '@/stores/cartSlice'

function CartSummary() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const count = useSelector(selectCartCount)
  
  return (
    <div>
      <p>Items: {count}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  )
}
\`\`\`

## State Shape
\`\`\`typescript
{
  cart: {
    items: CartItem[], // Products with qty
    total: number      // Calculated sum of (price * qty)
  }
}
\`\`\`

## Persistence
- Cart state is automatically saved to localStorage after each action
- State is automatically restored from localStorage on app initialization
- Failed persists/hydrates log warnings to console
