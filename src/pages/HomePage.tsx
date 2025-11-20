import { HeroBanner } from '@/components/HeroBanner'
import { CategoriesSection } from '@/components/CategoriesSection'
import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import { ProductSkeleton } from '@/components/ProductSkeleton'

export function HomePage() {
   
  return (
    <div className="bg-white">
      <HeroBanner />
      <CategoriesSection />

     
    </div>
  )
}
