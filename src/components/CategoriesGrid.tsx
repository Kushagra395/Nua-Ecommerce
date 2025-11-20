import { CategoryTile } from './CategoryTile'


const CATEGORY_DATA = [
  {
    slug: 'all',
    title: 'All Collections',
    image: '/cardpg/all.jpg',
    subtitle: 'Complete Your Look'
  },
  {
    slug: 'mens-wear',
    title: "Men's Wear",
    image: '/cardpg/mens.jpg',
    subtitle: 'Explore Collections'
  },
  {
    slug: 'womens-wear',
    title: "Women's Wear",
    image: '/cardpg/women.jpg',
    subtitle: 'Latest Styles'
  },
  {
    slug: 'jewellery',
    title: 'Jewellery',
    image: '/cardpg/jewery.jpg',
    subtitle: 'Premium Collection'
  },
  {
    slug: 'electronics',
    title: 'Electronics',
    image: '/cardpg/electronic.jpg',
    subtitle: 'Latest Gadgets'
  },
   {
    slug: 'backpacks-bags',
    title: 'Backpacks & Bags',
    image: '/cardpg/bag.jpg',
    subtitle: 'Travel in Style'
  }
]

export function CategoriesGrid() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-10 font-sans">
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
