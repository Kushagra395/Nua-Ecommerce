import { configureStore, Middleware } from '@reduxjs/toolkit'
import cartReducer, { CartState } from './cartSlice'

const CART_STORAGE_KEY = 'nua_cart_state'

const persistCartMiddleware: Middleware = store => next => action => {
  const result = next(action)
  if (action.type.startsWith('cart/')) {
    const state = store.getState()
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart))
    } catch {
      console.warn('[v0] Failed to persist cart to localStorage')
    }
  }
  return result
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(persistCartMiddleware),
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
