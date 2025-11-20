import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getCategories } from '@/api/fakestore'

interface UseCategoriesReturn extends UseQueryResult<string[], Error> {
  refetch: () => void
}

export const useCategories = (): UseCategoriesReturn => {
  const query = useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  return {
    ...query,
    refetch: query.refetch,
  }
}
