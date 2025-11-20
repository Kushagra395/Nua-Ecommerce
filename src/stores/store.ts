import { configureStore, Middleware } from '@reduxjs/toolkit'
import cartReducer, { CartState } from './cartSlice'
import wishlistReducer, { WishlistState } from './wishlistSlice'

const CART_STORAGE_KEY = 'nua_cart_state'
const WISHLIST_STORAGE_KEY = 'nua_wishlist_state'

const persistStateMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action)

  if (action.type.startsWith('cart/')) {
    const state = storeApi.getState()
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart))
    } catch {
      console.warn('[v0] Failed to persist cart to localStorage')
    }
  }

  if (action.type.startsWith('wishlist/')) {
    const state = storeApi.getState()
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.wishlist))
    } catch {
      console.warn('[v0] Failed to persist wishlist to localStorage')
    }
  }

  return result
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistStateMiddleware),
})

const persistedCart = localStorage.getItem(CART_STORAGE_KEY)
if (persistedCart) {
  try {
    const cartState: CartState = JSON.parse(persistedCart)
    store.dispatch({ type: 'cart/hydrateCart', payload: cartState })
  } catch {
    console.warn('[v0] Failed to hydrate cart from localStorage')
  }
}

const persistedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY)
if (persistedWishlist) {
  try {
    const wishlistState: WishlistState = JSON.parse(persistedWishlist)
    store.dispatch({ type: 'wishlist/hydrateWishlist', payload: wishlistState })
  } catch {
    console.warn('[v0] Failed to hydrate wishlist from localStorage')
  }
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch