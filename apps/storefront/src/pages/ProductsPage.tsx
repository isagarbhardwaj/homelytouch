import React, { useState, useEffect, useRef, useCallback } from 'react'
import type { ProductItem } from '../data/mockProducts'
import { fetchProducts } from '../data/mockProducts'
import ProductCard from '../components/ProductCard'

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const loadMoreProducts = useCallback(async (currentPage: number) => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetchProducts(currentPage, 20, 'All')
      setProducts((prev) => (currentPage === 1 ? res.products : [...prev, ...res.products]))
      setHasMore(res.hasMore)
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }, [loading])

  // Initial load: load first 20 products
  useEffect(() => {
    loadMoreProducts(1)
  }, [loadMoreProducts])

  // Sentinel ref observer for infinite scroll
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1
            loadMoreProducts(nextPage)
            return nextPage
          })
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [loading, hasMore, loadMoreProducts]
  )

  return (
    <div className="w-full bg-white min-h-screen text-neutral-900 font-sans pt-28 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">
            All Products
          </h1>
          <p className="text-neutral-500 text-base max-w-xl">
            Explore our complete collection of modern, minimalist furniture crafted for your home.
            Currently showing {products.length} products.
          </p>
        </div>

        {/* Product Grid: 3 per row on desktop */}
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
              You've reached the end of our product catalog.
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default ProductsPage
