import cartReducer, { cartActions } from '@/stores/cartSlice'
import type { CartItem, CartState } from '@/stores/cartSlice'

describe('cartSlice', () => {
  const initialState: CartState = {
    items: [],
  }

  const mockItem: CartItem = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'https://via.placeholder.com/200',
    qty: 2,
  }

  describe('addItem', () => {
    it('adds a new item to empty cart', () => {
      const state = cartReducer(initialState, cartActions.addItem(mockItem))
      expect(state.items).toHaveLength(1)
      expect(state.items[0]).toEqual(mockItem)
    })

    it('increments quantity if item already exists', () => {
      let state = cartReducer(initialState, cartActions.addItem(mockItem))
      const updatedItem = { ...mockItem, qty: 3 }
      state = cartReducer(state, cartActions.addItem(updatedItem))

      expect(state.items).toHaveLength(1)
      expect(state.items[0].qty).toBe(5) // 2 + 3
    })

    it('caps quantity at 10', () => {
      let state = cartReducer(initialState, cartActions.addItem(mockItem))
      const largeQtyItem = { ...mockItem, qty: 10 }
      state = cartReducer(state, cartActions.addItem(largeQtyItem))

      expect(state.items[0].qty).toBe(10) // Should cap at 10
    })
  })

  describe('removeItem', () => {
    it('removes item from cart', () => {
      let state = cartReducer(initialState, cartActions.addItem(mockItem))
      state = cartReducer(state, cartActions.removeItem(mockItem.id))

      expect(state.items).toHaveLength(0)
    })
  })

  describe('updateQuantity', () => {
    it('updates item quantity', () => {
      let state = cartReducer(initialState, cartActions.addItem(mockItem))
      state = cartReducer(
        state,
        cartActions.updateQuantity({ id: mockItem.id, qty: 5 })
      )

      expect(state.items[0].qty).toBe(5)
    })

    it('caps quantity at 10', () => {
      let state = cartReducer(initialState, cartActions.addItem(mockItem))
      state = cartReducer(
        state,
        cartActions.updateQuantity({ id: mockItem.id, qty: 15 })
      )

      expect(state.items[0].qty).toBe(10)
    })

    it('enforces minimum quantity of 1', () => {
      let state = cartReducer(initialState, cartActions.addItem(mockItem))
      state = cartReducer(
        state,
        cartActions.updateQuantity({ id: mockItem.id, qty: 0 })
      )

      expect(state.items[0].qty).toBe(1)
    })
  })

  describe('clearCart', () => {
    it('removes all items from cart', () => {
      let state = cartReducer(initialState, cartActions.addItem(mockItem))
      state = cartReducer(initialState, cartActions.addItem(mockItem))
      state = cartReducer(state, cartActions.clearCart())

      expect(state.items).toHaveLength(0)
    })
  })

  describe('selectors', () => {
    it('calculates correct total', () => {
      const state: CartState = {
        items: [
          { ...mockItem, qty: 2 },
          { ...mockItem, id: 2, qty: 1 },
        ],
      }

      const total = state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
      expect(total).toBeCloseTo(99.99 * 2 + 99.99 * 1, 2)
    })

    it('counts total items', () => {
      const state: CartState = {
        items: [
          { ...mockItem, qty: 2 },
          { ...mockItem, id: 2, qty: 3 },
        ],
      }

      const count = state.items.reduce((sum, item) => sum + item.qty, 0)
      expect(count).toBe(5)
    })
  })
})
