import React, { useState, useEffect, useRef, useCallback } from 'react'
import type { ProductItem } from '../data/mockProducts'
import { fetchProducts } from '../data/mockProducts'
import ProductCard from '../components/ProductCard'

const categories = ['All', 'Chair', 'Cabinet', 'Sofa', 'Bed'] as const

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [products, setProducts] = useState<ProductItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const loadMoreProducts = useCallback(
    async (currentPage: number, category: string, reset: boolean = false) => {
      setLoading(true)
      try {
        const res = await fetchProducts(currentPage, 20, category)
        setProducts((prev) => (reset ? res.products : [...prev, ...res.products]))
        setHasMore(res.hasMore)
      } catch (err) {
        console.error('Error fetching shop products:', err)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Trigger when category changes
  useEffect(() => {
    setPage(1)
    setProducts([])
    loadMoreProducts(1, selectedCategory, true)
  }, [selectedCategory, loadMoreProducts])

  // Sentinel ref observer for infinite scroll
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1
            loadMoreProducts(nextPage, selectedCategory, false)
            return nextPage
          })
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [loading, hasMore, selectedCategory, loadMoreProducts]
  )

  return (
    <div className="w-full bg-white min-h-screen text-neutral-900 font-sans pt-28 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header & Filter Tabs (Just like Our Best Quality Products section) */}
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 text-center">
            Our Best Quality Products
          </h1>

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

        {/* Product Cards Grid: 3 per row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {products.map((product, idx) => (
            <ProductCard key={`${product.id}-${idx}`} product={product} />
          ))}
        </div>

        {/* Infinite Scroll Loader Sentinel */}
        <div ref={sentinelRef} className="w-full flex justify-center py-8">
          {loading && (
            <div className="flex items-center space-x-3 text-neutral-600">
              <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading page {page + 1}...</span>
            </div>
          )}

          {!hasMore && products.length > 0 && (
            <p className="text-sm text-neutral-400 font-medium pt-4">
              You've reached the end of "{selectedCategory}" products.
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default ShopPage
