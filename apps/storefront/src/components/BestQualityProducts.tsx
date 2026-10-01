import React, { useState } from 'react'

export interface Product {
  id: string
  name: string
  category: 'Chair' | 'Cabinet' | 'Sofa' | 'Bed'
  price: string
  image: string
  href: string
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Easy Sofa',
    category: 'Sofa',
    price: '$066.00',
    image:
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    href: '#product-easy-sofa-1',
  },
  {
    id: '2',
    name: 'Easy Sofa',
    category: 'Chair',
    price: '$126.00',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    href: '#product-easy-sofa-2',
  },
  {
    id: '3',
    name: 'Cabinet',
    category: 'Cabinet',
    price: '$138.00',
    image:
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    href: '#product-cabinet-1',
  },
  {
    id: '4',
    name: 'Rumpi Chair',
    category: 'Chair',
    price: '$100.00',
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    href: '#product-rumpi-chair',
  },
  {
    id: '5',
    name: 'Romp Toll',
    category: 'Sofa',
    price: '$86.00',
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    href: '#product-romp-toll',
  },
  {
    id: '6',
    name: 'Almirah',
    category: 'Cabinet',
    price: '$222.00',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    href: '#product-almirah',
  },
]

const categories = ['All', 'Chair', 'Cabinet', 'Sofa', 'Bed'] as const

export interface BestQualityProductsProps {
  title?: string
  products?: Product[]
  onProductClick?: (product: Product) => void
}

export const BestQualityProducts: React.FC<BestQualityProductsProps> = ({
  title = 'Our Best Quality Products',
  products = defaultProducts,
  onProductClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-16 text-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 text-center">
            {title}
          </h2>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#191919] text-white shadow-md'
                    : 'bg-transparent border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#f4f4f4] rounded-[24px] overflow-hidden flex flex-col justify-between p-6 transition-all duration-300 hover:shadow-xl relative"
            >
              {/* Product Image Area */}
              <a
                href={product.href}
                onClick={(e) => {
                  if (onProductClick) {
                    e.preventDefault()
                    onProductClick(product)
                  }
                }}
                className="w-full h-64 sm:h-72 flex items-center justify-center overflow-hidden mb-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </a>

              {/* Product Details & Action Button Row */}
              <div className="flex items-end justify-between pt-2">
                {/* Title & Price */}
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-neutral-600">
                    {product.name}
                  </span>
                  <span className="text-xl font-bold text-neutral-900">
                    {product.price}
                  </span>
                </div>

                {/* Black Circle Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (onProductClick) {
                      onProductClick(product)
                    }
                  }}
                  aria-label={`View ${product.name} details`}
                  className="w-12 h-12 rounded-full bg-[#191919] hover:bg-neutral-800 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md group-hover:bg-neutral-900 cursor-pointer shrink-0"
                >
                  <svg
                    className="w-5 h-5 text-white transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback Empty State if filtered category has no products */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            No products found in "{selectedCategory}".
          </div>
        )}
      </div>
    </section>
  )
}

export default BestQualityProducts
