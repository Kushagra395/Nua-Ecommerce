const CACHE_KEY = 'products_cache'

export const getProductsFromLocalStorage = (): unknown => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    return cached ? JSON.parse(cached) : null
  } catch {
    return null
  }
}

export const saveProductsToLocalStorage = (data: unknown): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    console.warn('[v0] Failed to save products to localStorage')
  }
}
