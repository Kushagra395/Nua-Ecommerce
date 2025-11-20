import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getProduct } from '@/api/fakestore'
import { Product } from '@/api/types'

interface UseProductReturn extends UseQueryResult<Product, Error> {
  refetch: () => void
}

export const useProduct = (id: number | undefined): UseProductReturn => {
  const query = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => {
      if (!id) throw new Error('Product ID is required')
      return getProduct(id)
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })

  return {
    ...query,
    refetch: query.refetch,
  }
}
