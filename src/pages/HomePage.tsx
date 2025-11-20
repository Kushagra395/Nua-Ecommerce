import { HeroBanner } from '@/components/HeroBanner'
import { CategoriesSection } from '@/components/CategoriesSection'
import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import { ProductSkeleton } from '@/components/ProductSkeleton'

export function HomePage() {
   
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <HeroBanner />
      <CategoriesSection />
    </div>
  )
}
