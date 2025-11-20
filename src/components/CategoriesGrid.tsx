import { CategoryTile } from './CategoryTile'

// Category data with high-quality images
const CATEGORY_DATA = [
  {
    slug: 'all',
    title: 'All Collections',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop',
    subtitle: 'Complete Your Look'
  },
  
  {
    slug: 'mens-wear',
    title: "Men's Wear",
    image: 'https://images.unsplash.com/photo-1552062407-291826ab63fd?w=800&h=600&fit=crop',
    subtitle: 'Explore Collections'
  },
  {
    slug: 'womens-wear',
    title: "Women's Wear",
    image: 'https://images.unsplash.com/photo-1595777707802-41d339d29c42?w=800&h=600&fit=crop',
    subtitle: 'Latest Styles'
  },
  {
    slug: 'jewellery',
    title: 'Jewellery',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop',
    subtitle: 'Premium Collection'
  },
  {
    slug: 'electronics',
    title: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=800&h=600&fit=crop',
    subtitle: 'Latest Gadgets'
  },
   
  {
    slug: 'backpacks-bags',
    title: 'Backpacks & Bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
    subtitle: 'Travel in Style'
  }
]

export function CategoriesGrid() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 font-sans">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATEGORY_DATA.map((category) => (
            <CategoryTile
              key={category.slug}
              {...category}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
