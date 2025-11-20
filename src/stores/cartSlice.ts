import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, Product } from '@/api/types'

export interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product & { qty?: number }>) => {
      const { id, qty = 1, ...product } = action.payload
      const existingItem = state.items.find(item => item.id === id)

      if (existingItem) {
        existingItem.qty = Math.min(existingItem.qty + qty, 10)
      } else {
        state.items.push({ ...product, id, qty: Math.min(qty, 10) })
      }

      cartSlice.caseReducers.calculateTotal(state)
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotal(state)
    },

    updateQty: (state, action: PayloadAction<{ id: number; qty: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) {
        item.qty = Math.max(1, Math.min(action.payload.qty, 10))
      }
      cartSlice.caseReducers.calculateTotal(state)
    },

    clearCart: (state) => {
      state.items = []
      state.total = 0
    },

    calculateTotal: (state) => {
      state.total = state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
    },

    hydrateCart: (state, action: PayloadAction<CartState>) => {
      return action.payload
    },
  },
})

export const selectCartItems = (state: { cart: CartState }) => state.cart.items
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.qty, 0)

export const cartActions = cartSlice.actions
export default cartSlice.reducer
