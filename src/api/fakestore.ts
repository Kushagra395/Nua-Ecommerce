import axios from 'axios'
import { Product } from './types'

const API_BASE_URL = 'https://fakestoreapi.com'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>('/products')
  return response.data
}

export const getCategories = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/products/categories')
  return response.data
}

export const getProduct = async (id: number): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`)
  return response.data
}
