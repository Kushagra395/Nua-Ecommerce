import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getProducts } from '@/api/fakestore'
import { Product } from '@/api/types'
import { getProductsFromLocalStorage, saveProductsToLocalStorage } from '@/utils/localStorage'

interface UseProductsReturn extends UseQueryResult<Product[], Error> {
  refetch: () => void
}

export const useProducts = (): UseProductsReturn => {
  const cachedProducts = getProductsFromLocalStorage() as Product[] | null

  const query = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: cachedProducts || undefined,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  })

  if (query.data && !cachedProducts) {
    saveProductsToLocalStorage(query.data)
  }

  return {
    ...query,
    refetch: query.refetch,
  }
}
