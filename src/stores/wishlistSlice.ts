import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '@/api/types'

export interface WishlistState {
  items: Product[]
}

const initialState: WishlistState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearWishlist: (state) => {
      state.items = []
    },
    hydrateWishlist: (_state, action: PayloadAction<WishlistState>) => action.payload,
  },
})

export const wishlistActions = wishlistSlice.actions
export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items

export default wishlistSlice.reducer