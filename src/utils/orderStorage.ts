import { Order } from './validation'

const ORDER_STORAGE_KEY = 'nua_orders'

export const saveOrder = (order: Order): void => {
  try {
    const existing = localStorage.getItem(ORDER_STORAGE_KEY)
    const orders = existing ? JSON.parse(existing) : []
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([...orders, order]))
  } catch (error) {
    console.error('Failed to save order:', error)
  }
}

export const getOrders = (): Order[] => {
  try {
    const orders = localStorage.getItem(ORDER_STORAGE_KEY)
    return orders ? JSON.parse(orders) : []
  } catch (error) {
    console.error('Failed to load orders:', error)
    return []
  }
}

export const getOrderById = (id: string): Order | null => {
  const orders = getOrders()
  return orders.find((order) => order.id === id) || null
}
