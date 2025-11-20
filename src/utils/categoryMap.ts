export const categoryMap: Record<string, {
  apiCategory?: string
  keywords?: string[]
  fallbackCategory?: string
  title: string
  fetchAll?: boolean
}> = {
  'all': {
    fetchAll: true,
    title: 'All Collections'
  },
  'mens-wear': {
    apiCategory: "men's clothing",
    title: "Men's Wear"
  },
  'womens-wear': {
    apiCategory: "women's clothing",
    title: "Women's Wear"
  },
  'jewellery': {
    apiCategory: "jewelery",
    title: "Jewellery"
  },
  'electronics': {
    apiCategory: "electronics",
    title: "Electronics"
  },
  'shoes-accessories': {
    keywords: ["shoe", "sneaker", "boot", "sandals", "loafer", "sandal", "accessory"],
    title: "Shoes & Accessories"
  },
  'backpacks-bags': {
    keywords: ["bag", "backpack", "backpacks", "rucksack", "sling"],
    fallbackCategory: "men's clothing",
    title: "Backpacks & Bags"
  }
}

export type CategorySlug = keyof typeof categoryMap
