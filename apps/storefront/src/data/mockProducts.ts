export interface ProductItem {
  id: string
  name: string
  category: 'Chair' | 'Cabinet' | 'Sofa' | 'Bed'
  price: string
  numericPrice: number
  image: string
  href: string
}

const imagesByCategory = {
  Chair: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  ],
  Cabinet: [
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
  ],
  Sofa: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
  ],
  Bed: [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80',
  ],
}

const titlePrefixes = [
  'Easy',
  'Luxury',
  'Modern',
  'Minimalist',
  'Nordic',
  'Comfort',
  'Velvet',
  'Classic',
  'Ergonomic',
  'Urban',
]

const titleSuffixes = {
  Chair: ['Chair', 'Armchair', 'Lounge Chair', 'Dining Chair', 'Reclining Stool'],
  Cabinet: ['Cabinet', 'Sideboard', 'Credenza', 'Almirah', 'Chest of Drawers'],
  Sofa: ['Sofa', 'Couch', 'Daybed', 'Loveseat', 'Sectional'],
  Bed: ['Bed Frame', 'Platform Bed', 'King Bed', 'Daybed', 'Upholstered Bed'],
}

// Generate 120 unique realistic products
export const allMockProducts: ProductItem[] = Array.from({ length: 120 }).map((_, index) => {
  const categoryKeys: ('Chair' | 'Cabinet' | 'Sofa' | 'Bed')[] = ['Chair', 'Cabinet', 'Sofa', 'Bed']
  const category = categoryKeys[index % categoryKeys.length]
  const prefix = titlePrefixes[(index * 3) % titlePrefixes.length]
  const suffixList = titleSuffixes[category]
  const suffix = suffixList[index % suffixList.length]
  const name = `${prefix} ${suffix}`
  
  const basePrice = 60 + (index * 17) % 320
  const priceFormatted = `$${basePrice < 100 ? '0' : ''}${basePrice}.00`
  
  const categoryImages = imagesByCategory[category]
  const image = categoryImages[index % categoryImages.length]

  return {
    id: `prod-${index + 1}`,
    name,
    category,
    price: priceFormatted,
    numericPrice: basePrice,
    image,
    href: `/product/${index + 1}`,
  }
})

// Function to fetch paginated products asynchronously (simulating API / Medusa backend)
export const fetchProducts = async (
  page: number = 1,
  limit: number = 20,
  categoryFilter: string = 'All'
): Promise<{ products: ProductItem[]; hasMore: boolean; total: number }> => {
  // Simulate slight network latency (200ms) for realistic loading feedback
  await new Promise((resolve) => setTimeout(resolve, 300))

  const filtered =
    categoryFilter === 'All'
      ? allMockProducts
      : allMockProducts.filter((p: ProductItem) => p.category === categoryFilter)

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedItems = filtered.slice(startIndex, endIndex)
  const hasMore = endIndex < filtered.length

  return {
    products: paginatedItems,
    hasMore,
    total: filtered.length,
  }
}
